module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [ 
        "eslint:recommended",
        "plugin:react/recommended",
    ],
    "extends": ["plugin:prettier/recommended"],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "jsx-a11y"
    ],
    "rules": {
        "no-console": 0,
        "react/prop-types": 0
    }
};