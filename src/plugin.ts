import { Plugin } from "vite";
import { glob } from "glob";
import path from "path";
import { MultiPageAutoOptions } from "./types";
import { formatPageName, generateHtml } from "./utils";
import { DEFAULT_IGNORE_PATTERNS } from "./config";

export default function MultiPageAutoPlugin(
  options: MultiPageAutoOptions = {},
): Plugin {
  const {
    renderTitle = (templateName) => templateName,
    ignore: customIgnore = [],
  } = options;

  const ignorePatterns = [...DEFAULT_IGNORE_PATTERNS, ...customIgnore];
  const htmlCache = new Map<string, string>();
  const mainCache = new Map<string, string>();

  return {
    name: "vite-plugin-multipage-auto",

    resolveId(id) {
      if (id.endsWith(".html")) {
        return id;
      }
    },

    async load(id) {
      if (id.endsWith(".html")) {
        const cached = htmlCache.get(id);
        if (cached) return cached;

        const dir = path.dirname(id);
        const pageName = formatPageName(dir);
        const pageTitle = renderTitle(pageName);

        const mainId = id.replace(process.cwd() + "/", "").split(".")[0];

        if (!mainCache.has(mainId)) return null;
        const html = generateHtml(
          pageTitle,
          mainCache.get(mainId)! + "/main.ts",
        );

        htmlCache.set(id, html);
        return html;
      }
    },

    config: async () => {
      const entries = await glob("**/main.ts", {
        ignore: ignorePatterns,
      });

      const input: Record<string, string> = {};
      entries.forEach((file) => {
        const dir = path.dirname(file);

        const pageName = formatPageName(dir);
        mainCache.set(pageName, dir);

        input[pageName] = path.resolve(pageName + ".html");
      });

      return {
        build: {
          rollupOptions: { input },
        },
      };
    },
  };
}
