
let filteredVideosNum = 0;
let filteredVideosNumInitial = 0;


chrome.storage.sync.get("filtered", (data) => {
    filteredVideosNum = data.filtered;
    filteredVideosNumInitial = data.filtered;
    
});

function checkVideos(){
    var watchedVideos = document.getElementsByTagName("ytd-thumbnail-overlay-resume-playback-renderer");
    if(watchedVideos.length === 0){
        return;
    }
    
    if (watchedVideos[0].closest("ytd-compact-video-renderer") == null){
        return;
    }

    let len = watchedVideos.length;
    console.log(len);

    // deletes watched videos :)
    let index = 0;

    for (let i = 0; i < len; i++) {
        // gets the % of the video watched
        let watched_ratio = watchedVideos[index].childNodes[1].style.width.split("%")[0];
        chrome.storage.sync.get("range", (data) => {
            console.log("index " + watched_ratio + "   " + data.range);
            if (parseInt(watched_ratio) <= parseInt(data.range)){
                console.log("3");
                // array index at 0 as remove() removes item from array
                watchedVideos[index].closest("ytd-compact-video-renderer").remove();
                filteredVideosNum++;
            }
            else{
                index++;
            }
        });
    }
    if(filteredVideosNumInitial != filteredVideosNum){
        chrome.storage.sync.set({
            "filtered": filteredVideosNum
        });
        filteredVideosNumInitial = filteredVideosNum;
    }
}

const observerConfig = { attributes: false, childList: true, subtree: true };
const sidebarObserver = new MutationObserver(checkVideos);


// addon does not work while traversing youtube. Addoan thinks it one page, thus the need to observer changes
function checkSidebar(){
    const sidebar = document.getElementById("secondary");
    // if sidebar not loaded, try agian in .5s
    if(!sidebar) {
        window.setTimeout(checkSidebar, 500);
        console.log("sidebar not loaded.. waiting...");
        return;
    }
    sidebarObserver.observe(sidebar, observerConfig);
}

function afterNavigate() {
    if ('/watch' === location.pathname) {
        checkSidebar();
    }
}

(document.body || document.documentElement).addEventListener('transitionend',
  function(/*TransitionEvent*/ event) {
    if (event.propertyName === 'width' && event.target.id === 'progress') {
        afterNavigate();
    }
}, true);

// After page load
afterNavigate();