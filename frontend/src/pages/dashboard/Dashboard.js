import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {
  Link
} from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './Dashboard.css';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { AccountCardComponent } from '../../components/account/account-card';
import { CreateModalComponent } from '../../components/account/create-modal';
import { TransactionsListComponent } from '../../components/account/transactions-list';
const Dashboard = props => {
  const [user, setUser] = useState(null);
  const [userInitials, setUserInitials] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    getUserInfo();
    setAccounts([{type: "Savings", id: 1, userId:1, balance: 3450.00, dateCreated: Date.now()}, {type: "Savings", id: 2, userId:1, balance: -50.00, dateCreated: Date.now()}, {type: "Checking", id: 3, userId:1, balance: 3450.00, dateCreated: Date.now()}])
    setTransactions([{description: "Coffee", account: 1356, isCredit: true, amount: 40, date: Date.now(), status: "", id: 23425246},
  {description: "Amazon", account: 123456, isCredit: true, amount: 400, date: Date.now(), status: "", id: 23446},
{description: "Work", account: 1356, isCredit: false, amount:1540, date: Date.now(), status: "", id: 23428526}])

}, [props.user]);

  const getUserInfo = () => {
    if (!props.admin && props.user.attributes) {
      setUser({name: props.user.attributes.given_name, lastName: props.user.attributes.family_name, id: props.user.attributes.propfile});
      if (props.user.attributes.given_name && props.user.attributes.family_name)
        setUserInitials(props.user.attributes.given_name[0] +  props.user.attributes.family_name[0]);
    }
  }

  const createAccount = (option) => {
    console.log(user)
    axios.post('http://localhost:8080/accounts/create/' + user.id + '/' + option)
    .then((response) => {
      console.log(response);
      alert(option + " account created, account id is " + response.data.id);
    }, (error) => {
      console.log(error);
    });
    setShowCreateModal(false);
    //reload accounts after
  }

  const closeAccount = (option) => {
    console.log("close " + option)
    axios.post('http://localhost:8080/accounts/close/' + option)
    .then((response) => {
       console.log(response);
       alert(option + " account closed");
    }, (error) => {
       console.log(error);
    });
    //reload accounts after
  }

  return (
    <>
      <Row className="my-4 mx-0">
        <Col sm="auto" className="mr-auto"><h4>Hello {user?.name}!</h4></Col>
        <Col sm={4}><Button variant="blue" className="w-100" onClick={() => setShowCreateModal(true)}>Create New Account</Button></Col>
      </Row>
      <Row className="my-4 mx-0">
      {
        accounts?.map(
        (account) => <Col sm="4" key={account.id}><AccountCardComponent {...account} closeAccount={closeAccount}/></Col>
        )
      }
      </Row>
      <Row className="my-4 mx-0">
        <Col><TransactionsListComponent transactions={transactions}/></Col>
      </Row>
      <CreateModalComponent show={showCreateModal} onHide={() => setShowCreateModal(false)} createAccount={createAccount}/>
    </>
  );
}

export default Dashboard;
