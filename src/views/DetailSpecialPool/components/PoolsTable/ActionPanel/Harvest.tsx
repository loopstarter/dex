import React from 'react'
import { Button, Text, useModal, Flex, Skeleton, Heading } from '@loopstarter/special-uikit'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { PoolCategory } from 'config/constants/types'
import { formatNumber, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import { BIG_ZERO } from 'utils/bigNumber'
import { DeserializedPool } from 'state/types'
import styled from 'styled-components'

import { ActionContainer, ActionTitles, ActionContent } from './styles'
import CollectModal from '../../PoolCard/Modals/CollectModal'

const HarvestButtonStyled = styled(Button)`
  border-radius: 4px;
  margin-left: 8px;
  padding: 0 8px;
  flex: 2;
  background: #eaab42;
`
interface HarvestActionProps extends DeserializedPool {
  userDataLoaded: boolean
}

const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({
  sousId,
  poolCategory,
  earningToken,
  userData,
  userDataLoaded,
  earningTokenPrice,
}) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  const earnings = userData?.pendingReward ? new BigNumber(userData.pendingReward) : BIG_ZERO
  const earningTokenBalance = getBalanceNumber(earnings, earningToken.decimals)
  const earningTokenDollarBalance = getBalanceNumber(earnings.multipliedBy(earningTokenPrice), earningToken.decimals)
  const hasEarnings = earnings.gt(0)
  const fullBalance = getFullDisplayBalance(earnings, earningToken.decimals)
  const formattedBalance = formatNumber(earningTokenBalance, 3, 3)
  const isCompoundPool = sousId === 0
  const isBnbPool = poolCategory === PoolCategory.BINANCE

  const [onPresentCollect] = useModal(
    <CollectModal
      formattedBalance={formattedBalance}
      fullBalance={fullBalance}
      earningToken={earningToken}
      earningsDollarValue={earningTokenDollarBalance}
      sousId={sousId}
      isBnbPool={isBnbPool}
      isCompoundPool={isCompoundPool}
    />,
  )

  const actionTitle = (
    <>
      <Text fontSize="12px" bold color="secondary" as="span" textTransform="uppercase">
        {earningToken.symbol}{' '}
      </Text>
      <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
        {t('Earned')}
      </Text>
    </>
  )

  if (!account) {
    return (
      <ActionContainer>
        <ActionContent>
          <HarvestButtonStyled disabled>{isCompoundPool ? t('Collect') : t('Harvest')}</HarvestButtonStyled>
        </ActionContent>
      </ActionContainer>
    )
  }

  if (!userDataLoaded) {
    return (
      <ActionContainer>
        {/* <ActionTitles>{actionTitle}</ActionTitles> */}
        <ActionContent>
          <Skeleton width={180} height="32px" marginTop={14} />
        </ActionContent>
      </ActionContainer>
    )
  }

  return (
      <HarvestButtonStyled disabled={!hasEarnings} onClick={onPresentCollect}>
        {isCompoundPool ? t('Collect') : t('Harvest')}
      </HarvestButtonStyled>
  )
}

export default HarvestAction
