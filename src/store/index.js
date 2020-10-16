import { createStore } from 'vuex'
import {URL_API} from '@/constans';
import axios from 'axios';
import { saveAs } from 'file-saver';

export default createStore({
  state: {
    user: {},
    notification: {
      message: '',
      mode: ''
    },
    kodelist: [],
    loading: false,
    headerAPI: {
      headers: {'Content-Type': 'application/json'},
    },
    selectedOptions: {
      sortBy: 'createdAt',
      sort: 'DESC',
      limit: 2,
      page: 1,
    },
  },
  mutations: {
    getNotif(state, message ){
      state.notification = message
    },
    getUserData(state, data){
      state.user = data
    },
    getKodelist(state, data) {
      state.kodelist = data
    },
    isLoading(state, data) {
      state.loading = data
    },
    changeOptions(state, data) {
      state.selectedOptions[data.key] = data.value
      if(data.key == 'limit') {
        state.selectedOptions.page = 1
      }
    },
    handlePagination(state, paginateType) {
      if(paginateType == 'mundur') {
        if(state.selectedOptions.page == 1) {
          return null
        } else {
          state.selectedOptions.page -= 1
        }
      }
      if(paginateType == 'maju') {
        if(state.kodelist == null) {
          return null
        } else {
          state.selectedOptions.page += 1
        }
      }
    }
  },
  actions: {
    async authUser({commit, dispatch}, {name, type}){
      commit('isLoading', true)
      await axios.post(URL_API+`/user/${type}/`, {name}, this.headerAPI).then(res => {
        if(res.data.data && res.data.success) {
          const data = res.data.data
          commit('getUserData', data)
          localStorage.setItem('user', JSON.stringify(data))
          let notif = type == 'login' ? `${data.name} berhasil login` : `${data.name} berhasil didaftarkan`
          dispatch('showNotification', {message: notif, mode: 'success'})
        } else {
          dispatch('showNotification', {message: res.data.message, mode: 'danger'})
        }
      }).catch((err) => {
        dispatch('showNotification', {message: err.message , mode: 'danger'})
      })
      commit('isLoading', false)
    },

    async getLangs(){
      const {data} = await axios.get(URL_API+'/options')
      return data.data.languages
    },

    async hasilkanKode({commit, dispatch},{code, lang, fileName,  highlight}){
      try{
        commit('isLoading', true)
        const parameter = `?lang=${lang}&fileName=${fileName || 'example_code'}${highlight ? `&highlight=${highlight}` : ''}`
        const {data} = await axios.post(URL_API+parameter, { code : code }, this.headerAPI)
        commit('isLoading', false)
        return data.data
      } catch(err) {
        dispatch('showNotification', {message: err.message, mode: 'danger'})
      }
    },

    async simpanKode({state, commit, dispatch},data){
      try {
        commit('isLoading', true)
        await axios.post(URL_API+'/code/store', data, this.headerAPI)
        dispatch('renderKodeList', state.selectedOptions)
        commit('isLoading', false)
        dispatch('showNotification', {message:'kode berhasil disimpan', mode: 'success'})
      } catch(err) {
        dispatch('showNotification', {message: err.message, mode: 'danger'})
      }
    },

    async downloadCode({commit, dispatch}, data) {
      const {code, lang, fileName, highlight} = data
      try{
        commit('isLoading', true)

        const url = `${URL_API}?lang=${lang}&fileName=${fileName || 'example_code'}${highlight ? `&highlight=${highlight}` : ''}&download=1`
        console.log(url)
        await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({code: code})
        })
          .then(_ => _.ok ? _.blob() : null)
          .then(blob => blob ? saveAs(blob, `${fileName}.png`) : null)

        commit('getNotif', 'ini kode baru')
        commit('isLoading', false)

      } catch(err) {
        dispatch('showNotification', {message: err.message, mode: 'danger'})
      } 
    },

    async renderKodeList({state, commit, dispatch}, options){
      try{
        commit('isLoading', true)
        const params = `?sortBy=${options?.sortBy || 'createdAt'}&sort=${options?.sort || 'ASC'}&page=${options?.page || 1}&limit=${options?.limit || 2}`
        const {data} = await axios.post(URL_API+`/code/list${params || ''}`, {user: state.user.id}, this.headerAPI)
        commit('getKodelist', data.data)
        commit('isLoading', false)
      } catch(err) {
        dispatch('showNotification', {message: err, mode: 'success'})
      }
    },

    deleteCode({state, commit, dispatch}, kode_id){
      commit('isLoading', true)
      axios.post(URL_API+'/code/delete', {id: kode_id, user: state.user.id})
        .then(res => {
          if(res.data.success) {
            dispatch('showNotification', {message:'kode berhasil dihapus', mode: 'success'})
            dispatch('renderKodeList', state.selectedOptions)
          }
        })
        .catch(err => {
          dispatch('showNotification', {message:err, mode: 'success'})
        })
      commit('isLoading', false)
    },
    showNotification({commit}, {message, mode}){
      commit('getNotif', {message: message,mode: mode})
      setTimeout(() => {
        commit('getNotif', {})
      }, 3000);
    }
  },  
  modules: {
  }
})
