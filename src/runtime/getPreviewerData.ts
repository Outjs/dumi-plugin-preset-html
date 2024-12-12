import type { IFiles } from 'codesandbox-import-utils/lib/api/define';
import type { IPreviewerProps } from 'dumi/dist/client/theme-api';

export const defaultTitle = 'html demo';
export const defaultDesc = 'An auto-generated html demo by dumi';

const genIndexHtml = (
  title: string,
  description: string,
  code: string,
  entryFile: string,
) => {
  const regex = /<!doctype html>/i;
  return regex.test(code) ? code : `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="${description}" />
        <title>${title}</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.4/font/bootstrap-icons.min.css">
    </head>
    <body>
        <div id="app">
          ${code}
        </div>
        <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.bundle.min.js"></script>
    </body>
</html>
`;
};



export function getApp({
  asset,
  title = defaultTitle,
  description = defaultDesc,
}: IPreviewerProps) {
  const files: IFiles = {};
  const previewerEntryFileName = `src/index.html`;

  let code: string = '';
  Object.entries(asset.dependencies).forEach(([name, { type, value }]) => {
    if (type === 'FILE') {
      code = value;
    }
  });

  files['package.json'] = {
    content: JSON.stringify({
      name: 'html-demo',
      version: '0.0.0',
      description: 'An auto-generated html demo by dumi',
      main: 'index.html',
      scripts: {
        start: 'http-server -p 8000',
      },
      dependencies: {
        'http-server': '14.1.1',
      },
    }),
    isBinary: false,
  };

  files['index.html'] = {
    content: genIndexHtml(title, description, code, previewerEntryFileName),
    isBinary: false,
  };

  return files;
}
