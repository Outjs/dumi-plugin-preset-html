import type { IDemoCancelableFn } from 'dumi/dist/client/theme-api';
import type { StyleSheet, ExternalScript } from '../compiler';
import { evalCommonJS } from '../compiler';

function getComponent(component: string) {

  let code = component.split("?watch=parent';")?.[1];
  if (code) {
    code = code.replace('export default', 'exports.default =');
    const module = { exports: { default: {} } };
    const exports = module.exports;
    const require = () => {
      return {};
    };
    evalCommonJS(code, { module, exports, require });
    return module.exports?.default;
  }
  return '';
}
const renderer: IDemoCancelableFn = async function (canvas, component: any) {
  if (typeof component === 'string') {
    component = getComponent(component);
  }

  // if (component?.__stylesheets__?.length > 0) {
  //   const stylesheets = component.__stylesheets__.filter((item: StyleSheet) => item.href);
  //   stylesheets.forEach((item: StyleSheet) => {
  //     const { href, integrity, crossorigin } = item;
  //     // 检查是否已经存在具有相同 href 的 <link> 标签
  //     const existingLink = document.querySelector(`link[href="${href}"]`);
  //     if (!existingLink) {
  //       const linkTag = document.createElement('link');
  //       linkTag.rel = 'stylesheet';
  //       linkTag.href = href;
  //       integrity && (linkTag.integrity = integrity);
  //       crossorigin && (linkTag.crossOrigin = crossorigin);
  //       document.head.appendChild(linkTag);
  //     }
  //   });
  // }


  if (component?.__css__) {
    setTimeout(() => {
      document
        .querySelectorAll(`style[css-${component.__id__}]`)
        .forEach((el) => el.remove());
      document.head.insertAdjacentHTML(
        'beforeend',
        `<style css-${component.__id__}>${component.__css__}</style>`,
      );
    }, 1);
  }




  canvas.insertAdjacentHTML('beforeend', component?.render?.() || '');

  // if (component?.__externalScripts__?.length > 0) {
  //   const externalScripts = component.__externalScripts__.filter((item: ExternalScript) => item.src);
  //   externalScripts.forEach((item: ExternalScript) => {
  //     const { src, integrity, crossorigin } = item;
  //     // 检查是否已经存在具有相同 src 的 <srcript> 标签
  //     const existingScript = document.querySelector(`script[src="${src}"]`);
  //     if (!existingScript) {
  //       const scriptTag = document.createElement('script');
  //       scriptTag.src = src;
  //       integrity && (scriptTag.integrity = integrity);
  //       crossorigin && (scriptTag.crossOrigin = crossorigin);
  //       document.body.appendChild(scriptTag);
  //     }
  //   });
  // }

  if (component?.__script__) {
    new Function(`${component.__script__}`)();
  }


  return () => {
    canvas.innerHTML = '';
  };
};

export default renderer;
