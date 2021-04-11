import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './Bills.css';
import BillPayService from '../../services/BillPayService';

class Bills extends React.Component{

   // const [userLogin, setUserLogin] = useState(true);

  constructor(){
    super();
    this.state = {
        accountId: '',
        vendor: null,
        amount: '',
        recurr: 'off',
        selectedOption: ''
    }
       
    this.handleAccount = this.handleAccount.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.onBoxChecked = this.onBoxChecked.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.handleClick = this.handleClick.bind(this);
}

handleAccount(event) {

  this.setState({
    accountId: event.target.value
  });
}

handleInputChange(event) {
    
    this.setState({
        vendor: event.target.value
    });
    
}
handleAmountChange(event) {
    
  this.setState({
      amount: event.target.value
  });
  
}

onBoxChecked(event){
  
  this.setState({
    recurr: event.target.value
  });
}

onChangeValue(event){
  
  this.setState({
    selectedOption: event.target.value
  });
}

handleClick=(e)=>{
    e.preventDefault();
    let payment={accountId: this.state.accountId, vendor: this.state.vendor, amount: this.state.amount, recurr:this.state.recurr, selectedOption:this.state.selectedOption};
    // console.log('employee'+ JSON.stringify(payment));
    BillPayService.createBillPayment(payment).then(res=>{
      this.props.history.push('/pasttransfers')
    });

}

render() {
  return (
    <>
      <h1>Bill Payment</h1>
      <br></br><br></br>
      <Row className="mx-0">
      <Col sm="auto">
       <div className="form-group col-md-50">
          <label><h4>Account Id:</h4></label>
          <Form.Control className="mb-2 mr-sm-2" id="inlineFormInput" placeholder="Enter Account Number" onChange={this.handleAccount}/>
        </div>
      </Col>
      <Col md={{ span: 4, offset: 4 }}>
          <br></br>
        <Form>
          <Form.Group>
            <strong>
            <Form.Check label="Make Recurring" type="checkbox" onChange={this.onBoxChecked}/></strong>
          </Form.Group>
          <Form.Group className="recurringCard">
          <div className="text-left">
            <label className="customCheckbox">
              <span style={{ marginLeft: '.5rem' }}>Monthly</span>
              <input type="radio" value="Monthly" checked={this.state.selectedOption === "Monthly"} onChange={this.onChangeValue}/>
              <span class="checkmark"></span>
            </label>
            </div>
            <div className="text-left my-2">
            <label className="customCheckbox">
              <span style={{ marginLeft: '.5rem' }}>Annually</span>
              <input type="radio" value="Annually" checked={this.state.selectedOption === "Annually"} onChange={this.onChangeValue}/>
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
              onChange={this.handleInputChange}>
              <option selected>Select Vendor</option>
              <option value="PGE">PG&amp;E</option>
              <option value="Comcast">Comcast</option>
              <option value="Solar">Solar</option>
            </Form.Control>
      </div>
        </Col>
      </Row>
      <br></br>
      <Row className="mx-0">
      <Col sm="auto">
       <div className="form-group col-md-50">
          <label><h4>Amount:</h4></label>
          <Form.Control className="mb-2 mr-sm-2" id="inlineFormInput" placeholder="$0.00" onChange={this.handleAmountChange}/>
        </div>
      </Col>
      </Row>
      <br></br><br></br>
      <Row className="my-8 mx-0">
      <Col sm={4} md={{ span: 4, offset: 4 }}>
        <Button variant="blue" className="w-50" onClick={this.handleClick}>Pay Bill</Button></Col>
      </Row>
    </>
  );
}
}

export default Bills;
