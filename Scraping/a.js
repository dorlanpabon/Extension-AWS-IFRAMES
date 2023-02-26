const puppeteer = require('puppeteer'); // v13.0.0 or later

var iplist = `45.5.160.0/22
45.5.164.0/22
45.5.172.0/22
45.5.180.0/22
45.5.184.0/22
45.5.188.0/22
45.7.132.0/22
45.65.136.0/22
45.65.200.0/24
45.65.232.0/22
45.70.168.0/22
45.71.7.0/24
45.71.180.0/22
45.162.0.0/22
45.162.76.0/22
45.162.82.0/23
45.162.84.0/24
45.162.85.0/24
45.162.126.0/24
45.163.0.0/22
45.163.28.0/23
45.163.30.0/24
45.167.124.0/23
45.167.126.0/24
45.167.248.0/22
45.168.104.0/22
45.169.98.0/23
45.169.253.0/24
45.170.124.0/22
45.170.132.0/22
45.170.240.0/22
45.171.118.0/24
45.171.180.0/22
45.172.178.0/23
45.172.184.0/22
45.172.218.0/24
45.172.222.0/23
45.173.4.0/22
45.173.8.0/22
45.173.12.0/24
45.173.14.0/23
45.173.44.0/24
45.173.68.0/22
45.174.196.0/22
45.174.224.0/23
45.174.227.0/24
45.175.20.0/24
45.175.139.0/24
45.176.70.0/23
45.176.193.0/24
45.176.232.0/22
45.177.52.0/23
45.177.54.0/24
45.177.108.0/22
45.178.4.0/22
45.178.12.0/22
45.178.64.0/22
45.179.160.0/22
45.179.200.0/22
45.179.244.0/22
45.180.22.0/23
45.180.44.0/24
45.180.82.0/23
45.180.112.0/24
45.181.156.0/22
45.181.188.0/22
45.181.204.0/23
45.181.206.0/23
45.182.41.0/24
45.182.190.0/23
45.183.40.0/24
45.183.196.0/22
45.183.247.0/24
45.185.31.0/24
45.187.48.0/22
45.224.186.0/24
45.225.224.0/22
45.226.112.0/22
45.226.186.0/23
45.227.5.0/24
45.227.88.0/22
45.229.72.0/23
45.229.192.0/23
45.230.33.0/24
45.231.184.0/22
45.233.4.0/22
45.233.72.0/22
45.233.168.0/22
45.235.40.0/22
45.237.36.0/22
45.238.144.0/22
45.238.180.0/22
45.238.196.0/22
45.239.88.0/22
45.239.115.0/24
66.231.64.0/20
131.0.136.0/22
131.0.168.0/22
131.108.168.0/22
131.196.208.0/22
131.196.212.0/22
131.221.40.0/22
132.255.20.0/22
138.0.40.0/22
138.0.88.0/22
138.0.116.0/22
138.36.64.0/22
138.94.0.0/22
138.97.56.0/22
138.97.80.0/22
138.117.40.0/22
138.117.84.0/22
138.117.108.0/22
138.117.136.0/22
138.121.4.0/22
138.121.12.0/22
138.121.156.0/22
138.121.200.0/22
138.122.200.0/22
138.186.20.0/22
138.186.188.0/22
138.204.236.0/22
143.0.92.0/22
143.0.102.0/23
143.0.108.0/22
143.137.96.0/22
143.208.64.0/22
152.200.0.0/14
152.204.0.0/15
152.231.24.0/21
157.253.0.0/16
161.10.0.0/16
161.18.0.0/16
167.0.0.0/16
167.249.40.0/22
167.250.120.0/22
168.0.244.0/22
168.90.12.0/22
168.176.0.0/16
168.197.68.0/22
168.227.0.0/22
168.227.104.0/22
168.227.244.0/22
168.228.108.0/22
168.228.124.0/22
170.78.40.0/22
170.78.56.0/22
170.78.185.0/24
170.79.88.0/22
170.80.8.0/22
170.80.96.0/22
170.81.24.0/22
170.81.252.0/22
170.82.40.0/23
170.83.59.0/24
170.238.64.0/23
170.238.168.0/23
170.238.226.0/23
170.238.236.0/22
170.245.158.0/23
170.246.112.0/22
170.247.0.0/22
170.254.0.0/22
170.254.228.0/22
177.252.0.0/14
179.0.9.0/24
179.0.10.0/24
179.0.15.0/24
179.0.27.0/24
179.0.29.0/24
179.0.146.0/24
179.0.205.0/24
179.1.0.0/16
179.12.0.0/14
179.18.0.0/15
179.32.0.0/15
179.42.172.0/22
179.43.104.0/22
179.43.108.0/22
179.50.0.0/17
179.51.96.0/19
179.60.32.0/20
179.60.240.0/22
179.61.112.0/20
181.32.0.0/15
181.48.0.0/13
181.56.0.0/13
181.68.0.0/15
181.70.0.0/15
181.118.144.0/20
181.128.0.0/13
181.136.0.0/13
181.144.0.0/13
181.152.0.0/13
181.174.0.0/18
181.192.128.0/17
181.199.192.0/20
181.204.0.0/14
181.224.160.0/22
181.225.64.0/20
181.225.80.0/20
181.225.96.0/20
181.232.0.0/17
181.234.0.0/15
181.236.0.0/15
181.240.0.0/12
186.0.0.0/18
186.0.64.0/18
186.1.128.0/19
186.1.160.0/19
186.1.248.0/21
186.27.128.0/17
186.28.0.0/16
186.29.0.0/16
186.30.0.0/16
186.31.0.0/16
186.43.0.0/17
186.80.0.0/14
186.84.0.0/14
186.96.96.0/19
186.97.0.0/18
186.97.64.0/18
186.97.128.0/17
186.98.0.0/16
186.99.0.0/16
186.102.0.0/16
186.103.0.0/17
186.112.0.0/14
186.116.0.0/14
186.121.0.0/17
186.144.0.0/14
186.148.160.0/19
186.154.0.0/16
186.155.0.0/16
186.159.0.0/18
186.159.64.0/19
186.159.112.0/22
186.168.0.0/15
186.170.0.0/15
186.179.96.0/20
186.180.0.0/16
186.181.0.0/16
186.183.128.0/17
186.190.224.0/21
190.0.0.0/19
190.0.32.0/19
190.0.240.0/21
190.1.64.0/19
190.1.128.0/19
190.1.160.0/19
190.1.192.0/19
190.1.224.0/19
190.2.208.0/21
190.3.192.0/19
190.3.224.0/19
190.5.192.0/20
190.6.160.0/20
190.6.176.0/20
190.7.64.0/20
190.7.80.0/20
190.7.96.0/20
190.7.112.0/20
190.7.128.0/20
190.7.144.0/20
190.8.176.0/22
190.8.192.0/19
190.8.224.0/19
190.9.64.0/19
190.9.96.0/19
190.9.192.0/19
190.9.224.0/19
190.13.0.0/19
190.13.32.0/19
190.13.80.0/21
190.13.96.0/20
190.13.192.0/20
190.14.224.0/20
190.14.240.0/20
190.15.0.0/19
190.24.0.0/16
190.25.0.0/16
190.26.0.0/16
190.27.0.0/16
190.28.0.0/16
190.29.0.0/16
190.52.0.0/19
190.60.0.0/16
190.61.0.0/19
190.61.32.0/19
190.61.64.0/18
190.61.128.0/17
190.65.0.0/16
190.66.0.0/15
190.68.0.0/15
190.70.0.0/17
190.70.128.0/17
190.71.0.0/16
190.84.0.0/16
190.85.0.0/16
190.90.0.0/16
190.93.128.0/19
190.96.128.0/19
190.96.160.0/19
190.96.192.0/20
190.96.208.0/20
190.96.224.0/19
190.97.64.0/20
190.97.80.0/20
190.97.128.0/19
190.97.192.0/19
190.99.128.0/17
190.102.120.0/21
190.102.160.0/19
190.102.192.0/20
190.102.208.0/20
190.103.96.0/20
190.103.112.0/20
190.107.16.0/20
190.109.128.0/19
190.109.160.0/19
190.110.64.0/19
190.115.224.0/19
190.120.128.0/20
190.121.128.0/20
190.121.144.0/20
190.124.96.0/19
190.125.0.0/16
190.126.0.0/15
190.128.0.0/19
190.128.32.0/19
190.128.64.0/18
190.130.64.0/18
190.131.192.0/18
190.143.0.0/18
190.143.64.0/18
190.144.0.0/14
190.151.192.0/18
190.156.0.0/15
190.158.0.0/15
190.165.0.0/18
190.165.64.0/18
190.165.128.0/17
190.182.0.0/18
190.182.64.0/18
190.184.128.0/18
190.184.200.0/21
190.211.140.0/22
190.240.0.0/18
190.240.64.0/18
190.240.128.0/17
190.242.0.0/16
190.243.0.0/16
190.248.0.0/15
190.250.0.0/15
190.252.0.0/14
191.64.0.0/12
191.88.0.0/13
191.97.0.0/20
191.98.0.0/17
191.102.0.0/20
191.102.60.0/22
191.102.64.0/18
191.102.192.0/19
191.102.224.0/20
191.103.128.0/17
191.104.0.0/13
191.144.0.0/12
192.68.185.0/24
192.92.154.0/24
192.135.95.0/24
192.140.124.0/23
198.49.128.0/22
198.51.71.0/24
200.0.0.0/21
200.0.187.0/24
200.0.201.0/24
200.1.64.0/19
200.1.96.0/21
200.1.124.0/24
200.1.126.0/24
200.1.127.0/24
200.1.173.0/24
200.1.175.0/24
200.1.192.0/21
200.2.64.0/21
200.3.128.0/20
200.3.144.0/23
200.3.147.0/24
200.3.148.0/22
200.3.152.0/22
200.3.156.0/22
200.3.160.0/21
200.3.192.0/23
200.3.244.0/22
200.4.16.0/20
200.6.160.0/20
200.6.176.0/20
200.9.72.0/24
200.9.94.0/24
200.9.158.0/23
200.10.136.0/23
200.10.154.0/24
200.10.164.0/24
200.10.174.0/23
200.11.40.0/21
200.12.170.0/24
200.12.175.0/24
200.12.176.0/20
200.13.192.0/19
200.13.224.0/19
200.14.40.0/21
200.14.112.0/23
200.16.68.0/22
200.16.79.0/24
200.16.117.0/24
200.16.118.0/23
200.21.0.0/16
200.23.115.0/24
200.24.0.0/21
200.24.8.0/24
200.24.9.0/24
200.24.16.0/20
200.24.32.0/20
200.24.48.0/20
200.24.96.0/20
200.24.112.0/20
200.25.0.0/17
200.25.224.0/20
200.25.240.0/20
200.26.128.0/19
200.29.96.0/20
200.29.112.0/20
200.29.232.0/21
200.30.64.0/20
200.30.80.0/20
200.30.96.0/19
200.31.64.0/19
200.31.192.0/20
200.31.208.0/20
200.34.0.0/24
200.34.171.0/24
200.35.32.0/20
200.35.48.0/20
200.47.172.0/22
200.47.216.0/22
200.58.192.0/20
200.58.208.0/20
200.58.224.0/20
200.61.128.0/19
200.69.64.0/19
200.69.96.0/20
200.69.112.0/20
200.71.32.0/20
200.71.48.0/20
200.73.0.0/18
200.73.64.0/19
200.74.128.0/19
200.75.32.0/19
200.75.64.0/19
200.80.0.0/18
200.81.56.0/21
200.85.224.0/20
200.85.240.0/20
200.89.96.0/20
200.89.112.0/20
200.89.192.0/20
200.89.208.0/20
200.89.224.0/20
200.89.240.0/20
200.91.192.0/19
200.91.224.0/19
200.93.128.0/19
200.93.160.0/19
200.110.128.0/19
200.110.168.0/21
200.112.192.0/20
200.112.208.0/21
200.114.0.0/20
200.114.16.0/20
200.114.32.0/19
200.115.178.0/24
200.115.180.0/24
200.115.181.0/24
200.116.0.0/17
200.116.128.0/17
200.118.0.0/17
200.118.128.0/17
200.119.0.0/19
200.119.32.0/19
200.119.64.0/18
200.122.192.0/19
200.122.224.0/20
200.122.240.0/20
200.124.124.0/23
200.192.106.0/24
201.130.16.0/22
201.131.46.0/24
201.131.78.0/24
201.131.90.0/23
201.131.97.0/24
201.131.114.0/24
201.131.188.0/22
201.150.96.0/22
201.182.248.0/22
201.184.0.0/15
201.190.64.0/18
201.216.0.0/19
201.216.32.0/19
201.217.192.0/19
201.219.112.0/20
201.219.192.0/19
201.219.240.0/21
201.220.30.0/23
201.220.32.0/20
201.220.48.0/20
201.220.64.0/20
201.220.80.0/20
201.221.122.0/24
201.221.124.0/23
201.221.128.0/20
201.221.144.0/20
201.221.160.0/20
201.221.176.0/20
201.228.0.0/17
201.228.128.0/17
201.232.0.0/17
201.232.128.0/17
201.233.0.0/17
201.233.128.0/17
201.236.192.0/19
201.236.224.0/19
201.244.0.0/16
201.245.0.0/16
206.223.124.0/24
207.248.81.0/24
216.241.0.0/19
`;
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    async function waitForSelectors(selectors, frame, options) {
        for (const selector of selectors) {
            try {
                return await waitForSelector(selector, frame, options);
            } catch (err) {
                console.error(err);
            }
        }
        throw new Error('Could not find element for selectors: ' + JSON.stringify(selectors));
    }

    async function scrollIntoViewIfNeeded(element, timeout) {
        await waitForConnected(element, timeout);
        const isInViewport = await element.isIntersectingViewport({ threshold: 0 });
        if (isInViewport) {
            return;
        }
        await element.evaluate(element => {
            element.scrollIntoView({
                block: 'center',
                inline: 'center',
                behavior: 'auto',
            });
        });
        await waitForInViewport(element, timeout);
    }

    async function waitForConnected(element, timeout) {
        await waitForFunction(async () => {
            return await element.getProperty('isConnected');
        }, timeout);
    }

    async function waitForInViewport(element, timeout) {
        await waitForFunction(async () => {
            return await element.isIntersectingViewport({ threshold: 0 });
        }, timeout);
    }

    async function waitForSelector(selector, frame, options) {
        if (!Array.isArray(selector)) {
            selector = [selector];
        }
        if (!selector.length) {
            throw new Error('Empty selector provided to waitForSelector');
        }
        let element = null;
        for (let i = 0; i < selector.length; i++) {
            const part = selector[i];
            if (element) {
                element = await element.waitForSelector(part, options);
            } else {
                element = await frame.waitForSelector(part, options);
            }
            if (!element) {
                throw new Error('Could not find element: ' + selector.join('>>'));
            }
            if (i < selector.length - 1) {
                element = (await element.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
            }
        }
        if (!element) {
            throw new Error('Could not find element: ' + selector.join('|'));
        }
        return element;
    }

    async function waitForElement(step, frame, timeout) {
        const count = step.count || 1;
        const operator = step.operator || '>=';
        const comp = {
            '==': (a, b) => a === b,
            '>=': (a, b) => a >= b,
            '<=': (a, b) => a <= b,
        };
        const compFn = comp[operator];
        await waitForFunction(async () => {
            const elements = await querySelectorsAll(step.selectors, frame);
            return compFn(elements.length, count);
        }, timeout);
    }

    async function querySelectorsAll(selectors, frame) {
        for (const selector of selectors) {
            const result = await querySelectorAll(selector, frame);
            if (result.length) {
                return result;
            }
        }
        return [];
    }

    async function querySelectorAll(selector, frame) {
        if (!Array.isArray(selector)) {
            selector = [selector];
        }
        if (!selector.length) {
            throw new Error('Empty selector provided to querySelectorAll');
        }
        let elements = [];
        for (let i = 0; i < selector.length; i++) {
            const part = selector[i];
            if (i === 0) {
                elements = await frame.$$(part);
            } else {
                const tmpElements = elements;
                elements = [];
                for (const el of tmpElements) {
                    elements.push(...(await el.$$(part)));
                }
            }
            if (elements.length === 0) {
                return [];
            }
            if (i < selector.length - 1) {
                const tmpElements = [];
                for (const el of elements) {
                    const newEl = (await el.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
                    if (newEl) {
                        tmpElements.push(newEl);
                    }
                }
                elements = tmpElements;
            }
        }
        return elements;
    }

    async function waitForFunction(fn, timeout) {
        let isActive = true;
        setTimeout(() => {
            isActive = false;
        }, timeout);
        while (isActive) {
            const result = await fn();
            if (result) {
                return;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        throw new Error('Timed out');
    }
    {
        const targetPage = page;
        await targetPage.setViewport({ "width": 1536, "height": 463 })
    }
    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        await targetPage.goto("https://us-east-1.console.aws.amazon.com/vpc/home?region=us-east-1#ModifyPrefixList:prefixListId=pl-07e1c480bff067037");
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        const element = await waitForSelectors([["aria/Add new entry", "aria/[role=\"generic\"]"], ["[data-testid=modifyEntryEditor] > div > div.awsui-attribute-editor__add-row > awsui-button > button > span"]], frame, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        await element.click({
            offset: {
                x: 52,
                y: 14,
            },
        });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        const element = await waitForSelectors([["aria/CIDR blocks"], ["#awsui-autosuggest-137"]], frame, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        await element.click({
            offset: {
                x: 136,
                y: 17,
            },
        });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        const element = await waitForSelectors([["aria/CIDR blocks"], ["#awsui-autosuggest-137"]], frame, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        const type = await element.evaluate(el => el.type);
        if (["select-one"].includes(type)) {
            await element.select("");
        } else if (["textarea", "text", "url", "tel", "search", "password", "number", "email"].includes(type)) {
            await element.type("");
        } else {
            await element.focus();
            await element.evaluate((el, value) => {
                el.value = value;
                el.dispatchEvent(new Event('input', { bubbles: true }));
                el.dispatchEvent(new Event('change', { bubbles: true }));
            }, "");
        }
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        const element = await waitForSelectors([["aria/Description"], ["#awsui-input-138"]], frame, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        await element.click({
            offset: {
                x: 56.5,
                y: 11,
            },
        });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        const element = await waitForSelectors([["aria/Description"], ["#awsui-input-138"]], frame, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        const type = await element.evaluate(el => el.type);
        if (["select-one"].includes(type)) {
            await element.select("a");
        } else if (["textarea", "text", "url", "tel", "search", "password", "number", "email"].includes(type)) {
            await element.type("a");
        } else {
            await element.focus();
            await element.evaluate((el, value) => {
                el.value = value;
                el.dispatchEvent(new Event('input', { bubbles: true }));
                el.dispatchEvent(new Event('change', { bubbles: true }));
            }, "a");
        }
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        const element = await waitForSelectors([["[data-testid=modifyEntryEditor] > div > div.awsui-attribute-editor__row > awsui-form-field > div > div > div > div.awsui-form-field-control.col-xxxs-12.col-xs-9 > span > awsui-column-layout > div > span > div > awsui-form-field:nth-child(2) > div > div > div > div"]], frame, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        await element.click({
            offset: {
                x: 116.5,
                y: 47,
            },
        });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        const element = await waitForSelectors([["aria/Add new entry", "aria/[role=\"generic\"]"], ["[data-testid=modifyEntryEditor] > div > div.awsui-attribute-editor__add-row > awsui-button > button > span"]], frame, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        await element.click({
            offset: {
                x: 95,
                y: 9,
            },
        });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        const element = await waitForSelectors([["#awsui-autosuggest-139"]], frame, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        await element.click({
            offset: {
                x: 121,
                y: 13,
            },
        });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        const element = await waitForSelectors([["#awsui-input-140"]], frame, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        await element.click({
            offset: {
                x: 124.5,
                y: 18,
            },
        });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        const element = await waitForSelectors([["#awsui-input-140"]], frame, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        const type = await element.evaluate(el => el.type);
        if (["select-one"].includes(type)) {
            await element.select("s");
        } else if (["textarea", "text", "url", "tel", "search", "password", "number", "email"].includes(type)) {
            await element.type("s");
        } else {
            await element.focus();
            await element.evaluate((el, value) => {
                el.value = value;
                el.dispatchEvent(new Event('input', { bubbles: true }));
                el.dispatchEvent(new Event('change', { bubbles: true }));
            }, "s");
        }
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await targetPage.keyboard.down("Enter");
    }

    await browser.close();
})();
