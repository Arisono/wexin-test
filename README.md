# 开发说明文档

## 常用文档
#### Redux开发文档

> https://github.com/reduxjs/redux

#### Axios网络请求框架

> axios :https://github.com/axios/axios
> fetch:https://github.com/github/fetch

#### Antd开发文档

> https://ant.design/components/button-cn/

#### Bootstrap3

> 安装：npm install bootstrap@3  
开发文档：https://v3.bootcss.com/css/#images

#### Router路由框架

> 安装：npm install react-router-dom   
开发文档：https://reacttraining.com/react-router/web/guides/quick-start

#### react-infinite-scroller列表上拉加载框架

> 安装：cnpm i react-infinite-scroller -S
开发文档: https://www.npmjs.com/package/react-infinite-scroller

#### react-lazyload 布局懒加载

> 安装：cnpm i react-lazyload -S
开发文档：https://www.npmjs.com/package/react-lazy-load

#### react-player 视频播放组件

> 安装： cnpm i react-player -S
开发文档：https://www.npmjs.com/package/react-player

#### react-transition-group 动画框架

> 安装：cnpm i react-transition-group -S
开发文档：https://www.npmjs.com/package/react-transition-group

#### swiper布局滑动组件
> 安装：cnpm i swiper -S
开发文档： https://www.swiper.com.cn/api/index.html
## 公共组件

### 附件上传
> 三个参数  action  number callback
```
 <PicturesWallItem action={'url路径'} number={1} callback = { this.callback.bind(this)}></PicturesWallItem>
```

### 选择对象

```

```

## 目录划分

- style：图片及样式
- modules:页面模块
- utils:工具类
- components:封装组件
- configs:配置
- model:实体类

## 优化处理
### Antd按需加载
参考文档：[Antd按需加载说明文档](https://ant.design/docs/react/use-with-create-react-app-cn)
#### 安装react-app-rewired
#### 安装babel-plugin-import
#### 安装react-app-rewire-less
> npm install --save react-app-rewire-less