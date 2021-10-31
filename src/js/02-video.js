import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const PLAYED_TIME = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('play', onPlay);

function onPlay() {
  player.on('timeupdate', throttle(saveCurrentTimeToStorage, 1000));
}

function saveCurrentTimeToStorage(e) {
  localStorage.setItem(PLAYED_TIME, e.seconds);
}

getCurrentTimeFromStorage();

function getCurrentTimeFromStorage() {
  const currentTime = localStorage.getItem(PLAYED_TIME);

  if (currentTime) {
    player.setCurrentTime(currentTime);
  }
}
