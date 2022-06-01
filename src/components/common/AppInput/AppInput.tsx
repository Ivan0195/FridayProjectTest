import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent } from 'react'
import styles from './AppInput.module.css'
import cn from 'classnames';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperInputTextPropsType = DefaultInputPropsType & {
  label?: string
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: string
  spanClassName?: string
  type?: 'text' | 'password',
  startAddition?: JSX.Element
  endAddition?: JSX.Element
}

const AppInput: React.FC<SuperInputTextPropsType> = (
  {
    label,
    type,
    onChange,
    onChangeText,
    onKeyPress,
    onEnter,
    error,
    className,
    spanClassName,
    name,
    startAddition,
    endAddition,
    ...restProps
  }
) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange
    && onChange(e)

    onChangeText && onChangeText(e.currentTarget.value)
  }
  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyPress && onKeyPress(e);

    onEnter
    && e.key === 'Enter'
    && onEnter()
  }

  return (
    <div className={ cn(styles.field, className) }>
      { label && <label htmlFor={ name }>{ label }</label> }
      <div className={ cn(styles.fieldInputWrapper) }>
        { startAddition }
        <input
          className={cn(styles.fieldInput)}
          id={ name }
          type={ type || 'text' }
          onChange={ onChangeCallback }
          onKeyPress={ onKeyPressCallback }
          { ...restProps }
        />
        { endAddition }
      </div>
      { error && <span className={ styles.fieldError }>{ error }</span> }
    </div>
  )
}

export default AppInput
