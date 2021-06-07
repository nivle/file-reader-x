function readFile(options = {}) {
    if (!(options.file instanceof Blob)) {
        throw new TypeError("The given file is not a file or blob");
    }

    return new Promise((resolve, reject) => {
        let fileReader = new FileReader();

        fileReader.onload = event => {
            options.file.data = event.target.result;
            resolve(options.file);
        };

        fileReader.onerror = event => {
            reject(new Error(`Error reading ${options.file.name} : ${event.target.result}`));
        };

        if (options.readFileAs === "readAsText") {
            fileReader[options.readFileAs](options.file, options.encoding);
        } else {
            fileReader[options.readFileAs](options.file);
        }
    });
}

function readFiles(options = {}) {
    if (options.files.some(file => !(file instanceof Blob))) {
        throw new TypeError("A given file is not a file or blob");
    }

    return Promise.all(options.files.map(file => {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();

            fileReader.onload = event => {
                file.data = event.target.result;
                resolve(file);
            };

            fileReader.onerror = event => {
                reject(new Error(`Error reading ${file.name} : ${event.target.result}`));
            };

            if (options.readFilesAs === "readAsText") {
                fileReader[options.readFilesAs](file, options.encoding);
            } else {
                fileReader[options.readFilesAs](file);
            }
        });
    }));
}

function readAsArrayBuffer(dataToRead) {
    if (Array.isArray(dataToRead)) {
        return readFiles({ files: dataToRead, readFilesAs: "readAsArrayBuffer" });
    } else {
        return readFile({ file: dataToRead, readFileAs: "readAsArrayBuffer" });
    }
}

function readAsBinaryString(dataToRead) {
    if (Array.isArray(dataToRead)) {
        return readFiles({ files: dataToRead, readFilesAs: "readAsBinaryString" });
    } else {
        return readFile({ file: dataToRead, readFileAs: "readAsBinaryString" });
    }
}

function readAsDataURL(dataToRead) {
    if (Array.isArray(dataToRead)) {
        return readFiles({ files: dataToRead, readFilesAs: "readAsDataURL" });
    } else {
        return readFile({ file: dataToRead, readFileAs: "readAsDataURL" });
    }
}

function readAsText(dataToRead, encoding = "utf-8") {
    if (Array.isArray(dataToRead)) {
        return readFiles({ files: dataToRead, readFilesAs: "readAsText", encoding: encoding });
    } else {
        return readFile({ file: dataToRead, readFileAs: "readAsText", encoding: encoding });
    }
}

module.exports = {
    readAsArrayBuffer: readAsArrayBuffer,
    readAsBinaryString: readAsBinaryString,
    readAsDataURL: readAsDataURL,
    readAsText: readAsText
};