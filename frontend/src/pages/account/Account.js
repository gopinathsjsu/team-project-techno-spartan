import React, {useEffect, useReducer} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {
  useParams
} from "react-router-dom";
import './Account.css';
import AccountService from '../../services/AccountService';
import TransactionService from '../../services/TransactionService';
import PaymentsService from '../../services/PaymentsService';
import { TransactionsListComponent } from '../../components/account/transactions-list';
import { RecurringSingleComponent } from '../../components/account/recurring-single';
import {TransactionType } from '../../models/transactionTypes';

const initialState = {accountInfo: null, transactions: [], recurringTransactions: []}

function reducer(state, action) {
  const { accountInfo, trasactions, recurringTransactions } = state;
  switch(action.type) {
    case 'setAccount':
      return {...state, accountInfo: action.payload}
    case 'setTransactions':
     return {...state, transactions: action.payload}
    case 'setRecurringTransactions':
      return {...state, recurringTransactions: action.payload}
    default:
     return state
  }
}


const Account = ({user}) => {
  const [accountData, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getAccountInfo(user.username, id)
    getTransactions(user.username, id);
    getRecurringTransactions(user.username, id);
  }, []);

  let { id } = useParams();

  const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
  })

  const getTransactions = (userId, accountId) => {
    TransactionService.getAccountTransactions(userId, accountId).then(response => {
      dispatch({type: 'setTransactions', payload: response.data})
    })
  }

  const getAccountInfo = (userId, accountId) => {
    AccountService.getAccountById(userId, accountId).then(response => {
        dispatch({type: 'setAccount', payload: response.data})
    });
  }

  const getRecurringTransactions = (userId, accountId) => {
    PaymentsService.getRecurringTransactionsByAccount(userId, accountId).then(response => {
        dispatch({type: 'setRecurringTransactions', payload: response.data})
    });
  }

  const getTransactionsByType = (accountId, type) => {
    let userId = user.username;
    if (type == TransactionType.NONE)
      getTransactions(userId, accountId)
    else {
      TransactionService.getAccountTransactionsByType(userId, accountId, type).then(response => {
        dispatch({type: 'setTransactions', payload: response.data})
      })
    }
  }

  function deleteAccount(userId, accountId) {

    alert("Need to check balance. Account will be deleted")
  }

  return (
    <>
    <Row className="my-4 mx-0">
      <Col sm={5}>
        <div className="accountCard pt-3">
          <Row className="mx-0">
            <Col><h4>{accountData.accountInfo?.type} Account</h4></Col>
          </Row>
          <Row className="mx-0">
          <Col>Num: {accountData.accountInfo?.id}</Col>
          </Row>
          <Row className="mx-0">
          <Col><h1>{formatter.format(accountData.accountInfo?.balance)}</h1></Col>
          </Row>
        </div>
      </Col>
      <Col sm={7}>
          <Row className="mx-0">
            <h4>Recurring Payments:</h4>
          </Row>
          {
            accountData.recurringTransactions.map((elem, index) => <RecurringSingleComponent key={"recurring" + index} {...elem}/>)
          }
          {accountData.recurringTransactions.length == 0
            ? <Row className="mx-0">Nothing is set yet</Row> : null }
      </Col>
    </Row>
      <Row className="my-4 mx-0">
        <Col>
          <TransactionsListComponent
          transactions={accountData.transactions}
          getTransactions={getTransactionsByType}
          account={accountData.accountInfo?.id}/>
        </Col>
      </Row>
      <Row className="my-4 mx-0">
        <Button variant="red" className="modalBtn ml-auto mr-3" onClick={() => deleteAccount(accountData.accountInfo.userId, accountData.accountInfo.id)}>Close Account</Button>
      </Row>
    </>
  );
}

export default Account;
