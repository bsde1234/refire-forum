import React, { Component } from 'react'
import { bindings, styles } from 'refire-app'
import { Spinner } from 'elemental'
import TopBar from './App/TopBar'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { _status: { connected, initialFetchDone }, authenticatedUser, styles } = this.props
    const { key: boardKey, value: board = {} } = this.props.board || {}
    const { key: threadKey } = this.props.thread || {}
    const { value: settings } = this.props.settings || {}
    const loading = !connected || !initialFetchDone || !settings

    if (loading) {
      return (
        <div className={styles.spinnerContainer}>
          <div className={styles.verticalAlign}>
            <Spinner size="lg" />
          </div>
        </div>
      )
    }

    return (
      <div className="App">
        <div className={styles.app}>
          <TopBar
            authenticatedUser={authenticatedUser}
            board={board}
            boardKey={boardKey}
            threadKey={threadKey} />
          <div className={styles.body}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

const css = {
  app: {
    maxWidth: "980px",
    margin: "0 auto",
    padding: "0 20px"
  },
  body: {
    paddingTop: "60px"
  },
  spinnerContainer: {
    width: "100%",
    height: "100%",
    display: "table"
  },
  verticalAlign: {
    display: "table-cell",
    verticalAlign: "middle",
    textAlign: "center",
  }
}

export default styles(
  css,
  bindings(
    ["_status", "board", "thread", "settings"],
    ["authenticatedUser"]
  )(App)
)
