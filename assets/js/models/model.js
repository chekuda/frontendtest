'use strict';
//Classs for the model

function metrics({ name,device,currency } = {}) {
		this.name = name;
		this.device = device;
		this.currency = currency
}

module.exports = metrics;