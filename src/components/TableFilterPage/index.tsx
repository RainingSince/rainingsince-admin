import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import TableFilter from '@/components/TableFilter';
import OptionsPage from '@/components/OptionsController';
import StandardTable from '@/components/StandardTable';

export interface TableFilterPageProps {
  pageTitle: string
  filters?: any[]
  filterCallBack: (params: any) => void,
  optionCallBack: (params: any) => void,
  optionAuth: { addAuth: string[], deleteAuth: string[] }
  tableOption: {},
}

export interface TableFilterPageState {
  selectedRows: []
}


class TableFilterPage extends PureComponent<TableFilterPageProps, TableFilterPageState> {



  constructor(props: TableFilterPageProps) {
    super(props);
    this.state = {
      selectedRows: []
    }
  }



  addOption = () => {
    this.props.optionCallBack({
      type: 'add',
    });
  };

  handleSelectRows = (rows: any) => {
    this.setState({
      selectedRows: rows,
    });
  };

  deleteOption = () => {
    this.props.optionCallBack({
      type: 'delete',
      dataSource: this.state.selectedRows,
    });
    this.setState({
      selectedRows: [],
    });
  };


  render() {

    const {
      pageTitle, filters, filterCallBack,
      optionCallBack, tableOption,
    } = this.props;


    return <div>
      <PageHeaderWrapper title={pageTitle}>
        <Card>
          {(filters && filters.length > 0) ? <TableFilter filterItems={filters}
            submitBack={filterCallBack} /> : null}
          {optionCallBack ? <OptionsPage addCallBack={this.addOption}
            optionAuth={this.props.optionAuth}
            deleteAllCallBack={this.state.selectedRows.length > 0
              ? this.deleteOption : undefined} /> : null}
          <StandardTable
            rowKey='id'
            onSelectRow={this.handleSelectRows}
            selectedRows={this.state.selectedRows}
            {...tableOption}
          />
        </Card>
      </PageHeaderWrapper>
      {this.props.children}
    </div>;
  }

}

export default TableFilterPage;
