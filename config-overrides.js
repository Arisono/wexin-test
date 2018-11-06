/**
 * Created by Arison on 2018/10/25.
 */
const {injectBabelPlugin} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const path = require('path')

module.exports = function override(config, env) {

    config = injectBabelPlugin(
        // ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'mycss' }],
        ['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}],
        config
    );

    config = rewireLess.withLoaderOptions({
        modifyVars: {"@primary-color": "#1DA57A"},
        javascriptEnabled: true,
    })(config, env);

    //配置替代路径
    config.resolve.alias = {
        '@': path.join(__dirname, './src'),
        'components': path.join(__dirname, './src/components'),
        'configs': path.join(__dirname, './src/configs'),
        'model': path.join(__dirname, './src/model'),
        'modules': path.join(__dirname, './src/modules'),
        'style': path.join(__dirname, './src/style'),
        'utils': path.join(__dirname, './src/utils'),
        'css': path.join(__dirname, './src/style/mycss'),
    }

    return config;
};