import { defaultTitle, getApp } from './getPreviewerData';

export function modifyStackBlitzData(memo: any, props: any) {
  const { title, description } = props;
  const config = {
    title: title || defaultTitle,
    description,
    template: 'node',
    files: {},
    dependencies: {},
  };
  const files = getApp(props);
  config.files = Object.entries(files).reduce((acc, [k, v]) => {
    acc[k] = v.content;
    return acc;
  }, {} as Record<string, string>);
  Object.assign(memo, config);
  return memo;
}

export function modifyCodeSandboxData(memo: any, props: any) {
  Object.assign(memo, { files: getApp(props) });
  return memo;
}
