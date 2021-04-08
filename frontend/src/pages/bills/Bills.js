import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './Bills.css';

class Bills extends React.Component{

   // const [userLogin, setUserLogin] = useState(true);

  constructor(){
    super();
    this.state = {
        vendor:null,

    }
       
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.onChangeValue = this.onChangeValue.bind(this);
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

handleClick(event){

}

onChangeValue(event){
  
  this.setState({
    selectedOption: event.target.value
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
            <label><h4>Pay To:</h4></label>
            <Form.Control
              as="select"
              custom
              onChange={this.handleInputChange}>
              <option selected>Select Vendor</option>
              <option value="1">PG&amp;E</option>
              <option value="2">Comcast</option>
              <option value="3">Solar</option>
            </Form.Control>
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
          <div>
            <label className="radioButtonGroup">
              <input type="radio" value="Monthly" checked={this.state.selectedOption === "Monthly"} onChange={this.onChangeValue}/>
              <span style={{ marginLeft: '.5rem' }}>Monthly</span>
            </label>
            </div>
            <div>
            <label className="radioButtonGroup">
              <input type="radio" value="Annually" checked={this.state.selectedOption === "Annually"} onChange={this.onChangeValue}/>
                <span style={{ marginLeft: '.5rem' }}>Annually</span>
            </label>
          </div>
          </Form.Group>
        </Form>
      </Col>
      </Row>
      <br></br><br></br>
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
