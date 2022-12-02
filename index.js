var fs = require("fs");
var path = require('path');
var Handlebars = require("handlebars");
var _ = require('lodash');

function render(resume) {
	var css = fs.readFileSync(__dirname + "/public/assets/css/styles.css", "utf-8");
	var tpl = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");
	var partialsDir = path.join(__dirname, '/partials');
	var filenames = fs.readdirSync(partialsDir);


    var d = new Date();
    var curyear = d.getYear();
    
    function getMonth(startDateStr) {
        switch (startDateStr.substr(5,2)) {
        case '01':
            return "Jan ";
        case '02':
            return "Feb ";
        case '03':
            return "Mar ";
        case '04':
            return "Apr ";
        case '05':
            return "May ";
        case '06':
            return "Jun ";
        case '07':
            return "Jul ";
        case '08':
            return "Aug ";
        case '09':
            return "Sep ";
        case '10':
            return "Oct ";
        case '11':
            return "Nov ";
        case '12':
            return "Dec ";
        }
    }

    if (resume.work && resume.work.length) {
        resume.workBool = true;
        _.each(resume.work, function(w){
            if (w.startDate) {
                w.startDateYear = (w.startDate || "").substr(0,4);
                w.startDateMonth = getMonth(w.startDate || "");

            }
            if(w.endDate) {
                w.endDateYear = (w.endDate || "").substr(0,4);
                w.endDateMonth = getMonth(w.endDate || "");
            } else {
                w.endDateYear = 'Present'
            }
            if (w.highlights) {
                if (w.highlights[0]) {
                    if (w.highlights[0] != "") {
                        w.boolHighlights = true;
                    }
                }
            }
        });
    }

    if (resume.education && resume.education.length) {
        resume.educationBool = true;
        _.each(resume.education, function(w){
            if (w.startDate) {
                w.startDateYear = (w.startDate || "").substr(0,4);
                w.startDateMonth = getMonth(w.startDate || "");

            }
            if(w.endDate) {
                w.endDateYear = (w.endDate || "").substr(0,4);
                w.endDateMonth = getMonth(w.endDate || "");
            } else {
                w.endDateYear = 'Present'
            }
        });
    }

    if (resume.volunteer && resume.volunteer.length) {
        resume.volunteerBool = true;
        _.each(resume.volunteer, function(w){
            if (w.startDate) {
                w.startDateYear = (w.startDate || "").substr(0,4);
                w.startDateMonth = getMonth(w.startDate || "");

            }
            if(w.endDate) {
                w.endDateYear = (w.endDate || "").substr(0,4);
                w.endDateMonth = getMonth(w.endDate || "");
            } else {
                w.endDateYear = 'Present'
            }
            if (w.highlights) {
                if (w.highlights[0]) {
                    if (w.highlights[0] != "") {
                        w.boolHighlights = true;
                    }
                }
            }
        });
    }


    
	_.each(resume.basics.profiles, function(p){
        switch(p.network.toLowerCase()) {
            // special cases
            case "google-plus":
            case "googleplus":
                p.iconClass = "bx bxl-google-plus";
                break;
            case "flickr":
            case "flicker":
                p.iconClass = "bx bxl-flickr-square";
                break;
            case "dribbble":
            case "dribble":
                p.iconClass = "bx bxl-dribbble";
                break;
            case "codepen":
                p.iconClass = "bx bxl-codepen";
                break;
            case "soundcloud":
                p.iconClass = "bx bxl-soundcloud";
                break;
            case "reddit":
                p.iconClass = "bx bxl-reddit";
                break;
            case "tumblr":
            case "tumbler":
                p.iconClass = "bx bxl-tumblr";
                break;
            case "stack-overflow":
            case "stackoverflow":
                p.iconClass = "bx bxl-stack-overflow";
                break;
            case "blog":
            case "rss":
                p.iconClass = "bx bx-rss";
                break;
            case "gitlab":
                p.iconClass = "bx bxl-gitlab";
                break;
            case "github":
                p.iconClass = "bx bxl-github";
                break;
            case "linkedin":
                p.iconClass = "bx bxl-linkedin-square";
                break;
            default:
                // try to automatically select the icon based on the name
                p.iconClass = "bx bx-" + p.network.toLowerCase();
        } 
        if (p.url) {
            p.text = p.url;
        } else {
            p.text = p.network + ": " + p.username;
        }
    });

	filenames.forEach(function (filename) {
	  var matches = /^([^.]+).hbs$/.exec(filename);
	  if (!matches) {
	    return;
	  }
	  var name = matches[1];
	  var filepath = path.join(partialsDir, filename)
	  var template = fs.readFileSync(filepath, 'utf8');

	  Handlebars.registerPartial(name, template);
	});
	return Handlebars.compile(tpl)({
		css: css,
		resume: resume
	});
}

module.exports = {
	render: render
};