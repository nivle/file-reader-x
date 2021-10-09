// Copyright 2021 nivle

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

let fileReaderX = {
    readFile: function readFile(options = { file: null, readFileAs: "readAsDataURL", encoding: "utf-8" }) {
        return new Promise(resolve => {
            let fileReader = new FileReader();

            fileReader.onload = event => {
                options.file.data = event.target.result;
                resolve(options.file);
            };

            if (options.readFileAs === "readAsText") {
                fileReader[options.readFileAs](options.file, options.encoding);
            } else {
                fileReader[options.readFileAs](options.file);
            }
        });
    },

    readFiles: function readFiles(options = { files: [], readFileAs: "readAsDataURL", encoding: "utf-8" }) {
        return Promise.all(options.files.map(file => {
            return fileReaderX.readFile(file, options.readFileAs, options.encoding);
        }));
    },

    readAsArrayBuffer: function readAsArrayBuffer(dataToRead) {
        if (Array.isArray(dataToRead)) {
            return fileReaderX.readFiles({ files: dataToRead, readFilesAs: "readAsArrayBuffer" });
        } else {
            return fileReaderX.readFile({ file: dataToRead, readFileAs: "readAsArrayBuffer" });
        }
    },

    readAsBinaryString: function readAsBinaryString(dataToRead) {
        if (Array.isArray(dataToRead)) {
            return fileReaderX.readFiles({ files: dataToRead, readFilesAs: "readAsBinaryString" });
        } else {
            return fileReaderX.readFile({ file: dataToRead, readFileAs: "readAsBinaryString" });
        }
    },

    readAsDataURL: function readAsDataURL(dataToRead) {
        if (Array.isArray(dataToRead)) {
            return fileReaderX.readFiles({ files: dataToRead, readFilesAs: "readAsDataURL" });
        } else {
            return fileReaderX.readFile({ file: dataToRead, readFileAs: "readAsDataURL" });
        }
    },

    readAsText: function readAsText(dataToRead, encoding = "utf-8") {
        if (Array.isArray(dataToRead)) {
            return fileReaderX.readFiles({ files: dataToRead, readFilesAs: "readAsText", encoding: encoding });
        } else {
            return fileReaderX.readFile({ file: dataToRead, readFileAs: "readAsText", encoding: encoding });
        }
    }
};