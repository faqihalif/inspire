import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import AutoComplete from "./auto-complete";

// React Hook Form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const dummyRemainingDayOff = 10;

const EventCreateDialog = ({ show, setShow, doctors, event }) => {
  // Validation schema
  const validationSchema = yup.object({
    activity: yup.string().required("Activity is required"),
    start_date: yup.date().required("Start Date is required"),
    end_date: yup
      .date()
      .required("End Date is required")
      .min(yup.ref("start_date"), "End Date cannot be earlier than Start Date"),
    reason: yup.string().when("activity", {
      is: "Cuti",
      then: yup.string().required("Reason is required"),
    }),
    supervising_doctor: yup.string().when("activity", {
      is: "Wetlab",
      then: yup.string().required("Supervising Doctor is required"),
    }),
  });

  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      activity: "",
      reason: "",
      sisa_cuti: dummyRemainingDayOff.toString(),
      start_date: "",
      end_date: "",
      supervising_doctor: "",
      activity_photo: null,
    },
    resolver: yupResolver(validationSchema),
  });

  // Set initial dates when `event` changes
  useEffect(() => {
    if (event?.start && event?.end) {
      setValue("start_date", event.start);
      setValue("end_date", event.end);
    }
  }, [event, setValue]);

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    setShow(false);
  };

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Activity</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Activity Selection */}
          <div>
            <label>Activity</label>
            <select
              className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("activity")}
            >
              <option value="">Select Activity</option>
              <option value="Cuti">Cuti</option>
              <option value="Wetlab">Wetlab</option>
              <option value="Sakit">Sakit</option>
            </select>
            {errors.activity && (
              <p className="text-red-500">{errors.activity.message}</p>
            )}
          </div>

          {/* Conditional Inputs */}
          {watch("activity") === "Cuti" && (
            <>
              <div>
                <label>Reason</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("reason")}
                />
                {errors.reason && (
                  <p className="text-red-500">{errors.reason.message}</p>
                )}
              </div>
              <div>
                <label>Remaining Days Off</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-black rounded-md bg-gray-200"
                  disabled
                  value={dummyRemainingDayOff}
                />
              </div>
            </>
          )}

          {watch("activity") === "Wetlab" && (
            <>
              <div>
                <label>Supervising Doctor</label>
                <AutoComplete
                  name="supervising_doctor"
                  options={doctors}
                  control={control}
                />
                {errors.supervising_doctor && (
                  <p className="text-red-500">
                    {errors.supervising_doctor.message}
                  </p>
                )}
              </div>
              <div>
                <label>Activity Photo</label>
                <input
                  type="file"
                  className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("activity_photo")}
                />
              </div>
            </>
          )}

          {/* Date Inputs */}
          <div>
            <label>Start Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("start_date")}
            />
            {errors.start_date && (
              <p className="text-red-500">{errors.start_date.message}</p>
            )}
          </div>
          <div>
            <label>End Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("end_date")}
            />
            {errors.end_date && (
              <p className="text-red-500">{errors.end_date.message}</p>
            )}
          </div>

          {/* Dialog Footer */}
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
              Save
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventCreateDialog;
