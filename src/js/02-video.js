import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const currentTimeVideo = 'videoplayer-current-time';

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(event) {
  localStorage.setItem(currentTimeVideo, event.seconds);
}

player.setCurrentTime(localStorage.getItem(currentTimeVideo) || 0);


