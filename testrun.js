// test.js
import { run } from "./src/index.js";

// Normalize multi-line repo list
if (process.env.INPUT_REPOS?.includes("\\n")) {
  process.env.INPUT_REPOS = process.env.INPUT_REPOS.split("\\n").join("\n");
}

// Optional debugging flag
process.env.DEBUG = "true";

console.log("🧪 Running action locally using .env...");

run()
  .then(() => console.log("✅ Local test complete!"))
  .catch((err) => {
    console.error("❌ Local test failed:", err);
    process.exit(1);
  });
