import {Maths as Ma} from './Maths'

importScripts("./prototypes_modif.js");

Array.prototype.max = function() {
    return Math.max.apply(null, this);
};

Array.prototype.min = function() {
    return Math.min.apply(null, this);
};

//VERSION 2
let number = undefined;

self.onmessage = event => {
    if (number === undefined) {
        number = event.data;
    } else {
        let path = event.data;
        let tolerence = 0.00001;
        let tabDistanceApres = [];
        let tabDistanceAvant = [];
        let tabEcart = [];
        let indexMin = 0;
        let totalDistance = Ma.calculateDistance(path);
        for (let i=1; i<path.features[0].geometry.coordinates.length-2; i++){
            tabDistanceApres.push(Ma.DistanceBetween2Points(path.features[0].geometry.coordinates[i-1],path.features[0].geometry.coordinates[i+1]));
        }
        for (let i=1; i<path.features[0].geometry.coordinates.length-2; i++){
            tabDistanceAvant.push(Ma.DistanceBetween2Points(path.features[0].geometry.coordinates[i-1],path.features[0].geometry.coordinates[i])+Ma.DistanceBetween2Points(path.features[0].geometry.coordinates[i],path.features[0].geometry.coordinates[i+1]));
        }
        for (let i=0; i<tabDistanceApres.length; i++){
            tabEcart[i]=tabDistanceAvant[i]-tabDistanceApres[i];
        }
        while(number>0){
            path.features[0].geometry.coordinates.splice(tabEcart.indexOf(tabEcart.min())+1,1);
            indexMin = tabEcart.indexOf(tabEcart.min());
            tabEcart.splice(tabEcart.indexOf(tabEcart.min()),1);
            tabEcart[indexMin-1]=((Ma.DistanceBetween2Points(path.features[0].geometry.coordinates[indexMin],path.features[0].geometry.coordinates[indexMin+1])+Ma.DistanceBetween2Points(path.features[0].geometry.coordinates[indexMin+1],path.features[0].geometry.coordinates[indexMin+2]))-Ma.DistanceBetween2Points(path.features[0].geometry.coordinates[indexMin],path.features[0].geometry.coordinates[indexMin+2]));
            number--;
        }
        self.postMessage(path);
    }
}
