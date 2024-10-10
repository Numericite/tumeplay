const path = require('path');

function addModuleToMainRule(config, moduleName) {
  addPathToMainRule(config, path.resolve('node_modules/' + moduleName));
}

function addPathToMainRule(config, modulePath) {
  let include = config.module.rules[2].oneOf[1].include;

  if (Array.isArray(include)) {
    include.push(modulePath);
  } else {
    include = [include, modulePath];
  }

  config.module.rules[2].oneOf[1].include = include;
}

module.exports = function override(config, env) {
  // Use a single entry point for production
  if (env === 'production') {
    config.entry = path.resolve('src/indexWeb.js');
  } else {
    config.entry[0] = path.resolve('src/indexWeb.js');
    config.entry[1] = path.resolve('src/index.js');
  }

  const modulesToAdd = [
    'react-native-gesture-handler',
    'react-native-screens',
    'react-native-animatable',
    '@react-navigation',
    '@react-native-community/async-storage',
    'react-native-event-listeners',
    'react-native-maps',
    'react-native-htmlview',
  ];

  modulesToAdd.forEach(module => addModuleToMainRule(config, module));

  for (const plugin of config.plugins) {
    if (plugin.constructor.name === 'DefinePlugin') {
      plugin.definitions = {
        ...plugin.definitions,
        __DEV__: env === 'development',
        'process.env.NODE_ENV': JSON.stringify(env),
      };
    }
  }

  config.module.rules[2].oneOf[1].options.sourceType = 'unambiguous';

  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
      'react-native-modal': 'modal-react-native-web',
      '@react-native-community/async-storage':
        'react-native-web/dist/exports/AsyncStorage',
      'react-native-maps': 'react-native-web-maps',
    },
    extensions: ['.web.js', '.js', '.jsx', '.json'],
  };

  return config;
};
