//         // wczytanie wymiaru tablicy z inputboxa i stworzenie tablicy
//         // stworzenie tablicy dynamicznej A do podziorów
//         // zapisanie do trzeciej tablicy wyników aktualnego podzbioru A
//         // usuwanie i dodawanie elemtnów wg algorytmu
//         // wyświetlenie tablicy3


function createSubsets (){
   
    // read fixed dimension
    var dim = document.getElementById("number").value
         
    // main set 
    var  setArray = new Array(dim)

    fillSetArray(dim,setArray)
      
    //temp subset table
    var subsetTemp  = []

    //output subsets array
    var  subsetsArray =  []

    subsets(dim,setArray,subsetTemp,subsetsArray)

    showResults(subsetsArray)
}


//SEARCHING SUBSETS
function  subsets(dim,setArray,subsetTemp,subsetsArray)      

{
        var doing  = true

        while (doing)

        {
            var maxItem = -1

            for ( var i = 0; i < dim; i++ )
            {
                if (maxItem < setArray[i] && subsetTemp.indexOf( setArray[i] ) == -1)
                    
                {
                    maxItem = setArray[i]
                }
            }
           
            console.log('maxitem = ' + maxItem)

            if (maxItem!=-1)
            {
            
                //ADD TO SET A NEW ELEMENT
                subsetTemp.push(maxItem)
                  

               //REMOVE ALL GREATER ITEMS  
               var i = 0  
               while (i< subsetTemp.length)

               {
                    if (maxItem<subsetTemp[i])
                    {
                        console.log('usunięto ' + subsetTemp[i] + " dł " +  subsetTemp.length )
                        subsetTemp.splice(i,1)
                        i=0
                    }
                    else
                    {
                        i++
                    }
               }
               
               subsetTemp.sort() 
               subsetTemp.reverse() 
               
                //PASS SUBSET TO RESULTS ARRAY
                addRecord(subsetTemp,subsetsArray)

            }

            // END OF WHILE
            else
            {
                doing = false
            }
        }

   
}

// SHOWING RESULTS
function showResults(subsetsArray)
{
    const para = document.createElement("p")
    const node = document.createTextNode(1 + " element " + " \u2205")
    para.appendChild(node)
    const element = document.getElementById('result')
    element.innerText = "liczba elementów: " + (subsetsArray.length + 1)
    element.appendChild(para)

    for (var k = 0; k<subsetsArray.length ; k++)
    {
        const para = document.createElement("p")
        const node = document.createTextNode(k+2 + " element " + subsetsArray[k])
        para.appendChild(node)
        const element = document.getElementById('result')
        element.appendChild(para)
    }
}
// array results
function addRecord(subsetTemp,subsetsArray)
{
    var setItem =''

    for (var k = 0; k< subsetTemp.length ;k++)
    {
        setItem =  subsetTemp[k] + ',' + setItem  
    }

    setItem = setItem.substring(0,setItem.length-1)
    setItem = '{' + setItem + '}'
    subsetsArray.push(setItem)
}

// FILL SETARRAY
function fillSetArray(dim, tbl)
{
   
    for (var i = 0; i < dim; i++)    
    {
        tbl[i]=i+1
    }
}

 // CLEAR INPUT AND RESULT
 function clearFields()
 {
     document.getElementById('number').value=''
     document.getElementById('result').innerHTML=''
 
 }


 
const pseudocode = document.querySelector("#pseudocode");
pseudocode.innerText = `
    PROCEDURE subset(n)
    PRINT A = { &#8709; }
      a: = max { 1 <= i <= n, i &notin; A }
        if a== &#8709; then 
            RETURN

        else
            usuwamy z A wszystkie elementy większe od a i dodajemy A
            PRINT A
`  
 