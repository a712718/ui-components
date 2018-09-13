import { combineReducers } from 'redux';
import attrsboxReducer from './Attrsbox/reducers';

/**
 * 导出创建root reducer的函数
 * @export
 * @param {object} injectedReducers
 * @returns combineReducers
 */
export default function createReducer(injectedReducers?: object) {
  return combineReducers({
    attrsbox: attrsboxReducer,
    ...injectedReducers,
  });
}
