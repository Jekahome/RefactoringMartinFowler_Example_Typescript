## About
Examples of a typescript based on materials from the book Refactoring by Martin Fowler.

## Initialization

```bash
npm init
npm install typescript --save-dev (sudo apt install node-typescript)
npm install --save-dev tslint
npm install mocha  --save-dev  
npm install chai --save-dev
npm install sinon --save-dev
npm install eslint-plugin-mocha --save-dev
npm install faker --save-dev
npm install mocha-testcheck --save-dev
npm install node-mocks-http --save-dev
touch tsconfig.json
touch tslint.json
mkdir test
```

> file tsconfig.json
```json
{
  "compileOnSave": true,
  "compilerOptions": {
    "target": "es2019",
    "esModuleInterop": true,
    "module": "commonjs",
    "removeComments": true,
    "outDir": "js",
    "rootDir": "ts"
  },
  "include": [
    "ts/*",
    "ts/**/*"
  ]
}
```

> file tslint.json:
```json
{
  "defaultSeverity": "error",
  "extends": [
    "tslint:recommended"
  ],
  "jsRules": {},
  "rules": {
    "no-console": [true, "warning"],
    "trailing-comma": [ false ],
    "variable-name": [true, "check-format","ban-keywords", "allow-pascal-case","allow-leading-underscore"]
  },
  "rulesDirectory": []
}
```

> file package.json
```json
{
  "name": "project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "prebuild": "tslint -c tslint.json -p tsconfig.json --fix",
    "build": "tsc",
    "prestart": "npm run build",
    "test": "mocha test/**/*.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "chai": "^4.2.0",
    "eslint-plugin-mocha": "^6.2.0",
    "faker": "^4.1.0",
    "mocha": "^6.2.2",
    "mocha-testcheck": "^1.0.0-rc.0",
    "node-mocks-http": "^1.8.0",
    "sinon": "^7.5.0",
    "tslint": "^5.20.0",
    "typescript": "^3.6.4"
  }
}
```

## Compilation from `typescript` to `javascript`
```bash
$ node_modules/.bin/tsc
```

## Testing
```bash
$ npm test
 or singl file 19.js test
$ node_modules/.bin/mocha test/19 -g your_name_test
```
