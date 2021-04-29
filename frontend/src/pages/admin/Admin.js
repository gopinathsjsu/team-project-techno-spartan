import React, {useState, useEffect, useReducer, useHistory} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './Admin.css';
import { TransactionsAdminComponent } from '../../components/account/transactions-admin';
import TransactionService from '../../services/TransactionService';
import { MessageModalComponent } from '../../components/account/message-modal';

function Admin (props) {
  const [transactions, setTransactions] = useState([]);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('Success');
  


    useEffect(() => {
        getFeesTransactions();
    }, []);


  const getFeesTransactions = () => {
    TransactionService.getFeesTransactions().then(response =>
       {const transactions = response.data;
            setTransactions(transactions);
        });
  }

  const getRefundInfo = (transId) => {
    
    TransactionService.getRefund(transId).then(res=>{
        setMessage("Refund Successful")
        setShowMessageModal(true)
        
    });
  }


  return (
    <>
      <Row className="my-4 mx-0">
        <Col sm="auto" className="mr-auto"><h4>Hello Admin !</h4></Col>
      </Row>
      <Row className="my-4 mx-0">
        <Col><TransactionsAdminComponent transactions = {transactions} getRefundInfo = {getRefundInfo}/></Col>
      </Row>
      <MessageModalComponent show={showMessageModal} onHide={() => setShowMessageModal(false)} message={message}></MessageModalComponent>
    </>
  );
}

export default Admin;
