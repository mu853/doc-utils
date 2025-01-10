function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function getElementsByXPath(path) {
    var aResult = new Array();
    var a = document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for(var i = 0; i < a.snapshotLength; i++){
        aResult.push(a.snapshotItem(i));
    }
    return aResult;
}

const links = document.createElement("ul");
const subtitles = getElementsByXPath("//h2");
for (let i = 0; i < subtitles.length; i++) {
    const element = subtitles[i];
    const anchorElement = element.getElementsByTagName('a')[0];

    let id = "";
    if (anchorElement) {
        id = anchorElement.id;
    } else {
        id = element.id;
    }

    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = '#' + id;
    link.textContent = element.textContent;
    listItem.setAttribute("style", "padding:0px; margin: 2px 2px 2px 2px; font-size:8pt; background-color:#EEEEFF");
    listItem.appendChild(link);
    links.appendChild(listItem);
}

const div = document.createElement("div");
div.appendChild(links);
div.setAttribute("style", "margin-left:10px;");

let tocContainer = getElementByXpath("//li[contains(@class, 'active-acc') and contains(@class, 'has-border')]");
if (tocContainer) {
    tocContainer.appendChild(div);
} else {
    //retry
    setTimeout(() => {
        tocContainer = getElementByXpath("//li[contains(@class, 'active-acc') and contains(@class, 'has-border')]");
        tocContainer.appendChild(div);
    }, 2000);
}
