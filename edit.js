document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("addBookmark");
    const copyButton = document.getElementById("copyButton");

    addButton.addEventListener("click", addBookmark);
    copyButton.addEventListener("click", copyJSON);
});

let bookmarksData = [];

function addBookmark() {
    const titleInput = document.getElementById("title");
    const urlInput = document.getElementById("url");
    const iconInput = document.getElementById("icon");

    const title = titleInput.value;
    const url = urlInput.value;
    const icon = iconInput.value;

    if (title && url && icon) {
        const newBookmark = {
            title: title,
            url: url,
            icon: icon
        };

        bookmarksData.push(newBookmark);
        updateJsonOutput();
        clearInputs();
    } else {
        console.log("Please fill in all fields.");
    }
}

function updateJsonOutput() {
    const jsonOutput = document.getElementById("jsonOutput");
    const jsonData = JSON.stringify(bookmarksData, null, 2);
    jsonOutput.value = jsonData;
}

function clearInputs() {
    const titleInput = document.getElementById("title");
    const urlInput = document.getElementById("url");
    const iconInput = document.getElementById("icon");

    titleInput.value = "";
    urlInput.value = "";
    iconInput.value = "";
}

function copyJSON() {
    const jsonOutput = document.getElementById("jsonOutput");
    jsonOutput.select();
    document.execCommand("copy");
}
