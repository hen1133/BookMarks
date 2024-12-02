var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var BookList = [];

if (localStorage.getItem("BooksMarkList") !== null) {
    BookList = JSON.parse(localStorage.getItem("BooksMarkList"));
    displayData();
}

function addBookmark() {
    if (
        validateInputs(siteNameInput, "msgName") &&
        validateInputs(siteUrlInput, "msgUrl") &&
        isNameUnique(siteNameInput.value.trim()) &&
        doesNameMatchDomain(siteNameInput.value.trim(), siteUrlInput.value.trim())
    ) {
        var bookmark = {
            name: siteNameInput.value.trim(),
            url: siteUrlInput.value.trim(),
        };

        BookList.push(bookmark);

        localStorage.setItem("BooksMarkList", JSON.stringify(BookList));
        displayData();}
        clearForm();
    
}

function displayData() {
    var cartona = "";
    for (var i = 0; i < BookList.length; i++) {
        cartona += createBook(i);
    }
    document.getElementById("bookmark-list").innerHTML = cartona;
}

function createBook(i) {
    return `
        <tr>
            <td>${i + 1}</td>
            <td>${BookList[i].name}</td>
            <td>
                <a href="${BookList[i].url}" target="_blank" class="btn btn-success">
                    <i class="fas fa-eye"></i> Visit
                </a>
            </td>
            <td>
                <button class="btn btn-danger" onclick="deleteBook(${i})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        </tr>
    `;
}

function deleteBook(i) {
    BookList.splice(i, 1);
    localStorage.setItem("BooksMarkList", JSON.stringify(BookList));
    displayData();
}

function clearForm() {
    siteNameInput.value = null;
    siteUrlInput.value = null;
    siteNameInput.classList.remove("is-valid");
    siteUrlInput.classList.remove("is-valid");
}


function validateInputs(element, msgId) {
    var text = element.value;

    var regex = {
        siteName: /^[a-zA-Z][a-zA-Z0-9 _-]{2,19}$/,
        siteUrl: /^https?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/[a-zA-Z0-9#?&=%_.~-]*)?$/,
    };

    var msg = document.getElementById(msgId);

    if (regex[element.id].test(text)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        msg.classList.add("d-none");
        return true;
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        msg.classList.remove("d-none");
        return false;
    }
}

function doesNameMatchDomain(name, url) {
    try {
        var domain = new URL(url).hostname.replace("www.", "").split(".")[0];
        if (name.toLowerCase() !== domain.toLowerCase()) {
            alert(`The name "${name}" does not match the domain "${domain}".`);
            return false;
        }
        return true;
    } catch (error) {
        alert("Invalid URL format.");
        return false;
    }
}

function isNameUnique(name) {
    for (var i = 0; i < BookList.length; i++) {
        if (BookList[i].name.toLowerCase() === name.toLowerCase()) {
            alert("A bookmark with the same name already exists.");
            return false;
        }
    }
    return true;
}
