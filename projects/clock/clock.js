window.onload = function(){

    setInterval( function()  {

        let time = new Date();
        let day = time.getDate();
        let month = time.getMonth() + 1; // zwraca wart styczen = 0, luty = 1 itd
        let year = time.getFullYear();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();
        let miliseconds = time.getMilliseconds();

        if(hours<10) {
            hours = "0" + hours;
        }

        if(minutes<10) {
            minutes = "0" + minutes;
        }

        if(seconds<10) {
            seconds = "0" + seconds;
        }

        if(day<10) {
            day = "0" + day;
        }

        if(month<10) {
            month = "0" + month;
        }

       let digClock  =  document.querySelector("#clock"); 
        digClock.innerHTML = day +"." + month +"."+ year + " " + hours + ":"+ minutes + ":" + seconds;

    }   
    ,100);
}

