import * as React from "react"
import { Link, HeadFC } from "gatsby"
import Footer from '../components/Footer'

const ImpressumPage = () => {
  return (
    <main>
      <h1>Impressum</h1>
      <Footer></Footer>
    </main>
  )
}

export default ImpressumPage

export const Head: HeadFC = () => <title>Not found</title>