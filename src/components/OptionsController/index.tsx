import React, { PureComponent } from 'react';
import { Button, Row, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import Authorized from '@/utils/Authorized';

interface OptionsPageProps {
  addCallBack: () => void
  deleteAllCallBack: () => void
  optionAuth: { addAuth: string[], deleteAuth: string[] }
}


class OptionsPage extends PureComponent<OptionsPageProps, {}> {

  static defaultProps = {
    addCallBack: undefined,
    deleteAllCallBack: undefined,
    optionAuth: { addAuth: [] },
  };


  render() {
    return <Row gutter={24} style={{ margin: '15px 0', padding: 0 }}
      align="middle">

      <Authorized authority={this.props.optionAuth.addAuth}>
        {this.props.addCallBack ? <Button type="primary" onClick={this.props.addCallBack}>
          <PlusOutlined />
          新增
        </Button> : ''}
      </Authorized>

      <Authorized authority={this.props.optionAuth.deleteAuth}>
        {
          this.props.deleteAllCallBack ?
            <Popconfirm
              title="确定删除所选项吗？"
              okText="删除"
              onConfirm={() => this.props.deleteAllCallBack}
              cancelText="取消">
              <Button type="danger"
                style={{ marginLeft: '20px' }}
              >
                <DeleteOutlined />
            删除选择
          </Button>
            </Popconfirm> : ''
        }
      </Authorized>

    </Row>;
  }
}

export default OptionsPage;
