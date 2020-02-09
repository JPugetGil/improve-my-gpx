import {Maths as Ma} from './Maths'
import L from 'leaflet';
import {Tools as To} from './Tools'
import {Modes as Mo} from './Modes'

const axios = require('axios');

export class Modes {
    // Suppress temporary markers created by modes
    // Param: geoData
    // Return : None
    static deleteOldMarkers(geoData) {
        geoData.tempMarkers.forEach(marker => {
            geoData.map.removeLayer(marker);
        });
        geoData.tempMarkers = [];
    }

    static moveMapMode(geoData) {
        geoData.map.dragging.enable();
        geoData.map.off("click");
        geoData.map.off("contextmenu");
        this.deleteOldMarkers(geoData);
        geoData.mode = "movemap";
        document.getElementById("mapid").setAttribute("onmouseover", "this.style.cursor='move'");
        document.getElementById("tutorialButton").dispatchEvent(new Event("moveMap"));
    }

// Mode where points can ba moved
// Param : geoData
// Return : None
    static movePointMode(geoData) {
        geoData.map.dragging.enable();
        geoData.map.off("click");
        geoData.map.off("contextmenu");
        this.deleteOldMarkers(geoData);
        geoData.mode = "movepoint";
        document.getElementById("mapid").setAttribute("onmouseover", "this.style.cursor='pointer'");

        geoData.map.on("contextmenu", e => {
            this.deleteOldMarkers(geoData);
            if (geoData.focus !== undefined) {
                let interval = 0.001; // Coordinates interval, to decide the range of points we handle
                let coordinates = geoData.paths[geoData.focus].features[0].geometry.coordinates;
                let points = Ma.pointsInInterval(coordinates, e.latlng.lat, e.latlng.lng, interval);
                points.forEach(point => {
                    let marker = L.marker(L.latLng(point.coordinates[1], point.coordinates[0], point.coordinates[2]), {
                        draggable: true,
                        index: point.index
                    })
                        .on('drag', e => this.dragHandler(e, geoData.layers[geoData.focus]))
                        .on('dragend', e => this.dragEndHandler(geoData, e.target.options.index));
                    geoData.tempMarkers.push(marker);
                    marker.addTo(geoData.map);
                });
            } else {
                alert("Vous devez avoir une trace sélectionnée pour pouvoir déplacer ses points.");
            }
        });
    }

// Called during a point drag,
// Make polyline correspond with the point we are dragging
// Param : e => event triggered with dragging
// Return : polyline => a L.polyline object
    static dragHandler(e, polyline) {
        let latlngs = polyline.getLatLngs();
        let latlng = L.latLng(e.target.getLatLng().lat, e.target.getLatLng().lng, e.oldLatLng.alt);
        latlngs.splice(e.target.options.index, 1, latlng);
        polyline.setLatLngs(latlngs);
    }

// Update geoData with map layers
// Param : geoData
// Return : None
    static dragEndHandler(geoData, index) {
        document.getElementById("tutorialButton").dispatchEvent(new Event("movePoint"));
        this.savePaths(geoData);
        geoData.paths[geoData.focus].features[0].geometry = geoData.layers[geoData.focus].toGeoJSON().geometry;
        let link = "https://dev.virtualearth.net/REST/v1/Elevation/List?points=" + geoData.paths[geoData.focus].features[0].geometry.coordinates[index][1] + "," + geoData.paths[geoData.focus].features[0].geometry.coordinates[index][0] + "&key=AuhAPaqRM0jgPmFRoNzjuOoB8te9aven3EH_L6sj2pFjDSxyvJ796hueyskwz4Aa";
        axios.get(link, function (data) {
            geoData.paths[geoData.focus].features[0].geometry.coordinates[index][2] = data.resourceSets[0].resources[0].elevations[0];
            // generateGraph(geoData);
            Mo.infoTrace(geoData);
        });
    }

