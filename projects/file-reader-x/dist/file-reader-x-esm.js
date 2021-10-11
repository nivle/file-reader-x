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

function readFile(options = { file: null, readFileAs: "readAsDataURL", encoding: "utf-8" }) {
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
}

function readFilesInputData(options = { filesInputData: [], readFileAs: "readAsDataURL", encoding: "utf-8" }) {
    if (Array.isArray(options.filesInputData)) {
        return Promise.all(options.filesInputData.map(file => {
            return readFile({ file: file, readFileAs: options.readFileAs, encoding: options.encoding });
        }));
    } else {
        return readFile({ file: options.filesInputData, readFileAs: options.readFileAs, encoding: options.encoding });
    }
}

export const fileReaderX = {
    readAsArrayBuffer: filesInputData => {
        return readFilesInputData({ filesInputData: filesInputData, readFileAs: "readAsArrayBuffer" });
    },

    readAsBinaryString: filesInputData => {
        return readFilesInputData({ filesInputData: filesInputData, readFileAs: "readAsBinaryString" });
    },

    readAsDataURL: filesInputData => {
        return readFilesInputData({ filesInputData: filesInputData, readFileAs: "readAsDataURL" });
    },

    readAsText: (filesInputData, encoding = "utf-8") => {
        return readFilesInputData({ filesInputData: filesInputData, readFileAs: "readAsText", encoding: encoding });
    }
};