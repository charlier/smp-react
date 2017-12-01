import { h } from 'preact';

import Component from '../../utils/pureComponent';
import Bump from '../../utils/bump';
import style from './style.scss';

export default class VideoItem extends Component {

	componentDidMount() {
		const { vpid, _updateTime } = this.props;
		Bump.load().then($ => {
			const settings = {
				product: 'iplayer',
				responsive: true,
				autoplay: true,
				playlistObject: {
					title: "Buried in a Blizzard",
					holdingImageURL: "http://ichef.bbci.co.uk/programmeimages/p01sh0qm/b03x16hc_640_360.jpg",
					items: [{
						vpid
					}]
				}
			};
			const mediaPlayer = $('#mediaPlayer').player(settings);
			window.mediaPlayer = mediaPlayer;
			mediaPlayer.load()
			mediaPlayer.bind('timeupdate', (t) => _updateTime(t))
			mediaPlayer.bind('playlistEnded', () => mediaPlayer.play())
		});
	}

	render() {
		return (
			<div class={style.wrap}>
				<div class={style.layout}>
					<div class={style.item}>
						<div class={style.video}>
							<div class={style.player} id='mediaPlayer'></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
