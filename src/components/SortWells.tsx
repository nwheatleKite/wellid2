import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSortWells, SortWellType } from "../features/sortWellsSlice";

export const sortWellOptions: SortWellType[] = ["unsorted", "A1 A2", "A1 A10", "1 10"];

const SortWells = () => {
    const dispatch = useAppDispatch();
    const sortWells = useAppSelector((state) => state.sortWells);

    const selectSortOption = (e: any) => {
        let value = e.currentTarget.dataset.value;
        if (sortWells !== value) {
            dispatch(setSortWells(value));
        }
    };


    return (
        <div>

            <div className="fsxxl">SortWells</div>
            {sortWellOptions.map((sortOption) => {
                return (
                    <div data-value={sortOption} key={sortOption} onClick={selectSortOption}
                        className={sortOption === sortWells ? "bold" : "sel"}>
                        {sortOption}
                    </div>
                );
            })}
        </div>
    );
};

export default SortWells;
