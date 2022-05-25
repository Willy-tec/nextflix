import styles from "../../../styles/RowContainer.module.css";

import {RowContainerProps} from "../../types/pageProps";

export default function RowContainer({
  title,
  children,
  render,
}: RowContainerProps): JSX.Element {
  return (
    <section className={styles.RowContainer}>
      <h2>{title}</h2>
      <div>{children.map((el, id) => render(el, id))}</div>
    </section>
  );
}
