import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import './UIPage.css';

const UIPage = props => {
  const [userLogin, setUserLogin] = useState(true);
  return (
    <>
      <div>h1 (font-size 48px, font-weight 600): <h1 className="d-inline-block">Hello World!</h1></div>
      <div>h2 (font-size 48px, font-weight 700): <h2 className="d-inline-block">Hello World!</h2></div>
      <div>h3 (font-size 24px, font-weight 700): <h3 className="d-inline-block">Hello World!</h3></div>
      <div>h4 (font-size 24px, font-weight 600): <h4 className="d-inline-block">Hello World!</h4></div>
      <div>for this Button use variant="blue" <Button variant="blue">Click Me</Button></div>
      <div>for this Button use variant="red" <Button variant="red">Click Me</Button></div>
      <div>for this Button use variant="grey" <Button variant="grey">Click Me</Button></div>
      <div>for this Button use variant="green" <Button variant="green">Click Me</Button></div>
      <div>for this Button use variant="gold" <Button variant="gold">Click Me</Button></div>
    </>
  );
}

export default UIPage;
