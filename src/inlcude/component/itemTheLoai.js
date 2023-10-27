import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useState } from 'react';

function BasicExample(props) {
    const { id, name, link} = props;

  return (
    
    <Card>
      <Card.Img variant="top" src= {link} />
      <Card.Body>
        <Card.Title> {name} </Card.Title>
      </Card.Body>
    </Card>
  
  );
}

export default BasicExample;