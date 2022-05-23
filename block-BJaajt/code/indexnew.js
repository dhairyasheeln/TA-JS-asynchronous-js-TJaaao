const search=document.querySelector('.search');
let profilePic=document.querySelector('.profilePic');
let username=document.querySelector('.username');
let userId=document.querySelector('.userId');

let follower=document.querySelector('.followers');
let following=document.querySelector('.following');

const url='https://api.github.com/users/';


search.addEventListener('keydown',handleSearch);


function handleSearch(event){
    if(event.keyCode===13){
        let user=search.value;
        fetch(url+user,handleDisplay);
    }
}

function displayExtraInfo(url,root){
    root.innerHTML="";
    fetch(url,function(images){
        let topFive=images.slice(0,5);
        topFive.forEach(image => {
            let li=document.createElement('li');
            let img=document.createElement('img');
            img.src=image.avatar_url;
            li.append(img);
            root.append(li);
        });
       
    });
}

function handleDisplay(data){
    profilePic.src=data.avatar_url;
    username.innerText=data.name;
    userId.innerText=`@${data.login}`;
    displayExtraInfo(`https://api.github.com/users/${data.login}/followers`,follower);
    displayExtraInfo(`https://api.github.com/users/${data.login}/following`,following);
    search.value="";

}

 function fetch(url,successHandler){
    let xhr=new XMLHttpRequest();
    xhr.open('GET',url);
    xhr.onload=()=>{successHandler(JSON.parse(xhr.response))};
    xhr.send();
 }