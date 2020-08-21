module.exports = {
  extends: ['prettier', 'plugin:prettier/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2015
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        trailingComma: 'none',
        tabWidth: 2,
        semi: false,
        singleQuote: true,
        htmlWhitespaceSensitivity: 'ignore'
      }
    ]
  }
}
/* 
1) This is the basic to let eslink work with prettier.
$ npm i -D eslint-plugin-prettier eslint-config-prettier prettier

module.exports = {
  extends: ["plugin:prettier/recommended"],
}

See: https://blog.ojisan.io/eslint-prettier

2) If you face "Parsing error: The keyword 'import' is reserved"
when do "npm run serve", put the following:

module.exports = {
   // ・・・
   parserOptions: {
     sourceType: "module",
     ecmaVersion: 2015,
   },
};

See: https://qiita.com/kozzzz/items/be3a5f326311b6784860
See: https://numb86-tech.hatenablog.com/entry/2018/09/17/185100

3) Set the parser to vue-eslint-parser
- "parser": "babel-eslint",
+ "parser": "vue-eslint-parser",
  "parserOptions": {
+     "parser": "babel-eslint",
      "sourceType": "module"
  }
  See: https://eslint.vuejs.org/user-guide/#usage
  
4) Add rules as same as .prettierrc. You need both .prettierrc and .eslintrc.js

5) add babel.config.js as follows:
module.exports = {
  presets: [['@vue/app', { useBuiltIns: 'entry' }]]
}
*/
