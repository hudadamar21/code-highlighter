<template>
  <section class="section__list-kode">
    <h1 class="text-2xl md:text-3xl font-bold text-white mb-5">List Semua Kode</h1>
    <div class="flex flex-col md:flex-row items-start mb-5 mx-3 mb-8 md:w-1/2">
      <Select
        full
        class="mb-3 md:mb-0 md:mr-3" name="Sort By"
        :selected="selectedOptions.sortBy" 
        :options="options.sortBy" 
        @getvalue="val => changeOptions({key: 'sortBy', value: val})"
      />
      <Select 
        full
        class="mb-3 md:mb-0 md:mr-3" name="Sort"
        :selected="selectedOptions.sort" 
        :options="options.sort" 
        @getvalue="val => changeOptions({key: 'sort', value: val})"
      />
      <Select 
        full
        class="mb-3 md:mb-0 md:mr-3" name="Limit"
        :selected="selectedOptions.limit.toString()" 
        :options="options.limit" 
        @getvalue="val => changeOptions({key: 'limit', value: val})"
      />
    </div>
    <div v-if="kodelist" class="flex flex-col md:flex-row flex-wrap justify-evenly ">
      <div v-for="kode of kodelist" :key="kode.id" class="w-full md:w-1/2 mb-3 relative ">
        <button class="delete-code z-10" @click="deleteCode(kode.id)">
          delete code
        </button>
        <div class="code-box shadow-lg" v-html="kode.code"></div>
      </div>
    </div>
    <h2 v-else class="code-not-found-text" >Tidak ada kode</h2>
    <div class="flex justify-center items-center">
      <Button v-if="selectedOptions.page == 1" class="text-blue-300 cursor-default disabled" > ⬅️ </Button>
      <Button v-else color="green" @click="paginationHandler('mundur')" > ⬅️ </Button>
      <p class="text-white font-bold mx-3">{{ selectedOptions.page }}</p>  
      <Button v-if="kodelist == null" class="text-blue-300 cursor-default disabled"> ➡️ </Button>
      <Button v-else color="green" @click="paginationHandler('maju')" > ➡️ </Button>
    </div>
  </section>
</template>

<script>
import Select from '@/components/Select';
import Button from '@/components/Button';
import { mapState } from 'vuex';
export default {
  components: {
    Select,
    Button
  },
  data() {
    return {
      options: {
        sortBy: ['createdAt','fileName','lang'],
        sort: ['ASC','DESC'],
        limit: [2,4,6,8,10]
      },
      
    }
  },
  watch: {
    selectedOptions: {
      async handler() {
        await this.$store.dispatch('renderKodeList', this.selectedOptions)
      },
      deep:true
    }
  },
  computed: mapState({
    kodelist: state => state.kodelist,
    selectedOptions: state => state.selectedOptions
  }),
  async created(){
    await this.$store.dispatch('renderKodeList', this.selectedOptions)
  },
  methods: {
    changeOptions(data){
      this.$store.commit('changeOptions', data)
    },
    async deleteCode(kode_id){
      let confirm = window.confirm('yakin mau hapus kode ini ?')
      if(confirm) {
        await this.$store.dispatch('deleteCode', kode_id)
        this.$store.dispatch('renderKodeList', this.selectedOptions)
      }
    },
    paginationHandler(paginateType) {
      this.$store.commit('handlePagination', paginateType)
    }
  }
}
</script>

<style scoped lang="postcss"> 
  .absolute-center{
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .min-max-h{
    min-height: 350px;
    max-height: 350px;
  }

  .section__list-kode{
    @apply w-full text-center min-h-screen py-5 bg-gradient-to-tl from-blue-400 via-blue-500 to-blue-800
  }

  .code-box{
    @apply bg-gray-900 min-max-h rounded text-left overflow-auto m-3 p-3
  }
  .code-not-found-text{
    @apply flex justify-center items-center text-gray-200 min-max-h text-2xl m-3 p-3
  }
  .delete-code{
    @apply absolute absolute-center -mt-1 rounded bg-red-700 text-white px-2 py-1 cursor-pointer 
  }
  .delete-code:hover{
    @apply bg-red-800
  }
  
</style>