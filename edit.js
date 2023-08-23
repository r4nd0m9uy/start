document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("addBookmark");
    const exportButton = document.getElementById("exportButton");
    const importButton = document.getElementById("importButton");
    const copyKeyButton = document.getElementById("copyKeyButton");

    addButton.addEventListener("click", addBookmark);
    exportButton.addEventListener("click", exportData);
    importButton.addEventListener("click", importData);
    copyKeyButton.addEventListener("click", copyKeyToClipboard);

    // Load existing data from localStorage (if any)
    loadBookmarks();
});

let bookmarksData = [];

function loadBookmarks() {
    const storedData = localStorage.getItem("bookmarksData");
    if (storedData) {
        bookmarksData = JSON.parse(storedData);
        updateCompressedKey();
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
        updateCompressedKey();
        clearInputs();
        saveBookmarks(); // Save to localStorage
    } else {
        console.log("Please fill in all fields.");
    }
}

function updateCompressedKey() {
    const compressedKeyInput = document.getElementById("compressedKey");
    const jsonData = JSON.stringify(bookmarksData);
    const compressedKey = btoa(jsonData);
    compressedKeyInput.value = compressedKey;
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
    updateCompressedKey();
}

function importData() {
    const keyInput = prompt("Paste the exported key here:");
    if (keyInput) {
        try {
            const jsonData = atob(keyInput);
            bookmarksData = JSON.parse(jsonData);
            updateCompressedKey();
            saveBookmarks(); // Save imported data to localStorage
        } catch (error) {
            console.error("Error importing data:", error);
            alert("Invalid key. Please make sure the key is correct.");
        }
    }
}

function copyKeyToClipboard() {
    const compressedKeyInput = document.getElementById("compressedKey");
    compressedKeyInput.select();
    document.execCommand("copy");
}
