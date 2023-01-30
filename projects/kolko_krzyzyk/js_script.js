
let settingsButton = document.querySelector("#opt_submit");
let hiddenSections =  document.querySelectorAll(".hide");
let optionSection = document.querySelector(".options"); 
let message =document.querySelector(".message");
let resetButton = document.querySelector("#reset");
const tiles = Array.from(document.querySelectorAll(".tile"));
let fields = document.getElementById("fields").children;
let minMax = document.querySelector('input[name="opt_ia"]:checked');
let board =['','','','','','','','',''];
let isGameActice = false;
let userPlayer ="-";
let pcPlayer = "-";


//// MANIPULOWANIE SEKCJAMI 
//// USTAWIENIA PLANSZY
settingsButton.addEventListener("click", function() {
    hiddenSections.forEach(el=>{ el.classList.remove("hide");});
    optionSection.classList.add("hide");
    let playerX = document.getElementById("radio_player1").checked;
    
    if (playerX){
        userPlayer="X";
        pcPlayer="O";
    }
    else{
        userPlayer="O";
        pcPlayer="X";
        movePc(minMax);
    } 
    isGameActice=true;
});

//// RESET GRY
resetButton.addEventListener("click",  function() {     
    hiddenSections.forEach(el=>{ el.classList.add("hide");});
    optionSection.classList.remove("hide");
    resetBoard();

});

////RESET PLANSZY
function resetBoard() {
    board =['','','','','','','','',''];
    isGameActice=false;
    tiles.forEach(tile=>{
        tile.innerText="";
    });
    message.innerText="";
    userPlayer ="-";
    pcPlayer = "-";
}

// //RUCH KOMPUTERA
function movePc(minMax){
    
    if(minMax){
    // DOŁOŻYĆ TUTAJ MIN MAX
    }
    else {
        let move= randomPcMOve();
   
        updateBoard(move,pcPlayer);
        fields[move].innerText=pcPlayer;
        checkResult();
    }
}


// // PODPIĘCIE ZDARZENIA DO KAFELKÓW
tiles.forEach ( (tile,index)=> {
    tile.addEventListener("click",()=>playerMove(tile,index)); 

});

// // RUCH GRACZA
const  playerMove =(tile,index ) => {
    if (isTileEmpty(tile) && isGameActice) {
            tile.innerText = userPlayer;
            updateBoard(index,userPlayer);
            checkResult();
            if (isGameActice) {
                movePc(minMax)
            }
        return; }

};

//// WALIDACJA KAFELKA CZY JEST ZAJĘTY
const isTileEmpty = (tile) => {
    if(tile.innerText==="X" || tile.innerText==="O")
    {
        return false;
    }

    return true;};
     
//// SPRAWDZENIE WARUNKÓW GRY    
function checkResult(){

    if (winningVariants()) {
        isGameActice=false;
        return;
    }

    if (!board.includes('')) {
       message.innerText="TIE";
       isGameActice=false;
       return;
    }
}

function winningVariants() {
    let winning = false;
    const winningConditions  = [
                [0,1,2],
                [3,4,5],
                [6,7,8],
                [0,3,6],
                [1,4,7],
                [2,5,8],
                [0,4,8],
                [2,4,6]];

    for ( let i=0; i<8;i++) {
        const win = winningConditions[i];
        const field1 = board[win[0]];
        const field2 = board[win[1]];
        const field3 = board[win[2]];

        if (( field1===field2) && (field2 === field3) && (field1!=="")) {
            if (field1==="X") {
                message.innerText = "WINNING BY X";
                console.log("WINNING BY X");
                winning =  true;
               }
            else {
                message.innerText = "WINNING BY O";
                console.log("WINNING BY O");
                winning =  true;
            }   
        }
    }

 
    return winning;
}

////LOSOWY RUCH KOMPA
function randomPcMOve() {
   
    let freeTile=-1;
    let indx =-1;
    const tabFreeFields = [];
    for ( let i =0; i<=8;i++) {
        if (board[i]===""){
            tabFreeFields.push(i);
        }
    }
    indx = randomNumber(0,tabFreeFields.length-1);
    console.log(`${tabFreeFields[indx]} ${indx} ${tabFreeFields}` );
    return freeTile = tabFreeFields[indx] ;
}

