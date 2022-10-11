import { reactive } from 'vue'

export const ethStore = reactive({
  web3: null,
  account: null,
  contracts: {},
  setWeb3(web3) {
    this.web3 = web3
  },
  setAccount(account) {
    this.account = account
  },
  addContractMeta(contractName, contractMeta) {
    this.contracts[contractName] = contractMeta
  },
})