    static addPointMode(geoData) {
        geoData.map.dragging.enable();
        geoData.map.off("click");
        geoData.map.off("contextmenu");
        this.deleteOldMarkers(geoData);
        geoData.mode = "addpoint";
        document.getElementById("mapid").setAttribute("onmouseover", "this.style.cursor='crosshair'");
        geoData.map.on("click", e => {
            if (geoData.focus !== undefined) {
                this.savePaths(geoData);
                var trace = geoData.paths[geoData.focus].features[0];
                let link = "https://dev.virtualearth.net/REST/v1/Elevation/List?points=" + Number(e.latlng.lat.toFixed(6)) + "," + Number(e.latlng.lng.toFixed(6)) + "&key=AuhAPaqRM0jgPmFRoNzjuOoB8te9aven3EH_L6sj2pFjDSxyvJ796hueyskwz4Aa";
                axios.get(link, function (data) {
                    trace.geometry.coordinates.push([Number(e.latlng.lng.toFixed(6)), Number(e.latlng.lat.toFixed(6)), data.resourceSets[0].resources[0].elevations[0]]);
                });
                let latlngs = geoData.layers[geoData.focus].getLatLngs();
                let latlng = L.latLng([Number(e.latlng.lat.toFixed(6)), Number(e.latlng.lng.toFixed(6)), 0]);
                latlngs.push(latlng);
                geoData.layers[geoData.focus].setLatLngs(latlngs);
                this.infoTrace(geoData);
                document.getElementById("tutorialButton").dispatchEvent(new Event("addPoint"));

                if (trace.hasOwnProperty("properties")) {
                    if (trace.properties.hasOwnProperty("coordTimes")) {
                        trace.properties.coordTimes.push(trace.properties.coordTimes[trace.properties.coordTimes.length - 1]);
                    }
                    if (trace.properties.hasOwnProperty("heartRates")) {
                        trace.properties.heartRates.push(trace.properties.heartRates[trace.properties.heartRates.length - 1]);
                    }
                }
            } else {
                alert("Vous devez avoir une trace sélectionnée pour pouvoir y ajouter des points.");
            }
        });
    }

    static deletePointMode(geoData) {
        geoData.map.dragging.enable();
        geoData.map.off("click");
        geoData.map.off("contextmenu");
        this.deleteOldMarkers(geoData);
        geoData.mode = "deletepoint";
        document.getElementById("mapid").setAttribute("onmouseover", "this.style.cursor='help'");

        geoData.map.on("contextmenu", e => {
            this.deleteOldMarkers(geoData);
            if (geoData.focus !== undefined) {
                let interval = 0.001; // Coordinates interval, to decide the range of points we handle
                let coordinates = geoData.paths[geoData.focus].features[0].geometry.coordinates;
                let points = Ma.pointsInInterval(coordinates, e.latlng.lat, e.latlng.lng, interval);
                points.forEach(point => {
                    let markerIndex = geoData.tempMarkers.length;
                    let marker = L.marker(L.latLng(point.coordinates[1], point.coordinates[0]), {
                        index: point.index
                    })
                        .on('click', e => this.removePoint(geoData, markerIndex, e.target.options.index));
                    geoData.tempMarkers.push(marker);
                    marker.addTo(geoData.map);
                });
            } else {
                alert("Vous devez avoir une trace sélectionnée pour pouvoir supprimer des points.");
            }
        });
    }

    static removePoint(geoData, markerIndex, index) {
        this.savePaths(geoData);
        geoData.map.removeLayer(geoData.tempMarkers[markerIndex]);
        for (let i = markerIndex + 1; i < geoData.tempMarkers.length; i++) {
            geoData.tempMarkers[i].options.index--;
        }
        let latlngs = geoData.layers[geoData.focus].getLatLngs();
        latlngs.splice(index, 1);
        geoData.layers[geoData.focus].setLatLngs(latlngs);
        let trace = geoData.paths[geoData.focus].features[0];
        trace.geometry = geoData.layers[geoData.focus].toGeoJSON().geometry;

        if (trace.hasOwnProperty("properties")) {
            if (trace.properties.hasOwnProperty("coordTimes")) {
                let coordTimes = trace.properties.coordTimes;
                coordTimes.splice(index, 1);
                trace.properties.coordTimes = coordTimes;
            }
            if (trace.properties.hasOwnProperty("heartRates")) {
                let heartRates = trace.properties.heartRates;
                heartRates.splice(index, 1);
                trace.properties.heartRates = heartRates;
            }
        }
        document.getElementById("tutorialButton").dispatchEvent(new Event("deletePoint"));
        To.generateGraph(geoData);
        this.infoTrace(geoData);
    }

    static linkMode(geoData) {
        this.deleteOldMarkers(geoData);
        if (geoData.paths.length < 2) {
            document.getElementById("link").removeAttribute("data-toggle", "modal");
            alert("Vous devez avoir plusieurs traces pour pouvoir utiliser la fonction Lier.");
        } else {
            document.getElementById("link").setAttribute("data-toggle", "modal");
            document.getElementById("t1").innerHTML = " ";
            document.getElementById("t2").innerHTML = " ";
            for (let i = 0; i < geoData.paths.length; i++) {
                document.getElementById("t1").innerHTML += `<option value="${i}">${geoData.paths[i].file}</option>`;
                document.getElementById("t2").innerHTML += `<option value="${i}">${geoData.paths[i].file}</option>`;
            }
        }
    }

