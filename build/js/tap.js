var hashtable = {};
function plus(id){
    if(hashtable[id] === undefined){
	hashtable[id] = 1;
	$("#orderingmenu").append("<tr id="+ id.replace(/ /g, "").replace(/'/g,"").replace(/&/g,"").replace(/\)/g,"").replace(/\(/g,"").replace(/\"/g,"") + "><td><h3>"+id+"</h3></td><td><h3>" + hashtable[id] + "</h3></td></tr>");

    }
    else{
	hashtable[id] += 1;
	$("#"+id.replace(/ /g, "").replace(/'/g,"").replace(/&/g,"").replace(/\)/g,"").replace(/\(/g,"")).html("<td><h3>"+id+"</h3></td><td><h3>"+hashtable[id]+"</h3></td>");
    }
}

function minus(id){
    if(hashtable[id] === undefined){
	hashtable[id] = 0;
    }
    else if(hashtable[id] > 0){
	hashtable[id] -= 1;
	$("#"+id.replace(/ /g, "").replace(/'/g,"").replace(/&/g,"").replace(/\(/g,"").replace(/\)/g,"").replace(/\"/g,"")).html("<td><h3>"+id+"</h3></td><td><h3>"+hashtable[id]+"</h3></td>");
    }
}
