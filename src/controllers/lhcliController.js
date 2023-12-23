const { execSync } = require('child_process');

module.exports.lhcli = async (req, res) => {
    const url = req.body.url;

    if (!url) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    try {
        const result = execSync(`lhci collect --url=${url}`).toString();
        console.log(result);
        res.json({ result });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
