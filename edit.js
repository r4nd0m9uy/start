document.addEventListener("DOMContentLoaded", () => {
    const toggleMenuButton = document.getElementById("toggleMenu");
    toggleMenuButton.addEventListener("click", toggleMenu);

    const showAddBookmarkButton = document.getElementById("showAddBookmark");
    const showExportImportButton = document.getElementById("showExportImport");
    
    showAddBookmarkButton.addEventListener("click", showAddBookmark);
    showExportImportButton.addEventListener("click", showExportImport);

    const addButton = document.getElementById("addBookmarkButton");
    const exportButton = document.getElementById("exportButton");
    addButton.addEventListener("click", addBookmark);
    exportButton.addEventListener("click", exportData);

    const importButton = document.getElementById("importButton");
    importButton.addEventListener("click", importData);

    const copyKeyButton = document.getElementById("copyKeyButton");
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

function toggleMenu() {
    const menuOptions = document.getElementById("menuOptions");
    menuOptions.classList.toggle("show");
}

function showAddBookmark() {
    const addBookmarkSection = document.querySelector(".add-bookmark");
    const exportImportSection = document.querySelector(".export-import");
    addBookmarkSection.classList.toggle("hidden", false);
    exportImportSection.classList.toggle("hidden", true);
}

function showExportImport() {
    const addBookmarkSection = document.querySelector(".add-bookmark");
    const exportImportSection = document.querySelector(".export-import");
    addBookmarkSection.classList.toggle("hidden", true);
    exportImportSection.classList.toggle("hidden", false);
}
