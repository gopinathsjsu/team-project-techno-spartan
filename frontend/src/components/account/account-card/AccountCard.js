import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { DeleteModalComponent } from '../delete-modal';
import { ErrorModalComponent } from '../error-modal';
import { ReactComponent as DotsIcon } from '../../../assets/dotsIcon.svg'
import { ReactComponent as CloseIcon } from '../../../assets/closeIcon.svg'
import './AccountCard.css';

const AccountCard = props => {
  const [accountNum, setAccount] = useState(null);
  const [uid, setUid] = useState(null);
  const [type, setType] = useState("");
  const [balance, setBalance] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  let history = useHistory();

  useEffect(() => {
    setAccount(props.id);
    setUid(props.userId);
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

  function closeAccount() {
    if (balance >=0) {
      setShowDeleteModal(true);
    }
    else {
      setShowErrorModal(true);
    }
  }

  function deleteAccount() {
    setShowDeleteModal(false);
    props.closeAccount(uid + '/' + accountNum);
  }

  return (
    <div className="accountCard pt-3">
      <Row className="mx-0">
        <Col><h4>{type} Account</h4></Col>
        <Col sm="auto" className="ml-auto"><Button variant="gold" onClick={goToDetails}><DotsIcon /></Button></Col>
      </Row>
      <Row className="mx-0">
      <Col>Num: {accountNum}</Col>
      <Col></Col>
      </Row>
      <Row className="mx-0">
      <Col><h1>{formatter.format(balance)}</h1></Col>
      <Col sm="auto" className="ml-auto my-auto"><Button variant="red" onClick={closeAccount}><CloseIcon /></Button></Col>
      </Row>
      <DeleteModalComponent show={showDeleteModal} onHide={() => setShowDeleteModal(false)} deleteAccount={deleteAccount} account={props}/>
      <ErrorModalComponent show={showErrorModal} onHide={() => setShowErrorModal(false)} account={props}/>
    </div>
  );
}

export default AccountCard;
