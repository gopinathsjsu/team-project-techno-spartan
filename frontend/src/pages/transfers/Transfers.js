import './Transfers.css';
import React, { Component } from 'react';
import TransferServices from './../../services/TransferServices';
import {withRouter} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from 'react-bootstrap';

class Transfers extends React.Component {
  constructor(props)
  {
    super(props)
    this.state={
      transferFrom: '',
      transferTo: '',
      amount:'',
      memo: '',
      recurr: '',
      selectedOption: ''
    }
    this.transferFrom=this.transferFrom.bind(this);
    this.transferTo=this.transferTo.bind(this);
    this.amount=this.amount.bind(this);
    this.memo=this.memo.bind(this);
    this.saveTransfer=this.saveTransfer.bind(this);
    this.onBoxChecked = this.onBoxChecked.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }
  transferFrom=(event)=>{
    this.setState({transferFrom: event.target.value});
  }
transferTo=(event)=>{
  this.setState({transferTo: event.target.value});
  }
amount=(event)=>{
  this.setState({amount: event.target.value});
  }
memo=(event)=>{
  this.setState({memo: event.target.value});
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

  saveTransfer=(e)=>{
    e.preventDefault();
    let transfer={accountId: this.state.transferFrom, amount: this.state.amount, participantId: this.state.transferTo, memo: this.state.memo};
    // console.log('employee'+ JSON.stringify(transfer));
    TransferServices.createTransferbetweenAccount(transfer).then(res=>{
      this.props.history.push('/pasttransfers')
    });

  }

  render() {
    return (
      <div>
          <h1>Transfer</h1>
          <div className="container">
          <Row className="mx-0">
          <form>
            <div className="form-group">
                <label><h4>From:</h4></label>
                <input placeholder="Transfer from" name="transfer_from" className="form-control textarea"
                value={this.state.transferFrom} onChange={this.transferFrom}/>
            </div>
          </form>
          </Row>
          <Row className="mx-0">
          <form>
            <div className="form-group">
                <label><h4>To:</h4></label>
                <input placeholder="Transfer to" name="transfer_to" className="form-control textarea"
                value={this.state.transferTo} onChange={this.transferTo}/>
            </div>
          </form>
          <Col md={{ span: 4, offset: 4 }}>
          <br></br>
        <Form>
          <Form.Group>
            <strong>
            <Form.Check label="Make Recurring" type="checkbox" onChange={this.onBoxChecked}/>
            </strong>
          </Form.Group>
          <Form.Group className="recurringCard">
          <div className="text-left">
            <label className="customCheckbox">
              <span style={{ marginLeft: '.5rem' }}>Monthly</span>
              <input type="radio" value="Monthly" checked={this.state.selectedOption === "Monthly"} onChange={this.onChangeValue}/>
              <span class="checkmark"></span>
            </label>
            </div>
            <div className="text-left my-4">
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
          <form>
            <div className="form-group">
                <label><h4>Amount:</h4></label>
                <input placeholder="Amount" name="amount" className="form-control textarea"
                value={this.state.amount} onChange={this.amount}/>
            </div>
          </form>
          </Row>
          <Row className="mx-0">
          <form>
            <div className="form-group">
                <label><h4>Memo:</h4></label>
                <input placeholder="Memo" name="memo" className="form-control textarea"
                value={this.state.memo} onChange={this.memo}/>
            </div>
          </form>
          </Row>
          <br></br>
          <Row className="mx-0">
            <Col sm={4}>
          <Button variant="blue" className="w-30" onClick={this.saveTransfer}>Confirm Transaction</Button>
          </Col>
          <Col md={{ span: 3, offset: 5 }}>
          <Button className="btn btn-danger" > Cancel Transaction</Button>
          </Col>
          </Row>
        </div>
        </div>
    )
  }
}
export default withRouter(Transfers);
