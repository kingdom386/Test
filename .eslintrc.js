// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    "no-trailing-spaces": 1,
    "semi": [2, "always"],//语句强制分号结尾
    "quotes": [0, "single"],//引号类型 `` "" ''
    "space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格
    "comma-dangle": [0, "never"],//对象字面量项尾不能有逗号
    "no-unneeded-ternary": 0,//禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
    "no-extra-parens": 0,
    "no-unused-expressions": "off"
  }
}
