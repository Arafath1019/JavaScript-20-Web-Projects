const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesload = 0;
let totalImages = 0;
let photosArray = [];



// Unsplash Api
const count = 10;
const apiKey = 'rL6JdncKZbGBLn5MtQQFy35quU7mAiCPYGghyiOhqJ4';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Check if all images were loaded
function imageLoaded() {
    imagesload++;
    if (imagesload === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}



// Create element for links & photosArray, add to DOM
function displayPhotos() {
    imagesload = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement("a");
        item.setAttribute("href", photo.links.html);
        item.setAttribute("target", "_blank");

        // Create <img> for photo
        const img = document.createElement("img");
        img.setAttribute("src", photo.urls.regular);
        img.setAttribute("alt", photo.alt_description);
        imt.setAttribute("title", photo.alt_description);

        // Event Listener, check when each is finished loading.button-container
        img.addEventListener("load", imageLoaded);

        // Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    }); 
} 


// Get photos from Unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch {
        console.log("Woops!! Error Occured.");
    }
}


// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On load
getPhotos();