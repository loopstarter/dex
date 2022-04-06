import { BACKEND_URL } from 'config/constants/endpoints'
import { useCallback } from 'react'

const useReferrals = () => {
  const getReferrals = useCallback(async (address) => {
    const res = await fetch(`${BACKEND_URL}/referral${address ? `?address=${address}` : ''}`)
    if (res.ok) {
      const json = await res.json()
      return json
    }
    return null
  }, [])

  const addReferral = useCallback(async (code, referralAddress) => {
    const res = await fetch(`${BACKEND_URL}/referral`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        referralAddress,
      }),
    })
    if (res.ok) {
      const json = await res.json()
      return json
    }
    return null
  }, [])

  const registerUser = useCallback(async (address, signature) => {
    const res = await fetch(`${BACKEND_URL}/users`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        signature,
        address,
        nonce: '0',
      }),
    })
    if (res.ok) {
      const json = await res.json()
      return json
    }
    return null
  }, [])

  const getUser = useCallback(async (address) => {
    const res = await fetch(`${BACKEND_URL}/user-nonce${address ? `?address=${address}` : ''}`)
    if (res.ok) {
      const json = await res.json()
      return json
    }
    return null
  }, [])

  return {
    getReferrals,
    registerUser,
    getUser,
    addReferral,
  }
}

export default useReferrals
