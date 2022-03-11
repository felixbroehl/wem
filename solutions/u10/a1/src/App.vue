<template>
  <TextCounter/>
  <TextCounter/>
</template>

<script>
import TextCounter from './components/TextCounter.vue'

export default {
  name: 'App',
  components: {
    TextCounter
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap');

  body {
    font-family: 'Rubik', sans-serif;
  }
</style>
