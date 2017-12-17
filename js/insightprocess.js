
    let produceCatData = (items) => {
    let catTotal = {};
    catTotal.Soup = 0;
    catTotal.Entree = 0;
    catTotal.EntreeWithMeat = 0;
    catTotal.EntreeWithoutMeat = 0;
    catTotal.MeatOnly = 0;
    catTotal.Beans = 0;
    catTotal.Cracker = 0;
    catTotal.Pasta = 0;
    catTotal.Potato = 0;
    catTotal.Rice = 0;
    catTotal.Vegetable = 0;
    catTotal.BreakfastMeal = 0;
    catTotal.BreakfastDrink = 0;
    catTotal.BreakfastMeat= 0;
    catTotal.Eggs = 0;
    catTotal.Granola = 0;
    catTotal.Milk = 0;
    catTotal.Oatmeal= 0;
    catTotal.Yogurt = 0;
    catTotal.Fruit = 0;
    catTotal.SauceGravy = 0;
    catTotal.Dessert = 0;
    catTotal.Spice= 0;
    catTotal.Drink= 0;
    catTotal.Oats= 0;
    for (i=0;i<items.length;i++) {
        if (items[i].category == 'Soup') {
            catTotal.Soup+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
        if (items[i].category == 'Entree') {
            catTotal.Entree+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
        if (items[i].category == 'Entree with Meat') {
            catTotal.EntreeWithMeat+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
        if (items[i].category == 'Entree without Meat') {
            catTotal.EntreeWithoutMeat+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
        if (items[i].category == 'Meat Only') {
            catTotal.MeatOnly+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
        if (items[i].category == 'Oats') {
            catTotal.Oats+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
        if (items[i].category == 'Beans') {
            catTotal.Beans+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
        if (items[i].category == 'Cracker') {
            catTotal.Cracker+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
        if (items[i].category == 'Pasta') {
            catTotal.Pasta+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
        if (items[i].category == 'Potato') {
            catTotal.Potato+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
        if (items[i].category == 'Rice') {
            catTotal.Rice+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
        if (items[i].category == 'Vegetable') {
            catTotal.Vegetable+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
        if (items[i].category == 'Breakfast Meal') {
            catTotal.BreakfastMeal+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
        if (items[i].category == 'Breakfast Drink') {
            catTotal.BreakfastDrink+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
        if (items[i].category == 'Breakfast Meat') {
            catTotal.BreakfastMeat+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
        if (items[i].category == 'Eggs') {
            catTotal.Eggs+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
        if (items[i].category == 'Granola') {
            catTotal.Granola+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
        if (items[i].category == 'Milk') {
            catTotal.Milk+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
        if (items[i].category == 'Oatmeal') {
            catTotal.Oatmeal+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
        if (items[i].category == 'Yogurt') {
            catTotal.Yogurt+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
        if (items[i].category == 'Fruit') {
            catTotal.Fruit+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
        if (items[i].category == 'SauceGravy') {
            catTotal.SauceGravy+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
        if (items[i].category == 'Dessert') {
            catTotal.Dessert+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
        if (items[i].category == 'Spice') {
            catTotal.Spice+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
        if (items[i].category == 'Drink') {
            catTotal.Drink+= (items[i].quantity * items[i].servings * items[i].preparedserving);
            }
    }
    return catTotal;
}

module.exports = produceCatData;