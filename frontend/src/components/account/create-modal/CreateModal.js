import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './CreateModal.css';

const CreateModal = props => {
  const [option, setOption] = useState("");

  function handleChange(event) {
    setOption(event.target.value)
  }

  function createAccount(event) {
    if (option !== "") {
      props.createAccount(option);
      setOption("")
    }
  }

  return (
    <Modal show={props.show} onHide={props.onHide} animation={false} dialogClassName="customModal">
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body className="modal-container">
        <h4 className="text-center">Create New Account</h4>
        <div className="my-2">Choose Account Type:</div>
        <form onSubmit={createAccount} className="my-3">
        <div className="form-content mb-3">
          <div className="text-left">
            <label className="customCheckbox">
            Savings
             <input
               type="radio"
               value="savings"
               checked={option === "savings"}
               onChange={handleChange}
             />
             <span class="checkmark"></span>
           </label>
          </div>
          <div className="text-left my-2">
             <label className="customCheckbox">
                Checking
                <input
                  type="radio"
                  value="checking"
                  checked={option === "checking"}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
            </label>
          </div>
          </div>
         <Button variant="blue" type="submit">Create New Account</Button>
        </form>

      </Modal.Body>
    </Modal>
  );
}

export default CreateModal;
