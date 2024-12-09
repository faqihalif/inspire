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
import ErrorComponent from "@/components/ui/error-component"
import useWindowSize from "@/hooks/use-window-size"
import axios from "axios"
import { useSession } from "next-auth/react"

export default function Page() {
    const session = useSession()
    const [loading, setLoading] = useState(false)
    const [showEmployee, setShowEmployee] = useState(false)
    const [employees, setEmployees] = useState([])

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

    const handleRefreshEmployee = () => {
        setLoading(true)
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees`,
            {
                headers: { Authorization: `Bearer ${session.data?.user?.bearer}` }
            }
        ).then(response => {
            setEmployees(response.data)
            setShowEmployee(true)
            setLoading(false)
        })
            .catch(err => {
                console.log(err.response.data)
                setShowEmployee(false)
                setLoading(false)
            })
    }
    
    useEffect(() => {
        setLoading(true)
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees`,
            {
                headers: { Authorization: `Bearer ${session.data?.user?.token}` }
            }
        ).then(response => {
            setEmployees(response.data)
            setShowEmployee(true)
            setLoading(false)
        })
            .catch(err => {
                console.log(err.response.data)
                setShowEmployee(false)
                setLoading(false)
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
                    showEmployee ? (
                        <DataTable
                            columns={columns}
                            data={employees}
                            download
                            filterPerColumn
                        // fixed
                        // selectable
                        // approve={handleApproveDataTable}
                        // delete={handleDeleteDataTable}
                        >
                            <Button onClick={() => console.log('clicked')}>
                                Add Employee
                            </Button>
                        </DataTable>
                    ) : (
                        <ErrorComponent action={handleRefreshEmployee} />
                    )
                )
            }
        </div>
    )
}
