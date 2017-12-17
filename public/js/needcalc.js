'use strict';

// Global Variables

// make life easier
let gebi = (id) => {
    return document.getElementById(id);
}


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


// Throws an error if the percentages in the DOM do not add up to 100%
if (!((bmeal1Perc + bmeal2Perc + bmeal3Perc + bmeal4Perc + bmeal5Perc) > .998877 && (bmeal1Perc + bmeal2Perc + bmeal3Perc + bmeal4Perc + bmeal5Perc < 1.00011111))) {
    alert('Sorry, cannot continue! Breakfast percentages don\'t add up to 100%. You can understand why this may cause some problems.');
}

if (!((lmeal1Perc + lmeal2Perc + lmeal3Perc) > .998877 && (lmeal1Perc + lmeal2Perc + lmeal3Perc < 1.00011111))) {
    alert('Sorry, cannot continue! Lunch percentages don\'t add up to 100%. You can understand why this may cause some problems.');
}

if (!((dmeal1Perc + dmeal2Perc + dmeal3Perc + dmeal4Perc + dmeal5Perc) > .998877 && (dmeal1Perc + dmeal2Perc + dmeal3Perc + dmeal4Perc + dmeal5Perc < 1.00011111))) {
    alert('Sorry, cannot continue! Dinner percentages don\'t add up to 100%. You can understand why this may cause some problems.');
}


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
        breakfastDrink:.5,
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
        pasta:.25,
        vegetable:.5,
        freq:lmeal2Perc
    }, meal3: {
        soup:1,
        cracker:2,
        freq:lmeal3Perc
    }
};


let dinner = {
    meal1: {
        ewm: .5,
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
        potato:.25,
        sauceGravy: .25,
        freq:dmeal5Perc
    }
};






// Creates a key array from the object specified, then iterates through the keys of the object. If the key contains the food specified
// it will grab the food's cup amount and multiply it by the percentage needed per year, then add it to a provided variable for the total amount of that
// food needed for one person for one day.

let makeTotalNeededVegetables = (breakfast,lunch,dinner) => {
let totalNeeded = 0;
let dinnerValues = Object.keys(dinner);
for(let i=0;i<dinnerValues.length;i++) {
    if (dinner[dinnerValues[i]].vegetable) {
        totalNeeded += dinner[dinnerValues[i]].vegetable * dinner[dinnerValues[i]].freq;
    }
}
let lunchValues = Object.keys(lunch);
for(let i=0;i<lunchValues.length;i++) {
    if (lunch[lunchValues[i]].vegetable) {
        totalNeeded += lunch[lunchValues[i]].vegetable * lunch[lunchValues[i]].freq;
    }
}
let breakfastValues = Object.keys(breakfast);
for(let i=0;i<breakfastValues.length;i++) {
    if (breakfast[breakfastValues[i]].vegetable) {
        totalNeeded += breakfast[breakfastValues[i]].vegetable * breakfast[breakfastValues[i]].freq;
    }
}
return totalNeeded;
}

let makeTotalNeededMilk = (breakfast,lunch,dinner) => {
let totalNeeded = 0;
let dinnerValues = Object.keys(dinner);
for(let i=0;i<dinnerValues.length;i++) {
    if (dinner[dinnerValues[i]].milk) {
        totalNeeded += dinner[dinnerValues[i]].milk * dinner[dinnerValues[i]].freq;
    }
}
let lunchValues = Object.keys(lunch);
for(let i=0;i<lunchValues.length;i++) {
    if (lunch[lunchValues[i]].milk) {
        totalNeeded += lunch[lunchValues[i]].milk * lunch[lunchValues[i]].freq;
    }
}
let breakfastValues = Object.keys(breakfast);
for(let i=0;i<breakfastValues.length;i++) {
    if (breakfast[breakfastValues[i]].milk) {
        totalNeeded += breakfast[breakfastValues[i]].milk * breakfast[breakfastValues[i]].freq;
    }
}
return totalNeeded;
}

let makeTotalNeededGranola = (breakfast,lunch,dinner) => {
let totalNeeded = 0;
let dinnerValues = Object.keys(dinner);
for(let i=0;i<dinnerValues.length;i++) {
    if (dinner[dinnerValues[i]].granola) {
        totalNeeded += dinner[dinnerValues[i]].granola * dinner[dinnerValues[i]].freq;
    }
}
let lunchValues = Object.keys(lunch);
for(let i=0;i<lunchValues.length;i++) {
    if (lunch[lunchValues[i]].granola) {
        totalNeeded += lunch[lunchValues[i]].granola * lunch[lunchValues[i]].freq;
    }
}
let breakfastValues = Object.keys(breakfast);
for(let i=0;i<breakfastValues.length;i++) {
    if (breakfast[breakfastValues[i]].granola) {
        totalNeeded += breakfast[breakfastValues[i]].granola * breakfast[breakfastValues[i]].freq;
    }
}
return totalNeeded;
}

