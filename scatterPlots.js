//This function gets the mean grades for each of the penguins. The function does by accessing the objects of arrays in the json file where the information exists. A single entry(penguin) is paired with their grade. 
var getMeanGrade = function(entries)
{  
    console.log(entries)
    return d3.mean(entries,function(entry)
        {
            return entry.grade;
        })
}

//duration of transition
var dur = 1000

//The drawScatter functions displays the circles or scatter on the graph as well as sets up a title for what is explaining.
var drawScatter = function(students,target,
              xScale,yScale,xProp,yProp)
{
    setBanner(xProp.toUpperCase() +" vs "+ yProp.toUpperCase());

    /*var scales = recalculateScales(students,target, xProp, yProp, graph)
    var xScale = scales.xScale
    var yScale = scales.yScale
    
    updateAxes(target,xScale,yScale)*/
    
    //JOIN - rebind the data
    var circles = d3.select(target)
        .select(".graph")
        .selectAll("circle")
        .data(students, function(student,index)
             {
                return student.picture
             })
    
    //ENTER - add new stuff
    circles.enter()
        .append("circle")
    
    //EXIT - remove old stuff
    circles.exit()
        .remove()
    
    //UPDATE - REDECORATE
    d3.select(target)
    .select(".graph")
    .selectAll("circle")
    .transition()
    .duration(dur)
    .attr("cx",function(student)
    {
        return xScale(getMeanGrade(student[xProp]));    
    })
    .attr("cy",function(student)
    {
        return yScale(getMeanGrade(student[yProp]));    
    })
    .attr("r",4);


}

//clearScatter removes the circles from the scatter plot so that later on when the buttons are intialized. The existing scatter being displayed can be replaced by the new scatter wanting to be displayed.
/*var clearScatter = function(target)
{
    d3.select(target)
        .select(".graph")
        .selectAll("circle")
        .remove();
}*/

//This function creates the Axes by utilizing the screen, margin, graph, target, xScale, and yScale. SETUP CODE
var createAxes = function(screen,margins,graph,
                           target,xScale,yScale)
{
    //assigns each axis a position
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    //places the axes in the correct format
    var axes = d3.select(target)
        .append("g")
    axes.append("g")
        .attr("transform","translate("+margins.left+","
             +(margins.top+graph.height)+")")
        .call(xAxis)
    axes.append("g")
        .attr("transform","translate("+margins.left+","
             +(margins.top)+")")
        .call(yAxis)
}

/*var initAxes = function(screen,margins,graph,target)
{
    var axes = d3.select (target)
        .append("g")
        .classed("class","axis")
    
    axes.append("g")
        .attr("id","xAxis")
        .attr("transform","translate("+margins.left+","
             +(margins.top+graph.height)+")")
        
    
    axes.append("g")
        .attr("id","yAxis")
        .attr("transform","translate("+(margins.left-5)+","
             +(margins.top)+")")
}

var updateAxes = function(target, xScale, yScale)
{
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    
    d3.select("#xAxis")
        .transition()
        .duration(dur)
        .call(xAxis)
    
    d3.select("#yAxis")
        .transition()
        .duration(dur)
        .call(yAxis)
}

var recalculateScales = function(students,target, xProp, yProp, graph)
{
    console.log("updating x")
    var xScale = d3.scaleLinear()
        .domain([d3.min(students,function(student)
                        {return getMeanGrade(student[xProp])}),
                 d3.max(students,function(student)
                        {return getMeanGrade(student[xProp])})])
        .range([0,graph.height])
    console.log("updating y")
    console.log(d3.min(students,getMeanGrade[yProp]))
    var yScale = d3.scaleLinear()
        .domain([d3.min(students,function(student)
                        {return getMeanGrade(student[yProp])}),
                 d3.max(students, function(student)
                        {return getMeanGrade(student[yProp])})])
        .range([graph.height,0])
    
    return {xScale:xScale,yScale:yScale}
}*/

//initGraph is where all the functions are placed as well as the parameters for the graph to display the final product. SETUP CODE
var initGraph = function(target, students)
{
    //the size of the screen
    var screen = {width:500, height:400};
    
    //how much space will be on each side of the graph
    var margins = {top:15,bottom:40,left:70,right:15};
    
    //generated how much space the graph will take up
    var graph = 
    {
        width:screen.width-margins.left-margins.right,
        height:screen.height-margins.top-margins.bottom,
    }
    

    //set the screen size
    d3.select(target)
        .attr("width",screen.width)
        .attr("height",screen.height)
    
    //create a group for the graph
    var g = d3.select(target)
        .append("g")
        .classed("graph",true)
        .attr("transform","translate("+margins.left+","+
             margins.top+")");
        
    //create scales for all of the dimensions
    
    
    var xScale = d3.scaleLinear()
        .domain([0,100])
        .range([0,graph.width])
           
    var yScale = d3.scaleLinear()
        .domain([0,100])
        .range([graph.height,0])
  

    
 
    
   createAxes(screen,margins,graph,target,xScale,yScale);
    
    initButtons(students,target,xScale,yScale);
    
    setBanner("Click buttons to graphs");
    
    

}

//initButtons takes the buttons created in the html and initializes them...creates the action so that when clicked on the Scatter plot is cleared then redrawn to display the data stated for that button.
var initButtons = function(students,target, xScale, yScale)
{
    
    d3.select("#fvh")
    .on("click",function()
    {
        drawScatter(students,target,
              xScale,yScale,"final","homework");
    })
    
    d3.select("#hvq")
    .on("click",function()
    {
        drawScatter(students,target,
              xScale,yScale,"homework","test");
    })
    
    d3.select("#tvf")
    .on("click",function()
    {
        drawScatter(students,target,
              xScale,yScale,"test","final");
    })
    
    d3.select("#tvq")
    .on("click",function()
    {
        drawScatter(students,target,
              xScale,yScale,"test","quizes");
    })
    
    
    
}

//setBanner displays the title of the scatterplot being shown. SETUP CODE
var setBanner = function(msg)
{
    d3.select("#banner")
        .text(msg);
    
}


//grabs the data from the json file, then there are instructions on what to do when that data is either returned or not found.
var penguinPromise = d3.json("/classData.json");

penguinPromise.then(function(penguins)
{
    console.log("class data",penguins);
    initGraph("#scatter", penguins);
   
},
function(err)
{
   console.log("Error Loading data:",err);
});