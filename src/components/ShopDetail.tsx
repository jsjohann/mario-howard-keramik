import React, { useState } from 'react'
import { Container, Row, Col} from 'react-bootstrap';
import { Link } from "gatsby"
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel, Swiper as SwiperType, Thumbs, FreeMode, EffectFade } from 'swiper';
import 'swiper/css';
import "swiper/css/effect-fade";

const shopDetailStyle = {

}

const thumbStyle = {
  opacity: 0.5
}

const thumbStyleActive = {
  opacity: 1
}

const ShopDetail = (props) => {
  const activeItem = props.activeItem;
  const [activeImage, setActiveImage] = useState<number>(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const handleChangeImage = (index: number) => {
    setActiveImage(index);
    console.log(index);
  }

  return (
    <Container style={shopDetailStyle} className="p-2 pt-0">
      <Row>
          <Col xs={12}>
            <Row className="mb-4">
              <Col xs={2} className="px-0 px-md-2">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    modules = {[Thumbs, FreeMode]}
                    mousewheel = {{ }}
                    freeMode={true}
                    slidesPerView = {5}
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
              <Col xs={10}>
                <Swiper
                  modules = {[Thumbs, EffectFade]}
                  mousewheel = {{ }}
                  spaceBetween = {24}
                  slidesPerView = {1}
                  thumbs={{ swiper: thumbsSwiper }}
                  effect={"fade"}
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
          <Col xs={10} xs={{ offset: 2 }} className="ps-3 pt-2">
            <h2 style={{ marginBottom: '0.1rem'}}>{activeItem?.Titel}</h2>
            <p className="text-description">Höhe: {activeItem?.Hoehe} cm, Durchmesser: {activeItem?.Durchmesser} cm</p>
            <p style={{ marginBottom: 0, lineHeight: 1, fontWeight: 500 }}>{activeItem?.Preis} €</p>
            <p className="text-small">Preis ohne MwSt. (Kleinunternehmerregelung)</p>
            <p className="text-description">{activeItem?.Beschreibung}</p>
          </Col>
        </Row>
      </Container>
  )
}

export default ShopDetail;