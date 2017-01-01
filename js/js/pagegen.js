
module.exports.HeaderGenerator = function(){
    var html = "<!DOCTYPE html>\n"
    html += "<html>\n"
    html += "<head>\n"
    html += "<script src=\"jquery/dist/jquery.min.js\"></script>\n"
    html += "<script src=\"bootstrap/dist/js/bootstrap.min.js\"></script>\n"
    html += "<link rel=\"stylesheet\" href=\"bootstrap/dist/css/bootstrap-theme.min.css\">\n"
    html += "<link rel=\"stylesheet\" href=\"bootstrap/dist/css/bootstrap.min.css\">\n"
    html += "<link rel=\"stylesheet\" href=\"css/style.css\">\n"
    html += "<link rel=\"stylesheet\" href=\"css/less-style.css\">\n"
    html += "</head>\n"
    return html;
}

module.exports.BodyGenerator = function(content){
    var html = "<body>\n"
    html += content
    html += "</body>\n"
    return html;
}


function TagGenerator(tag, content, attrs){
    var tag_new = "<" + tag + " " + attrs +  ">"
    tag_new += content
    tag_new += "</" + tag + ">"
    return tag_new
}

module.exports.TagGenerator = function(tag, content, attrs){
    var tag_new = "<" + tag + " " + attrs +  ">"
    tag_new += content
    tag_new += "</" + tag + ">"
    return tag_new
}

module.exports.TableGenerator = function(head, names, prices){
    /* generate table header */
    var th = ""
    for(var i = 0; i < head.length; i++){
	th += TagGenerator("th", head[i], "")
    }
    var tr = TagGenerator("tr", th, "")
    var TableHead = TagGenerator("thead", tr, "")
    //console.log(TableHead);

    tr = ""
    /* generate table body */
    for(var i = 0; i < names.length; i++){
	var td1 = TagGenerator("td", names[i], "")
	var td2 = TagGenerator("td", prices[i], "")
	tr  += TagGenerator("tr", td1 + td2, "")
    }
    var TableBody = TagGenerator("tbody", tr, "")
    console.log(TableBody)

    /* create table and container */
    var Table = TagGenerator("table", TableHead + TableBody, "class=\"table\"")
    var TableContainer = TagGenerator("div", Table, "class=\"container\"");
    return TableContainer
}

module.exports.ListGenerator = function(names, values){

    var li = ""

    for(var i = 0; i < names.length; i++){
	var icon = TagGenerator("i", "" , "class=\"fa fa-angle-right\"")
	var link = TagGenerator("a", names[i], "href=\"#\"")
	var span = TagGenerator("span", values[i], "class=\"pull-right\"")
	var menu = TagGenerator("div", icon + link + span, "menu-list-item")
	li += TagGenerator("li", menu, "")
    }
    var ul  = TagGenerator("ul",li,"class=\"list-unstyled\"")
    var div = TagGenerator("div",ul,"class=\"menu-details br-lblue\"")
    return div
}

module.exports.HTMLGenerator = function(head, body){
    var html = head + body + "</html>\n";
    return html;
}


