let slider = document.getElementById('slider');
let sliderNum = document.getElementById('sliderNum');

// gets range value from storage and sets popup range variables
chrome.storage.sync.get("range", (value) => {
    sliderNum.innerHTML = value.range;
    slider.value = value.range;
});

slider.onchange = () => {
    // sets range value in global sotrage to slider value
    chrome.storage.sync.set({"range" : slider.value});
    sliderNum.innerHTML = slider.value;
};