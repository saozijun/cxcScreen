const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@use "@/assets/init.scss" as *;`
      }
    }
  },
  
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    }
  }
});