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
// import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import useWindowSize from "@/hooks/use-window-size";
// import axios from "axios";
import { Plus } from "lucide-react";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPaperClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // window size
  const windowSize = useWindowSize();

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
            <BreadcrumbPage>Paper</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <Button onClick={handleAddPaperClick}>
          <Plus />
        </Button>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Paper</DialogTitle>
            <DialogDescription>
              Fill out the form below to Create Paper
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Textarea id="title" />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="makalah">Makalah</SelectItem>
                  <SelectItem value="penelitian">Penelitian</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="lecturers">Lecturers</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lecturers1">
                    DR. Dr. Cosmos O. Mangunsong, SpM(K)
                  </SelectItem>
                  <SelectItem value="lecturers2">
                    {" "}
                    Dr. Soedarman Sjamsoe, SpM(K)
                  </SelectItem>
                  <SelectItem value="lecturers2">
                    {" "}
                    DR. Dr. Gitalisa Andayani, SpM(K)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="file">File</Label>
              <Input id="file" type="file" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" onClick={() => console.log("Paper saved!")}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
