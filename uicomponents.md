# 插件接口

## 插件需提供一个接口对象，对象包含如下内容

1.UISHAPETYPE 所有 UI 组件的类型配置文件

2.UIShapesConfig 所有 UI 组件的配置文件

3.UIShape 组件的实现类 例如 UIButton

## UIShapesConfig UI 组件配置文件接口 例如

```js
interface IButtonMetaInfo {
  type: string;
  attrs: IButtonMetaAttrs;
}
interface IButtonMetaAttrs {
  type?: string;
  name: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  enclosingWidth: number;
  enclosingHeight: number;
  isUIComponent: boolean;
  shapeMountPoint?: string;
  attrsboxMountPoint?: string;
  isShapebox?: boolean;
  scale?: any;
}
```

## UI 组件类接口 例如

如需要可添加更多的属性、方法

```js
interface IButton {
  attrs: IButtonAttrs;
  render(): void;
  name(name: string | void): string | void;
  id(id: string | void): string | void;
  getParent(): null;
  getType(): string;
  setAttrs(attrs: IButtonAttrs): void;
  getAttrs(): IButtonAttrs;
  serialization(): IButtonAttrs;
}
```

## UI 组件属性

```js
interface IButtonAttrs {
  type: string;
  id: string;
  name: string;
  x: number;
  y: number;
  text: string;
  width: number;
  height: number;
  enclosingWidth: number;
  enclosingHeight: number;
  shapeMountPoint: string;
  attrsboxMountPoint: string;
  display: string;
  zIndex: number;
  isShapebox?: boolean;
  isUIComponent?: boolean;
}
```

# ts 声明文件

要个项目写 ts 声明文件

# 打包

打包后去 index.js 和 index.d.ts 文件导入到流程图项目
