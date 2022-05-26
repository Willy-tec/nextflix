import {MovieCardProps} from "../../types/pageProps";
import styles from "../../../styles/MovieCard.module.css";
import Image from "next/image";
export default function MovieCard({movie}: MovieCardProps): JSX.Element {
  const overview = movie.overview
    ? movie.overview.slice(0, 250) + "..."
    : "no description";
  return (
    <div className={styles.MovieCard}>
      <h3>{movie.title}</h3>
      <p>{overview}</p>
      {movie.backdrop_path !== null ? (
        <Image src={movie.backdrop_path} width={342} height={200} alt="" />
      ) : null}
    </div>
  );
}
