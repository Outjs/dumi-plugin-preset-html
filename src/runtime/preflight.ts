

export default function preflight(component: any) {
  return new Promise<void>((resolve, reject) => {
    const el = document.createElement('div');
    el.style.display = 'none';
    el.style.overflow = 'hidden';
    document.body.appendChild(el);
    //if (component.__css__) {
      setTimeout(() => {
        document
          .querySelectorAll(`style[css-${component.__id__}]`)
          .forEach((el) => el.remove());
        document.head.insertAdjacentHTML(
          'beforeend',
          `<style css-${component.__id__}>${component.__css__}</style>`,
        );
      }, 1);
    //}

    const js = component?.render?.() || '';
    if (js) {
      el.insertAdjacentHTML('beforeend', js);
    
      resolve();
    } else {
      console.error('preflight', 'js is empty');
      reject();
    }
  });
}
