const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.join(__dirname, "../lighthouse-report.html"), "utf8");
const match = html.match(/window\.__LIGHTHOUSE_JSON__\s*=\s*(\{[\s\S]*?\});?\s*<\/script>/);
if (!match) {
  console.error("Could not find JSON");
  process.exit(1);
}
let jsonStr = match[1];
const j = JSON.parse(jsonStr);
const audits = j.audits || {};

const keys = [
  "render-blocking-resources",
  "offscreen-images",
  "bf-cache",
  "unused-javascript",
  "layout-shifts",
  "legacy-javascript",
  "preload-lcp",
  "largest-contentful-paint-element",
  "dom-size",
  "font-display",
];
keys.forEach((k) => {
  const x = audits[k];
  if (!x) return;
  console.log("\n--- " + k + " (score: " + x.score + ") ---");
  if (x.description) console.log("Description: " + x.description.substring(0, 300));
  if (x.details && x.details.items && x.details.items.length) {
    console.log("Items (first 2):");
    x.details.items.slice(0, 2).forEach((it, i) => console.log("  " + i + ":", JSON.stringify(it).substring(0, 200)));
  }
});
