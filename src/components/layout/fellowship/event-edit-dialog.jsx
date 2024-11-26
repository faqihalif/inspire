import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import AutoComplete from "./auto-complete";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import moment from "moment";

const EventEditDialog = ({ show, setShow, doctors, event }) => {
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    start_date: yup.string().required("Start Date is required"),
    end_date: yup.string().required("End Date is required"),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: event?.id || "",
      name: event?.title || "",
      supervising_doctor: event?.supervising_doctor || "",
      start_date: event?.start
        ? moment(event.start).format("YYYY-MM-DDTHH:mm")
        : "",
      end_date: event?.end ? moment(event.end).format("YYYY-MM-DDTHH:mm") : "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log("Updated Data:", data);
    setShow(false);
  };

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Activity</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label>Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label>Supervising Doctor</label>
            <AutoComplete
              name="supervising_doctor"
              options={doctors}
              control={control}
            />
          </div>
          <div>
            <label>Start Date</label>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("start_date")}
            />
          </div>
          <div>
            <label>End Date</label>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("end_date")}
            />
          </div>
          <DialogFooter>
            <button
              type="button"
              onClick={() => setShow(false)}
              className="px-4 py-2 text-black border border-black rounded-md hover:bg-gray-100 focus:outline-none"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-black border border-black bg-white rounded-md hover:bg-gray-100 focus:outline-none"
            >
              Update
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventEditDialog;
