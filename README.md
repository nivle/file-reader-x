# What is this?

A package to ease the reading of files.

# Installation

 `npm i file-reader-x`

# Raw

JS: https://raw.githubusercontent.com/nivle/file-reader-x/main/projects/file-reader-x/src/lib/file-reader-x.js

CJS: https://raw.githubusercontent.com/nivle/file-reader-x/main/projects/file-reader-x/src/lib/file-reader-x-cjs.js

ESM: https://raw.githubusercontent.com/nivle/file-reader-x/main/projects/file-reader-x/src/lib/file-reader-x-esm.js

# Esm Example Usage

```

import {readAsArrayBuffer, readAsBinaryString, readAsDataURL, readAsText} from "/node_modules/file-reader-x/dist/file-reader-x/src/lib/file-reader-x-esm.js";

let file = document.getElementById("single-file-input").files[0];
let files = Array.from(document.getElementById("multiple-files-input").files);

readAsArrayBuffer(file).then(f => console.log(f));
// => file with the red data (ArrayBuffer)

readAsArrayBuffer(files).then(f => console.log(f));
// => array of files with the red data (ArrayBuffer)

readAsBinaryString(file).then(f => console.log(f));
// => file with the red data (BinaryString)

readAsBinaryString(files).then(f => console.log(f));
// => array of files with the red data (BinaryString)

readAsDataURL(file).then(f => console.log(f));
// => file with the red data (DataURL)

readAsDataURL(files).then(f => console.log(f));
// => array of files with the red data (DataURL)

readAsText(file).then(f => console.log(f));
// => file with the red data (Text)

readAsText(files).then(f => console.log(f));
// => array of files with the red data (Text)

```
