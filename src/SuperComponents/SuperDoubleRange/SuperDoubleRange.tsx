import s from '../c7-SuperRange/SuperRange.module.css'
import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>


type SuperDoubleRangePropsType = DefaultInputPropsType & {
    onChangeRange?: (value: number) => void
    onChangeRange2?: (value: number) => void
    minValueChanger: string | number
    maxValueChanger: string | number
    numberContentMin: string | number
    numberContentMax: string | number
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeRange, onChangeRange2,
        className,
        maxValueChanger, minValueChanger, numberContentMin, numberContentMax,
        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e) // сохраняем старую функциональность

        onChangeRange && onChangeRange(+e.currentTarget.value)
    }

    const onChangeCallback2 = (e: ChangeEvent<HTMLInputElement>) => {

        onChange && onChange(e) // сохраняем старую функциональность

        onChangeRange2 && onChangeRange2(+e.currentTarget.value)
    }

    const finalRangeClassName = `${s.range} ${className ? className : ''}`

    return (
        <>
            <div className={s.numberValue}>
                <div className={s.minValue}>{numberContentMin}</div>
                <div className={s.maxValue}>{numberContentMax}</div>
            </div>
            <div className={s.slider}>
                <div className={s.progress}></div>
            </div>
            <span className={s.range_input}>
            <input
                type={'range'}
                onChange={onChangeCallback}
                className={finalRangeClassName}
                min={'0'} max={'100'}
                value={minValueChanger}
                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />
            <input
                type={'range'}
                onChange={onChangeCallback2}
                className={finalRangeClassName}
                value={maxValueChanger}
                min={'0'} max={'100'}
                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />
        </span>
        </>
    )
}


export default SuperDoubleRange