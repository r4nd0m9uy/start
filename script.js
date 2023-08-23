document.addEventListener("DOMContentLoaded", () => {
    displayClock();
    displayBookmarks();
});

function displayClock() {
    const timeElement = document.getElementById("time");
    setInterval(() => {
        const now = new Date();
        timeElement.textContent = now.toLocaleTimeString();
    }, 1000);
}

function displayBookmarks() {
    const bookmarksContainer = document.querySelector(".bookmarks");

    // Fetch bookmarks data from data.json (Assuming you have a JSON array of bookmarks)
    fetch("data.json")
        .then(response => response.json())
        .then(bookmarks => {
            bookmarks.forEach(bookmark => {
                const bookmarkElement = createBookmarkElement(bookmark);
                bookmarksContainer.appendChild(bookmarkElement);
            });
        })
        .catch(error => console.error("Error fetching bookmarks:", error));
}

function createBookmarkElement(bookmark) {
    const bookmarkElement = document.createElement("a");
    bookmarkElement.classList.add("bookmark");
    bookmarkElement.href = bookmark.url;
    bookmarkElement.target = "_blank";

    const iconElement = document.createElement("img");
    iconElement.src = bookmark.icon;
    iconElement.alt = "Bookmark Icon";

    const titleElement = document.createElement("span");
    titleElement.classList.add("title");
    titleElement.textContent = bookmark.title;

    bookmarkElement.appendChild(iconElement);
    bookmarkElement.appendChild(titleElement);

    // Check if the URL is down and add a warning badge if necessary
    checkUrlStatus(bookmark.url, status => {
        if (!status) {
            const warningBadge = document.createElement("span");
            warningBadge.classList.add("warning-badge");
            warningBadge.textContent = "Down";

            bookmarkElement.appendChild(warningBadge);
        }
    });

    return bookmarkElement;
}

function checkUrlStatus(url, callback) {
    fetch(url, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                callback(true); // URL is up
            } else {
                callback(false); // URL is down
            }
        })
        .catch(error => {
            callback(false); // URL is down
        });
}
