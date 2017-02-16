'use strict';

const displayMetrics = require('../../../assets/js/metrics/metrics');

describe('displayMetrics', () => {
  describe('wront markup', () =>{
    it('feature node does not exist in de DOM', () =>{
      expect(function (){
            displayMetrics.createNodes([])
      }).toThrow(new Error('No squeleton'));
    });
  })
  describe('right markup', () => {
    let main, feature, circle;
    beforeEach(()=>{
      main = document.createElement('div');
      main.id = 'main-content';
      feature = document.createElement('div');
      feature.className = 'feature';
      circle = document.createElement('div');
      circle.className = 'circle';
      document.body.appendChild(main);
      main.appendChild(feature);
      feature.appendChild(circle);
    });
    afterEach(() =>{
      document.body.removeChild(main);
    });
    it('as many feature nodes as length of metrics', () => {
      const metrics = [{
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
      }]
      displayMetrics.createNodes(metrics);
      expect(document.querySelectorAll('.feature').length).toEqual(2);
    });
    it('as many graph nodes as length of metrics', () => {
     const metrics = [{
        name: 'revenue',
        device: [{
          name: 'tablet',
          quantity: 120000
        },{
          name: 'smartphone',
          quantity: 80000
        }],
        currency: '€'
      }]
      displayMetrics.createNodes(metrics);
      expect(document.querySelectorAll('svg g').length).toEqual(1);
    });
    it('metrics does not have colour specified', () => {
      const metrics = [{
        name: 'metricName',
        device: [{
          name: 'tablet',
          quantity: 120000
        },{
          name: 'smartphone',
          quantity: 80000
        }],
        currency: '€'
      }]
      displayMetrics.createNodes(metrics);
      expect(document.querySelector('svg path').getAttribute('fill')).toEqual('#ffffff');
    });
    it('metrics have colour specified', () => {
      const metrics = [{
        name: 'revenue',
        device: [{
          name: 'tablet',
          quantity: 120000
        },{
          name: 'smartphone',
          quantity: 80000
        }],
        currency: '€'
      }]
      displayMetrics.createNodes(metrics);
      expect(document.querySelector('svg path').getAttribute('fill')).toEqual('#016805');
    });
    it('see the right information within the metric circle', () => {
      const metrics = [{
        name: 'metricName',
        device: [{
          name: 'tablet',
          quantity: 10
        },{
          name: 'smartphone',
          quantity: 10
        }],
        currency: '€'
      },{
        name: 'revenue',
        device: [{
          name: 'tablet',
          quantity: 50
        },{
          name: 'smartphone',
          quantity: 60
        }],
        currency: '€'
      }]
      displayMetrics.createNodes(metrics);
      const totalText = [].slice.call(document.querySelectorAll('svg text'));

      expect(totalText.map(element => element.textContent.toLowerCase()))
        .toEqual(['metricname', '20€','revenue', '110€']);
    });
    it('display the right percentage per device', () => {
      const metrics = [{
        name: 'metricName',
        device: [{
          name: 'tablet',
          quantity: 120
        },{
          name: 'smartphone',
          quantity: 80
        }],
        currency: '€'
      }]
      displayMetrics.createNodes(metrics);
      const percentage = [].slice.call(document.querySelectorAll('.percentage'));

      expect(percentage.map(element => element.textContent))
        .toEqual(['60%', '40%']);
    });
    it('display the right quantity per device', () => {
      const metrics = [{
        name: 'metricName',
        device: [{
          name: 'tablet',
          quantity: 120
        },{
          name: 'smartphone',
          quantity: 80
        }],
        currency: '€'
      }]
      displayMetrics.createNodes(metrics);
      const percentage = [].slice.call(document.querySelectorAll('.quantity'));

      expect(percentage.map(element => element.textContent))
        .toEqual(['120€', '80€']);
    });
 });
})