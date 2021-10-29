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

function readFile(file = null, readFileAs = "readAsDataURL", encoding = "utf-8") {
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
}

function readFilesInputData(filesInputData = [], readFileAs = "readAsDataURL", encoding = "utf-8") {
    if (typeof filesInputData === "string") {
        let inputElement = document.getElementById(filesInputData);

        if (inputElement.hasAttribute("multiple")) {
            filesInputData = Array.from(inputElement.files);
        } else {
            filesInputData = inputElement.files[0];
        }
    }

    if (Array.isArray(filesInputData)) {
        return Promise.all(filesInputData.map(file => {
            return readFile(file, readFileAs, encoding);
        }));
    } else {
        return readFile(filesInputData, readFileAs, encoding);
    }
}

export const fileReaderX = {
    readAsArrayBuffer: filesInputData => {
        return readFilesInputData(filesInputData, "readAsArrayBuffer");
    },

    readAsBinaryString: filesInputData => {
        return readFilesInputData(filesInputData, "readAsBinaryString");
    },

    readAsDataURL: filesInputData => {
        return readFilesInputData(filesInputData, "readAsDataURL");
    },

    readAsText: (filesInputData, encoding = "utf-8") => {
        return readFilesInputData(filesInputData, "readAsText", encoding);
    }
};