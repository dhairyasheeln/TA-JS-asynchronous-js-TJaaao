/*Seclecting Elements*/

let profilePic=document.querySelector('.profilePic');
let username=document.querySelector('.username');
let userId=document.querySelector('.userId');
let input=document.querySelector('.search');

let followerUL=document.querySelector('.followers');
let followingUL=document.querySelector('.following');



/*Handle change*/

let userData;


input.addEventListener('keydown',handleInput);

function handleInput(event){
    if(event.keyCode===13 && input.value){
        let url="https://api.github.com/users/";
        let user=input.value;
        fetch(url+user,handleDisplay);
        input.value="";
    }   
}


function fetch(url,successHandler){
    let xhr=new XMLHttpRequest();
    xhr.open('GET',url);
    xhr.onload=()=>successHandler(JSON.parse(xhr.response));
    xhr.onerror=function(){
        console.error('Something went Wrong!');
    };

    xhr.send();
}

function displayExtraInfo(url,rootElm)
{      
    rootElm.innerHTML="";
    fetch(url,function(followerList){
        let topFive=followerList.slice(0,5);
        topFive.forEach(info=>{
            let li=document.createElement('li');
            let img=document.createElement('img');
            img.src=info.avatar_url;
            img.alt=info.name;
            li.append(img);
            rootElm.append(li);
        })
        
    });

}

function handleDisplay(data){
    profilePic.src=data.avatar_url;
    profilePic.alt=data.name;
    username.innerText=data.name;
    userId.innerText=`@${data.login}`;
    displayExtraInfo(`https://api.github.com/users/${data.login}/followers`,followerUL);
    displayExtraInfo(`https://api.github.com/users/${data.login}/following`,followingUL);

}



let catBtn=document.querySelector('.cat button');
let catsImage=document.querySelector('.cat img');

catBtn.addEventListener('click',handleClick);


function handleClick(event){
    fetch(`https://api.thecatapi.com/v1/images/search?limit=1&size=full`,function (catInfo){
        catsImage.src=catInfo[0].url;
    });
}







