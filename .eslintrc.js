module.exports = {
  extends: ['plugin:vue/vue3-recommended'],
  // add your custom rules here
  rules: {
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        CallExpression: { arguments: 'first' },
      },
    ],
    // "prefer-promise-reject-errors": "off",
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    'no-console': 'off',
    // semi: [2, 'always'],
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: '*' },
      { blankLine: 'never', prev: 'import', next: 'import' },
      { blankLine: 'never', prev: 'expression', next: 'expression' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always',
      },
    ],
    'vue/script-indent': [
      'error',
      2,
      {
        switchCase: 1,
        baseIndent: 0,
      },
    ],
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        // indent: 'off',
      },
    },
  ],
}
