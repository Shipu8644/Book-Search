document.getElementById('error-message').style.display = 'none';
document.getElementById('error1-message').style.display = 'none';
document.getElementById('spinner').style.display = 'none';

const searchButton = () => {

    const inputField = document.getElementById('input');
    const inputText = inputField.value;
    inputField.value = '';
    if (inputText === '') {
        document.getElementById('error1-message').style.display = 'block';
    }
    else {
        document.getElementById('error1-message').style.display = 'none';
        document.getElementById('spinner').style.display = 'block';
        fetch(`https://openlibrary.org/search.json?q=${inputText}`)
            .then(res => res.json())
            .then(data => showBook(data.docs, data))
    }
}

const showBook = (books, data) => {
    const dataFound = document.getElementById('data-find');
    dataFound.textContent = '';
    dataFound.innerHTML = `
    <h3 class="card-text text-center mb-3"> <span class='text-danger'>Data found:</span> ${data.numFound}</h3>
    `
    console.log(books);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (books.length === 0) {
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('error-message').style.display = 'block';
    }
    else {
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('spinner').style.display = 'none';
        books.slice(0, 21).forEach(book => {
            // console.log(book.cover_i);
            const div = document.createElement('div');
            div.innerHTML = `
        <div class='card border-primary'>
        <img width='200px' heigh='200px' class='mx-auto img-fluid' src='https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg' alt="...">
        <div class="card-body">
            
            <h6 class="card-text">Book Name: ${book.title ? book.title : 'No name given'} </h6>
            <hr>
            <h6 class="card-text">Author Name: ${book.author_name ? book.author_name : 'No author name given'}</h6>
            <hr>
            <h6 class="card-text">Publisher: ${book.publisher ? book.publisher : 'No publisher given'}</h6>
            <hr>
            <h6 class="card-text">Publish Year: ${book.first_publish_year ? book.first_publish_year : 'No publish year given'}</h6>

           
        </div>
        </div>
        `
            searchResult.appendChild(div);
        })
    }

}