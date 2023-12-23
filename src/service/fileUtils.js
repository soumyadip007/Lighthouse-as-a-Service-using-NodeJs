const fs = require('fs');

// File utility functions
const getContents = (pathStr) => {
    try {
        log.info(`getContents : ${pathStr} `);
        const output = fs.readFileSync(pathStr, 'utf8', (err, results) => {
            return results;
        });
        return JSON.parse(output);
    } catch (e) {
        log.error(e);
        throw new Error(e);
    }
};

module.exports = {
    getContents,
};
