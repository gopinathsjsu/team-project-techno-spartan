import React, {useEffect} from 'react';
import { useHistory } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { ReactComponent as DotIcon } from '../../../assets/dotIcon.svg'
import './RecurringSingle.css';

const RecurringSingle = props => {
  useEffect(() => {
    console.log(props)

  }, [])

  const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
  })


  let history = useHistory();

  function goToDetails() {
    history.push(`/account/${props.id}`);
  }

  function manageRecurring() {
    alert("Will do smthing ")
  }

  return (
    <Row className="mx-0 recurringLine">
      {props.vendor}<DotIcon />
      {formatter.format(props.amount)}<DotIcon />
      {props.selectedOption}<DotIcon />
      <div className="smlBtn" onClick={manageRecurring}>Manage</div>
    </Row>
  );
}

export default RecurringSingle;
