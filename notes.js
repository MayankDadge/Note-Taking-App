console.log('Welcome to the note app');
showNotes();

var today = new Date();
var year = today.getFullYear();
var mes = today.getMonth() + 1;
var dia = today.getDate();
var fecha = dia + "-" + mes + "-" + year;
document.getElementById("dateinback").innerHTML = fecha;

let addbtn = document.getElementById("addBtn");
addbtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (addTxt.value != "") {
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }
        notesObj.push(addTxt.value);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = "";
        console.log(notesObj);
        showNotes();
    }
    else {
        alert("You must write something in it!");
    }

})

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Note ${index + 1}</h5>
                  <p class="card-text">${element}</p>
                  <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary"><i class="fa fa-trash" aria-hidden="true"></i> TRASH</button>
                </div>
            </div>`;
    })
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use the add button section to add your notes`
        notesElm.style.color = "rgb(86, 157, 250)";
    }
}

function deleteNote(index) {
    if (confirm("Delete note?")) {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }
        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    document.getElementById("writehere").style.display = "none";
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("P")[0].innerText;
        if (cardTxt.toLowerCase().includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})

var newnote = document.getElementById("newnote");
newnote.addEventListener("click", function () {
    document.getElementById("writehere").style.display = "block";
})

var colorbtn = true;
var coloron = document.getElementById("coloron");
var coloroff = document.getElementById("coloroff");

coloron.addEventListener('click', function () {
    colorbtn = true;
})

coloroff.addEventListener("click", function () {
    colorbtn = false;
    document.getElementById("addanote").style.color = "black";
})

function colorflip() {
    if (colorbtn) {
        document.getElementById("addanote").style.color = getRandomColor();
    }

}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//Animation
function pencilanimate() {
    let start = Date.now();

    let timer = setInterval(function () {
        let timePassed = Date.now() - start;

        document.getElementById("pencil").style.left = timePassed / 5 + 'px';

        if (timePassed > 7000) clearInterval(timer);

    }, 20);

}