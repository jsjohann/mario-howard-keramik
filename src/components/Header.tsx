import React from 'react'
import { Container, Row, Col} from 'react-bootstrap';
import { Link } from "gatsby"
import logoWhite from "../images/icon-white.svg";
import logoRed from "../images/icon-red.svg";

const headerStyle = {
}

const Header = (props) => {
  return (
    <Container fluid="xl" style={{ ...headerStyle, position: props.position}} className="p-4 ps-6 pe-6">
        <Row>
          <Col>
            <Link className='link' to='/'><img style={{ height: '3rem', width: 'auto' }} src={props.color === 'white' ? logoWhite : logoRed} alt="Logo Mario Howard" /></Link>
          </Col>
        </Row>
      </Container>
  )
}

export default Header;