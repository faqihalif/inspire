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
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useWindowSize from "@/hooks/use-window-size";
import axios from "axios";
import { Eye } from "lucide-react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddAttendanceClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // window size
  const windowSize = useWindowSize();

  const columns = [
    {
      Header: () => "Date",
      accessor: "email",
      // width: 80
    },
    {
      Header: () => "Hour",
      accessor: "hour",
      Cell: ({ row }) => <p>08:56</p>,
      // width: 1000
    },
    {
      Header: () => "Activity",
      accessor: "body",
      // width: 'auto'
    },
    {
      Header: () => "Supervising Doctor",
      accessor: "name",
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
            <BreadcrumbPage>Attendance</BreadcrumbPage>
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
          <Button onClick={handleAddAttendanceClick}>Add Attendance</Button>
        </DataTable>
      )}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Attendance</DialogTitle>
            <DialogDescription>
              Fill out the form below to add attendance.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            <div>
              <Label htmlFor="name">Date</Label>
              <Input disabled type="text" id="date" placeholder="01/01/2024" />
            </div>
            <div>
              <Label htmlFor="name">Hour</Label>
              <Input disabled type="text" id="date" placeholder="07:00" />
            </div>
            <div>
              <Label htmlFor="program">Program</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="program1">Poli JEC @Kedoya</SelectItem>
                  <SelectItem value="program2">Poli JEC @Menteng</SelectItem>
                  <SelectItem value="program2">Poli JEC @Cibubur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" />
            </div>
            <div>
              <Label htmlFor="supervising-doctor">Supervising Doctor</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="supervising-doctor1">
                    DR. Dr. Cosmos O. Mangunsong, SpM(K)
                  </SelectItem>
                  <SelectItem value="supervising-doctor2">
                    {" "}
                    Dr. Soedarman Sjamsoe, SpM(K)
                  </SelectItem>
                  <SelectItem value="supervising-doctor2">
                    {" "}
                    DR. Dr. Gitalisa Andayani, SpM(K)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => console.log("Attendance saved!")}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
