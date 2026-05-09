import react from './react.js'

export default [
  ...react,
  {
    rules: {
      'react/no-unknown-property': ['error', { ignore: ['jsx', 'global'] }],
    },
  },
]