    static fusion(geoData, idTrace1, idTrace2, mode) {
        this.savePaths(geoData);
        let traceBorn = this.copyAttrPath(geoData, geoData.paths[idTrace1]);
        if (document.getElementById("traceName").value === "") {
            traceBorn.file = "Nouvelle Trace";
        } else {
            traceBorn.file = document.getElementById("traceName").value;
        }
        let definedCoordTimes = traceBorn.features[0].properties.hasOwnProperty("coordTimes") && geoData.paths[idTrace2].features[0].properties.hasOwnProperty("coordTimes");
        let definedHeartRates = traceBorn.features[0].properties.hasOwnProperty("heartRates") && geoData.paths[idTrace2].features[0].properties.hasOwnProperty("heartRates");
        if (!definedCoordTimes) {
            delete traceBorn.coordTimes;
        }
        if (!definedHeartRates) {
            delete traceBorn.heartRates;
        }
        switch (mode) {
            case 'fd':
                traceBorn.features[0].geometry.coordinates = geoData.paths[idTrace1].features[0].geometry.coordinates.slice(0).concat(geoData.paths[idTrace2].features[0].geometry.coordinates.slice(0));
                if (definedCoordTimes) {
                    traceBorn.features[0].properties.coordTimes = geoData.paths[idTrace1].features[0].properties.coordTimes.slice(0).concat(geoData.paths[idTrace2].features[0].properties.coordTimes.slice(0));
                }
                if (definedHeartRates) {
                    traceBorn.features[0].properties.heartRates = geoData.paths[idTrace1].features[0].properties.heartRates.slice(0).concat(geoData.paths[idTrace2].features[0].properties.heartRates.slice(0));
                }
                break;
            case 'ff':
                traceBorn.features[0].geometry.coordinates = geoData.paths[idTrace1].features[0].geometry.coordinates.slice(0).concat(geoData.paths[idTrace2].features[0].geometry.coordinates.slice(0).reverse());
                if (definedCoordTimes) {
                    traceBorn.features[0].properties.coordTimes = geoData.paths[idTrace1].features[0].properties.coordTimes.slice(0).concat(geoData.paths[idTrace2].features[0].properties.coordTimes.slice(0).reverse());
                }
                if (definedHeartRates) {
                    traceBorn.features[0].properties.heartRates = geoData.paths[idTrace1].features[0].properties.heartRates.slice(0).concat(geoData.paths[idTrace2].features[0].properties.heartRates.slice(0).reverse());
                }
                break;
            case 'dd':
                traceBorn.features[0].geometry.coordinates = geoData.paths[idTrace1].features[0].geometry.coordinates.slice(0).reverse().concat(geoData.paths[idTrace2].features[0].geometry.coordinates.slice(0));
                if (definedCoordTimes) {
                    traceBorn.features[0].properties.coordTimes = geoData.paths[idTrace1].features[0].properties.coordTimes.slice(0).reverse().concat(geoData.paths[idTrace2].features[0].properties.coordTimes.slice(0));
                }
                if (definedHeartRates) {
                    traceBorn.features[0].properties.heartRates = geoData.paths[idTrace1].features[0].properties.heartRates.slice(0).reverse().concat(geoData.paths[idTrace2].features[0].properties.heartRates.slice(0));
                }
                break;
            case 'df':
                traceBorn.features[0].geometry.coordinates = geoData.paths[idTrace1].features[0].geometry.coordinates.slice(0).reverse().concat(geoData.paths[idTrace2].features[0].geometry.coordinates.slice(0).reverse());
                if (definedCoordTimes) {
                    traceBorn.features[0].properties.coordTimes = geoData.paths[idTrace1].features[0].properties.coordTimes.slice(0).reverse().concat(geoData.paths[idTrace2].features[0].properties.coordTimes.slice(0).reverse());
                }
                if (definedHeartRates) {
                    traceBorn.features[0].properties.heartRates = geoData.paths[idTrace1].features[0].properties.heartRates.slice(0).reverse().concat(geoData.paths[idTrace2].features[0].properties.heartRates.slice(0).reverse());
                }
                break;
            default:
                break;
        }
        if (idTrace1 === idTrace2) {
            document.getElementById("buttonLink").removeAttribute("data-dismiss", "modal");
            alert("Vous avez sélectionné 2 fois la même trace.");
        } else {
            document.getElementById("buttonLink").setAttribute("data-dismiss", "modal");
            // To.deleteTrace(geoData, idTrace2, false);
            // To.deleteTrace(geoData, idTrace1, false);
            geoData.paths[geoData.paths.length] = traceBorn;
            To.displayPath(geoData, geoData.paths.length - 1);
            // setListenersUpdate(geoData);
            this.infoTrace(geoData);
        }
    }

