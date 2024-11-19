import React, { useEffect, useMemo, useImperativeHandle, useRef } from 'react'

// react table V7
import { useTable, useFilters, useGlobalFilter, useSortBy, usePagination, useRowSelect } from 'react-table'

// lucide icon
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ChevronFirst, ChevronLast } from "lucide-react"

// excel export
import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

// custom hooks
import useWindowSize from "@/hooks/use-window-size"

// shadcn/ui
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const DataTable = props => {
    const tableRef = useRef()

    // columns
    const columns = useMemo(
        () => props.columns, [props.columns]
    )

    // data
    const data = useMemo(
        () => props.data, [props.data]
    )

    // window size
    const windowSize = useWindowSize()

    const defaultColumn = React.useMemo(
        () => ({
            Filter: DefaultColumnFilter,
        }),
        []
    )

    // config table
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        rows,
        prepareRow,
        setGlobalFilter,
        nextPage,
        canNextPage,
        previousPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        selectedFlatRows,
        toggleAllRowsSelected
    } = useTable({
        columns,
        data,
        defaultColumn,
        initialState: {
            hiddenColumns: columns.filter(col => col.show === false).map(col => col.accessor),
        },
    },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push(columns => {
                return (
                    props.selectable ? (
                        [
                            {
                                id: 'selection',
                                Header: ({ getToggleAllRowsSelectedProps }) => (
                                    <CheckBox {...getToggleAllRowsSelectedProps()} />
                                ),
                                Cell: ({ row }) => (
                                    <CheckBox {...row.getToggleRowSelectedProps()} />
                                ),
                                showFilter: false
                            },
                            ...columns
                        ]
                    ) : (
                        [
                            ...columns
                        ]
                    )
                )
            })
        },
    )

    const handleApprove = () => {
        let a = selectedFlatRows.map(row => {
            return row.original
        })
        props.approve && props.approve(a)
    }

    const handleDelete = () => {
        let a = selectedFlatRows.map(row => {
            return row.original
        })
        props.delete && props.delete(a)
    }

    const handleCancel = () => {
        toggleAllRowsSelected(false)
    }

    useImperativeHandle(
        tableRef,
        () => ({
            resetSelectedRows: () => toggleAllRowsSelected(false),
        }), // you can just use ({toggleAllRowsSelected}) and in Parent call tableRef.current.toggleAllRowsSelected() with ?bool param
        []
    )

    // set page size 50
    useEffect(() => {
        setPageSize(25)
    }, [])

    return (
        <Card>
            <CardContent className="px-0 pt-4">
                <div className="relative grid items-center grid-cols-2 gap-4 p-4 pt-0">
                    {
                        selectedFlatRows.length == 0 ? (
                            <div className="flex items-center space-x-4">
                                {/* slot button */}
                                <React.Fragment>
                                    {
                                        props.children
                                    }
                                </React.Fragment>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <div>
                                    <p className="text-sm font-medium text-neutral-900">{`${selectedFlatRows.length} selected`}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {
                                        props.approve && <Button onClick={() => handleApprove()}>
                                            Approve
                                        </Button>
                                    }
                                    {
                                        props.delete && <Button variant="destructive" onClick={() => handleDelete()}>
                                            Delete
                                        </Button>
                                    }
                                    <Button variant="ghost" onClick={() => tableRef?.current?.resetSelectedRows()}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        )
                    }

                    <div className="flex justify-end w-full space-x-4">
                        {
                            props.download && <Download
                                columns={props.columns}
                                rows={rows}
                            />
                        }

                        <Input type="text" placeholder="Search" onChange={event => setGlobalFilter(event.target.value)} />
                    </div>
                </div>

                {/* table */}
                <div className="overflow-auto rounded" style={{ maxHeight: windowSize.height - 350 }}>
                    <table {...getTableProps()} className={`w-full relative ${props.fixed ? 'table-fixed' : 'table-auto'}`} ref={tableRef}>
                        <thead className="w-full">
                            {
                                headerGroups.map((headerGroup) => {
                                    const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps()
                                    return (
                                        <tr {...restHeaderGroupProps} key={key}>
                                            {
                                                headerGroup.headers.map((column) => {
                                                    const { key, ...restColumn } = column.getHeaderProps()
                                                    const { key: toggleKey, ...restToggle } = (column.getHeaderProps(column.getSortByToggleProps()))
                                                    return (
                                                        <th className="sticky top-0 left-0 h-[72px] px-4 py-2 text-xs font-semibold text-left uppercase bg-neutral-900 border-b" key={key} {...restColumn} >
                                                            <div className={"flex justify-between w-full h-full " + (props.filterPerColumn && column.showFilter != false ? 'flex-col space-y-1' : 'flex-row')}>
                                                                <div className="flex items-center justify-between space-x-2" key={toggleKey} {...restToggle}>
                                                                    <span className="flex items-center text-white">{column.render("Header")}</span>
                                                                    {
                                                                        column.isSorted ? (
                                                                            column.isSortedDesc ? (
                                                                                <span className="flex items-center">
                                                                                    <ChevronDown className="w-4 h-4 text-white" />
                                                                                </span>
                                                                            ) : (
                                                                                <span className="flex items-center">
                                                                                    <ChevronUp className="w-4 h-4 text-white" />
                                                                                </span>
                                                                            )) : (
                                                                            null
                                                                        )
                                                                    }
                                                                </div>
                                                                {/* render the columns filter ui */}
                                                                {
                                                                    props.filterPerColumn && column.showFilter != false && (
                                                                        <div>{column.render("Filter")}</div>
                                                                    )
                                                                }
                                                            </div>
                                                        </th>
                                                    )

                                                })
                                            }
                                        </tr>
                                    )

                                })
                            }
                        </thead>
                        <tbody {...getTableBodyProps()} className="divide-y">
                            {
                                page.length == 0 ? (
                                    <tr className="h-24 hover:bg-neutral-100">
                                        <td className="px-4 py-2 text-sm text-left bg-white text-neutral-700" colSpan={columns.length}>
                                            <p className="text-sm text-center text-neutral-900">No data available</p>
                                        </td>
                                    </tr>
                                ) : (
                                    page.map((row) => {
                                        prepareRow(row)
                                        const { key, ...restRowProps } = row.getRowProps()
                                        return (
                                            <tr {...restRowProps} className="h-24 hover:bg-neutral-100" key={key}>
                                                {
                                                    row.cells.map(cell => {
                                                        const { key, ...restCellProps } = cell.getCellProps()
                                                        return (
                                                            <td {...restCellProps} className={`px-4 py-2 text-sm text-left text-neutral-900 bg-white ${props.fixed ? 'truncate' : ''}`} key={key}>
                                                                {
                                                                    cell.render('Cell')
                                                                }
                                                            </td>
                                                        )
                                                    })
                                                }
                                            </tr>
                                        )
                                    })
                                )
                            }
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between p-4 pb-0 border-t">
                    {/* show results of records */}
                    <div className="flex items-center space-x-2">
                        <p className="text-xs text-neutral-900">{`Showing ${page.length} results of ${rows.length} records`}</p>
                    </div>

                    {/* button group navigation */}
                    <div className="flex items-center space-x-4 rounded">
                        {/* left */}
                        <div className="flex items-center">
                            <button
                                type="button"
                                className={`rounded-r-none rounded-l p-1 flex items-center justify-center ${!canPreviousPage ? 'text-neutral-300' : 'text-neutral-900'}`}
                                onClick={() => gotoPage(0)}
                                disabled={!canPreviousPage}
                            >
                                <ChevronFirst className="w-5 h-5" />
                            </button>
                            <button
                                type="button"
                                className={`rounded-none p-1 flex items-center justify-center ${!canPreviousPage ? 'text-neutral-300' : 'text-neutral-900'}`}
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                        </div>

                        {/* center */}
                        <div>
                            <p className="text-xs text-neutral-900">{`Page ${state.pageIndex + 1} of ${pageOptions.length == 0 ? '1' : pageOptions.length}`}</p>
                        </div>

                        {/* right */}
                        <div className="flex items-center">
                            <button
                                type="button"
                                className={`rounded-none p-1 flex items-center justify-center ${!canNextPage ? 'text-neutral-300' : 'text-neutral-900'}`}
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                            <button
                                type="button"
                                className={`rounded-l-none rounded-r p-1 flex items-center justify-center ${!canNextPage ? 'text-neutral-300' : 'text-neutral-900'}`}
                                onClick={() => gotoPage(pageCount - 1)}
                                disabled={!canNextPage}
                            >
                                <ChevronLast className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card >
    )
}

