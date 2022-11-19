import React from 'react'
import { Container, Row, Col} from 'react-bootstrap';
import { Link } from "gatsby"

const footerStyle = {
  color: '#DCDCDC',
  backgroundColor: '#4A262A',
  fontSize: '1rem'
}

const Footer = () => {
  return (
    <Container fluid="xl" style={footerStyle} className="p-4 ps-6 pe-6">
        <Row>
          <Col>
            <Link className='link' to='/'>Mario Howard</Link>
          </Col>
          <Col className='text-end'>
            <Link className='link me-3' activeClassName='link--active' to='/imprint'>Impressum</Link>
            <Link className='link' activeClassName='link--active'to='/datenschutz'>Datenschutz</Link>
          </Col>
        </Row>
      </Container>
  )
}

export default Footer;