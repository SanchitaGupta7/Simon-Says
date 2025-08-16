let gameSeq=[];
let userSeq=[];
let btns=["red","yellow","blue","green"];
let started=false;
let level=0;
let h2=document.querySelector("h2");
let h3=document.querySelector("h3");
document.addEventListener("keypress",function(){
    if(started==false){
        started=true;
        levelUp();
    }
});
function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText="Level "+level;
    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randBtn);
}
function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        h2.innerText=`Game Over! Your score was ${level}. Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}
function btnPress(){
    let btn=this;
    btnFlash(btn);
    userSeq.push(btn.getAttribute("id"));
    checkAns(userSeq.length-1);
}
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}
function reset(){
    if(level>h3.getAttribute("id")){
        h3.setAttribute("id",`${level}`);
        h3.innerText=`High Score: ${level}`;
    }
    gameSeq=[];
    userSeq=[];
    level=0;
    started=false;
}