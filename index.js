const fs   = require("fs");
const glob = require("glob");

function scss(input)
{
    checkParams(input);

    let imports = [];

    if(input.hasOwnProperty('files')) imports = imports.concat(input.files);
    input.folders.forEach(folder => imports = imports.concat(getFileList(folder, "scss", input)));

    const formatter = file => "@import '" + file + "';";
    fs.writeFileSync(input.output, imports.map(formatter).join("\r\n"));
}

function vue(input)
{
    checkParams(input);

    let imports = [];

    if(input.hasOwnProperty('files')) imports = imports.concat(input.files);
    input.folders.forEach(folder => imports = imports.concat(getFileList(folder, "vue", input)));

    const formatter = file => [ "Vue.component('", path.parse(file).name, "', require('", file, "'));" ].join("");
    fs.writeFileSync(input.output, imports.map(formatter).join("\r\n"));
}

function js(input)
{
    checkParams(input);

    let imports = [];

    if(input.hasOwnProperty('files')) imports = imports.concat(input.files);
    input.folders.forEach(folder => imports = imports.concat(getFileList(folder, "vue", input)));

    const formatter = file => "import " + toCamelCase(path.parse(file).name) + " from '" + file + "';" +
    "\n" +
    "global." + toCamelCase(path.parse(file).name) + " = " + toCamelCase(path.parse(file).name) + ";\n";
    fs.writeFileSync(input.output, imports.map(formatter).join("\r\n"));
}

function test(input){
    checkParams(input);
}

function getFileList(folder, extension, input)
{
    const list = [];

    glob.sync(folder).forEach(function (directory)
    {
        glob.sync(directory + "/**/*." + extension).forEach(function (file)
        {
            list.push(path.relative(input.output, file).substr(3));
        });
    });

    return list;
}

function toCamelCase(str)
{
    return str.split(/[_-]/g).map(part =>
    {
        return part.charAt(0).toUpperCase() + part.slice(1);
    }).join("");
}

function checkParams(input)
{
    if( ! input.hasOwnProperty('folders')) throw new TypeError("folders propery is missing");
    if( ! input.hasOwnProperty('output')) throw new TypeError("output propery is missing");

    if(input.hasOwnProperty('files')){
        if(typeof input.files !== "object") throw new TypeError("files property must contain an array");
    }

    if(typeof input.folders !== "object") throw new TypeError("folders property must contain an array");
    if(typeof input.output !== "string") throw new TypeError("input property must contain a string");
}

module.exports = {
    scss: scss,
    vue: vue,
    js: js,
    test:test
};
