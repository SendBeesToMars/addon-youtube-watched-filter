
const callback = () => {
    var watchedVideos = document.getElementsByTagName("ytd-thumbnail-overlay-resume-playback-renderer");
    chrome.storage.sync.get("range", function(value){
        let range = value.range;
        // removes the up next video if watched
            // console.log(watchedVideos[0].closest("ytd-compact-video-renderer"));
            // console.log(watchedVideo[0].closest("ytd-compact-autoplay-renderer"));
        if (typeof watchedVideos[0] !== "undefined" ) {
            if (typeof watchedVideos[0].closest("ytd-compact-autoplay-renderer") !== "undefined" && watchedVideos[0].closest("ytd-compact-autoplay-renderer" !== null)) {
                // watchedVideo[0].parentElement.parentElement.parentElement.parentElement.parentElement.remove();
                // vid.remove();
                watchedVideo[0].closest("ytd-compact-autoplay-renderer").remove();
                console.log("1");
                }
            else if (typeof watchedVideos[0].closest("ytd-compact-video-renderer") !== "undefined") {
                // watchedVideo[0].parentElement.parentElement.parentElement.parentElement.remove();
                // vid.remove();
                watchedVideos[0].closest("ytd-compact-video-renderer").remove();
                console.log("2");
            }
            else {
                console.log("3");
            }
        }
    });
};


function checkNode(){
    // var recomendations = document.getElementById("secondary");
    var watchedVideos = document.getElementsByTagName("ytd-thumbnail-overlay-resume-playback-renderer");
    if(watchedVideos.length === 0){
        console.log("node not found");
        window.setTimeout(checkNode, 500);
        return;
    }
    console.log("node found");
    console.log(watchedVideos.length);
    console.log(watchedVideos);
    const config = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver(callback);
    var recomendations = document.getElementById("secondary");
    observer.observe(recomendations, config);
}

checkNode();

browser.runtime.connect().onDisconnect.addListener(function() {
    observer.disconnect();
});