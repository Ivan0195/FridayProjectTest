import s from './Pagination.module.css'
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

    const leftBorderPortionNumber = Math.min(currentPage - 2, pagesCount - 4)
    const rightBorderPortionNumber = Math.max(currentPage + 2, 5)


    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const onPageChanged = (pageNumber: number) => {
        props.onPageChanged(pageNumber)
    }

    //для выбора количества отображаемых элементов на странице
    let itemsOnPageCountArray: Number[] = [4, 5, 10, 15, 20]


    if (totalItemsCount <= itemsOnPageCount) return null
    return <div className={s.pagination}>

        <button
            disabled={currentPage <= 1}
            className={cn(s.buttonElement, s.arrow, s.prevArrow)}
            onClick={() => onPageChanged(currentPage - 1)}/>

        <div className={s.pageNumbers}>
            {currentPage >= 4 && pagesCount > 5 &&
                <>
                    <button onClick={() => onPageChanged(1)}
                            className={s.buttonElement}>
                        {1}
                    </button>
                    {currentPage >= 5 && <span className={s.spanElement}>...</span>}
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

            {pagesCount - 3 >= currentPage && pagesCount > 5 &&
                <>
                    {pagesCount - 4 >= currentPage &&
                        <span className={s.spanElement}>...</span>}
                    <button onClick={() => onPageChanged(pagesCount)}
                            className={s.buttonElement}>
                        {pagesCount}
                    </button>
                </>}
        </div>

        <button disabled={pagesCount <= currentPage}
                className={cn(s.buttonElement, s.arrow, s.nextArrow)}
                onClick={() => onPageChanged(currentPage + 1)}/>

        <div className={s.showCards}>
            <span>Show </span>
            <SuperSelect className={s.selectNumber}
                         options={itemsOnPageCountArray}
                         onChangeOption={props.onChangeItemsOnPageCount}/>
            <span> cards per page</span>
        </div>

    </div>
}