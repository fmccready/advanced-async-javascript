const fs = require('fs');

const directories = ['dist/js', 'dist/templates'];

function getDirectories(directories) {
    return directories.map((directory)=>fs.mkdirSync(directory))
}

getDirectories(directories);