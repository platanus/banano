# Localization

You can customize any text in banano's components:
- For validation we use [vee-validate](https://vee-validate.logaretm.com/v4/guide/overview/), with it you can customize any validation message. We mostly use `yup` for validation rules, so you can use `useLocale` with something like [yup-locales](https://github.com/loicmahieu/yup-locales) or your custom translations object. Check out [yup's documentation on localization](https://github.com/jquense/yup#localization-and-i18n) for more information.
- You can modify other text elements, such as `BnFileInput`'s `placeholder` and `buttonText`, by using their respective props. Currently, there is no way to change these props' default values globally, so you would have to change them in a per-instance basis.
