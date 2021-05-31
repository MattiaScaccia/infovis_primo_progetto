var datasetPositions = [{"x" : 0, "y" : 0}, {"x" : 175, "y" : 0}, {"x" : 350, "y" : 0}, {"x" : 525, "y" : 0}, {"x" : 700, "y" : 0}, {"x" : 875, "y" : 0}
                        , {"x" : 1050, "y" : 0}, {"x" : 1225, "y" : 0}, {"x" : 1400, "y" : 0}, {"x" : 1575, "y" : 0}];

                        
var scaleFace = d3.scaleLinear();
var scaleNose = d3.scaleLinear();
var scaleXEye = d3.scaleLinear();
var scaleYEye = d3.scaleLinear();
var scaleMouth = d3.scaleLinear();


var width = 2000;
var height = 900;

var margin = {left: 50, top: 10, right:30, bottom: 10};

var svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

function updateScales(dataset){
    scaleFace.domain([d3.min(dataset, function(element){return element["face"]}), d3.max(dataset, function(element){return element["face"]})]).range([0,100]);
    scaleMouth.domain([d3.min(dataset, function(element){return element["mouth"]}),d3.max(dataset, function(element){return element["mouth"]})]).range([1,4]);
    scaleNose.domain([d3.min(dataset, function(element){return element["nose"]}),d3.max(dataset, function(element){return element["nose"]})]).range([1,2]);
    scaleXEye.domain([d3.min(dataset, function(element){return element["eyes"]}),d3.max(dataset, function(element){return element["eyes"]})]).range([0,6.5]);
    scaleYEye.domain([d3.min(dataset, function(element){return element["eyes"]}),d3.max(dataset, function(element){return element["eyes"]})]).range([0,5.5]);
}

function drawFace(d) {
  
  path = "m80,100c-106,0 " + (scaleFace(d.face)*-1) +  ",101 0,100c" + scaleFace(d.face) + ",0 107,-100 0,-100z";
  
  return path;
}

function drawNose(d) {

  path = "m80,127c" + (scaleNose(d.nose)*-8) + "," + (scaleNose(d.nose)*2) + " " + (scaleNose(d.nose)*-2) +  "," + (scaleNose(d.nose)*16) + " " + (scaleNose(d.nose)*1) + "," + (scaleNose(d.nose)*16) + "c0,0 "+ (scaleNose(d.nose)*7) + "," + (scaleNose(d.nose)*-18) + " " + (scaleNose(d.nose)*-1) + "," + (scaleNose(d.nose)*-16) + "z"; 
  //m80,125c-8,2 -2,16 1,16c0,0 7,-18 -1,-16z
  
  return path;
}

function drawMouth(d) {

  path = "m80,162c" + (13.5*scaleMouth(d.mouth)) + "," + "0" + " " + (0.875*scaleMouth(d.mouth)) + "," + (4*scaleMouth(d.mouth)) + " " + (0.875*scaleMouth(d.mouth)) + "," + (4*scaleMouth(d.mouth)) + "c0,0 " + (-14.25*scaleMouth(d.mouth)) + "," + (-4*scaleMouth(d.mouth)) + " " + (-0.875*scaleMouth(d.mouth)) + "," + (-4*scaleMouth(d.mouth)) + "z";
  
  return path;
}

function removeDuplicates(array){
    let findDuplicates = array => array.filter((item, index) => array.lastIndexOf(item) != index);
    let duplicates = findDuplicates(array);
    while(duplicates.length !== 0){
        console.log(findDuplicates(array));
        duplicates.forEach(element => array[array.indexOf(element)]++);
        duplicates = findDuplicates(array);
    }
    return array;
}

function handleClickFace(){
    let i = 0;
    dataset.sort(function (a,b) { return d3.ascending(a.face, b.face);});
    //array[elemento_1_dataset] = indice_new_dataset;
    let array = [];
    for (const index in dataset_copy){
        i = 0;
        let elem = dataset_copy[index];
        for(const index2 in dataset){
            let elem2 = dataset[index2];
            if(elem.face == elem2.face){
                array.push(i);
                break;
            }else {i = i +1;}
        }
    }
    array = removeDuplicates(array);
    //d3.selectAll("path.face").remove();
    d3.select("svg").selectAll("g").transition().duration(3000).attr("transform", function(d,j) {return "translate(" + datasetPositions[array[j]].x + "," + datasetPositions[array[j]].y + ")";});
}

function handleClickEyes(){
    let i = 0;
    dataset.sort(function (a,b) { return d3.ascending(a.eyes, b.eyes);});
    //array[elemento_1_dataset] = indice_new_dataset;
    let array = [];
    for (const index in dataset_copy){
        i = 0;
        let elem = dataset_copy[index];
        for(const index2 in dataset){
            let elem2 = dataset[index2];
            if(elem.eyes == elem2.eyes){
                array.push(i);
                break;
            }else {i = i +1;}
        }
    }
    array = removeDuplicates(array);
    d3.select("svg").selectAll("g").transition().duration(3000).attr("transform", function(d,j) {return "translate(" + datasetPositions[array[j]].x + "," + datasetPositions[array[j]].y + ")";});
}

