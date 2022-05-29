function createElements(iframeDoc) {
    //Modal para ver los JSON
    var modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'modal-json';
    modal.style.display = 'none';
    modal.innerHTML = `
        <awsui-modal initialized="true">
            <div class="awsui-modal-tabtrap" tabindex="0"></div>
            <div class="awsui-modal-container awsui-modal-expandtofit " role="dialog" aria-modal="true"
                aria-labelledby="awsui-modal-0" >
                <div class="awsui-modal-dialog awsui-modal-expandtofit awsui-modal-size-max" tabindex="-1" style="max-width: calc(100vw - 3rem) !important;">
                    <div class="awsui-modal-content awsui-util-container">
                        <div class="awsui-modal-header awsui-util-container-header">
                            <div class="awsui-modal-title" id="awsui-modal-0">
                                <div awsui-modal-region="header"><span>JSON Viewer</span></div>
                            </div>
                            <awsui-button class="awsui-modal-dismiss-control closeModal" initialized="true"><button
                                    class="awsui-button awsui-button-no-text awsui-button-variant-icon awsui-hover-child-icons closeModal"
                                    type="button" override-focus="">
                                    <awsui-icon class="awsui-button-icon awsui-button-icon-left" initialized="true"><span
                                            class="awsui-icon awsui-icon-size-normal awsui-icon-variant-normal"><svg
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" focusable="false"
                                                aria-hidden="true">
                                                <path d="M2 2l12 12M14 2L2 14"></path>
                                            </svg></span></awsui-icon>
                                </button></awsui-button>
                        </div>
                        <div class="awsui-modal-body awsui-modal-expandtofit">
                            <div awsui-modal-region="content" id="contentJSON">
                            <div id="jsoneditor1"></div>
                            <div id="jsoneditor2"></div>
                                
                            </div>
                        </div>
                        <div class="awsui-modal-footer awsui-util-container-footer" awsui-modal-region="footer"><span><span
                                    class="flex flex-end">
                                    <awsui-button initialized="true" class="closeModal"><button
                                            class="awsui-button awsui-button-variant-link awsui-hover-child-icons closeModal" type="submit"
                                            override-focus="">
                                            <span awsui-button-region="text" class="closeModal">
                                                <span  class="closeModal">Cerrar</span>
                                            </span>
                                        </button>
                                    </awsui-button>
                                </span></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="awsui-modal-overlay closeModal"></div>
            <div class="awsui-modal-tabtrap closeModal" tabindex="0"></div>
        </awsui-modal>
        `;
    //CSS para el editor de JSON
    var linkjsoneditor = document.createElement('link');
    linkjsoneditor.rel = 'stylesheet';
    linkjsoneditor.href = 'https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/9.7.4/jsoneditor.min.css';
    //JS para el editor de JSON
    var scriptjsoneditor = document.createElement('script');
    scriptjsoneditor.src = 'https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/9.7.4/jsoneditor.min.js';
    //CSS para el editor de JSON
    var stylejsoneditor = document.createElement('style');
    stylejsoneditor.innerHTML = `
								#jsoneditor1,
								#jsoneditor2 {
								width: 49%;
								height: 500px;
								margin-right: 10px;
								display: inline-block;
								}`;
    //inscrución de los elementos en el DOM del iframe
    iframeDoc.head.appendChild(stylejsoneditor);
    iframeDoc.head.appendChild(linkjsoneditor);
    iframeDoc.head.appendChild(linkjsoneditor);
    iframeDoc.head.appendChild(scriptjsoneditor);
    iframeDoc.querySelector('main[class= "logs__main"]').appendChild(modal);
    //listen for clicks on the class closeModal
    iframeDoc.querySelectorAll('.closeModal').forEach(r => {
        r.addEventListener('click', function () { iframeDoc.querySelector('#modal-json').style.display = 'none'; })
    });
    // create the editor
    const editor1 = new JSONEditor(iframeDoc.getElementById('jsoneditor1'), {
        mode: 'code',
        modes: ['code', 'form', 'text', 'tree', 'view', 'preview'], // allowed modes
        onChangeText: function (jsonString) {
            console.log(jsonString);
            editor2.updateText(jsonString)
        }
    })
    // create editor 2
    const editor2 = new JSONEditor(iframeDoc.getElementById('jsoneditor2'), {
        mode: 'tree',
        modes: ['code', 'form', 'text', 'tree', 'view', 'preview'], // allowed modes
        onChangeText: function (jsonString) {
            editor1.updateText(jsonString)
        }
    })

    return {
        editor1,
        editor2
    }
}