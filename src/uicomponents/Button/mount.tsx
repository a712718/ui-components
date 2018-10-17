import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from './index';
import Attrsbox from '../ButtonAttrsbox/index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers';
import * as Interfaces from '../interfaces';
import * as Contants from '../constants';

export default class UIButton implements Interfaces.IButton {
  public store: any;
  public attrs: Interfaces.IButtonAttrs;
  constructor(props: Interfaces.IButtonAttrs) {
    console.log(['mount props', props]);
    this.attrs = props;
    const initialState = {};
    // 必须这样写，生成的每个ui控件redux都独立
    this.store = createStore(reducer(), initialState);
  }
  public render() {
    const { shapeMountPoint, attrsboxMountPoint } = this.attrs;
    const attrs = { ...this.attrs };
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
  public name(name: string | undefined): string | void {
    if (name) {
      this.attrs.name = name;
    } else {
      return this.attrs.name;
    }
  }
  public id(id: string | undefined): string | void {
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
  public setAttrs(attrs: Interfaces.IButtonAttrs) {
    this.store.dispatch({
      type: Contants.AttrsboxActionType.SET_SHAPE_ATTRS,
      data: attrs,
    });
  }
  public getAttrs() {
    const state = this.store.getState();
    const shapeAttrs = state.buttonAttrsbox;
    return shapeAttrs;
  }
  public serialization() {
    const state = this.store.getState();
    const shapeAttrs = state.buttonAttrsbox;
    return shapeAttrs;
  }
}
