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
  console.log('222----',memo, '333',props)
  const files = getApp(props);
  console.log('444----',files)
  config.files = Object.entries(files).reduce((acc, [k, v]) => {
    acc[k] = v.content;
    return acc;
  }, {} as Record<string, string>);
  Object.assign(memo, config);
  console.log('666----',memo, '777',props)
  return memo;
}

export function modifyCodeSandboxData(memo: any, props: any) {
  Object.assign(memo, { files: getApp(props) });
  return memo;
}