const Download = props => {
    const rows = props.rows.map(row => {
        return row.original
    })
    const fileName = 'Research and Education Division'
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
    const fileExtension = ".xlsx"
    const arrayHeading = props.columns.map(value => {
        return {
            [value.accessor]: value.Header()
        }
    })
    const Heading = [
        Object.assign({}, ...arrayHeading)
    ]

    const exportToCSV = (rows, fileName) => {
        const ws = XLSX.utils.json_to_sheet(Heading, {
            header: props.columns.map(value => {
                return value.accessor
            }),
            skipHeader: true,
            origin: 0 //ok
        })
        ws["!cols"] = [];
        XLSX.utils.sheet_add_json(ws, rows, {
            header: props.columns.map(value => {
                return value.accessor
            }),
            skipHeader: true,
            origin: -1 //ok
        });
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] }
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" })
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, fileName + fileExtension)
    }

    return (
        <Button onClick={() => exportToCSV(rows, fileName)}>Download</Button>
    )
}

const DefaultColumnFilter = ({
    column: { filterValue, preFilteredRows, setFilter },
}) => {
    const count = preFilteredRows.length

    return (
        <Input
            value={filterValue || ''}
            className="font-normal bg-white"
            onChange={e => {
                setFilter(e.target.value || undefined) // set undefined to remove the filter entirely
            }}
            placeholder="Search..."
        />
    )
}

const CheckBox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
        <input type="checkbox" className="w-4 h-4 mt-1 text-neutral-900" ref={resolvedRef} {...rest} />
    )
})

DataTable.displayName = 'DataTable'

export default DataTable