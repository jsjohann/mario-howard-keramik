import * as React from "react"
import { HeadFC, graphql } from "gatsby"
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Container, Row, Col} from 'react-bootstrap';

const imprintStyle = {
  minHeight: '90vh'
}

const ImpressumPage = ({ data }) => {
  return (
    <main>
      <Header color="red" position="relative"></Header>
      <Container style={imprintStyle} className="p-4 ps-6 pe-6">
        <Row className="mb-4">
          <Col><h1>Impressum</h1></Col>
        </Row>
        <Row>
          <Col dangerouslySetInnerHTML={{ __html: data.directus.Impressum.Inhalt }}></Col>
        </Row>
      </Container>
      <Footer></Footer>
    </main>
  )
}

export default ImpressumPage

export const Head: HeadFC = () => (
  <>
    <title>Mario Howard – Impressum</title>
    <meta name='robots' content='noindex,nofollow' />
    <meta name="theme-color" content="#B23929" />
    <meta name="format-detection" content="telephone=no" />
  </>
)

export const query = graphql`
  query {
    directus {
      Impressum {
        Inhalt
      }
    }
  }
`