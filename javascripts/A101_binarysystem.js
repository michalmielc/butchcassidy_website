 
 var  input = document.getElementById('number')

 
 // EVENT PRESS ENTER
 input.addEventListener('keyup', function(event) {

    if (event.keyCode!=13)
    {
        if (document.getElementById('binToDec').checked)
        {
            if ( event.key !='1' &&  event.key !='0' )
            {
                var result = document.getElementById('result')
                result.innerHTML =  "WYBIERZ 0 LUB 1"
                result.style.color = "red"
                rem()
                //return
            } 

            else

            {
                convert (input.value)
            }
            
        }

        else if (document.getElementById('decToBin').checked)
        {
            if ( event.keyCode <48 || event.keyCode >57 )
            {
                var result = document.getElementById('result')
                result.innerHTML =  "CYFRY 0... 9"
                result.style.color = "red"
                rem()
               // return
            } 

            else

            {
                convert (input.value)
            }
        }
    }

    else {
            convert (input.value)
    }
 })
 
 //REMOVE CHAR 

 function rem()
 {
      console.log(document.getElementById('number').value)
      var x = document.getElementById('number').value
      document.getElementById('number').value = x.substring(0,x.length-1)
 }
 
 // CONVERT FUNCTION
 function convert()
 {
     var  inputValue = document.getElementById('number').value
 
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
         // console.log(binVariable + " " + quotient)
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
     document.getElementById('number').value=''
     document.getElementById('result').innerHTML=''
 
 }