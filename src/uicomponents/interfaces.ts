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
  scale?: any;
  isUIComponent: boolean;
}

export interface IButton {
  attrs: IButtonAttrs;
  render(): void;
  name(name: string | undefined): string | void;
  id(id: string | undefined): string | void;
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
  enclosingHeight: number;
  enclosingWidth: number;
  isShapebox?: boolean;
  isUIComponent?: boolean;
  shapeMountPoint: string;
  attrsboxMountPoint: string;
  display: string;
  zIndex: number;
}
