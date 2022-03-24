function displayTime(){
    var dateTime = new Date();
    var hrss = dateTime.getHours(); 
    var mins = dateTime.getMinutes(); 
    var secs = dateTime.getSeconds(); 
    var periods = document.getElementById('period');


    
    document.getElementById('hours').innerHTML = hrss;
    document.getElementById('minutes').innerHTML = mins;
    document.getElementById('seconds').innerHTML = secs;
}
  setInterval(displayTime, 10);

