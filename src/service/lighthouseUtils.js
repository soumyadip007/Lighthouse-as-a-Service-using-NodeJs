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

module.exports = {
    compareReports,
    getOverallReport,
};