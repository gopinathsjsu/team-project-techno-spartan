import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './TransactionSingle.css';

const TransactionSingle = props => {
  const [dateString, setDateString] = useState("")

  useEffect(() => {
    var d = new Date(props.date)
    setDateString(d.toDateString())
  }, []);

  const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
  })


  return (
    <Row key={"transaction" + props.id} className="transaction-single mx-0">
      <Col sm={1}>{props.id}</Col>
      <Col>{props.account}</Col>
      <Col className="d-flex justify-content-end">{(props.isCredit) ? '-' : ''}{formatter.format(props.amount)}</Col>
      <Col sm={3}>{dateString}</Col>
      <Col sm={3}>{props.memo}</Col>
      <Col></Col>
      </Row>
  );
}

export default TransactionSingle;
