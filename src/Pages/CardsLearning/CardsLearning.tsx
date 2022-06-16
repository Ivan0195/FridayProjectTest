import SuperButton from "../ProfilePage/common/Button/SuperButton";
import s from "./CardsLearning.module.css"
import {useState} from "react";
import SuperRadio from "../../SuperComponents/SuperRadio/SuperRadio";

type CardsQuestionType = {
    packName: string | null
    cardQuestion: string
    cardAnswer: string
    onCancelClick: () => void
    onNextClick: (value: number) => void
    onShowClick: () => void
    showAnswer: boolean
}

const answers = [
    {grade: 1, title: 'Did not know'},
    {grade: 2, title: 'Forgot'},
    {grade: 3, title: 'A lot of thought'},
    {grade: 4, title: 'Confused'},
    {grade: 5, title: 'Knew the answer'}
]

export const CardsLearning = ({
                                  packName,
                                  cardQuestion,
                                  cardAnswer,
                                  onCancelClick,
                                  onNextClick,
                                  showAnswer,
                                  onShowClick
                              }: CardsQuestionType) => {
    const [title, setTitle] = useState<string>('')
    const onNextClickHandler = () => {
        onNextClick(answers.find(ans => ans.title === title)!.grade)
        setTitle('')
    }

    return <div className={s.wrapper}>
        <div className={s.card}>
            <div className={s.title}>
                <h2>{`Learn "${packName}"`}</h2>
            </div>
            <div>
            <span className={s.span}>
                    <b>Question: </b>
                {cardQuestion}
                </span>
                {showAnswer &&
                    <div className={s.answerBlock}>
                        <span className={s.span}><b>Answer: </b>{cardAnswer}</span>
                        <b className={s.rate}>Rate yourself:</b>
                        <SuperRadio
                            className={s.radio}
                            options={answers.map(ans => ans["title"])}
                            value={title}
                            onChange={(e) => setTitle(e.currentTarget.value)}
                        />
                    </div>}
                <div className={s.buttonWrapper}>
                    <SuperButton onClick={onCancelClick}>Cancel</SuperButton>
                    {showAnswer
                        ? <SuperButton onClick={onNextClickHandler}>Next</SuperButton>
                        : <SuperButton onClick={onShowClick}>Show Answer</SuperButton>
                    }
                </div>
            </div>

        </div>
    </div>
}