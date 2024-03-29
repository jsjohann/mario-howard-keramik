import React, { useState } from 'react'
import { Container, Row, Col} from 'react-bootstrap';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode } from 'swiper';
import 'swiper/css';

const ShopDetail = (props) => {
  const activeItem = props.activeItem;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Container className="p-2 pt-0">
      <Row>
          <Col xs={12}>
            <Row className="mb-4">
              <Col xs={2} className="px-0 px-md-2">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    modules = {[Thumbs, FreeMode]}
                    mousewheel = {{ }}
                    freeMode={true}
                    slidesPerView = {4}
                    breakpoints = {{
                      576: {
                        slidesPerView: 5
                      }
                    }}
                    spaceBetween = {24}
                    watchSlidesProgress={true}
                    className="swiper-thumbs"
                    style={{ height: '100%' }}
                    direction={"vertical"}
                  >
                    {activeItem?.Fotos.map((node, index: number) => {
                      const image = getImage(node.directus_files_id.imageFile);

                      return (
                        <SwiperSlide key={`${activeItem?.Titel}-${index}`}>
                          <GatsbyImage className="thumbnail-image" image={image} alt={`${activeItem?.Titel}`} />
                        </SwiperSlide>
                      )})
                    }
                </Swiper>
              </Col>
              <Col xs={10} className="pe-2">
                <Swiper
                  modules = {[Thumbs]}
                  mousewheel = {{ }}
                  spaceBetween = {24}
                  slidesPerView = {1}
                  thumbs={{ swiper: thumbsSwiper }}
                >
                  {activeItem?.Fotos.map((node, index: number) => {
                    const image = getImage(node.directus_files_id.imageFile);

                    return (
                      <SwiperSlide key={`${activeItem?.Titel}-${index}`}>
                        <GatsbyImage image={image} alt={`${activeItem?.Titel}`} />
                      </SwiperSlide>
                    )})
                  }
                </Swiper>
              </Col>
            </Row>
          </Col>
          <Col xs={10} xs={{ offset: 2 }} className="ps-3 pt-0">
            <h2 style={{ marginBottom: '0.1rem'}}>{activeItem?.Titel}</h2>
            <p className="text-description">Höhe: {activeItem?.Hoehe} cm, Durchmesser: {activeItem?.Durchmesser} cm</p>
            <p style={{ marginBottom: 0, lineHeight: 1 }}>{activeItem?.Preis} €</p>
            <p className="text-small">Preis ohne MwSt. (Kleinunternehmerregelung)</p>
            <p className="text-description">{activeItem?.Beschreibung}</p>
          </Col>
        </Row>
      </Container>
  )
}

export default ShopDetail;