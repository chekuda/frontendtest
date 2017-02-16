'use strict';

const d3 = require('d3');
const defaultColours = require('./defaultColours')
const sendError = require('../errors/errors');


function getNumberToDisplay(number, currency){
		return  currency ? number.toLocaleString().replace(/,/g,'.')+currency :number.toLocaleString().replace(/,/g,'.');
}

function getPercentage(data){
		const total = data[0].quantity + data[1].quantity;
		return [Math.floor((data[0].quantity/total) * 100), Math.floor((data[1].quantity/total) * 100)]
}

//Gather the data for display the metrics
module.exports = {
	createNodes: function(data){
		let oldNode,newNode, selector,elementNode;

		if(document.querySelector('.feature')){
			oldNode = document.querySelector('.feature');
			newNode = oldNode.cloneNode(true);
			document.getElementById('main-content').removeChild(oldNode);
			data.forEach(element => {
				elementNode = newNode.cloneNode(true);
				elementNode.id = element.name;
				if(document.getElementById('main-content').appendChild(elementNode)) {
					selector = `#${elementNode.id} .circle`;	
					this.injectGraph(selector, element);
					this.injectDeviceBlock(elementNode.id, element);
				};
			});
		}
		else{
			sendError.throwErrors('No squeleton'); 
		}
	},
	injectGraph: function(selector, data){
		function getColors (i) {
      return defaultColours[data.name] ? 
        defaultColours[data.name][i]: defaultColours['defaultColour'][i];
		}

		const dataset = {things: [data.device[0].quantity, data.device[1].quantity]};
		const width = 315;
		const height = 315;
		const radius = Math.min(width, height) / 2;
		const color = d3.scale.category20();
		const pie = d3.layout.pie().sort(null);
		const arc = d3.svg.arc()
		    .innerRadius(radius - 85)
		    .outerRadius(radius - 77);
		const svg = d3.select(selector)
		    .append("svg")
		    .attr("width", width)
		    .attr("height", 264)
		    .append("g")
		    .attr("transform", "translate(" 
		        + width / 2.090 + "," 
		        + height / 2.38  + ")");
		const path = svg.selectAll("path")
		    .data(pie(dataset.things))
		    .enter().append("path")
		    .attr("fill", function(d, i) { return getColors(i); })
		    .attr("d", arc);

		svg.append("svg:text")
		    .attr("y", "-10")
		    .attr("text-anchor", "middle")
		    .attr("style","font-family:Arial")
		    .attr("font-size","18")
		    .attr("fill","#B6B6B6")
		    .text(data.name.toUpperCase());
		svg.append("svg:text")
		    .attr("y", "15")
		    .attr("text-anchor", "middle")
		    .attr("style","font-family:Arial")
		    .attr("font-size","25")
		    .attr("fill","#2d2c2c")
		    .text(getNumberToDisplay(data.device[0].quantity + data.device[1].quantity, data.currency));
	},
	injectDeviceBlock: function(id, data){
		const currency = data.currency;
		const colour = defaultColours[data.name] || defaultColours['defaultColour'];
		const percentageNumber = getPercentage(data.device);
		const dev = document.createElement('div');
		dev.className = 'device';
		document.querySelector(`#${id}`).appendChild(dev);
		let count = 0;
		data.device.forEach(device => {
			const newDevice = document.createElement('div');
			const numbers = document.createElement('div');
			const percentage = document.createElement('div');
			const quantity = document.createElement('div');

			newDevice.className = count == 0 ? 'leftDevice' : 'rightDevice';
			newDevice.id = device.name;
			newDevice.innerText = device.name.charAt(0).toUpperCase()+device.name.slice(1);
			newDevice.style.color = colour[count];
			numbers.className = "numbers";
			percentage.className = "percentage";
			percentage.innerText = `${percentageNumber[count]}%`;
			quantity.className = "quantity";
			quantity.innerText = currency ? getNumberToDisplay(device.quantity)+currency: getNumberToDisplay(device.quantity);
			dev.appendChild(newDevice);
			newDevice.appendChild(numbers);
			numbers.appendChild(percentage);
			numbers.appendChild(quantity);
			count++;
		})
	}

}