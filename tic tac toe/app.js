const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//lets create a function to initialise a game
function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    //ui par empty krna padega 
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        //one more thing is missing,
        //initialise box with css properties again
        box.classList=`box box${index+1}`;


    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
initGame();


function checkGameOver(){
   let answer="";
   winningPositions.forEach((position)=>{
    if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="")
    && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]]) ){
        //check id winner is x
        if(gameGrid[position[0]]==="X")
        answer="X";
    else
        answer="O";

        //disable pointer events
        boxes.forEach((box)=>{
            box.style.pointerEvents="none";
        })


        //NOW WE KNOW X/0 IS A WINNER
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
    }
   });
   //it means we have a winner 
   if(answer!==""){
    gameInfo.innerText=`Winner Player - ${answer}`;
    newGameBtn.classList.add("active");
    return;
   }
   //lets chekc when there is a tie
   let fillcount=0;
   gameGrid.forEach((box)=>{
    if(box!=="")
        fillcount++;
   });
   if(fillcount === 9){
    gameInfo.innerText="Game Tied!";
    newGameBtn.classList.add("active");

   }
}


function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    //ui update
    gameInfo.innerText=`curret player - ${currentPlayer}`;
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        //jsipra value hai ab us par hover karne par cursor pointer mei nhi bdle ga
        boxes[index].style.pointerEvents="none";
        //swap turn
        swapTurn();
        //check koi  jeet toh nhi gya
        checkGameOver();
    }
}
boxes.forEach((box,index) => {
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});


newGameBtn.addEventListener("click",initGame);
