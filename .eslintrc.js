module.exports = {
    "parser": "babel-eslint",

    "extends": ["airbnb"],

    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "impliedStrict": true,
            "jsx": true,
            "experimentalObjectRestSpread": true
        }
    },

    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "mocha": true
    },

    "plugins": [
        "react", "flowtype"
    ],

    "globals": {
        "define": true
    },

    "settings": {
        "flowtype": {
            "onlyFilesWithFlowAnnotation": true
        }
    },

    "rules": {
        'import/prefer-default-export': 'off',
        'react/prefer-stateless-function': 'warn',
        'no-unused-expressions': [
            'warn', {
                allowShortCircuit: false,
                allowTernary: false
            }
        ],
        'import/no-extraneous-dependencies': [
            'error', {
                devDependencies: ['src/**/*.spec.js']
            }
        ],
        "quotes": [
            2,
            "single", {
                "avoidEscape": true
            }
        ],
        "indent": [
            "error", 4
        ],
        "react/jsx-indent": [
            "error", 4
        ],
        "jsx-quotes": [
            "error", "prefer-single"
        ],
        "max-len": [
            "warn", 120
        ],
        "comma-dangle": [
            "error", "never"
        ],

        "func-style": "off",

        // ESLint-plugin-React
        // https://github.com/yannickcr/eslint-plugin-react
        'react/jsx-filename-extension': [
            'error', {
                extensions: ['.jsx', '.js']
            }
        ],
        "react/forbid-prop-types": [
            "error", {
                "forbid": ["any"]
            }
        ],
        "react/jsx-boolean-value": "warn",
        "react/jsx-closing-bracket-location": "off",
        "react/jsx-curly-spacing": "warn",
        "react/jsx-indent-props": "off",
        "react/jsx-key": "warn",
        "react/jsx-max-props-per-line": "off",
        "react/jsx-no-bind": "off",
        "react/jsx-no-literals": "off",
        "react/jsx-pascal-case": "warn",
        "react/jsx-sort-prop-types": "off",
        "react/jsx-sort-props": "off",
        "react/jsx-wrap-multilines": "error",
        "react/no-multi-comp": "warn",
        "react/no-set-state": "off",
        "react/prefer-es6-class": "warn",
        "react/self-closing-comp": "warn",
        "react/sort-comp": [
            "error", {
                order: ['static-methods', 'lifecycle', 'render', 'everything-else']
            }
        ],
        "react/sort-prop-types": "warn",

        // ESLint-plugin-Flowtype
        // https://github.com/gajus/eslint-plugin-flowtype#configuration

        // marks Flow type identifiers as defined
        'flowtype/define-flow-type': "error",
        // requires that all function parameters have type annotations
        'flowtype/require-parameter-type': "off",
        // requires that functions have return type annotation
        'flowtype/require-return-type': "off",
        // makes sure that files have a valid @flow annotation
        'flowtype/require-valid-file-annotation': "error",
        // enforces consistent spacing after the type annotation colon
        'flowtype/space-after-type-colon': [
            "error", 'always'
        ],
        // enforces consistent spacing before the type annotation colon
        'flowtype/space-before-type-colon': [
            "error", 'never'
        ],
        // enforces a consistent naming pattern for type aliases
        'flowtype/type-id-match': "off",
        // marks Flow type alias declarations as used
        'flowtype/use-flow-type': "off",
        // checks for simple Flow syntax errors
        'flowtype/valid-syntax': "error"
    }
};
