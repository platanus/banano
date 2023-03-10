import Theme from 'vitepress/theme';
import CodePreview from '../components/CodePreview.vue';
import './styles.css';

export default {
  ...Theme,
  enhanceApp(ctx) {
    Theme.enhanceApp(ctx);
    ctx.app.component('CodePreview', CodePreview);
  },
};
