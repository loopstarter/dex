import { ResetCSS } from '@loopstarter/special-uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { DatePickerPortal } from 'components/DatePicker'
import useEagerConnect from 'hooks/useEagerConnect'
import useScrollOnRouteChange from 'hooks/useScrollOnRouteChange'
import useUserAgent from 'hooks/useUserAgent'
import React, { lazy, useEffect, useState } from 'react'
import { Route, Router, Switch, Redirect } from 'react-router-dom'
import { usePollBlockNumber } from 'state/block/hooks'
import { usePollCoreFarmData } from 'state/farms/hooks'
import { useFetchProfile } from 'state/profile/hooks'
import useWeb3Provider from 'hooks/useActiveWeb3React'
import { signMessage } from 'utils/web3React'
import { SIGN_MGS } from 'config/constants/endpoints'
import useReferrals from 'hooks/useReferrals'
import EasterEgg from './components/EasterEgg'
import GlobalCheckClaimStatus from './components/GlobalCheckClaimStatus'
import PageLoader from './components/Loader/PageLoader'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import { ToastListener } from './contexts/ToastsContext'
import { useInactiveListener } from './hooks/useInactiveListener'
import history from './routerHistory'
import GlobalStyle from './style/Global'
import DetailSpecialPool from './views/DetailSpecialPool'
// Views included in the main bundle
import Pools from './views/Pools'
import Farms from './views/DefiFarms'
import SpecialPools from './views/SpecialPools'
import Referrals from './views/Referrals'
import CommingSoon from './views/CommingSoon'
import { RedirectPathToSwapOnly, RedirectToSwap, RedirectToSwapWithPairs } from './views/Swap/redirects'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity,
} from './views/AddLiquidity/redirects'
import RedirectOldRemoveLiquidityPathStructure from './views/RemoveLiquidity/redirects'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Swap = lazy(() => import('./views/Swap'))
const Home = lazy(() => import('./views/Home'))
const FarmAuction = lazy(() => import('./views/FarmAuction'))
const Lottery = lazy(() => import('./views/Lottery'))
const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
const Teams = lazy(() => import('./views/Teams'))
const Team = lazy(() => import('./views/Teams/Team'))
const TradingCompetition = lazy(() => import('./views/TradingCompetition'))
const Predictions = lazy(() => import('./views/Predictions'))
const PredictionsLeaderboard = lazy(() => import('./views/Predictions/Leaderboard'))
const Voting = lazy(() => import('./views/Voting'))
const Proposal = lazy(() => import('./views/Voting/Proposal'))
const CreateProposal = lazy(() => import('./views/Voting/CreateProposal'))
const AddLiquidity = lazy(() => import('./views/AddLiquidity'))
const Liquidity = lazy(() => import('./views/Pool'))
const PoolFinder = lazy(() => import('./views/PoolFinder'))
const RemoveLiquidity = lazy(() => import('./views/RemoveLiquidity'))
const Info = lazy(() => import('./views/Info'))
const NftMarket = lazy(() => import('./views/Nft/market'))
const ProfileCreation = lazy(() => import('./views/ProfileCreation'))
const PancakeSquad = lazy(() => import('./views/PancakeSquad'))
const Instantly = lazy(() => import('./views/Instantly'))

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const { account } = useWeb3React()
  const { library } = useWeb3Provider()

  usePollBlockNumber()
  useEagerConnect()
  useFetchProfile()
  usePollCoreFarmData()
  useScrollOnRouteChange()
  useUserAgent()
  useInactiveListener()

  useEffect(() => {
    async function getData() {
      const code = new URLSearchParams(window.location.search).get('code')
      const savedCode = localStorage.getItem('code')
      if (code && code !== account && !savedCode) {
        localStorage.setItem('code', code)
      }
    }
    getData()
  }, [account])

  const [mounted, setMounted] = useState<boolean>(false)
  const [oldAccount, setOldAccount] = useState<string>('')
  const { registerUser, getUser, addReferral } = useReferrals()

  useEffect(() => {
    setTimeout(() => {
      setMounted(true)
    }, 1000)
  }, [])

  useEffect(() => {
    if (mounted) {
      setOldAccount(account)
    }
  }, [account, mounted])

  useEffect(() => {
    async function getData() {
      try {
        if (account && mounted && oldAccount !== '' && account !== oldAccount) {
          const user = await getUser(account)
          if (!user) {
            const signature = await signMessage(library, account, `${SIGN_MGS} 0`)
            if (signature) {
              registerUser(account, signature)
              const savedCode = localStorage.getItem('code')
              if (savedCode) {
                addReferral(savedCode, account)
                localStorage.removeItem('code')
              }
            }
          }
        }
        // eslint-disable-next-line no-empty
      } catch (error) {}
    }
    getData()
  }, [account, addReferral, getUser, library, mounted, oldAccount, registerUser])

  // useEffect(() => {
  //   async function getData() {
  //     const registeringAccount = localStorage.getItem('registeringAccount')
  //     if (registeringAccount) {
  //       localStorage.removeItem('registeringAccount')
  //     }
  //   }
  //   getData()
  // }, [])

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <GlobalCheckClaimStatus excludeLocations={[]} />
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact component={Swap}>
              {/* <Swap /> */}
              {/* <Home /> */}
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/pools">
              <Pools />
            </Route>
            <Route exact strict path="/swap" component={Swap} />
            <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
            <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
            <Route exact strict path="/swap/:inputCurrency/:outputCurrency" component={RedirectToSwapWithPairs} />
            <Route path="/rocket" exact>
              <CommingSoon />
            </Route>
            <Route path="/nft" exact>
              <CommingSoon />
            </Route>
            <Route path="/lottery" exact>
              <CommingSoon />
            </Route>
            <Route path="/spool" exact>
              <SpecialPools />
            </Route>
            <Route path="/refferals" exact>
              <Referrals />
            </Route>
            <Route exact strict path="/liquidity" component={Liquidity} />
            <Route exact strict path="/create" component={RedirectToAddLiquidity} />
            <Route exact path="/add" component={AddLiquidity} />
            <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact strict path="/find" component={PoolFinder} />
            <Route exact path="/create" component={AddLiquidity} />
            <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
            <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
            <Route exact strict path="/spool/:groupPool" component={DetailSpecialPool} />
            {/* Redirect */}
            <Route path="/pool">
              <Redirect to="/liquidity" />
            </Route>
            <Route path="/staking">
              <Redirect to="/pools" />
            </Route>
            <Route path="/syrup">
              <Redirect to="/pools" />
            </Route>
            <Route path="/collectibles">
              <Redirect to="/nfts" />
            </Route>
            <Route exact strict path="/changelly" component={Instantly} />
            {/* <Route path="/profile">
              <Redirect to={`${nftsBaseUrl}/profile/${account?.toLowerCase() || ''}`} />
            </Route> */}
            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      <EasterEgg iterations={2} />
      <ToastListener />
      <DatePickerPortal />
    </Router>
  )
}

export default React.memo(App)
