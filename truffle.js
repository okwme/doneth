require('dotenv').config()

const HDWalletProvider = require('truffle-hdwallet-provider')

module.exports = {
  compilers: {
    solc: {
      version: "0.4.24",
      parser: "solcjs",
      settings: {
        // optimizer: {
        //   enabled: true,
        //   runs: 2000000
        // }
      }
    }
  },
  networks: {
    develop: {
      provider() {
        return new HDWalletProvider(
          process.env.TRUFFLE_MNEMONIC,
          'http://localhost:9545/'
        )
      },
      host: 'localhost',
      port: 7545,
      network_id: 5777
    },
    ganache: {
      provider() {
        return new HDWalletProvider(
          process.env.GANACHE_MNEMONIC,
          'http://localhost:7545'
        )
      },
      host: 'localhost',
      port: 7545,
      network_id: 5777,
      // gas: 10000000,
      // gasPrice: 1000000000
    },
    mainnet: {
      provider() {
        return new HDWalletProvider(
          process.env.MAINNET_MNEMONIC,
          'https://mainnet.infura.io/v3/' + process.env.INFURA_API_KEY,
          // using wallet at index 0 ----------------------------------------------------------------------------------------v
          0,
          10
        )
      },
      network_id: 1,
      gasPrice: 55000000000, // 55 GWEI
      gas: 6721975
    },
    kovan: {
      provider() {
        return new HDWalletProvider(
          process.env.TESTNET_MNEMONIC,
          'https://kovan.infura.io/v3/' + process.env.INFURA_API_KEY,
          // using wallet at index 0 ----------------------------------------------------------------------------------------v
          0,
          10
        )
      },
      network_id: 42
      // gas: 5561260
    },
    rinkeby: {
      skipDryRun: true,
      provider() {
        return new HDWalletProvider(
          process.env.TESTNET_MNEMONIC,
          'https://rinkeby.infura.io/v3/' + process.env.INFURA_API_KEY,
          0,
          10
        )
      },
      network_id: 4,
      // gas: 4700000,
      gasPrice: 100000000000 // 200 GWEI
    },
    ropsten: {
      provider() {
        return new HDWalletProvider(
          process.env.TESTNET_MNEMONIC,
          'https://ropsten.infura.io/v3/' + process.env.INFURA_API_KEY
        )
      },
      network_id: 2
      // gas: 4700000
    },
    sokol: {
      provider() {
        return new HDWalletProvider(
          process.env.TESTNET_MNEMONIC,
          'https://sokol.poa.network'
        )
      },
      gasPrice: 1000000000,
      network_id: 77
    },
    poa: {
      provider() {
        return new HDWalletProvider(
          process.env.TESTNET_MNEMONIC,
          'https://core.poa.network'
        )
      },
      gasPrice: 1000000000,
      network_id: 99
    }
  }
}
