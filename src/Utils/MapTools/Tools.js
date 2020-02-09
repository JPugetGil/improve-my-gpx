import L from 'leaflet';
import markers from '../Models/Pins'
import {Modes as Mo} from './Modes'
import {Maths as Ma} from './Maths'
import {Tools as To} from './Tools'
import * as Co from './Conversions'

const axios = require('axios');

export class Tools {
    static createGeoData() {
        return new Promise((resolve, reject) => {
            let isMobile = (function () {
                var check = false;
                (function (a) {
                    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series([46])0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br([ev])w|bumb|bw-([nu])|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do([cp])o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly([-_])|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-([mpt])|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c([- _agpst])|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac([ \-/])|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja([tv])a|jbro|jemu|jigs|kddi|keji|kgt([ /])|klon|kpt |kwc-|kyo([ck])|le(no|xi)|lg( g|\/([klu])|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t([- ov])|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30([02])|n50([025])|n7(0([01])|10)|ne(([cm])-|on|tf|wf|wg|wt)|nok([6i])|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan([adt])|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c([-01])|47|mc|nd|ri)|sgh-|shar|sie([-m])|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel([im])|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c([- ])|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0, 4))) check = true;
                })(navigator.userAgent || navigator.vendor || window.opera);
                return check;
            })();
            let geoData = {
                mobile: isMobile,
                map: undefined,
                paths: [],
                layersControl: undefined,
                savedState: {
                    paths: [],
                    undo: false,
                    upload: false
                },
                layers: [],
                markersColor: [],
                tempMarkers: [],
                focus: undefined,
                mode: "movemap"
            };
            resolve(geoData);
            reject("Error when initializing the global variable");
        });
    }

    static getPosition(geoData) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((function (position) {
                var marker = L.marker([position.coords.latitude, position.coords.longitude], {icon: markers.purpleMarker}).addTo(geoData.map);
                marker.bindPopup("Ma position :<br> Latitude : " + position.coords.latitude + ',<br>Longitude ' + position.coords.longitude).openPopup();
            }));
        } else {
            alert("La géolocalisation n'est pas supportée par ce navigateur.");
        }
        return geoData;
    }

    static generateTiles(geoData) {
        geoData.layersControl.addBaseLayer(L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(geoData.map), "Epurée");
        geoData.layersControl.addBaseLayer(L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}), "Détaillée");
        geoData.layersControl.addBaseLayer(L.tileLayer(' http://{s}.tile.openstreetmap.fr/openriverboatmap/{z}/{x}/{y}.png'), "Fluviale");

        return geoData;
    }

    static addPath(geoData, file, name = "") {
        return Promise.resolve(axios.get(file)).then(gpx => {
            let index = geoData.paths.length;
            let indexFile = file.lastIndexOf("/");
            let filename = file.substr(indexFile + 1);
            geoData.paths[index] = Co.toGeoJSON.gpx((new DOMParser()).parseFromString(gpx.data, 'text/xml'));
            geoData.paths[index].file = (name === "" ? filename : name);
            geoData.paths[index].shown = true;
            geoData.focus = index;
            Mo.savePaths(geoData);
            geoData.savedState.upload = true;
            geoData = To.checkElevation(geoData);
            // Mo.infoTrace(geoData);
            return geoData;
        });
    }

    static checkElevation(geoData) {
        let listCoord;
        let tabPromises;
        let thereIsElevation;
        let point;
        for (let j = 0; j < geoData.paths.length; j++) {
            tabPromises = [];
            thereIsElevation = true;
            point = 0;
            while (thereIsElevation && (point !== geoData.paths[j].features[0].geometry.coordinates.length - 1)) {
                if (geoData.paths[j].features[0].geometry.coordinates[point][2] === undefined)
                    thereIsElevation = false;
                point++;
            }
            if (!thereIsElevation) {
                listCoord = "";
                for (let i = 0; i < geoData.paths[j].features[0].geometry.coordinates.length; i++) {
                    listCoord += geoData.paths[j].features[0].geometry.coordinates[i][1] + "," + geoData.paths[j].features[0].geometry.coordinates[i][0] + ",";
                    if ((!(!(i === geoData.paths[j].features[0].geometry.coordinates.length - 1) && !((i % 50 === 0) && (i !== 0))))) {
                        listCoord = listCoord.substring(0, listCoord.length - 1);
                        let link = "https://dev.virtualearth.net/REST/v1/Elevation/List?points=" + listCoord + "&key=AuhAPaqRM0jgPmFRoNzjuOoB8te9aven3EH_L6sj2pFjDSxyvJ796hueyskwz4Aa";
                        tabPromises.push(axios.get(link, function (data) {
                        }));
                        listCoord = "";
                    }
                }
                Promise.all(tabPromises).then(function (values) {
                    values.forEach(function (element, index) {
                        element.resourceSets[0].resources[0].elevations.forEach(function (alt) {
                            geoData.paths[j].features[0].geometry.coordinates[index].push(alt);
                        });
                    });
                    return geoData;
                }).then(/*Mo.generateGraph*/ console.log);
            }

        }
        return geoData;
    }

    static movePOV(geoData) {
        if (geoData.focus !== undefined) {
            geoData.map.fitBounds(geoData.layers[geoData.focus].getBounds());
        }
        Mo.generateGraph(geoData);
        return geoData;
    }

    static reSample(geoData, number) {
        number = Number(number);
        if (Number.isInteger(number) && number > 0 && number < (geoData.paths[geoData.focus].features[0].geometry.coordinates.length - 2)) {
            Mo.savePaths(geoData);
            if (typeof (Worker) === undefined) {
                let tolerence = 0.00001;
                let tabDistance = [];
                let totalDistance = Ma.calculateDistance(geoData.paths[geoData.focus]);
                while (number > 0) {
                    tabDistance = [];
                    for (let i = 0; i < geoData.paths[geoData.focus].features[0].geometry.coordinates.length - 2; i++) {
                        tabDistance.push(Ma.DistanceBetween2Points(geoData.paths[geoData.focus].features[0].geometry.coordinates[i], geoData.paths[geoData.focus].features[0].geometry.coordinates[i + 1]));
                    }
                    if (tabDistance.min() < totalDistance * tolerence) {
                        geoData.paths[geoData.focus].features[0].geometry.coordinates.splice(tabDistance.indexOf(tabDistance.min()), 1);
                        number--;
                    } else {
                        tolerence += 0.0000002;
                    }
                }
                geoData.map.removeLayer(geoData.layers[geoData.focus]);
                To.displayPath(geoData, geoData.focus);
                document.getElementById("tutorialButton").dispatchEvent(new Event("samplingFactor"));
                // To.generateGraph(geoData);
                // Mo.infoTrace(geoData);

            } else {
                let w = new Worker("js/resample.js");
                w.onmessage = event => {
                    geoData.paths[geoData.focus] = event.data;
                    w.terminate();
                    w = undefined;
                    To.redisplayPath(geoData, geoData.focus);
                    document.getElementById("tutorialButton").dispatchEvent(new Event("samplingFactor"));
                    To.generateGraph(geoData);
                    Mo.infoTrace(geoData);
                };
                w.postMessage(number);
                w.postMessage(geoData.paths[geoData.focus]);
            }
        } else {
            alert("Veuillez mettre un nombre entier supérieur à 0, et compris entre 1 et " + (geoData.paths[geoData.focus].features[0].geometry.coordinates.length - 3) + "! SVP.");
        }
    }

    static keySample(geoData, keyCode) {
        if (keyCode === 13) {
            this.reSample(geoData, document.getElementById("samplingFactor").value);
        }
    }

    static displayPath(geoData, index, display = true) {
        let polyline = To.getPolyline(geoData, index);

        geoData.layers[index] = polyline;
        geoData.layersControl.addOverlay(polyline, geoData.paths[index].file);
        if (display) {
            geoData.map.addLayer(polyline);
            this.setFocusClass(geoData);
        }
        // setListenersUpdate(geoData)

        return geoData;
    }

    static redisplayPath(geoData, index) {
        geoData.layersControl.removeLayer(geoData.layers[index]);
        geoData.map.removeLayer(geoData.layers[index]);

        this.displayPath(geoData, index);
    }

    static getPolyline(geoData, index) {
        let color;
        let mean = Ma.getElevationMean(geoData);
        if (mean < 600) {
            color = "#0000FF";
        } else if (mean >= 600 && mean < 1200) {
            color = "#007FFF";
        } else if (mean >= 1200 && mean < 1800) {
            color = "#00FFFF";
        } else if (mean >= 1800 && mean < 2400) {
            color = "#00FF7F";
        } else if (mean >= 2400 && mean < 3000) {
            color = "#00FF00";
        } else if (mean >= 3000 && mean < 3600) {
            color = "#7FFF00";
        } else if (mean >= 3600 && mean < 4200) {
            color = "#FFFF00";
        } else if (mean >= 4200 && mean < 4800) {
            color = "#FF7F00";
        } else if (mean >= 4800 && mean < 5400) {
            color = "#FF0000";
        } else {
            color = "#000000";
        }

        let latlngs = [];
        geoData.paths[index].features[0].geometry.coordinates.forEach(coord => {
            let point = [
                coord[1],
                coord[0],
                coord[2]
            ];
            latlngs.push(point);
        });
        return L.polyline(latlngs, {color: color});
    }

    /*static generateGraph(geoData) {
        if (document.getElementById("toHide").className === "collapse") {
            $('#toHide').collapse('toggle');
        }

        RGraph.reset(document.getElementById('cvs'));
        if (geoData.focus !== undefined) {
            let w2 = new Worker("js/chart.js");
            if (geoData.isMobile) {
                document.getElementById("graph").setAttribute("style", "height:" + ($(document).height() * 1 / 4) + "px; width: 100%; z-Index: 2; padding-left: 5%");
            } else {
                document.getElementById("graph").setAttribute("style", "height:" + ($(document).height() * 2 / 7) + "px; width: 100%; z-Index: 2; padding-left: 5%");
            }

            w2.onmessage = event => {
                w2.terminate();
                w2 = undefined;
                document.getElementById("cvs").setAttribute("width", $(document).width() / 1.11);
                document.getElementById("cvs").setAttribute("height", $(document).height() / 4);
                if (newMarker == undefined) {
                    var newMarker = new L.marker([-100, -10000]);
                    var lay = new L.layerGroup([newMarker]).addTo(geoData.map);
                }

                document.getElementById("cvs").addEventListener("mouseout", () => {
                    newMarker.setLatLng([-100, -10000]);
                });

                var line = new RGraph.Line({
                    id: 'cvs',
                    data: event.data[1],
                    options: {
                        backgroundGridDashed: true,
                        tooltips: function (event) {
                            let x = geoData.paths[geoData.focus].features[0].geometry.coordinates[event][1];
                            let y = geoData.paths[geoData.focus].features[0].geometry.coordinates[event][0];
                            newMarker.setLatLng([x, y]);
                            geoData.map.panTo(new L.LatLng(x, y));
                        },
                        linewidth: 3,
                        numxticks: event.data[0].length / 10,
                        ylabels: true,
                        unitsPost: 'm',
                        crosshairs: true,
                        crosshairsSnap: true,
                        textAccessible: true,
                    }
                }).draw();
            }

            w2.postMessage(geoData.paths[geoData.focus]);
        }

        return geoData;
    }*/

    /*static deleteTrace(geoData, id, conf = true) {
        if (!conf || confirm("Voulez vous vraiment supprimer ce fichier ?")) {
            geoData.layersControl.removeLayer(geoData.layers[id]);
            geoData.map.removeLayer(geoData.layers[id]);
            geoData.layers.splice(id, 1);
            geoData.paths.splice(id, 1);
            if (geoData.focus === id) {
                To.resetFocus(geoData);
                To.setFocusClass(geoData);
                To.movePOV(geoData);
            } else if (geoData.focus > id) {
                geoData.focus--;
            }
            // setListenersUpdate(geoData);
        }
    }*/

    static getIndexFile(element) {
        let index = undefined;
        let i = 0;
        let clickables = Array.from(document.querySelectorAll(".leaflet-control-layers-overlays > label > div > *"));
        while (index === undefined && i < clickables.length) {
            if (element._leaflet_id === clickables[i]._leaflet_id) {
                index = i % 2 === 0 ? i / 2 : (i - 1) / 2;
            }
            i++;
        }

        return index;
    }

    static resetFocus(geoData) {
        geoData.focus = undefined;
        let i = 0;
        let inputs = document.querySelectorAll(".leaflet-control-layers-overlays > label > div > input");
        while (geoData.focus === undefined && i < geoData.paths.length) {
            if (inputs[i].checked) {
                geoData.focus = i;
            }
            i++;
        }
    }

    static setFocusClass(geoData) {
        let lines = document.querySelectorAll(".leaflet-control-layers-overlays > label");
        lines.forEach(input => {
            input.classList.remove('focus');
        });
        if (geoData.focus !== undefined) {
            lines[geoData.focus].classList.add("focus");
        }
    }

}