import React from 'react'
import { Container, Row, Col} from 'react-bootstrap';
import logo from "../images/icon-red.svg";

const logoStyle = {
  position: 'absolute',
  zIndex: 1
}

const logoContainerStyle = {
  display: 'flex'
}

const textContainerStyle = {
  fontWeigt: '600'
}

const textRed = {
  color: '#B23929'
}

const Logo = () => {
  return (
    <Container fluid="xl" style={logoStyle} className="p-5 ps-6 pe-6">
        <Row className="justify-content-center">
          <Col xs={4} style={logoContainerStyle}>
            <img className="me-5" src={logo} alt="Logo Mario Howard" />
            <div style={textContainerStyle}>
              <h1>Mario</h1>
              <h1>Howard</h1>
              <h1 style={textRed}>Keramik</h1>
            </div>
          </Col>
        </Row>
      </Container>
  )
}

export default Logo;