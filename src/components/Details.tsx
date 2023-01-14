import React, { useEffect, useRef, useState } from 'react'
import { Container, Row, Col} from 'react-bootstrap';
import { graphql, Link, StaticQuery } from "gatsby"
import DetailsVideo from "../assets/detail-video.mp4";
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image';

const detailsStyle = {

}

const Details = (props) => {
  // const frameCount = 119;
  const frameCount = 119;
  const [currentIndex, setCurrentIndex] = useState(0);
  const container = useRef(null);

  const updateImageOnScroll = (html: HTMLElement) => {
    const windowHeight = window.innerHeight;
    const elementHeight = container.current.scrollHeight;
    const currentPosition = container.current.getBoundingClientRect().y + elementHeight;
    const delta = windowHeight + elementHeight;
    const relativePosition = currentPosition / delta;
    const fraction = Math.min(Math.max(relativePosition, 0), 1);
    const index = Math.min(Math.round(fraction * frameCount) + 1, frameCount);
    setCurrentIndex(index);
    // requestAnimationFrame(() => updateImage(index));
  }
  
  useEffect(() => {
    const onScroll = () => updateImageOnScroll(document.documentElement);

    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          photos: allFile(
            filter: {name: {regex: "/animation-detail/"}}, sort: {fields: name}
          ) {
          edges {
            node {
              absolutePath
              name
              childImageSharp {
                gatsbyImageData(formats: [AUTO, WEBP, AVIF])
              }
            }
          }
        }
        }
      `}
      render = {
        (data) => (
           <Container fluid="xl" style={detailsStyle} className="p-0 mb-4">
            <Row>
              <Col xs={6}>
                <StaticImage src="../assets/Einblick.jpg" alt="Einblick in die Werkstatt"></StaticImage>
              </Col>
              <Col xs={6} className="d-flex flex-column">
                <div className="mb-4" style={{ position: 'relative', flex: 1, overflow: 'hidden', whiteSpace: 'nowrap'}} ref={container}>
                  {data.photos.edges.map((img, index) => (
                    <GatsbyImage loading="eager" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', display: index === currentIndex ? 'block' : 'none', willChange: 'display', transform: 'translateZ(0)' }} objectFit={'cover'} image={getImage(img.node)} key={index} alt={`Detailaufnahme bei der Arbeit Bildsequenz Index ${index}`} />
                  ))}
                </div>
                <div style={{ flex: 1}}>
                  <StaticImage style={{ height: '100%' }} src="../assets/Detail.jpg" alt="Detailaufnahme bei der Arbeit"></StaticImage>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      />
  )
}

export default Details;