export default {
    entry: './src/index.js',
    mode: "production",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["css-loader"],
            },
        ],
    },
};