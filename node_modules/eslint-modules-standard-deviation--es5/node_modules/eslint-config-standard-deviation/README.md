# a [standard][standard] derived shared eslint-config

[![npm version](https://badge.fury.io/js/eslint-config-standard-deviation.svg)](https://badge.fury.io/js/eslint-config-standard-deviation)

> Another linter configuration for javascript `ES5`, `ES2015`, `ES.next` and `React` projects.

Based on `standard` shared eslint-config
* [eslint-config-standard][standard]
* [eslint-config-standard-react](https://github.com/feross/eslint-config-standard-react)

## What is different from `standard` eslint-config ?
[standard][standard] shared eslint-config rules are almost fine but we do not like to force us to ...
* not use semicolon `;`
* put space before function parens `function foo ()`

![eslint-config-standard-deviation][eslint-config-standard-deviation]
[eslint-config-standard-deviation]:./semicolon.jpg

[standard]: https://github.com/feross/eslint-config-standard

## Installation

### npm

```bash
npm install eslint-config-standard-deviation --save-dev
```

### dependencies installation

```bash
npm install eslint eslint-config-standard
 eslint-config-standard-react eslint-plugin-react eslint-plugin-promise eslint-plugin-standard --save-dev
```

#### ES2015, ES.next and React support
```bash
npm install eslint babel-eslint eslint-config-standard
 eslint-config-standard-react eslint-plugin-react eslint-plugin-promise eslint-plugin-standard --save-dev
```

## Usage
Add `extends` to project `.eslintrc`
```json
{
  "extends": ["eslint-config-standard-deviation"]
}
```

### ES2015, ES.next and React support
Add `parser` babel-eslint to `.eslintrc`
```json
{
  "parser": "babel-eslint",
  "extends": ["eslint-config-standard-deviation"]
}
```

### [optional] enable/disable [eslint rules](http://eslint.org/docs/rules/)
```json
{
  "parser": "babel-eslint",
  "extends": ["eslint-config-standard-deviation"],
  "rules": {
    "space-before-function-paren": ["2", "always"]
  }
}
```

Add scripts to `package.json`
```json
"scripts": {
  "lint": "eslint . --ext .js,.jsx",
  "testonly": "echo \"Error: no test specified\" && exit 1",
  "test": "npm run lint && npm run testonly"
}
```

## Projects using `eslint-config-standard-deviation`
* [react-scrollchor](https://github.com/bySabi/react-scrollchor)
* [react-scrollaware](https://github.com/bySabi/react-scrollaware)

## Contributing

* Documentation improvement
* Feel free to send any PR

## License

[ISC][isc-license]

[isc-license]:./LICENSE
