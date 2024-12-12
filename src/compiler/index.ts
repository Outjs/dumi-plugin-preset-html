

import hashId from 'hash-sum';

const cheerio = require('cheerio');

export interface CompileOptions {
  id?: string;
  filename?: string;
  code: string;
}

type CommonJSContext = {
  module: any;
  exports: {
    default?: any;
  };
  require: any;
};
//外部资源
export type ExternalScript = {
  src: string;
  integrity?: string;
  crossorigin?: string;
}
export type StyleSheet = {
  href: string;
  integrity?: string;
  crossorigin?: string;
}

const COMP_IDENTIFIER = '__html__';

export const compileHtml = (args: CompileOptions) => {
  const { code, filename } = args;
  const newCode = code?.replace(/\/\*[\s\S]*?\*\//g, '') || '';
  const $ = cheerio.load(newCode, {}, false);

  // const stylesheets: StyleSheet[] = [];
  // $('link[rel="stylesheet"]').each((index: number, element: any) => {
  //   const href = $(element).attr('href');
  //   const integrity = $(element).attr('integrity');
  //   const crossorigin = $(element).attr('crossorigin');
  //   stylesheets.push({ href, integrity, crossorigin });
  // });

  // //提取所有 <script> 标签
  // const scripts: ExternalScript[] = [];
  // const inlineScript: string[] = [];
  // $('script').each((index: number, element: any) => {
  //   const src = $(element).attr('src');
  //   if (src) {
  //     const src = $(element).attr('src');
  //     const integrity = $(element).attr('integrity');
  //     const crossorigin = $(element).attr('crossorigin');
  //     scripts.push({ src, integrity, crossorigin });
  //   } else {
  //     const inlineScriptText = ($(element).html())?.get()?.join('\n');
  //     inlineScript.push(inlineScriptText);
  //   }
  // });

  const extractedJs = $('script').map((_: any, el: any) => $(el).html()).get().join('\n');
  const extractedCss = $('style').map((_: any, el: any) => $(el).html()).get().join('\n');
  $('script, style').remove();
  const htmlContent = $.html();
  const id = hashId(code);
  let js = `const ${COMP_IDENTIFIER} = {};\n`;
  // 定义 executeExtractedJs 函数字符串
  const executeExtractedJsFunction = extractedJs ? `
        try {
          ${extractedJs}
        } catch (error) {
          console.error(error);
        }
      ` : '';

  // 将 executeExtractedJs 函数字符串拼接到 js 变量中
  //js += executeExtractedJsFunction;
  // if (stylesheets.length > 0) {
  //   js += `${COMP_IDENTIFIER}.__stylesheets__ = ${JSON.stringify(stylesheets)};\n`;
  // }
  // if(scripts.length > 0) {
  //   js += `${COMP_IDENTIFIER}.__externalScripts__ = ${JSON.stringify(scripts)};\n`;
  // }
  
  js += `\n${COMP_IDENTIFIER}.render = function(){\n return \`${htmlContent}\`;};`;
  js += `${COMP_IDENTIFIER}.__script__ = \`${executeExtractedJsFunction}\`;\n`;
  js += `\n${COMP_IDENTIFIER}.__id__ = "${id}";`
  return { js, css: extractedCss };
}

export function compile(options: CompileOptions) {
  const { id, filename, code } = options;
  let compiled: { js: string; css: string } = compileHtml(options);

  let { js, css } = compiled;
  if (css) {
    js += `\n${COMP_IDENTIFIER}.__css__ = ${JSON.stringify(css)};`;
  }
  js += `\nexport default ${COMP_IDENTIFIER};`;
  return js;
}

export function toCommonJS(result: { js: string, css: string }) {

  let code = `"use strict";\n
Object.defineProperty(exports, "__esModule", {\n
  value: true\n
});\n
exports["default"] = void 0;\n`;
  code += result.js;
  code += `\n${COMP_IDENTIFIER}.__css__ = ${JSON.stringify(result.css)};`;
  code += `\n const _default = ${COMP_IDENTIFIER};\n`;
  code += `exports["default"] = _default`;
  console.log(result, 'uuuuuuuuuuuu')
  return { code, css: result.css };
}


export function evalCommonJS(
  js: string,
  { module, exports, require }: CommonJSContext,
) {
  new Function('module', 'exports', 'require', js)(module, exports, require);
}