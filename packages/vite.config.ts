import { resolve } from 'path';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'modules',
    //打包文件目录
    outDir: 'es',
    //压缩
    emptyOutDir: false,
    minify: true,
    //css分离
    // cssCodeSplit: false,
    rollupOptions: {
      //忽略打包文件
      external: [
        'react',
        'react-dom',
        /\antd/,
        /\ant-design/,
        /\react/,
        /\.scss/,
        /\.stories.ts/
      ],
      input: ['./src/index.ts'],
      output: [
        {
          format: 'es',
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: (name) => {
            if (['default', 'Button'].includes(name.exports[0])) {
              return 'src/[name].mjs'
            }
            return '[name].mjs'
          },
          //让打包目录和我们目录对应
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          globals: {
            react: "react",
            antd: "antd",
            "react-dom": "react-dom",
            '@ant-design': '@ant-design',
          },
          //配置打包根目录
          dir: resolve(__dirname, './react-cjx-ui/es'),
        },
        {
          format: 'cjs',
          //不用打包成.cjs
          entryFileNames: (name) => {
            if (['default', 'Button'].includes(name.exports[0])) {
              return 'src/[name].js'
            }
            return '[name].js'
          },
          //让打包目录和我们目录对应
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          globals: {
            react: "react",
            antd: "antd",
            "react-dom": "react-dom",
            '@ant-design': '@ant-design',
          },
          //配置打包根目录
          dir: resolve(__dirname, './react-cjx-ui/lib'),
        }
      ]
    },
    lib: {
      entry: './src/index.ts',
      name: 'cjx'
    }
  },
  plugins: [
    react(),
    // @ts-ignore
    dts({
      include: ['index.ts', './src'],
      cleanVueFileName: true,
      copyDtsFiles: true,
      entryRoot: 'src',
      exclude: './src/stories',
      outDir: [
        resolve(__dirname, './react-cjx-ui/es/src'),
        resolve(__dirname, './react-cjx-ui/lib/src')
      ],
      //指定使用的tsconfig.json为我们整个项目根目录下掉,如果不配置,你也可以在components下新建tsconfig.json
      tsconfigPath: resolve(__dirname, '../packages/tsconfig.json'),
    }),

    {
      name: 'style',
      generateBundle(config, bundle) {
        //这里可以获取打包后的文件目录以及代码code
        const keys = Object.keys(bundle)

        for (const key of keys) {
          const bundler: any = bundle[key as any]
          
          //rollup内置方法,将所有输出文件code中的.less换成.css,因为我们当时没有打包less文件
          this.emitFile({
            type: 'asset',
            fileName: key, //文件名名不变
            source: bundler.code.replace(/\.scss/g, '.css')
          })
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@packages': resolve(__dirname, 'src')
    }
  }
});
