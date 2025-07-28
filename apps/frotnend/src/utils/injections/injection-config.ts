import type { IHtmlInjectionConfig } from "vite-plugin-html-injection";
    
export const htmlInjectionConfig: IHtmlInjectionConfig = {
  injections: [
  {
    "name": "Service worker",
    "path": "./src/utils/injections/sw.js",
    "type": "js",
    "injectTo": "head"
  }
]  
};
