module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  //包含了eslint-plugin-standard和eslint-plugin-promise的规则
  extends: "standard",
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // 自定义规则
  /**
   *  "off" 或 0 - 关闭规则
   *  "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
   *  "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  "rules": {

    /**
     * 不需要
     */
    // 强制在 function的左括号之前使用一致的空格
    "space-before-function-paren": 0,
    // 文件末尾强制换行
    "eol-last": 0,
    // 使用 === 替代 == allow-null允许null和undefined==
    "eqeqeq": 0,
    // 强制函数中的变量要么一起声明要么分开声明
    "one-var": 0,
    // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    "no-undef": 0,
    // 要求箭头函数的参数使用圆括号
    "arrow-parens": 0,
    // 强制 generator 函数中 * 号周围使用一致的空格
    "generator-star-spacing": 0,
    // 禁用指定的通过 require 加载的模块
    "no-return-assign": 0,
     // 禁止在注释中使用特定的警告术语
    "no-warning-comments": 0,
    // 禁止出现未使用过的变量
    "no-unused-vars": 0,
    // 禁止 if 语句中有 return 之后有 else
    "no-else-return": 0,
    // 强制使用有效的 JSDoc 注释
    "valid-jsdoc": [0, {
      "requireParamDescription": true,
      "requireReturnDescription": true
    }],
    // 强制在对象字面量的属性中键和值之间使用一致的间距
    "key-spacing": [0, {
      "beforeColon": false,
      "afterColon": true
    }],
    // 限制圈复杂度，也就是类似if else能连续接多少个
    "complexity": 0,
    // 禁止出现未使用过的表达式
    "no-unused-expressions": 0,
    // 禁止自身比较
    "no-self-compare": 0,
     // 禁用逗号操作符
    "no-sequences": 0,
    // 强制把变量的使用限制在其定义的作用域范围内
    "block-scoped-var": 0,
    "no-useless-escape": 0,
    // 禁止扩展原生类型
    "no-extend-native": 0,
    // 禁止使用 var 多次声明同一变量
    "no-redeclare": 0,
    "block-spacing": 0,

    /**
     * 警告
     */
    // 禁止不必要的布尔转换
    "no-extra-boolean-cast": 1,
    //  禁止不必要的括号 //(a * b) + c;//报错
    "no-extra-parens": 1,
    // 禁止空语句块
    "no-empty": 1,
    // 不允许在变量定义之前使用它们
    "no-use-before-define": [1, "nofunc"],



    /**
     * 错误
     */

    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
    // always-multiline：多行模式必须带逗号，单行模式不能带逗号
    "comma-dangle": [0, "never"],
    // 禁止在条件中使用常量表达式
    // if (false) {
    //     doSomethingUnfinished();
    // } //cuowu
    "no-constant-condition": 2,
    // 禁止 function 定义中出现重名参数
    "no-dupe-args": 2,
    // 禁止对 Function 对象使用 new 操作符
    "no-new-func": 2,
    // 禁止重复的 case 标签
    "no-duplicate-case": 2,
    // 禁止对象字面量中出现重复的 key
    "no-dupe-keys": 2,
    // 禁止在正则表达式中使用空字符集 (/^abc[]/)
    "no-empty-character-class": 2,
    // 禁止 RegExp 构造函数中无效的正则表达式字符串
    "no-invalid-regexp": 2,
    // 禁止对 function 声明重新赋值
    "no-func-assign": 0,
    // 强制 typeof 表达式与有效的字符串进行比较
    // typeof foo === "undefimed" 错误
    "valid-typeof": 2,
    // 禁止在return、throw、continue 和 break语句之后出现不可达代码
    /*
        function foo() {
        return true;
        console.log("done");
        }//错误
    */
    "no-unreachable": 2,
    // 禁止出现令人困惑的多行表达式
    "no-unexpected-multiline": 2,
    // 禁用稀疏数组
    "no-sparse-arrays": 2,
    // 禁止覆盖受限制的标识符
    "no-shadow-restricted-names": 2,
    // 禁止条件表达式中出现赋值操作符
    "no-cond-assign": 2,
    // 禁止对原生对象赋值
    "no-native-reassign": 2,
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,

    /**
     * 代码风格
     */
    // 禁止使用多个空格
    "no-multi-spaces": 1,
    // 要求 return 语句要么总是指定返回的值，要么不指定
    "consistent-return": 0,
    // 定义对象的set存取器属性时，强制定义get
    "accessor-pairs": 2,
    // 强制object.key 中 . 的位置，参数:
    //      property，"."号应与属性在同一行
    //      object, "." 号应与对象名在同一行
    "dot-location": [2, "property"],
    // 禁用不必要的嵌套块
    "no-lone-blocks": 2,
    //  禁用标签语句
    "no-labels": 2,
    // 禁止数字字面量中使用前导和末尾小数点
    "no-floating-decimal": 2,
    // 禁止在循环中出现 function 声明和表达式
    "no-loop-func": 2,
    // 禁止不必要的分号
    "no-extra-semi": 1,
    // 要求或禁止使用分号而不是 ASI（这个才是控制行尾部分号的，）
    "semi": 1,
    // 禁止抛出非异常字面量
    "no-throw-literal": 2,

    // 禁止不必要的 .call() 和 .apply()
    "no-useless-call": 2,
    // 禁止不必要的字符串字面量或模板字面量的连接
    "no-useless-concat": 2,
    // 禁用 void 操作符
    "no-void": 2,
    // 禁用 with 语句
    "no-with": 2,
    // 要求操作符周围有空格
    "space-infix-ops": 2,
    // 强制所有控制语句使用一致的括号风格
    "curly": 1,
  }
}
