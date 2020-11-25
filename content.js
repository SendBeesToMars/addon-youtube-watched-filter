
const callback = () => {
    let watchedVideo = document.getElementsByTagName("ytd-thumbnail-overlay-resume-playback-renderer");
    chrome.storage.sync.get("range", function(value){
        let range = value.range;
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        // removes the up next video if watched
        console.log(watchedVideo[0].closest("ytd-compact-video-renderer"));
        if (typeof watchedVideo[0].closest("ytd-compact-autoplay-renderer") !== "undefined") {
            // watchedVideo[0].parentElement.parentElement.parentElement.parentElement.parentElement.remove();
            let vid = watchedVideo[0].closest("ytd-compact-autoplay-renderer");
            vid.remove();
            console.log("video removed1");
            }
        else {
            // watchedVideo[0].parentElement.parentElement.parentElement.parentElement.remove();
            let vid = watchedVideos[0].closest("ytd-compact-video-renderer");
            console.log("xdddddddddddd");
            console.log(vid);
            vid.remove();
            console.log("video removed2");
        }
        // removes watched videos

        // console.log(watchedVideos[1].closest("ytd-compact-video-renderer"));
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    });
};

var recomendations = document.getElementById("secondary");
const config = { attributes: true, childList: true, subtree: true };
const observer = new MutationObserver(callback);
observer.observe(recomendations, config);

// function checkNode() {
//     setTimeout(() => {
//         if (typeof document.getElementById("secondary") !== "undefined") {
//             var recomendations = document.getElementById("secondary");
//             // console.log(typeof(recomendations));
//         }
//         else {
//             checkNode();
//         }
//     }, 250);
// }

// checkNode();