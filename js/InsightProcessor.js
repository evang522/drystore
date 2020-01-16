class InsightProcessor {
    constructor(items) {
        this.items = items;
    }

    getAllCategories() {
        return this.items.reduce((accumulator, item) => {
            if (!accumulator.includes(item.category)) {
                accumulator.push(item.category);
            }

            return accumulator;
        }, [])
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

    getCategoriesAmountReportInCups() {
        return this.getAllCategories().map((categoryName) => {
            return {
                name: categoryName,
                amount: this.getTotalCupsAmountForCategory(categoryName),
            }
        })
    }


}

module.exports = InsightProcessor;
