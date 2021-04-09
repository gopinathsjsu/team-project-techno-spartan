import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './DeleteModal.css';

const DeleteModal = props => {
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

  return (
    <Modal show={props.show} onHide={props.onHide} animation={false} dialogClassName="customModal redModal">
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body className="modal-container">
        <h4 className="text-center">Close Account</h4>
        <div className="mt-2">Are you sure you want to close this Account?</div>
        <div className="mb-2">This action cannot be undone.</div>
        <div className="my-3 accountInfo mx-auto">
          <p>Account info:</p>
          <p>Account Number: {props?.account.id}</p>
          <p>Date Created: {dateTimeString}</p>
          <p>Current Balance: {formatter.format(props.account.balance)}</p>
        </div>
        <div className="my-3">Your balance will be sent in check to your billing address.</div>
        <Button variant="red" onClick={props.deleteAccount} className="modalBtn mx-2">Close Account</Button>
        <Button variant="grey" onClick={props.onHide} className="modalBtn mx-2">Cancel</Button>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteModal;
