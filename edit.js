document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("addBookmark");
    const exportButton = document.getElementById("exportButton");
    const importButton = document.getElementById("importButton");

    addButton.addEventListener("click", addBookmark);
    exportButton.addEventListener("click", exportData);
    importButton.addEventListener("click", importData);

    // Load existing data from localStorage (if any)
    loadBookmarks();
});

let bookmarksData = [];

function loadBookmarks() {
    const storedData = localStorage.getItem("bookmarksData");
    if (storedData) {
        bookmarksData = JSON.parse(storedData);
        updateJsonOutput();
    }
}

function saveBookmarks() {
    localStorage.setItem("bookmarksData", JSON.stringify(bookmarksData));
}

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
        saveBookmarks(); // Save to localStorage
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

function exportData() {
    const jsonOutput = document.getElementById("jsonOutput");
    const compressedKey = btoa(jsonOutput.value);
    alert("Exported Key: " + compressedKey);
}

function importData() {
    const keyInput = prompt("Paste the exported key here:");
    if (keyInput) {
        try {
            const jsonData = atob(keyInput);
            bookmarksData = JSON.parse(jsonData);
            updateJsonOutput();
            saveBookmarks(); // Save imported data to localStorage
        } catch (error) {
            console.error("Error importing data:", error);
            alert("Invalid key. Please make sure the key is correct.");
        }
    }
}
