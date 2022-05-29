const url='https://api.spaceflightnewsapi.net/v3/articles?_limit=30';
const select=document.getElementById('news');

let root=document.querySelector('.parent');

let allNews=[];




select.addEventListener('change',handleSelect);


let response=fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=30')
                .then((res)=>{
                    if(!res.ok){
                        throw new Error('Something went wrong!!!:Status Code:'+res.status);
                    }
                    return res.json();
                })
                .then(res=>{
                    allNews=res;
                    createUI(res)
                    let allSources=Array.from(new Set(res.map((n)=>n.newsSite))); 
                    displayOptions(allSources);
                    
                })
                .catch(error=>{
                    root.style.color='Red';
                    root.innerText='Check your internet connection'; 
                })
                .finally();

function displayOptions(options){
    if(Array.isArray(options)){
        options.forEach(source=>{
            let option=document.createElement('option');
            option.innerText=source;
            option.value=source;
            select.append(option);
        })
    }
}


function handleSelect(event){ 
    let filteredNews=[];
    if(select.value ==='source'){
        filteredNews=allNews;
    }
    else{
        filteredNews=allNews.filter(news=>news.newsSite===select.value);
    }
    createUI(filteredNews);
}

function createUI(data){
    root.innerHTML="";
    
    data.forEach(element => {


        let li=document.createElement('li');

        let divImg=document.createElement('div');
        divImg.classList.add('img-box');

        let image=document.createElement('img');
        image.classList.add('newsImage');
        image.src=element.imageUrl;
        image.alt=element.title;
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


