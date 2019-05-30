module.exports = {
    presets: [
        [
            '@babel/env',
            {
                useBuiltIns: 'usage',
                corejs: 3,
            },
        ],
    ],
    exclude: 'node_modules/**',
};
