let mongoose = require('mongoose');

// Connect to DB
mongoose.connect('mongodb://localhost/drystore');
mongoose.connection.on('connected', () => {
    console.log('DB connection successful');
});
