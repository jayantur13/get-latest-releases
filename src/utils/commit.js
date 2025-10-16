const { execSync } = require("child_process");

function autoCommit(readmePath) {
  try {
    // Configure Git identity for the Actions bot
    execSync(`git config user.name "github-actions[bot]"`);
    execSync(`git config user.email "github-actions[bot]@users.noreply.github.com"`);

    // Add README and release cache file
    execSync(`git add ${readmePath} latest-releases.json`);

    // Commit only if there are changes
    execSync(`git commit -m "Update latest releases [skip ci]" || echo "No changes"`);

    // Push the commit
    execSync(`git push`);

    console.log("✅ Auto-committed README and release cache.");
  } catch (err) {
    console.error("❌ Auto-commit failed:", err.message);
  }
}

module.exports = { autoCommit };
