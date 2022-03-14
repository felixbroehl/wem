// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export default {
  title: 'WEM/Link',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    href: {control: 'text'},
    innerHTML: {control: 'text'}
  },
};

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template = ({ label, ...args }) => {
  // You can either use a function to create DOM elements or use a plain html string!
  return `<script type="module" src="https://felixbroehl.github.io/wem/components/link.js"></script><!--Because external imports in JS cannot be processed with storybook/webpack-->
    <wem-link href="${args.href}">${args.innerHTML}</wem-link>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap');
      wem-home {
          --primary-color: #09d676;
          --primary-color-rgb: 9,214,118;
          font-family: 'Rubik', sans-serif;
      }
    </style>`;
  //return createButton({ label, ...args });
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
Default.args = {
  href: '/wem/',
  innerHTML: 'Test'
};