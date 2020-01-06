const path = require('path');

module.exports = {
    devServer: {
        disableHostCheck: true
    },
    publicPath: "/app/",
    transpileDependencies: [
        "vuetify"
    ]
};