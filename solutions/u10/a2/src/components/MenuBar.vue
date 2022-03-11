<template>
  <nav :class="direction==='vertical' ? 'vertical' : 'horizontal'">
    <a href="#" v-for="(item, i) in menuItems" :key="i" @click="e => open(e, item, i)" :class="activeIndex === i ? 'active': ''">{{item.label}}</a>
  </nav>
</template>

<script>
export default {
  name: 'MenuBar',
  props: {
    direction: String,
    menuItems: Array
  },
  data() {
    return {
      activeIndex: 0
    }
  },
  methods: {
    open(event, item, i) {
      event.preventDefault();
      this.activeIndex = i;
      /*history.pushState({
        route: item.route
      }, item.route, "#");*/
      document.dispatchEvent(new CustomEvent('updateRoute', {
        route: item.route
      }));
    }
  }
}
</script>

<style scoped>
nav {
  margin: 0px 8px 8px;
}

nav > a {
  color: #000;
  text-decoration: none;
  background-color: #686d99;
  padding: 3px 30px;
  border-radius: 1em;
  border: 3px solid;
  --left-half-border: #eee;
  --right-half-border: #939999;
  border-color:
      var(--left-half-border)
      var(--right-half-border)
      var(--right-half-border)
      var(--left-half-border);
  font-weight: bold;
  font-family: Arial;
  font-size: 14px;
  display: inline-block;
  margin: 0px 8px 8px;
}

nav > a.active {
  background-color: #d9d4d2;
}

nav.vertical {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>