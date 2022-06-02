import React, {ChangeEvent} from 'react';
import s from './Input.module.css'

type InputPropsType = {
    placeholder?: string
    value: string
    onChange?: (newValue: string) => void
    disabled?: boolean
    error?: string
}

export const Input = React.memo(function (props: InputPropsType) {
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange && props.onChange(e.currentTarget.value)
    }

    return (
        <div className={s.editableSpan}>
            <span className={s.inputName}>{props.placeholder}</span>
            <input className={s.input} value={props.value} onChange={changeTitle} disabled={props.disabled}/>
        </div>)
});