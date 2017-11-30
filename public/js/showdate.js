var dt = new Date();
let min = dt.getMinutes();
if (min < 10) {
    let stringMin = min.toString();
    zeroString = '0'+ stringMin;
    min = stringMin;
};

let dates = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate() + '<br>' + dt.getHours() + ':' + min;
let text = document.getElementById('homeWelcomeinfo');
text.innerHTML = dates;
console.log('hello');