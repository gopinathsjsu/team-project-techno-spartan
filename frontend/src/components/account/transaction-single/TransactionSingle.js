import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './TransactionSingle.css';

const TransactionSingle = props => {
  const [dateString, setDateString] = useState("")

  useEffect(() => {
    console.log(props)
    var d = new Date(props.date)
    setDateString(d.toDateString())
  }, []);

  const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
  })


  return (
    <Row key={props.id} className="transaction-single mx-0">
      <Col sm={4}>{props.description}</Col>
      <Col>{props.account}</Col>
      <Col>{(props.isCredit) ? '-' : ''}{formatter.format(props.amount)}</Col>
      <Col>{dateString}</Col>
      <Col></Col>
      </Row>
  );
}

export default TransactionSingle;
