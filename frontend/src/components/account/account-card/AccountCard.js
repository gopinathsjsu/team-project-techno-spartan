import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ReactComponent as DotsIcon } from '../../../assets/dotsIcon.svg'
import { ReactComponent as CloseIcon } from '../../../assets/closeIcon.svg'
import './AccountCard.css';

const AccountCard = props => {
  const [accountNum, setAccount] = useState(null);
  const [type, setType] = useState("");
  const [balance, setBalance] = useState(0);
  let history = useHistory();

  useEffect(() => {
    setAccount(props.id);
    setType(props.type);
    setBalance(props.balance)
    console.log(props)
  }, []);

  const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
  })

  function goToDetails() {
    history.push(`/account/${accountNum}`);
  }

  return (
    <div className="accountCard pt-3">
    <Row className="mx-0">
      <Col sm="auto"><h4>{type} Account</h4></Col>
      <Col sm="auto" className="ml-auto"><Button variant="gold" onClick={goToDetails}><DotsIcon /></Button></Col>
    </Row>
    <Row className="mx-0">
    <Col>Num: {accountNum}</Col>
    <Col></Col>
    </Row>
    <Row className="mx-0">
    <Col><h1>{formatter.format(balance)}</h1></Col>
    <Col sm="auto" className="ml-auto my-auto"><Button variant="red"><CloseIcon /></Button></Col>
    </Row>
    </div>
  );
}

export default AccountCard;
