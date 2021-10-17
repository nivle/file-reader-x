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

import { Component, OnInit } from '@angular/core';
import { FileReaderXService } from './file-reader-x.service';

@Component({
    selector: 'lib-file-reader-x',
    template: `
    <p>
      file-reader-x works!
    </p>
  `,
    styles: [
    ]
})
export class FileReaderXComponent implements OnInit {

    constructor(private fileReaderXService: FileReaderXService) { }

    ngOnInit(): void {
    }

    public readAsArrayBuffer(filesInputData: string | Blob | Blob[]) {
        return this.fileReaderXService.readFilesInputData(filesInputData, "readAsArrayBuffer");
    }

    public readAsBinaryString(filesInputData: string | Blob | Blob[]) {
        return this.fileReaderXService.readFilesInputData(filesInputData, "readAsBinaryString");
    }

    public readAsDataURL(filesInputData: string | Blob | Blob[]) {
        return this.fileReaderXService.readFilesInputData(filesInputData, "readAsDataURL");
    }

    public readAsText(filesInputData: string | Blob | Blob[], encoding = "utf-8") {
        return this.fileReaderXService.readFilesInputData(filesInputData, "readAsText", encoding);
    }
}
