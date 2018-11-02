const webpackConfig = require('./webpack.config');

module.exports = config => {
    const tests = "spec/**/*.spec.js";
    const entry = 'dist/bundle.js';

    config.set({
        basePath: '',
        frameworks: ["mocha", "chai", 'sinon'],
        autoWatch: true,
        autoWatchBatchDelay: 300,
        singleRun: false,
        // singleRun: true,
        files: [
            'node_modules/babel-polyfill/dist/polyfill.min.js',
            'node_modules/craftyjs/dist/crafty.js',
            // entry,
            tests
        ],
        preprocessors: {
            [entry]: ['webpack'],
            [tests]: ["webpack"]
        },
        babelPreprocessor: {
            options: {
                presets: ['es2015'],
            }
        },
        webpack: webpackConfig,
        // browsers: ["Chrome"]
        browsers: ["PhantomJS"]
    });
};