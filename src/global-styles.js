import { injectGlobal } from 'styled-components';
import globalTheme from './global-theme';

injectGlobal`
  body {
    color: ${globalTheme.global.black};
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`;
