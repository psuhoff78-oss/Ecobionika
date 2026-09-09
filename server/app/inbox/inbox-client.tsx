"use client";

import { useEffect, useState, type FormEvent } from "react";
import { SitepingInbox } from "@siteping/dashboard";

const KEY_STORAGE = "ecobionika_siteping_admin_key";

export function InboxClient({ project }: { project: string }) {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    setApiKey(sessionStorage.getItem(KEY_STORAGE));
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setChecking(true);
    setError(null);
    // Проверяем ключ пробным PATCH с несуществующим id: 401 = неверный ключ,
    // любой другой ответ (404/400) = ключ принят.
    const res = await fetch("/api/siteping", {
      method: "PATCH",
      headers: { "content-type": "application/json", authorization: `Bearer ${draft}` },
      body: JSON.stringify({ id: "__probe__", projectName: project, status: "open" }),
    });
    setChecking(false);
    if (res.status === 401) {
      setError("Неверный ключ");
      return;
    }
    sessionStorage.setItem(KEY_STORAGE, draft);
    setApiKey(draft);
  }

  function logout() {
    sessionStorage.removeItem(KEY_STORAGE);
    setApiKey(null);
    setDraft("");
  }

  if (apiKey === null) {
    return (
      <main style={styles.center}>
        <form onSubmit={submit} style={styles.card}>
          <h1 style={{ margin: "0 0 4px", fontSize: 20 }}>Правки по сайту Экобионика</h1>
          <p style={{ margin: "0 0 16px", color: "#666", fontSize: 14 }}>
            Введите ключ администратора (SITEPING_API_KEY), чтобы менять статусы пометок.
          </p>
          <input
            type="password"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ключ администратора"
            autoFocus
            style={styles.input}
          />
          {error && <div style={{ color: "#c00", fontSize: 13, marginTop: 8 }}>{error}</div>}
          <button type="submit" disabled={checking || !draft} style={styles.button}>
            {checking ? "Проверяю…" : "Войти"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <header style={styles.header}>
        <strong>Экобионика · правки по сайту</strong>
        <span style={{ flex: 1 }} />
        <a href="https://psuhoff78-oss.github.io/Ecobionika/" target="_blank" rel="noreferrer" style={styles.link}>
          Открыть сайт ↗
        </a>
        <button onClick={logout} style={styles.linkButton}>
          Выйти
        </button>
      </header>
      <div style={{ flex: 1, minHeight: 480 }}>
        <SitepingInbox
          projects={project}
          endpoint="/api/siteping"
          apiKey={apiKey}
          theme="auto"
          locale="ru"
          accentColor="#138537"
          deepLinkParam="siteping"
        />
      </div>
    </div>
  );
}

const styles = {
  center: { minHeight: "100vh", display: "grid", placeItems: "center", background: "#f5f8f9" },
  card: { background: "#fff", padding: 28, borderRadius: 12, width: 360, boxShadow: "0 8px 30px rgba(0,0,0,.08)" },
  input: { width: "100%", boxSizing: "border-box" as const, padding: "10px 12px", border: "1px solid #d5dee3", borderRadius: 8, fontSize: 15 },
  button: { marginTop: 14, width: "100%", padding: "10px 12px", border: 0, borderRadius: 8, background: "#138537", color: "#fff", fontSize: 15, cursor: "pointer" },
  header: { display: "flex", alignItems: "center", gap: 16, padding: "10px 16px", borderBottom: "1px solid #e5e7eb", fontSize: 14 },
  link: { color: "#138537", textDecoration: "none" },
  linkButton: { background: "none", border: 0, color: "#666", cursor: "pointer", fontSize: 14 },
};
