import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  plugins: [
    [
      'umi-plugin-react',
      {
        dva: {
          immer: false,
        },
        antd: true,
        routes: {
          exclude: [
            /model\.(j|t)sx?$/,
            /service\.(j|t)sx?$/,
            /models\//,
            /components\//,
            /services\//,
            /helpers\//,
            /types\//,
          ],
        },
        library: 'react',
        dynamicImport: {
          webpackChunkName: true,
          level: 2,
        },
        locale: {
          default: 'zh-CN', //默认语言 zh-CN
          baseNavigator: true, // 为true时，用navigator.language的值作为默认语言
          antd: true, // 是否启用antd的<LocaleProvider />
        },
        title: {
          defaultTitle: 'Test-react-app-with-jest-and-enzyme',
          useLocale: true,
        },
        hardSource: false,
        pwa: false,
        hd: false,
        fastClick: false,
      },
    ],
  ],
};

export default config;
