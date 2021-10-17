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

const fileReaderX = {
    readFile: (file = null, readFileAs = "readAsDataURL", encoding = "utf-8") => {
        return new Promise(resolve => {
            let fileReader = new FileReader();

            fileReader.onload = event => {
                file.data = event.target.result;
                resolve(file);
            };

            if (readFileAs === "readAsText") {
                fileReader[readFileAs](file, encoding);
            } else {
                fileReader[readFileAs](file);
            }
        });
    },

    readFilesInputData: (idOrFilesInputData = [], readFileAs = "readAsDataURL", encoding = "utf-8") => {
        let filesInputData = idOrFilesInputData;

        if (typeof idOrFilesInputData === "string") {
            let inputElement = document.getElementById(idOrFilesInputData);

            if (inputElement.getAttribute("multiple") == undefined) {
                filesInputData = inputElement.files[0];
            } else {
                filesInputData = Array.from(inputElement.files);
            }
        }

        if (Array.isArray(filesInputData)) {
            return Promise.all(filesInputData.map(file => {
                return fileReaderX.readFile(file, readFileAs, encoding);
            }));
        } else {
            return fileReaderX.readFile(filesInputData, readFileAs, encoding);
        }
    },

    readAsArrayBuffer: idOrFilesInputData => {
        return fileReaderX.readFilesInputData(idOrFilesInputData, "readAsArrayBuffer");
    },

    readAsBinaryString: idOrFilesInputData => {
        return fileReaderX.readFilesInputData(idOrFilesInputData, "readAsBinaryString");
    },

    readAsDataURL: idOrFilesInputData => {
        return fileReaderX.readFilesInputData(idOrFilesInputData, "readAsDataURL");
    },

    readAsText: (idOrFilesInputData, encoding = "utf-8") => {
        return fileReaderX.readFilesInputData(idOrFilesInputData, "readAsText", encoding);
    }
};