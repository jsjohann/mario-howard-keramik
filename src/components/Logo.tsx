import React from 'react'
import { Container, Row, Col, Stack} from 'react-bootstrap';
import logo from "../images/icon-red.svg";

const textContainerStyle = {
  fontWeigt: '600'
}

const textRed = {
  color: '#B23929'
}

const Logo = () => {
  return (
    <Container fluid="lg" className="p-4 p-md-5 px-md-6">
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="px-0">
            <Stack direction="horizontal" gap={3} className="justify-content-center">
              <img src={logo} alt="Logo Mario Howard" />
              <div style={textContainerStyle}>
                <h1>
                  <span className="d-block">Mario</span>
                  <span className="d-block">Howard</span>
                  <span className="d-block" style={textRed}>Keramik</span>
                </h1>
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
  )
}

export default Logo;