import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <h1>404 - Puslapis nerastas</h1>
      <p>Atsiprašome, bet puslapis, kurio ieškote, neegzistuoja.</p>
    </div>
  );
};

export default NotFoundPage;
