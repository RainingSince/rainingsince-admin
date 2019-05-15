import React, { Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card } from 'antd';
import TableFilter from '@/components/TableFilter';
import OptionsPage from '@/components/OptionsController';
import StandardTable from '@/components/StandardTable';

interface TableFilterPageProps {
  pageTitle: string
  filters: any[]
  filterCallBack: Function,
  optionCallBack: Function,
  optionAuth: { addAuth: string[], deleteAuth: string[]}
  tableOption: {},
}


class TableFilterPage extends Component<TableFilterPageProps,
  { selectedRows }> {

  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
    };
  }

  static defaultProps = {
    pageTitle: '',
    filters: [],
    optionAuth: { addAuth: [], deleteAuth: [] },
    filterCallBack: undefined,
    optionCallBack: undefined,
    tableOption: {},
  };

  addOption = () => {
    this.props.optionCallBack({
      type: 'add',
    });
  };

  handleSelectRows = rows => {
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
      // @ts-ignore
      <PageHeaderWrapper title={pageTitle}>
        <Card>
          {filters.length > 0 ? <TableFilter filterItems={filters}
                                             submitBack={filterCallBack}/> : null}
          {optionCallBack ? <OptionsPage addCallBack={this.addOption}
                                         optionAuth={this.props.optionAuth}
                                         deleteAllCallBack={this.state.selectedRows.length > 0
                                           ? this.deleteOption : undefined}/> : null}
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
