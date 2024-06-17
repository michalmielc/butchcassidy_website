let  inputValue = document.getElementById('number').value;
let input =  document.getElementById('number');

 input.addEventListener('beforeinput', e=>{

    inputValue = document.getElementById('number').value;

        if (!containsOnlyNumbers(e.data)){
            console.log("beforeinput BŁĄD!");
           e.preventDefault();
        }
    })

input.addEventListener('input', e=>{

    if (!containsOnlyNumbers(e.data)){
        console.log("input BŁĄD!");
        e.preventDefault();
    }
})
    

 //FUNCKJA SPRAWDZAJĄCA
 function containsOnlyNumbers(str) {

    if (document.getElementById('binToDec').checked){
        return /^[0-1]+$/.test(str);}

    else if (document.getElementById('decToBin').checked){
    return /^\d+$/.test(str);}
  }
 
 // CONVERT FUNCTION
 function convert()
 {
     inputValue = document.getElementById('number').value;

     if (document.getElementById('binToDec').checked)
     {
        binaryToDecimal(inputValue)
     }
 
     else if (document.getElementById('decToBin').checked)
     {
        decimalToBinary (inputValue)
     }
 }
 function decimalToBinary (inputValue)
 {
   
     if (inputValue==0)
     {
         document.getElementById('result').innerHTML =  inputValue +  "=  (0)" + "2".sub()
         return
     }
 
     var quotient = inputValue
     var binVariable =''
 
     while (quotient>0)
     {
         binVariable = quotient%2 + binVariable
         quotient = Math.floor(quotient/2)
     } 
 
     document.getElementById('result').innerHTML =  inputValue +  "=  (" + binVariable +  ")" + "2".sub()
 
 }
//BINARY TO DECIMAL
function binaryToDecimal (binVariable)
{

    const arrayBin  = [...binVariable]

    var  hexaVariable = 0

    for ( var i = 0; i < arrayBin.length ; i++)
    {
        hexaVariable = hexaVariable + arrayBin[i]*binPower( arrayBin.length -i -1)
    }

    document.getElementById('result').innerHTML =  "(" + binVariable +  ")" + "2".sub() + " = " +  hexaVariable 

}
// BINARY POWER
function binPower (pwr)
{
    if (pwr == 0 )
    {
        return 1
    }

    else  
    {
        if ( pwr == 1)
        {
            return  2
        }
        
        else

        {

            var result = 2

            for ( var i = 2; i <=  pwr ; i++)
            {

                result = result*2
            
            }

            return result
        }
        
    }
 
}

// CLEAR INPUT AND RESULT
function clearFields()
 {
     document.getElementById('number').value='0';
     document.getElementById('result').innerHTML='';
 }

//  PSEUDOKOD //
 const codeHex = document.querySelector("#codeDecToBin");
 codeHex.innerText = `ConvertToBin (n) {
    k = n  
    r = 0  
    bin = ''  

    while (k<1) { 
        r = k mod n 
        bin = r & bin 
        k = k/2 }

 RETURN bin }`

const codeBin = document.querySelector("#codeBinToDec");
codeBin.innerText = `ConvertToDec(bin){
    array []  = bin
    decimal = 0 
    
    for j = 0 to array.length
        decimal = decimal + array[i] 
                        * binPower[array.length -j-1]
        j = j+1
 
 RETURN decimal}
 
binPower(n) {
    if n = 0
        RETURN 1
    else if n = 1
        RETURN 1
    else
        for j = 2 to n
            result = result*2
            j = j+1
    
    RETURN result}`  
 
