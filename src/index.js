import { handleSummaryFileSelect, handleJSONFileSelect } from './js/utils/handleFile';
import { saveAsPNG } from './js/utils/saveAsPNG';
import { SVG_ID, DEBUG, TEXT_OFFSET, ARROW_OFFSET, LAYER_TYPES, COLORS } from './js/utils/constants';
import { saveAsSVG } from './js/utils/saveAsSVG';
import { parseJSONToD3Data } from './js/components/parseJSONToD3Data';

// for debugging
// if (DEBUG) {
//   const json = DEBUG_JSON;
//   const mv = new MViz(json);
//   mv.draw();
// }


document.getElementById('upload_summary_file').addEventListener('change', (evt) => {
  handleSummaryFileSelect(evt);
  document.getElementById('viz_container').innerHTML = "";
  if (!document.getElementById('download_buttons').innerHTML) {
    const downloadSVGButton = document.createElement("button");
    downloadSVGButton.setAttribute("id", "download_svg");
    downloadSVGButton.innerHTML = "Download as SVG";
    const downloadPNGButton = document.createElement("button");
    downloadPNGButton.setAttribute("id", "download_png");
    downloadPNGButton.innerHTML = "Download as PNG";
    document.getElementById('download_buttons').appendChild(downloadSVGButton);
    document.getElementById('download_buttons').appendChild(downloadPNGButton);
    document.getElementById('download_png').addEventListener('click', () => {
      saveAsPNG(document.getElementById(SVG_ID));
    });
    
    document.getElementById('download_svg').addEventListener('click', () => {
      saveAsSVG(document.getElementById(SVG_ID));
    });
  }
});

document.getElementById('upload_json_file').addEventListener('change', (evt) => {
  handleJSONFileSelect(evt);
  document.getElementById('viz_container').innerHTML = "";
  if (!document.getElementById('download_buttons').innerHTML) {
    const downloadSVGButton = document.createElement("button");
    downloadSVGButton.setAttribute("id", "download_svg");
    downloadSVGButton.innerHTML = "Download as SVG";
    const downloadPNGButton = document.createElement("button");
    downloadPNGButton.setAttribute("id", "download_png");
    downloadPNGButton.innerHTML = "Download as PNG";
    document.getElementById('download_buttons').appendChild(downloadSVGButton);
    document.getElementById('download_buttons').appendChild(downloadPNGButton);
    document.getElementById('download_png').addEventListener('click', () => {
      saveAsPNG(document.getElementById(SVG_ID));
    });
    
    document.getElementById('download_svg').addEventListener('click', () => {
      saveAsSVG(document.getElementById(SVG_ID));
    });
  }
})

const data = JSON.parse(parseJSONToD3Data('{"layers":[{"name":"block1_conv1","type":"Conv2D"},{"name":"block1_conv2","type":"Conv2D"},{"name":"block1_pool","type":"MaxPooling2D"},{"name":"block2_conv1","type":"Conv2D"},{"name":"block2_conv2","type":"Conv2D"},{"name":"block2_pool","type":"MaxPooling2D"},{"name":"block3_conv1","type":"Conv2D"},{"name":"block3_conv2","type":"Conv2D"},{"name":"block3_conv3","type":"Conv2D"},{"name":"block3_pool","type":"MaxPooling2D"},{"name":"block4_conv1","type":"Conv2D"},{"name":"block4_conv2","type":"Conv2D"},{"name":"block4_conv3","type":"Conv2D"},{"name":"block4_pool","type":"MaxPooling2D"},{"name":"block5_conv1","type":"Conv2D"},{"name":"block5_conv2","type":"Conv2D"},{"name":"block5_conv3","type":"Conv2D"},{"name":"block5_pool","type":"MaxPooling2D"},{"name":"fc1","type":"Dense"},{"name":"fc2","type":"Dense"},{"name":"predictions","type":"Dense"}],"attributes":{"Conv2D":{"shape":"rect","text":["name"]},"MaxPooling2D":{"shape":"text","text":["name"]},"Dense":{"shape":"rect","text":["name"]}}}'));

// main(data);
//  svg = d3.select("body")
//   .append("svg")
//   .attr("width", 1200)
//   .attr("height", 800);

// const getTextX = (d) => {
//   return d.x + d.width / 2;
// }

// const getTextY = (d) => {
//   return d.y + d.height / 2 + TEXT_OFFSET
// }

// const colors = d3.scaleOrdinal()
//   .domain(LAYER_TYPES)
//   .range(COLORS);

//   const drag = d3.drag()
//    .on("drag", function(d) {
//      d.x += d3.event.dx;
//      d.y += d3.event.dy;

//      d3.select(this).select("rect").attr("x", d.x).attr("y", d.y);
//      d3.select(this).select("text").attr("x", getTextX).attr("y", getTextY);
//      links.each(function(l, li) {
//        if (l.source == d.name) {
//          d3.select(this)
//           .attr("x1", d.x + d.width / 2)
//           .attr("y1", d.y + d.height);
//        } else if (l.destination == d.name) {
//          d3.select(this)
//           .attr("x2", d.x + d.width / 2) 
//           .attr("y2", d.y - ARROW_OFFSET);
//        }
//      });
//    });
//    const links = svg.selectAll("link")
//    .data(data.links)
//    .enter()
//    .append("line")
//    .attr("class", "link")
//    .attr("x1", function(l) {
//      var sourceNode = data.rect.filter(function(d) {
//        return d.name == l.source
//      })[0];
//      d3.select(this).attr("y1", sourceNode.y + sourceNode.height);
//      return sourceNode.x + sourceNode.width / 2
//    })
//    .attr("x2", function(l) {
//      var destNode = data.rect.filter(function(d) {
//       return d.name == l.destination
//      })[0];
//      d3.select(this).attr("y2", destNode.y - ARROW_OFFSET);
//      return destNode.x + destNode.width / 2;
//    })
//    .attr("fill", "none")
//    .attr("stroke", "black")
//    .attr("marker-end", "url(#triangle)");

//   var g = svg.selectAll("node")
//    .data(data.rect)
//    .enter()
//    .append("g")
//    .call(drag);

   
//   g.append("rect")
//    .attr("class", "node")
//    .attr("x", d => d.x)
//    .attr("y", d => d.y)
//    .attr("width", d => d.width)
//    .attr("height", d => d.height)
//    .attr("fill", d => colors(d.type))
   

//    g.append("text")
//     .attr("x", getTextX)
//     .attr("y", getTextY)
//     .text(d => d.label)
//     .style('fill', 'white')
//     .style("text-anchor", "middle");

//     svg.append("svg:defs").append("svg:marker")
//                 .attr("id", "triangle")
//                 .attr("refX", 6)
//                 .attr("refY", 6)
//                 .attr("markerWidth", 30)
//                 .attr("markerHeight", 30)
//                 .attr("orient", "auto")
//                 .append("path")
//                 .attr("d", "M 0 0 12 6 0 12 3 6")
//                 .style("fill", "black");

    