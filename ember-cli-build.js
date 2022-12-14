'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { Webpack } = require('@embroider/webpack');

class TailwindWebpack extends Webpack {
  setupStyleConfig() {
    const { loaders, plugins } = super.setupStyleConfig(...arguments);

    return {
      loaders: [
        ...loaders,
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                { tailwindcss: { config: './tailwind.config.js' } },
                require('autoprefixer'),
              ],
            },
          },
        },
      ],
      plugins,
    };
  }
}

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return require('@embroider/compat').compatBuild(app, TailwindWebpack, {
    // staticAddonTestSupportTrees: true,
    // staticAddonTrees: true,
    // staticHelpers: true,
    // staticModifiers: true,
    // staticComponents: true,
    // splitAtRoutes: ['route.name'], // can also be a RegExp
    packagerOptions: {
      webpackConfig: {},
    },
  });
};
