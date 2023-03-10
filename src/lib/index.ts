import Btn from '../components/Btn/Btn.vue';

const plugin = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  install(app: any) {
    app.component('BnBtn', Btn);
  },
};

export default plugin;
export { Btn };
