const $ = document


const addBookBtn = $.querySelector(".add-btn")
const titleInputElem = $.querySelector("#title")
const authorInputElem = $.querySelector("#author")
const yearInputElem = $.querySelector("#year")
const booksContainer = $.querySelector("#book-list")
let books = []
addBookBtn.addEventListener("click", (event) => {
    event.preventDefault()
    let titleInputValue = titleInputElem.value
    let authorInputValue = authorInputElem.value
    let yearInputValue = yearInputElem.value



    if (titleInputValue === "" || authorInputValue === "" || yearInputValue === "") {
        alert("تمام مشخصات باید پر شود")
    } else {
        let newBookObject = {
            id: books.length + 1,
            title: titleInputValue,
            author: authorInputValue,
            year: yearInputValue
        }
        books.push(newBookObject)
        setIntoLocalStorage(books)
    }
})

setIntoLocalStorage = (allBooksArray) => {
    localStorage.setItem("books", JSON.stringify(allBooksArray))
    makeEmptyInputs()
    booksGenerator(allBooksArray)
}

makeEmptyInputs = () => {
    titleInputElem.value = ""
    authorInputElem.value = ""
    yearInputElem.value = ""
}

booksGenerator=(allBooksArray)=>{
    booksContainer.innerHTML=""
    allBooksArray.forEach(book =>{
        newBookTrElem=$.createElement("tr")
        let newBookTitleTh =$.createElement("th")
        newBookTitleTh.innerHTML=book.title
        let newBookAuthorTh =$.createElement("th")
        newBookAuthorTh.innerHTML=book.author
        let newBookYearTh = $.createElement('th')
        newBookYearTh.innerHTML = book.year
         newBookTrElem.append(newBookTitleTh, newBookAuthorTh, newBookYearTh)
         booksContainer.append(newBookTrElem)

    })

}

function getBooksFromLocalStorage() {

    let localStorageBooks = localStorage.getItem('books')

    if (localStorageBooks) {
        books = JSON.parse(localStorageBooks)
        booksGenerator(books)
    }
}

window.addEventListener('load', getBooksFromLocalStorage)