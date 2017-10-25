import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Contract from '@/components/Contract'
import DonateButton from '@/components/DonateButton'
import DonateWidget from '@/components/DonateWidget'
import Deploy from '@/components/Deploy'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/deploy',
      name: 'Deploy',
      component: Deploy
    },
    {
      path: '/:address',
      name: 'Contract',
      component: Contract,
      props: true
    },
    {
      path: '/:address/donate-button',
      name: 'DonateButton',
      component: DonateButton,
      props: true
    },
    {
      path: '/:address/donate-button-small',
      name: 'DonateButton',
      component: DonateButton,
      props: true
    },
    {
      path: '/:address/donate-button/:btntitle',
      name: 'DonateButton',
      component: DonateButton,
      props: true
    },
    {
      path: '/:address/donate-widget/:btntitle',
      name: 'DonateWidget',
      component: DonateWidget,
      props: true
    }
  ]
})
