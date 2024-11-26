import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "@/lib/moment";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { XIcon } from "lucide-react";

const CustomEvent = ({ event, onClick }) => {
    return (
        <React.Fragment>
            {event.type === "Poli" ? (
                event.present === "Hadir" ? (
                    <p
                        className="px-1 py-0.5 text-sm font-semibold text-white bg-green-600 rounded"
                        onClick={() => onClick(event)}
                    >
                        {event.title}
                    </p>
                ) : event.present === "Cuti" || event.present === "Sakit" ? (
                    <p
                        className="px-1 py-0.5 text-sm font-semibold text-white bg-red-600 rounded"
                        onClick={() => onClick(event)}
                    >
                        {event.title}
                    </p>
                ) : (
                    <p
                        className="px-1 py-0.5 text-sm font-semibold text-white bg-blue-900 rounded"
                        onClick={() => onClick(event)}
                    >
                        {event.title}
                    </p>
                )
            ) : event.type === "National Holiday" ? (
                <p
                    className="px-1 py-0.5 text-sm font-semibold text-white bg-red-600 rounded"
                    onClick={() => onClick(event)}
                >
                    {event.title}
                </p>
            ) : (
                <p
                    className="px-1 py-0.5 text-sm font-semibold text-white bg-yellow-600 rounded"
                    onClick={() => onClick(event)}
                >
                    {event.title}
                </p>
            )}
        </React.Fragment>
    );
};

const Timeline = () => {
    const [myEvents, setMyEvents] = useState([
        {
            title: "Event 1",
            start: new Date(),
            end: new Date(),
            type: "Poli",
            present: "Hadir",
        },
        {
            title: "Event 2",
            start: new Date(),
            end: new Date(),
            type: "Poli",
            present: "Sakit",
        },
        {
            title: "National Holiday",
            start: new Date(),
            end: new Date(),
            type: "National Holiday",
            present: "Hadir",
        },
    ]);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleAddActivity = () => {
        setSelectedEvent(null); // No event selected, add new activity
        setShowDialog(true); // Open dialog for adding new activity
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event); // Set selected event for editing
        setShowDialog(true); // Open dialog for editing activity
    };

    const dayPropGetter = (date) => ({
        ...(moment(date).day() === 0 && {
            style: {
                backgroundColor: "#fee2e2", // red for Sunday
            },
        }),
    });

    const handleSubmitForm = () => {
        if (selectedEvent) {
            // Edit the existing event
            setMyEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event.title === selectedEvent.title ? selectedEvent : event
                )
            );
        } else {
            // Add new event (example: push new event logic)
            setMyEvents([
                ...myEvents,
                {
                    title: "New Event",
                    start: new Date(),
                    end: new Date(),
                    type: "Poli",
                    present: "Hadir",
                },
            ]);
        }
        setShowDialog(false); // Close the dialog after submitting
    };

    return (
        <React.Fragment>
            {/* Header */}
            <div className="flex items-end justify-end">
                <div>
                    {/* Add Activity Button */}
                    <button
                        type="button"
                        className="px-4 py-1 text-sm font-semibold text-white bg-black rounded"
                        onClick={handleAddActivity}
                    >
                        Add Activity
                    </button>
                </div>
            </div>

            {/* Calendar */}
            <div className="flex flex-col w-full h-full overflow-auto">
                <div className="p-2">
                    <Calendar
                        dayLayoutAlgorithm="no-overlap"
                        localizer={momentLocalizer(moment)}
                        style={{ height: 800 }}
                        events={myEvents}
                        dayPropGetter={dayPropGetter}
                        views={["month", "week", "day", "agenda"]}
                        components={{
                            event: (props) => (
                                <CustomEvent {...props} onClick={handleEventClick} />
                            ), // Pass event click handler
                        }}
                    />
                </div>
            </div>

            {/* Color Legend */}
            <div className="p-4 space-y-2">
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-900 rounded-full" />
                    <p className="text-sm font-semibold text-gray-700">Timeline</p>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-600 rounded-full" />
                    <p className="text-sm font-semibold text-gray-700">Present</p>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-600 rounded-full" />
                    <p className="text-sm font-semibold text-gray-700">Wetlab</p>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-600 rounded-full" />
                    <p className="text-sm font-semibold text-gray-700">
                        Day Off / National Holiday
                    </p>
                </div>
            </div>

            {/* Dialog for Adding/Editing Activity */}
            <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {selectedEvent ? "Edit Activity" : "Add Activity"}
                        </DialogTitle>
                        <DialogDescription>
                            {selectedEvent
                                ? "Edit the details for this activity."
                                : "Fill out the details for the new activity."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        {/* Activity Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Activity
                            </label>
                            <Select
                                value={selectedEvent ? selectedEvent.present : ""}
                                onValueChange={(value) =>
                                    setSelectedEvent((prev) => ({ ...prev, present: value }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an activity" />
                                </SelectTrigger>
                                <SelectContent>
                                    {["Cuti", "Wetlab", "Sakit"].map((activity) => (
                                        <SelectItem key={activity} value={activity}>
                                            {activity}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Conditional Fields based on Activity */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <Input
                                type="text"
                                value={selectedEvent ? selectedEvent.title : ""}
                                onChange={(e) =>
                                    setSelectedEvent((prev) => ({
                                        ...prev,
                                        title: e.target.value,
                                    }))
                                }
                                placeholder="Enter activity name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Supervising Doctor
                            </label>
                            <Select
                                value={selectedEvent ? selectedEvent.doctor : ""}
                                onValueChange={(value) =>
                                    setSelectedEvent((prev) => ({ ...prev, doctor: value }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a doctor" />
                                </SelectTrigger>
                                <SelectContent>
                                    {["Dr. John Doe", "Dr. Jane Smith", "Dr. Alex Lee"].map(
                                        (doctor) => (
                                            <SelectItem key={doctor} value={doctor}>
                                                {doctor}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Start Date
                            </label>
                            <Input
                                type="date"
                                value={
                                    selectedEvent
                                        ? moment(selectedEvent.start).format("YYYY-MM-DD")
                                        : ""
                                }
                                onChange={(e) =>
                                    setSelectedEvent((prev) => ({
                                        ...prev,
                                        start: new Date(e.target.value),
                                    }))
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                End Date
                            </label>
                            <Input
                                type="date"
                                value={
                                    selectedEvent
                                        ? moment(selectedEvent.end).format("YYYY-MM-DD")
                                        : ""
                                }
                                onChange={(e) =>
                                    setSelectedEvent((prev) => ({
                                        ...prev,
                                        end: new Date(e.target.value),
                                    }))
                                }
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowDialog(false)}
                            className="px-4 text-gray-700"
                        >
                            Close
                        </Button>
                        <Button
                            onClick={handleSubmitForm}
                            className="px-4 text-white bg-green-600"
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default Timeline;
