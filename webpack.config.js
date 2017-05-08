var path = require("path");

// browser app
module.exports = {
    entry: {
        players: "./dev/browser/players/main.ts",
        boardGame: "./dev/browser/boardGame/main.ts",
        control: "./dev/browser/control/main.ts"
    },

    output: {
        path: path.resolve(__dirname, "prod/browser"),
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