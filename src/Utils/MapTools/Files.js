// File to Page //

// Upload a file into the page from data/
// Return : none
export function upload(geoData) {
    document.getElementById('hiddenButton').click();
}

// Used to upload
// Return : none
export function hiddenUpload(geoData) {
    let file = document.getElementById("hiddenButton").files[0];
    let url = URL.createObjectURL(file);
    addPath(geoData, url, file.name)
        .then(geoData => displayPath(geoData, geoData.paths.length - 1))
        .then(movePOV)
        /*.then(generateFilesTab)
        .then(generateGraph)
        .then(generatePoints)*/
        .then(setListenersUpdate)
}

// Page to File //

// Open a window enabling the user to download a .gpx file
// Return : none
export function giveUserGpx(geoData) {
    if (geoData.focus !== undefined) {
        let geoJS = geoData.paths[geoData.focus];
        let xml = geoJsonToXml(geoJS);

        let filename = geoData.paths[geoData.focus].file.trim();
        if (filename.length < 5 || filename.substr(filename.length - 4, filename.length) != ".gpx") {
            filename += ".gpx";
        }
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(xml));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        document.getElementById("tutorialButton").dispatchEvent(new Event("saveButton"));
    } else {
        alert("Vous devez avoir une trace sélectionnée pour pouvoir l'exporter.");
    }
}
