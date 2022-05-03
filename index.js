const throttle = (f, t) => {
    let lastCallTime = null;
    return (...args) => {
        const nowCallTime = Date.Now();
        if (!lastCallTime || nowCallTime - lastCallTime > t) {
            lastCallTime = nowCallTime;
            f(args);
        }
    };
}

const accumulativeThrottle = (f, t) => {
    let lastCallTime = null;
    let eventQueue = [f];
    return (...args) => {
        const nowCallTime = Date.Now();
        if (!lastCallTime || nowCallTime - lastCallTime > t) {
            lastCallTime = nowCallTime;
            while (eventQueue.length) {
                const call = eventQueue.shift();
                call(args);
            }
        } else {
            eventQueue.push(f);
        }
    };
}

const debounce = (f, t) => {
    let lastCallTime = null;
    return (...args) => {
        const nowCallTime = Date.Now();
        if (!lastCallTime || nowCallTime - lastCallTime > t) {
            f(args);
        }
        lastCallTime = nowCallTime;
    };
}

const accumulativeDebounce = (f, t) => {
    let lastCallTime = null;
    let eventQueue = [f];
    return (...args) => {
        const nowCallTime = Date.Now();
        if (!lastCallTime || nowCallTime - lastCallTime > t) {
            while (eventQueue.length) {
                const call = eventQueue.shift();
                call(args);
            }
        } else {
            eventQueue.push(f);
        }
        lastCallTime = nowCallTime;
    };
}

const debounceTimed = (f, t) => {
    let lastCallTime = null;
    let timer = null;
    return (...args) => {
        const nowCallTime = Date.Now();
        if (!lastCallTime || nowCallTime - lastCallTime <= t) {
            if (timer) clearTimeout(timer);
            lastCallTime = nowCallTime;
        }
        timer = setTimeout(() => f(args), t);
    };
}

const accumulativeDebounceTimed = (f, t) => {
    let lastCallTime = null;
    let timer = null;
    let eventQueue = [f];
    return (...args) => {
        const nowCallTime = Date.Now();
        if (!lastCallTime || nowCallTime - lastCallTime <= t) {
            if (timer) clearTimeout(timer);
            lastCallTime = nowCallTime;
            eventQueue.push(f);
        }
        timer = setTimeout(() => {
            while (eventQueue.length) {
                const call = eventQueue.shift();
                call(args);
            }
        }, t);
    };
}