const isProductionMode = process.env.NODE_ENV === 'production';

module.exports.server = {
    port: process.env.MY_PORT || 3001,
};

module.exports.mongo = {
    url: process.env.MY_MONGO_URL || 'mongodb://127.0.0.1:27017/template_dev',
    options: {
        useCreateIndex: true,
        useNewUrlParser: true,
        autoIndex: !isProductionMode,
        useFindAndModify: false,
        useUnifiedTopology: true,
    }
};