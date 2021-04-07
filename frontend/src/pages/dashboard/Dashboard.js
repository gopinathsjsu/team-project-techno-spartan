import React, {useState, useEffect} from 'react';
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
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user logged In and set users initials
    setUser({name: "Leya", lastName: "Zoya"});
    setUserInitials("LZ");
    setAccounts([{type: "Savings", id: 1356, balance: 3450.00}, {type: "Savings", id: 123456, balance: 3450.00}, {type: "Checking", id: 123, balance: 3450.00}])
    setTransactions([{description: "Coffee", account: 1356, isCredit: true, amount: 40, date: Date.now(), status: "", id: 23425246},
  {description: "Amazon", account: 123456, isCredit: true, amount: 400, date: Date.now(), status: "", id: 23446},
{description: "Work", account: 1356, isCredit: false, amount:1540, date: Date.now(), status: "", id: 2342526}])

  }, []);

  const createAccount = (option) => {
    alert(option + "account should be created");
    setShow(false);
  }

  return (
    <>
      <Row className="my-4 mx-0">
        <Col sm="auto" className="mr-auto"><h4>Hello {user?.name}!</h4></Col>
        <Col sm={4}><Button variant="blue" className="w-100" onClick={() => setShow(true)}>Create New Account</Button></Col>
      </Row>
      <Row className="my-4 mx-0">
      {
        accounts?.map(
        (account) => <Col sm="4" key={account.id}><AccountCardComponent {...account}/></Col>
        )
      }
      </Row>
      <Row className="my-4 mx-0">
        <Col><TransactionsListComponent transactions={transactions}/></Col>
      </Row>
      <CreateModalComponent show={show} onHide={() => setShow(false)} createAccount={createAccount}/>
    </>
  );
}

export default Dashboard;
