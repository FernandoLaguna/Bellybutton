function init() {
    // d3.select() method is used to select the dropdown menu
    var selector = d3.select("#selDataset");
    // d3.json() method is used to read the data from samples.json. The data from the entire JSON file is assigned the (arbitrary) argument name data.
    d3.json("samples.json").then((data) => {
      console.log(data);
    //   Inside the data object, the names array contains the ID numbers of all the study participants
      var sampleNames = data.names;

      // For example, ID "940" is the first element of the sampleNames array. As the forEach() method iterates over the first element of the array,
      sampleNames.forEach((sample) => {
        // 
        selector
        //  a menu option is appended to the dropdown menu. 
          .append("option")
        //  It is then given the text (the text seen in the dropdown menu) "940", 
          .text(sample)
        //  and its property is also assigned "940"
          .property("value", sample);
      });
  })}
  
  init();

// This function is called by the onchange attribute of the dropdown menu in index.html.   
// The argument name newSample refers to the value of the selected menu option. In index.html
  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }

//   The function buildMetadata() takes in sample, or an ID number, as its argumen
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
    //    filter for an object in the array whose id property matches the ID number passed into buildMetadata() as sample
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      console.log(resultArray)
      // Because the results of the filter() method are returned as an array, the first item in the array (resultArray[0]) is selected and assigned the variable r
      var result = resultArray[0];
      console.log(result)
      
      // The d3.select() method is used to select the sample-metadata <div>, and the variable PANEL is assigned to it
      var PANEL = d3.select("#sample-metadata");
      // PANEL.html("") ensures that the contents of the panel are cleared when another ID number is chosen
      PANEL.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
    });
  }
  
  // 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
  var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
  var resArray = samples.filter(Obj => Obj.id == sample);
  console.log(resArray)

    //  5. Create a variable that holds the first sample in the array.
  var results = resArray[0];
  console.log(results);

  var sortedSamplesArray = results.sample_values.sort((a,b) =>
  b - a); 
  console.log(sortedSamplesArray);
  
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
  
  var otuIds = results.otu_ids
  var otuLabels = results.otu_labels
  var sampleValues = results.sample_values
  console.log(sampleValues)

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    
    var valuesTopTen = sampleValues.slice (0,10);
    console.log(valuesTopTen);
    var otuIdsTopTen = otuIds.slice(0,10);
    var otuIdsStrings = otuIdsTopTen.map(e => e + 'otu ')
    console.log(otuIdsStrings)

   

    // 8. Create the trace for the bar chart. 
    var barData = {
      x: (valuesTopTen),
      y: (otuIdsStrings),
      type: "bar",
      text: (otuLabels),
      orientation: 'h'
    };
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "The 10 bacteria Culture found",
      xaxis: {title: "Number of bacterias"},
      yaxis: {title: "Bacteria ID"}
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("plotArea", [barData], barLayout);

      // 1. Create the trace for the bubble chart.
      var bubbleData = {
        x : (otuIds),
        y: (sampleValues),
        mode: "markers",
        marker: {
        size: (sampleValues),
        color: (otuIds),
        colorscale: 'RdBu',
        text: (otuLabels),
        } 
      };
  
      var bubbleData = [bubbleData]
  
      // 2. Create the layout for the bubble chart.
      var bubbleLayout = {
        title: "Bacteria Cutures Per Sample",
        showlegend: false,
        height: 600,
        width: 1200,
        xaxis: {title: "OTU ID"},
        yaxis: {title: "Sample Values"}
      };
  
      // 3. Use Plotly to plot the data with the layout.
      Plotly.newPlot("plotArea2", bubbleData, bubbleLayout); 
  });
}


  

