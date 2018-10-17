import * as React from 'react';
import { connect } from 'react-redux';
import Interfaces from '../../appInterfaces';
interface IProps {
  shapes: Interfaces.IButton[];
}
class UIAttrsbox extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    const shapes = this.props.shapes;
    return (
      <div id="propertybox" className="property-box">
        {shapes.map((shape: Interfaces.IButton, shapeIndex: number) => (
          <div
            style={{
              position: 'relative',
              left: 0,
              top: 0,
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
    shapes: state.shapebox.shapes,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UIAttrsbox);
