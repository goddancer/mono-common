const autoprefixer = require('autoprefixer');
const remConf = require('./px2rem.config');
module.exports = {
  plugins: {
    autoprefixer,
    'postcss-pxtorem': {
      rootValue: remConf.UIdesignWidth === 375 ? 16 : 32,
      propList: ['*'],
      unitPrecision: remConf.unitPrecision,
      mediaQuery: false,
      minPixelValue: 10,
    },
  },
};
