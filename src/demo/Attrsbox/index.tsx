import * as React from 'react';
import { connect } from 'react-redux';
interface IProps {
  editorbox: any;
}
class UIAttrsbox extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    const { selectedShape } = this.props.editorbox;
    return (
      <div id="propertybox" className="property-box">
        {selectedShape.map((shape: any, shapeIndex: number) => (
          <div
            style={{
              position: 'relative',
              left: 0,
              top: 0,
              width: 0,
              height: 0,
              zIndex: 10,
            }}
            id={shape.attrs && `attrsbox-${shape.attrs.id}`}
            key={shapeIndex}
          />
        ))}
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    editorbox: state.editorbox,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UIAttrsbox);
