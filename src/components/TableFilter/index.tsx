import React, { Component } from 'react';
import { Form, Row, Col, Input, Button, Icon } from 'antd';

export enum TableFilterType {
  INPUT = 1
}

export class FilterItem {
  type: TableFilterType = TableFilterType.INPUT;
  label: string;
  dataIndex: string;
  dataSource: any;
  required: boolean;
}

// @ts-ignore
@Form.create()
class TableFilter extends Component<{
  filterItems, form, submitBack
}, { expand }> {

  static defaultProps = {
    form: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      expand: false,
    };
  }

  getFields = () => {
    const count = this.state.expand ? 10 : 6;
    const { getFieldDecorator } = this.props.form;
    const children = [];

    this.props.filterItems.forEach((item, index) => {
      children.push(<Col span={8} key={index} style={{ display: index < count ? 'block' : 'none' }}>
        <Form.Item label={item.label}>
          {getFieldDecorator(item.dataIndex, {
            rules: [{
              required: item.required,
              message: `请输入 ${item.label}`,
            }],
          })(
            <Input placeholder={`请输入 ${item.label}`}/>,
          )}
        </Form.Item>
      </Col>);
    });

    return children;
  };

  formatValue = (value) => {
    let params = {};
    this.props.filterItems.forEach(item => {
      if (value[item.dataIndex]) {
        params[item.dataIndex] = value[item.dataIndex];
      }
    });
    return params;
  };

  handleSearch = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submitBack(this.formatValue(values));
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  getOptions = (small) => {
    return <Col span={small ? 8 : 24} style={{ textAlign: 'right' }}>
      <Button type="primary" onClick={e => this.handleSearch(e)}><Icon type="search"/>查询</Button>
      <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
        <Icon type="reload"/>
        重置
      </Button>
      {
        this.props.filterItems.length > 6 ?
          <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
            Collapse <Icon type={this.state.expand ? 'up' : 'down'}/>
          </a>
          : ''
      }
    </Col>;
  };

  getLayout = (small) => {
    return small ? <Form>
      <Row gutter={24} type="flex" align="middle" justify="space-between">
        {
          this.getFields()
        }
        {
          this.getOptions(small)
        }
      </Row>
    </Form> : <Form>
      <Row gutter={24}>{
        this.getFields()
      }</Row>
      <Row>
        {
          this.getOptions(small)
        }
      </Row>
    </Form>;

  };

  render() {
    const small = this.props.filterItems.length <= 2;
    return this.getLayout(small);
  }

}

export default TableFilter;
