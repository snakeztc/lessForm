// handler for homepage
exports.home = function(req, res) {
	res.render('index', { title: 'Duolingo Consent Form', expressFlash: req.flash('warning')});
};

// handler for form submitted from homepage
exports.home_post_handler = function(req, res) {
    // if the username is not submitted, give it a default of "Anonymous"
    var date = new Date()
    var ua = req.useragent;
    var OS = 'desktop';
    stringDate = date.toLocaleString();
    username = req.body.username;
    uniqueID = req.body.uniqueID;
    // check the OS type
    if (ua.isAndroid == 'true') {
        OS = 'android';
    } else if (ua.isiPhone == 'true' || ua.isiPad == 'true') {
        OS = 'iOS';
    }
    // print out variables
    console.log(stringDate);
    console.log(username);
    console.log(uniqueID); 
    console.log("User submitted from: " + OS);
    //console.log(ua);

    if (uniqueID == '' || username == '') {
        req.flash('warning', 'Please fill all the fields');
        res.redirect('/');
    } else {
        // store the username as a session variable
        var db = req.db;
        var collection = db.get('subjects');
        collection.insert( {
            "date" : stringDate,
            "name" : username,
            "uid" : uniqueID,
        }, function(err, result) {
            if (err) {
                // If it failed, return error
                console.log("ERRROR: There is an error when inserting subjects into the mongoDB");
            } else {
                console.log("SUCC: Insert a subject into the database");
            }
        });
        // redirect the user to homepage
        if (OS == 'desktop') {
            res.redirect('http://testcenter.duolingo.com');
        } else if (OS == 'android') {
            res.redirect('https://play.google.com/store/apps/details?id=com.duolingo&hl=en');
        } else {
            res.redirect('https://itunes.apple.com/us/app/duolingo-learn-languages-for/id570060128?mt=8');
        }
    }
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
