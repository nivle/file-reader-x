function updateSettingsValues(options, settings) {
    Object.keys(options).forEach(key => {
        if (key in settings) {
            settings[key] = options[key];
        }
    });
}

function readFile(options = {}) {
    let readFileSettings = { file: {}, readFileAs: "readAsDataURL" };

    updateSettingsValues(options, readFileSettings);

    if (!(readFileSettings.file instanceof Blob)) {
        throw new TypeError("The given file is not a file or blob");
    }

    return new Promise((resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.onload = event => {
            readFileSettings.file.data = event.target.result;
            resolve(readFileSettings.file);
        };
        fileReader.onerror = event => { reject(new Error(`Error reading ${readFileSettings.file.name} : ${event.target.result}`)); };
        fileReader[readFileSettings.readFileAs](readFileSettings.file);
    });
}

function readFiles(options = {}) {
    let readFilesSettings = { files: [], readFilesAs: "readAsDataURL" };

    updateSettingsValues(options, readFilesSettings);

    if ((readFilesSettings.files.some(file => !(file instanceof Blob)))) {
        throw new TypeError("A given file is not a file or blob");
    }

    return Promise.all(readFilesSettings.files.map(file => {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            fileReader.onload = event => {
                file.data = event.target.result;
                resolve(file);
            };
            fileReader.onerror = event => { reject(new Error(`Error reading ${file.name} : ${event.target.result}`)); };
            fileReader[readFilesSettings.readFilesAs](file);
        });
    }));
}

export function readAsArrayBuffer(dataToRead) {
    if (Array.isArray(dataToRead)) {
        return readFiles({ files: dataToRead, readFilesAs: "readAsArrayBuffer" });
    } else {
        return readFile({ file: dataToRead, readFileAs: "readAsArrayBuffer" });
    }
}

export function readAsBinaryString(dataToRead) {
    if (Array.isArray(dataToRead)) {
        return readFiles({ files: dataToRead, readFilesAs: "readAsBinaryString" });
    } else {
        return readFile({ file: dataToRead, readFileAs: "readAsBinaryString" });
    }
}

export function readAsDataURL(dataToRead) {
    if (Array.isArray(dataToRead)) {
        return readFiles({ files: dataToRead, readFilesAs: "readAsDataURL" });
    } else {
        return readFile({ file: dataToRead, readFileAs: "readAsDataURL" });
    }
}

export function readAsText(dataToRead) {
    if (Array.isArray(dataToRead)) {
        return readFiles({ files: dataToRead, readFilesAs: "readAsText" });
    } else {
        return readFile({ file: dataToRead, readFileAs: "readAsText" });
    }
}