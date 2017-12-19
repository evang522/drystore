
let produceWaterData = (items) => {
    let waterData = {};
    waterData.drySum = 0;
    waterData.preparedSum = 0;
    for(i=0;i<items.length;i++) {
   waterData.drySum +=  items[i]['unpreparedserving'];
}
    for(i=0;i<items.length;i++) {
        if (items[i].preparedserving) {
        waterData.preparedSum +=  items[i]['preparedserving'];
        }
    }

    return waterData;
}


module.exports = produceWaterData;