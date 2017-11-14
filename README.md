# Ethereal Hackathon
[Doneth](https:/doneth.org) is the [winner](https://devpost.com/software/doneth) of the 2017 [Ethereal Hackathon](https://etherealsummit.com/hackathon/) built by [Billy Rennekamp](https://github.com/okwme), [Trevor Clarke](https://github.com/TrevorJTClarke) and [Tim Wu](https://github.com/defactoknife)

Further contract code can be seen at https://github.com/defactoknife/doneth-truffle

# Doneth
Doneth makes donations easy for projects with multiple contributors by providing a joint account. Our decentralized app allows anyone to deploy their own Doneth contract and customize it to their specific needs. Governance is percentage based and dictated by user roles. Use Doneth to allow contributors to withdraw their shares directly.

# Problem
Shared bank accounts and third party fund services (PayPal, Square) all have high fees, centralized management and limited access. There’s no solution for simple shared accounting that manages participant withdraw limits.

# Protocol
Users are able to cheaply deploy their own shared account on the Ethereum blockchain. A project owner can manage who has access to what percentage with the rules set in the Smart Contract. This is a clean and simple solution to manage and automate shared assets.

# Usecases
### Open Source Projects
A Team builds an open source project for a hackathon, the project proves itself useful and people want to donate in appreciation. Since the developers are all part of a Doneth Smart Contract, they are immediately able to withdraw their share of the donations without affecting other portions.

### Family Allowances
Teach kids finance and let them start to manage their own assets. Easily setup a shared wallet and allow each child to withdraw their allowance.

### Trust Fund
Fill a contract with a trust fund and limit the ability to withdraw to specific parties at specific increments.


## Truffle Setup
``` bash
# make sure you're using node >= v7.6

# install truffle
npm install -g truffle

# compile truffle
truffle compile

# test truffle
truffle develop
truffle(develop)> test test/doneth_tests.js
````


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

