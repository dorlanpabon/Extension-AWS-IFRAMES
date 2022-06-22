async function logsInsights(iframeDoc, waitForElm, editor1, editor2) {
    console.log('logsInsights');
    await waitForElm(iframeDoc, "#scroll-query-button > button");
    //get the iframe's contentWindow's document's body
    var iframeBody = iframeDoc.body;
    //get the iframe's contentWindow's document's body's children
    var iframeBodyChildren = iframeBody.children;

    console.log(iframeBody);

    //boton para obtener las url
    var geturls = document.createElement('div');
    geturls.className = 'panel-menu-item is-not-selected';
    geturls.id = 'geturls';
    geturls.innerHTML = `
        <awsui-icon initialized="true">
            <span class="awsui-icon awsui-icon-size-normal awsui-icon-variant-normal">
                ${awsuiIconURL}
            </span>
        </awsui-icon>
        <p>Get URL's</p>
                `;
    //boton para ver los JSON
    var getjsons = document.createElement('div');
    getjsons.className = 'panel-menu-item is-not-selected';
    getjsons.id = 'getjsons';
    getjsons.innerHTML = `
        <awsui-icon initialized="true">
            <span class="awsui-icon awsui-icon-size-normal awsui-icon-variant-normal">
                ${awsuiIconJSON}
            </span>
        </awsui-icon>
        <p>Get JSON's</p>
                `;

    iframeDoc.querySelector("#logs-micro-console__root > div > div > div > div > div.panel-menu").appendChild(geturls);
    iframeDoc.querySelector("#logs-micro-console__root > div > div > div > div > div.panel-menu").appendChild(getjsons);

    //Funcion para obtener las URLs de los logs
    function cargarURLS() {
        console.log("cargarURLS");
        //recorrermos todos los tr de los elmentos con desplegable
        iframeDoc.querySelectorAll("div[class='logs-insights-expanded-row']>table>tbody>tr").forEach(r => {
            var execution_arn
            var urlLog
            var logStream
            var tdTitle = r.children[0].innerText;
            var tdValue = r.children[1].innerText;
            var tdValueHTML = r.children[1];
            //get the code region from URL window
            var region = window.location.href.replace('https://', '').split('.')[0];
            //regex to get the url StateFunction
            if (RegExp('^arn:aws:states:[a-zA-Z0-9-_]{1,}:[0-9]{12}:execution:[a-zA-Z0-9-_]{1,}:[a-zA-Z0-9-_]{1,}').test(tdValue) && tdTitle.includes("execution_arn")) {
                execution_arn = 'https://' + region + '.console.aws.amazon.com/states/home?region=' + region + '#/executions/details/' + tdValue;
                console.log(tdValueHTML.innerHTML = '<a href="' + execution_arn + '" target="_blank">' + tdValue + '</a>');
            };
            //regex to get the url lambda
            if (RegExp('\d*:[a-zA-Z0-9-_]*').test(tdValue) && tdTitle.includes("@log")) {
                //remplazamos el / por $252F para que amazon lo reconozca
                textLog = tdValue.replace(/\d*:/, '').replaceAll('/', '$252F');
                urlLog = 'https://' + region + '.console.aws.amazon.com/cloudwatch/home?region=' + region + '#logsV2:log-groups/log-group/' + textLog;
                console.log(tdValueHTML.innerHTML = '<a href="' + urlLog + '" target="_blank">' + tdValue + '</a>');
                //recorrer todos los tdValueHTML para obtener el logStream
                var tdValueParent;
                var parenNode = r.parentNode.children.length;
                var textLogStream;
                for (var i = 0; i < parenNode; i++) {
                    if (r.parentNode.children[i].innerText.includes("@logStream")) {
                        tdValueParent = r.parentNode.children[i].children[1].innerText;
                        //remplazamos el / por $252F para que amazon lo reconozca
                        textLogStream = tdValueParent.replaceAll('/', '$252F');
                        logStream = 'https://' + region + '.console.aws.amazon.com/cloudwatch/home?region=' + region + '#logsV2:log-groups/log-group/' + textLog + '/log-events/' + textLogStream;
                        console.log(r.parentNode.children[i].children[1].innerHTML = '<a href="' + logStream + '" target="_blank">' + tdValueParent + '</a>');
                    }
                    //if @timestamp
                    if (r.parentNode.children[i].innerText.includes("@timestamp")) {
                        timestamp = r.parentNode.children[i].children[1].innerText;
                        urllogStreamTimestamp = 'https://' + region + '.console.aws.amazon.com/cloudwatch/home?region=' + region + '#logsV2:log-groups/log-group/' + textLog + '/log-events/' + textLogStream + '$3Fstart$3D' + timestamp + '$26end$3D' + (Number(timestamp) + 1);
                        console.log(r.parentNode.children[i].children[1].innerHTML = '<a href="' + urllogStreamTimestamp + '" target="_blank">' + timestamp + '</a>');
                    }
                }
            };
        });
    }
    //Funcion para cargar los JSON en el editor
    function cargarJsonView() {
        iframeDoc.querySelectorAll("div[class='logs-insights-expanded-row']>table>tbody>tr").forEach(r => {
            var tdTitle = r.children[0].innerText;
            var tdValue = r.children[1].innerText;
            if (tdTitle.includes("@message") || tdTitle.includes("Message")) {
                try {
                    var json
                    if (tdValue.includes("{") && tdValue.includes("}")) {
                        if (tdValue.includes("INFO EVENT: ")) {
                            if (tdValue.includes("\'") && RegExp('\'[a-zA-Z0-9-_:.]*\'').test(tdValue)) {
                                json = JSON.parse(tdValue.split("INFO EVENT: ")[1].replace(/"/g, "\\\"")
                                    .replace(/([{,])(\s*)([A-Za-z0-9_\-]+?)\s*:/g, '$1"$3":').replace(/'/g, '"')
                                    .replace(RegExp('\\[Object\\]', 'g'), '["ThisIsAnObject"]'))
                                //.replace(/([{,])(\s*)([A-Za-z0-9_\-]+?)\s*:/g, '$1"$3":'); //posible solucion
                            } else {
                                json = JSON.parse(tdValue.split("INFO EVENT: ")[1]);
                            }
                        } else if (tdValue.includes("INFO ") && RegExp('\'[a-zA-Z0-9-_:.]*\'').test(tdValue)) {
                            if (tdValue.includes("\'")) {
                                json = JSON.parse(tdValue.split("INFO ")[1].replace(/"/g, "\\\"")
                                    .replace(/([{,])(\s*)([A-Za-z0-9_\-]+?)\s*:/g, '$1"$3":').replace(/'/g, '"')
                                    .replace(RegExp('\\[Object\\]', 'g'), '["ThisIsAnObject"]'))
                            } else {
                                json = JSON.parse(tdValue.split("INFO ")[1]);
                            }
                        } else {
                            json = JSON.parse(tdValue);
                        }
                        r.addEventListener('click', () => {
                            editor1.set(json)
                            editor2.set(json)
                            editor2.expandAll()
                            iframeDoc.getElementById('modal-json').style.display = 'block';
                        });
                        r.children[1].style.background = '#a22727';
                        r.children[1].style.color = 'white';
                        r.children[1].style.cursor = 'pointer';
                    }
                } catch (e) {
                    console.log('No es JSON');
                }
            }
        });
    }
    //Escucha los clicks en el boton de cargar
    /* iframeDoc.querySelector("#geturls").addEventListener("click", () => {
        cargarURLS()
    }, false); */
    //Escucha los clicks en el boton de cargar
    iframeDoc.querySelector("#getjsons").addEventListener("click", () => {
        cargarJsonView()
    }, false);

    /**@type{WeakMap}*/ var registeredListeners = new WeakMap();

    hearEvent(iframeDoc.querySelector("#geturls"), "click", function propagate(evt) {
        fireEvent(iframeDoc.querySelector("#getjsons"), evt, propagate);
    });



    /**
     * @param{Element} target
     * @param{string} name
     * @param{function(Event=):(boolean|undefined)} handle
     * @param{(Object<string,boolean>|boolean)=} options
     * @return {undefined}
     */
    function hearEvent(target, name, handle, options) {
        target.addEventListener(name, handle, options);
        var curArr = registeredListeners.get(target);
        if (!curArr) registeredListeners.set(target, (curArr = []));
        console.log(options)
        curArr.push([
            "" + name,
            handle,
            typeof options == "object" ? !!options.capture : !!options,
            target
        ]);
    }

    /**
     * @param{Element} target
     * @param{Event} eventObject
     * @param{Element=} caller
     * @return {undefined}
     */
    function fireEvent(target, eventObject, caller) {
        var deffered = [], name = eventObject.type, curArr, listener;
        var immediateStop = false, keepGoing = true, lastTarget;
        var currentTarget = target, doesBubble = !!eventObject.bubbles;

        var trueObject = Object.setPrototypeOf({
            stopImmediatePropagation: function () { immediateStop = true },
            stopPropagation: function () { keepGoing = false },
            get target() { return target },
            get currentTarget() { return currentTarget }
        }, eventObject);

        do {
            if (curArr = registeredListeners.get(currentTarget))
                for (var i = 0; i < (curArr.length | 0) && !immediateStop; i = i + 1 | 0)
                    if (curArr[i][0] === name && curArr[i][1] !== caller) {
                        listener = curArr[i];
                        if (listener[2]) {
                            listener[1].call(trueObject, trueObject);
                        } else if (doesBubble || currentTarget === target) {
                            deffered.push(listener);
                        }
                    }

            if (target.nodeType === 13) {
                // for the ShadowDOMv2
                deffered.push([target]);
                currentTarget = target = currentTarget.host;
            }
        } while (keepGoing && (currentTarget = currentTarget.parentNode));

        while (
            (listener = deffered.pop()) &&
            !immediateStop &&
            (lastTarget === listener[3] || keepGoing)
        )
            console.log(trueObject)
        if (listener.length === 1) {
            // for the ShadowDOMv2
            target = listener[0];
        } else {
            lastTarget = currentTarget = listener[3];
            listener[1].call(trueObject, trueObject);
        }
    }
}
