"use client";

import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import DataTable from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import useWindowSize from "@/hooks/use-window-size";
import axios from "axios";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  // window size
  const windowSize = useWindowSize();

  const columns = [
    {
      Header: () => "Nama",
      accessor: "name",
      // width: 80
    },
    {
      Header: () => "Tahun",
      accessor: "1",
      Cell: ({ row }) => <p>2024</p>,
      // width: 1000
    },
    {
      Header: () => "Servis",
      accessor: "servis",
      Cell: ({ row }) => <p>Glaucoma Management</p>,
      // width: 'auto'
    },
    {
      Header: () => "Juduk Makalah 1",
      accessor: "body",
      // width: 'auto'
    },
    {
      Header: () => "Juduk Penelitian 1",
      accessor: "jp1",
      Cell: ({ row }) => (
        <p>
          Vision Resilience Post-Trabeculectomy in Advanced Glaucoma Patients
        </p>
      ),
      // width: 'auto'
    },
    {
      Header: () => "Juduk Makalah 2",
      accessor: "jk2",
      Cell: ({ row }) => <p>-</p>,
      // width: 'auto'
    },
    {
      Header: () => "Juduk Penelitian 2",
      accessor: "jp2e",
      Cell: ({ row }) => (
        <p>
          PPT Vision Resilience Post-Trabeculectomy in Advanced Glaucoma
          Patients
        </p>
      ),
      // width: 'auto'
    },
    // {
    //   Header: () => "",
    //   accessor: "email2",
    //   disableSortBy: true,
    //   showFilter: false,
    //   Cell: ({ row }) => (
    //     <Button variant="ghost" onClick={() => console.log("berhasil preview")}>
    //       <Eye />
    //     </Button>
    //   ),
    // },
    {
      Header: () => "",
      accessor: "id",
      disableSortBy: true,
      showFilter: false,
      Cell: ({ row }) => (
        <div className="flex items-center justify-center space-x-2"></div>
      ),
    },
  ];

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response) => {
        setLoading(false);
        return setComments(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  return (
    <div
      className="p-4 space-y-8 overflow-auto"
      style={{
        maxWidth: windowSize.width > 768 ? windowSize.width - 256 : "100%",
      }}
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Database Penelitian Fellowship</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {loading ? (
        <div className="flex items-center space-x-4">
          <div className="space-y-2">
            <Skeleton
              className="h-96"
              style={{
                width:
                  windowSize.width > 768
                    ? windowSize.width - (256 + 32)
                    : windowSize.width - 32,
              }}
            />
          </div>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={comments}
          download
          filterPerColumn
          // fixed
          // selectable
          // approve={handleApproveDataTable}
          // delete={handleDeleteDataTable}
        >
          {/* <Button onClick={() => console.log("clicked")}>Add </Button> */}
        </DataTable>
      )}
    </div>
  );
}
