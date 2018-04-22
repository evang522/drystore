'use strict';
let produceCatData = (items) => {
  let catTotal = {};

  const jsCategories = {
    'Soup':'Soup',
    'Entree':'Entree',
    'EntreeWithMeat':'Entree with Meat',
    'EntreeWithoutMeat':'Entree without Meat',
    'MeatOnly':'Meat Only',
    'Beans':'Beans',
    'Cracker':'Cracker',
    'Pasta':'Pasta',
    'Potato': 'Potato',
    'Rice':'Rice',
    'Vegetable':'Vegetable',
    'BreakfastMeal':'Breakfast Meal',
    'BreakfastDrink':'Breakfast Drink',
    'BreakfastMeat':'Breakfast Meat',
    'Eggs':'Eggs',
    'Granola':'Granola',
    'Milk':'Milk',
    'Oatmeal':'Oatmeal',
    'Yogurt':'Yogurt',
    'Fruit':'Fruit',
    'SauceGravy':'SauceGravy',
    'Dessert':'Dessert',
    'Spice':'Spice',
    'Drink':'Drink',
    'Oats':'Oats'
  };

  for(let n in jsCategories) {
    catTotal[n] = 0;
  }

  items.forEach(item => {
    catTotal[jsCategories[item.category]] += (item.quantity * item.servings * item.preparedserving);
  });
    
  return catTotal;
};

module.exports = produceCatData;
