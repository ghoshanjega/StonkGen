import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectParams, toggleDisplayTable, setOrderBy, setOrderTrend, setLimit } from './StocksListSlice';

export const StocksListFilter = () => {
    const dispatch = useDispatch()
    const params = useSelector(selectParams)

    const handleDisplayTable = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        dispatch(toggleDisplayTable())
    }
    const handleOrderBy = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as any;
        dispatch(setOrderBy(target.value))
    }

    const handleOrderTrend = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as any;
        dispatch(setOrderTrend(target.value))
    }

    const handleLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const target = e.target
        dispatch(setLimit(target.value))
    }

    return (
        <div>
            <div className="d-flex justify-content-between mb-3">
                <button onClick={handleDisplayTable} type="button" title="Table view or card view" className="btn btn-light">▤ | ❏</button>
                <div>
                    <select className="form-control form-control-sm" value={params.limit} onChange={(e) => handleLimit(e)}>
                        <option value={10}>10 items</option>
                        <option value={50}>50 items</option>
                        <option value={100}>100 items</option>
                        <option value={200}>200 items</option>
                    </select>
                </div>
            </div>
            <div className="d-flex justify-content-between mb-3">
                <div className="d-block">
                    <p className="mb-1 filter-text">Order by</p>
                    <div className="btn-group btn-group-sm" role="group" onClick={(e) => handleOrderBy(e)} >
                        <button value="stockId" type="button" className={`btn btn-outline-dark ${params.orderBy === "stockId" && "active"}`}>default</button>
                        <button value="name" type="button" className={`btn btn-outline-dark ${params.orderBy === "name" && "active"}`}>name</button>
                        <button value="bloombergTickerLocal" type="button" className={`btn btn-outline-dark ${params.orderBy === "bloombergTickerLocal" && "active"}`}>stock code</button>
                    </div>
                </div>
                <div className="d-block text-right">
                    <p className="mb-1 filter-text">Trend</p>
                    <div className="btn-group btn-group-sm" role="group" onClick={(e) => handleOrderTrend(e)}>
                        <button value="asc" type="button" className={`btn btn-outline-dark ${params.trend === "asc" && "active"}`} >asc</button>
                        <button value="desc" type="button" className={`btn btn-outline-dark ${params.trend === "desc" && "active"}`}>desc</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
