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
    <Container style={shopDetailStyle} className="p-2">
      <Row>
          <Col xs={12} md={6}>
            <Row className="mb-4">
              <Col xs={12}>
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
            <Row>
              <Col xs={12}>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    modules = {[Thumbs, FreeMode]}
                    mousewheel = {{ }}
                    spaceBetween = {24}
                    freeMode={true}
                    slidesPerView = {4}
                    watchSlidesProgress={true}
                    className="swiper-thumbs px-3"
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
            </Row>
          </Col>
          <Col xs={12} md={6} className="ps-4 pt-5">
            <h2>{activeItem?.Titel}</h2>
            <p>{activeItem?.Preis} ???</p>
            <p>{activeItem?.Beschreibung}</p>
          </Col>
        </Row>
      </Container>
  )
}

export default ShopDetail;