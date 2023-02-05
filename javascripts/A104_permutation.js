// WCZYTANIE ROZMIARU TABLICY PERM
// PROCEDURA MAIN_PERM
// ANTYLEX
// REVERSE
// KOREKTA CSS


let Perm = [];
let  inputValue = document.getElementById('number').value;
let counter = 0;

function main_perm (){
    document.getElementById('result').innerHTML='';
    Perm.length=0;
    counter=0;
    inputValue = document.getElementById('number').value;
    for( let i=0;i<inputValue;i++ ) {
        Perm[i]=i+1;
    }
    antylex(Perm.length);
    return;
   }


function reverse (m) {
    i = 0;
    j = m-1; 
    while (i<j) {
        const tempPer =  Perm[i];
        Perm[i]=Perm[j];
        Perm[j]=tempPer;
        i=i+1;
        j=j-1;
    }  
    return;
}

function  antylex(m) { 
    result  = document.querySelector('#result');
    let div =  document.createElement("div");
    let createdPerm = "";
     if (m==0) { 
        //  write (P[1],P[2],... P[n])
        counter++;
        div.innerText=counter+"." + " ";
        for (let k=0; k<Perm.length;k++ ){
           div.innerText +=Perm[k];
        }
        result.appendChild(div);
     }
     else 
         for (let i=0; i<m; i++) {
            antylex(m-1);
             if (i<m){ 
                const tempPer =  Perm[i];
                Perm[i]=Perm[m-1];
                Perm[m-1] = tempPer;
                reverse(m-1);}
            }
     return;
        }

//  PSEUDOKOD //
const pseudocode = document.querySelector("#pseudocode");
pseudocode.innerText = `REVERSE (m) {
   i = 1
   j = m  
   while i<j {
    P[i]=P[j]
    i=j
    j=j-1
   }  

   ANTYLEX(m) { 
    if m=1 then
        write (P[1],P[2],... P[n])
    else 
        for i=1 to m {
            ANTYLEX(m-1)
            if i<m then
                P[i]=P[m]
                REVERSE(m-1)
        }    
   }

   MAIN_PERMUTATION (){
    for i= 1 to n {
        P[i]=i
    }

    ANTYLEX(n)
   }

 `


 // CLEAR INPUT AND RESULT
 function clearFields()
 {
     document.getElementById('number').value='0';
     document.getElementById('result').innerHTML='';
     Perm.length=0;
     counter=0;
 
 }

