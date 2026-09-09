import { InboxClient } from "./inbox-client";
import { PROJECT_NAME } from "@/lib/config";

export const dynamic = "force-dynamic";

export default function InboxPage() {
  return <InboxClient project={PROJECT_NAME} />;
}
