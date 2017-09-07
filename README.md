# Kalevalavis

### Kalevalavis is a text visualisation of the Kalevala finnish epic.  
#### live demo: [fourcoffees.github.io/kalevalavis](http://fourcoffees.github.io/kalevalavis/)
#### [research text](http://fourcoffees.github.io/kalevalavis/DigitalNarratives-Three Experiments on the Kalevala.pdf)

The Kalevala book is sampled and broken into chunks that are then checked for words that usually represent the classical duality between 'good' and 'evil'.

The data/good.txt and data/evil.txt contain the (manually) cherry picked words that often represent good, bright, happy vs evil, gloomy, macabre words that appear throught the book's english translation.

The visualisation curve grows to the left or the right for each verse of the poem depending on which of the two (good or evil) are more predominant in that section. You can see the highlights of the storyline in the curve's extremes.

The secondary dotted lines are the sub-stories of each of the 5 main characters, appearing when the text refer's to them.

   Made with d3.js by customising a data-created bezier curve.  
   Open translation from [gutenberg project]( http://www.gutenberg.org/ebooks/5184).  

![alt tag](https://raw.githubusercontent.com/FourCoffees/kalevalavis/master/exampleImge.png)
