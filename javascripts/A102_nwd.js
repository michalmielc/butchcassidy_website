// PROCEDURE NWD(a,b)
// while (b!=0)
//     c:= a mod b
//     a:=b
//     b:=c
// RETURN a.

//CALCULATE

var  input1 = document.getElementById('number1')
var  input2 = document.getElementById('number2')

// EVENT PRESS ENTER
input1.addEventListener('keypress', function(event) {
    
    if(event.key ==='Enter')
    {
        // prevent default settings
        event.preventDefault()
        document.getElementById('myButton').click()
    }

})

input2.addEventListener('keypress', function(event) {
    
    if(event.key ==='Enter')
    {
        // prevent default settings
        event.preventDefault()
        document.getElementById('myButton').click()
    }

})

function gcd ()
{
    var  input1 = document.getElementById('number1').value
    var  input2 = document.getElementById('number2').value
    console.log (input1 + " " + input2)
    if (isNaN(parseInt(input1,10)) || isNaN(parseInt(input2,10)) )
        {
            var result = document.getElementById('result')
            result.innerHTML =  "NIEPRAWIDŁOWA LICZBA"
            result.style.color = "red"
        }

    else
        {
            var c = 0
            while( input2!=0)
                {
                    c= input1 % input2
                    input1=input2
                    input2=c
                }
            
            document.getElementById('result').innerHTML = input1 
        }
}

// CLEAR INPUT AND RESULT
function clearFields()
{
    // document.getElementById('number1').value=''
    // document.getElementById('number2').value=''
    document.getElementById('result').innerHTML=''

}