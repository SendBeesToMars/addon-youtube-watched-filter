
let filteredVideosNum = 0;
let filteredVideosNumInitial = 0;


chrome.storage.sync.get("filtered", (data) => {
    filteredVideosNum = data.filtered;
    filteredVideosNumInitial = data.filtered;
});

let video_index = 0;

function checkVideos(){
    var watchedVideos = document.getElementById("secondary-inner").getElementsByTagName("ytd-thumbnail-overlay-resume-playback-renderer");
    // var watchedVideos = document.getElementsByTagName("ytd-thumbnail-overlay-resume-playback-renderer");

    // if no watched videos
    if(watchedVideos.length === 0){
        return;
    }

    try {
        current_video = watchedVideos[video_index].closest("ytd-compact-video-renderer");
        video_title = current_video.querySelector("#video-title").textContent.trim();
    } catch (error) {
        // video does not exist or has been removed
        console.log(video_index);
        console.log(error);
        return;
    }

    // gets the % of the video watched
    let watched_ratio = watchedVideos[video_index].childNodes[1].style.width.split("%")[0];

    console.log("CURRENT VID: ", video_index, video_title, watched_ratio, watchedVideos[video_index]);

    // gets user selected range and checks % of video watched
    chrome.storage.sync.get("range", (data) => {
        // removes watched video if suits range
        if (parseInt(watched_ratio) <= parseInt(data.range)){
            current_video.remove();
            video_index = 0;
            filteredVideosNum++;
        }
        else{
            video_index++;
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


// run sidebar observer if sidebar present else wait
function checkSidebar(){
    sidebarObserver.disconnect();
    let sidebar = document.getElementById("secondary-inner");
    // if sidebar not loaded, try agian in .5s
    if(!sidebar) {
        window.setTimeout(checkSidebar, 500);
        return;
    }
    sidebarObserver.observe(sidebar, observerConfig);
}

function checkPathname() {
    console.log(location.pathname);
    if ('/watch' === location.pathname) {
        // resets index on new page
        video_index = 0;
        checkSidebar();
    }
}

// runs script when progress bar loading event is triggered
(document.body || document.documentElement).addEventListener('transitionend',
  function(/*TransitionEvent*/ event) {
      console.log(event.propertyName, event.target.id);
      // there is no transitioned event that can see the finished loading of the sidebar :(
    if (event.propertyName === 'transform' && event.target.id === 'progress') {
        checkPathname();
    }
}, true);

// After page load
checkPathname();

// TODO: checking transitioned events might not always work?
