
import type { IApi } from 'dumi';
import { registerTechStack } from './htmlTechStack';
import modifyWebpackConfig from '../webpack';


export default (api: IApi) => {
    api.describe({
        key: 'preset-html',
    });

    // 注册自定义的 webpack 配置
    modifyWebpackConfig(api);   

    // 注册技术栈配置
    registerTechStack(api);
};