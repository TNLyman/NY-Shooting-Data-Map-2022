let backgroundMap;
let table;
let lng, lat, xGeo, yGeo;
let ftl;
let foto;

let mapGeoLeft = -74.3494;
let mapGeoRight = -73.7668;
let mapGeoTop = 40.498;
let mapGeoBtm = 40.8662;


function setup() {
  createCanvas(600, 500);
  background(backgroundMap);
  foto.resize(10, 10);
  noStroke();
  fill(255, 0, 0, 5);
}

function preload() {
  backgroundMap = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/[-74.3494,40.498,-73.7668,40.8662]/600x500?access_token=pk.eyJ1IjoidGx5bWFuIiwiYSI6ImNsYXl5b2o5MTBubjczdW11NXNsdnhyeHcifQ.y5qV09THvjflj9WLqvXctQ");
  foto = loadImage("stone.png");
  //JS needs to know file is a csv, and that a header is included.
  table = loadTable("NYPDShootingData.csv", "csv", "header");
}

function draw() {
  for(let row = 0; row < table.getRowCount(); row++) {
    let tableRow = table.rows[row];
    for(let col = 0; col < table.getColumnCount(); col++) {
      lng = tableRow.get("Longitude");
      lat = tableRow.get("Latitude");
      ftl = tableRow.get("STATISTICAL_MURDER_FLAG");

            
      // Position translation to canvas coordinates.
      xGeo = (width * (lng - mapGeoLeft)) / (mapGeoRight - mapGeoLeft);
      // Had to remove height - from start.
      yGeo = (height * (lat - mapGeoBtm)) / (mapGeoTop - mapGeoBtm);
      
      
      if(ftl == "Y") {
        image(foto, xGeo - 5, yGeo - 5);
      }
      else {
        circle(xGeo, yGeo, 5);
      }
    }
  }
}