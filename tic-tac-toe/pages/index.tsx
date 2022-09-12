import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Board from "../containers/Board";

const Home: NextPage = () => {
    return (
        <div>
            <Board />
        </div>
    );
};

export default Home;
