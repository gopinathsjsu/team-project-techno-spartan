import React, {useState, useEffect, useHistory} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './FeeTransactions.css';


const FeeTransactions = props => {
  const [dateString, setDateString] = useState("");


  useEffect(() => {
    var d = new Date(props.date)
    setDateString(d.toDateString())
  }, []);

  const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
  })

  const callRefund=(e)=>{
    e.preventDefault();
     props.getRefundInfo(props.id)
}


  return (
    !props.isRefunded && <Row key={"feetransaction"} className="transaction-fee mx-0">
      <Col sm={1}>{props.id}</Col>
      <Col sm={1}>{props.accountId}</Col>
      <Col className="d-flex justify-content-end">{formatter.format(props.amount)}</Col>
      <Col sm={3}>{dateString}</Col>
     <Col sm={3}><div className="mb-2"><Button variant="outline-danger" onClick={callRefund}>Refund</Button></div></Col>
      <Col></Col>
      </Row>
  );
}

export default FeeTransactions;
