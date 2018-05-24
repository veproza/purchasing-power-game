import { h, render } from 'preact';
import Main from './components/main';

import './sass/index.sass';

render(<Main/>, document.querySelector('#root')!);
