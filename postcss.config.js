module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('@fullhuman/postcss-purgecss')({
      content: [
        './templates/**/*.njk'
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    }),
    require('cssnano')({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
      }]
    }),
  ]
};
