import styles from "../assets/profile.module.sass";

export default function Contact({ contact }) {
  return (
    <div className={styles.profileCard}>
      <img className={styles.avatar} src={contact.avatar} alt="Avatar" />
      <div className={styles.userInfo}>
        <h2 className={styles.nickname}>{contact.first}</h2>
        <p className={styles.description}>{contact.notes}</p>
        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              @{contact.twitter}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
