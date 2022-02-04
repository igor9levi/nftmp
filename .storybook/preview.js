
import '../src/styles/styles.scss'
import './preview.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    default: 'light',
    clearable: false,
    list: [
      { name: 'light', class: 'theme-light', color: '#FFFFFF' },
      { name: 'dark', class: 'theme-dark', color: '#000000' },
    ],
  },
}