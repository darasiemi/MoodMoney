#!/usr/bin/env node
/**
 * add-project.mjs
 * Interactive CLI to create a new MDX project file in content/projects/
 *
 * Usage:
 *   node scripts/add-project.mjs
 */

import { createInterface } from "readline";
import { writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECTS_DIR = resolve(__dirname, "../content/projects");

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

async function main() {
  console.log("\n🔬 Add a New Research Project\n");

  const title = await ask("Project title: ");
  const slug = await ask(
    "Slug (URL-safe, e.g. my-project-name): "
  );
  const description = await ask("Short description (1–2 sentences): ");
  const status = await ask("Status (active/completed/upcoming): ");
  const startYear = await ask("Start year: ");
  const endYear = await ask("End year [optional, press Enter if ongoing]: ");
  const tagsRaw = await ask("Tags (comma-separated): ");
  const tags = tagsRaw.split(",").map((t) => t.trim());
  const funding = await ask("Funding info [optional]: ");
  const collaboratorsRaw = await ask("Collaborators (comma-separated) [optional]: ");
  const featured = (await ask("Featured on homepage? (y/n): ")).toLowerCase() === "y";

  const collaborators = collaboratorsRaw
    ? collaboratorsRaw.split(",").map((c) => c.trim())
    : [];

  const outPath = resolve(PROJECTS_DIR, `${slug}.mdx`);
  if (existsSync(outPath)) {
    console.error(`\nError: ${outPath} already exists.\n`);
    rl.close();
    process.exit(1);
  }

  const frontmatter = [
    "---",
    `title: "${title}"`,
    `slug: "${slug}"`,
    `description: "${description}"`,
    `status: "${status}"`,
    `startYear: ${startYear}`,
    endYear ? `endYear: ${endYear}` : null,
    `tags: [${tags.map((t) => `"${t}"`).join(", ")}]`,
    `featured: ${featured}`,
    collaborators.length > 0
      ? `collaborators: [${collaborators.map((c) => `"${c}"`).join(", ")}]`
      : null,
    funding ? `funding: "${funding}"` : null,
    "---",
  ]
    .filter(Boolean)
    .join("\n");

  const content = `${frontmatter}

## Overview

_Add a brief overview of this project here._

## Research Questions

1. _Question 1_
2. _Question 2_

## Methodology

_Describe the methods used._

## Key Findings

_Summarise findings as the project progresses._
`;

  writeFileSync(outPath, content);
  console.log(`\nProject file created: content/projects/${slug}.mdx\n`);
  console.log("Edit the file to add your full project description.\n");
  rl.close();
}

main().catch((err) => {
  console.error(err);
  rl.close();
  process.exit(1);
});
