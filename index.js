const data = d3.csv('Data.csv');
const Research = d3.csv('ResearchLabels.csv');

data.then(function (result) {
    console.log(result);
});

var body = document.getElementsByTagName("body");

var Materials = document.getElementById("AdditiveManufacturing");

var overlay = document.createElement("div"); // create dynamicly overlay

var ResearchGroupheader = document.createElement("h1");

var back = document.createElement("div");
var headerdiv = document.createElement("div");
var backimg = document.createElement("img");
backimg.setAttribute("src", "imgs/back.png");
backimg.setAttribute("class", "backimg");
back.setAttribute("class", "back-button");
headerdiv.setAttribute("class", "Research-header");


overlay.setAttribute("class", "overlay");

let header;

var Fwrap = document.createElement("div");
Fwrap.setAttribute("class", "divsvg");
var Fsvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
var svgNS = Fsvg.namespaceURI;
var ValueArray = [];
var DeptArray = [];
var DeptHeightArray = [];


function appendOverlay(clicked_id) {
    document.body.appendChild(overlay); // Append Overlay to body
    overlay.appendChild(back);
    back.appendChild(ResearchGroupheader);
    ResearchGroupheader.setAttribute("class", "rheader");
    const backarr = document.createTextNode("\u2B9C");
    header = document.createTextNode(document.getElementById(clicked_id + "txt").textContent);
    const researchvalue = (document.getElementById(clicked_id + "txt").textContent);
    ResearchGroupheader.appendChild(backarr);
    ResearchGroupheader.appendChild(header);
    overlay.appendChild(Fwrap);
    Fwrap.appendChild(Fsvg);
    console.log(researchvalue);
    data.then(function (result) {
        function FindDifferentDept(ResearchArea) {
            for (i = 0; i < result.length; i++){
                if(result[i].SUBLABEL === ResearchArea){
                    if(!DeptArray.includes(result[i].DEPT)){
                        DeptArray.push(result[i].DEPT);
                    }
                }
            }
        }
        for (i = 0; i < result.length; i++) {
            if (result[i].SUBLABEL === researchvalue.trim()) {
                ValueArray.push(result[i])
            }
        }
        for (j = 0; j < ValueArray.length; j++){
            FindDifferentDept(ValueArray[j].SUBLABEL);
            // CreateFacultyBoxes(ValueArray[j].NAME, ValueArray[j].DEPT, "imgs/FacultyImages/" + ValueArray[j].IMAGE, "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem", "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem", 100, 150 + (j*180));
        }
        for (k = 0; k < DeptArray.length; k++) {
            var DeptHeightcounter = 0;
            for (r = 0; r < ValueArray.length; r++) {
                if (ValueArray[r].DEPT === DeptArray[k]) {
                    DeptHeightcounter++;
                }
            }
            console.log(k);
            if ((k === 0) || (k === 1)) {
                DeptHeight = 150 + (DeptHeightcounter * 180);
                DeptHeightArray.push(DeptHeight);
            }
            else {
                DeptHeight = DeptHeightArray[k-2] + 100 + (DeptHeightcounter * 180);
                DeptHeightArray.push(DeptHeight);
            }
        }
        console.log(DeptHeightArray)
        var DeptX = 0;
        for (k = 0; k < DeptArray.length; k++){
            var DeptHeight = 0;
            var DeptHeightcounter2 = 0;
            for (r = 0; r < ValueArray.length; r++){
                if (ValueArray[r].DEPT === DeptArray[k]){
                    DeptHeightcounter2++;
                    if ((k % 2) === 0){
                        DeptX = 350;
                    }
                    else {
                        DeptX = 1000;
                    }
                    if (k === 0 || k === 1){
                        var DepartmentName = document.createElementNS(svgNS,"text");
                        var DepartmentNametxt = document.createTextNode(DeptArray[k]);
                        DepartmentName.setAttribute("x", DeptX.toString());
                        DepartmentName.setAttribute("y", "200");
                        DepartmentName.setAttribute("font-size", "24px");
                        DepartmentName.setAttribute("font-weight", "bold");
                        DepartmentName.appendChild(DepartmentNametxt);
                        Fsvg.appendChild(DepartmentName);
                        CreateFacultyBoxes(ValueArray[r].NAME, ValueArray[r].DEPT, "imgs/FacultyImages/" + ValueArray[r].IMAGE, ValueArray[r].LINE1, ValueArray[r].LINE2, DeptX, 50 + (DeptHeightcounter2*180));
                    }
                    else{
                        var DepartmentName2 = document.createElementNS(svgNS,"text");
                        var DepartmentName2txt = document.createTextNode(DeptArray[k]);
                        DepartmentName2.setAttribute("x", DeptX.toString());
                        DepartmentName2.setAttribute("y", (DeptHeightArray[k-2] + 200));
                        DepartmentName2.setAttribute("font-size", "24px");
                        DepartmentName2.setAttribute("font-weight", "bold");
                        console.log((DeptHeightArray[k] + 50 + (DeptHeightcounter*180)));
                        DepartmentName2.appendChild(DepartmentName2txt);
                        Fsvg.appendChild(DepartmentName2);
                        CreateFacultyBoxes(ValueArray[r].NAME, ValueArray[r].DEPT, "imgs/FacultyImages/" + ValueArray[r].IMAGE, ValueArray[r].LINE1, ValueArray[r].LINE2, DeptX, (DeptHeightArray[k-2] + 80 + (DeptHeightcounter2*180)));
                    }
                }
            }
            console.log("X Position: " + DeptX);
            console.log("Dept Height Array" + DeptHeightArray)
        }
        console.log(DeptArray)
        });
}



