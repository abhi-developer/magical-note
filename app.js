console.log("Welcome to megical note");
showNotes();

// If a user adds a note, save it ot the localStorae
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    notesObj.push(addTxt.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = '';
    // console.log(notesObj);

    showNotes();

});

// Function to show elements from localStorae
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    let noteDetail = '';
    notesObj.forEach(function (element, index) {
        noteDetail += ` <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onclick="deleteNote(this.id);" class="btn btn-primary">Delete note</button>
        </div>
    </div>`;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = noteDetail;
    }
    else {
        notesElm.innerHTML = `<h5>You have not saved any notes yet! use "Add a note" section to add notes.</h5>`;
    }
}

// Function to delete a note
function deleteNote(index) {
    // console.log('I am deleting', index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener('input', function() {

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
        // console.log(cardTxt);

    });
});

/* 
Further features: 
1. Add title
2. Mark a note as important
3. Separate notes by user
4. Sync and host to a web server
*/