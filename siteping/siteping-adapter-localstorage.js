// ../core/src/filters.ts
var DEFAULT_PAGE_LIMIT = 50;
var MAX_PAGE_LIMIT = 100;
function toPositiveInteger(value, fallback) {
  return value !== void 0 && Number.isFinite(value) ? Math.max(1, Math.floor(value)) : fallback;
}
function clampPagination(query) {
  const page = toPositiveInteger(query.page, 1);
  const limit = Math.min(toPositiveInteger(query.limit, DEFAULT_PAGE_LIMIT), MAX_PAGE_LIMIT);
  return { page, limit, skip: (page - 1) * limit };
}
function applyFeedbackFilters(items, query) {
  let results = items.filter((f) => f.projectName === query.projectName);
  if (query.type) results = results.filter((f) => f.type === query.type);
  if (query.statuses && query.statuses.length > 0) {
    const allowed = query.statuses;
    results = results.filter((f) => allowed.includes(f.status));
  } else if (query.status) {
    results = results.filter((f) => f.status === query.status);
  }
  if (query.url) results = results.filter((f) => f.url === query.url);
  if (query.urlPattern) results = results.filter((f) => f.urlPattern === query.urlPattern);
  if (query.search) {
    const s = query.search.toLowerCase();
    results = results.filter((f) => f.message.toLowerCase().includes(s));
  }
  results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  const total = results.length;
  const { limit, skip } = clampPagination(query);
  return { feedbacks: results.slice(skip, skip + limit), total };
}

// ../core/src/type-utils.ts
function isRecord(value) {
  return typeof value === "object" && value !== null;
}
function hasOwn(value, key) {
  return isRecord(value) && key in value;
}

// ../core/src/types.ts
var StoreNotFoundError = class extends Error {
  code = "STORE_NOT_FOUND";
  constructor(message = "Record not found", options) {
    super(message, options);
    this.name = "StoreNotFoundError";
  }
};
var StoreDuplicateError = class extends Error {
  code = "STORE_DUPLICATE";
  constructor(message = "Duplicate record", options) {
    super(message, options);
    this.name = "StoreDuplicateError";
  }
};
var StorePersistenceError = class extends Error {
  code = "STORE_PERSISTENCE";
  constructor(message = "Failed to persist store mutation", options) {
    super(message, options);
    this.name = "StorePersistenceError";
  }
};
function hasErrorCode(error, code) {
  return hasOwn(error, "code") && error.code === code;
}
function isStorePersistence(error) {
  if (error instanceof StorePersistenceError) return true;
  return hasErrorCode(error, "STORE_PERSISTENCE");
}

// ../core/src/store-helpers.ts
function buildAnnotationRecord(input, ctx) {
  return {
    id: ctx.id,
    feedbackId: ctx.feedbackId,
    cssSelector: input.cssSelector,
    xpath: input.xpath,
    textSnippet: input.textSnippet,
    elementTag: input.elementTag,
    elementId: input.elementId ?? null,
    textPrefix: input.textPrefix,
    textSuffix: input.textSuffix,
    fingerprint: input.fingerprint,
    neighborText: input.neighborText,
    anchorKey: input.anchorKey ?? null,
    xPct: input.xPct,
    yPct: input.yPct,
    wPct: input.wPct,
    hPct: input.hPct,
    scrollX: input.scrollX,
    scrollY: input.scrollY,
    viewportW: input.viewportW,
    viewportH: input.viewportH,
    devicePixelRatio: input.devicePixelRatio,
    createdAt: ctx.now
  };
}
function buildFeedbackRecord(input, ctx) {
  const now = ctx.now ?? /* @__PURE__ */ new Date();
  return {
    id: ctx.id,
    type: input.type,
    message: input.message,
    status: input.status,
    projectName: input.projectName,
    url: input.url,
    urlPattern: input.urlPattern ?? null,
    authorName: input.authorName,
    authorEmail: input.authorEmail,
    viewport: input.viewport,
    userAgent: input.userAgent,
    clientId: input.clientId,
    resolvedAt: null,
    createdAt: now,
    updatedAt: now,
    annotations: input.annotations.map(
      (ann) => buildAnnotationRecord(ann, { id: ctx.annotationId(), feedbackId: ctx.id, now })
    ),
    screenshotUrl: input.screenshotDataUrl ?? null,
    screenshotRegion: input.screenshotRegion ?? null,
    diagnostics: input.diagnostics ?? null
  };
}
function createCollectionStore(backend) {
  return {
    async createFeedback(data) {
      const feedbacks = await backend.load();
      const existing = feedbacks.find((f) => f.clientId === data.clientId);
      if (existing) return existing;
      const record = buildFeedbackRecord(data, {
        id: backend.generateId(),
        annotationId: () => backend.generateId()
      });
      const next = [record, ...feedbacks];
      try {
        await backend.persist(next);
      } catch (err) {
        if (!record.screenshotUrl) throw err;
        record.screenshotUrl = null;
        await backend.persist(next);
      }
      return record;
    },
    async getFeedbacks(query) {
      return applyFeedbackFilters(await backend.load(), query);
    },
    async findByClientId(clientId) {
      return (await backend.load()).find((f) => f.clientId === clientId) ?? null;
    },
    async updateFeedback(id, data) {
      const feedbacks = await backend.load();
      const current = feedbacks.find((f) => f.id === id);
      if (!current) throw new StoreNotFoundError();
      const updated = {
        ...current,
        status: data.status,
        resolvedAt: data.resolvedAt,
        updatedAt: /* @__PURE__ */ new Date()
      };
      await backend.persist(feedbacks.map((f) => f === current ? updated : f));
      return updated;
    },
    async deleteFeedback(id) {
      const feedbacks = await backend.load();
      if (!feedbacks.some((f) => f.id === id)) throw new StoreNotFoundError();
      await backend.persist(feedbacks.filter((f) => f.id !== id));
    },
    async deleteAllFeedbacks(projectName) {
      const feedbacks = await backend.load();
      await backend.persist(feedbacks.filter((f) => f.projectName !== projectName));
    },
    async verifyProjectOwnership(id, projectName) {
      const fb = (await backend.load()).find((f) => f.id === id);
      return fb !== void 0 && fb.projectName === projectName;
    }
  };
}

