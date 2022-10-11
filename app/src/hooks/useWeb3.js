import Web3 from 'web3'
import { ethStore } from '@stores/index'

export default function useWeb3() {
  // Define local variable for web3
  let web3 = null

  // Init web3
  const initWeb3 = () => {
    let web3Provider

    // metaMask
    // if (window.ethereum) {
    //   web3Provider = window.ethereum
    //   window.ethereum.enable()
    //   return initContract()
    // }

    web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
    web3 = new Web3(web3Provider)
    ethStore.setWeb3(web3)
    initContract()
  }

  // Init all smart contracts
  const initContract = async () => {
    try {
      // Get first account
      const accounts = await web3.eth.getAccounts()
      ethStore.setAccount(accounts[0])

      // Get current networkId
      const networkId = await web3.eth.net.getId()

      // Read all contracts json files
      // Create the instance of each contract.
      const files = import.meta.glob('../contracts/*.json')
      for (const key in files) {
        const contract = await files[key]()
        const deployedNetwork = contract.networks[networkId]
        ethStore.addContractMeta(contract.contractName, new web3.eth.Contract(contract.abi, deployedNetwork.address))
      }
    } catch (err) {
      console.error(err)
    }
  }

  initWeb3()
}
