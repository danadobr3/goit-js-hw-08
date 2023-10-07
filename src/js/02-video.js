import Player from '@vimeo/player';

import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');

const player = new Player(iframe);

const LS_KEY = 'videoplayer-current-time';

let savedTime = localStorage.getItem(LS_KEY) || 0;

const saveCurrentTime = () => {
    player.getCurrentTime().then((seconds) => {
        savedTime = seconds;
        localStorage.setItem(LS_KEY, savedTime);
    });
};

const seekToSavedTime = () => {
    player.setCurrentTime(savedTime).then(() => {
        // Playback will start from the saved time
    }).catch((error) => {
        switch (error.name) {
            case 'RangeError':
                // The saved time was less than 0 or greater than the video's duration
                break;

            default:
                // Some other error occurred
                break;
        }
    });
};

player.on('play', () => {
    saveCurrentTime();
});
player.on('timeupdate', throttle(() => {
    saveCurrentTime();
}, 1000));

window.addEventListener('beforeunload', () => {
    saveCurrentTime();
});

window.addEventListener('load', () => {
    seekToSavedTime();
});