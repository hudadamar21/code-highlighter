<template>
  <div class="mt-0 flex justify-start md:justify-center items-center w-full border-b-2 pb-3 px-4 relative mb-4">
    <h3 class="text-gray-200 invisible md:visible absolute left-0 ml-3">Hallo, {{ username }}</h3>
    <h1 class="text-white font-bold text-lg md:text-3xl"><span class="text-blue-200">CODE</span> HIGHLIGHTER</h1>
    <Button class="absolute right-0 mr-3" color="red" @click="logout">Logout</Button>
  </div>
</template>

<script>
import Button from '@/components/Button';
export default {
  components: {
    Button
  },
  computed: {
    username(){
      return this.$store.state.user.name
    }
  },
  methods: {
    logout(){
      let confirm = window.confirm('apakah mau logout?')
      if(confirm) {
        this.$store.commit('getUserData', {})
        localStorage.removeItem('user')
      }
    }
  }
}
</script>