import s from './Pagination.module.css'
import {useState} from "react";
import SuperSelect from "../../../SuperComponents/SuperSelect/SuperSelect";
import cn from "classnames";

type PaginationPropsType = {
    portionSize?: number
    totalItemsCount: number
    itemsOnPageCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    onChangeItemsOnPageCount?: (itemsOnPage: number) => void
}


export const Pagination = ({
                               portionSize = 5,
                               totalItemsCount,
                               itemsOnPageCount,
                               currentPage,
                               ...props
                           }: PaginationPropsType) => {

    //всего страниц
    let pagesCount = Math.ceil(totalItemsCount / itemsOnPageCount)
    //количество таких порций (для стрелок)
    let portionCount = Math.ceil(pagesCount / portionSize)
    //порядковый номер каждой порции
    const [portionNumber, setPortionNumber] = useState<number>(1)
    //номера страницы в порции для фильтрации массива
    const leftBorderPortionNumber = (portionNumber - 1) * portionSize + 1
    const rightBorderPortionNumber = portionNumber * portionSize


    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const onPageChanged = (pageNumber: number) => {
        props.onPageChanged(pageNumber)
        setPortionNumber(Math.ceil(pageNumber / portionSize))
    }

    //для выбора количества отображаемых элементов на странице
    let itemsOnPageCountArray: Number[] = [4, 5, 10, 15, 20]


    if (totalItemsCount === 0) return null
    return <div className={s.pagination}>

        <button
            disabled={portionNumber <= 1}
            className={cn(s.buttonElement, s.arrow, s.prevArrow)}
            onClick={() => setPortionNumber(portionNumber - 1)}/>

        <div className={s.pageNumbers}>
            {portionCount === portionNumber &&
                <>
                    <button onClick={() => onPageChanged(1)}
                            className={s.buttonElement}>
                        {1}
                    </button>
                    <span className={s.spanElement}>...</span>
                </>}

            {pages
                .filter(p => p >= leftBorderPortionNumber && p <= rightBorderPortionNumber)
                .map((page) =>
                    <button key={page}
                            onClick={() => onPageChanged(page)}
                            className={cn(s.buttonElement, (currentPage === page ? s.selected : ''))}>
                        {page}
                    </button>
                )}

            {portionCount > portionNumber &&
                <>
                    <span className={s.spanElement}>...</span>
                    <button onClick={() => onPageChanged(pagesCount)}
                            className={s.buttonElement}>
                        {pagesCount}
                    </button>
                </>}
        </div>

        <button disabled={portionCount <= portionNumber}
                className={cn(s.buttonElement, s.arrow, s.nextArrow)}
                onClick={() => setPortionNumber(portionNumber + 1)}/>

        <div className={s.showCards}>
            <span>Show </span>
            <SuperSelect className={s.selectNumber}
                         options={itemsOnPageCountArray}
                         onChangeOption={props.onChangeItemsOnPageCount}/>
            <span> cards per page</span>
        </div>

    </div>
}