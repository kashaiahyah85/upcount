import { Component } from 'react';
import { connect } from 'dva';
import { Button, Dropdown, Icon, Input, Menu, Table, Tag } from 'antd';
import { isUndefined, values } from 'lodash';

import Link from 'umi/link';

class Invoices extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'invoices/list' });
  }

  onStateSelect = (item) => {
    const { key } = item;
    this.props.dispatch({
      type: 'invoices/state',
      payload: {
        state: key
      }
    });
  }

  render() {
    const { invoices } = this.props;

    const stateMenu = (
      <Menu onClick={this.onStateSelect}>
        <Menu.Item key="draft">
          Draft
        </Menu.Item>
        <Menu.Item key="confirmed">
          Confirmed
        </Menu.Item>
        <Menu.Item key="payed">
          Payed
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="cancelled">
          Cancelled
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Link to="/invoices/new">
          <Button type="primary" style={{ marginBottom: 10 }}>
            New invoice
          </Button>
        </Link>
        <Input.Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          style={{ width: 200, float: 'right' }}
        />

        <Table dataSource={values(invoices.items)} pagination={false} rowKey="_id">
          <Table.Column
            title="Number"
            key="number"
            render={invoice => (
              <Link to={`/invoices/${invoice._id}`}>
                <Icon type="file-text" />
                {isUndefined(invoice.number) ? ` #${invoice._id}` : ` #${invoice.number}`}
              </Link>
            )}
          />
          <Table.Column
            title="Client"
            dataIndex="client"
            key="client"
          />
          <Table.Column
            title="Date"
            dataIndex="date"
            key="date"
          />
          <Table.Column
            title="Due date"
            dataIndex="due_date"
            key="due_date"
          />
          <Table.Column
            title="Sum"
            dataIndex="sum"
            key="sum"
          />
          <Table.Column
            title="State"
            dataIndex="state"
            key="state"
            render={state => (
              <Dropdown overlay={stateMenu} trigger={['click']}>
                <Tag color="green">{state}</Tag>
              </Dropdown>
            )}
          />
        </Table>
      </div>
    )
  }
}

export default connect((state) => { return { invoices: state.invoices }; })(Invoices);