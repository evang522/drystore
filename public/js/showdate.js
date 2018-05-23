'use strict';

// This exists to display the current time on the homepage. 


const setTime = () => {
  let timeP = new Date();
  let zeroVar = timeP.getMinutes().toString();
  if (zeroVar.length === 1) {
    zeroVar = '0' + zeroVar;
  }
  let text = document.getElementById('homeWelcomeinfo');

  let message = `${timeP.toDateString()} <br> ${timeP.getHours()}:${zeroVar}`;
  text.innerHTML = message;
};
setTime();
setInterval(setTime, 5000);