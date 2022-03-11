<template>
  <MenuBar :menu-items="menuItems"></MenuBar>
  <MenuBar :menu-items="menuItems" direction="vertical"></MenuBar>
</template>

<script>
import MenuBar from './components/MenuBar.vue'

export default {
  name: 'App',
  components: {
    MenuBar
  },
  data() {
    return {
      menuItems: [
        {
          route: 'test1',
          label: 'Test 1'
        },
        {
          route: 'test2',
          label: 'Test 2'
        },
        {
          route: 'test3',
          label: 'Test 3'
        }
      ]
    }
  }
}
</script>

<style>

</style>
