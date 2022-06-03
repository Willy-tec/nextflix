import Image from "next/image";
import {genres, movie} from "../../types/TMDB";
import styles from "../../styles/ModalMovie.module.css";

interface ModalMovieProps {
  movie: movie;
  genres: genres[];
  closeModal: () => void;
}

export default function ModalMovie({
  movie,
  closeModal,
  genres,
}: ModalMovieProps): JSX.Element {
  return (
    <>
      <article className={styles.modal}>
        {/* <button onClick={closeModal}>X</button> */}
        <h2>{movie.title}</h2>
        {movie.tagline && movie.tagline.length > 0 && <h3>{movie.tagline}</h3>}
        {movie.backdrop_path !== null && (
          <Image
            src={movie.backdrop_path}
            width={500}
            height={280}
            alt={movie.original_title}
          />
        )}
        <p>{movie.overview}</p>
        <div>
          {movie.genre_ids.map((el, idx) => {
            return (
              <div key={idx} className={styles.tag}>
                {genres.find((genre) => genre.id === el)?.name}
              </div>
            );
          })}
        </div>
        <div>
          <p>
            Note moyenne : <span>{movie.vote_average}</span>
          </p>
          <p>
            Nombre de vote: <span>{movie.vote_count}</span>
          </p>
        </div>
      </article>
    </>
  );
}
