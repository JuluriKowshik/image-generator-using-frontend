const accessKey = "xzFHBhbQDEzsE0dpoo-vtlnV5AWPK8Lig_EAGhuWRjU";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImage() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    results.forEach((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        // imageLink.target = "_blank";
        imageLink.href = result.links.html;
        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    });

    if (results.length > 0) {
        showMoreBtn.style.display = "block";
    } else {
        showMoreBtn.style.display = "none";
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 100;
    searchResult.innerHTML = "";
    searchImage();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImage();
});
