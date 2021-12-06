chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.url) {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
            const tab = tabs[0];
            const matches = tab?.url?.match(/0x[a-fA-F0-9]{40}/g) || [];
            if(matches.length > 0){
                const part = matches[0];
                console.log(part);
                const url = `https://api.opensea.io/api/v1/asset_contract/${part}`;

                fetch(url).then(function(response) {
                    return response.json();
                }).then(function(data) {
                    const name = data.collection.name;
                    const status = data.collection.safelist_request_status;
                    if(status === 'verified'){
                        alert(`${name} is verified.`)
                    }
                    else{
                        alert(`Be careful ${name} is not verified.`)
                    }
                }).catch(function(err) {
                    console.log(err);
                });
            }
        });  
    }
}
);


