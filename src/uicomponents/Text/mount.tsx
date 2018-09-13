import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Text from './index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers';
import Attrsbox from '../Attrsbox/index';
export default class UIText {
  public store: any;
  public customAttrs = {
    start: null,
    enclosingRect: {},
  };
  private attrs: any;

  constructor(props: any) {
    this.attrs = props;
    this.customAttrs.start = this.attrs.start;
    this.customAttrs.enclosingRect = {
      x: this.attrs.start.x,
      y: this.attrs.start.y,
      width: this.attrs.enclosingWidth || 0,
      height: this.attrs.enclosingHeight || 0,
    };
    const initialState = {};
    this.store = createStore(reducer(), initialState);
  }
  public render() {
    const { shapeMountPoint, attrsboxMountPoint } = this.attrs;
    const attrs = { ...this.attrs };
    // this.store.dispatch();
    // console.log(['Text mount this.attrs', this.attrs]);
    const shapeMountPointDiv = document.getElementById(shapeMountPoint);
    if (shapeMountPointDiv) {
      ReactDOM.render(
        <Provider store={this.store}>
          <Text attrs={attrs} />
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
}
