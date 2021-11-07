import { Button } from "@mui/material";

export function AutoSearch({ inputId, set }: { inputId: string, set: any }) {

    const handleSearch = () => {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
            const tab = tabs[0];
            const matches = tab?.url?.match(/0x[a-fA-F0-9]{40}/g) || [];
            if(matches.length > 0){
                const part = matches[0];
                let input = document.getElementById(inputId) as HTMLInputElement;
                if(input != null){
                    input.value = part;
                    set(part);
                }
            }

        });
    };
    
    

    return (<Button onClick={handleSearch}>Auto search</Button>);
}