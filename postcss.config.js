const tailwind = require('tailwindcss');
const cssnano = require('cssnano');
const presetEnv = require('postcss-preset-env')({
  features: {
    // enable nesting
    'nesting-rules': true,
    'focus-within-pseudo-class': false
  }, 
});

const plugins =
  process.env.NODE_ENV === 'production'
    ? [tailwind, presetEnv, cssnano]
    : [tailwind, presetEnv];

module.exports = { plugins };