import React, {useState} from 'react';
import {useTypedDispatch} from "../../../bll/store";
import {setMaxCardsCountAC, setMinCardsCountAC} from "../../../bll/packs-filter-settings-reducer";
import SuperDoubleRange from "../../../SuperComponents/SuperDoubleRange/SuperDoubleRange";

export const DoubleRange = () => {

    const dispatch = useTypedDispatch()

    const [valueMin, setValueMin] = useState(0)
    const [valueMax, setValueMax] = useState(103)
    const minValueChanger = (valueMin <= valueMax) ? valueMin : 50
    const numberContentMin = (valueMin <= valueMax) ? valueMin : 'invalid values'
    const maxValueChanger = (valueMin <= valueMax) ? valueMax : 50
    const numberContentMax = (valueMin <= valueMax) ? valueMax : ''

    const onMouseUpHandler = () => {
        dispatch(setMinCardsCountAC(valueMin))
        dispatch(setMaxCardsCountAC(valueMax))
    }
    return (

        <div>
            <SuperDoubleRange onChangeRange={setValueMin}
                              onChangeRange2={setValueMax}
                              minValueChanger={minValueChanger}
                              maxValueChanger={maxValueChanger}
                              numberContentMin={numberContentMin}
                              numberContentMax={numberContentMax}
                              onMouseUp={onMouseUpHandler}
            />
        </div>
    );
};

