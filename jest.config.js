module.exports = {
    roots: ['./src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    globals: {
        'ts-jest': {
            diagnostics: false
        }
    }
};