//// GENEROWANIE LOSOWEJ LICZBY
function randomNumber(min, max) {
   
    min = Math.ceil(min);
    max = Math.floor(max);
    if (min==max) {
        return 0;
    }
    else{
        const indx = Math.floor(Math.random() * (max - min + 1) + min);
        return indx ;
    }
};

////UPDATE TABLICY
const updateBoard = (index,player) => {
    board[index] = player;
    console.log(board);
}







/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
// window.addEventListener("DOMContentLoaded",
// () => {

//     const settingsButton = document.querySelector("#opt_submit");
//     const hiddenSections =  document.querySelectorAll(".hide"); 


//     settingsButton.addEventListener("click",  function () {
//         hiddenSections.forEach(el=>{ el.classList.remove("hide");});
//        return;
//    });

// });
//     const tiles = Array.from(document.querySelectorAll(".tile"));
//     const playerDisplay =document.querySelector(".display-player");
//     const resetButton = document.querySelector("#reset");
//     const annoucer =document.querySelector(".annoucer");

//     let board =['','','','','','','','',''];
//     let currentPlayer ="X";
//     let isGameActice = true;

//     const PLAYERX_WON = "PLAYERX_WON";
//     const PLAYERO_WON = "PLAYERO_WON";
//     const TIE = "TIE";

//     const winningConditions  = [
//         [0,1,2],
//         [3,4,5],
//         [6,7,8],
//         [0,3,6],
//         [1,4,7],
//         [2,5,8],
//         [0,4,8],
//         [2,4,6],
//     ];

//     function handleResultvalidation () {
//         let roundWon = false;
//         for ( let i =0; i<=7;i++) {
//             const winCondition = winningConditions[i];
//             const a = board[winCondition[0]];
//             const b = board[winCondition[1]];
//             const c = board[winCondition[2]];

//             if (a === "" || b === "" || c === ""){
//                 continue;
//             }

//             if (a === b && b === c){
//                 roundWon=true;
//                 break;
//             }
//         }

//         if (roundWon)
//         {
//             announce(currentPlayer==="X"?PLAYERX_WON:PLAYERO_WON);
//             isGameActice = false;
//             return;
//         }

//         if (!board.includes('')) 
//         announce(TIE);
//     }



//     const announce = (type)=> {

//     switch(type) {
//         case  PLAYERX_WON:
//             annoucer.innerHTML = 'Player <span class="playerX">X</span>won';
//             break;
//         case  PLAYERO_WON:
//             annoucer.innerHTML = 'Player <span class="playerO">O</span>won';
//             break;
//         case TIE: 
//             annoucer.innerHTML = 'TIE';
//             break;
//     }
//     annoucer.classList.remove("hide");
//     }
//     const isValidAction = (tile) => {
//         if(tile.innerText==="X" || tile.innerText==="O")
//         {
//             return false;
//         }

//         return true;
//     }
//     const updateBoard = (index) => {
//         board[index] = currentPlayer;
//     }
//     const changePlayer = ()=> {
//         playerDisplay.classList.remove(`player${currentPlayer}`);
//         currentPlayer = currentPlayer ==="X"?"O":"X";
//         playerDisplay.innerText = currentPlayer;
//         playerDisplay.classList.add(`player${currentPlayer}`);
//     }
//     const  userAction =(tile,index ) => {
//         if (isValidAction(tile) && isGameActice) {
//             tile.innerText = currentPlayer;
//             tile.classList.add(`player${currentPlayer}`)
//             updateBoard(index);
//             handleResultvalidation();
//             changePlayer();
//         }

//     };
//     const resetBoard =()=> {
//         board =['','','','','','','','',''];
//         isGameActice=true;
//         annoucer.classList.add("hide");

//         if (currentPlayer==="O")
//         {
//             changePlayer();
//         }

//         tiles.forEach(tile=>{
//             tile.innerText="";
//             tile.classList.remove("playerX");
//             tile.classList.remove("playerO");
//         });
//     }

//     tiles.forEach ( (tile,index)=> {
//         tile.addEventListener("click",()=>userAction(tile,index)); 
//     });
//     resetButton.addEventListener("click", resetBoard);
