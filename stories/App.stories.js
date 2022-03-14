// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export default {
  title: 'WEM/App',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
  },
};

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template = ({ label, ...args }) => {
  // You can either use a function to create DOM elements or use a plain html string!
  return `<script type="module" src="https://felixbroehl.github.io/wem/components/app.js"></script><!--Because external imports in JS cannot be processed with storybook/webpack-->
    <wem-app></wem-app>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap');
    
        wem-app {
            --primary-color: #09d676;
            --primary-color-rgb: 9,214,118;
            --secondary-color: #b0d609;
            --link-color: #055831;
            background-color: var(--primary-color);
            font-family: 'Rubik', sans-serif;
            margin: 0;
            background-color: var(--primary-color);
            display: block;
        }
    </style>`;
  //return createButton({ label, ...args });
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
Default.args = {
};
