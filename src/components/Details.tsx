import React, { useEffect, useRef, useState } from 'react'
import { Container, Row, Col} from 'react-bootstrap';
import { Link } from "gatsby"
import DetailsVideo from "../assets/detail-video.mp4";
import { StaticImage } from 'gatsby-plugin-image';

const detailsStyle = {

}

const Details = () => {
  const frameCount = 119;

  const currentFrame = (index: number) => (
    `/detail-images/animation-detail${index.toString().padStart(3, '0')}.jpg`
  )

  const canvas = useRef(null);

  const img = new Image();
  
  img.onload = function(){
    drawImage();
  }

  const updateImage = (frameIndex: number) => {
    img.src = currentFrame(frameIndex);
   // drawImage();
  }

  const drawImage = () => {
    var scale = Math.max(canvas.current.width / img.width, canvas.current.height / img.height);
    // get the top left position of the image
    var x = (canvas.current.width - img.width) / 2;
    var y = (canvas.current.height - img.height) / 2;
    canvas.current.getContext('2d').drawImage(img, x, y, img.width * scale, img.height * scale);
  }

  const updateImageOnScroll = (html: HTMLElement) => {
    const windowHeight = window?.innerHeight ?? 0;
    const elementHeight = canvas.current.scrollHeight;
    const currentPosition = canvas.current.getBoundingClientRect().y + elementHeight;
    const delta = windowHeight + elementHeight;
    const relativePosition = currentPosition / delta;
    const fraction = Math.min(Math.max(relativePosition, 0), 1);
    const index = Math.round(fraction * frameCount);
    requestAnimationFrame(() => updateImage(index))
  }
  
  useEffect(() => {
    const onScroll = () => updateImageOnScroll(document.documentElement);
    img.src = currentFrame(0);
    canvas.current.width = canvas.current.clientWidth * (window?.devicePixelRatio ?? 1);
    canvas.current.height = canvas.current.clientHeight * (window?.devicePixelRatio ?? 1);
    // clean up code
    if (window) {
      window.removeEventListener('scroll', onScroll);
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Container fluid="xl" style={detailsStyle} className="p-0 mb-4">
        <Row>
          <Col xs={6}>
            <StaticImage src="../assets/Einblick.jpg" alt="Einblick in die Werkstatt"></StaticImage>
          </Col>
          <Col xs={6} className="d-flex flex-column">
            <div className="mb-4" style={{ flex: 1}}>
              <canvas style={{ height: '100%', width: '100%' }} ref={canvas}></canvas>
            </div>
            <div style={{ flex: 1}}>
              <StaticImage style={{ height: '100%' }} src="../assets/Detail.jpg" alt="Detailaufnahme bei der Arbeit"></StaticImage>
            </div>
          </Col>
        </Row>
      </Container>
  )
}

export default Details;