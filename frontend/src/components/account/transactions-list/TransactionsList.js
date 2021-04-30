import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { TransactionSingleComponent } from '../transaction-single';
import { ReactComponent as FilterIcon } from '../../../assets/filterIcon.svg'
import './TransactionsList.css';
import {TransactionType } from '../../../models/transactionTypes';

const TransactionsList = ({transactions, getTransactions, account}) => {
  const [filter, setFilter] = useState(false)

  const handleSelect=(e)=>{
    setFilter((e !== TransactionType.NONE))
    if (account)
      getTransactions(account, e)
    else
      getTransactions(e)
  }

  return (
    <div className="transactions py-3">
    <Row className="mx-0 row-header">
      <Col sm={1}>Id</Col>
      <Col>Acc#</Col>
      <Col className="d-flex justify-content-end">Amount</Col>
      <Col sm={3}>Date</Col>
      <Col sm={3}>Memo</Col>
      <Col  className="d-flex justify-content-end">
        <DropdownButton
            variant="dropdown"
            menuAlign="right"
            title={<FilterIcon className={(filter) ? "filter-icon active" : "filter-icon"}/>}
            id="dropdown-menu-align-down"
            onSelect={handleSelect}
            >
          <Dropdown.Item eventKey={TransactionType.CREDIT}>Credit</Dropdown.Item>
          <Dropdown.Item eventKey={TransactionType.DEBIT}>Debit</Dropdown.Item>
          <Dropdown.Item eventKey={TransactionType.FEES}>Fees</Dropdown.Item>
          <Dropdown.Item eventKey={TransactionType.NONE}>Clear Filter</Dropdown.Item>
        </DropdownButton>
      </Col>
    </Row>
    <Row className="mx-0 my-2"><Col><div className="delim"></div></Col></Row>
    {
      transactions.map((elem, index) => <TransactionSingleComponent key={"transaction" + index} {...elem}/>)
    }
    {transactions.length == 0
      ? <Row className="mx-0 my-2"><Col sm="auto" className="mx-auto">No transactions yet</Col></Row> : null }
    </div>
  );
}

export default TransactionsList;
