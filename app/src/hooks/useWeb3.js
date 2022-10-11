import { ethStore } from '@stores/index'

export default function useWeb3() {
  console.log('devie:', ethStore)

  const initWeb3 = async () => {
    console.log('....')
  }

  const initContract = () => {
    console.log('...')
  }

  return { initWeb3, initContract }
}
