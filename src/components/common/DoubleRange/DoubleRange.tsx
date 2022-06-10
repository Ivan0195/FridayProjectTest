import React, {useState} from 'react';
import {useAppSelector, useTypedDispatch} from "../../../bll/store";
import {setMaxCardsCountAC, setMinCardsCountAC} from "../../../bll/packs-filter-settings-reducer";
import SuperDoubleRange from "../../../SuperComponents/SuperDoubleRange/SuperDoubleRange";
import {notificationHandler} from "../../../utils/errorUtils";

export const DoubleRange = () => {

    const dispatch = useTypedDispatch()

    const loadingStatus = useAppSelector<boolean>(state => state.cardsPack.isLoading)
    const minCount = useAppSelector<number>(state => state.packsFilterSettings.min)
    const maxCount = useAppSelector<number>(state => state.packsFilterSettings.max)

    const [valueMin, setValueMin] = useState(minCount)
    const [valueMax, setValueMax] = useState(maxCount)
    const minValueChanger = (valueMin <= valueMax) ? valueMin : 50
    const numberContentMin = (valueMin <= valueMax) ? valueMin : 'invalid values'
    const maxValueChanger = (valueMin <= valueMax) ? valueMax : 50
    const numberContentMax = (valueMin <= valueMax) ? valueMax : ''

    const dispatchValues = () => {
        dispatch(setMinCardsCountAC(valueMin))
        dispatch(setMaxCardsCountAC(valueMax))
    }

    const onMouseUpHandler = () => {
        loadingStatus
            ? notificationHandler('wait for previous operation')
            : dispatchValues()
    }
    return (

        <div>
            <SuperDoubleRange onChangeRange={loadingStatus ? ()=>{} : setValueMin}
                              onChangeRange2={loadingStatus ? ()=>{} : setValueMax}
                              minValueChanger={minValueChanger}
                              maxValueChanger={maxValueChanger}
                              numberContentMin={numberContentMin}
                              numberContentMax={numberContentMax}
                              onMouseUp={onMouseUpHandler}
            />
        </div>
    );
};

