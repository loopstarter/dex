import { Button, Flex, Heading, Text } from '@loopstarter/special-uikit'
import { useWeb3React } from '@web3-react/core'
import { TokenImage } from 'components/TokenImage'
import tokens from 'config/constants/tokens'
import { useTranslation } from 'contexts/Localization'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface Props {
  title: string
  description?: string
  link?: string
}

const ItemWrap = styled.div`
  width: 100%;
  max-width: 1200px;
  background: #2c007c80;
  backdrop-filter: blur(200px);
  border-radius: ${({ theme }) => theme.radii.default};
  overflow: hidden;
`
const CountDownBlock = styled.div`
  background: rgba(255, 54, 139, 0.8);
  height: 100%;
  padding: 16px;
  border-radius: 5px;
  width: 100%;
`
const HeaderItem = styled(Flex)`
  background: #3f09a1;
  backdrop-filter: blur(200px);
  padding: 24px;
  font-size: 19.849px;
  line-height: 23px;
`
const BodyItem = styled.div`
  background: #2c007c;
  padding: 16px 24px;
  font-size: 19.849px;
  line-height: 23px;
  padding-bottom: 24px;
`
const ButtonEnterPool = styled(Button)`
  background-color: #ffb230;
  border-radius: 10px;
  width: 100%;
  max-width: 300px;
  height: 44px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LinkText = styled(Text)`
  color: #e964ff;
  text-align: justify;
  word-break: break-all;
  ${({ theme }) => theme.mediaQueries.md} {
    text-align: center;
  }
`

const HeadingSpecial = styled(Heading)`
  font-family: HK Grotesk Bold;
  font-style: normal;
  font-size: 36px;
  line-height: 42px;
  color: #fff;
  padding-bottom: 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 57px;
    line-height: 66px;
  }
`

const StyledCopyButton = styled(Button)`
  font-weight: 600;
  font-size: 19.849px;
  line-height: 23px;

  --r: 50px; /* radius */
  --b: 3px; /* border width */

  background: linear-gradient(106.04deg, #ffc677 -44.63%, #c94fd8 92.68%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;

  border-radius: var(--r);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: var(--r);
    border: var(--b) solid transparent;
    border-radius: var(--r);
    background: inherit;
    background-origin: border-box;
    background-clip: border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    -webkit-mask-repeat: no-repeat;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 19.849px;
    line-height: 23px;
  }
`

const ReferralCardItem: React.FC<Props> = ({ description, title, link }) => {
  const { t } = useTranslation()
  // ------------ APR caculate

  return (
    <ItemWrap>
      <HeaderItem
        justifyContent="space-between"
        flexDirection={['column', null, null, 'row']}
        width="100%"
        style={{ padding: link && '12px 24px' }}
      >
        <Flex flex="1" flexDirection="row" alignItems="center" justifyContent="space-between">
          <Text fontWeight={600}>{t(title)}</Text>
          {link && <StyledCopyButton onClick={() => navigator.clipboard.writeText(link)}>Copy</StyledCopyButton>}
        </Flex>
      </HeaderItem>
      <BodyItem>
        <Flex flexDirection="column">{link ? <LinkText>{link}</LinkText> : <Text>{description}</Text>}</Flex>
      </BodyItem>
    </ItemWrap>
  )
}

export default ReferralCardItem
