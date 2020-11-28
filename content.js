

let flag = false;
function checkNode(){
    var watchedVideos = document.getElementsByTagName("ytd-thumbnail-overlay-resume-playback-renderer");
    if(watchedVideos.length === 0){
        // sleeps for 1s if node not found
        window.setTimeout(checkNode, 1000);
        return;
    }

    let len = watchedVideos.length;

    // deletes watched videos :)
    for (let index = 0; index < len; index++) {
        // array is always at 0 as remove() removes item from array
        watchedVideos[0].closest("ytd-compact-video-renderer").remove();
 
    }
    // checks again after 2.5s
    if (!flag) {
        flag = true;
        window.setTimeout(checkNode, 2500);
    }
}

checkNode();