let makeTotalNeededENM= (breakfast,lunch,dinner) => {
    let totalNeeded = 0;
    let dinnerValues = Object.keys(dinner);
    for(let i=0;i<dinnerValues.length;i++) {
        if (dinner[dinnerValues[i]].enm) {
            totalNeeded += dinner[dinnerValues[i]].enm * dinner[dinnerValues[i]].freq;
        }
    }
    let lunchValues = Object.keys(lunch);
    for(let i=0;i<lunchValues.length;i++) {
        if (lunch[lunchValues[i]].enm) {
            totalNeeded += lunch[lunchValues[i]].enm * lunch[lunchValues[i]].freq;
        }
    }
    let breakfastValues = Object.keys(breakfast);
    for(let i=0;i<breakfastValues.length;i++) {
        if (breakfast[breakfastValues[i]].enm) {
            totalNeeded += breakfast[breakfastValues[i]].enm * breakfast[breakfastValues[i]].freq;
        }
    }
    return totalNeeded;
    }
    
    
let makeTotalNeededEntree = (breakfast,lunch,dinner) => {
    let totalNeeded = 0;
    let dinnerValues = Object.keys(dinner);
    for(let i=0;i<dinnerValues.length;i++) {
        if (dinner[dinnerValues[i]].entree) {
            totalNeeded += dinner[dinnerValues[i]].entree  * dinner[dinnerValues[i]].freq;
        }
    }
    let lunchValues = Object.keys(lunch);
    for(let i=0;i<lunchValues.length;i++) {
        if (lunch[lunchValues[i]].entree) {
            totalNeeded += lunch[lunchValues[i]].entree * lunch[lunchValues[i]].freq;
        }
    }
    let breakfastValues = Object.keys(breakfast);
    for(let i=0;i<breakfastValues.length;i++) {
        if (breakfast[breakfastValues[i]].entree) {
            totalNeeded += breakfast[breakfastValues[i]].entree * breakfast[breakfastValues[i]].freq;
        }
    }
    return totalNeeded;
    }


let makeTotalNeededBeans = (breakfast,lunch,dinner) => {
    let totalNeeded = 0;
    let dinnerValues = Object.keys(dinner);
    for(let i=0;i<dinnerValues.length;i++) {
        if (dinner[dinnerValues[i]].beans) {
            totalNeeded += dinner[dinnerValues[i]].beans  * dinner[dinnerValues[i]].freq;
        }
    }
    let lunchValues = Object.keys(lunch);
    for(let i=0;i<lunchValues.length;i++) {
        if (lunch[lunchValues[i]].beans) {
            totalNeeded += lunch[lunchValues[i]].beans * lunch[lunchValues[i]].freq;
        }
    }
    let breakfastValues = Object.keys(breakfast);
    for(let i=0;i<breakfastValues.length;i++) {
        if (breakfast[breakfastValues[i]].beans) {
            totalNeeded += breakfast[breakfastValues[i]].beans * breakfast[breakfastValues[i]].freq;
        }
    }
    return totalNeeded;
}

let makeTotalNeededRice = (breakfast,lunch,dinner) => {
    let totalNeeded = 0;
    let dinnerValues = Object.keys(dinner);
    for(let i=0;i<dinnerValues.length;i++) {
        if (dinner[dinnerValues[i]].rice) {
            totalNeeded += dinner[dinnerValues[i]].rice  * dinner[dinnerValues[i]].freq;
        }
    }
    let lunchValues = Object.keys(lunch);
    for(let i=0;i<lunchValues.length;i++) {
        if (lunch[lunchValues[i]].rice) {
            totalNeeded += lunch[lunchValues[i]].rice * lunch[lunchValues[i]].freq;
        }
    }
    let breakfastValues = Object.keys(breakfast);
    for(let i=0;i<breakfastValues.length;i++) {
        if (breakfast[breakfastValues[i]].rice) {
            totalNeeded += breakfast[breakfastValues[i]].rice * breakfast[breakfastValues[i]].freq;
        }
    }
    return totalNeeded;
}

