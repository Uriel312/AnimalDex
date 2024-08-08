import styles from './input.module.css'

interface InputType {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'text' | 'search' | 'password' | 'email';
  label: string;
}

const Input = ({ onChange, label, type = 'text' }: InputType) => {
  return (
    <div className={styles.inputGroup}>
      <label > {label} </label>
      <input type={type} onInput={onChange} />
    </div>
  )
}

export default Input