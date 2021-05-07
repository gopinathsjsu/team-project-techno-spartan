import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './GeneralErrorModal.css';

const GeneralErrorModal = props => {

  return (
    <Modal show={props.show} onHide={props.onHide} animation={false} dialogClassName="customModal redModal">
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body className="modal-container">
        <h4 className="text-center">ERROR</h4>
        <div className="my-2">{props.children}</div>
      </Modal.Body>
    </Modal>
  );
}

export default GeneralErrorModal;
