import { formatDate } from "../utils/format.js";

export function renderCompact(
  releases,
  footerText,
  actorUrl,
  includeBody = true,
  showGlobalFooter = true,
  dateFormat = "ISO"
) {
  const markdown = releases
    .map((r) => {
      const preBadge = r.prerelease ? " ⚠️ *Pre-release*" : "";
      const releasesUrl = `https://github.com/${r.repo}/releases`;
      const dateStr = formatDate(r.published_at, dateFormat);

      let entry = `- **[${r.repo}](${r.html_url})** — ${r.tag_name}${preBadge}${
        dateStr ? ` (${dateStr})` : ""
      }`;

      if (includeBody && r.body) {
        const shortSummary = r.body.split("\n").filter(Boolean)[0] || "";
        entry += ` — ${shortSummary.slice(0, 120)}... [More](${releasesUrl})`;
      } else {
        entry += ` — [See all releases →](${releasesUrl})`;
      }

      return entry.trim();
    })
    .join("\n");

  return `${markdown.trim()}${
    showGlobalFooter ? `\n\n[${footerText}](${actorUrl})` : ""
  }`;
}
