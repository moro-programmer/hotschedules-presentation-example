const autoprefixer = require('autoprefixer');
const postcssReporter = require('postcss-reporter');

module.exports = {
    plugins: [
        autoprefixer({ browsers: ['last 2 versions'] }),
        postcssReporter({})
    ]
}
