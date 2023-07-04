import React from "react"
import { Helmet } from "react-helmet"

function NotFoundPage() {
  return (
    <div>
      <Helmet>
        <title>Not Found Page</title>
      </Helmet>
      <h1>Ooops, route not found.</h1>
    </div>
  )
}

export default NotFoundPage
