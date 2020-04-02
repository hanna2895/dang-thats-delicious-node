exports.myMiddleware = (req, res, next) => {
    console.log('my middleware')
    req.name = 'Hannah';
    res.cookie('name', 'Hannah is cool', { maxAge: 9000000 })
    next();
}

exports.homePage = (req, res) => {
    console.log(req.name);
    res.render('index');
}