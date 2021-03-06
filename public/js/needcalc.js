'use strict';

// Global Variables


// make life easier
let gebi = (id) => {
  return document.getElementById(id);
};


// This is the entire function -- executes on button click
let getAnalytics = () => {

  let people = gebi('people').value;

  // Grabbing the specified percentage value on the DOM for each food. These are hard coded into the HTML, but are customizable from the browser

  let bmeal1Perc = (gebi('bmeal1').value.replace('%','') / 100);
  let bmeal2Perc = (gebi('bmeal2').value.replace('%','') / 100);
  let bmeal3Perc = (gebi('bmeal3').value.replace('%','') / 100);
  let bmeal4Perc = (gebi('bmeal4').value.replace('%','') / 100);
  let bmeal5Perc = (gebi('bmeal5').value.replace('%','') / 100);

  let lmeal1Perc = (gebi('lmeal1').value.replace('%','') / 100);
  let lmeal2Perc = (gebi('lmeal2').value.replace('%','') / 100);
  let lmeal3Perc = (gebi('lmeal3').value.replace('%','') / 100);

  let dmeal1Perc = (gebi('dmeal1').value.replace('%','') / 100);
  let dmeal2Perc = (gebi('dmeal2').value.replace('%','') / 100);
  let dmeal3Perc = (gebi('dmeal3').value.replace('%','') / 100);
  let dmeal4Perc = (gebi('dmeal4').value.replace('%','') / 100);
  let dmeal5Perc = (gebi('dmeal5').value.replace('%','') / 100);



  // Objects Representing the specified meals available. These generally will not change, but they do grab the percentage value specified from the input fields on the
  // calc page

  let breakfast = {
    meal1: {
      eggs: .5,
      fruit: .5,
      freq: bmeal1Perc
    },
    meal2: {
      oats:1,
      fruit:.25,
      freq:bmeal2Perc,
    }, meal3: {
      oats:.5,
      yogurt:.5,
      freq:bmeal3Perc
    }, meal4: {
      granola:.5,
      milk:.5,
      freq:bmeal4Perc
    }, meal5: {
      breakfastDrink:1,
      freq:bmeal5Perc
    }
  };

  let lunch = {
    meal1: {
      beans: .5,
      rice: .5,
      vegetable: .5,
      freq:lmeal1Perc
    },meal2: {
      beans:.5,
      pasta:.5,
      vegetable:.5,
      freq:lmeal2Perc
    }, meal3: {
      soup:1,
      cracker:1,
      freq:lmeal3Perc
    }
  };


  let dinner = {
    meal1: {
      ewm: 1,
      vegetable: .5,
      freq: dmeal1Perc
    },
    meal2: {
      enm:1,
      vegetable:.5,
      freq:dmeal2Perc
    }, meal3: {
      meatOnly:.75,
      rice:.5,
      vegetable:.5,
      sauceGravy: .25,
      freq:dmeal3Perc
    }, meal4: {
      meatOnly:.75,
      pasta:.5,
      vegetable:.5,
      sauceGravy: .25,
      freq:dmeal4Perc
    }, meal5: {
      meatOnly:.75,
      potato:.5,
      vegetable:.5,
      sauceGravy: .25,
      freq:dmeal5Perc
    }
  };






  // Creates a key array from the object specified, then iterates through the keys of the object. If the key contains the food specified
  // it will grab the food's cup amount and multiply it by the percentage needed per year, then add it to a provided variable for the total amount of that
  // food needed for one person for one day.


  let makeTotalNeeded = (breakfast,lunch,dinner,typeOfFood) => {
    let totalNeeded = 0;
    let dinnerValues = Object.keys(dinner);
    for(let i=0;i<dinnerValues.length;i++) {
      if (dinner[dinnerValues[i]][typeOfFood]) {
        totalNeeded += dinner[dinnerValues[i]][typeOfFood] * dinner[dinnerValues[i]].freq;
      }
    }
    let lunchValues = Object.keys(lunch);
    for(let i=0;i<lunchValues.length;i++) {
      if (lunch[lunchValues[i]][typeOfFood]) {
        totalNeeded += lunch[lunchValues[i]][typeOfFood] * lunch[lunchValues[i]].freq;
      }
    }
    let breakfastValues = Object.keys(breakfast);
    for(let i=0;i<breakfastValues.length;i++) {
      if (breakfast[breakfastValues[i]][typeOfFood]) {
        totalNeeded += breakfast[breakfastValues[i]][typeOfFood] * breakfast[breakfastValues[i]].freq;
      }
    }
    return totalNeeded;
  };


  // Define Function to extrapolate food daily percentages to yearly for the specified amount of people
  let calcTotalNeeds = (food) => {
    let midVar = food * people * 365;
    return (midVar.toFixed(3) + ' Cups');
  };

  // This section produces the total amount of the specified food called for in a day multiplied by the percentage of days per year it is eaten


  let testVar = makeTotalNeeded(breakfast,lunch,dinner,'vegetable');
  //   console.log('results of test function: ' + (testVar * 6 * 365));


  let totalewm = calcTotalNeeds(makeTotalNeeded(breakfast,lunch,dinner,'ewm'));
  let totalSauceGravy = calcTotalNeeds(makeTotalNeeded(breakfast,lunch,dinner,'sauceGravy'));
  let totalMeatOnly = calcTotalNeeds(makeTotalNeeded(breakfast,lunch,dinner,'meatOnly'));
  let totalbreakfastDrink = calcTotalNeeds(makeTotalNeeded(breakfast,lunch,dinner,'breakfastDrink'));
  let totalOats = calcTotalNeeds(makeTotalNeeded(breakfast,lunch,dinner,'oats'));
  let totalpotato = calcTotalNeeds(makeTotalNeeded(breakfast,lunch,dinner,'potato'));
  let totalFruit = calcTotalNeeds(makeTotalNeeded(breakfast,lunch,dinner,'fruit'));
  let totalEggs = calcTotalNeeds(makeTotalNeeded(breakfast,lunch,dinner,'eggs'));
  let totalCracker = calcTotalNeeds(makeTotalNeeded(breakfast,lunch,dinner,'cracker'));
  let totalYogurt = calcTotalNeeds(makeTotalNeeded(breakfast,lunch,dinner,'yogurt'));
  let totalSoup = calcTotalNeeds(makeTotalNeeded(breakfast,lunch,dinner,'soup'));
  let totalPasta = calcTotalNeeds(makeTotalNeeded(breakfast,lunch,dinner,'pasta'));
  let totalRice = calcTotalNeeds(makeTotalNeeded(breakfast,lunch,dinner,'rice'));
  let totalBeans = calcTotalNeeds(makeTotalNeeded(breakfast,lunch,dinner,'beans'));
  let totalVeg = calcTotalNeeds(makeTotalNeeded(breakfast,lunch,dinner,'vegetable'));
  let totalenm = calcTotalNeeds(makeTotalNeeded(breakfast,lunch,dinner,'enm'));
  let totalGranola = calcTotalNeeds(makeTotalNeeded(breakfast,lunch,dinner,'granola'));
  let totalMilk = calcTotalNeeds(makeTotalNeeded(breakfast,lunch,dinner,'milk'));


  // Grab need field by ID
  let ewmFieldNeed = gebi('ewmTotalNeedTarg');
  let sauceGravyFieldNeed = gebi('sauceGravyTotalNeedTarg');
  let meatOnlyFieldNeed = gebi('meatOnlyTotalNeedTarg');
  let breakfastDrinkFieldNeed = gebi('bfastDrinkTotalNeedTarg');
  let oatsFieldNeed = gebi('oatsTotalNeedTarg');
  let potatoFieldNeed = gebi('potatoTotalNeedTarg');
  let fruitFieldNeed = gebi('fruitTotalNeedTarg');
  let eggFieldNeed = gebi('eggTotalNeedTarg');
  let crackerFieldNeed = gebi('crackerTotalNeedTarg');
  let yogurtFieldNeed = gebi('yogurtTotalNeedTarg');
  let soupFieldNeed = gebi('soupTotalNeedTarg');
  let pastaFieldNeed = gebi('pastaTotalNeedTarg');
  let riceFieldNeed = gebi('riceTotalNeedTarg');
  let beansFieldNeed = gebi('beansTotalNeedTarg');
  let vegFieldNeed = gebi('vegTotalNeedTarg');
  let enmFieldNeed = gebi('enmTotalNeedTarg');
  let granolaFieldNeed = gebi('granolaTotalNeedTarg');
  let milkFieldNeed = gebi('milkTotalNeedTarg');
  // Interpolate values to need fields

  ewmFieldNeed.innerHTML = totalewm;
  sauceGravyFieldNeed.innerHTML = totalSauceGravy;
  meatOnlyFieldNeed.innerHTML = totalMeatOnly;
  breakfastDrinkFieldNeed.innerHTML = totalbreakfastDrink;
  oatsFieldNeed.innerHTML = totalOats;
  potatoFieldNeed.innerHTML = totalpotato;
  fruitFieldNeed.innerHTML = totalFruit;
  eggFieldNeed.innerHTML = totalEggs;
  crackerFieldNeed.innerHTML = totalCracker;
  yogurtFieldNeed.innerHTML = totalYogurt;
  soupFieldNeed.innerHTML = totalSoup;
  pastaFieldNeed.innerHTML = totalPasta;
  riceFieldNeed.innerHTML = totalRice;
  beansFieldNeed.innerHTML = totalBeans;
  vegFieldNeed.innerHTML = totalVeg;
  enmFieldNeed.innerHTML = totalenm;
  granolaFieldNeed.innerHTML = totalGranola;
  milkFieldNeed.innerHTML = totalMilk;




  let eggAvailTar = gebi('eggAvailTarg');
  let fruitAvailTar = gebi('fruitAvailTarg');
  let oatsAvailTar = gebi('oatsAvailTarg');
  let milkAvailTar = gebi('milkAvailTarg');
  let yogurtAvailTar = gebi('yogurtAvailTarg');
  let granolaAvailTar = gebi('granolaAvailTarg');
  let bfastDrinkAvailTar = gebi('bfastDrinkAvailTarg');
  let beansAvailTar = gebi('beansAvailTarg');
  let pastaAvailTar = gebi('pastaAvailTarg');
  let riceAvailTar = gebi('riceAvailTarg');
  let vegAvailTar = gebi('vegAvailTarg');
  let soupAvailTar = gebi('soupAvailTarg');
  let crackerAvailTar = gebi('crackerAvailTarg');
  let ewmAvailTar = gebi('ewmAvailTarg');
  let enmAvailTar = gebi('enmAvailTarg');
  let meatOnlyAvailTar = gebi('meatOnlyAvailTarg');
  let potatoAvailTar = gebi('potatoAvailTarg');
  let sauceGravyAvailTar = gebi('sauceGravyAvailTarg');

  let eggDef = gebi('eggDef');
  let fruitDef = gebi('fruitDef');
  let oatsDef = gebi('oatsDef');
  let milkDef = gebi('milkDef');
  let yogurtDef = gebi('yogurtDef');
  let granolaDef = gebi('granolaDef');
  let bfastDrinkDef = gebi('bfastDrinkDef');
  let beansDef = gebi('beansDef');
  let pastaDef = gebi('pastaDef');
  let riceDef = gebi('riceDef');
  let vegDef = gebi('vegDef');
  let soupDef = gebi('soupDef');
  let crackerDef = gebi('crackerDef');
  let ewmDef = gebi('ewmDef');
  let enmDef = gebi('enmDef');
  let meatOnlyDef = gebi('meatOnlyDef');
  let potatoDef = gebi('potatoDef');
  let sauceGravyDef = gebi('sauceGravyDef');



  eggDef.innerHTML = (parseFloat(eggFieldNeed.innerHTML)   - parseFloat(eggAvailTar.innerHTML)).toFixed(3) + ' Cups';
  fruitDef.innerHTML =  (parseFloat(fruitFieldNeed.innerHTML) - parseFloat(fruitAvailTar.innerHTML)).toFixed(3) + ' Cups';   
  oatsDef.innerHTML = (parseFloat(oatsFieldNeed.innerHTML)  - parseFloat(oatsAvailTar.innerHTML)).toFixed(3) + ' Cups';   
  milkDef.innerHTML = (parseFloat(milkFieldNeed.innerHTML)  - parseFloat(milkAvailTar.innerHTML)).toFixed(3) + ' Cups';   
  yogurtDef.innerHTML =   (parseFloat(yogurtFieldNeed.innerHTML) - parseFloat(yogurtAvailTar.innerHTML)).toFixed(3) + ' Cups'; 
  granolaDef.innerHTML =     (parseFloat(granolaFieldNeed.innerHTML) - parseFloat(granolaAvailTar.innerHTML)).toFixed(3) + ' Cups';   
  bfastDrinkDef.innerHTML =       (parseFloat(breakfastDrinkFieldNeed.innerHTML) - parseFloat(bfastDrinkAvailTar.innerHTML)).toFixed(3) + ' Cups';       
  beansDef.innerHTML =  (parseFloat(beansFieldNeed.innerHTML) - parseFloat(beansAvailTar.innerHTML)).toFixed(3) + ' Cups';     
  pastaDef.innerHTML =  (parseFloat(pastaFieldNeed.innerHTML) - parseFloat(pastaAvailTar.innerHTML)).toFixed(3) + ' Cups';    
  riceDef.innerHTML = (parseFloat(riceFieldNeed.innerHTML)  - parseFloat(riceAvailTar.innerHTML)).toFixed(3) + ' Cups';       
  vegDef.innerHTML =      (parseFloat(vegFieldNeed.innerHTML) - parseFloat(vegAvailTar.innerHTML)).toFixed(3) + ' Cups';         
  soupDef.innerHTML = (parseFloat(soupFieldNeed.innerHTML)  - parseFloat(soupAvailTar.innerHTML)).toFixed(3) + ' Cups';     
  crackerDef.innerHTML =    (parseFloat(crackerFieldNeed.innerHTML) - parseFloat(crackerAvailTar.innerHTML)).toFixed(3) + ' Cups'; 
  ewmDef.innerHTML = (parseFloat(ewmFieldNeed.innerHTML)  - parseFloat(ewmAvailTar.innerHTML)).toFixed(3) + ' Cups';   
  enmDef.innerHTML = (parseFloat(enmFieldNeed.innerHTML) - parseFloat(enmAvailTar.innerHTML)).toFixed(3) + ' Cups';   
  meatOnlyDef.innerHTML = (parseFloat(meatOnlyFieldNeed.innerHTML) - parseFloat(meatOnlyAvailTar.innerHTML)).toFixed(3) + ' Cups';   
  potatoDef.innerHTML =   (parseFloat(potatoFieldNeed.innerHTML)  - parseFloat(potatoAvailTar.innerHTML)).toFixed(3) + ' Cups';    
  sauceGravyDef.innerHTML =       (parseFloat(sauceGravyFieldNeed.innerHTML) - parseFloat(sauceGravyAvailTar.innerHTML)).toFixed(3) + ' Cups';

};

