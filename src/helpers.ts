import os from "os";

export const fileIcon = "/System/Applications/Notes.app";

export function escapeDoubleQuotes(value: string) {
  return value.replace(/"/g, '\\"');
}

export function truncate(str: string, maxLength = 30): string {
  if (str.length <= maxLength) {
    return str;
  }

  return str.substring(0, maxLength) + "…";
}

export function getOpenNoteURL(uuid: string) {
  const isSonomaOrLater = parseInt(os.release().split(".")[0]) >= 23;
  return `${isSonomaOrLater ? "applenotes" : "notes"}://showNote?identifier=${uuid}`;
}

export function fixNoteFormatting(title: string, body?: string) {
  const properlyFormattedBody = body?.replace(/\r?\n\r?\n/g, "<br><br>").replace(/\r?\n/g, "<br>") || ""; // Splitting and converting newlines into <br>
  const noteTitleInHtmlFormat = `<h1>${title}</h1>`;
  const noteTextInHtmlFormat = `<div style=\\"font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;\\">${properlyFormattedBody}</div>`;
  const noteInHtmlFormat = noteTitleInHtmlFormat + noteTextInHtmlFormat;
  return { noteInHtmlFormat, noteTitleInHtmlFormat, noteTextInHtmlFormat };
}
