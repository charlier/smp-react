import { h } from 'preact';

import VideoView from '../components/video';

const App = () => (
	<div>
		<VideoView vpid='b09hd6w6' _updateTime={_updateTime} />
	</div>
);

const _updateTime = (t) => console.log(t);

export default App;
