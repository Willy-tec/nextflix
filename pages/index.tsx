import type {NextPage, NextPageContext} from "next";
import Head from "next/head";
import {createRef, SyntheticEvent, useEffect, useRef, useState} from "react";
import MovieCard from "../src/components/MovieCard";
import RowContainer from "../src/components/RowContainer";

import {fetchGenre, fetchHomeSample} from "../src/script/fetching";
import {genres, movie, sampleData} from "../src/types/TMDB";
import styles from "../src/styles/Home.module.css";
import ModalMovie from "../src/components/ModalMovie";

export async function getStaticProps() {
  const data = await fetchHomeSample();
  const genres = await fetchGenre();
  return {
    props: {data, genres},
  };
}
interface indexProps {
  data: sampleData[];
  genres: genres[];
}

const Home: NextPage<indexProps> = ({data, genres}) => {
  const [width, setWidth] = useState(0);
  const [isModalOpen, toggleModalView] = useState(false);
  const [modalMovie, setModalMovie] = useState<movie>({} as movie);
  const setSizeByEvent = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    setSizeByEvent();
    window.addEventListener("resize", setSizeByEvent);
    return () => window.removeEventListener("resize", setSizeByEvent);
  }, []);

  const openModal = (movie: movie) => {
    setModalMovie(movie);
    toggleModalView(true);
  };
  const closeModal = () => {
    toggleModalView(false);
  };
  const verifyModal = (e: SyntheticEvent) => {
    if (isModalOpen) closeModal();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>NextFlix</title>
        <meta
          name="description"
          content="Where you can find what you want to watch"
        />
        <meta property="og:title" content="Title of the article" />
        <meta property="og:image" content="//media.example.com/ 1234567.jpg" />
        <meta
          property="og:description"
          content="Description that will show in the preview"
        />
        <meta property="og:url" content="https://nextflix-navy.vercel.app/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} onClick={verifyModal}>
        {isModalOpen && (
          <ModalMovie
            movie={modalMovie}
            closeModal={closeModal}
            genres={genres}
          />
        )}

        <h1 className={styles.title}>Welcome !</h1>
        {data.map((row, rowidx) => (
          <RowContainer
            key={rowidx}
            title={row.genre.name}
            width={width}
            render={(el: movie, idx: number) => (
              <MovieCard movie={el} key={idx} openModal={openModal} />
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
          Data powered by The Movie Database
        </a>
      </footer>
    </div>
  );
};

export default Home;

