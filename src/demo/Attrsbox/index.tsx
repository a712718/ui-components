import * as React from 'react';
import { connect } from 'react-redux';
interface IProps {
  shapebox: any;
}
class UIAttrsbox extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    const { shapes } = this.props.shapebox;
    return (
      <div id="propertybox" className="property-box">
        {shapes.map((shape: any, shapeIndex: number) => (
          <div
            style={{
              position: 'relative',
              left: 0,
              top: 0,
              width: 0,
              height: 0,
              zIndex: 10,
              display: shape.attrs.display || 'none',
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
    shapebox: state.shapebox,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UIAttrsbox);
