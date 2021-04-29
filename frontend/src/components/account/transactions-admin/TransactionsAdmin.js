import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FeeTransactionsComponent } from '../feeTransactions';
import './TransactionsAdmin.css';

const TransactionsAdmin = props => {

  return (
    <div className="transactions py-3">
    <Row className="mx-0 row-header">
      <Col sm={1}>ID</Col>
      <Col sm={1}>Acc#</Col>
      <Col className="d-flex justify-content-end">Amount</Col>
      <Col sm={3}>Date</Col>
      <Col sm={3}>Action</Col>
      <Col></Col>
    </Row>
    <Row className="mx-0 my-2"><Col><div className="delim"></div></Col></Row>
    {
      props.transactions.map((elem, index) => <FeeTransactionsComponent key={"feetransaction" + index} {...elem} getRefundInfo = {props.getRefundInfo}/>)
    }
    {props.transactions.length == 0
      ? <Row className="mx-0 my-2"><Col sm="auto" className="mx-auto">No Fee transactions to show</Col></Row> : null }
    </div>
  );
}

export default TransactionsAdmin;