    static linkTrace(geoData) {
        let idTrace1 = document.getElementById('t1').value;
        let idTrace2 = document.getElementById('t2').value;
        let radios1 = document.getElementsByName('firstTrace');
        let radios2 = document.getElementsByName('secondTrace');
        let val1 = " ";
        let val2 = " ";
        for (let i = 0; i < 2; i++) {
            if (radios1[i].checked) {
                val1 = radios1[i].value;
            }
            if (radios2[i].checked) {
                val2 = radios2[i].value;
            }
        }
        let mode = val1 + val2;
        this.fusion(geoData, idTrace1, idTrace2, mode);
        document.getElementById("tutorialButton").dispatchEvent(new Event("link"));
    }

    static unlinkMode(geoData) {
        geoData.map.dragging.enable();
        geoData.map.off("click");
        geoData.map.off("contextmenu");
        this.deleteOldMarkers(geoData);
        geoData.mode = "unlink";
        document.getElementById("mapid").setAttribute("onmouseover", "this.style.cursor='crosshair'");
        geoData.map.on("contextmenu", e => {
            this.deleteOldMarkers(geoData);
            if (geoData.focus !== undefined) {
                let interval = 0.001; // Coordinates interval, to decide the range of points we handle
                let coordinates = geoData.paths[geoData.focus].features[0].geometry.coordinates;
                let points = Ma.pointsInInterval(coordinates, e.latlng.lat, e.latlng.lng, interval);
                points.forEach(point => {
                    let marker = L.marker(L.latLng(point.coordinates[1], point.coordinates[0]), {
                        index: point.index
                    })
                        .on('click', e => this.cutIn2(geoData, e.target.options.index));
                    geoData.tempMarkers.push(marker);
                    marker.addTo(geoData.map);
                });
            } else {
                alert("Vous devez avoir une trace sélectionnée pour pouvoir la couper.");
            }
        });
    }

    static cutIn2(geoData, index) {
        this.savePaths(geoData);
        let coordinates = geoData.paths[geoData.focus].features[0].geometry.coordinates;
        let latlngs = geoData.layers[geoData.focus].getLatLngs();
        latlngs.splice(index, (coordinates.length - index));
        geoData.layers[geoData.focus].setLatLngs(latlngs);
        geoData.paths[geoData.focus].features[0].geometry = geoData.layers[geoData.focus].toGeoJSON().geometry;
        let indexNewPath = geoData.paths.length;
        geoData.paths[indexNewPath] = this.copyAttrPath(geoData, geoData.paths[geoData.focus]);
        geoData.paths[indexNewPath].features[0].geometry.coordinates = coordinates.slice(index);

        if (geoData.paths[indexNewPath].features[0].properties.hasOwnProperty("coordTimes")) {
            geoData.paths[indexNewPath].features[0].properties.coordTimes = geoData.paths[geoData.focus].features[0].properties.coordTimes.slice(index);
            geoData.paths[geoData.focus].features[0].properties.coordTimes = geoData.paths[geoData.focus].features[0].properties.coordTimes.slice(0, index);
        }
        if (geoData.paths[indexNewPath].features[0].properties.hasOwnProperty("heartRates")) {
            geoData.paths[indexNewPath].features[0].properties.heartRates = geoData.paths[geoData.focus].features[0].properties.heartRates.slice(index);
            geoData.paths[geoData.focus].features[0].properties.heartRates = geoData.paths[geoData.focus].features[0].properties.heartRates.slice(0, index);
        }
        To.displayPath(geoData, indexNewPath, false);
        To.setFocusClass(geoData);
        this.deleteOldMarkers(geoData);
        // setListenersUpdate(geoData);
        this.infoTrace(geoData);
        document.getElementById("tutorialButton").dispatchEvent(new Event("unlink"));
    }

    static copyAttrPath(geoData, oldPath) {
        let newPath = {};
        newPath.features = [];
        newPath.features[0] = {};
        newPath.features[0].type = oldPath.features[0].type;
        newPath.features[0].geometry = {};
        newPath.features[0].geometry.type = oldPath.features[0].geometry.type;
        newPath.features[0].geometry.coordinates = [];
        newPath.features[0].properties = {};
        if (oldPath.features[0].properties.hasOwnProperty("time")) {
            newPath.features[0].properties.time = oldPath.features[0].properties.time;
        }
        if (oldPath.features[0].properties.hasOwnProperty("coordTimes")) {
            newPath.features[0].properties.coordTimes = [];
        }
        if (oldPath.features[0].properties.hasOwnProperty("heartRates")) {
            newPath.features[0].properties.heartRates = [];
        }
        if (oldPath.features[0].properties.hasOwnProperty("name")) {
            newPath.features[0].properties.name = oldPath.features[0].properties.name;
        }
        newPath.shown = oldPath.shown;
        newPath.file = oldPath.file + "(" + geoData.paths.length + ")";
        newPath.type = oldPath.type;

        return newPath;
    }

