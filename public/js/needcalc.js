'use strict';
/*Function of this script:

To calculate how many rendered cups of each food are necessary based on a given variable of how many people are being supported,
what kinds of meals people eat for breakfast, lunch, and dinner, and what percentage of the time each meal is eaten. 

Accordingly, we will be separating the calculations into different meals and providing a list of the different types of food available,
then allowing for five different types of food combinations to be specified for each meal. Then we will allow the user to specify the percentage that each meal
will be eaten.
*/
let getAnalytics = () => {

let people = document.getElementById('people').value;

let bmeal1Perc = (document.getElementById('bmeal1').value.replace('%','') / 100);
let bmeal2Perc = (document.getElementById('bmeal2').value.replace('%','') / 100);
let bmeal3Perc = (document.getElementById('bmeal3').value.replace('%','') / 100);
let bmeal4Perc = (document.getElementById('bmeal4').value.replace('%','') / 100);
let bmeal5Perc = (document.getElementById('bmeal5').value.replace('%','') / 100);

let lmeal1Perc = (document.getElementById('lmeal1').value.replace('%','') / 100);
let lmeal2Perc = (document.getElementById('lmeal2').value.replace('%','') / 100);
let lmeal3Perc = (document.getElementById('lmeal3').value.replace('%','') / 100);

let dmeal1Perc = (document.getElementById('dmeal1').value.replace('%','') / 100);
let dmeal2Perc = (document.getElementById('dmeal2').value.replace('%','') / 100);
let dmeal3Perc = (document.getElementById('dmeal3').value.replace('%','') / 100);
let dmeal4Perc = (document.getElementById('dmeal4').value.replace('%','') / 100);
let dmeal5Perc = (document.getElementById('dmeal5').value.replace('%','') / 100);

if ((bmeal1Perc + bmeal2Perc + bmeal3Perc + bmeal4Perc + bmeal5Perc) !== 1) {
    alert('Sorry, cannot continue. Breakfast percentages don\'t add up to 100%! You can understand why this may cause some problems.');
}

if ((lmeal1Perc + lmeal2Perc + lmeal3Perc) != 1) {
    alert('Sorry, cannot continue. Lunch percentages don\'t add up to 100%! You can understand why this may cause some problems.');
}

if ((dmeal1Perc + dmeal2Perc + dmeal3Perc + dmeal4Perc + dmeal5Perc) !== 1) {
    alert('Sorry, cannot continue. Dinner percentages don\'t add up to 100%! You can understand why this may cause some problems.');
}

console.log(dmeal4Perc);


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
        entree:1,
        vegetable:.5,
        freq:dmeal2Perc
    }, meal3: {
        meatOnly:.75,
        rice:.5,
        vegetable:.5,
        potato:.25,
        freq:dmeal3Perc
    }, meal4: {
        meatOnly:.75,
        pasta:.5,
        vegetable:.5,
        potato:.25,
        freq:dmeal4Perc
    }, meal5: {
        meatOnly:.75,
        potato:.5,
        vegetable:.5,
        potato:.25,
        freq:dmeal5Perc
    }
};


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

let totalewm = makeTotalNeededewm(breakfast,lunch,dinner);
let totalSauceGravy = makeTotalNeededSauceGravy(breakfast,lunch,dinner);
let totalMeatOnly = makeTotalNeededMeatOnly(breakfast,lunch,dinner);
let totalbreakfastDrink = makeTotalNeededbreakfastDrink(breakfast,lunch,dinner);
let totalOats = makeTotalNeededOats(breakfast,lunch,dinner);
let totalpotato = makeTotalNeededpotato(breakfast,lunch,dinner);
let totalFruit = makeTotalNeededFruit(breakfast,lunch,dinner);
let totalEggs = makeTotalNeededEggs(breakfast,lunch,dinner);
let totalCracker = makeTotalNeededCracker(breakfast,lunch,dinner);
let totalYogurt = makeTotalNeededYogurt(breakfast,lunch,dinner);
let totalSoup = makeTotalNeededSoup(breakfast,lunch,dinner);
let totalPasta = makeTotalNeededPasta(breakfast,lunch,dinner);
let totalRice = makeTotalNeededRice(breakfast,lunch,dinner);
let totalBeans = makeTotalNeededBeans(breakfast,lunch,dinner);
let totalEntree =  makeTotalNeededEntree(breakfast,lunch,dinner);
let totalVeg = makeTotalNeededVegetables(breakfast,lunch,dinner);


let calcTotalNeeds = (food) => {
    return food * people * 365;
}

let soupTot = calcTotalNeeds(totalSoup);
console.log(soupTot);

let soupfieldNeed = document.getElementById('soupTotalNeedTarg')

soupfieldNeed.innerHTML = soupTot.toFixed(2);
}

document.getElementById('trig').addEventListener('click', getAnalytics);