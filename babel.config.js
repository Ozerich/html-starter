module.exports = {
  plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread'],
  presets: [['@babel/env', { modules: false }]],
}
