const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "./",
  devServer: {
    // can be overwritten by process.env.HOST
    host: "0.0.0.0",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("src", resolve("src"))
      .set("components", resolve("src/components"));
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        win: {
          icon: "./public/app.ico"
        },
        mac: {
          icon: "./public/app.png"
        },
        productName: 'Coisin4Music'
      }
    }
  }
};
