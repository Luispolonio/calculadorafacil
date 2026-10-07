import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from "next/constants";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default function configure(phase: string): NextConfig {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    // Hosting presets can invoke `next build` directly, bypassing npm prebuild.
    for (const script of ["copy-python-runtime.mjs", "copy-mathlive-fonts.mjs"]) {
      execFileSync(process.execPath, [resolve(__dirname, "scripts", script)], {
        stdio: "inherit",
      });
    }
  }
  return nextConfig;
}