function handleClickNose(){
    let i = 0;
    dataset.sort(function (a,b) { return d3.ascending(a.nose, b.nose);});
    //array[elemento_1_dataset] = indice_new_dataset;
    let array = [];
    for (const index in dataset_copy){
        i = 0;
        let elem = dataset_copy[index];
        for(const index2 in dataset){
            let elem2 = dataset[index2];
            if(elem.nose == elem2.nose){
                array.push(i);
                break;
            }else {i = i +1;}
        }
    }
    array = removeDuplicates(array);
    d3.select("svg").selectAll("g").transition().duration(3000).attr("transform", function(d,j) {return "translate(" + datasetPositions[array[j]].x + "," + datasetPositions[array[j]].y + ")";});
}

function handleClickMouth(){
    let i = 0;
    dataset.sort(function (a,b) { return d3.ascending(a.mouth, b.mouth);});
    //array[elemento_1_dataset] = indice_new_dataset;
    let array = [];
    for (const index in dataset_copy){
        i = 0;
        let elem = dataset_copy[index];
        for(const index2 in dataset){
            let elem2 = dataset[index2];
            if(elem.mouth == elem2.mouth){
                array.push(i);
                break;
            }else {i = i +1;}
        }
    }
    array = removeDuplicates(array);
    d3.select("svg").selectAll("g").transition().duration(3000).attr("transform", function(d,j) {return "translate(" + datasetPositions[array[j]].x + "," + datasetPositions[array[j]].y + ")";});
}

function drawing(dataset){
    
    var faceContainer = d3.select("svg").selectAll("g")
                            .data(dataset)
                            .enter().append("g")
                            .attr("id", function(d,i){return "svg"+ i;})
                            .attr("transform", function(d,i) {return "translate(" + datasetPositions[i].x + "," + datasetPositions[i].y + ")" });

    
    faceContainer.append("path")
        .attr("class", "face")
        .attr("d", drawFace)
        .attr("fill", "#ffe6e6")
        .attr("stroke", "black");
        
    faceContainer.append("ellipse")
        .attr("class", "left_eye")
        .attr("cy", 123.5) //+23.5
        .attr("cx", 52) //-28
        .attr("ry", function(d){return 4 + scaleYEye(d.eyes);}) //from 4 to 9.5
        .attr("rx", function(d){return 5 + scaleXEye(d.eyes);}) //from 5 to 11.5
        .attr("fill", "white")
        .attr("stroke", "black");
        
    faceContainer.append("ellipse")
        .attr("class", "left_iris")
        .attr("cy", 123.5) //+23.5
        .attr("cx", 52) //-28
        .attr("ry", 1)
        .attr("rx", 1) 
        .attr("fill", "black")
        .attr("stroke", "black");
        
    faceContainer.append("ellipse")
        .attr("class", "right_eye")
        .attr("cy", 123.5) //+23.5
        .attr("cx", 107) //+55 from left
        .attr("ry", function(d){return 4 + scaleYEye(d.eyes);}) //from 4 to 9.5
        .attr("rx", function(d){return 5 + scaleXEye(d.eyes);}) //from 5 to 11.5
        .attr("fill", "white")
        .attr("stroke", "black");
    
    faceContainer.append("ellipse")
        .attr("class", "right_iris")
        .attr("cy", 123.5) //+23.5
        .attr("cx", 107) //-28
        .attr("ry", 1) 
        .attr("rx", 1) 
        .attr("fill", "black")
        .attr("stroke", "black");
        
    faceContainer.append("path")
        .attr("class", "nose")
        .attr("d", drawNose)
        .attr("fill", "#ffcccc")
        .attr("stroke", "black");
        
    faceContainer
        .append("path")
        .attr("class", "mouth")
        .attr("d", drawMouth)
        .attr("fill", "#ff9999")
        .attr("stroke", "red")
        .attr("stroke-width", 2);
        
    d3.selectAll("path.face").on("click", handleClickFace);
    d3.selectAll("ellipse.left_eye").on("click", handleClickEyes);
    d3.selectAll("ellipse.left_iris").on("click", handleClickEyes);
    d3.selectAll("ellipse.right_iris").on("click", handleClickEyes);
    d3.selectAll("ellipse.right_eye").on("click", handleClickEyes);
    d3.selectAll("path.nose").on("click", handleClickNose);
    d3.selectAll("path.mouth").on("click", handleClickMouth);

        
    //g.selectAll("path.mouth").transition().duration(5000).attr("transform", function(d,i){return "translate(" + datasetPositions[i].x + "," + datasetPositions[i].y + ")"});
}

//dataset = dataset.sort(function (a,b) { return d3.ascending(a.face, b.face);});
d3.json("data/dataset.json")
	.then(function(dataset_json) {
        updateScales(dataset_json);
        dataset = dataset_json;
        dataset_copy = JSON.parse(JSON.stringify(dataset));
        //var dataset = dataset;
        drawing(dataset);
    });
