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

    public readAsArrayBuffer(dataToRead: Blob | Blob[]) {
        if (Array.isArray(dataToRead)) {
            return this.fileReaderXService.readFiles(dataToRead, "readAsArrayBuffer");
        } else {
            return this.fileReaderXService.readFile(dataToRead, "readAsArrayBuffer");
        }
    }

    public readAsBinaryString(dataToRead: Blob | Blob[]) {
        if (Array.isArray(dataToRead)) {
            return this.fileReaderXService.readFiles(dataToRead, "readAsBinaryString");
        } else {
            return this.fileReaderXService.readFile(dataToRead, "readAsBinaryString");
        }
    }

    public readAsDataURL(dataToRead: Blob | Blob[]) {
        if (Array.isArray(dataToRead)) {
            return this.fileReaderXService.readFiles(dataToRead, "readAsDataURL");
        } else {
            return this.fileReaderXService.readFile(dataToRead, "readAsDataURL");
        }
    }

    public readAsText(dataToRead: Blob | Blob[], encoding = "utf-8") {
        if (Array.isArray(dataToRead)) {
            return this.fileReaderXService.readFiles(dataToRead, "readAsText", encoding);
        } else {
            return this.fileReaderXService.readFile(dataToRead, "readAsText", encoding);
        }
    }
}
