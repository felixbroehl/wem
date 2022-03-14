// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export default {
  title: 'WEM/RunCode',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    htmlSrc: {control: 'text'},
    jsSrc: {control: 'text'},
    cssSrc: {control: 'text'},
    size: {control: 'radio', options: ['small', 'middle', 'large'],},
    jsType: {control: 'radio', options: [undefined, 'module'],},
    hideCode: {control: 'radio', options: ['true', 'false']},
  },
};

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template = ({ label, ...args }) => {
  // You can either use a function to create DOM elements or use a plain html string!
  return `<script type="module" src="https://felixbroehl.github.io/wem/components/code-preview.js"></script><!--Because external imports in JS cannot be processed with storybook/webpack-->
    <script type="module" src="https://felixbroehl.github.io/wem/components/run-code.js"></script><!--Because external imports in JS cannot be processed with storybook/webpack-->
    <run-code ${args.htmlSrc?'htmlSrc="' + args.htmlSrc + '"':''} ${args.jsSrc?'jsSrc="' + args.jsSrc + '"':''} ${args.cssSrc?'cssSrc="' + args.cssSrc + '"':''} ${args.size?'size="' + args.size + '"':''} ${args.jsType?'jsType="' + args.jsType + '"':''} ${args.hideCode?'hideCode="' + args.hideCode + '"':''}></run-code>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap');
      run-code {
          --primary-color: #09d676;
          --primary-color-rgb: 9,214,118;
          font-family: 'Rubik', sans-serif;
      }
    </style>`;
  //return createButton({ label, ...args });
};

export const WithAll = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
WithAll.args = {
  htmlSrc: 'https://felixbroehl.github.io/wem/solutions/u6/a1.html',
  jsSrc: 'https://felixbroehl.github.io/wem/solutions/u6/a1.js',
  cssSrc: 'https://felixbroehl.github.io/wem/solutions/u6/a1.css',
  size: 'large',
  jsType: undefined,
  hideCode: 'false',
};
export const OnlyJS = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
OnlyJS.args = {
  htmlSrc: undefined,
  jsSrc: 'https://felixbroehl.github.io/wem/solutions/u3/a1-12.js',
  cssSrc: undefined,
  size: undefined,
  jsType: undefined,
  hideCode: 'false',
};
export const TypeModule = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
TypeModule.args = {
  htmlSrc: 'https://felixbroehl.github.io/wem/solutions/u8/a2.html',
  jsSrc: 'https://felixbroehl.github.io/wem/solutions/u8/a2.js',
  cssSrc: 'https://felixbroehl.github.io/wem/solutions/u8/a2.css',
  size: undefined,
  jsType: 'module',
  hideCode: 'false',
};
export const HideCode = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
HideCode.args = {
  htmlSrc: undefined,
  jsSrc: 'https://felixbroehl.github.io/wem/solutions/u3/a1-12.js',
  cssSrc: undefined,
  size: undefined,
  jsType: undefined,
  hideCode: 'true',
};