import React from 'react'
import { Container, Row, Col} from 'react-bootstrap';
import { Link } from "gatsby"
import DetailsVideo from "../assets/detail-video.mp4";
import { StaticImage } from 'gatsby-plugin-image';

const detailsStyle = {

}

const Details = () => {
  return (
    <Container fluid="xl" style={detailsStyle} className="p-0 mb-4">
        <Row>
          <Col sx={6}>
            <StaticImage src="../assets/Einblick.jpg" alt="Einblick in die Werkstatt"></StaticImage>
          </Col>
          <Col sx={6}>
            <video style={ { width: '100%' } } autoPlay loop muted>
              <source src={DetailsVideo} type="video/mp4" />
            </video>
            <StaticImage src="../assets/Detail.jpg" alt="Detailaufnahme bei der Arbeit"></StaticImage>
          </Col>
        </Row>
      </Container>
  )
}

export default Details;