import styles from "../../styles/RowContainer.module.css";
import {useState} from "react";

import {RowContainerProps} from "../../types/pageProps";

export default function RowContainer({
  title,
  children,
  render,
  width,
}: RowContainerProps): JSX.Element {
  const [index, setIndex] = useState(0);
  const VIDEO_WIDTH = 342;
  const MOVIE_PER_ROW =
    width === 0 ? 5 : Math.floor((width - 50) / VIDEO_WIDTH) || 1;
  const INDEX_IN_LAST_PAGE = index >= children.length - MOVIE_PER_ROW;

  if (index > children.length - MOVIE_PER_ROW && index >= MOVIE_PER_ROW)
    setIndex(children.length - MOVIE_PER_ROW);

  return (
    <section className={styles.RowContainer}>
      <h2>{title}</h2>
      <p>
        {index + 1} à{" "}
        {!INDEX_IN_LAST_PAGE ? index + MOVIE_PER_ROW : children.length} sur{" "}
        {children.length} films
      </p>
      <div>
        {index > 0 ? (
          <button
            className={styles.arrow_left}
            onClick={() =>
              setIndex((state) => {
                if (state > 0 + MOVIE_PER_ROW) return state - MOVIE_PER_ROW;
                else return 0;
              })
            }>
            &larr;
          </button>
        ) : null}

        {children
          .slice(index, index + MOVIE_PER_ROW)
          .map((el, id) => render(el, id))}

        {!INDEX_IN_LAST_PAGE ? (
          <button
            className={styles.arrow_right}
            onClick={() =>
              setIndex((state) => {
                if (state < children.length - MOVIE_PER_ROW)
                  return state + MOVIE_PER_ROW;
                else return state;
              })
            }>
            &rarr;
          </button>
        ) : null}
      </div>
    </section>
  );
}
