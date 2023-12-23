const fs = require('fs');

// Lighthouse utility functions
const compareReports = (from, to) => {
    const reports = [];
    log.info(`Comparing reports`);

    const metricFilter = [
        'first-contentful-paint',
        'first-meaningful-paint',
        'speed-index',
        'estimated-input-latency',
        'total-blocking-time',
        'max-potential-fid',
        'time-to-first-byte',
        'first-cpu-idle',
        'interactive'
    ];

    const calcPercentageDiff = (from, to) => {
        const per = ((to - from) / from) * 100;
        return Math.round(per * 100) / 100;
    };

    try {
        for (let auditObj in from['audits']) {
            if (metricFilter.includes(auditObj)) {
                const percentageDiff = calcPercentageDiff(
                    from['audits'][auditObj].numericValue,
                    to['audits'][auditObj].numericValue
                );

                let logColor = '\x1b[37m';
                const log = (() => {
                    if (Math.sign(percentageDiff) === 1) {
                        logColor = '\x1b[31m';
                        return `${percentageDiff.toString().replace('-', '') + '%'} slower`;
                    } else if (Math.sign(percentageDiff) === 0) {
                        return 'unchanged';
                    } else {
                        logColor = '\x1b[32m';
                        return `${percentageDiff.toString().replace('-', '') + '%'} faster`;
                    }
                })();

                console.log(logColor, `${from['audits'][auditObj].title} is ${log}`);
                reports.push(`${from['audits'][auditObj].title} is ${log}`);
            }
        }
        return reports;
    } catch (e) {
        console.error(e);
        throw new Error(e);
    }
};

const getOverallReport = async (result) => {
    const reports = [];
    const metricFilter = [
        'first-contentful-paint',
        'first-meaningful-paint',
        'speed-index',
        'estimated-input-latency',
        'total-blocking-time',
        'max-potential-fid',
        'time-to-first-byte',
        'first-cpu-idle',
        'interactive'
    ];
    let report = Object();

    for (let auditObj in result['audits']) if (metricFilter.includes(auditObj)) report[auditObj] = result['audits'][auditObj].numericValue;

    log.info(`lighthouse report`);
    log.info(JSON.stringify(report));
    return report;
};



const launchChromeAndRunLighthouse = async (url) => {
    log.info(`launching lighthouse and chrome: ${url}`);

    const lighthouse = (await import('lighthouse')).default;
    const chromeLauncher = await import('chrome-launcher');

    try {
        log.info(`launching chrome`);
        const chrome = await chromeLauncher.launch({
            protocolTimeout: 30000,
            chromeFlags: ['--headless', '--no-sandbox', 
            '--disable-setuid-sandbox', 
            '--disable-network-throttling', '--disable-cpu-throttling']
        });

        log.info(`chrome port - ${chrome.port}`);
        const opts = {
            port: chrome.port
        };

        log.info(`launching lighthouse`);
        const results = await lighthouse(url, opts);

        log.info(results);
        await chrome.kill();

        return {
            js: results.lhr,
            json: results.report
        };
    } catch (e) {
        log.error(e);
        // throw new Error(e);
    }
};

module.exports = {
    launchChromeAndRunLighthouse,
    compareReports,
    getOverallReport,
};