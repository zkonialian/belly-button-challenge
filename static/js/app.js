// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let samplemetadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let filterdata = samplemetadata.filter( x => x.id == sample) [0]

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata")

    // Use `.html("") to clear any existing metadata
    panel.html("")

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(filterdata).forEach(entry => {
      const [key, value] = entry;
      console.log(key, value);
      panel
      .append("h6")
      .text(`${key}: ${value}`)
    
    });

  
 
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let filterdata = samples.filter( x => x.id == sample) [0]

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = filterdata.otu_ids
    let otu_labels = filterdata.otu_labels
    let sample_values = filterdata.sample_values

    // Build a Bubble Chart
    var bubble_data = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
    
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values
      }
    }];
    

    
    var bubblelayout = {
      title: 'Bacteria Cultures Per Sample',
      showlegend: false,
      
    };

     // Render the Bubble Chart
    Plotly.newPlot('bubble', bubble_data, bubblelayout);
  

  
    
    // For the Bar Chart, map the otu_ids to a list of strings for your yticks

let yticks = otu_ids.map(x_id => `otu ${x_id}`).slice(0,10).reverse()

      // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    var bar_data = [{
      x: sample_values.slice(0,10).reverse(),
      y: yticks,
      text: otu_labels.slice(0,10).reverse(),
      orientation: 'h',
      marker: {
        color: 'rgba(55,128,191,0.6)',
        width: 1
      },
      type: 'bar'
    }];
    
    
    var barlayout = {
      title: 'Top 10 Bacteria Cultures Found',
    };

     // Render the Bar Chart
    Plotly.newPlot('bar', bar_data, barlayout);
    

  


   

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
      let sampleNames = data.names;
            
    // Use d3 to select the dropdown with id of `#selDataset`
    let selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    sampleNames.forEach((sample) => {
      selector
          .append("option")
          .text(sample)
          .property("value", sample);
  });


    // Get the first sample from the list
    let first_sample = sampleNames[0]


    // Build charts and metadata panel with the first sample
    buildCharts(first_sample)
    buildMetadata(first_sample)
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample)
  buildMetadata(newSample)
}

// Initialize the dashboard
init();
