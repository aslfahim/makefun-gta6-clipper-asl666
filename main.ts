// Entry for gta6-clipper-01 under @asl666: this hands the grader a
// single small file, VIDEO.json, which holds the YouTube Shorts link
// for the "Vice City in daylight" clip. The program just moves that
// file from wherever the bot was unpacked into the output folder the
// grader expects, so the link can be picked up and checked.

import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir: string = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const sourcePath: string = join(botDir, "VIDEO.json");
const destPath: string = join(outputDir, "VIDEO.json");

// Guard first: if there is no VIDEO.json to hand in, say so plainly
// and stop instead of letting a copy call fail with a raw stack.
if (!existsSync(sourcePath)) {
  console.error(`error: VIDEO.json not found in bot dir (${sourcePath})`);
  process.exit(1);
}

try {
  mkdirSync(outputDir, { recursive: true });
  cpSync(sourcePath, destPath);
  // Do not trust the copy blindly: the grader reads the destination,
  // so confirm it is actually there before reporting success.
  if (!existsSync(destPath)) {
    console.error(`error: copy finished but ${destPath} is missing`);
    process.exit(1);
  }
} catch (err) {
  const detail: string = err instanceof Error ? err.message : String(err);
  console.error(`error: could not copy VIDEO.json to output dir: ${detail}`);
  process.exit(1);
}

console.log(`copied ${sourcePath} -> ${destPath}`);
