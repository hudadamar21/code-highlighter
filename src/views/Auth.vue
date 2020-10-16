<template>
  <div class="overflow-hidden h-screen w-screen flex flex-col justify-center items-center relative">

    <div class="bg-gradient-to-tl from-blue-700 via-blue-800 to-gray-900 w-full h-full flex flex-col justify-center items-center transition-transform duration-100"
         :class="isDaftar ? 'transform -translate-x-20' : ''"
    >
    <div class="fixed top-0 my-3 text-center">
      <h1 class=" text-white font-bold text-2xl md:text-4xl border-b-2"><span class="text-blue-200">CODE</span> HIGHLIGHTER</h1>
      <a href="https://github.com/hudadamar21/code-highlighter" target="_blank" class="text-gray-400 text-sm hover:text-blue-300">https://github.com/hudadamar21/code-highlighter</a>
    </div>
      <h1 class="text-white text-2xl md:text-4xl mb-3">
        Apa Username kamu ?
      </h1>
      <form @submit.prevent="Login" class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-3 md:px-0 text-center">
        <Input @getvalue="(val) => usernameLogin = val" class="w-full h-12 md:h-16 text-lg" placeholder="masukan username anda yang telah terdaftar"/>
        <Button color="blue" class="m-3 px-6 py-2 text-base md:text-xl" type="submit">Login</Button>
      </form>
      <p class="text-white">belum punya akun ? <span @click="isDaftar = true" class="text-green-400 hover:text-green-500 cursor-pointer font-bold text-md">Daftar</span> </p>
    </div>

    <div class="bg-white  transition-transform transform duration-100 shadow-lg absolute right-0 top-0 w-full md:w-1/3" :class="isDaftar ? '' : 'translate-x-full'">
      <div class="close bg-red-500 hover:bg-red-600 text-white rounded-r px-2 py-1 cursor-pointer"
            @click="closeDaftar">
        close
      </div>
      <form @submit.prevent="Register" class="flex flex-col justify-center items-center h-screen">
        <label for="register" class="text-gray-700 font-semibold text-xl">Register</label>
        <Input @getvalue="(val) => usernameDaftar = val" placeholder="username anda.." id="register" class="my-3 w-1/2"/>
        <Button color="green" type="submit">Register</Button>
      </form>
    </div>
  </div>
</template>

<script>
import Input from '@/components/Input';
import Button from '@/components/Button';
export default {
  title: 'Code Highlighter - Login',
  components: {
    Input,
    Button
  },
  data(){
    return {
      isDaftar: false,
      usernameLogin: '',
      usernameDaftar: ''
    }
  },
  methods: {
    Login() {
      if(this.usernameLogin){
        this.$store.dispatch('authUser', {name: this.usernameLogin, type: 'login'})
      } else {
        this.$store.dispatch('showNotification', {message: 'Username is required', mode: 'danger'})
      }
    },
    Register(){
      if(this.usernameDaftar){
        this.$store.dispatch('authUser', {name: this.usernameDaftar, type: 'register'})
      } else {
        this.$store.dispatch('showNotification', {message: 'Username is required', mode: 'danger'})
      }
    },
    closeDaftar(){
      this.isDaftar = false
    }
  }
}
</script>

<style>
  .close{
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
</style>