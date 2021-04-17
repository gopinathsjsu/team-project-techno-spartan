import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import './MessageModal.css';

const MessageModal = props => {
  const [message, setMessage] = useState("");

  useEffect(() => {
  }, []);




  return (
    <Modal show={props.show} onHide={props.onHide} animation={false} dialogClassName="customModal">
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body className="modal-container">
          <div>
        <h5 className="text-center">{props.message}</h5>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default MessageModal;
