import type { InputHTMLAttributes } from 'react'
import './Input.css'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  id: string
}

function Input({ label, id, className = '', ...props }: InputProps) {
  const classes = ['input-field__input', className].filter(Boolean).join(' ')

  return (
    <div className="input-field">
      <label className="input-field__label" htmlFor={id}>
        {label}
      </label>
      <input id={id} className={classes} {...props} />
    </div>
  )
}

export default Input
