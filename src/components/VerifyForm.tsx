import { Button, Input, InputLabel, OutlinedInput } from "@mui/material";
import { useState } from "react";
import { tw } from "twind";
import axios from "redaxios";


export function VerifyForm() {
    const [contractAddress, setContractAddress] = useState<string>('');

    const handleInputChange = (e: any) => {
        const target = e.target as HTMLInputElement;
        setContractAddress(target.value)
    }

    const handleClick = (e: any) => {
        // console.log(contractAddress);
        const url = `https://api.opensea.io/api/v1/asset_contract/${contractAddress}`;
        axios.get(url).then((data:any) => {
            const name = data.data.collection.name;
            const status = data.data.collection.safelist_request_status;
            if(status === 'verified'){
                alert(`${name} is verified.`)
            }
            else{
                alert(`Be careful ${name} is not verified.`)

            }
            console.log(name,status);
        }).catch((err: any) => {
            alert('This is not a NFT contract.')
            console.log(err);
        });
    }

    return(
        <div className={tw('h-full grid grid-cols-1 items-center justify-items-center')}>
            <div className={tw('m-auto text-xl')}>Enter a contract address</div>
            <Input onChange={handleInputChange} id='input' className={tw('m-auto')} placeholder="Contract address" />
            <Button onClick={handleClick} className={tw('m-auto')} variant="contained">Verify</Button>
        </div>
    )
}