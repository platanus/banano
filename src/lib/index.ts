import components from '../components';

const plugin = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  install(app: any) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key as keyof typeof components]);
    });
  },
};

export default plugin;
