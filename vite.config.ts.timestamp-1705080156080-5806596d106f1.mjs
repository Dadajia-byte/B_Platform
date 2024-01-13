// vite.config.ts
import { defineConfig } from "file:///C:/Users/Anshu%20Chen/Desktop/%E5%89%8D%E7%AB%AF%E7%AC%94%E8%AE%B0/Vue/vue3/vue3_admin_template/project/node_modules/.pnpm/vite@5.0.11_@types+node@20.10.6_sass@1.69.7/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/Anshu%20Chen/Desktop/%E5%89%8D%E7%AB%AF%E7%AC%94%E8%AE%B0/Vue/vue3/vue3_admin_template/project/node_modules/.pnpm/@vitejs+plugin-vue@4.6.2_vite@5.0.11_vue@3.4.5/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { createSvgIconsPlugin } from "file:///C:/Users/Anshu%20Chen/Desktop/%E5%89%8D%E7%AB%AF%E7%AC%94%E8%AE%B0/Vue/vue3/vue3_admin_template/project/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.0.11/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { viteMockServe } from "file:///C:/Users/Anshu%20Chen/Desktop/%E5%89%8D%E7%AB%AF%E7%AC%94%E8%AE%B0/Vue/vue3/vue3_admin_template/project/node_modules/.pnpm/vite-plugin-mock@3.0.1_esbuild@0.19.11_mockjs@1.1.0_vite@5.0.11/node_modules/vite-plugin-mock/dist/index.mjs";
import.meta.EventEmitter.defaultMaxListeners = 0;
var vite_config_default = defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      viteMockServe({
        enable: command === "serve"
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]"
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src")
      }
    },
    // scss全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";'
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBbnNodSBDaGVuXFxcXERlc2t0b3BcXFxcXHU1MjREXHU3QUVGXHU3QjE0XHU4QkIwXFxcXFZ1ZVxcXFx2dWUzXFxcXHZ1ZTNfYWRtaW5fdGVtcGxhdGVcXFxccHJvamVjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQW5zaHUgQ2hlblxcXFxEZXNrdG9wXFxcXFx1NTI0RFx1N0FFRlx1N0IxNFx1OEJCMFxcXFxWdWVcXFxcdnVlM1xcXFx2dWUzX2FkbWluX3RlbXBsYXRlXFxcXHByb2plY3RcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0Fuc2h1JTIwQ2hlbi9EZXNrdG9wLyVFNSU4OSU4RCVFNyVBQiVBRiVFNyVBQyU5NCVFOCVBRSVCMC9WdWUvdnVlMy92dWUzX2FkbWluX3RlbXBsYXRlL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0Lm1ldGEuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAwIC8vIFx1ODlFM1x1OTY2NFx1OTY1MFx1NTIzNlxuXG4vLyBcdTVGMTVcdTUxNjVzdmdcdTk3MDBcdTg5ODFcdTc1MjhcdTUyMzBcdTc2ODRcdTYzRDJcdTRFRjZcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xuXG4vLyBcdTVGMTVcdTUxNjVtb2NrXHU2M0QyXHU0RUY2XG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jaydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICB2dWUoKSxcbiAgICAgIHZpdGVNb2NrU2VydmUoe1xuICAgICAgICBlbmFibGU6IGNvbW1hbmQgPT09ICdzZXJ2ZScsXG4gICAgICB9KSxcbiAgICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgICAgLy8gU3BlY2lmeSB0aGUgaWNvbiBmb2xkZXIgdG8gYmUgY2FjaGVkXG4gICAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxuICAgICAgICAvLyBTcGVjaWZ5IHN5bWJvbElkIGZvcm1hdFxuICAgICAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJyxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoJy4vc3JjJyksXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICAvLyBzY3NzXHU1MTY4XHU1QzQwXHU1M0Q4XHU5MUNGXHU5MTREXHU3RjZFXG4gICAgY3NzOiB7XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCIuL3NyYy9zdHlsZXMvdmFyaWFibGUuc2Nzc1wiOycsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFiLFNBQVMsb0JBQW9CO0FBQ2xkLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7QUFJakIsU0FBUyw0QkFBNEI7QUFHckMsU0FBUyxxQkFBcUI7QUFOOUIsWUFBWSxhQUFhLHNCQUFzQjtBQVMvQyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLFFBQVEsTUFBTTtBQUMzQyxTQUFPO0FBQUEsSUFDTCxTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsTUFDSixjQUFjO0FBQUEsUUFDWixRQUFRLFlBQVk7QUFBQSxNQUN0QixDQUFDO0FBQUEsTUFDRCxxQkFBcUI7QUFBQTtBQUFBLFFBRW5CLFVBQVUsQ0FBQyxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsa0JBQWtCLENBQUM7QUFBQTtBQUFBLFFBRTFELFVBQVU7QUFBQSxNQUNaLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLEtBQUssUUFBUSxPQUFPO0FBQUEsTUFDM0I7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUdBLEtBQUs7QUFBQSxNQUNILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQSxVQUNKLG1CQUFtQjtBQUFBLFVBQ25CLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
