import './Transfers.css';
import React, { Component } from 'react';
import TransferServices from './../../services/TransferServices';
import {withRouter} from 'react-router-dom';

class Transfers extends React.Component {
  constructor(props)
  {
    super(props)
    this.state={
      transferFrom: '',
      transferTo: '',
      amount:'',
      memo: ''
    }
    this.transferFrom=this.transferFrom.bind(this);
    this.transferTo=this.transferTo.bind(this);
    this.amount=this.amount.bind(this);
    this.memo=this.memo.bind(this);
    this.saveTransfer=this.saveTransfer.bind(this);
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
          <div className="row">
          <div className="card-body">
          <form>
            <div className="form-group">
                <label>Transfer From:</label>
                <input placeholder="Transfer from" name="transfer_from" className="form-control"
                value={this.state.transferFrom} onChange={this.transferFrom}/>
            </div>
          </form>
          <form>
            <div className="form-group">
                <label>Transfer  To:</label>
                <input placeholder="Transfer to" name="transfer_to" className="form-control"
                value={this.state.transferTo} onChange={this.transferTo}/>
            </div>
          </form>
          <form>
            <div className="form-group">
                <label>Amount:</label>
                <input placeholder="Amount" name="amount" className="form-control"
                value={this.state.amount} onChange={this.amount}/>
            </div>
          </form>
          <form>
            <div className="form-group">
                <label>Memo:</label>
                <input placeholder="Memo" name="memo" className="form-control"
                value={this.state.memo} onChange={this.memo}/>
            </div>
          </form>
          <button className="btn btn-success" onClick={this.saveTransfer}>Confirm Transaction</button>
           <button className="btn btn-danger" > Cancel Transaction</button>
        </div>
        </div>
        </div>
        </div>
     
    )
  }
}
export default withRouter(Transfers);
