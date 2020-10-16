<template>
  <div v-if="notification?.message" 
       class="fixed top-0 right-0 px-3 py-2 rounded shadow-lg text-white m-3 mr-3 md:mr-8 z-50 text-base md:text-lg"
       :class="notification?.mode == 'success' ? 'bg-green-500':
               notification?.mode == 'primary' ? 'bg-blue-500':
               notification?.mode == 'danger' ? 'bg-red-600':
               notification?.mode == 'warning' ? 'bg-orange-600' : 'bg-white'">
    {{ notification?.message }}
  </div>
</template>

<script>
export default {
  computed: {
    notification(){
      return this.$store.state.notification
    }
  }
}
</script>