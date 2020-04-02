import React, { Component, createRef, RefObject } from 'react';
import { Form, Row, Col, Input, Button } from 'antd';
import { SearchOutlined, ReloadOutlined, UpOutlined, DownOutlined } from '@ant-design/icons'
import { FormInstance } from 'antd/lib/form';


export enum TableFilterType {
  INPUT = 1
}

export interface FilterItem {
  type: TableFilterType;
  label: string;
  dataIndex: string;
  dataSource: any;
  required: boolean;
}

export interface TableFilterProps {
  filterItems: FilterItem[],
  submitBack: Function
}

export interface TableFilterState {
  expand: any,
}


class TableFilter extends Component<TableFilterProps, TableFilterState> {

  formRef: RefObject<FormInstance> = createRef<FormInstance>()

  state: TableFilterState = {
    expand: false
  }



  getFields = () => {
    const count = this.state.expand ? 10 : 6;

    return this.props.filterItems.map((item, index) => {
      return (
        <Col span={8} key={item.dataIndex} style={{ display: index < count ? 'block' : 'none' }}>
          <Form.Item
            style={{ marginBottom: 0 }}
            label={item.label}
            name={item.dataIndex}
            rules={[{
              required: item.required,
              message: `请输入 ${item.label}`,
            }]}
          >
            <Input placeholder={`请输入 ${item.label}`} />
          </Form.Item>
        </Col>
      );
    });
  };

  formatValue = (values: any) => {
    const params = {};
    this.props.filterItems.forEach(item => {
      if (values[item.dataIndex]) {
        params[item.dataIndex] = values[item.dataIndex];
      }
    });
    return params;
  };

  handleSearch = () => {
    if (this.formRef.current != null)
      this.formRef.current.validateFields().then((values) => {
        this.props.submitBack(this.formatValue(values));
      });
  };

  handleReset = () => {
    if (this.formRef.current != null)
      this.formRef.current.resetFields();
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  getOptions = (small: boolean) => {
    return <Col span={small ? 8 : 24} style={{ textAlign: 'right' }}>
      <Button type="primary" onClick={() => this.handleSearch()}><SearchOutlined />查询</Button>
      <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
        <ReloadOutlined />
        重置
      </Button>
      {
        this.props.filterItems.length > 6 ?
          <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
            {this.state.expand ? '收起' : '展开'}
            {this.state.expand ? <UpOutlined /> : <DownOutlined />}
          </a>
          : ''
      }
    </Col>;
  };

  getLayout = (small: boolean) => {

    return small ? <Form ref={this.formRef} >
      <Row gutter={24} align="middle" justify="space-between">
        {
          this.getFields()
        }
        {
          this.getOptions(small)
        }
      </Row>
    </Form> : <Form ref={this.formRef}>
        <Row gutter={24}> {
          this.getFields()
        } </Row>
        <Row>
          {
            this.getOptions(small)
          }
        </Row>
      </Form >;

  };

  render() {
    const small = this.props.filterItems.length <= 2;
    return this.getLayout(small);
  }

}

export default TableFilter;
