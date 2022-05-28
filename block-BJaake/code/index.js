const url='https://api.spaceflightnewsapi.net/v3/articles?_limit=30';
const select=document.getElementById('news');

let root=document.querySelector('.parent');



select.addEventListener('change',handleSelect);

function handleSelect(event){
    let response=fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=30')
                .then((res)=>res.json())
                .then(res=>createUI(res.filter(element=>element.newsSite===select.value)));   
}

let response=fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=30')
                .then((res)=>res.json())
                .then(res=>createUI(res));  



function createUI(data){
    root.innerHTML="";
    
    data.forEach(element => {


        let li=document.createElement('li');

        let divImg=document.createElement('div');
        divImg.classList.add('img-box');

        let image=document.createElement('img');
        image.classList.add('newsImage');
        image.src=element.imageUrl;
        divImg.append(image);

        let div=document.createElement('div');
        div.classList.add('newsInfo');

        let span=document.createElement('span');
        span.classList.add('newsSource');
        span.innerText=element.newsSite;

        let h3=document.createElement('h3');
        h3.classList.add('newsTitle');
        h3.innerText=element.title;

        let a=document.createElement('a');
        a.classList.add('newsReadMore');
        a.innerText='Read More';
        a.href=element.url;
        a.target="_blank";

        div.append(span,h3,a);
        li.append(divImg,div);
        root.append(li);

    });
}


