import fs from 'fs';
import path, { resolve, join } from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import viteProgress from 'vite-plugin-progress'
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
// todo: 多页面[https://blog.csdn.net/m0_37499386/article/details/120460426]
export default defineConfig(({ command, mode }) => {
  const envPrefix = ['VITE_', 'VUE_APP_']
  const envConfig = loadEnv(mode, resolve(process.cwd()), envPrefix)
  // 1. 本地运行
  const isBuild = command === 'build'
  // 2. 本地打包
  const isAppProd = envConfig.VUE_APP_ENV === 'prod'
  // 3. 服务器打包
  const viteBaseConfig = {
    // 项目根目录（index.html 文件所在的位置）,
    root: './',
    // 开发或生产环境服务的公共基础路径 配置引入相对路径
    base: '/',
    // 用于加载 .env 文件的目录
    envDir: resolve('./'),
    // 自定义变量前缀
    envPrefix: envPrefix,
    // 静态资源服务的文件夹
    publicDir: 'public',
    // 需要用到的插件数组
    plugins: [
      vue({
        // // todo：开启ref转换[https://segmentfault.com/a/1190000041884869]
        refTransform: true
      })
    ],
    resolve: {
      // 文件系统路径别名
      alias: [
        { 
          find: "@", 
          replacement: resolve(__dirname, './src') 
        },
      ],
    },
    // 强制预构建插件包（引入第三方的配置）
    optimizeDeps: {
        // include: ['schart.js']
    },
    // 最常见的用例是自定义 JSX
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment'
    },
  }
  const viteServerConfig = {
      //启动项目自动弹出浏览器
      open: true,
      //启动端口
      port: 8888, 
      // 跨域，默认允许任何源 或 {origin: 'http://example.com',optionsSuccessStatus: 200}
      cors: true,
      // 强制依赖预构建
      force: false,
      //禁用或配置 HMR 连接
      hmr: true,
      // 配置转发
      proxy: {
        // '/api': {
        //   target: process.env.NODE_ENV === 'production' ? 'https://www.zhihu.com/' : 'https://d4e18a2.cpolar.top',	//实际请求地址
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, '')
        // },
      }
  }
  const viteBuildConfig = {
      // 指定输出路径
      outDir: resolve(`dist/${mode}/`), 
      // 指定生成静态文件目录
      assetsDir: resolve('assets'),
      // 关闭文件计算
      reportCompressedSize: false,
      // 构建后是否生成 source map 文件
      sourcemap: true,
      // 自定义底层的 Rollup 打包配置
      rollupOptions: {
        input: {
          index: './index.html',
          login: './login.html' 
        },
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id) { 
            // 将 node_modules 中的代码分别打包成一个 JS 文件
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        },
        // 不统计
        brotliSize: false, 
        // target: 'esnext',
        // 混淆器，terser构建后文件体积更小
        // minify: 'terser'
      },
      // 指定使用哪种混淆器
      // minify: 'terser',
      // 启用将构建后的文件写入磁盘
      write: true,
      // 构建时清空该目录
      emptyOutDir: true,
      // 启用 brotli 压缩大小报告
      brotliSize: true,
      // chunk 大小警告的限制
      chunkSizeWarningLimit: 1500,
      // 设置为 {} 则会启用 rollup 的监听器
      // watch: null,
      // 设置最终构建的浏览器兼容目标
      // target: ['modules'],
        // 是否自动注入 module preload 的 polyfill
      polyfillModulePreload: true,
      // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。 默认4096 (4kb)
      assetsInlineLimit: 4096,
      // 启用 CSS 代码拆分
      cssCodeSplit: true,
      // 允许用户为 CSS 的压缩设置一个不同的浏览器 target 与 build.target 一致
      // cssTarget: '',
      // 构建为库 
      // lib: {},
      // 当设置为 true，构建后将会生成 manifest.json 文件
      manifest: false,
      // 构建不生成 SSR 的 manifest 文件
      ssrManifest: false
      // 生成面向 SSR 的构建
      // ssr: undefined
  }
  
  if (isBuild && isAppProd) {
    // 添加gzip插件
    viteBaseConfig.plugins.push(
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            deleteOriginFile: false,
            algorithm: 'gzip',
            ext: '.gz',
        })
    )
    // 传递给 Terser 的更多 minify 选项
    viteBuildConfig.terserOptions = {
        compress: {
          // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          keep_infinity: true,
          // 生产环境时移除 console.log 调试代码
          drop_console: true,
          drop_debugger: true
        }
    }
    // 构建后是否生成 source map 文件
    viteBuildConfig.sourcemap = false
  }
  let viteMockServeConfig = null;
  let proxyServeConfig = null;
  if (!isAppProd) {
    // 加载 mock 配置
    const mockConfigContent = fs.readFileSync('./mock.config.js', 'utf-8');
    const mockConfig = mockConfigContent.replace(/^module\.exports\s+=\s+/gi, '');
    viteMockServeConfig = new Function(`return ${mockConfig}`)();

    // 加载 proxy 配置
    const proxyConfigContent = fs.readFileSync('./proxy.config.js', 'utf-8');
    const proxyConfig = proxyConfigContent.replace(/^module\.exports\s+=\s+/gi, '');
    proxyServeConfig = new Function(`return ${proxyConfig}`)();
  }
  if (viteMockServeConfig) {
    viteBaseConfig.plugins.push(viteMockServe(viteMockServeConfig));
  }
  // 打包分析
  if (isBuild) {
    viteBaseConfig.plugins.push(
      viteProgress()
    )
    viteBaseConfig.plugins.push(
      visualizer({ 
        emitFile: false,
        gzipSize: true,
        brotliSize: true,
        // 分析图生成的文件名
        file: "stats.html",
        open: true 
      })
    )
  }
   
  return {
    ...viteBaseConfig,
    build: viteBuildConfig,
    server: viteServerConfig
  }
})

