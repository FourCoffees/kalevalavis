var max=0;
var chapters = [];
var svgNS = "http://www.w3.org/2000/svg";  

var DISTANCE = 50;
var MAXx = 100;
var PI = 3.14;

var allLines = 0;
//var INTERPOLATION = 10;

var CanvasHeight = 2430;
//var CanvasHeight = 4000;

var bezier = {};


//0 wainamoinen, 1 ilmarinen, 2 aino, 3 lemminkainen, 4 kullervo, 5 louhi, 6 mariatta 
var characters = [ [] , [], [], [], [], [], []];
var total = [];


var wainamoinenCount = 0;
var ilmarinenCount = 0;
var ainoCount = 0;
var kullervoCount = 0;
var louhiCount = 0;
var lemminkainenCount = 0;
var mariattaCount = 0;


//Class Chapter
function Chapter( lines,  name, number){
	this.name = name;
	this.lines = lines;
	this.size = lines.length;
	this.number = number;	
}

  
Chapter.prototype.getSize = function() {
    return this.size;
};

Chapter.prototype.getName = function() {
    return this.name;
};

Chapter.prototype.getLine= function( i) {
    return this.lines[i];
};


//Class Point with data for visualisation
function PointData(idIndex, characterName , line, x, y, color, chapter){
	this.type = idIndex;
	this.character = characterName;
	this.line = line;
	this.x = x;
	this.y = y;
	this.z = DISTANCE*idIndex;
	this.color = color;
	this.chapter = chapter;
}

PointData.prototype.getIndex = function() {
    return this.type;
};

PointData.prototype.getCharacter = function() {
    return this.character;
};

PointData.prototype.getLine = function() {
    return this.line;
};

PointData.prototype.getX = function() {
    return this.x;
};

PointData.prototype.getY = function() {
    return this.y;
};

PointData.prototype.getZ = function() {
    return this.z;
};


//Class Point with data for visualisation
function Line(characterName, start, end,control1, control2, color){
	this.characterName = characterName;
	this.start = start;
	this.end = end;
	this.control1 = control1;
	this.control2 = control2;
	this.color = color;
	
}


Line.prototype.characterName = function() {
    return this.characterName();
};



Line.prototype.startX = function() {
    return this.start.getX();
};

Line.prototype.startY = function() {
    return this.start.getY();
};

Line.prototype.endX = function() {
    return this.end.getX();
};

Line.prototype.endY = function() {
    return this.end.getY();
};

Line.prototype.control1X = function() {
    return this.control1.getX();
};

Line.prototype.control1Y = function() {
    return this.control1.getY();
};

Line.prototype.control2X = function() {
    return this.control2.getX();
};

Line.prototype.control2Y = function() {
    return this.control2.getY();
};


function Node(x, y, line){
	this.x = x;
	this.y = y;
	this.text = line;
}