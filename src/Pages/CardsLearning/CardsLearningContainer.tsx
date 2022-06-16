import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppSelector, useTypedDispatch} from "../../bll/store";
import {CardsLearning} from "./CardsLearning";
import {fetchCard, getCardsForLearning, updateCardGrade} from "../../bll/packs-reducer";
import {CardType} from "../../types/responseTypes";

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});

    return cards[res.id + 1];
}

export const CardsLearningContainer = () => {
    const [showAnswer, setShowAnswer] = useState<boolean>(false)
    const onShowClick = () => setShowAnswer(!showAnswer)

    const navigate = useNavigate()
    const {id = ''} = useParams<{ id: string }>();
    const packName = new URLSearchParams(useLocation().search).get('packName')

    const cards = useAppSelector(getCardsForLearning)
    const dispatch = useTypedDispatch()

    const onCancelClick = () => navigate(-1)
    const onNextClick = (value: number) => {
        setShowAnswer(false)
        if (cards.length) {
            setCard(getCard(cards))
            dispatch(updateCardGrade(card._id, value))
        }
    }


    const [card, setCard] = useState<CardType>({
        answer: '',
        question: '',
        cardsPack_id: '',
        grade: 0,
        shots: 0,
        user_id: '',
        created: '',
        updated: '',
        _id: ''
    })


    useEffect(() => {
            dispatch(fetchCard(id))
        }
        , [id, dispatch]
    )

    useEffect(() => {
        if (cards.length) {
            setCard(getCard(cards))
        }
    }, [cards])

    return <>
        <CardsLearning packName={packName}
                       cardQuestion={card.question}
                       cardAnswer={card.answer}
                       onCancelClick={onCancelClick}
                       onNextClick={onNextClick}
                       onShowClick={onShowClick}
                       showAnswer={showAnswer}
        />
    </>
}