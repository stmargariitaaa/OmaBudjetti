import styles from './buttons.module.css'

function Button(props) {
  return (
    <button type='button' className={styles.button} {...props} />
  )
}

export { Button as default, Button }
