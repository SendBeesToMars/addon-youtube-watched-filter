
let filteredVideosNum = 0;
let filteredVideosNumInitial = 0;


chrome.storage.sync.get("filtered", (data) => {
    filteredVideosNum = data.filtered;
    filteredVideosNumInitial = data.filtered;
});

let video_index = 0;

function checkVideos(){
    var watchedVideos = document.getElementsByTagName("ytd-thumbnail-overlay-resume-playback-renderer");

    // if no watched videos
    if(watchedVideos.length === 0){
        return;
    }
    
    try {
        current_video = watchedVideos[video_index].closest("ytd-compact-video-renderer");
        video_title = current_video.querySelector("#video-title").textContent.trim();
    } catch (error) {
        // video does not exist or has been removed
        return;
    }

    // gets the % of the video watched
    let watched_ratio = watchedVideos[video_index].childNodes[1].style.width.split("%")[0];

    // gets user selected range and checks % of video watched
    chrome.storage.sync.get("range", (data) => {
        // removes watched video if suits range
        if (parseInt(watched_ratio) <= parseInt(data.range)){
            current_video.remove();
            filteredVideosNum++;
        }
        else{
            video_index++;
        }

        // resets index
        if (video_index == watchedVideos.length){
            video_index = 0;
        }
    });

    // increments filtered videos number
    if(filteredVideosNumInitial != filteredVideosNum){
        chrome.storage.sync.set({
            "filtered": filteredVideosNum
        });
        filteredVideosNumInitial = filteredVideosNum;
    }
}

const observerConfig = { attributes: false, childList: true, subtree: true };
const sidebarObserver = new MutationObserver(checkVideos);


// youtube uses a different way to load its pages thus the need to check constantly
function checkSidebar(){
    const sidebar = document.getElementById("secondary");
    // if sidebar not loaded, try agian in .5s

    if(!sidebar) {
        window.setTimeout(checkSidebar, 500);
        return;
    }
    sidebarObserver.observe(sidebar, observerConfig);
}

function afterNavigate() {
    if ('/watch' === location.pathname) {
        checkSidebar();
    }
}

// runs script when progress bar loading event is triggered
(document.body || document.documentElement).addEventListener('transitionend',
  function(/*TransitionEvent*/ event) {
      // there is no transitioned event that can see the finished loading of the sidebar :(
    if (event.propertyName === 'transform' && event.target.id === 'progress') {
        afterNavigate();
    }
}, true);

// After page load
afterNavigate();