function wrap(text, width) {
    text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
}

back.addEventListener('click', function() {
    var removeIt = document.body.removeChild(overlay);
    DeptArray = [];
    ValueArray = [];
    DeptHeightArray = [];
    ResearchGroupheader.textContent = '';
    Fsvg.innerHTML  = '';
});

function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

var val = document.getElementById("AdditiveManufacturingtxt").textContent;

console.log(val);


function CreateFacultyBoxes(Name, Department, Img, Line1, Line2, x, y) {
    var Frect = document.createElementNS(svgNS,"rect");
    var FImg = document.createElementNS(svgNS,"image");
    var FNameF = document.createElementNS(svgNS,"text");
    var FDepartment = document.createElementNS(svgNS,"text");
    var FLine1 = document.createElementNS(svgNS,"text");
    var FLine2 = document.createElementNS(svgNS,"text");
    var FirstNametxt = document.createTextNode(Name);
    var Departmenttxt = document.createTextNode(Department);
    var line1txt = document.createTextNode(Line1);
    var line2txt = document.createTextNode(Line2);
    Fsvg.setAttribute("height", "100%");
    Fsvg.setAttribute("width", "100%");
    Frect.setAttribute("height", "150");
    Frect.setAttribute("width", "500");
    Frect.setAttribute("fill", "#ffffff");
    Frect.setAttribute("stroke-width", "2");
    Frect.setAttribute("stroke", "#AC2A37");
    Frect.setAttribute("x", x);
    Frect.setAttribute("y", y);
    Frect.setAttribute("rx", 15);
    FNameF.setAttribute("x", (x+150));
    FNameF.setAttribute("y", (y+50));
    FNameF.setAttribute("font-size", "24px");
    FNameF.appendChild(FirstNametxt);
    FDepartment.setAttribute("x", (x+150));
    FDepartment.setAttribute("y", (y+75));
    FDepartment.setAttribute("font-size", "12px");
    FDepartment.appendChild(Departmenttxt);
    FLine1.setAttribute("x", (x+150));
    FLine1.setAttribute("y", (y+95));
    FLine1.setAttribute("font-size", "12px");
    FLine1.appendChild(line1txt);
    FLine2.setAttribute("x", (x+150));
    FLine2.setAttribute("y", (y+115));
    FLine2.setAttribute("font-size", "12px");
    FLine2.appendChild(line2txt);
    FImg.setAttribute("href", Img);
    FImg.setAttribute("x", (x+25));
    FImg.setAttribute("y", (y+25));
    FImg.setAttribute("height", "100");
    FImg.setAttribute("width", "100");
    Fsvg.appendChild(Frect);
    Fsvg.appendChild(FNameF);
    Fsvg.appendChild(FDepartment);
    Fsvg.appendChild(FImg);
    Fsvg.appendChild(FLine1);
    Fsvg.appendChild(FLine2);
}

//CreateFacultyBoxes("Pratap M. Rao", "Mechanical Engineering", "imgs/PratapRao.png", "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem", "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem", 200, 250);





