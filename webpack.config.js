const WebPack = require('webpack');

/**
 * @desc Some config can view： https://github.com/nestjs/nest/issues/7198。
 *      Nest.Js's creator recommend us to do as upper link's demo
 *      I think it's very good～
 * @param options
 * @returns {{plugins: *[], externals: *[]}|boolean}
 */
module.exports = function (options) {
  const { plugins, ...config } = options;
  return {
    ...config,
    externals: [],
    plugins: [
      ...plugins,
      new WebPack.IgnorePlugin({
        checkResource(resource) {
          const lazyImports = [
            '@nestjs/microservices',
            '@nestjs/websockets/socket-module',
            '@nestjs/microservices/microservices-module',
            'class-validator',
            'class-transformer',
          ];
          if (!lazyImports.includes(resource)) {
            return false;
          }
          try {
            require.resolve(resource, {
              paths: [process.cwd()],
            });
          } catch (err) {
            return true;
          }
          return false;
        },
      }),
    ],
  };
};