let calculateDays = () => {
// Getting percent info for calculating Days
  let bmeal1Perc = (gebi('bmeal1').value.replace('%','') / 100);
  let bmeal2Perc = (gebi('bmeal2').value.replace('%','') / 100);
  let bmeal3Perc = (gebi('bmeal3').value.replace('%','') / 100);
  let bmeal4Perc = (gebi('bmeal4').value.replace('%','') / 100);
  let bmeal5Perc = (gebi('bmeal5').value.replace('%','') / 100);

  let lmeal1Perc = (gebi('lmeal1').value.replace('%','') / 100);
  let lmeal2Perc = (gebi('lmeal2').value.replace('%','') / 100);
  let lmeal3Perc = (gebi('lmeal3').value.replace('%','') / 100);

  let dmeal1Perc = (gebi('dmeal1').value.replace('%','') / 100);
  let dmeal2Perc = (gebi('dmeal2').value.replace('%','') / 100);
  let dmeal3Perc = (gebi('dmeal3').value.replace('%','') / 100);
  let dmeal4Perc = (gebi('dmeal4').value.replace('%','') / 100);
  let dmeal5Perc = (gebi('dmeal5').value.replace('%','') / 100);

  // function to populate days field;

  let bmeal1ResDay = gebi('bmeal1ResDay');
  let bmeal2ResDay = gebi('bmeal2ResDay');
  let bmeal3ResDay = gebi('bmeal3ResDay');
  let bmeal4ResDay = gebi('bmeal4ResDay');
  let bmeal5ResDay = gebi('bmeal5ResDay');

  let lmeal1ResDay = gebi('lmeal1ResDay');
  let lmeal2ResDay = gebi('lmeal2ResDay');
  let lmeal3ResDay = gebi('lmeal3ResDay');


  let dmeal1ResDay = gebi('dmeal1ResDay');
  let dmeal2ResDay = gebi('dmeal2ResDay');
  let dmeal3ResDay = gebi('dmeal3ResDay');
  let dmeal4ResDay = gebi('dmeal4ResDay');
  let dmeal5ResDay = gebi('dmeal5ResDay');

  bmeal1ResDay.value = (bmeal1Perc * 365).toFixed(3);
  bmeal2ResDay.value = (bmeal2Perc * 365).toFixed(3);
  bmeal3ResDay.value = (bmeal3Perc * 365).toFixed(3);
  bmeal4ResDay.value = (bmeal4Perc * 365).toFixed(3);
  bmeal5ResDay.value = (bmeal5Perc * 365).toFixed(3);

  lmeal1ResDay.value = (lmeal1Perc * 365).toFixed(3);
  lmeal2ResDay.value = (lmeal2Perc * 365).toFixed(3);
  lmeal3ResDay.value = (lmeal3Perc * 365).toFixed(3);

  dmeal1ResDay.value = (dmeal1Perc * 365).toFixed(3);
  dmeal2ResDay.value = (dmeal2Perc * 365).toFixed(3);
  dmeal3ResDay.value = (dmeal3Perc * 365).toFixed(3);
  dmeal4ResDay.value = (dmeal4Perc * 365).toFixed(3);
  dmeal5ResDay.value = (dmeal5Perc * 365).toFixed(3);



};


    