let makeTotalNeededPasta = (breakfast,lunch,dinner) => {
    let totalNeeded = 0;
    let dinnerValues = Object.keys(dinner);
    for(let i=0;i<dinnerValues.length;i++) {
        if (dinner[dinnerValues[i]].pasta) {
            totalNeeded += dinner[dinnerValues[i]].pasta  * dinner[dinnerValues[i]].freq;
        }
    }
    let lunchValues = Object.keys(lunch);
    for(let i=0;i<lunchValues.length;i++) {
        if (lunch[lunchValues[i]].pasta) {
            totalNeeded += lunch[lunchValues[i]].pasta * lunch[lunchValues[i]].freq;
        }
    }
    let breakfastValues = Object.keys(breakfast);
    for(let i=0;i<breakfastValues.length;i++) {
        if (breakfast[breakfastValues[i]].pasta) {
            totalNeeded += breakfast[breakfastValues[i]].pasta * breakfast[breakfastValues[i]].freq;
        }
    }
    return totalNeeded;
}

let makeTotalNeededSoup = (breakfast,lunch,dinner) => {
    let totalNeeded = 0;
    let dinnerValues = Object.keys(dinner);
    for(let i=0;i<dinnerValues.length;i++) {
        if (dinner[dinnerValues[i]].soup) {
            totalNeeded += dinner[dinnerValues[i]].soup * dinner[dinnerValues[i]].freq;
        }
    }
    let lunchValues = Object.keys(lunch);
    for(let i=0;i<lunchValues.length;i++) {
        if (lunch[lunchValues[i]].soup) {
            totalNeeded += lunch[lunchValues[i]].soup * lunch[lunchValues[i]].freq;
        }
    }
    let breakfastValues = Object.keys(breakfast);
    for(let i=0;i<breakfastValues.length;i++) {
        if (breakfast[breakfastValues[i]].soup) {
            totalNeeded += breakfast[breakfastValues[i]].soup * breakfast[breakfastValues[i]].freq;
        }
    }
    return totalNeeded;
}

let makeTotalNeededYogurt = (breakfast,lunch,dinner) => {
    let totalNeeded = 0;
    let dinnerValues = Object.keys(dinner);
    for(let i=0;i<dinnerValues.length;i++) {
        if (dinner[dinnerValues[i]].yogurt) {
            totalNeeded += dinner[dinnerValues[i]].yogurt  * dinner[dinnerValues[i]].freq;
        }
    }
    let lunchValues = Object.keys(lunch);
    for(let i=0;i<lunchValues.length;i++) {
        if (lunch[lunchValues[i]].yogurt) {
            totalNeeded += lunch[lunchValues[i]].yogurt * lunch[lunchValues[i]].freq;
        }
    }
    let breakfastValues = Object.keys(breakfast);
    for(let i=0;i<breakfastValues.length;i++) {
        if (breakfast[breakfastValues[i]].yogurt) {
            totalNeeded += breakfast[breakfastValues[i]].yogurt * breakfast[breakfastValues[i]].freq;
        }
    }
    return totalNeeded;
}

let makeTotalNeededCracker = (breakfast,lunch,dinner) => {
    let totalNeeded = 0;
    let dinnerValues = Object.keys(dinner);
    for(let i=0;i<dinnerValues.length;i++) {
        if (dinner[dinnerValues[i]].cracker) {
            totalNeeded += dinner[dinnerValues[i]].cracker  * dinner[dinnerValues[i]].freq;
        }
    }
    let lunchValues = Object.keys(lunch);
    for(let i=0;i<lunchValues.length;i++) {
        if (lunch[lunchValues[i]].cracker) {
            totalNeeded += lunch[lunchValues[i]].cracker * lunch[lunchValues[i]].freq;
        }
    }
    let breakfastValues = Object.keys(breakfast);
    for(let i=0;i<breakfastValues.length;i++) {
        if (breakfast[breakfastValues[i]].cracker) {
            totalNeeded += breakfast[breakfastValues[i]].cracker * breakfast[breakfastValues[i]].freq;
        }
    }
    return totalNeeded;
}

