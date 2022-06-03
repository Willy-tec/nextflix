import {MovieCardProps} from "../../types/pageProps";
import styles from "../../styles/MovieCard.module.css";
import Image from "next/image";
import {useState} from "react";

export default function MovieCard({
  movie,
  openModal,
}: MovieCardProps): JSX.Element {
  const overview = movie.overview
    ? movie.overview.length > 253
      ? movie.overview.slice(0, 250) + "..."
      : movie.overview
    : "no description";
  const [isModalOpen, toggleModalView] = useState(false);
  const hasTrailer = "trailer_key" in movie && movie.trailer_key !== "error";
  const YOUTUBE_URL = `https://www.youtube.com/watch?v=${movie.trailer_key}`;
  return (
    <article className={styles.MovieCard} onClick={() => openModal(movie)}>
      <h3>{movie.title}</h3>
      <p>{overview}</p>
      {movie.backdrop_path !== null && (
        <Image
          src={movie.backdrop_path}
          width={342}
          height={192}
          alt={movie.original_title}
        />
      )}
      {hasTrailer ? (
        <a href={YOUTUBE_URL} target="_blank" rel="noreferrer">
          {" "}
          Voir le trailer sur youtube
        </a>
      ) : (
        hasTrailer
      )}
    </article>
  );
}
