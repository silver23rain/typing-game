const path = require("path");

module.exports = {
    mode: "none",
    entry: "./src/index.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js",
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, "public"),
        inline: true,
        hot: true,
        host: "localhost",
        port: 3000,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
};
