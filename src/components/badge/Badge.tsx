import styles from './badge.module.css'

interface BadgeType {
  text: string;
  color?: string
}


const Badge = ({ text = '', color }: BadgeType) => {
  return (
    <span className={styles.badge} style={{ backgroundColor: color }}>
      {text}
    </span>
  )
}

export default Badge