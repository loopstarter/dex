import { Card, CardBody, Flex, Heading, Text } from '@loopstarter/special-uikit'
import { useWeb3React } from '@web3-react/core'
import { MainBackground } from 'components/Layout/MainBackground'
import PageHeader from 'components/PageHeader'
import { useTranslation } from 'contexts/Localization'
import useReferrals from 'hooks/useReferrals'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import UnlockButton from './UnlockButton'
import ReferralCardItem from './ReferralCardItem'

type Referral = {
  code: string
  totalCommissions: number
  totalReferrals: number
}

const FlexBox = styled(Flex)`
  padding: 18px 16px;
  gap: 18px;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    gap: 35px;
    padding: 50px 40px 0;
  }
`

const HeadingSpecial = styled(Heading)`
  font-family: HK Grotesk Bold;
  font-style: normal;
  color: #fff;
  padding-bottom: 5px;
  font-size: 38.068px;
  line-height: 44px;
  padding-top: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 64.5818px;
    line-height: 75px;
    padding-left: 36px;
    padding-top: 0;
  }
`

const Description = styled(Heading)`
  font-style: normal;
  font-size: 19.849px;
  line-height: 120%;
  color: #fff;
  font-size: 13px;
  line-height: 120%;
  max-width: 312px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 19.849px;
    line-height: 120%;
    max-width: 529px;
    padding-left: 36px;
  }
`

const CardReferral = styled(Card)`
  margin: 24px 16px;
  padding: 16px 22px;
  text-align: justify;
  ${({ theme }) => theme.mediaQueries.md} {
    margin: 30px 40px 0;
    padding: 44px 50px 56px;
    text-align: center;
  }
`

const Referrals: React.FC = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  const { getReferrals } = useReferrals()
  const [referrals, setReferrals] = useState<Referral>()

  useEffect(() => {
    async function getData() {
      if (account) {
        const res = await getReferrals(account)
        if (res) {
          setReferrals(res)
        }
      }
    }
    getData()
  }, [account, getReferrals])

  return (
    <MainBackground>
      <PageHeader background="linear-gradient(269.58deg, #8C18FF 25.78%, #AD00FF 88.47%)" pageName="referrals">
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <Flex flexDirection="column">
            <HeadingSpecial as="h1" scale="xxl" color="white">
              {t('Referral Program')}
            </HeadingSpecial>
            <Description scale="md" color="white">
              {t('Share the referral link below to invite your friend earn 1% of your friend’s earning Forever!')}
            </Description>
          </Flex>
        </Flex>
      </PageHeader>
      {account ? (
        <>
          <FlexBox justifyContent="center" flexDirection="column">
            <ReferralCardItem title="Total Referrals" description={`${referrals?.totalReferrals || 0}`} />
            <ReferralCardItem
              title="Total Referrals Commissons"
              description={`${referrals?.totalCommissions || 0} LOOP`}
            />
          </FlexBox>
          <FlexBox justifyContent="center" flexDirection="column" style={{ marginTop: '-15px', paddingBottom: '110px' }}>
            <ReferralCardItem title="Your Refferrals Link" link={`${window.origin}?code=${referrals?.code}`} />
          </FlexBox>
        </>
      ) : (
        <CardReferral>
          <CardBody>
            <Flex justifyContent="center" alignItems="center" flexDirection="column">
              <UnlockButton fontSize="24" width="100%" borderRadius="98px" />
              Unlock wallet to get your unique referral link
            </Flex>
          </CardBody>
        </CardReferral>
      )}
    </MainBackground>
  )
}

export default Referrals
