import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import React from 'react'

import { actions, selectors } from 'data'
import WalletLayout from './template'

class WalletLayoutContainer extends React.PureComponent {
  componentDidMount () {
    this.props.kvStoreWhatsNewActions.fetchMetadataWhatsnew()
    this.props.kvStoreShapeshiftActions.fetchMetadataShapeshift()
    this.props.kvStoreBuySellActions.fetchMetadataBuySell()
  }

  render () {
    const {
      isAuthenticated,
      path,
      computedMatch,
      component: Component,
      ...rest
    } = this.props

    return isAuthenticated ? (
      <Route
        path={path}
        render={props => (
          <WalletLayout location={props.location} coin={this.props.coin}>
            <Component computedMatch={computedMatch} {...rest} />
          </WalletLayout>
        )}
      />
    ) : (
      <Redirect to={{ pathname: '/login', state: { from: '' } }} />
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: selectors.auth.isAuthenticated(state)
})

const mapDispatchToProps = dispatch => ({
  kvStoreShapeshiftActions: bindActionCreators(
    actions.core.kvStore.shapeShift,
    dispatch
  ),
  kvStoreWhatsNewActions: bindActionCreators(
    actions.core.kvStore.whatsNew,
    dispatch
  ),
  kvStoreBuySellActions: bindActionCreators(
    actions.core.kvStore.buySell,
    dispatch
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletLayoutContainer)
