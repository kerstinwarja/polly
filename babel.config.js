module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
module: {
  rules: [
    {
      test: /\.mp3$/,
      loader: 'url-loader'
    }
  ]
}