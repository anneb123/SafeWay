///<reference path="../node_modules/@types/heremaps/index.d.ts"/>


import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';

import {} from '@angular/core';


@Component({
  selector: 'maps',
  template: `
    <div style="width: 640px; height: 480px" #mapsContainer></div>`,
  //does not work yet
  //styleUrls: ['/app/here.component.css']
})

export class HereComponent implements OnInit {

  //constructor(@Inject(DataModel) private model:DataModel)){
  //}

  @ViewChild('mapsContainer') mapsContainer:ElementRef;

  ngOnInit() {

     /**
     * Moves the map to display over Berlin
     *
     * @param  {H.Map} map      A HERE Map instance within the application
     */
     function moveMapToBerlin(parameters: {map: H.Map}){
     let {map} = parameters;
     map.setCenter({lat: 52.5159, lng: 13.3777});
     map.setZoom(10);
     }

     var pixelRatio = devicePixelRatio > 1 ? 2 : 1;

     var platform = new H.service.Platform({
     'app_id': 'XXX',
     'app_code': 'XXX',
     useCIT: true,
     useHTTPS: true
     });


     // Obtain the default map types from the platform object:
     var defaultLayers = platform.createDefaultLayers();


     //Step 2: initialize a map  - not specificing a location will give a whole world view.
     //instantiate (and display) a map
     var map = new H.Map(this.mapsContainer.nativeElement,
     platform.getMapTileService({
     type: 'base'
     }).createTileLayer(
     'maptile',
     'reduced.day',
     256 * pixelRatio, // bigger tile size for retina
     'png'
     )
     );

     // Change the map base layer to the satellite map with traffic information:
     map.setBaseLayer(defaultLayers.terrain.traffic);

     //map.addLayer(defaultLayers.incidents);

  /* Shows how to subscribe to different event type on different map objects
    *
    * @param {H.Map} map A HERE Map instance within the application
    * @param {Function} logEvent Custom function for logging events
    */
    /*function testObjectsEvents(map, handleEvent) {
      // Let's create the same style for all objects
      var style = {
        fillColor: 'rgba(35, 51, 129, 0.3)',
        lineWidth: 5,
        strokeColor: 'rgba(114, 38, 51, 1)'
      };
*/
      /**
       * Adds markers to the map highlighting Berlin.
       *
       * https://developer.here.com/api-explorer/maps-js/markers/markers-on-the-map
       *
       * @param  {H.Map} map A HERE Map instance within the application
       */
      var berlinMarker = new H.map.Marker(new H.geo.Point(52.5192, 13.4061));

      //berlinMarker.addEventListener('click',handleEvent);

      // Create a polygon map object
      /*var polygon = new H.map.Polygon(new H.geo.Strip([
        45.4667, 9.1833, 0,
        48.1333, 11.566, 0,
        50.0800, 8.2400, 0,
      ]), {style: style});*/

      // Create image marker object
      /*var imageMarker = new H.map.Marker(new H.geo.Point(53.5653, 10.0014), {
        icon: new H.map.Icon('img/marker-house.png')
      });*/

      // Let's give names to our objects and save it as data
      berlinMarker.setData('Berlin');

      // Now lets add out objects to the container for the conviniece of use
      var container = new H.map.Group({
        objects: [berlinMarker]
      });

      // Subscribe to different events on every object
      //berlinMarker.addEventListener('click', handleEvent);

      // Add all of the above created map objects to the map's object collection
      // so they will be rendered onto the map.
      map.addObject(container);
    //}
     // Now use the map as required...
     moveMapToBerlin({map: map});

     //Step 3: make the map interactive
     // MapEvents enables the event system
     // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
     var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Step 5: create custom logging facilities
    var logContainer = document.createElement('ul');
    logContainer.className ='log';
    logContainer.innerHTML = '<li class="log-entry">Try clicking on elements</li>';

    //this.mapsContainer.nativeElement.insertAdjacentHTML('beforeend', logContainer);
    map.getElement().appendChild(logContainer);

    // Helper for logging events
    /*function handleEvent(evt) {
      var entry = document.createElement('li');
      entry.className = 'log-entry';
      entry.textContent = ['event "', evt.type, '" @ '+ evt.target.getData()].join('');
      logContainer.insertBefore(entry, logContainer.firstChild);
    }

// Step 6: main logic goes here
    testObjectsEvents(map, handleEvent);*/

  }

}