    static copyAllPaths(geoData, paths) {
        let tabPaths = [];
        for (let i = 0; i < paths.length; i++) {
            tabPaths.push(this.copyAttrPath(geoData, paths[i]));
            tabPaths[i].file = paths[i].file;
            tabPaths[i].features[0].geometry.coordinates = paths[i].features[0].geometry.coordinates.slice(0);
            if (paths[i].features[0].properties.hasOwnProperty("coordTimes")) {
                tabPaths[i].features[0].properties.coordTimes = paths[i].features[0].properties.coordTimes.slice(0);
            }
            if (paths[i].features[0].properties.hasOwnProperty("heartRates")) {
                tabPaths[i].features[0].properties.heartRates = paths[i].features[0].properties.heartRates.slice(0);
            }
        }
        return tabPaths;
    }

    static infoTrace(geoData) {
        document.getElementById("colInfo3").innerHTML = Ma.calculateDistance(geoData.paths[geoData.focus]);
        document.getElementById("colInfo4").innerHTML = geoData.paths[geoData.focus].features[0].geometry.coordinates.length;
    }

    static undoMode(geoData) {
        this.deleteOldMarkers(geoData);
        this.itWasBetterBefore(geoData);

        document.getElementById("tutorialButton").dispatchEvent(new Event("undo"));
    }

    static savePaths(geoData) {
        geoData.savedState.paths = this.copyAllPaths(geoData, geoData.paths);
        geoData.savedState.undo = false;
        geoData.savedState.upload = false;
    }

    static permuteStates(geoData) {
        let temp = this.copyAllPaths(geoData, geoData.paths);
        geoData.paths = this.copyAllPaths(geoData, geoData.savedState.paths);
        geoData.savedState.paths = this.copyAllPaths(geoData, temp);
    }

    static itWasBetterBefore(geoData) {
        if (geoData.savedState.upload) {
            geoData.savedState.undo = true;
            geoData.savedState.upload = false;
        }
        if (!geoData.savedState.undo) {
            geoData.map.removeLayer(geoData.layers[geoData.focus]);
            geoData.layersControl.removeLayer(geoData.layers[geoData.focus]);
            this.permuteStates(geoData);
            To.displayPath(geoData, geoData.focus);
            if (geoData.paths.length > geoData.savedState.paths.length) {
                To.displayPath(geoData, geoData.paths.length - 1, false);
                To.setFocusClass(geoData);
            }
            if (geoData.paths.length < geoData.savedState.paths.length) {
                geoData.layersControl.removeLayer(geoData.layers[geoData.paths.length]);
                To.setFocusClass(geoData);
            }
            this.infoTrace(geoData);
            // setListenersUpdate(geoData);
            geoData.savedState.undo = true;
        } else {
            alert("Il n'y a rien à annuler.");
        }
    }

    static redoMode(geoData) {
        this.deleteOldMarkers(geoData);
        this.backToTheFuture(geoData);
    }

    static backToTheFuture(geoData) {
        if (geoData.savedState.undo) {
            geoData.map.removeLayer(geoData.layers[geoData.focus]);
            geoData.layersControl.removeLayer(geoData.layers[geoData.focus]);
            this.permuteStates(geoData);
            To.displayPath(geoData, geoData.focus);
            if (geoData.paths.length < geoData.savedState.paths.length) {
                geoData.layersControl.removeLayer(geoData.layers[geoData.paths.length]);
                To.setFocusClass(geoData);
            }
            if (geoData.paths.length > geoData.savedState.paths.length) {
                To.displayPath(geoData, geoData.paths.length - 1, false);
                To.setFocusClass(geoData);
            }
            this.infoTrace(geoData);
            // setListenersUpdate(geoData);
            geoData.savedState.undo = false;

            document.getElementById("tutorialButton").dispatchEvent(new Event("redo"));
        } else {
            alert("Il n'y a rien à réitérer.");
        }
    }

    static setModeStyle(event) {
        let buttons = Array.from(document.getElementsByClassName("modeButton"));
        buttons.forEach(button => button.classList.remove("currentMode"));
        event.target.classList.add("currentMode");
    }

}