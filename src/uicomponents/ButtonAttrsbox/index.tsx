import * as React from 'react';
import { connect } from 'react-redux';
import { Input, Tabs, Form, Divider } from 'antd';
import { bindActionCreators } from 'redux';
import * as combinedActions from './actions';
import './index.less';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const mockData: any[] = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1,
  });
}
const targetKeys = mockData
  .filter(item => +item.key % 3 > 1)
  .map(item => item.key);

interface IProps {
  attrsbox: any;
  actionDispatcher: typeof combinedActions;
}
class UIAttrsbox extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      shapeAttrs: this.props.attrsbox.shapeAttrs,
      targetKeys,
      selectedKeys: [],
    };
  }
  public componentWillReceiveProps(nextProps: any) {
    this.setState({
      shapeAttrs: nextProps.attrsbox.shapeAttrs,
    });
  }
  public render() {
    // const { shapeAttrs } = this.props.attrsbox;
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
    };

    const attrsList = [
      {
        type: 'name',
        value: this.state.shapeAttrs.name,
        label: '名称',
      },
      {
        type: 'leftX',
        value: this.state.shapeAttrs.start.x,
        label: '左边界',
      },
      {
        type: 'rightX',
        value: this.state.shapeAttrs.start.x + this.state.shapeAttrs.width,
        label: '右边界',
      },
      {
        type: 'topY',
        value: this.state.shapeAttrs.start.y,
        label: '上边界',
      },
      {
        type: 'bottomY',
        value: this.state.shapeAttrs.start.y + this.state.shapeAttrs.height,
        label: '下边界',
      },
      {
        type: 'width',
        value: this.state.shapeAttrs.width,
        label: '宽',
      },
      {
        type: 'height',
        value: this.state.shapeAttrs.height,
        label: '高',
      },
      {
        type: 'zIndex',
        value: this.state.shapeAttrs.zIndex,
        label: '层',
      },
    ];
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="属性" key="1">
          <Form>
            {attrsList.map((item: any, index: number) => (
              <FormItem key={index} {...formItemLayout} label={item.label}>
                <Input
                  placeholder="Basic usage"
                  value={item.value}
                  onChange={this.setAttrs.bind(this, item.type)}
                  onPressEnter={this.setStoreAttrs.bind(
                    this,
                    this.state.shapeAttrs,
                  )}
                />
              </FormItem>
            ))}
          </Form>
          <div>点击回车修改属性</div>
        </TabPane>
        <TabPane tab="设置" key="2">
          <Divider orientation="left">按钮</Divider>
          <Divider orientation="left">图片</Divider>
        </TabPane>
      </Tabs>
    );
  }

  public setAttrs(type: string, e: any) {
    e.persist();
    const shapeAttrs = { ...this.state.shapeAttrs };
    // console.log(['e.target.value', e.target.value, type]);
    switch (type) {
      case 'name': {
        shapeAttrs.name = e.target.value;
        this.setStateAttrs(shapeAttrs);
        break;
      }
      case 'leftX': {
        shapeAttrs.start.x = parseInt(e.target.value, 0);
        this.setStateAttrs(shapeAttrs);
        break;
      }
      case 'rightX': {
        shapeAttrs.start.x = parseInt(e.target.value, 0) - shapeAttrs.width;
        this.setStateAttrs(shapeAttrs);
        break;
      }
      case 'topY': {
        shapeAttrs.start.y = parseInt(e.target.value, 0);
        this.setStateAttrs(shapeAttrs);
        break;
      }
      case 'bottomY': {
        shapeAttrs.start.y = parseInt(e.target.value, 0) - shapeAttrs.height;
        this.setStateAttrs(shapeAttrs);
        break;
      }
      case 'width': {
        shapeAttrs.width = parseInt(e.target.value, 0);
        this.setStateAttrs(shapeAttrs);
        break;
      }
      case 'height': {
        shapeAttrs.height = parseInt(e.target.value, 0);
        this.setStateAttrs(shapeAttrs);
        break;
      }
      case 'zIndex': {
        shapeAttrs.zIndex = parseInt(e.target.value, 0);
        this.setStateAttrs(shapeAttrs);
        break;
      }
      default:
        return shapeAttrs;
    }
  }
  private setStateAttrs(shapeAttrs: any) {
    this.setState({
      shapeAttrs,
    });
  }
  private setStoreAttrs(shapeAttrs: any) {
    this.props.actionDispatcher.setShapeAttrs(shapeAttrs);
  }
}
const mapStateToProps = (state: any) => {
  return {
    attrsbox: state.buttonAttrsbox,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return { actionDispatcher: bindActionCreators(combinedActions, dispatch) };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UIAttrsbox);
