// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export default {
  title: 'WEM/CodePreview',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    src: {control: 'text'}
  },
};

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template = ({ label, ...args }) => {
  // You can either use a function to create DOM elements or use a plain html string!
  return `<script type="module" src="https://felixbroehl.github.io/wem/components/code-preview.js"></script><!--Because external imports in JS cannot be processed with storybook/webpack-->
    <code-preview src="${args.src}"></code-preview>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap');
      code-preview {
          --primary-color: #09d676;
          --primary-color-rgb: 9,214,118;
          font-family: 'Rubik', sans-serif;
      }
    </style>`;
  //return createButton({ label, ...args });
};

export const Html = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
Html.args = {
  src: 'https://felixbroehl.github.io/wem/index.html'
};

export const Js = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
Js.args = {
  src: 'https://felixbroehl.github.io/wem/components/code-preview.js'
};

export const Css = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
Css.args = {
  src: 'https://felixbroehl.github.io/wem/assets/style.css'
};

export const Json = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
Json.args = {
  src: 'https://felixbroehl.github.io/wem/assets/manifest/manifest.json'
};

export const C = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
C.args = {
  src: 'https://felixbroehl.github.io/wem/solutions/u11/a2.c'
};

export const Wat = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
Wat.args = {
  src: 'https://felixbroehl.github.io/wem/solutions/u11/a2.wat'
};

export const Vue = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
Vue.args = {
  src: 'https://felixbroehl.github.io/wem/solutions/u10/a1/src/components/TextCounter.vue'
};