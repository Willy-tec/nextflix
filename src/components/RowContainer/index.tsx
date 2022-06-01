import styles from "../../../styles/RowContainer.module.css";
import {useState} from "react";

import {RowContainerProps} from "../../types/pageProps";

export default function RowContainer({
  title,
  children,
  render,
}: RowContainerProps): JSX.Element {
  const [index, setIndex] = useState(0);
  const MOVIE_PER_ROW = 5;
  const NB_PAGE = Math.ceil(children.length / MOVIE_PER_ROW);
  const page = Math.floor(index / MOVIE_PER_ROW) + 1;
  return (
    <section className={styles.RowContainer}>
      <h2>{title}</h2>
      <p>
        {index + 1} à{" "}
        {index < children.length - MOVIE_PER_ROW
          ? index + MOVIE_PER_ROW
          : children.length}{" "}
        sur {children.length} films
      </p>
      <p>
        page {page} / {NB_PAGE}
      </p>
      <button
        onClick={() =>
          setIndex((state) => {
            if (state > 0 + MOVIE_PER_ROW) return state - MOVIE_PER_ROW;
            else return 0;
          })
        }>
        Left
      </button>
      <div>
        {children
          .slice(index, index + MOVIE_PER_ROW)
          .map((el, id) => render(el, id))}
      </div>
      <button
        onClick={() =>
          setIndex((state) => {
            if (state < children.length - MOVIE_PER_ROW)
              return state + MOVIE_PER_ROW;
            else return state;
          })
        }>
        Right
      </button>
    </section>
  );
}
