import * as React from "react"
import { Link, HeadFC } from "gatsby"
import Footer from '../components/Footer'

const DatenschutzPage = () => {
  return (
    <main>
      <h1>Datenschutz</h1>
      <Footer></Footer>
    </main>
  )
}

export default DatenschutzPage

export const Head: HeadFC = () => <title>Not found</title>