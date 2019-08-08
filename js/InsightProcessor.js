class InsightProcessor {
    constructor(items) {
        this.items = items;
        this.categories = [
            'Soup',
            'Entree with Meat',
            'Entree without Meat',
            'Meat Only',
            'Beans',
            'Cracker',
            'Pasta',
            'Potato',
            'Rice',
            'Vegetable',
            'Breakfast Meal',
            'Breakfast Drink',
            'Breakfast Meat',
            'Eggs',
            'Granola',
            'Milk',
            'Yogurt',
            'Fruit',
            'SauceGravy',
            'Dessert',
            'Spice',
            'Drink',
            'Oats',
        ];
    }

    getTotalCupsAmountForCategory(category) {
        return this.items.reduce((accumulator, item) => {
            if (item.category !== category) {
                return accumulator;
            }

            accumulator += (item.preparedserving * item.servings * item.quantity);
            return accumulator;
        }, 0);
    }

    
}

module.exports = InsightProcessor;
