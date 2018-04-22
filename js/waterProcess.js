'use strict';
let produceWaterData = (items) => {
  let waterData = {};
  waterData.drySum = 0;
  waterData.preparedSum = 0;
  for(let i=0;i<items.length;i++) {
    if (items[i].unpreparedserving) {
      waterData.drySum += (items[i]['unpreparedserving'] * items[i]['servings'] * items[i]['quantity']);
    }
  }
  for(let i=0;i<items.length;i++) {
    if (items[i].preparedserving) {
      waterData.preparedSum += (items[i]['preparedserving'] * items[i]['servings'] * items[i]['quantity']);
    }
  }

  return waterData;
};


module.exports = produceWaterData;