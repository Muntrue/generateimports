# @muntrue/generateimports

![](https://img.shields.io/npm/v/@muntrue/generateimports.svg?style=flat)
![](https://img.shields.io/github/size/muntrue/generateimports/index.js.svg?style=flat)

[Download on NPM](https://www.npmjs.com/package/@muntrue/generateimports)

`npm i @muntrue/generateimports`

Package to generate import files with easy, currently supports:
* Javascript ECMAScript 6 classes
* File separated Vue components
* Sass files

Package will scan folders for filetypes and add them to a predefined output file. 

---
### Properties

Module will accept an object with three properties

```javascript
{
    files: [],      // Array with single files to include in the import list
    folders: [],    // Array with folders to scan trough, this scan is recursive.
    output: ""      // String with the filename where the output file will be stored.
}
```

---
### Examples

###### ECMAScript6 class
```javascript
const generator = require("@muntrue/generateimports");

generator.js({
   files:   ["vendor.js"],
   folders: ["resources/js", "additional/folders"],
   output:  "importsfile.js"
});
```

###### Vue components
```javascript
const generator = require("@muntrue/generateimports");

generator.vue({
   folders: ["resources/vue-components", "additional/folders"],
   output:  "vue-importsfile.js"
});
```

###### Sass files
```javascript
const generator = require("@muntrue/generateimports");

generator.scss({
   folders: ["resources/scss", "vendor/scss", "additional/folders"],
   output:  "vue-importsfile.js"
});
```