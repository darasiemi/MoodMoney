#!/usr/bin/env node
/**
 * add-publication.mjs
 * Interactive CLI to append a new publication to content/publications.json
 *
 * Usage:
 *   node scripts/add-publication.mjs
 */

import { createInterface } from "readline";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUB_FILE = resolve(__dirname, "../content/publications.json");

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

async function main() {
  console.log("\n📚 Add a New Publication\n");

  const id = await ask("Unique ID (e.g. smith2025example): ");
  const title = await ask("Title: ");
  const authorsRaw = await ask("Authors (comma-separated): ");
  const authors = authorsRaw.split(",").map((a) => a.trim());
  const year = parseInt(await ask("Year: "), 10);
  const venue = await ask("Full venue name: ");
  const venueShort = await ask("Short venue (e.g. NeurIPS 2025) [optional]: ");
  const type = await ask("Type (journal/conference/preprint/workshop): ");
  const abstract = await ask("Abstract [optional, press Enter to skip]: ");
  const doi = await ask("DOI [optional]: ");
  const arxiv = await ask("arXiv ID [optional, e.g. 2501.00001]: ");
  const pdf = await ask("PDF URL [optional]: ");
  const code = await ask("Code URL [optional]: ");
  const tagsRaw = await ask("Tags (comma-separated): ");
  const tags = tagsRaw.split(",").map((t) => t.trim());
  const featuredRaw = await ask("Featured on homepage? (y/n): ");
  const featured = featuredRaw.toLowerCase() === "y";

  const entry = {
    id,
    title,
    authors,
    year,
    venue,
    ...(venueShort && { venueShort }),
    type,
    ...(abstract && { abstract }),
    ...(doi && { doi }),
    ...(arxiv && { arxiv }),
    ...(pdf && { pdf }),
    ...(code && { code }),
    tags,
    featured,
  };

  const existing = JSON.parse(readFileSync(PUB_FILE, "utf-8"));
  if (existing.some((p) => p.id === id)) {
    console.error(`\nError: ID "${id}" already exists. Choose a unique ID.\n`);
    rl.close();
    process.exit(1);
  }

  existing.unshift(entry); // Add to front (newest first)
  writeFileSync(PUB_FILE, JSON.stringify(existing, null, 2) + "\n");
  console.log(`\nPublication "${title}" added to content/publications.json\n`);
  rl.close();
}

main().catch((err) => {
  console.error(err);
  rl.close();
  process.exit(1);
});
