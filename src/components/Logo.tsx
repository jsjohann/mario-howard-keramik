import React from 'react'
import { Container, Row, Col, Stack} from 'react-bootstrap';
import logo from "../images/icon-red.svg";

const logoStyle = {
  // position: 'absolute',
  // zIndex: 1
}

const logoContainerStyle = {
}

const textContainerStyle = {
  fontWeigt: '600'
}

const textRed = {
  color: '#B23929'
}

const Logo = () => {
  return (
    <Container fluid="lg" style={logoStyle} className="p-4 p-md-5 px-md-6">
        <Row className="justify-content-center">
          <Col xs={12} md={6} style={logoContainerStyle} className="px-0">
            <Stack direction="horizontal" gap={3} className="justify-content-center">
              <img src={logo} alt="Logo Mario Howard" />
              <div style={textContainerStyle}>
                <h1>Mario</h1>
                <h1>Howard</h1>
                <h1 style={textRed}>Keramik</h1>
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
  )
}

export default Logo;