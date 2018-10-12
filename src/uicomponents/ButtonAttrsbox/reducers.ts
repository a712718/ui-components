const initialState = {
  shapeAttrs: {},
};

function attrsboxReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case 'SET_SHAPE_ATTRS': {
      const shapeAttrsCopy = { ...state.shapeAttrs, ...action.data };
      return {
        ...state,
        shapeAttrs: shapeAttrsCopy,
      };
    }
    default:
      return state;
  }
}
export default attrsboxReducer;
