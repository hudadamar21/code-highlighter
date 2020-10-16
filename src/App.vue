<template>
  <Notif/>
  <Loading />
  <Main v-if="username" />
  <Auth v-else />
</template>

<script>
import Auth from '@/views/Auth.vue'
import Main from '@/views/Main.vue';

import Loading from '@/components/Loading';
import Notif from '@/components/Notif';

export default {
  components: {
    Auth,
    Main,
    Loading,
    Notif
  },
  data(){
    return {
      langs: [],
      selectedLang: '',
      code: '',
      resultCode: '',
      name: ''
    }
  },
  computed: {
    username(){
      return this.$store.state.user?.name
    }
  },
  created(){
    if(!this.$store.state.user?.name) {
      const user = JSON.parse(localStorage.getItem('user'))
      this.$store.commit('getUserData', user)
    }
  }            
}
</script>
