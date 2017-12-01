import { h, render } from 'preact';

import './style';

let root;
function init() {
	let App = require('./containers/app').default;
	root = render(<App />, document.body, root);
}

if (module.hot) {
	require('preact/devtools');
	module.hot.accept('./containers/app', () => requestAnimationFrame(init) );
}

init();
