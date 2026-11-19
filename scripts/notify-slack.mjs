import { execFileSync } from "node:child_process";

const webhook = process.env.SLACK_WEBHOOK_URL;
if (!webhook) {
  console.error("No esta configurada la credencial slack-webhook.");
  process.exit(1);
}

const result = process.env.CI_RESULT || "UNKNOWN";
const icon = result === "SUCCESS" ? "✅" : result === "ABORTED" ? "⏹️" : "❌";
let commit = process.env.GIT_COMMIT || "";
if (!/^[0-9a-f]{40,64}$/i.test(commit)) {
  try {
    commit = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  } catch {
    commit = "no disponible";
  }
}

const text = [
  `${icon} *CrowdStarter: ${result}*`,
  `Trabajo: ${process.env.JOB_NAME || "Jenkins"} #${process.env.BUILD_NUMBER || "?"}`,
  `Commit: ${commit}`,
  process.env.BUILD_URL || "",
].filter(Boolean).join("\n");

try {
  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  console.log("Notificacion enviada a Slack.");
} catch (error) {
  // No imprimir la URL ni excepciones que pudieran incluir el secreto.
  console.error(`Fallo el envio a Slack: ${error.message.startsWith("HTTP ") ? error.message : "error de conexion o timeout"}`);
  process.exit(1);
}
