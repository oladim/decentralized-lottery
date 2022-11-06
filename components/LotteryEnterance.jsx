import {useWeb3Contract} from 'react-moralis'
import {contractAddresses, abi} from '../constants';
import {useMoralis} from 'react-moralis';
import {useEffect, useState} from 'react';
import {ethers} from 'ethers';
import {useNotification} from 'web3uikit';
import {Bell} from '@web3uikit/icons';
import Button from '@mui/material/Button';

export default function LotteryEnterance(){
const dispatch = useNotification();

    const [entranceFee, setEntranceFee] = useState('0')
    const [numOfPlayers, setNumOfPlayers] = useState('0')
    const [recentWinner, setRecentWinner] = useState('')

    const {chainId: chainIdHex, isWeb3Enabled} = useMoralis(); //moralis knows the chainid because all compnents are wrapped in the MoralisProvider inthe App.js
    console.log(parseInt(chainIdHex));
    const chainId = parseInt(chainIdHex);
    console.log('contractaddresses', contractAddresses)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const { data, error, runContractFunction: enterRaffle, isFetching, isLoading } =
    useWeb3Contract({
      abi: abi,
      contractAddress: raffleAddress,
      functionName: 'enterRaffle',
      params: {},
      msgValue: entranceFee
    });

    console.log("data is", data)

    const {runContractFunction: getEntranceFee} =
    useWeb3Contract({
      abi: abi,
      contractAddress: raffleAddress,
      functionName: 'getEntranceFee',
      params: {}
    });

    const {runContractFunction: getNumberOfPlayers} =
    useWeb3Contract({
      abi: abi,
      contractAddress: raffleAddress,
      functionName: 'getNumberOfPlayers',
      params: {}
    });

    const {runContractFunction: getRecentWinner} =
    useWeb3Contract({
      abi: abi,
      contractAddress: raffleAddress,
      functionName: 'getRecentWinner',
      params: {}
    });

    async function updateUI() {
        const fee = (await getEntranceFee()).toString()
        const numPlayer = (await getNumberOfPlayers()).toString()
        const recent = (await getRecentWinner()).toString()
        setEntranceFee(fee)
        setNumOfPlayers(numPlayer)
       setRecentWinner(recent)
   }

    useEffect(()=>{
        if(isWeb3Enabled){
           updateUI()
        }
    }, [isWeb3Enabled, entranceFee])
const handleSuccess = async (tx) => {
    await tx.wait(1);
    handleNewNotification(tx);
    updateUI()
}



const handleNewNotification = function (){
    dispatch({
        type: 'success',
        message: "Transaction Complete!",
        title: "Tx Notification",
        position: "topR",
        icon: <Bell fontSize='50px' color='green'/>,
    })
}

//onSuccess is only checking if the transaction is successfully sent to metamask and not if the trasanction is added to the chain
    return <div className='ml-10 mt-10'>
        <h1 className='text-6xl'>Enter Raffle</h1>
        {raffleAddress ? <div>
            <p className='mt-10 text-lg font-sans mb-10 italic'>Entrance Fee: {ethers.utils.formatUnits(entranceFee, 'ether')} ETH </p>
            <Button variant="contained" disabled={isLoading || isFetching} className='border-2 w-[200px] h-16' onClick={async()=>await enterRaffle({
                onSuccess: handleSuccess,
                onError: (error) => console.log(error)
            })}>
              {isLoading || isFetching ? <div><p className='animate-spin spinner-border h-8 w-8 border-b-2 rounded-full border-red-700'></p></div> : <div>Enter Raffle</div>}
            </Button>
            
            <p className='mt-10'>No of Players: {numOfPlayers}</p>
            Recent Winner: {recentWinner}
        </div> :
        <div>Raffle Address Not Detected</div>
        }
        
    </div>
}