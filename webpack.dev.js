const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, "public"),
        inline: true,
        hot: true,
        host: "localhost",
        port: 3000,
        open: true,
    },
});
