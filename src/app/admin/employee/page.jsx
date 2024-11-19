"use client"

import React, { useEffect, useState } from "react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Skeleton } from "@/components/ui/skeleton"
import DataTable from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import useWindowSize from "@/hooks/use-window-size"
import axios from "axios"

export default function Page() {
    const [loading, setLoading] = useState(true)
    const [employee, setEmployee] = useState([])

    // window size
    const windowSize = useWindowSize()

    const columns = [
        {
            Header: () => "NIP",
            accessor: 'nip',
            // width: 80
        },
        {
            Header: () => "Name",
            accessor: 'fullname',
            // width: 1000
        },
        {
            Header: () => "Gender",
            accessor: 'gender',
            // width: 'auto'
        },
        {
            Header: () => "Birthdate",
            accessor: 'birthdate',
            // width: 'auto'
        },
        {
            Header: () => "Job Position",
            accessor: 'job_position',
            // width: 'auto'
        },
        {
            Header: () => "Job Level",
            accessor: 'job_level',
            // width: 'auto'
        },
        {
            Header: () => "Branches",
            accessor: 'branches',
            // width: 'auto',
        },
        {
            Header: () => "Email",
            accessor: 'email',
            // width: 200
        },
        {
            Header: () => "Phone",
            accessor: 'phone',
            disableSortBy: true,
            // width: 'auto'
        },
        {
            Header: () => "Join Date",
            accessor: 'join_date',
            // width: 'auto'
        },
        {
            Header: () => "",
            accessor: 'id',
            disableSortBy: true,
            showFilter: false,
            Cell: ({ row }) => (
                <div className="flex items-center justify-center space-x-2">
                </div>
            )
        }
    ]

    useEffect(() => {
        axios.get('https://inforisdik.jec.co.id/api/employee')
            .then(response => {
                setLoading(false)
                return setEmployee(response.data)
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }, [])

    return (
        <div className="p-4 space-y-8 overflow-auto" style={{ maxWidth: windowSize.width > 768 ? (windowSize.width - 256) : '100%' }}>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Employee</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {
                loading ? (

                    <div className="flex items-center space-x-4">
                        <div className="space-y-2">
                            <Skeleton className="h-96" style={{ width: windowSize.width > 768 ? (windowSize.width - (256 + 32)) : (windowSize.width - 32) }} />
                        </div>
                    </div>
                ) : (

                    <DataTable
                        columns={columns}
                        data={employee}
                        download
                        filterPerColumn
                    // fixed
                    // selectable
                    // approve={handleApproveDataTable}
                    // delete={handleDeleteDataTable}
                    >
                        <Button onClick={() => console.log('clicked')}>
                            Add Employee 2
                        </Button>
                    </DataTable>
                )
            }
        </div>
    )
}
