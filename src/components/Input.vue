<template>
  <input :value="value"  class="px-3 py-1 rounded border focus:outline-none focus:border-blue-500"  @input="(e) => $emit('getvalue', e.target.value)" >
</template>

<script>
export default {
  props: {
    value: String,
    onGetvalue: Function
  }
}
</script>