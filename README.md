# kalevalavis
Code for kalevalavis.com
This is a customisation of a data-created curve using d3.js. 

The Kalevala book is sampled and broken into chunks that are then checked for words that usually represent the classical duality between 'good' and 'evil'.

The data/good.txt and data/evil.txt contain the (manually) cherry picked words that often represent good, bright, happy vs evil, gloomy, macabre words that appear throught the book's english translation.

The visualisation curve grows to the left or the right for each verse of the poem depending on which of the two (good or evil) are more predominant in that section.

You can see the highlights of the storyline in the curve's extremes.

The secondary dotted lines are the sub-stories of each of the 5 main characters, appearing when the text refer's to them.

See the demo here:

[Absolute README link](http://fourcoffees.github.io/kalevalavis/)

Technically the curve is a bezier curve (path) and the control points are 
modified accordingly.

More documentation will come..

![alt tag](https://raw.githubusercontent.com/FourCoffees/kalevalavis/master/exampleImge.png)
