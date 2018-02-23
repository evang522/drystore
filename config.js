'use strict';
const DBURL = process.env.DBURL || 'mongodb://localhost/drystore';

module.exports.DBURL = DBURL;
module.exports.PORT = process.env.PORT || 80;