let makeTotalNeededEggs = (breakfast,lunch,dinner) => {
    let totalNeeded = 0;
    let dinnerValues = Object.keys(dinner);
    for(let i=0;i<dinnerValues.length;i++) {
        if (dinner[dinnerValues[i]].eggs) {
            totalNeeded += dinner[dinnerValues[i]].eggs  * dinner[dinnerValues[i]].freq;
        }
    }
    let lunchValues = Object.keys(lunch);
    for(let i=0;i<lunchValues.length;i++) {
        if (lunch[lunchValues[i]].eggs) {
            totalNeeded += lunch[lunchValues[i]].eggs * lunch[lunchValues[i]].freq;
        }
    }
    let breakfastValues = Object.keys(breakfast);
    for(let i=0;i<breakfastValues.length;i++) {
        if (breakfast[breakfastValues[i]].eggs) {
            totalNeeded += breakfast[breakfastValues[i]].eggs * breakfast[breakfastValues[i]].freq;
        }
    }
    return totalNeeded;
}

let makeTotalNeededFruit = (breakfast,lunch,dinner) => {
    let totalNeeded = 0;
    let dinnerValues = Object.keys(dinner);
    for(let i=0;i<dinnerValues.length;i++) {
        if (dinner[dinnerValues[i]].fruit) {
            totalNeeded += dinner[dinnerValues[i]].fruit  * dinner[dinnerValues[i]].freq;
        }
    }
    let lunchValues = Object.keys(lunch);
    for(let i=0;i<lunchValues.length;i++) {
        if (lunch[lunchValues[i]].fruit) {
            totalNeeded += lunch[lunchValues[i]].fruit * lunch[lunchValues[i]].freq;
        }
    }
    let breakfastValues = Object.keys(breakfast);
    for(let i=0;i<breakfastValues.length;i++) {
        if (breakfast[breakfastValues[i]].fruit) {
            totalNeeded += breakfast[breakfastValues[i]].fruit * breakfast[breakfastValues[i]].freq;
        }
    }
    return totalNeeded;
}

let makeTotalNeededpotato = (breakfast,lunch,dinner) => {
    let totalNeeded = 0;
    let dinnerValues = Object.keys(dinner);
    for(let i=0;i<dinnerValues.length;i++) {
        if (dinner[dinnerValues[i]].potato) {
            totalNeeded += dinner[dinnerValues[i]].potato  * dinner[dinnerValues[i]].freq;
        }
    }
    let lunchValues = Object.keys(lunch);
    for(let i=0;i<lunchValues.length;i++) {
        if (lunch[lunchValues[i]].potato) {
            totalNeeded += lunch[lunchValues[i]].potato * lunch[lunchValues[i]].freq;
        }
    }
    let breakfastValues = Object.keys(breakfast);
    for(let i=0;i<breakfastValues.length;i++) {
        if (breakfast[breakfastValues[i]].potato) {
            totalNeeded += breakfast[breakfastValues[i]].potato * breakfast[breakfastValues[i]].freq;
        }
    }
    return totalNeeded;
}

let makeTotalNeededOats = (breakfast,lunch,dinner) => {
    let totalNeeded = 0;
    let dinnerValues = Object.keys(dinner);
    for(let i=0;i<dinnerValues.length;i++) {
        if (dinner[dinnerValues[i]].oats) {
            totalNeeded += dinner[dinnerValues[i]].oats  * dinner[dinnerValues[i]].freq;
        }
    }
    let lunchValues = Object.keys(lunch);
    for(let i=0;i<lunchValues.length;i++) {
        if (lunch[lunchValues[i]].oats) {
            totalNeeded += lunch[lunchValues[i]].oats * lunch[lunchValues[i]].freq;
       }
    }
    let breakfastValues = Object.keys(breakfast);
    for(let i=0;i<breakfastValues.length;i++) {
        if (breakfast[breakfastValues[i]].oats) {
            totalNeeded += breakfast[breakfastValues[i]].oats * breakfast[breakfastValues[i]].freq;
        }
    }
    return totalNeeded;
}

let makeTotalNeededbreakfastDrink = (breakfast,lunch,dinner) => {
    let totalNeeded = 0;
    let dinnerValues = Object.keys(dinner);
    for(let i=0;i<dinnerValues.length;i++) {
        if (dinner[dinnerValues[i]].breakfastDrink) {
            totalNeeded += dinner[dinnerValues[i]].breakfastDrink  * dinner[dinnerValues[i]].freq;
        }
    }
    let lunchValues = Object.keys(lunch);
    for(let i=0;i<lunchValues.length;i++) {
        if (lunch[lunchValues[i]].breakfastDrink) {
            totalNeeded += lunch[lunchValues[i]].breakfastDrink * lunch[lunchValues[i]].freq;
        }
    }
    let breakfastValues = Object.keys(breakfast);
    for(let i=0;i<breakfastValues.length;i++) {
        if (breakfast[breakfastValues[i]].breakfastDrink) {
            totalNeeded += breakfast[breakfastValues[i]].breakfastDrink * breakfast[breakfastValues[i]].freq;
        }
    }
    return totalNeeded;
}


