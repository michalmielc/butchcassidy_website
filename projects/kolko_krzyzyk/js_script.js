
let settingsButton = document.querySelector("#opt_submit");
let hiddenSections =  document.querySelectorAll(".hide");
let optionSection = document.querySelector(".options"); 
let message =document.querySelector(".message");
let resetButton = document.querySelector("#reset");
const tiles = Array.from(document.querySelectorAll(".tile"));
let fields = document.getElementById("fields").children;
let minMax = true;
let board =['','','','','','','','',''];
let boardMinMax = ['','','','','','','','',''];
let isGameActice = false;
let userPlayer ="-";
let pcPlayer = "-";
const maxValue = 1000;
const minValue = -1000;


//// MANIPULOWANIE SEKCJAMI 
//// USTAWIENIA PLANSZY
settingsButton.addEventListener("click", function() {
    hiddenSections.forEach(el=>{ el.classList.remove("hide");});
    optionSection.classList.add("hide");
    let playerX = document.getElementById("radio_player1").checked;
    let setAi  = document.getElementById("chk_ia").checked;

 

    if (!setAi) {
        minMax=false;
    }

    
    if (playerX){
        userPlayer="X";
        pcPlayer="O";
    }
    else if (!playerX){
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

// PROTOTYP PIERWSZEGO RUCHU
// function ifFirstMove(){
//     let firstMove = true;
//     for ( let i =0; i<=8;i++) {
//         if (board[i]!==""){
//              firstMove = false;   
//              break;
//         }
//     }

//     return firstMove;
// }

// //RUCH KOMPUTERA
function movePc(minMax){

    let move=-1;
    
    if(minMax){

                boardMinMax= Array.from(board);
                move = startMinMax(boardMinMax);
        }
    

    else {
        move= randomPcMOve();
    }

        updateBoard(move,pcPlayer);
        fields[move].innerText=pcPlayer;
        checkResult();
    
}

////////////////////////////////////////////////////////////
///    ************** MIN MAX ******************************

function startMinMax(boardMinMax)
{
    // MA NAM ZWRÓCIĆ NAJLEPSZY RUCH Z AKTUALNIE MOŻLIWYCH TZN INDEKS

	let field = -1;
    let tabFreeFieldsMinMax = [];
    let moveValue = 0;
	let bestValue = minValue;
    let step = 1;

    for ( let i =0; i<=8;i++) {
        if (boardMinMax[i]===""){
            tabFreeFieldsMinMax.push(i);
        }
    }

    field = tabFreeFieldsMinMax[0];

    for (let i=0; i<tabFreeFieldsMinMax.length;i++) 
    {
   
        boardMinMax[tabFreeFieldsMinMax[i]]=pcPlayer;

        console.log(boardMinMax);

        moveValue = MinMax (true,boardMinMax,step);
     
        console.log("węzeł nr: " + i + "pole: " + tabFreeFieldsMinMax[i]  +" wartość węzła: " + moveValue);

        if (moveValue >= bestValue) {
            bestValue = moveValue;
            field = tabFreeFieldsMinMax[i];
        } 

        boardMinMax[tabFreeFieldsMinMax[i]]="";   
    }
	
    console.log("AI WYBRAŁ POLE: " + field);
    console.log("############################################################## ");

	return field;
}	

function MinMax(isAiMove,boardMinMax,step)
{

   
	let bestValue = 0;

    if (isAiMove) {
  
        bestValue = minValue;

        if (winningVariantsMinMax(boardMinMax)) {
                bestValue = maxValue;
        } 

        else {
          
            bestValue = valueMinMax(false,boardMinMax,step+1);
        }
        
    }

   
    if (!isAiMove) {

        bestValue = maxValue; 
   
        if (winningVariantsMinMax(boardMinMax)) {
            bestValue = minValue;
        } 

        else {
       
            bestValue = valueMinMax(true,boardMinMax,step+1);
        }

    }
 
    return bestValue;

}

function valueMinMax(isAiMove,boardMinMax,step)
{
    // MA NAM ZWRÓCIĆ WARTOŚĆ RUCHU

    let tabFreeFieldsMinMax = [];
    let moveValue = 0;
	let bestValue = 0;

    for ( let i =0; i<=8;i++) {
        if (boardMinMax[i]===""){
            tabFreeFieldsMinMax.push(i);
        }
    }
    
    if (tabFreeFieldsMinMax.length==0)
    {
        bestValue = 0;
    }
    
    else 
    { 
        if (isAiMove) {

            bestValue = minValue;

            for (let i=0; i<tabFreeFieldsMinMax.length;i++) 
            {
        
                boardMinMax[tabFreeFieldsMinMax[i]]=pcPlayer;
                moveValue = MinMax (true,boardMinMax,step+1);
                if (moveValue >= bestValue) {
                    bestValue = moveValue;
                } 
                boardMinMax[tabFreeFieldsMinMax[i]]="";   
            }

            bestValue=bestValue-step;
        }


        if (!isAiMove) {

                bestValue = maxValue;

                for (let i=0; i<tabFreeFieldsMinMax.length;i++) 
                {
                    boardMinMax[tabFreeFieldsMinMax[i]]=userPlayer;
                    moveValue = MinMax (false,boardMinMax,step+1);

                    if (moveValue <= bestValue) {
                        bestValue = moveValue;
                    } 

            
                    boardMinMax[tabFreeFieldsMinMax[i]]="";   
                }

                bestValue=bestValue+step;
            }

}
	return bestValue;
}	

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


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

// SPRAWDZENIE WARIANTÓW
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
                winning =  true;
               }
            else {
                message.innerText = "WINNING BY O";
                winning =  true;
            }   
        }
    }

 
    return winning;
}

// SPRAWDZENIE WARIANTÓW ZWYCIESTWA REMISU PORAŻKI
function winningVariantsMinMax(boardMinMax) {
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
        const field1 = boardMinMax[win[0]];
        const field2 = boardMinMax[win[1]];
        const field3 = boardMinMax[win[2]];

        if (( field1===field2) && (field2 === field3) && (field1!=="")) {
            if (field1==="X") {
                winning =  true;
               }
            else {
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

}


