import React from 'react';
import { Pagination } from 'react-bootstrap';

function FrontEndPagination({ paginate, pages }) {
    // console.log(pages)
    return (
        <div className="pagination-center">
            <Pagination size="sm">
                {
                    pages.map((num) => {
                        return <Pagination.Item key={num} onClick={() => paginate(num)}>{num}</Pagination.Item>
                    })
                }
            </Pagination>
        </div>
    )
}

export default FrontEndPagination
