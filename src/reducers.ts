import { combineReducers } from 'redux';
import shapeboxReducer from './demo/Shapebox/reducers';
import editorboxReducer from './demo/Editor/reducers';
// import attrsboxReducer from './demo/Attrsbox/reducers';

/**
 * 导出创建root reducer的函数
 * @export
 * @param {object} injectedReducers
 * @returns combineReducers
 */
export default function createReducer(injectedReducers?: object) {
  return combineReducers({
    shapebox: shapeboxReducer,
    editorbox: editorboxReducer,
    ...injectedReducers,
  });
}
