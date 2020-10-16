<template>
  <div class="flex flex-col items-start" 
       :class="full ? 'w-full' : ''">
    <label :for="name" class="text-gray-100">{{ name }}</label>
    <select 
        @change="getValue" 
        class="px-4 py-1 rounded border focus:border-blue-500"
        :class="full ? 'w-full' : ''">
      <option :selected="!selected" disabled>-- pilih {{ name }}--</option>
      <template v-for="option of options" :key="option">
        <option :selected="selected == option"  :value="option">{{ option }}</option>
      </template>
    </select>
  </div>
</template>

<script>
export default {
  props:{
    name: String,
    options: Array,
    selected: String,
    full: Boolean,
    onGetvalue: Function
  },
  methods: {
    getValue(e){
      this.$emit('getvalue', e.target.value)
    }
  }
}
</script>