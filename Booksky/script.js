//selecting popubox popup overlay

var popupoverlay = document.querySelector(".popup-overlay")
var popupbox= document.querySelector(".popup-box")
var addpopupbutton = document.getElementById("add-popup-button")

addpopupbutton.addEventListener("click",function(){

    popupoverlay.style.display ="block"
    popupbox.style.display ="block"
})


//selet container , add book ,book-title-input,book-author-input,book-description-input

var container = document.querySelector(".container")
var addbook = document.getElementById("add-book")
var booktitleInput=document.getElementById("book-title-input")
var bookauthoreInput=document.getElementById("book-author-input")
var bookdescriptionInput=document.getElementById("book-description-input")

var addbook = document.getElementById("add-book")

addbook.addEventListener("click", function(event){
    event.preventDefault()

    var div = document.createElement("div")
    div.setAttribute("class","book-container")

    div.innerHTML = `
        <h2>${booktitleInput.value}</h2>
        <h5>${bookauthorinput.value}</h5>
        <p>${bookdescriptioninput.value}</p>
        <button onclick="deletebook(event)">Delete</button>
    `

    container.append(div)

    popupoverlay.style.display="none"
    popupbox.style.display="none"
})

function deletebook(event){

    event.target.parentElement.remove()
}
