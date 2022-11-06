import {ConnectButton} from 'web3uikit';


export default function Header2() {

   
    return (
        <div className='flex justify-between w-screen items-center  border-b-2 p-10 z-10'>
            <h1 className='text-xl font-medium'>Decentralized Lottery</h1>
            <ConnectButton moralisAuth={false}/>
        </div>
    )
}