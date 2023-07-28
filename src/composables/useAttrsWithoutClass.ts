import { useAttrs } from 'vue';

export default function useAttrsWithoutClass() {
  const attrs = useAttrs();
  const attrsWithoutClass = Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));

  return { attrClass: attrs.class, attrsWithoutClass };
}
