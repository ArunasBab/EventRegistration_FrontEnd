import styles from "./UI.module.scss";

const Button = ({
  children,
  type = "button",
  onClick,
  small = false,
  secondary = false,
  danger = false,
}) => {
  const buttonClasses = [
    styles.button,
    small ? styles.small : "",
    secondary ? styles.secondary : "",
    danger ? styles.danger : "",
  ].join(" ");

  return (
    <button type={type} className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
