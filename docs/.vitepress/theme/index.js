import Theme from 'vitepress/theme';
import CodePreview from '../components/CodePreview.vue';
import DynamicLayout from '../components/DynamicLayout.vue';
import './styles.css';

export default {
  ...Theme,
  Layout: DynamicLayout,
  enhanceApp(ctx) {
    Theme.enhanceApp(ctx);
    ctx.app.component('CodePreview', CodePreview);
  },
};
