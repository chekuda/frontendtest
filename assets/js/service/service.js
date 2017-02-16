'use strict';

//Call to fake server and return the data requested
module.exports = {
	getDataFromBE: function() {
		const data = [{
				name: 'revenue',
				device: [{
					name: 'tablet',
					quantity: 120000
				},{
					name: 'smartphone',
					quantity: 80000
				}],
				currency: '€'
			},{
				name: 'impressions',
				device: [{
					name: 'tablet',
					quantity: 20000000
				},{
					name: 'smartphone',
					quantity: 30000000
				}]
			},{
				name: 'visits',
				device: [{
					name: 'tablet',
					quantity: 480000000
				},{
					name: 'smartphone',
					quantity: 120000000
				}]
			}]
	return data;
	}
};