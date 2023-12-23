
const { launchChromeAndRunLighthouse, getOverallReport } = require('../utils/lighthouseUtils');

// Lighthouse service functions
const launchChromeAndRunLighthouseService = async (payload) => {
    let overAllReport;
    let dirName = 'report';

    try {
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName);
        }
    } catch (e) {
        console.error(e);
        return;
    }

    let results;
    try {
        results = await launchChromeAndRunLighthouse(payload.url);
        overAllReport = await getOverallReport(results.js);
    } catch (e) {
        console.error(e);
        return;
    }
   
};

module.exports = {
    launchChromeAndRunLighthouseService,
};
