import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ErrorModal.css';

const ErrorModal = props => {
  const [dateTimeString, setDateTimeString] = useState("");
  var options = {
     year: 'numeric', month: 'long', day: 'numeric'
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  useEffect(() => {
    setDateTimeString(new Intl.DateTimeFormat('en-US', options).format(new Date(props.account.dateCreated)));
  }, []);

  useEffect(() => {
  }, []);

  return (
    <Modal show={props.show} onHide={props.onHide} animation={false} dialogClassName="customModal redModal">
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body className="modal-container">
        <h4 className="text-center">ERROR</h4>
        <div className="my-2">You have negative balance. Please top up balance.</div>
        <div className="my-3 accountInfo mx-auto">
          <p>Account info:</p>
          <p>Account Number: {props?.account.id}</p>
          <p>Date Created: {dateTimeString}</p>
          <p>Current Balance: {formatter.format(props.account.balance)}</p>
        </div>
        <Button variant="grey" onClick={props.onHide} className="modalBtn mx-2">OK</Button>
      </Modal.Body>
    </Modal>
  );
}

export default ErrorModal;
