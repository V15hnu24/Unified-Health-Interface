import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Navigate, useNavigate} from 'react-router-dom';

const AdminNavbar = () => {

    let navigate = useNavigate();

    const onPatientClick = () => {
        navigate("/AdminHandlePatient")
    }

    const onOrganisationClick = () => {
        navigate("/AdminHandleOrganization")
    }

    const onProfessionalClick = () => {
        navigate("/AdminHandleProfessionals")
    }

  return (
    <>
    <Container>
        <Row>
            <Col>
                <div className="d-grid gap-2">
                    <Button variant="dark" size="lg" onClick={onPatientClick}>
                        Patient
                    </Button>
                </div>
            </Col>
            <Col>
                <div className="d-grid gap-2">
                    <Button variant="dark" size="lg" onClick={onOrganisationClick}>
                        Organizations
                    </Button>
                </div>
            </Col>
            <Col>
                <div className="d-grid gap-2">
                    <Button variant="dark" size="lg" onClick={onProfessionalClick}>
                        Professionals
                    </Button>
                </div>
            </Col>
        </Row>
        


    </Container>
    </>
  )
}

export default AdminNavbar