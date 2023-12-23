const { launchChromeAndRunLighthouseService } = require('../services/lighthouseService');

module.exports.launchChromeAndRunLighthouse = async (req, res) => {
    const payload = req.body;
    try {
        launchChromeAndRunLighthouseService(payload);
    } catch (e) {
        console.error(e);
    }
    res.send({ message: `report generation started` });
    return;
};
