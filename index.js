var fs = require("fs");
var path = require('path');
var Handlebars = require("handlebars");
var _ = require('lodash');

function render(resume) {
	var css = fs.readFileSync(__dirname + "/public/assets/css/styles.css", "utf-8");
	var tpl = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");
	var partialsDir = path.join(__dirname, '/partials');
	var filenames = fs.readdirSync(partialsDir);


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