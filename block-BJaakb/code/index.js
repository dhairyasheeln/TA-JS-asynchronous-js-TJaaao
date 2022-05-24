const url='https://api.unsplash.com/photos/?client_id=4I2MgsxMZFn14w9cmNiVO2AS0ml4gDJjoggwUAsn7UU';
const searchURL=(query)=>`https://api.unsplash.com/search/photos?query=${query}&client_id=4I2MgsxMZFn14w9cmNiVO2AS0ml4gDJjoggwUAsn7UU`;

const root=document.querySelector('.images');
const search=document.getElementById('search');


// function fetch(url,successHandler){
//     let xhr=new XMLHttpRequest();
//     xhr.open('GET',url);
//     xhr.onload=function(){
//         successHandler(JSON.parse(xhr.response));
//     };
//     xhr.onerror=function(){
//         console.error('Something went wrong!');
//     };
//     xhr.send();
// }

// function displayImages(images){
//     root.innerHTML="";
//     images.forEach(image => {
//         let li=document.createElement('li');
//         let img=document.createElement('img');
//         img.src=image.urls.thumb;
//         li.append(img);
//         root.append(li);
//     });
// }


// fetch(url,displayImages);

// search.addEventListener('keydown',handleSearch);

// function handleSearch(event){
//     if(event.keyCode==13 && search.value){
//         fetch(searchURL(search.value),function(searchResult){
//                 displayImages(searchResult.results);
//         });
//         search.value="";
//     }
// }

search.addEventListener('keydown',handleSearch);

function handleSearch(event){
    if(event.keyCode===13){
        let word=search.value;
        fetch(searchURL(word)).then(searchResult=>displayImage(searchResult.results)).catch(error=>console.error);

        
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

// function fetch(url,successHandler){
//     let xhr=new XMLHttpRequest();
//     xhr.open('GET',url);
//     xhr.onload=function(){successHandler(JSON.parse(xhr.response))};
//     xhr.onerror=function(){
//         console.error('Something went wrong!!!');
//     }
//     xhr.send();
// }

function fetch(url){
    return new Promise((resolve,reject)=>{
        let xhr=new XMLHttpRequest();
        xhr.open('GET',url);
        xhr.onload=()=>resolve(JSON.parse(xhr.response));
        xhr.onerror=()=>reject('Something went wrong!!');
        xhr.send();
    });
}

// fetch(url,displayImage);
fetch(url).then(data=>displayImage(data)).catch(error=>console.error);
