const awsuiIconURL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" focusable="false" aria-hidden="true">	<path d="M16.469,8.924l-2.414,2.413c-0.156,0.156-0.408,0.156-0.564,0c-0.156-0.155-0.156-0.408,0-0.563l2.414-2.414c1.175-1.175,1.175-3.087,0-4.262c-0.57-0.569-1.326-0.883-2.132-0.883s-1.562,0.313-2.132,0.883L9.227,6.511c-1.175,1.175-1.175,3.087,0,4.263c0.288,0.288,0.624,0.511,0.997,0.662c0.204,0.083,0.303,0.315,0.22,0.52c-0.171,0.422-0.643,0.17-0.52,0.22c-0.473-0.191-0.898-0.474-1.262-0.838c-1.487-1.485-1.487-3.904,0-5.391l2.414-2.413c0.72-0.72,1.678-1.117,2.696-1.117s1.976,0.396,2.696,1.117C17.955,5.02,17.955,7.438,16.469,8.924 M10.076,7.825c-0.205-0.083-0.437,0.016-0.52,0.22c-0.083,0.205,0.016,0.437,0.22,0.52c0.374,0.151,0.709,0.374,0.997,0.662c1.176,1.176,1.176,3.088,0,4.263l-2.414,2.413c-0.569,0.569-1.326,0.883-2.131,0.883s-1.562-0.313-2.132-0.883c-1.175-1.175-1.175-3.087,0-4.262L6.51,9.227c0.156-0.155,0.156-0.408,0-0.564c-0.156-0.156-0.408-0.156-0.564,0l-2.414,2.414c-1.487,1.485-1.487,3.904,0,5.391c0.72,0.72,1.678,1.116,2.696,1.116s1.976-0.396,2.696-1.116l2.414-2.413c1.487-1.486,1.487-3.905,0-5.392C10.974,8.298,10.55,8.017,10.076,7.825"></path></svg>`;
console.log('content.js loaded');
$(function () {
	console.log('content.js loaded');
	var doc = document;
	function waitForElm(doc, selector) {
		return new Promise(resolve => {
			if (doc.querySelector(selector)) {
				return resolve(doc.querySelector(selector));
			}
			const observer = new MutationObserver(mutations => {
				if (doc.querySelector(selector)) {
					resolve(doc.querySelector(selector));
					observer.disconnect();
				}
			});
			observer.observe(doc.body, {
				childList: true,
				subtree: true
			});
		});
	}
	waitForElm(doc, '#microConsole-Logs').then(async (elm) => {
		//search in window the iframe with the id "microConsole-Logs"
		var iframe = document.querySelector('#microConsole-Logs');
		//get the iframe's contentDocument
		var iframeDoc = iframe.contentDocument;
		//get the iframe's contentWindow
		var iframeWin = iframe.contentWindow;
		//get the iframe's contentWindow's document
		var iframeDoc = iframeWin.document;
		await waitForElm(iframeDoc, "#scroll-query-button > button");
		//get the iframe's contentWindow's document's body
		var iframeBody = iframeDoc.body;
		//get the iframe's contentWindow's document's body's children
		var iframeBodyChildren = iframeBody.children;

		console.log(iframeBody);

		var div = document.createElement('div');
		div.className = 'panel-menu-item is-not-selected';
		div.id = 'geturls';
		div.innerHTML = `
			<awsui-icon initialized="true">
				<span class="awsui-icon awsui-icon-size-normal awsui-icon-variant-normal">
					${awsuiIconURL}
				</span>
			</awsui-icon>
			<p>Get URL's</p>
					`;
		iframeDoc.querySelector("#logs-micro-console__root > div > div > div > div > div.panel-menu").appendChild(div);

		function cargarURLS() {
			console.log("cargarURLS");
			iframeDoc.querySelectorAll("div[class='logs-insights-expanded-row']>table>tbody>tr").forEach(r => {
				var execution_arn
				var urlLog
				var logStream
				var tdTitle = r.children[0].innerText;
				var tdValue = r.children[1].innerText;
				var tdValueHTML = r.children[1];
				//regex to get the url StateFunction
				if (RegExp('^arn:aws:states:[a-zA-Z0-9-_]{1,}:[0-9]{12}:execution:[a-zA-Z0-9-_]{1,}:[a-zA-Z0-9-_]{1,}').test(tdValue) && tdTitle.includes("execution_arn")) {
					execution_arn = 'https://us-east-1.console.aws.amazon.com/states/home?region=us-east-1#/executions/details/' + tdValue;
					console.log(tdValueHTML.innerHTML = '<a href="' + execution_arn + '" target="_blank">' + tdValue + '</a>');
				};
				//regex to get the url lambda
				if (RegExp('\d*:\/aws\/[a-zA-Z0-9-_]*\/[a-zA-Z0-9-_]*').test(tdValue) && tdTitle.includes("@log")) {
					textLog = tdValue.replace(/\d*:/, '').replaceAll('/', '$252F');
					urlLog = 'https://us-east-1.console.aws.amazon.com/cloudwatch/home?region=us-east-1#logsV2:log-groups/log-group/' + textLog;
					console.log(tdValueHTML.innerHTML = '<a href="' + urlLog + '" target="_blank">' + tdValue + '</a>');
					//recorrer todos los tdValueHTML para obtener el logStream
					var tdValueParent
					var parenNode = r.parentNode.children.length;
					for (var i = 0; i < parenNode; i++) {
						if (r.parentNode.children[i].innerText.includes("@logStream")) {
							tdValueParent = r.parentNode.children[i].children[1].innerText;
							textLogStream = tdValueParent.replaceAll('/', '$252F');
							logStream = 'https://us-east-1.console.aws.amazon.com/cloudwatch/home?region=us-east-1#logsV2:log-groups/log-group/' + textLog + '/log-events/' + textLogStream;
							console.log(r.parentNode.children[i].children[1].innerHTML = '<a href="' + logStream + '" target="_blank">' + tdValueParent + '</a>');
						}
					}
				};
			});
		}

		iframeDoc.querySelector("#geturls").addEventListener("click", () => {
			cargarURLS()
		}, false);

	});

});
