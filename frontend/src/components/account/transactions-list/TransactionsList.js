import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { TransactionSingleComponent } from '../transaction-single';
import './TransactionsList.css';

const TransactionsList = props => {

  useEffect(() => {
    console.log(props)
  }, []);


  return (
    <div className="transactions py-3">
    <Row className="mx-0 row-header">
      <Col sm={4}>Description</Col>
      <Col>Acc#</Col>
      <Col>Amount</Col>
      <Col>Date</Col>
      <Col></Col>
    </Row>
    <Row className="mx-0 my-2"><Col><div className="delim"></div></Col></Row>
    {
      props.transactions.map((elem, index) => <TransactionSingleComponent key={"transaction" + index} {...elem}/>)
    }
    </div>
  );
}

export default TransactionsList;
