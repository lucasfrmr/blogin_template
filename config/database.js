module.exports = {
    //changed for cloud 9
    // database:'mongodb://localhost:27017/nodekb',
    database:'mongodb://'+process.env.IP+':27017/nodekb',
    secret: 'keyboard cat'
}