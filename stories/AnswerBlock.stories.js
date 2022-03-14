// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export default {
  title: 'WEM/AnswerBlock',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    innerHTML: { control: 'text' },
  },
};

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template = ({ label, ...args }) => {
  // You can either use a function to create DOM elements or use a plain html string!
  return `<script type="module" src="https://felixbroehl.github.io/wem/components/answer-block.js"></script><!--Because external imports in JS cannot be processed with storybook/webpack-->
    <answer-block>${args.innerHTML}</answer-block>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap');
      answer-block {
          --primary-color: #09d676;
          --primary-color-rgb: 9,214,118;
          font-family: 'Rubik', sans-serif;
      }
    </style>`;
  //return createButton({ label, ...args });
};

export const TestContent = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
TestContent.args = {
  innerHTML: 'Testantwort\nüber\nmehrere Zeilen',
};
