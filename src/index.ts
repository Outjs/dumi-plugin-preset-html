import type { IApi } from 'dumi';

export default (api: IApi) => {
  api.describe({
    key: 'html',
    config: {
      schema(joi) {
        return joi.object({
          option1: joi.string().default('default value'),
        });
      },
    },
    enableBy: api.EnableBy.config,
  });


  return {
    plugins: [require.resolve('./techStack')],
  };
};
