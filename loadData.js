/* 
* Load sample data
*/
var stringData = $.ajax({
                    url: "data/kalevala.txt",
                    async: false
                 }).responseText;


var WainamoinenData = $.ajax({
                    url: "data/wainamoinen.txt",
                    async: false
                 }).responseText;
var KullervoData = $.ajax({
                    url: "data/kullervo.txt",
                    async: false
                 }).responseText;
var IlamrinenData = $.ajax({
                    url: "data/ilmarinen.txt",
                    async: false
                 }).responseText;
var LouhiData = $.ajax({
                    url: "data/louhi.txt",
                    async: false
                 }).responseText;
var LemminkainenData = $.ajax({
                    url: "data/lemminkainen.txt",
                    async: false
                 }).responseText;

var ainoData = $.ajax({
                    url: "data/aino.txt",
                    async: false
                 }).responseText;
                 
var mariattaData = $.ajax({
                    url: "data/mariatta.txt",
                    async: false
                 }).responseText;                 
                 


var EvilData  = $.ajax({
                    url: "data/evil.txt",
                    async: false
                 }).responseText;

var GoodData = $.ajax({
                    url: "data/good.txt",
                    async: false
                 }).responseText;

//Split values of string data
var chapterArray = stringData.split("\n\n\n\n\n");
var stringArray = stringData.split('.');
var wainamoinenArray = WainamoinenData.split(',');
var ilmarinenArray = IlamrinenData.split(',');
var louhiArray  = LouhiData.split(',');
var lemminkainenArray = LemminkainenData.split(',');
var kullervoArray = KullervoData.split(',');
var ainoArray = ainoData.split(',');
var mariattaArray =  mariattaData.split(',');

var evilArray = EvilData.split(',');
var goodArray = GoodData.split(',');