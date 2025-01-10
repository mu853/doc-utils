function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function create_newversion(dropdown, href, text){
    //追加のDrop Down選択肢を作成
    newversion = document.createElement("a");
    newversion.className = "dropdown-item";
    newversion.href = href;
    newversion.appendChild(document.createTextNode(text));
    dropdown.appendChild(newversion);
}

//Drop Downメニューを取得
dropdown = getElementByXpath("//div[@class='dropdown-menu' and @aria-labelledby='version-dropdown-btn']");
if(dropdown){
    current_url = window.location.href;
 
    //NSX 3.x系の場合は4.2のリンクを追加
    pattern = /\/nsxt-dc\/[0-9]-[0-9]\//;
    if(current_url.match(pattern)){
        create_newversion(dropdown, current_url.replace(pattern, "/vmware-nsx/4-2/"), "4.2 *");
        create_newversion(dropdown, current_url.replace(pattern, "/vmware-nsx/4-1/"), "4.1 *");
        create_newversion(dropdown, current_url.replace(pattern, "/vmware-nsx/4-0/"), "4.0 *");
    }

    //NSX 4.x系の場合は3.1のリンクを追加
    pattern = /\/vmware-nsx\/[0-9]-[0-9]\//;
    if(current_url.match(pattern)){
        create_newversion(dropdown, current_url.replace(pattern, "/nsxt-dc/3-1/"), "3.1 *");
    }
}

/*
//現在の表示言語を取得
spans = document.getElementById("localeDropDownMenuButton").getElementsByTagName("span");
current_locale = "";
for(let i = 0; i < spans.length; i++){
    if(spans[i].classList.contains("currentLocale")){
        current_locale = spans[i];
        break;
    }
}

//URLに合わせて表示言語を修正
if(current_locale){
    matches = window.location.href.match(/\/([a-w]+)\/VMware-NSX/);
    if(matches){
        current_locale.textContent = matches[1];
    }
}
*/