let makeTotalNeededMeatOnly = (breakfast,lunch,dinner) => {
    let totalNeeded = 0;
    let dinnerValues = Object.keys(dinner);
    for(let i=0;i<dinnerValues.length;i++) {
        if (dinner[dinnerValues[i]].meatOnly) {
            totalNeeded += dinner[dinnerValues[i]].meatOnly  * dinner[dinnerValues[i]].freq;
        }
    }
    let lunchValues = Object.keys(lunch);
    for(let i=0;i<lunchValues.length;i++) {
        if (lunch[lunchValues[i]].meatOnly) {
            totalNeeded += lunch[lunchValues[i]].meatOnly * lunch[lunchValues[i]].freq;
        }
    }
    let breakfastValues = Object.keys(breakfast);
    for(let i=0;i<breakfastValues.length;i++) {
        if (breakfast[breakfastValues[i]].meatOnly) {
            totalNeeded += breakfast[breakfastValues[i]].meatOnly * breakfast[breakfastValues[i]].freq;
        }
    }
    return totalNeeded;
}

let makeTotalNeededSauceGravy = (breakfast,lunch,dinner) => {
    let totalNeeded = 0;
    let dinnerValues = Object.keys(dinner);
    for(let i=0;i<dinnerValues.length;i++) {
        if (dinner[dinnerValues[i]].sauceGravy) {
            totalNeeded += dinner[dinnerValues[i]].sauceGravy * dinner[dinnerValues[i]].freq;
        }
    }
    let lunchValues = Object.keys(lunch);
    for(let i=0;i<lunchValues.length;i++) {
        if (lunch[lunchValues[i]].sauceGravy) {
            totalNeeded += lunch[lunchValues[i]].sauceGravy * lunch[lunchValues[i]].freq;
        }
    }
    let breakfastValues = Object.keys(breakfast);
    for(let i=0;i<breakfastValues.length;i++) {
        if (breakfast[breakfastValues[i]].sauceGravy) {
            totalNeeded += breakfast[breakfastValues[i]]  * breakfast[breakfastValues[i]].freq;
        }
    }
    return totalNeeded;
}

let makeTotalNeededewm = (breakfast,lunch,dinner) => {
    let totalNeeded = 0;
    let dinnerValues = Object.keys(dinner);
    for(let i=0;i<dinnerValues.length;i++) {
        if (dinner[dinnerValues[i]].ewm) {
            totalNeeded += dinner[dinnerValues[i]].ewm  * dinner[dinnerValues[i]].freq;
        }
    }
    let lunchValues = Object.keys(lunch);
    for(let i=0;i<lunchValues.length;i++) {
        if (lunch[lunchValues[i]].ewm) {
            totalNeeded += lunch[lunchValues[i]].ewm * lunch[lunchValues[i]].freq;
        }
    }
    let breakfastValues = Object.keys(breakfast);
    for(let i=0;i<breakfastValues.length;i++) {
        if (breakfast[breakfastValues[i]].ewm) {
            totalNeeded += breakfast[breakfastValues[i]].ewm * breakfast[breakfastValues[i]].freq;
        }
    }
    return totalNeeded;
}


// Define Function to extrapolate food daily percentages to yearly for the specified amount of people
let calcTotalNeeds = (food) => {
    let midVar = food * people * 365;
    return (midVar.toFixed(2) + ' Cups');
    }

