import React from 'react'
import { useEffect,useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import {userContext} from "../App";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import jwt_decode from "jwt-decode";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Collapse from 'react-bootstrap/Collapse';

const PharmacyHome =() =>{

    const {state,dispatch} = useContext(userContext);
    const [show,setShow]  =useState(false);
    let navigate = useNavigate();
    const [buttonState, setButton] = useState(false);;
    const [open, setOpen] = useState(false);

    return (

      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <h1 style={{'paddingTop':40, 'textAlign':'center', 'fontFamily':'Serif', 'fontSize':40}}>Welcome to MedChain!</h1>
            <div className="d-grid gap-2">
                <ToggleButtonGroup type="checkbox" variant="dark">
                        <ToggleButton onClick = {(e) => setButton(true)} >
                            Show Requests
                        </ToggleButton>
                        <ToggleButton onClick = {(e) => setButton(false)}>
                            Hide Requests
                        </ToggleButton>
                </ToggleButtonGroup>
            </div>


            {
                buttonState === true && (
                    <div style={{paddingTop:10}}>
                        <Button
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            variant = "dark"
                        >
                            Request 1
                        </Button>
                        <Collapse in={open}>
                            <div id="example-collapse-text">
                                Request details etc.   
                                <Button>Verify user</Button> 
                            </div>
                        </Collapse>
                    </div>
                )
            }

          </Col>
          <Col></Col>
        </Row>
      </Container>

    )

}

export default PharmacyHome