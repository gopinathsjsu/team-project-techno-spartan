import React, { useState , Component } from 'react';
import Row from 'react-bootstrap/Row';
import {useHistory, withRouter} from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './Bills.css';
import BillPayService from '../../services/BillPayService';
import { MessageModalComponent } from '../../components/account/message-modal';

function Bills(props){

    const [userLogin, setUserLogin] = useState(true);
    const [accountId, setAccountId] = useState("");
    const [vendor, setVendor] = useState("");
    const [amount, setAmount] = useState("");
    const [recurr, setrecurr] = useState("false");
    const [selectedOption, setSelectedOption] = useState("");
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [message, setMessage] = useState("Payment Success !!");
    const history = useHistory();


    const handleAccount =(e)=> {
      setAccountId(e.target.value);
    }
    
    const handleInputChange= e => {
        
        setVendor(e.target.value);
        
    }
    const handleAmountChange = e => {
        
      setAmount(e.target.value);
      
    }
    
    const onBoxChecked = e =>{
      const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      setrecurr(value)
    }
    
    const onChangeValue = e =>{
      
     setSelectedOption(e.target.value);
    }
    
    const handleClick=(e)=>{
        e.preventDefault();
        if(recurr=== true){
          setMessage("Payment Scheduled !!")
        }
        let payment={accountId, vendor, amount, recurr, selectedOption};
         //console.log('employee'+ JSON.stringify(payment));
         BillPayService.createBillPayment(payment).then(res=>{
         // history.push('/pasttransfers')  
         //console.log(res.data);
         setShowMessageModal(true) 
        });
    
    }

    return (
      <>
        <h1>Bill Payment</h1>
        <br></br><br></br>
        <Row className="mx-0">
        <Col sm="auto">
         <div className="form-group col-md-50">
            <label><h4>Account Id:</h4></label>
            <Form.Control className="mb-2 mr-sm-2" id="inlineFormInput" placeholder="Enter Account Number" onChange={handleAccount}/>
          </div>
        </Col>
        <Col md={{ span: 4, offset: 4 }}>
            <br></br>
          <Form>
            <Form.Group>
              <label>
              <strong>
              <input type="checkbox" onChange={onBoxChecked}/>
              <span style={{ marginLeft: '.5rem' }}>Make Recurring</span></strong></label>
            </Form.Group>
            <Form.Group className="recurringCard">
            <div className="text-left">
              <label className="customCheckbox">
                <span style={{ marginLeft: '.5rem' }}>Monthly</span>
                <input type="radio" value="Monthly" checked={selectedOption === "Monthly"} onChange={onChangeValue}/>
                <span class="checkmark"></span>
              </label>
              </div>
              <div className="text-left my-2">
              <label className="customCheckbox">
                <span style={{ marginLeft: '.5rem' }}>Annually</span>
                <input type="radio" value="Annually" checked={selectedOption === "Annually"} onChange={onChangeValue}/>
                <span class="checkmark"></span>
              </label>
            </div>
            </Form.Group>
          </Form>
        </Col>
        </Row>
        <Row className="mx-0">
          <Col sm="auto">
            <div className="form-group col-md-50">
              <label><h4>Pay To:</h4></label>
              <Form.Control
                as="select"
                custom
                onChange={handleInputChange}>
                <option selected>Select Vendor</option>
                <option value="PGE">PG&amp;E</option>
                <option value="COMCAST">Comcast</option>
                <option value="SOLAR">Solar</option>
              </Form.Control>
        </div>
          </Col>
        </Row>
        <br></br>
        <Row className="mx-0">
        <Col sm="auto">
         <div className="form-group col-md-50">
            <label><h4>Amount:</h4></label>
            <Form.Control className="mb-2 mr-sm-2" id="inlineFormInput" placeholder="$0.00" onChange={handleAmountChange}/>
          </div>
        </Col>
        </Row>
        <br></br><br></br>
        <Row className="my-8 mx-0">
        <Col sm={4} md={{ span: 4, offset: 4 }}>
          <Button variant="blue" className="w-50" onClick={handleClick}>Pay Bill</Button></Col>
        </Row>
        <MessageModalComponent show={showMessageModal} onHide={() => setShowMessageModal(false)} message={message}></MessageModalComponent>
      </>
    );


}

export default Bills;
