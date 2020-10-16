module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true
  },
  purge: {
    content: ['./src/**/*.vue'],
    extractors: [
      {
        extractor: class TailwindExtractor {
          static extract(content) {
              return content.match(/[A-z0-9-:\/]+/g) || [];
          }
        },
        extensions: ['vue']
      }
    ]
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
