/**
 * Created by Arison on 2018/10/25.
 */
const {injectBabelPlugin} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const path = require('path')

module.exports = function override(config, env) {

    config = injectBabelPlugin(
        ['import',
            {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true
            }, 'ant'
        ],
        config
    );


    config = injectBabelPlugin(
        ['import',
            {
                libraryName: "antd-mobile",
                libraryDirectory: 'lib',
                style: true
            }, 'ant-mobile'
        ],
        config
    );


    config = rewireLess.withLoaderOptions({
        modifyVars: {"@primary-color": "#4197FC"},
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
        'css': path.join(__dirname, './src/style/css'),
        'imgs': path.join(__dirname, './src/style/imgs'),
        'api': path.join(__dirname, './src/configs/api.config.js'),
        'action': path.join(__dirname, './src/redux/actions')
    }

    return config;
};