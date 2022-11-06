// import {useMoralis} from 'react-moralis';
// import {useEffect} from 'react';

// export default function(){

 

//  const {enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading} = useMoralis();

//  useEffect(()=>{
//     Moralis.onAccountChanged((account)=>{
//         if(account == null){
//             window.localStorage.removeItem("connected")
//             deactivateWeb3()
//         }
//     })
//  }, [])

//  useEffect(()=>{
//  if(isWeb3Enabled) return
//    if(typeof window !== undefined){
//     if(window.localStorage.getItem("connected")){
//         enableWeb3()
//     }
//    }
// },[isWeb3Enabled])

//     return (<div>
//        {account ? (<div>Connected to: {account.slice(0, 6)}...{account.slice(-4)}</div>) : (<button 
//        onClick={async () => {await enableWeb3(); if(typeof window !== undefined){
//         window.localStorage.setItem("connected", "injected")}
//        }}
//        disabled={isWeb3EnableLoading}
//        >Connect</button>) }
//        </div>
//     )
// }