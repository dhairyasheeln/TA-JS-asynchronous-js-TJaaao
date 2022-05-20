/*Seclecting Elements*/

let profilePic=document.querySelector('.profilePic');
let username=document.querySelector('.username');
let userId=document.querySelector('.userId');
let input=document.querySelector('.search');

let followerSection=document.querySelector('.followers');


/*Handle change*/

let userData;
let xhr=new XMLHttpRequest();
let xhrFollowers=new XMLHttpRequest();
let xhrFollowing=new XMLHttpRequest();
let followers=[];
let following=[];

input.addEventListener('keyup',handleChange);

function handleChange(event){
    if(event.keyCode===13){
        /*User Details*/
        let user=event.target.value;
        xhr.open('GET',`https://api.github.com/users/${user}`);
        xhr.onload=function(){
            userData=JSON.parse(xhr.response); 
            createUI(userData);
            event.innerText="";
            event.target.value="";
                };
        xhr.send();

        // /*Followers*/
        // xhrFollowers.open('GET',`https://api.github.com/users/${user}/followers`);
        // xhrFollowers.onload=function(){
        //     followers=JSON.parse(xhrFollowers.response); 
        //     createUI(userData,followers);
        // };
        // xhrFollowers.send();

        // /*Following*/
        // xhrFollowing.open('GET',`https://api.github.com/users/${user}/following`);
        // xhrFollowing.onload=function(){
        //     following=JSON.parse(xhrFollowing.response); 
        // };
        // xhrFollowing.send();
        // event.target.value="";
    }   
}

function createUI(data){
    console.log(data);
    profilePic.src=data.avatar_url;
    username.innerText=data.name;
    userId.innerText=data.login;

    // dataFollowers.forEach(element => {
    //     let img=document.createElement('img');
    //     img.src=element.avatar_url;
    //     followerSection.append(img);
        
    // });
}


/*XML Request*/





