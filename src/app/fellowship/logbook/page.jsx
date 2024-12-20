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

import { Eye } from "lucide-react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  // window size
  const windowSize = useWindowSize();

  const columns = [
    {
      Header: () => "Logbook Name",
      accessor: "body",
      // width: 80
    },
    {
      Header: () => "MR Number",
      accessor: "postId",
      // width: 1000
    },
    {
      Header: () => "Patient Name   ",
      accessor: "name",
      // width: 'auto'
    },
    {
      Header: () => "Supervising Doctor",
      accessor: "email",
      // width: 'auto'
    },
    {
      Header: () => "Date",
      accessor: "date",
      Cell: ({ row }) => <p>2024-10-21</p>,
      // width: 'auto'
    },
    {
      Header: () => "",
      accessor: "email2",
      disableSortBy: true,
      showFilter: false,
      Cell: ({ row }) => (
        <Button variant="ghost" onClick={() => console.log("berhasil preview")}>
          <Eye />
        </Button>
        // width: 'auto'
      ),
    },
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
            <BreadcrumbPage>Logbook</BreadcrumbPage>
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
          <Button onClick={() => console.log("clicked")}>Create Logbook</Button>
        </DataTable>
      )}
    </div>
  );
}
