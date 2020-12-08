


function checkVideos(){
    var watchedVideos = document.getElementsByTagName("ytd-thumbnail-overlay-resume-playback-renderer");
    if(watchedVideos.length === 0){
        return;
    }
    
    if (watchedVideos[0].closest("ytd-compact-video-renderer") == null){
        return;
    }

    let len = watchedVideos.length;

    // deletes watched videos :)
    for (let index = 0; index < len; index++) {
        // array index at 0 as remove() removes item from array
        // watchedVideos[0].closest("ytd-compact-video-renderer").remove();
        // gets the % of the video watched
        let watched_ratio = watchedVideos[0].childNodes[1].style.width.split("%")[0];
        chrome.storage.sync.get("range", (data) => {
            if (parseInt(watched_ratio) < parseInt(data.range)){
                console.log("removed :)");
            }
        });
    
    }
}

const observerConfig = { attributes: false, childList: true, subtree: true };
const sidebarObserver = new MutationObserver(checkVideos);
const sidebar = document.getElementById("secondary");


// addon does not work while traversing youtube. Addoan thinks it one page, thus the need to observer changes
function checkSidebar(){
    // if sidebar not loaded, try agian in .5s
    if(!sidebar) {
        window.setTimeout(checkSidebar, 500);
        return;
    }
    sidebarObserver.observe(sidebar, observerConfig);
}

checkSidebar();
