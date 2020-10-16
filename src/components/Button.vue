<template>
  <button class="px-3 py-1 rounded shadow text-white focus:outline-none"
          :class="color == 'blue' ? 'bg-blue-500 hover:bg-blue-600'
                  : color == 'red' ? 'bg-red-500 hover:bg-red-600'
                  : color == 'orange' ? 'bg-orange-600 hover:bg-orange-700'
                  : color == 'green' ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-white hover:bg-gray-100'"
  >
  <slot/>
  </button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      validator(val) {
        return ['blue','red','orange','green'].includes(val)
      }
    }
  }
}
</script>