const dotenv = require('dotenv');

const loadEnv = () => {
    dotenv.config();

    console.log("ENV Loaded Successfully");
};

module.exports = loadEnv;
