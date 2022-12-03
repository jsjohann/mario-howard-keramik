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
    <Container fluid style={footerStyle} className="px-md-5">
      <Container className="p-4 px-md-5">
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
    </Container>
  )
}

export default Footer;