const url="https://www.anapioficeandfire.com/api/books";

let root=document.querySelector('.parent');
let charRoot=document.querySelector('.charParent');





function display(url,handler){
    let pr=fetch(url)
    .then((res)=>res.json())
    .then(data=>handler(data));

}

display(url,createUI);
/*

            <h3 class="bookTitle">Game of Thrones</h3>
                <p class="bookAuthor">Gorge R.R Martin</p>
                <p class="publisher">Bantam Books</p>
                <p class="released">1996-08-01T00:00:00</p>
                <p class="country">United States</p>
                <a class="character" href="">Show Characters</a>

*/


function createUI(books){
    books.forEach((book,index) => {

        let li=document.createElement('li');
        li.classList.add('book');

        let title=document.createElement('h3');
        title.innerText=book.name;

        let author=document.createElement('p');
        author.innerText=book.authors;

        let publisher=document.createElement('p');
        publisher.innerText=book.publisher;

        let released=document.createElement('p');
        released.innerText=book.released;

        let country=document.createElement('p');
        country.innerText=book.country;

        let character=document.createElement('a');
        character.innerText=book.country;
        character.href='#';
        character.setAttribute(`data-char`,index);
        character.addEventListener('click',(event)=>{

            charRoot.innerHTML="";

            fetchCharacters(event,books)});

        li.append(title,author,publisher,released,country,character);

        root.append(li);
            
        });
    }

    function fetchCharacters(event,books){

        root.style.display='none';
        charRoot.style.display='block';

        let close=document.querySelector('.close');
        close.addEventListener('click',()=>{
            root.style.display='flex';
            charRoot.style.display='none';
        });

        let characterCollection=books[event.target.getAttribute('data-char')].characters;
        characterCollection.forEach((characterUrl)=>display(characterUrl,displayCharacter));
    }

    function displayCharacter(data){
        let li=document.createElement('li');
        li.innerText=`Name:${data.name} Gender:${data.gender}`;
        li.classList.add('character');
        charRoot.append(li);
    }

    

  

    

       


