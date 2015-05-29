// handler for homepage
exports.home = function(req, res) {
	res.render('index', { title: 'Duolingo Consent Form'});
};

// handler for form submitted from homepage
exports.home_post_handler = function(req, res) {
    // if the username is not submitted, give it a default of "Anonymous"
    console.log('fuck');

    console.log(req.body.username);
    console.log(req.body.uniqueID);

    username = req.body.username || 'Anonymous';
    // store the username as a session variable
    req.session.username = username;
    // redirect the user to homepage
    res.redirect('http://testcenter.duolingo.com');
};

// handler for showing simple pages
exports.page = function(req, res) {
    var name = req.query.name;
    var contents = {
        about: "This is a study to analyze the corrlation between Duolingo Test and students' academic performance. All students finish the Duolingo test will be rewarded. One will only be rewareded once regardless the number of tests he/she may take. <br><br>For further questions, please contact with Tiancheng via the contact page.",
        contact: 'You may contact us at<br><address><strong>Tiancheng (Tony) Zhao</strong><br><a href="mailto:#">tzdialrc@yahoo.com</a><br>Carnegie Mellon University, USA</address>'
    };
    res.render('page', { title: 'Duolingo Consent Form', content:contents[name] });
};
