
async function logsGroups(iframeDoc, waitForElm, editor1, editor2) {
    console.log('logsGroups');
    await waitForElm(iframeDoc, 'div[class= "awsui-util-action-stripe-group"]');
    //get the iframe's contentWindow's document's body
    var iframeBody = iframeDoc.body;
    //get the iframe's contentWindow's document's body's children
    var iframeBodyChildren = iframeBody.children;

    //boton para ver los JSON
    var getjsons = document.createElement('div');
    getjsons.className = 'awsui-button  awsui-button-variant-primary awsui-hover-child-icons';
    getjsons.id = 'getjsonsGroups';
    getjsons.innerHTML = `
        <span awsui-button-region="text"><span><span class="awsui-icon awsui-icon-size-normal awsui-icon-variant-normal">
            ${awsuiIconJSON}
        </span>
                `;
    //boton para buscar JSON
    iframeDoc.querySelector('div[class="awsui-util-action-stripe-group"]').appendChild(getjsons);
    //listen for clicks on the class closeModal
    iframeDoc.querySelectorAll('.closeModal').forEach(r => {
        r.addEventListener('click', function () { iframeDoc.querySelector('#modal-json').style.display = 'none'; })
    });

    //Funcion para cargar los JSON en el editor
    function cargarJsonViewGroups() {
        iframeDoc.querySelectorAll("div[class='logs__log-events-table__content']").forEach(r => {
            var tdValue = r.innerText;
            try {
                var json
                if (tdValue.includes("{") && tdValue.includes("}")) {
                    if (tdValue.includes("INFO EVENT:	")) {
                        if (tdValue.includes("\'") && RegExp('\'[a-zA-Z0-9-_:.]*\'').test(tdValue)) {
                            json = JSON.parse(tdValue.split("INFO EVENT:	")[1].replace(/"/g, "\\\"")
                                .replace(/([{,])(\s*)([A-Za-z0-9_\-]+?)\s*:/g, '$1"$3":').replace(/'/g, '"')
                                .replace(RegExp('\\[Object\\]', 'g'), '["ThisIsAnObject"]'))
                            //.replace(/([{,])(\s*)([A-Za-z0-9_\-]+?)\s*:/g, '$1"$3":'); //posible solucion
                        } else {
                            json = JSON.parse(tdValue.split("INFO EVENT:	")[1]);
                        }
                    } else if (tdValue.includes("INFO	") && RegExp('\'[a-zA-Z0-9-_:.]*\'').test(tdValue)) {
                        if (tdValue.includes("\'")) {
                            json = JSON.parse(tdValue.split("INFO	")[1].replace(/"/g, "\\\"")
                                .replace(/([{,])(\s*)([A-Za-z0-9_\-]+?)\s*:/g, '$1"$3":').replace(/'/g, '"')
                                .replace(RegExp('\\[Object\\]', 'g'), '["ThisIsAnObject"]'))
                        } else {
                            json = JSON.parse(tdValue.split("INFO	")[1]);
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
                    r.style.background = '#a22727';
                    r.style.color = 'white';
                    r.style.cursor = 'pointer';
                }
            } catch (e) {
                console.log('No es JSON');
            }
        });
    }
    //Escucha los clicks en el boton de cargar
    iframeDoc.querySelector("#getjsonsGroups").addEventListener("click", () => {
        cargarJsonViewGroups()
    }, false);
}
