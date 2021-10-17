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

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FileReaderXService {

    constructor() { }

    public readFile(file: Blob, readFileAs: string = "readAsDataURL", encoding: string = "utf-8"): Promise<any> {
        return new Promise(resolve => {
            let fileReader = new FileReader();

            fileReader.onload = event => {
                let updatedFile: any = file;
                updatedFile.data = event.target?.result;
                resolve(updatedFile);
            };

            switch (readFileAs) {
                case "readAsArrayBuffer":
                    fileReader.readAsArrayBuffer(file);
                    break;
                case "readAsBinaryString":
                    fileReader.readAsBinaryString(file);
                    break;
                case "readAsDataURL":
                    fileReader.readAsDataURL(file);
                    break;
                case "readAsText":
                    fileReader.readAsText(file, encoding);
                    break;
            }
        });
    }

    public readFilesInputData(idOrFilesInputData: any = [], readFileAs: string = "readAsDataURL", encoding: string = "utf-8") {
        let filesInputData = idOrFilesInputData;

        if (typeof idOrFilesInputData === "string") {
            let inputElement: any = document.getElementById(idOrFilesInputData);

            if (inputElement.getAttribute("multiple") == undefined) {
                filesInputData = inputElement.files[0];
            } else {
                filesInputData = Array.from(inputElement.files);
            }
        }

        if (Array.isArray(filesInputData)) {
            return Promise.all(filesInputData.map(file => {
                return this.readFile(file, readFileAs, encoding);
            }));
        } else {
            return this.readFile(filesInputData, readFileAs, encoding);
        }
    }
}