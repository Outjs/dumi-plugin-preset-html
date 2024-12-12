import {getPkgPath, getPluginPath } from '@/shared';
import type { IApi } from 'dumi';
import { logger } from 'dumi/plugin-utils';
import type { IDumiTechStackRuntimeOpts } from 'dumi/tech-stack-utils';
import { defineTechStack, wrapDemoWithFn } from 'dumi/tech-stack-utils';
import { fsExtra } from 'dumi/plugin-utils';
import { join } from 'path';
import hashId from 'hash-sum';
import { compile, compileHtml, toCommonJS } from '../compiler';

const COMPILE_FILENAME = 'compiler.mjs';
const RENDERER_FILENAME = 'renderer.mjs';
const PREFLIGHT_FILENAME = 'preflight.mjs';
export const HtmlTechStack = (runtimeOpts: IDumiTechStackRuntimeOpts) =>
    defineTechStack({
        name: 'html-tech-stack',
        runtimeOpts,
        isSupported(_, lang: string) {
            return ['html'].includes(lang);
        },
        onBlockLoad(args) {
            logger.info('onBlockLoad', args)
            if (!args.path.endsWith('.html')) return null;
            let raw = args.entryPointCode;
            const id = hashId(raw);
            const result = compileHtml({ id, code: raw, filename: args.path });
            return {
                type: 'tsx',
                content: result.js,
            };
        },
        transformCode(raw, opts) {
            logger.info('transformCode----', raw, opts)
            const id = hashId(raw);
            const filename = opts.fileAbsPath;
            const js = compile({ id, code: raw, filename });
            if (opts.type === 'code-block') {

                const code = wrapDemoWithFn(js, {
                    filename,
                    parserConfig: {
                        syntax: 'ecmascript',
                    },
                });
                logger.info(code)
                return `(${code})()`;
            }
            return js;
        },
    });


export function registerTechStack(api: IApi) {
    const pkgPath = getPkgPath('dumi-plugin-preset-html', api.cwd);
    const libPath = join(pkgPath, '/lib');

    api.onGenerateFiles(() => {
        api.writeTmpFile({
            path: COMPILE_FILENAME,
            content: fsExtra.readFileSync(join(libPath, COMPILE_FILENAME), 'utf8'),
        });
        api.writeTmpFile({
            path: RENDERER_FILENAME,
            content: fsExtra.readFileSync(join(libPath, RENDERER_FILENAME), 'utf8'),
        });
        api.writeTmpFile({
            path: PREFLIGHT_FILENAME,
            content: fsExtra.readFileSync(join(libPath, PREFLIGHT_FILENAME), 'utf8'),
        });
    });

    const runtimeOpts = {
        compilePath: getPluginPath(api, COMPILE_FILENAME),
        rendererPath: getPluginPath(api, RENDERER_FILENAME),
        preflightPath: getPluginPath(api, PREFLIGHT_FILENAME),
        pluginPath: join(libPath, 'runtimePlugin.mjs'),
    };

    api.register({
        key: 'registerTechStack',
        stage: 0,
        fn: () => HtmlTechStack(runtimeOpts),
    });

}