// src/index.ts
var DEFAULT_KEY = "siteping_feedbacks";
var LocalStorageStore = class {
  key;
  engine = createCollectionStore({
    load: () => this.load(),
    persist: (next) => {
      this.persist(next);
    },
    generateId: () => this.generateId()
  });
  constructor(options) {
    this.key = options?.key ?? DEFAULT_KEY;
  }
  // ---------------------------------------------------------------------------
  // Storage primitives
  // ---------------------------------------------------------------------------
  load() {
    try {
      const raw = localStorage.getItem(this.key);
      if (!raw) return [];
      const data = JSON.parse(raw);
      return data.map(reviveFeedback);
    } catch {
      return [];
    }
  }
  /**
   * Persist the full feedback array, or throw `StorePersistenceError` (with
   * the underlying exception as `cause` — quota, storage disabled, …) when the
   * write fails. Centralized here so no mutating method can accidentally
   * report a phantom success on a lost write.
   */
  persist(feedbacks) {
    try {
      localStorage.setItem(this.key, JSON.stringify(feedbacks));
    } catch (cause) {
      throw new StorePersistenceError(void 0, { cause });
    }
  }
  generateId() {
    try {
      return crypto.randomUUID();
    } catch {
      return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
  }
  // ---------------------------------------------------------------------------
  // SitepingStore implementation — delegated to the collection engine
  // ---------------------------------------------------------------------------
  createFeedback(data) {
    return this.engine.createFeedback(data);
  }
  getFeedbacks(query) {
    return this.engine.getFeedbacks(query);
  }
  findByClientId(clientId) {
    return this.engine.findByClientId(clientId);
  }
  updateFeedback(id, data) {
    return this.engine.updateFeedback(id, data);
  }
  deleteFeedback(id) {
    return this.engine.deleteFeedback(id);
  }
  deleteAllFeedbacks(projectName) {
    return this.engine.deleteAllFeedbacks(projectName);
  }
  verifyProjectOwnership(id, projectName) {
    return this.engine.verifyProjectOwnership(id, projectName);
  }
  /** Remove all data from localStorage for this store key. */
  clear() {
    localStorage.removeItem(this.key);
  }
};
function reviveAnnotation(raw) {
  return {
    ...raw,
    anchorKey: raw.anchorKey ?? null,
    createdAt: new Date(raw.createdAt)
  };
}
function reviveFeedback(raw) {
  return {
    ...raw,
    createdAt: new Date(raw.createdAt),
    updatedAt: new Date(raw.updatedAt),
    resolvedAt: raw.resolvedAt ? new Date(raw.resolvedAt) : null,
    annotations: raw.annotations.map(reviveAnnotation),
    // Legacy back-fill: every nullable field is present on the in-memory
    // shape, as `null`, exactly like a freshly built record. Plain JSON
    // values (region, diagnostics) survive the round-trip verbatim.
    urlPattern: raw.urlPattern ?? null,
    screenshotUrl: raw.screenshotUrl ?? null,
    screenshotRegion: raw.screenshotRegion ?? null,
    diagnostics: raw.diagnostics ?? null
  };
}
export {
  LocalStorageStore,
  StoreDuplicateError,
  StoreNotFoundError,
  StorePersistenceError,
  isStorePersistence
};
