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

      // One-liner: repo + tag + date + optional short summary
      let entry = `- **[${r.repo}](${r.html_url})** — ${r.tag_name}${preBadge} (${formatDate(r.published_at, dateFormat)})`;

      if (includeBody && r.body) {
        const shortSummary = r.body.split("\n").filter(Boolean)[0]; // first non-empty line
        entry += ` — ${shortSummary.slice(0, 120)}... [More](${releasesUrl})`;
      } else {
        entry += ` — [See all releases →](${releasesUrl})`;
      }

      return entry;
    })
    .join("\n");

  return `\n${markdown}\n${
    showGlobalFooter ? `\n\n[${footerText}](${actorUrl})` : ""
  }`;
}
