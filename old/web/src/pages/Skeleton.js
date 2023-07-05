import React, { useEffect, useState } from "react"
import { Layout, Menu, Breadcrumb, Row, Col, message, ConfigProvider } from "antd"
import locale from "antd/lib/locale/fr_FR"
import { AuditOutlined, FileOutlined, SyncOutlined, ControlOutlined } from "@ant-design/icons"
import { connect, useDispatch } from "react-redux"
import { Link } from "@reach/router"
import { setNavbar, setLoading, initAll } from "../redux/actions"
import logo from "../assets/logo.png"

const { Header, Footer, Content } = Layout

function Skeleton({ breadcrumb, loading, loadingDatabase, children, updateTime, navbar }) {
  const dispatch = useDispatch()
  const [messageInfo, setMessageInfo] = useState(false)

  useEffect(() => {
    if (!loadingDatabase && messageInfo) {
      message.info("Mise à jour en base réussi, nous mettons à jour les données locales")
      dispatch(setLoading(true))
      dispatch(initAll())
      setMessageInfo(false)
    }

    if (loadingDatabase) {
      setMessageInfo(true)
    }
  }, [dispatch, loadingDatabase, messageInfo])

  return (
    <div>
      <Layout className="layout">
        <Header className="header ant-layout-header-custom">
          <Row type="flex" justify="space-between" align="middle">
            <Col
              xs={{ span: 11, offset: 1 }}
              sm={{ span: 7, offset: 7 }}
              md={{ span: 7, offset: 6 }}
              lg={{ span: 8, offset: 4 }}
              xl={{ span: 9, offset: 4 }}
            >
              <div className="header-title">
                <Link
                  className="header-title_font_family"
                  to="/"
                  onClick={() => {
                    dispatch(setNavbar(""))
                  }}
                >
                  Gestion documentaire{" "}
                </Link>
              </div>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 10 }} md={{ span: 11 }} lg={{ span: 10 }} xl={{ span: 11 }}>
              <Row type="flex" justify="end">
                <Menu
                  mode="horizontal"
                  theme="dark"
                  className="header-menu"
                  selectedKeys={navbar}
                  onSelect={(e) => {
                    dispatch(setNavbar(e.key))
                  }}
                >
                  <Menu.Item key="contracts">
                    <Link to="/contracts">
                      <AuditOutlined
                        style={{
                          fontSize: "20px",
                          margin: "0px",
                          top: "3px",
                          position: "relative",
                        }}
                      />
                      &nbsp;Affaires
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="documents">
                    <Link to="/documents">
                      <FileOutlined
                        style={{
                          fontSize: "20px",
                          margin: "0px",
                          top: "3px",
                          position: "relative",
                        }}
                      />
                      &nbsp;Documents
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="metadata">
                    <Link to="/metadata">
                      <ControlOutlined
                        style={{
                          fontSize: "20px",
                          margin: "0px",
                          top: "3px",
                          position: "relative",
                        }}
                      />
                      &nbsp;Metadata
                    </Link>
                  </Menu.Item>
                </Menu>
              </Row>
            </Col>
          </Row>
        </Header>
        <Content>
          <Row>
            <Col
              xs={{ span: 10, offset: 1 }}
              sm={{ span: 12, offset: 7 }}
              md={{ span: 13, offset: 6 }}
              lg={{ span: 15, offset: 4 }}
              xl={{ span: 15, offset: 4 }}
            >
              <Breadcrumb
                style={{
                  fontSize: "18px",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
              >
                {breadcrumb.map((item) => (
                  <Breadcrumb.Item key={item.name}>
                    <Link to={item.href}>{item.name}</Link>
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </Col>
            <Col span={5}>
              {loadingDatabase || (loading && updateTime === "") ? (
                <div
                  style={{
                    marginTop: "15px",
                    marginBottom: "15px",
                    marginRight: "50px",
                    textAlign: "right",
                    display: "block",
                  }}
                >
                  <SyncOutlined spin />
                </div>
              ) : (
                <span
                  style={{
                    marginTop: "15px",
                    marginBottom: "15px",
                    marginRight: "50px",
                    textAlign: "right",
                    display: "block",
                  }}
                >
                  MàJ: {updateTime || "Dernière MAJ inconnue"}
                </span>
              )}
            </Col>
          </Row>
          <ConfigProvider locale={locale}>
            <div className="site-layout-content">{children}</div>
          </ConfigProvider>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            background: "#f8f9f9",
            fontSize: "17px",
          }}
        >
          © 2021 Bial-X
        </Footer>
      </Layout>
      <Link
        to="/"
        onClick={() => {
          dispatch(setNavbar(""))
        }}
        style={{ height: "0em" }}
      >
        <img className="logo" src={logo} alt="logo-DIA" />
      </Link>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    breadcrumb: state.breadcrumb,
    loading: state.loading,
    loadingDatabase: state.loadingDatabase,
    updateTime: state.updateTime,
    navbar: state.navbar,
  }
}

export default connect(mapStateToProps, { setLoading, setNavbar, initAll })(Skeleton)
