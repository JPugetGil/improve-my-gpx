import L from 'leaflet'

// Mathematical Functions //
export class Maths {

    // Calculate the global distance of the trace
    // Param : a trace
    // Return : the global distance
    static calculateDistance(trace) {
        let distance = 0;
        //console.log(DistanceBetween2Points(trace.features[0].geometry.coordinates[0],trace.features[0].geometry.coordinates[1]));;
        for (let i = 0; i < trace.features[0].geometry.coordinates.length - 1; i++) {
            distance += this.DistanceBetween2Points(trace.features[0].geometry.coordinates[i], trace.features[0].geometry.coordinates[i + 1]);
        }
        return distance.toFixed(2);
    }

    static calculateDistance2(trace) {
        let distance = 0;
        //console.log(DistanceBetween2Points(trace.features[0].geometry.coordinates[0],trace.features[0].geometry.coordinates[1]));;
        for (let i = 0; i < trace.length - 1; i++) {
            distance += this.DistanceBetween2Points(trace[i], trace[i + 1]);
        }
        return distance.toFixed(2);
    }

    // Convert a number in degrees to radians
    // Param : degrees -> number in degrees
    // Return : a number in radians
    static Deg2Rad(degrees) {
        return degrees * (Math.PI / 180);
    }

    // Calculate the distance between 2 points from the latitude and the longitude of these points
    // Param : 2 points -> 2 tables with latitude, longitude and altitude
    // Return : the distance between these 2 points
    static DistanceBetween2Points(point1, point2) {
        return 6367445 * Math.acos(Math.sin(this.Deg2Rad(point1[1])) * Math.sin(this.Deg2Rad(point2[1])) + Math.cos(this.Deg2Rad(point1[1])) * Math.cos(this.Deg2Rad(point2[1])) * Math.cos(this.Deg2Rad(point1[0]) - this.Deg2Rad(point2[0]))) / 1000;
    }

    // Return the mean of all numbers in an array
    // Param : tab -> an array of numbers
    // Return : number
    static moyenneDunTableau(tab) {
        let somme = 0.0;
        for (let i = 0; i < tab.length; i++) {
            somme += tab[i];
        }
        return (somme / tab.length);
    }

    // Return a zoom abling us to see all points given in parameters
    // Param : tabLatitude -> all latitudes
    // Param : tabLongitude -> all longitudes
    // Param : moyenneLatitude -> mean of all latitudes
    // Param : moyenneLongitude -> mean of all longitudes
    // Return : a number corresponding to a zoom
    static plusGrandModule(tabLatitude, tabLongitude, moyenneLatitude, moyenneLongitude) {
        let module = 0;
        for (let i = 0; i < tabLatitude.length; i++) {
            if (Math.sqrt((tabLatitude[i] - moyenneLatitude) * (tabLatitude[i] - moyenneLongitude) + (tabLongitude[i] - moyenneLongitude) * (tabLongitude[i] - moyenneLongitude)) > module) {
                module = Math.sqrt((tabLatitude[i] - moyenneLatitude) * (tabLatitude[i] - moyenneLongitude) + (tabLongitude[i] - moyenneLongitude) * (tabLongitude[i] - moyenneLongitude));
            }
        }
        return module;
    }

    // Convert a time in seconds to a time in hours
    // Param : sec -> time in seconds
    // Return : a time in hours


    static secondsToHours(sec) {
        let hrs = Math.floor(sec / 3600);
        let min = Math.floor((sec % 3600) / 60);
        sec = sec % 60;

        if (sec < 10) {
            sec = "0" + sec;
        }

        if (min < 10) {
            min = "0" + min;
        }

        return hrs + ":" + min + ":" + sec;
    }

    // Ex : if number == 3.14, return 2
    // Ex : if number == 3.14159, return 5
    // Param : number
    // Return : positive int


    static getLengthAfterDot(number) {
        let stringified = number.toString();
        return stringified.slice(stringified.indexOf('.') + 1, stringified.length).length;
    }

    // Have we min <= x <= max
    // Param : x => number
    // Param : min => number
    // Param : max => number
    // Return : boolean


    static isBetween(x, min, max) {
        return x >= min && x <= max;
    }

    // Return coordinates and index from coordinates,
    // of points in latitude +- interval && longitude +- interval
    // Param : coordinates => an [] of ['length == 2|3']
    // Param : latitude => number
    // Param : longitude => number
    // Param : interval => number
    // Return : an [] of {coordinates: ['length == 2|3'], index: 'number'}


    static pointsInInterval(coordinates, latitude, longitude, interval) {
        let points = [];
        let precision = this.getLengthAfterDot(interval);
        let lats = [
            Number((latitude - interval).toFixed(precision)),
            Number((latitude + interval).toFixed(precision))

        ];
        let lngs = [
            Number((longitude - interval).toFixed(precision)),
            Number((longitude + interval).toFixed(precision))
        ];
        coordinates.forEach((coord, index) => {
            if (this.isBetween(coord[1], lats[0], lats[1]) && this.isBetween(coord[0], lngs[0], lngs[1])) {
                let point = {
                    coordinates: coord,
                    index: index
                };
                points.push(point);
            }
        });
        return points;
    }


    static pointsInSquare(coordinates, latlng1, latlng2) {
        let points = [];
        let lats = [latlng1.lat, latlng2.lat];
        let lngs = [latlng1.lng, latlng2.lng];
        lats.sort(this.compareNumbers);
        lngs.sort(this.compareNumbers);
        coordinates.forEach((coord, index) => {
            if (this.isBetween(coord[0], lngs[0], lngs[1]) && this.isBetween(coord[1], lats[0], lats[1])) {
                let point = {
                    coordinates: coord,
                    index: index
                };
                points.push(point);
            }
        });
        return points;
    }


    static compareNumbers(a, b) {
        return a - b;
    }


    static substractLatlng(latlng1, latlng2) {
        let latlng = {};
        latlng.lat = latlng1.lat - latlng2.lat;
        latlng.lng = latlng1.lng - latlng2.lng;
        if (latlng1.hasOwnProperty("alt") && latlng2.hasOwnProperty("alt")) {
            latlng.alt = 0;
        }
        return L.latLng(latlng);
    }


    static deplaceLatlngs(latlngs, offset) {
        return latlngs.map(latlng => {
            let res = {};
            res.lat = latlng.lat + offset.lat;
            res.lng = latlng.lng + offset.lng;
            if (latlng.hasOwnProperty("alt") && offset.hasOwnProperty("alt")) {
                res.alt = 0;
            }
            return L.latLng(res);
        });
    }


    static differenceBetween2coordTimes(coordT1, coordT2) {
        coordT1 = coordT1.substring(0, coordT1.length - 1);
        coordT2 = coordT2.substring(0, coordT2.length - 1);
        let resT1 = new Date(coordT1);
        let resT2 = new Date(coordT2);
        return (resT2 - resT1);
    }


    static getElevationMean(geoData) {
        let sum = 0;
        for (let i = 0; i < geoData.paths[geoData.focus].features[0].geometry.coordinates.length; i++) {
            sum += geoData.paths[geoData.focus].features[0].geometry.coordinates[i][2];
        }
        return sum / geoData.paths[geoData.focus].features[0].geometry.coordinates.length;
    }

}