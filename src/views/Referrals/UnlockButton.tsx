import React from 'react'
import styled from 'styled-components'
import { Button, useWalletModal } from '@loopstarter/special-uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'

const StyledButtonMenu = styled(Button)`
  width: 195px;
  height: 39px;
  background: linear-gradient(106.04deg, #ffc677 -44.63%, #c94fd8 92.68%);
  border-radius: 100px;
  font-weight: 600;
  font-size: 19.849px;
  line-height: 23px;
  padding: 8px 24px;
  margin-bottom: 21px;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 19.849px;
    line-height: 23px;
  }
`

const UnlockButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  return (
    <StyledButtonMenu onClick={onPresentConnectModal} {...props}>
      {t('Unlock Wallet')}
    </StyledButtonMenu>
  )
}

export default UnlockButton
