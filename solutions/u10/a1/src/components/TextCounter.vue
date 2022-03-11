<template>
  <div id="wrap">
    <textarea placeholder="Hier Text eingeben" @input="event => updateStats(event.target.value)"></textarea>
    <div id="wrapper">
      <div>Länge: <input v-model="length" readonly /></div>
      <div>Leerzeichen: <input v-model="spaces" readonly/></div>
      <div>Wörter: <input v-model="words" readonly/></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TextCounter',
    data() {
      return {
        length: 0,
        spaces: 0,
        words: 0,
        updateStats: (text) => {
          this.length = text.length;
          this.spaces = (text.match(/ /g) || []).length;
          this.words = text.trim().split(/\s+/).length;
        }
      }
    }
  };
</script>

<style scoped>
  textarea {
    width: 100%;
    height: 150px;
  }

  input, textarea {
    font-family: 'Rubik', sans-serif;
  }

  #wrap {
    border: 1px solid #000;
    border-radius: 1em;
    padding: 1em;
    margin-bottom: 1em;
    background-color: #eeeeee;
  }

  #wrapper {
    display: flex;
    justify-content: space-between;
  }
</style>