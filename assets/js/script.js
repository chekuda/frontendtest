'use strict';

const Model = require('./models/model');
const getData = require('./service/service');
const sendError = require('./errors/errors');
const displayMetrics = require('./metrics/metrics');


const allData = getData.getDataFromBE();

const metrics = (allData.length > 0) ? 
	allData.map((data) => new Model(data)) : sendError.throwErrors('No Data to recover from backEnd'); 

if(!metrics || !(typeof metrics == "object") || metrics.length === 0){
	sendError.throwErrors('Wront data format');
}

displayMetrics.createNodes(metrics);
