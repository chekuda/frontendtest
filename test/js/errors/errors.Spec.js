'use strict';

const sendError = require('../../../assets/js/errors/errors'); 

describe('Errors', () =>{
	it('message received', () =>{
		const message = 'error to throw';

		expect(function (){
			sendError.throwErrors(message);
		}).toThrow(new Error('error to throw'));
	});
	it('message not received', () =>{
		expect(function (){
			sendError.throwErrors();
		}).toThrow();
	})
})