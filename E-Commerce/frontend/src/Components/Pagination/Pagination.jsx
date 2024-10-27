import { useState } from 'react'
import styles from './Pagination.module.scss'



const Pagination = ({currentPage , setCurrentPage , productsPerPage , totalProducts}) => {

    const PageNumbers = []

    const totalPages = totalProducts / productsPerPage

    const [pageNumberLimit , setPageNumberLimit] = useState(5)

    const [maxPageNumberLimit , setMaxPageNumberLimit] = useState(5)

    const [minPageNumberLimit , setMinPageNumberLimit] = useState(0)

    // ? Paginate ? \\
    const Paginate = (PageNumber) => {
        setCurrentPage(PageNumber)
    }

    // ? Go To The Next Page ? \\
    const PaginateNext = () => {
        setCurrentPage(currentPage + 1)
        if(currentPage + 1 > maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
    }

    // ? Go To Previous Page ? \\
    const PaginatePrevious = () => {
        setCurrentPage(currentPage - 1)
        if((currentPage -1) % pageNumberLimit === 0){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
    }

    for(let i =1 ; i <= Math.ceil(totalProducts/productsPerPage) ; i++){
        PageNumbers.push(i)
    }

  return (
    <ul className={styles.pagination}>
        <li onClick={PaginatePrevious} className={currentPage === PageNumbers[0] ? `${styles.hidden}` : null}>Prev</li>

        {PageNumbers.map((number) => {
            if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit){
                return (
                    <li key={number} onClick={() => Paginate(number)} className={currentPage === number ? `${styles.active}` : null}>{number}</li>                
                )       
            }
        })}

        <li onClick={PaginateNext} className={currentPage === PageNumbers[PageNumbers.length - 1] ? `${styles.hidden}` : null}>Next</li>
        <p><b className={styles.page}>{`Page ${currentPage}`}</b><span> of</span><b> {`${Math.ceil(totalPages)}`}</b></p>
    </ul>
  )
}

export default Pagination
