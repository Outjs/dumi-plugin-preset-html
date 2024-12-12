import type Config from '@umijs/bundler-webpack/compiled/webpack-5-chain';
import type { IApi } from 'dumi';
import path from 'node:path';

function getConfig(config: Config, api: IApi) {
    const { userConfig } = api;
    const dumiSrc = path.resolve(api.paths.absSrcPath);
    const inlineLimit = parseInt(userConfig.inlineLimit || '10000', 10);

    config.module
        .rule('html')
        .test(/\.html$/)
        .exclude.add(dumiSrc)
        .end()
        .use('html-loader')
        .loader(require.resolve('html-loader'))
        .options({})

    
}


export default function (api: IApi) {
    api.chainWebpack((memo) => {
        getConfig(memo, api);
    });
}
