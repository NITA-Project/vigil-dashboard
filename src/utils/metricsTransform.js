function metricsTransform(metrics) {
    const report = {};
    for(const metric of metrics) {
        if(metric.timestamp in report) {
            report[metric.timestamp][metric.url] = metric.responseTime;
        } else {
            report[metric.timestamp] = {
                [metric.url]: metric.responseTime
            };
        }
    }
    const result = [];
    for(const [ts, urlObject] of Object.entries(report)) {
        const item = { 
            timestamp: ts
        };
        for(const [url, responseTime] of Object.entries(urlObject)) {
            item[url] = responseTime;
        }
        result.push(item);
    }
    return result.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}

export default metricsTransform;