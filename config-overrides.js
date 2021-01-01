const { override, addWebpackPlugin } = require('customize-cra')
const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = (webpack, ...args) => {
  webpack.plugins.pop();
  const overridenConf = override(
    addWebpackPlugin(
      new InjectManifest({
        swSrc: './src/custom-serviceworker.js',
        swDest: './worker.js'
      })
    )
  )(webpack, ...args);
  return overridenConf
}
