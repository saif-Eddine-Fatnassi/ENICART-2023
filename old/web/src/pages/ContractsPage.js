/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { connect, useDispatch } from "react-redux"
import { Button, Alert, message, Space, Row, Col, Divider } from "antd"
import ListContracts from "../components/ListContracts"
import Filter from "../components/Filter"
import {
  addBreadcrumb,
  update,
  setLoading,
  setNavbar,
  setLoadingDatabase,
  updateAllContracts,
  updateFilterContract,
} from "../redux/actions"
import { exportToCSVContracts } from "../utils/exportUtils"
import {
  getStrByFilter,
  specialFilterByNested,
  specialFilterByNestedExternal,
  getTwoDateBeetweenTwoFilter,
} from "../utils/fitler"

import { getIdByContract } from "../utils/formatUtils"

function ContractsPage({ loading, contracts, loadingDatabase, filter }) {
  const dispatch = useDispatch()
  const [contractFiltered, setContractFiltered] = useState([])

  useEffect(() => {
    dispatch(setNavbar("contracts"))
    dispatch(
      addBreadcrumb({
        reset: true,
        data: [{ name: "Affaires", href: "/contracts" }],
      })
    )
  }, [dispatch])

  useEffect(() => {
    if (contracts.data && filter) {
      const listIdProjectManager = []
      if (filter.affected_project_managers) {
        filter.affected_project_managers.map((str) =>
          listIdProjectManager.push([...contracts.filter.projectManagers.find((item) => item.fullName === str).employeeId])
        )
      }
      setContractFiltered(
        contracts.data.filter(
          (contract) =>
            // contract_id
            getStrByFilter(getIdByContract(contract.title, ""), filter.contract_id) &&
            // company
            getStrByFilter(contract.company, filter.company) &&
            // affected_commercials > spéciale
            specialFilterByNested(contract.affected_commercials, filter.affected_commercials, "employeeId") &&
            // affected_project_managers > spéciale
            specialFilterByNestedExternal(
              contract.affected_project_managers,
              filter.affected_project_managers,
              "employeeId",
              listIdProjectManager
            ) &&
            // creator
            getStrByFilter(contract.creator, filter.creator) &&
            // date > spéciale
            getTwoDateBeetweenTwoFilter(contract.begin_date, contract.end_date, filter.date)
        )
      )
    } else {
      setContractFiltered(contracts.data)
    }
  }, [filter, contracts])

  return (
    <div className="contracts-page">
      <Helmet>
        <title>Affaires</title>
      </Helmet>
      <Space style={{ marginLeft: "10px" }}>
        <Button
          type="primary"
          onClick={() => {
            exportToCSVContracts(contracts.data)
          }}
          className="classic-button"
          loading={loading}
        >
          Exporter les affaires
        </Button>
      </Space>
      <Space style={{ paddingRight: "10px", float: "right" }}>
        <Button
          onClick={() => {
            dispatch(setLoading(true))
            dispatch(updateAllContracts())
          }}
          className="classic-button"
          loading={loading}
        >
          Actualiser les affaires
        </Button>
        <Button
          onClick={() => {
            dispatch(setLoadingDatabase(true))
            dispatch(update())
            message.warning("L'actualisation de la base de données peut prendre plusieurs minutes.")
          }}
          className="classic-button"
          loading={loadingDatabase}
        >
          Actualiser les données en base
        </Button>
      </Space>

      <Divider />
      <Filter
        OnFilter={(values) => dispatch(updateFilterContract(values))}
        loading={loading}
        style={{ marginLeft: "10px" }}
        dataFilter={contracts.filter}
        filter={filter}
        OnReset={() => dispatch(updateFilterContract(undefined))}
      />

      <Row style={{ marginLeft: "10px", marginTop: "10px" }}>
        <Col span={24}>
          <ListContracts contracts={contractFiltered} loading={loading} size={12} />
        </Col>
      </Row>
      {contracts.error !== "" && (
        <Alert
          style={{ marginTop: "10px" }}
          message="Erreur de chargement des données"
          description={contracts.error}
          type="error"
        />
      )}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    contracts: state.contracts,
    loading: state.loading,
    loadingDatabase: state.loadingDatabase,
    filter: state.filter.contract,
    keywords: state.keywords
  }
}

export default connect(mapStateToProps, {
  addBreadcrumb,
  setLoading,
  setNavbar,
  setLoadingDatabase,
  updateAllContracts,
  updateFilterContract,
})(ContractsPage)
