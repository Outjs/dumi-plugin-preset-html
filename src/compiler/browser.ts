

import { compileHtml, toCommonJS } from './index';

const compile = async (code: string) => {
  const result = compileHtml({ code });
  return toCommonJS(result).code;
};

export default compile;