// This section produces the total amount of the specified food called for in a day multiplied by the percentage of days per year it is eaten
let totalewm = calcTotalNeeds(makeTotalNeededewm(breakfast,lunch,dinner));
let totalSauceGravy = calcTotalNeeds(makeTotalNeededSauceGravy(breakfast,lunch,dinner));
let totalMeatOnly = calcTotalNeeds(makeTotalNeededMeatOnly(breakfast,lunch,dinner));
let totalbreakfastDrink = calcTotalNeeds(makeTotalNeededbreakfastDrink(breakfast,lunch,dinner));
let totalOats = calcTotalNeeds(makeTotalNeededOats(breakfast,lunch,dinner));
let totalpotato = calcTotalNeeds(makeTotalNeededpotato(breakfast,lunch,dinner));
let totalFruit = calcTotalNeeds(makeTotalNeededFruit(breakfast,lunch,dinner));
let totalEggs = calcTotalNeeds(makeTotalNeededEggs(breakfast,lunch,dinner));
let totalCracker = calcTotalNeeds(makeTotalNeededCracker(breakfast,lunch,dinner));
let totalYogurt = calcTotalNeeds(makeTotalNeededYogurt(breakfast,lunch,dinner));
let totalSoup = calcTotalNeeds(makeTotalNeededSoup(breakfast,lunch,dinner));
let totalPasta = calcTotalNeeds(makeTotalNeededPasta(breakfast,lunch,dinner));
let totalRice = calcTotalNeeds(makeTotalNeededRice(breakfast,lunch,dinner));
let totalBeans = calcTotalNeeds(makeTotalNeededBeans(breakfast,lunch,dinner));
let totalEntree =  calcTotalNeeds(makeTotalNeededEntree(breakfast,lunch,dinner));
let totalVeg = calcTotalNeeds(makeTotalNeededVegetables(breakfast,lunch,dinner));
let totalenm = calcTotalNeeds(makeTotalNeededENM(breakfast,lunch,dinner));
let totalGranola = calcTotalNeeds(makeTotalNeededGranola(breakfast,lunch,dinner));
let totalMilk = calcTotalNeeds(makeTotalNeededMilk(breakfast,lunch,dinner));


// Grab need field by ID
let ewmFieldNeed = gebi('ewmTotalNeedTarg')
let sauceGravyFieldNeed = gebi('sauceGravyTotalNeedTarg')
let meatOnlyFieldNeed = gebi('meatOnlyTotalNeedTarg')
let breakfastDrinkFieldNeed = gebi('bfastDrinkTotalNeedTarg')
let oatsFieldNeed = gebi('oatsTotalNeedTarg')
let potatoFieldNeed = gebi('potatoTotalNeedTarg')
let fruitFieldNeed = gebi('fruitTotalNeedTarg')
let eggFieldNeed = gebi('eggTotalNeedTarg')
let crackerFieldNeed = gebi('crackerTotalNeedTarg')
let yogurtFieldNeed = gebi('yogurtTotalNeedTarg')
let soupFieldNeed = gebi('soupTotalNeedTarg')
let pastaFieldNeed = gebi('pastaTotalNeedTarg')
let riceFieldNeed = gebi('riceTotalNeedTarg')
let beansFieldNeed = gebi('beansTotalNeedTarg')
let entreeFieldNeed = gebi('entreeTotalNeedTarg')
let vegFieldNeed = gebi('vegTotalNeedTarg')
let enmFieldNeed = gebi('enmTotalNeedTarg')
let granolaFieldNeed = gebi('granolaTotalNeedTarg')
let milkFieldNeed = gebi('milkTotalNeedTarg')
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
entreeFieldNeed.innerHTML = totalEntree;
vegFieldNeed.innerHTML = totalVeg;
enmFieldNeed.innerHTML = totalenm;
eggFieldNeed.innerHTML = totalEggs;
fruitFieldNeed.innerHTML = totalFruit;
oatsFieldNeed.innerHTML = totalOats;
soupFieldNeed.innerHTML = totalSoup;
granolaFieldNeed.innerHTML = totalGranola;
milkFieldNeed.innerHTML = totalMilk;

}

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

bmeal1ResDay.value = (bmeal1Perc * 365).toFixed(1);
bmeal2ResDay.value = (bmeal2Perc * 365).toFixed(1);
bmeal3ResDay.value = (bmeal3Perc * 365).toFixed(1);
bmeal4ResDay.value = (bmeal4Perc * 365).toFixed(1);
bmeal5ResDay.value = (bmeal5Perc * 365).toFixed(1);

lmeal1ResDay.value = (lmeal1Perc * 365).toFixed(1);
lmeal2ResDay.value = (lmeal2Perc * 365).toFixed(1);
lmeal3ResDay.value = (lmeal3Perc * 365).toFixed(1);

dmeal1ResDay.value = (dmeal1Perc * 365).toFixed(1);
dmeal2ResDay.value = (dmeal2Perc * 365).toFixed(1);
dmeal3ResDay.value = (dmeal3Perc * 365).toFixed(1);
dmeal4ResDay.value = (dmeal4Perc * 365).toFixed(1);
dmeal5ResDay.value = (dmeal5Perc * 365).toFixed(1);
}


// Event Triggers
calculateDays();
setInterval(calculateDays,1200);
getAnalytics();
gebi('trig').addEventListener('click', getAnalytics);