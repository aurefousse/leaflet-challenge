// Creating the map object
var myMap = L.map("map", {
    center: [34.0522, -118.2437],
    zoom: 3
  });

  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    // Load the GeoJSON data.
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//       // Get the data with d3.
    d3.json(geoData).then(function(data) {
        var earthquakes = data.features
        console.log(earthquakes)
        console.log(earthquakes[1].geometry.coordinates)
        console.log(earthquakes[1].geometry['coordinates'][1])

        function Marker_Size_Magnitude(mag) {
            return mag * 30000;
        }
    var coordinates1 = [34.0522, -118.2437]
        for (var i = 0; i < earthquakes.length; i++) {
            var coordinates = [earthquakes[i].geometry.coordinates[1], earthquakes[i].geometry.coordinates[0]]
            var depth = earthquakes[i].geometry.coordinates[2]
            var color = "";
            if (depth > 20) {
                color = "red";
            }
            else if (depth > 15) {
                color = "orange";
            }
            else if (depth > 10) {
                color = "yellow";
            }
            else if (depth > 0) {
                color = "green";
            }

            else if (depth > -10) {
                color = "white";
            }
            circles = L.circle(coordinates, {
                fillOpacity: 0.75,
                color: color,
                fillColor: color,
                radius: Marker_Size_Magnitude(earthquakes[i].properties.mag)

            }).bindPopup("Magnitude: " + earthquakes[i].properties['mag']+ "<br>Place: " 
                        + earthquakes[i].properties['place'] + "<br>Longitude: "
                        + earthquakes[i].geometry.coordinates[0]
                        + "<br>Latitude: " + earthquakes[i].geometry.coordinates[1]
                        + "<br>Depth: " + earthquakes[i].geometry.coordinates[2]).addTo(myMap);
        };
        
    // Set up the legend.
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function () {

        var div = L.DomUtil.create('div', 'info legend'),
        grades = [-10, 0, 10, 15, 20],
        labels = [];

        function getColor(d) {
            return d > 20 ? "red":
                   d > 15 ? "orange":
                   d > 10 ? "yellow":
                   d > 5 ? "green":
                   d> -10 ? "white":
                   "white";
        }

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
            '<i style="baground:' + getColor(grades[i] + 1) + '"></i' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i+1] + '<br>' : '+');
        }
        return div;
    };

    legend.addTo(myMap);
    });
