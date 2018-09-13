import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from './index';
import Attrsbox from '../Attrsbox/index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers';
interface IProps {
  start: any;
}
export default class UIButton {
  public store: any;
  public customAttrs = {
    start: null,
    enclosingRect: {},
  };
  private attrs: any;
  constructor(props: IProps) {
    this.attrs = props;
    this.customAttrs.start = this.attrs.start;
    this.customAttrs.enclosingRect = {
      x: this.attrs.start.x,
      y: this.attrs.start.y,
      width: this.attrs.enclosingWidth || 0,
      height: this.attrs.enclosingHeight || 0,
    };
    const initialState = {};
    // 必须这样写，生成的每个ui控件redux都独立
    this.store = createStore(reducer(), initialState);
  }
  public render() {
    const { shapeMountPoint, attrsboxMountPoint } = this.attrs;
    const attrs = { ...this.attrs };
    // console.log(['button mount this.attrs', this.attrs]);
    const shapeMountPointDiv = document.getElementById(shapeMountPoint);
    if (shapeMountPointDiv) {
      ReactDOM.render(
        <Provider store={this.store}>
          <Button attrs={attrs} />
        </Provider>,
        shapeMountPointDiv,
      );
    }
    const attrsboxMountPointDiv = document.getElementById(attrsboxMountPoint);
    if (attrsboxMountPointDiv) {
      ReactDOM.render(
        <Provider store={this.store}>
          <Attrsbox />
        </Provider>,
        attrsboxMountPointDiv,
      );
    }
  }
  public name(name: any) {
    if (name) {
      this.attrs.name = name;
    } else {
      return this.attrs.name;
    }
  }
  public id(id: any) {
    if (id) {
      this.attrs.id = id;
    } else {
      return this.attrs.id;
    }
  }
  public getParent() {
    return null;
  }

  public getType() {
    return 'UIButton';
  }

  public getAttrs() {
    const state = this.store.getState();
    const shapeAttrs = state.attrsbox.shapeAttrs;
    return shapeAttrs;
  }
}
