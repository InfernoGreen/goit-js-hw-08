import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const LOCALSTORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(saveCurrentTime, 1000));

function saveCurrentTime() {
  player.getCurrentTime().then(time => {
    localStorage.setItem(LOCALSTORAGE_KEY, time);
  });
}

const savedTime = localStorage.getItem(LOCALSTORAGE_KEY);

if (savedTime) {
  player.setCurrentTime(savedTime);
}
