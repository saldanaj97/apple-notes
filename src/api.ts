import { runAppleScript } from "@raycast/utils";

import { escapeDoubleQuotes, fixNoteFormatting } from "./helpers";

export async function createNote(note?: string, text?: string) {
  const escapedNoteTitle = note ? escapeDoubleQuotes(note) : "";
  const escapedText = text ? escapeDoubleQuotes(text) : "";
  const { noteInHtmlFormat, noteTitleInHtmlFormat } = fixNoteFormatting(escapedNoteTitle, escapedText);

  return runAppleScript(`
    tell application "Notes"
      activate
      if ("${escapedText}" is not "") then
        set newNote to make new note with properties {body: "${noteInHtmlFormat}"}
      else
        set newNote to make new note with properties {body: "${noteTitleInHtmlFormat}"}
      end if
      set selection to newNote
      show newNote
    end tell
    `);
}

export async function openNoteSeparately(id: string) {
  return runAppleScript(`
    tell application "Notes"
      set theNote to note id "${escapeDoubleQuotes(id)}"
      set theFolder to container of theNote
      show theFolder
      show theNote with separately
      activate
    end tell
    `);
}

export async function deleteNoteById(id: string) {
  return runAppleScript(`
    tell application "Notes"
      delete note id "${escapeDoubleQuotes(id)}"
    end tell
    `);
}

export async function restoreNoteById(id: string) {
  return runAppleScript(`
    tell application "Notes"
      set theNote to note id "${escapeDoubleQuotes(id)}"
      set theFolder to default folder of account 1
      move theNote to theFolder
    end tell
    `);
}

export async function getNoteBody(id: string) {
  return runAppleScript(`
    tell application "Notes"
      set theNote to note id "${escapeDoubleQuotes(id)}"
      return body of theNote
    end tell
    `);
}

export async function getNotePlainText(id: string) {
  return runAppleScript(`
    tell application "Notes"
      set theNote to note id "${escapeDoubleQuotes(id)}"
      return plaintext of theNote
    end tell
    `);
}

export async function setNoteBody(id: string, body: string) {
  return runAppleScript(`
    tell application "Notes"
      set theNote to note id "${escapeDoubleQuotes(id)}"
      set body of theNote to "${escapeDoubleQuotes(body)}"
    end tell
    `);
}

export async function getSelectedNote() {
  return runAppleScript(`
    tell application "Notes"
      set selectedNotes to selection
      if (count of selectedNotes) is 0 then
        error "No note is currently selected"
      else
        set theNote to item 1 of selectedNotes
        return id of theNote
      end if
    end tell
  `);
}
