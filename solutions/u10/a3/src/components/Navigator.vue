<template>
  <div id="host" v-if="setup">
    <header>
      <h1>Header</h1>
      <menu-bar :active-index="Object.keys(content).indexOf(outerKey)"
                :menu-items="Object.keys(content).map(key => {return {route: key, label: key}})">
      </menu-bar>
    </header>
    <section id="container">
      <div id="wrapper">
        <div id="left">
          <menu-bar direction="vertical"
                    :active-index="Object.keys(content[outerKey]).indexOf(innerKey)"
                    :menu-items="Object.keys(content[outerKey]).map(key => {return {route: outerKey + '/' + key, label: key}})">
          </menu-bar>
        </div>
        <div id="content">
          {{content[outerKey][innerKey].content}}
        </div>
        <div id="right">
          <h3>References</h3>
          <a v-for="(link, i) in content[outerKey][innerKey].references" :key="i" :href="link" target="_blank">{{link}}</a>
        </div>
      </div>
    </section>
    <footer>
      <span>Footer:</span>
      <a href="#">Sitemap</a>
      <a href="#">Home</a>
      <a href="#">News</a>
      <a href="#">Contact</a>
      <a href="#">About</a>
    </footer>
  </div>
</template>

<script>
import MenuBar from "./MenuBar";
export default {
  name: 'Navigator',
  components: {MenuBar},
  props: {
    direction: String,
    menuItems: Array
  },
  data() {
    return {
      content: null,
      outerKey: null,
      innerKey: null,
      setup: false
    }
  },
  methods: {
    onStateChange() {
      if (history.state) {
        const route = history.state.route;
        const routeSplit = route.split('/');
        this.outerKey = routeSplit[0];
        this.innerKey = routeSplit[1]?routeSplit[1]:Object.keys(this.content[this.outerKey])[0];
      } else {
        this.outerKey = Object.keys(this.content)[0];
        this.innerKey = Object.keys(this.content[this.outerKey])[0];
      }
    }
  },
  created() {
    (async () => {
      this.content = await (await fetch('assets/a3_contents.json')).json();
      this.outerKey = Object.keys(this.content)[0];
      this.innerKey = Object.keys(this.content[this.outerKey])[0];
      this.setup = true;
    })();
    window.addEventListener('popstate', () => this.onStateChange());
    document.addEventListener('updateRoute', () => this.onStateChange());
  }
}
</script>

<style scoped>
#host {
  --site-border-radius: 1em;
  --header-background-color: #ba4e4f;
  --container-side-background-color: #bb7f7e;
  --container-content-background-color: #689ab7;
  --footer-background-color: #030303;
  --text-color: #fff;
}

#host {
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 16px);
}

header {
  background-color: #c14f50;
  border-top-left-radius: var(--site-border-radius);
  border-top-right-radius: var(--site-border-radius);
}

h1 {
  margin: 0;
  text-align: center;
  font-weight: normal;
}

#container {
  flex-grow: 1;
  overflow: auto;
}

#wrapper {
  width: 100%;
  min-height: 100%;
  display: flex;
}

#left, #right {
  background-color: var(--container-side-background-color);
  width: 20vw;
}

#right {
  text-align: center;
  word-break: break-all;
}

#right a {
  display: block;
}

#content {
  background-color: var(--container-content-background-color);
  width: 60vw;
}

footer {
  background-color: var(--footer-background-color);
  text-align: center;
  border-bottom-left-radius: var(--site-border-radius);
  border-bottom-right-radius: var(--site-border-radius);
  padding-bottom: 1em;
}

footer > span {
  font-size: 2em;
}

footer > a {
  color: var(--text-color);
}

footer > * {
  margin: 0px 3px;
}
</style>