import * as React from "react"
import { Link, HeadFC, graphql } from "gatsby"
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Container, Row, Col} from 'react-bootstrap';

const DatenschutzPage = ({ data }) => {
  return (
    <main>
      <Header color="red" position="relative"></Header>
      <Container className="p-4 ps-6 pe-6">
        <Row className="mb-4">
          <Col><h1>Datenschutz</h1></Col>
        </Row>
        <Row>
          <Col dangerouslySetInnerHTML={{ __html: data.directus.Datenschutz.Inhalt }}></Col>
        </Row>
      </Container>
      <Footer></Footer>
    </main>
  )
}

export default DatenschutzPage

export const Head: HeadFC = () => (
  <>
    <title>Mario Howard – Datenschutz</title>
    <meta name='robots' content='noindex,nofollow' />
    <meta name="theme-color" content="#B23929" />
    <meta name="format-detection" content="telephone=no" />
  </>
)
export const query = graphql`
  query {
    directus {
      Datenschutz {
        Inhalt
      }
    }
  }
`