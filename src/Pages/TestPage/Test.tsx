import React from 'react';
import SuperButton from "../../SuperComponents/SuperButton/SuperButton";
import SuperCheckbox from "../../SuperComponents/SuperCheckbox/SuperCheckbox";
import SuperSelect from "../../SuperComponents/SuperSelect/SuperSelect";
import SuperRadio from "../../SuperComponents/SuperRadio/SuperRadio";
import SuperRange from "../../SuperComponents/SuperRange/SuperRange";
import SuperDoubleRange from "../../SuperComponents/SuperDoubleRange/SuperDoubleRange";

const Test = () => {
    return (
        <div>
            <SuperButton/>
            <SuperCheckbox/>
            <SuperSelect/>
            <SuperRadio/>
            <SuperRange minValueChanger={0}/>
            <SuperDoubleRange minValueChanger={1} maxValueChanger={100} numberContentMin={1} numberContentMax={2}/>
        </div>
    );
};

export default Test;