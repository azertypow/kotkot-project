var path = require("path");

// browser app
module.exports = {
    entry: {
        browser: "./dev/browser/main.ts",
        // nodeApp: "./dev/nodeApp/main.ts"
    },

    output: {
        path: path.resolve(__dirname, "prod"),
        filename: "./[name]/main.js"
    },

    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: "source-map-loader"
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, "prod"),
        compress: true,
        port: 9000
    },

    devtool: 'inline-source-map'
};