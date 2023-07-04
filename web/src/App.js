import React from "react"
import { Router } from "@reach/router"
import { connect, useDispatch } from "react-redux"
import "./App.less"
import { setLoading, initAll, getAllKeywords } from "./redux/actions"
import HomePage from "./pages/HomePage"
import ContractsPage from "./pages/ContractsPage"
import DocumentsPage from "./pages/DocumentsPage"
import NotFoundPage from "./pages/NotFoundPage"
import ContractDetailPage from "./pages/ContractDetailPage"
import Skeleton from "./pages/Skeleton"
import MetadataPage from "./pages/MetadataPage"
import DocumentReadModifyPage from "./pages/DocumentReadModifyPage"
import DocumentCreatePage from "./pages/DocumentCreatePage"

function App() {
  const dispatch = useDispatch()
  dispatch(setLoading(true))
  dispatch(initAll())
  dispatch(getAllKeywords())
  return (
    <Skeleton>
      <Router>
        <HomePage path="/" />
        <ContractsPage path="/contracts" />
        <ContractDetailPage path="/contracts/:id" />
        <DocumentsPage path="/documents" />
        <DocumentReadModifyPage path="/documents/:id" />
        <DocumentReadModifyPage path="/documents/modify/:id" />
        <DocumentCreatePage path="/documents/create" />
        <DocumentCreatePage path="/documents/create-for-contract/:id" />
        <MetadataPage path="/metadata" />
        <NotFoundPage default />
      </Router>
    </Skeleton>
  )
}

export default connect(null, { setLoading, initAll })(App)
