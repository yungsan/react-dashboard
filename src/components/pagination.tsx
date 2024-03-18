import { Pagination } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

function PaginationComponent({
    totalPage,
    currentPage,
    setCurrentPage
}: {
    totalPage: number,
    currentPage: number,
    setCurrentPage: Dispatch<SetStateAction<number>>
}) {
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <Pagination
            page={currentPage}
            count={totalPage}
            color="primary"
            onChange={handleChange}
        />
    );
}

export default PaginationComponent;