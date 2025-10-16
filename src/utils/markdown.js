import fs from "fs";

export function updateSection(readmePath, newMarkdown, headerTitle) {
  const START = "<!--LATEST_RELEASES_START-->";
  const END = "<!--LATEST_RELEASES_END-->";
  const content = fs.readFileSync(readmePath, "utf8");
  const lines = content.split("\n");

  let insideFence = false;
  let insideTarget = false;
  let targetStart = -1;
  let targetEnd = -1;

  // Track fenced code blocks by line scanning (safe for any language block)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Toggle code block state
    if (line.startsWith("```")) {
      insideFence = !insideFence;
    }

    // Detect release start marker outside fences
    if (!insideFence && line.includes(START)) {
      insideTarget = true;
      targetStart = i;
    }

    // Detect release end marker outside fences
    if (insideTarget && !insideFence && line.includes(END)) {
      targetEnd = i;
      break;
    }
  }

  if (targetStart === -1 || targetEnd === -1) {
    console.warn("⚠️ No valid release section found outside code blocks.");
    return;
  }

  const header =
    headerTitle && headerTitle.trim() !== "" ? `${headerTitle.trim()}\n\n` : "";

  const replacement = [START, header + newMarkdown.trim(), END];

  const updated = [
    ...lines.slice(0, targetStart),
    ...replacement,
    ...lines.slice(targetEnd + 1),
  ].join("\n");

  fs.writeFileSync(readmePath, updated);
  console.log("✅ Release section updated outside code fences.");
}

