export function formatDate(iso, format = "ISO") {
  if (!iso) return "";

  const date = new Date(iso);

  switch (format.toLowerCase()) {
    case "none":
      return ""; // hide date entirely

    case "relative": {
      const diffMs = Date.now() - date.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays < 1) return "today";
      if (diffDays === 1) return "yesterday";
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
      return `${Math.floor(diffDays / 365)} years ago`;
    }

    case "short"://Oct 2, 2025 |
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

    case "iso":
    default:
      return date.toISOString().split("T")[0]; // e.g. 2025-10-06
  }
}
