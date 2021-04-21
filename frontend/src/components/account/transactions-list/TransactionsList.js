import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { TransactionSingleComponent } from '../transaction-single';
import './TransactionsList.css';

const TransactionsList = props => {

  return (
    <div className="transactions py-3">
    <Row className="mx-0 row-header">
      <Col sm={1}>Id</Col>
      <Col>Acc#</Col>
      <Col className="d-flex justify-content-end">Amount</Col>
      <Col sm={3}>Date</Col>
      <Col sm={3}>Memo</Col>
      <Col></Col>
    </Row>
    <Row className="mx-0 my-2"><Col><div className="delim"></div></Col></Row>
    {
      props.transactions.map((elem, index) => <TransactionSingleComponent key={"transaction" + index} {...elem}/>)
    }
    {props.transactions.length == 0
      ? <Row className="mx-0 my-2"><Col sm="auto" className="mx-auto">No transactions yet</Col></Row> : null }
    </div>
  );
}

export default TransactionsList;
