import React, {useState, useEffect, useReducer} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './Dashboard.css';
import { AccountCardComponent } from '../../components/account/account-card';
import { CreateModalComponent } from '../../components/account/create-modal';
import { TransactionsListComponent } from '../../components/account/transactions-list';
import AccountService from '../../services/AccountService';
import TransactionService from '../../services/TransactionService';
import {TransactionType } from '../../models/transactionTypes';

const initialState = {user: null, accounts: [], transactions: []}

function reducer(state, action) {
  const { user, account, trasactions } = state;
  switch(action.type) {
    case 'setUser':
      return { ...state, user: action.payload}
    case 'setAccounts':
      return {...state, accounts: action.payload}
    case 'setTransactions':
     return {...state, transactions: action.payload}
    default:
     return state
  }
}

const Dashboard = ({admin, user}) => {
  const [userData, dispatch] = useReducer(reducer, initialState)
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    console.log(TransactionType)
    if (!admin && user.attributes) {
      let userName = user.attributes.given_name;
      let userLastName = user.attributes.family_name;
      let userId = user.username;

      dispatch({type: 'setUser', payload: {name: userName, lastName: userLastName, id: userId}});

      getUserAccounts(userId);

      getTransactions(userId);
    }
}, [user, admin]);

  const getTransactions = (userId) => {
    TransactionService.getUserTransactions(userId).then(response => {
      dispatch({type: 'setTransactions', payload: response.data})
    })
  }

  const getTransactionsByType = (type) => {
    let userId = userData.user?.id;
    if (type == TransactionType.NONE)
      getTransactions(userId)
    else {
      TransactionService.getUserTransactionsByType(userId, type).then(response => {
        dispatch({type: 'setTransactions', payload: response.data})
      })
    }
  }

  const getUserAccounts = (userId) => {
    AccountService.getUserAccounts(userId).then(response => {
        dispatch({type: 'setAccounts', payload: response.data})
    });
  }

  const createAccount = (option) => {
    AccountService.createAccount(userData.user.id, option).then(res => {
      getUserAccounts(userData.user.id)
    }).catch(err => console.log(err))
    setShowCreateModal(false);
  }

  const closeAccount = (option) => {
    AccountService.closeAccount(userData.user.id, option).then(res => {
      getUserAccounts(userData.user.id)
    }).catch(err => console.log(err))
  }

  return (
    <>
      <Row className="my-4 mx-0">
        <Col sm="auto" className="mr-auto"><h4>Hello {userData.user?.name}!</h4></Col>
        <Col sm={4}><Button variant="blue" className="w-100" onClick={() => setShowCreateModal(true)}>Create New Account</Button></Col>
      </Row>
      <Row className="my-4 mx-0">
      {
        userData.accounts?.map(
        (account) => <Col sm="4" className="mb-3" key={account.id}><AccountCardComponent {...account} closeAccount={closeAccount}/></Col>
        )
      }
      </Row>
      <Row className="my-4 mx-0">
        <Col>
          <TransactionsListComponent
            transactions={userData.transactions}
            getTransactions={getTransactionsByType}/
            >
        </Col>
      </Row>
      <CreateModalComponent show={showCreateModal} onHide={() => setShowCreateModal(false)} createAccount={createAccount}/>
    </>
  );
}

export default Dashboard;
