export interface IButtonMetaInfo {
  type: string;
  attrs: IButtonMetaAttrs;
}
export interface IButtonMetaAttrs {
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

export interface IButton {
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

export interface IButtonAttrs {
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
