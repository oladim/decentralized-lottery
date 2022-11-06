import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Header2 from "../components/Header2";
import LotteryEnterance from "../components/LotteryEnterance";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Lottery APp</title>
        <meta name="description" content="Our Lottery App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Header /> */}
      <div className=" flex w-screen h-screen flex-col z-0">
        <Header2 />
        <LotteryEnterance />
      </div>
    </div>
  );
}
