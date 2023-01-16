import React, { useEffect, useRef, useState } from 'react'
import { Container, Row, Col} from 'react-bootstrap';
import { StaticImage } from 'gatsby-plugin-image';

const Details = (props) => {

  const canvasRef = useRef(null);
  const container = useRef(null)
  const [images, setImages] = useState([]);
  const [frameIndex, setFrameIndex] = useState(0);

  const numFrames = 60;

  function getCurrentFrame(index: number) {
    return `/detail-images/${index.toString().padStart(3, '0')}.jpg`;
  }

  function preloadImages() {
    for (let i = 0; i < numFrames; i++) {
      const img = new Image();
      const imgSrc = getCurrentFrame(i);
      img.src = imgSrc;
      setImages((prevImages) => [...prevImages, img]);
    }
  }

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const elementHeight = container.current.scrollHeight;
    const currentPosition = container.current.getBoundingClientRect().y + elementHeight;
    const delta = windowHeight + elementHeight;
    const relativePosition = currentPosition / delta;
    const fraction = Math.min(Math.max(relativePosition, 0), 1);
    const index = Math.min(Math.round(fraction * numFrames), numFrames - 1);
    setFrameIndex(index);
  }

  const renderCanvas = () => {
    const context = canvasRef.current.getContext('2d');
  }

  useEffect(() => {
    preloadImages();
    renderCanvas();
    window.addEventListener('scroll', handleScroll);
    console.log('init effect');

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || images.length < 1) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');
    
    let requestId: number;

    const render = () => {
      const img: HTMLImageElement = images[frameIndex]

      if (!img || !canvas) {
        return;
      }

      const aspectRatioImage = img.naturalWidth / img.naturalHeight;
      const aspectRatioCanvas = canvas.width / canvas.height;

      const containerWidth = container.current.getBoundingClientRect().width;
      const containerHeight = container.current.getBoundingClientRect().height;

      canvas.width = containerWidth * window.devicePixelRatio;
      canvas.height = containerHeight * window.devicePixelRatio;

      let imageHeight, imageWidth;

      if (aspectRatioImage < aspectRatioCanvas) {
        imageWidth = canvas.width;
        imageHeight = canvas.width / aspectRatioImage;
      } else {
        imageWidth = canvas.height * aspectRatioImage;
        imageHeight = canvas.height;
      }

      const x = (canvas.width - imageWidth) / 2;
      const y = (canvas.height - imageHeight) / 2;

      context.drawImage(img, x, y, imageWidth, imageHeight);
    };

    requestId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(requestId);
  }, [frameIndex, images]);

  return (
    <Container fluid="xl" className="p-0 mb-4">
      <Row>
        <Col xs={12} md={6} className="mb-4 mb-md-0">
          <StaticImage src="../assets/Einblick.jpg" alt="Einblick in die Werkstatt"></StaticImage>
        </Col>
        <Col xs={12} md={6} className="d-flex flex-column">
          <Col xs={12} className="mb-4" style={{ position: 'relative', flex: 1, overflow: 'hidden', whiteSpace: 'nowrap'}} ref={container}>
            <canvas style={{ height: '100%', width: '100%'}} ref={canvasRef} />
          </Col>
          <Col xs={12} style={{ flex: 1}}>
            <StaticImage style={{ height: '100%' }} src="../assets/Detail.jpg" alt="Detailaufnahme bei der Arbeit"></StaticImage>
          </Col>
        </Col>
      </Row>
    </Container>
  )
}

export default Details;