// Throws an error if the percentages in the DOM do not add up to 100%
let checkPercentageSums = () => {
  // Getting percent info for calculating Days
  let bmeal1Perc = (gebi('bmeal1').value.replace('%','') / 100);
  let bmeal2Perc = (gebi('bmeal2').value.replace('%','') / 100);
  let bmeal3Perc = (gebi('bmeal3').value.replace('%','') / 100);
  let bmeal4Perc = (gebi('bmeal4').value.replace('%','') / 100);
  let bmeal5Perc = (gebi('bmeal5').value.replace('%','') / 100);
    
  let lmeal1Perc = (gebi('lmeal1').value.replace('%','') / 100);
  let lmeal2Perc = (gebi('lmeal2').value.replace('%','') / 100);
  let lmeal3Perc = (gebi('lmeal3').value.replace('%','') / 100);
    
  let dmeal1Perc = (gebi('dmeal1').value.replace('%','') / 100);
  let dmeal2Perc = (gebi('dmeal2').value.replace('%','') / 100);
  let dmeal3Perc = (gebi('dmeal3').value.replace('%','') / 100);
  let dmeal4Perc = (gebi('dmeal4').value.replace('%','') / 100);
  let dmeal5Perc = (gebi('dmeal5').value.replace('%','') / 100);



  if (!((bmeal1Perc + bmeal2Perc + bmeal3Perc + bmeal4Perc + bmeal5Perc) > .998877 && (bmeal1Perc + bmeal2Perc + bmeal3Perc + bmeal4Perc + bmeal5Perc < 1.00111111))) {
    // alert('Sorry, cannot continue! Breakfast percentages don\'t add up to 100%. You can understand why this may cause some problems.');
    $('.js-percentWarning-breakfast').removeClass('invisible');
  }

  if (!((lmeal1Perc + lmeal2Perc + lmeal3Perc) > .998877 && (lmeal1Perc + lmeal2Perc + lmeal3Perc < 1.00011111))) {
    // alert('Sorry, cannot continue! Lunch percentages don\'t add up to 100%. You can understand why this may cause some problems.');
    $('.js-percentWarning-lunch').removeClass('invisible');
  }

  if (!((dmeal1Perc + dmeal2Perc + dmeal3Perc + dmeal4Perc + dmeal5Perc) > .998877 && (dmeal1Perc + dmeal2Perc + dmeal3Perc + dmeal4Perc + dmeal5Perc < 1.00011111))) {
    // alert('Sorry, cannot continue! Dinner percentages don\'t add up to 100%. You can understand why this may cause some problems.');
    $('.js-percentWarning-dinner').removeClass('invisible');
  }

    


  if (((bmeal1Perc + bmeal2Perc + bmeal3Perc + bmeal4Perc + bmeal5Perc) > .998877 && (bmeal1Perc + bmeal2Perc + bmeal3Perc + bmeal4Perc + bmeal5Perc < 1.00111111))) {
    // alert('Sorry, cannot continue! Breakfast percentages don\'t add up to 100%. You can understand why this may cause some problems.');
    $('.js-percentWarning-breakfast').addClass('invisible');
  }

  if (((lmeal1Perc + lmeal2Perc + lmeal3Perc) > .998877 && (lmeal1Perc + lmeal2Perc + lmeal3Perc < 1.00011111))) {
    // alert('Sorry, cannot continue! Lunch percentages don\'t add up to 100%. You can understand why this may cause some problems.');
    $('.js-percentWarning-lunch').addClass('invisible');
  }

  if (((dmeal1Perc + dmeal2Perc + dmeal3Perc + dmeal4Perc + dmeal5Perc) > .998877 && (dmeal1Perc + dmeal2Perc + dmeal3Perc + dmeal4Perc + dmeal5Perc < 1.00011111))) {
    // alert('Sorry, cannot continue! Dinner percentages don\'t add up to 100%. You can understand why this may cause some problems.');
    $('.js-percentWarning-dinner').addClass('invisible');
  }
};

// Event Triggers
setInterval(checkPercentageSums,1200);
calculateDays();
setInterval(calculateDays,1200);
getAnalytics();
$('#trig').click(getAnalytics);