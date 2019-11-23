const path = require('path');
const common = require("./webpack.common");
const merge = require("webpack-merge");

module.exports = merge(common, {
	mode: 'development',
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            }
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'docs'),
        compress: true
    }
});