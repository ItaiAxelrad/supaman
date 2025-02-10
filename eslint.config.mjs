import mantine from 'eslint-config-mantine';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...mantine,
  {
    ignores: ['.next/*', '**/*.{mjs,cjs,js,d.ts,d.mts}'],
  },
  {
    rules: {
      curly: 'off',
      'prefer-const': 'off',
      'no-else-return': 'off',
      'no-unused-vars': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/display-name': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'import/no-unresolved': 'off',
      'import/no-named-as-default': 'off',
    },
  },
);
