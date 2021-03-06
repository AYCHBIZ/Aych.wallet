import {
  CollateralAmt,
  Status
} from 'blockchain-wallet-v4-frontend/src/scenes/Borrow/BorrowHistory/model'
import { FormattedMessage } from 'react-intl'
import { head } from 'ramda'
import {
  isLastTxStatus,
  showBorrowSummary,
  showCollateralizationStatus
} from 'data/components/borrow/model'
import { model } from 'data'
import { OfferType } from 'core/types'
import { OwnProps, SuccessStateType } from '..'
import { TableRow, Title, Value } from 'components/Borrow'
import { Text } from 'blockchain-info-components'
import CoinDisplay from 'components/Display/CoinDisplay'
import React from 'react'
import styled from 'styled-components'

type Props = OwnProps & SuccessStateType & { offer: OfferType }

const Table = styled.div`
  margin-top: 16px;
`

const {
  getCollateralizationColor,
  getCollateralizationDisplayName
} = model.components.borrow

const Summary: React.FC<Props> = props => {
  const currentCollateralStatus = getCollateralizationDisplayName(
    props.loan.collateralisationRatio,
    props.offer
  )
  const lastUnconfirmedOrFailedTx = isLastTxStatus(
    ['FAILED', 'UNCONFIRMED', 'REQUESTED'],
    props.loan,
    props.loanTransactions
  )

  return showBorrowSummary(props.loan) ? (
    <div>
      <Text color='grey900' weight={600}>
        <FormattedMessage id='modals.borrow.summary' defaultMessage='Summary' />
      </Text>
      <Table>
        {lastUnconfirmedOrFailedTx && (
          <TableRow>
            <Title>
              <FormattedMessage
                id='modals.borrow.lasttx'
                defaultMessage='Last Transaction Status'
              />
            </Title>
            <Value>{lastUnconfirmedOrFailedTx.status}</Value>
          </TableRow>
        )}
        <TableRow>
          <Title>
            <FormattedMessage
              id='modals.borrow.status'
              defaultMessage='Status'
            />
          </Title>
          <Value>
            <Status {...props.loan} />
          </Value>
        </TableRow>
        <TableRow>
          <Title>
            <FormattedMessage
              id='modals.borrow.borrowamount'
              defaultMessage='Borrow Amount'
            />
          </Title>
          <Value>
            <CoinDisplay
              size='14px'
              weight={500}
              color='grey800'
              coin={props.loan.principal.amount[0].currency}
            >
              {props.loan.principal.amount[0].amount}
            </CoinDisplay>
          </Value>
        </TableRow>
        <TableRow>
          <Title>
            <FormattedMessage
              id='modals.borrow.collateral'
              defaultMessage='Collateral'
            />
          </Title>
          <Value>
            <CollateralAmt {...props} />
          </Value>
        </TableRow>
        {showCollateralizationStatus(props.loan) && (
          <TableRow>
            <Title>
              <FormattedMessage
                id='modals.borrow.collateralization'
                defaultMessage='Collateralization'
              />
            </Title>
            <Value color={getCollateralizationColor(currentCollateralStatus)}>
              {Number(props.loan.collateralisationRatio * 100).toFixed(0)}%
            </Value>
          </TableRow>
        )}
        <TableRow>
          <Title>
            <FormattedMessage
              id='modals.borrow.interestrate'
              defaultMessage='Interest Rate'
            />
          </Title>
          <Value>
            {Number(props.offer.terms.interestRate * 100).toFixed(0) + '%'}
          </Value>
        </TableRow>
      </Table>
    </div>
  ) : null
}

export default Summary
