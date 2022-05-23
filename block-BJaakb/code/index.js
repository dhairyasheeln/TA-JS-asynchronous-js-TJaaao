const url='https://api.unsplash.com/photos/?client_id=4I2MgsxMZFn14w9cmNiVO2AS0ml4gDJjoggwUAsn7UU';
const searchURL=(query)=>`https://api.unsplash.com/search/photos?query=${query}&client_id=4I2MgsxMZFn14w9cmNiVO2AS0ml4gDJjoggwUAsn7UU`;

const root=document.querySelector('.images');
const search=document.getElementById('search');


search.addEventListener('keydown',handleSearch);

function handleSearch(event){
    if(event.keyCode===13){
        let word=search.value;
        fetch(searchURL(word),function(searchData){
            displayImage(searchData.results);
        });
        
    }
}


function displayImage(data){
    root.innerHTML="";
    search.value="";
        data.forEach(image => {
            let img=document.createElement('img');
            img.src=image.urls.small;
            let li=document.createElement('li');
            li.append(img);
            root.append(li);
        });
    }

function fetch(url,successHandler){
    let xhr=new XMLHttpRequest();
    xhr.open('GET',url);
    xhr.onload=function(){successHandler(JSON.parse(xhr.response))};
    xhr.onerror=function(){
        console.error('Something went wrong!!!');
    }
    xhr.send();
}

fetch(url,displayImage);
