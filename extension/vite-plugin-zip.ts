import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, resolve, sep } from 'node:path';
import JSZip from 'jszip';
import type { Plugin, ResolvedConfig } from 'vite';

export interface ZipPluginOptions {
  fileName?: string;
  outDir?: string;
}

async function addDirectory(zip: JSZip, rootDir: string, currentDir: string) {
  const entries = await readdir(currentDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(currentDir, entry.name);

    if (entry.isDirectory()) {
      await addDirectory(zip, rootDir, fullPath);
    } else if (entry.isFile()) {
      const zipPath = relative(rootDir, fullPath).split(sep).join('/');
      zip.file(zipPath, await readFile(fullPath));
    }
  }
}

export default function zipPlugin(options: ZipPluginOptions = {}): Plugin {
  const fileName = options.fileName ?? 'extension.zip';
  const outDir = options.outDir ?? 'release';
  let config: ResolvedConfig;

  return {
    name: 'copy-ia-text:zip',
    apply: 'build',
    enforce: 'post',
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    async closeBundle() {
      const sourceDir = resolve(config.root, config.build.outDir);
      const targetDir = resolve(config.root, outDir);
      const targetFile = join(targetDir, fileName);
      const zip = new JSZip();

      await addDirectory(zip, sourceDir, sourceDir);

      const buffer = await zip.generateAsync({
        type: 'nodebuffer',
        compression: 'DEFLATE',
        compressionOptions: { level: 9 },
      });

      await mkdir(targetDir, { recursive: true });
      await writeFile(targetFile, buffer);

      config.logger.info(`created ${relative(config.root, targetFile)}`, { timestamp: true });
    },
  };
}
