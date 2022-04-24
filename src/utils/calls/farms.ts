import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import getGasPrice from 'utils/getGasPrice'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const stakeFarm = async (masterChefContract, pid, amount) => {
  const gasPrice = getGasPrice()
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  if (pid === 0) {
    const tx = await masterChefContract.enterStaking(value, { ...options, gasPrice })
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx = await masterChefContract.deposit(pid, value, { ...options, gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}

export const unstakeFarm = async (masterChefContract, pid, amount) => {
  const gasPrice = getGasPrice()
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  if (pid === 0) {
    const tx = await masterChefContract.leaveStaking(value, { ...options, gasPrice })
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx = await masterChefContract.withdraw(pid, value, { ...options, gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}

export const harvestFarm = async (masterChefContract, pid) => {
  const gasPrice = getGasPrice()
  if (pid === 0) {
    const tx = await masterChefContract.leaveStaking('0', { ...options, gasPrice })
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx = await masterChefContract.deposit(pid, '0', { ...options, gasPrice })
  const receipt = await tx.wait()
  console.log(receipt)
  return receipt.status
}

// export const harvestPool = async (sousChefContract) => {
//   const gasPrice = getGasPrice()
//   const tx = await sousChefContract.deposit('0', { ...options, gasPrice })
//   const receipt = await tx.wait()
//   console.log(receipt)
//   return receipt.status
// }

// export const harvestPoolBnb = async (sousChefContract) => {
//   const gasPrice = getGasPrice()
//   const tx = await sousChefContract.deposit({ ...options, value: BIG_ZERO, gasPrice })
//   const receipt = await tx.wait()
//   return receipt.status
// }

// export const useHarvestPool = (sousId, isUsingBnb = false) => {
//   const dispatch = useAppDispatch()
//   const { account } = useWeb3React()
//   const sousChefContract = useSousChef(sousId)
//   const masterChefContract = useMasterchef()

//   const handleHarvest = useCallback(async () => {
//     if (sousId === 0) {
//       await harvestFarm(masterChefContract, 0)
//     } else if (isUsingBnb) {
//       await harvestPoolBnb(sousChefContract)
//     } else {
//       await harvestPool(sousChefContract)
//     }
//     dispatch(updateUserPendingReward(sousId, account))
//     dispatch(updateUserBalance(sousId, account))
//   }, [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId])

//   return { onReward: handleHarvest }
// }