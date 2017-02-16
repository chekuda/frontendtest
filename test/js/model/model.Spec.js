'use strict';

const Model = require('../../../assets/js/models/model');

describe('Model', () =>{
	it('no params has been received', () =>{
		const newModel = new Model();

		expect(newModel.name).not.toBeDefined();
		expect(newModel.device).not.toBeDefined();
		expect(newModel.curency).not.toBeDefined();
	});
	it('no currency', () =>{
		const data = {
			name: 'dataName',
			device: [{
				name: 'deviceName',
				quantity: 123456
			}]
		};
		const newModel = new Model(data);

		expect(newModel).toEqual(jasmine.objectContaining({
			name: 'dataName',
			device: [{
				name: 'deviceName',
				quantity: 123456
			}],
			currency: undefined
		}))
	});
	it('receive all the properties of the object', () =>{
		const data = {
			name: 'dataName',
			device: [{
				name: 'deviceName',
				quantity: 123456
			}],
			currency: '£'
		};
		const newModel = new Model(data);

		expect(newModel).toEqual(jasmine.objectContaining({
			name: 'dataName',
			device: [{
				name: 'deviceName',
				quantity: 123456
			}],
			currency: '£'
		}))
	})
})