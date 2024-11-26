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
import { Textarea } from "@/components/ui/textarea";

import useWindowSize from "@/hooks/use-window-size";
import axios from "axios";
import { Eye } from "lucide-react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBorrowingBookClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // window size
  const windowSize = useWindowSize();

  const columns = [
    {
      Header: () => "Title Book",
      accessor: "title",
      // width: 80
    },
    {
      Header: () => "Borrowing Date",
      accessor: "body",
      // width: 1000
    },
    {
      Header: () => "Returning Date",
      accessor: "userId",
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
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setLoading(false);
        return setPosts(response.data);
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
            <BreadcrumbPage>Library</BreadcrumbPage>
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
          data={posts}
          download
          filterPerColumn
          // fixed
          // selectable
          // approve={handleApproveDataTable}
          // delete={handleDeleteDataTable}
        >
          <Button onClick={handleAddBorrowingBookClick}>
            Create Borrowing Book
          </Button>
        </DataTable>
      )}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Borrowing Book</DialogTitle>
            <DialogDescription>
              Fill out the form below to Create Borrowing Book
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            <div>
              <Label htmlFor="address">Title Book</Label>
              <Textarea id="address" />
            </div>
            <div>
              <Label htmlFor="attachment">Attachment</Label>
              <Input id="attachment" type="file" />
            </div>
            <div>
              <Label htmlFor="name">Date</Label>
              <Input disabled type="text" id="date" placeholder="01/01/2024" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" onClick={() => console.log("Book saved!")}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
