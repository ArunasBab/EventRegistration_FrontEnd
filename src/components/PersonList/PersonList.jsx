import { memo } from "react";
import styles from "./PersonList.module.scss";
import PersonItem from "./PersonItem";

const PersonList = memo(({ persons = [], isLoading = false, error = null }) => {
  if (isLoading) {
    return <p className={styles.loading}>Kraunama...</p>;
  }

  if (error) {
    return <p className={styles.error}>Įvyko klaida: {error}</p>;
  }

  if (!persons || persons.length === 0) {
    return <p className={styles.noPersons}>Nėra registruotų vartotojų</p>;
  }

  return (
    <div className={styles.personList}>
      <h2>Vartotojų sąrašas</h2>
      <table>
        <thead>
          <tr>
            <th>Vardas ir pavardė</th>
            <th>El. paštas</th>
            <th>Gimimo metai</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <PersonItem key={person._id} person={person} />
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default PersonList;
