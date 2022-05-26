import type {NextPage, NextPageContext} from "next";
import Head from "next/head";
import Image from "next/image";
import MovieCard from "../src/components/MovieCard";
import RowContainer from "../src/components/RowContainer";
import {
  fetchDiscover,
  fetchGenre,
  fetchHomeSample,
} from "../src/script/fetching";
import {genres, movie, sampleData, shortMovie} from "../src/types/TMDB";
import styles from "../styles/Home.module.css";

export async function getStaticProps() {
  const data = await fetchHomeSample();
  return {
    props: {data},
  };
}
interface indexProps {
  data: sampleData[];
  discovery: object;
}
const Home: NextPage<indexProps> = ({data, discovery}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>NextFlix</title>
        <meta
          name="description"
          content="Where you can find what you want to watch"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome !</h1>

        {data.map((row, rowidx) => (
          <RowContainer
            key={rowidx}
            title={row.genre.name}
            render={(el: movie, idx: number) => (
              <MovieCard movie={el} key={idx} />
            )}>
            {row.results}
          </RowContainer>
        ))}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer">
          Powered by The Movie Database
        </a>
      </footer>
    </div>
  );
};

export default Home;

