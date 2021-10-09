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

	public readFiles(files: Blob[], readFilesAs: string = "readAsDataURL", encoding: string = "utf-8"): Promise<any> {
		return Promise.all(files.map(file => {
			return this.readFile(file, readFilesAs, encoding);
		}));
	}
}
