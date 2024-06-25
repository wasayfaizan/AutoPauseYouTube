// Initialize a reference to the video player element on the page. 
// This assumes the page follows the standard HTML5 structure for embedding video content.
let video = document.querySelector('video');

// Register a listener for messages coming from the background script of the extension.
// This allows the content script to respond to commands sent from the background script.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Re-query the video element to ensure it's still valid (important in dynamic pages).
    const video = document.querySelector('video');

    // Check the type of action requested by the message and ensure the video element exists.
    if (request.action === "pauseVideo" && video) {
        // Pause the video if the action is to pause.
        video.pause();
        console.log('Video paused');
    } else if (request.action === "playVideo" && video) {
        // Play the video if the action is to play.
        video.play();
        console.log('Video played');
    }
});

// Add an event listener to detect when the browser window loses focus.
window.onblur = () => {
    // Check if the video is playing before pausing it.
    if (video && !video.paused) {
        video.pause();
        console.log('Video paused on window blur');
    }
};

// Listen for visibility change events on the document.
// This event is triggered when the tab is switched or when the browser minimizes.
document.addEventListener('visibilitychange', function () {
    // Re-query the video element every time there's a visibility change.
    const video = document.querySelector('video');

    // If the document becomes hidden, pause the video.
    if (document.hidden && video) {
        video.pause();
        console.log('Video paused on tab change');
    } else if (!document.hidden && video) {
        // If the document becomes visible again, play the video.
        video.play();
        console.log('Video played on tab change');
    }
});
