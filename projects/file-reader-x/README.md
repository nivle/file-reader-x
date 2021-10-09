# What is this?

A package to ease the reading of files.

# Installation

 `npm i file-reader-x`

# Raw

JS: https://raw.githubusercontent.com/nivle/file-reader-x/main/projects/file-reader-x/dist/file-reader-x.js

CJS: https://raw.githubusercontent.com/nivle/file-reader-x/main/projects/file-reader-x/dist/file-reader-x-cjs.js

ESM: https://raw.githubusercontent.com/nivle/file-reader-x/main/projects/file-reader-x/dist/file-reader-x-esm.js

# Esm Example

```

import { fileReaderX } from "/node_modules/file-reader-x/dist/file-reader-x-esm.js";

let file = document.getElementById("single-file-input").files[0];
let files = Array.from(document.getElementById("multiple-files-input").files);

fileReaderX.readAsArrayBuffer(file).then(f => console.log(f));
// => file with the red data (ArrayBuffer)

fileReaderX.readAsArrayBuffer(files).then(f => console.log(f));
// => array of files with the red data (ArrayBuffer)

fileReaderX.readAsBinaryString(file).then(f => console.log(f));
// => file with the red data (BinaryString)

fileReaderX.readAsBinaryString(files).then(f => console.log(f));
// => array of files with the red data (BinaryString)

fileReaderX.readAsDataURL(file).then(f => console.log(f));
// => file with the red data (DataURL)

fileReaderX.readAsDataURL(files).then(f => console.log(f));
// => array of files with the red data (DataURL)

fileReaderX.readAsText(file).then(f => console.log(f));
// => file with the red data (Text)

fileReaderX.readAsText(files).then(f => console.log(f));
// => array of files with the red data (Text)

```