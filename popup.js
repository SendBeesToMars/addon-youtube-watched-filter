let slider = document.getElementById('slider');
let sliderNum = document.getElementById('sliderNum');
let filterNum = document.getElementById('filteredNum');

// gets range value from storage and sets popup range variables
chrome.storage.sync.get("range", (value) => {
    sliderNum.innerHTML = value.range;
    slider.value = value.range;
});

chrome.storage.sync.get("filtered", (value) => {
    filterNum.insertAdjacentText("beforeend", value.filtered);
});

slider.onchange = () => {
    // sets range value in global sotrage to slider value
    chrome.storage.sync.set({"range" : slider.value});
    sliderNum.innerHTML = slider.value;
};