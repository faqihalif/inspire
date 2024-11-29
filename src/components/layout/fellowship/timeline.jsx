import React, { useState, useCallback } from "react";

// // Layout
// import Fellowship from '@/Layout/Fellowship/Fellowship';

// momentjs
import moment from "moment";

// React Big Calendar
import { Calendar, momentLocalizer } from "react-big-calendar";
import "@/styles/react-big-calendar.css";

import useWindowSize from "@/hooks/use-window-size";

// Components
import EventCreateDialog from "./event-create-dialog";
import EventEditDialog from "./event-edit-dialog";

const Timeline = (props) => {
    // Dummy data for events and doctors
    const dummyEvents = [
        {
            id: 1,
            title: "Clinic",
            type: "Poli",
            supervising_doctor: "Dr. John Doe",
            activity_photo: null,
            present: "Hadir",
            start: new Date("2024-11-26"),
            end: new Date("2024-11-26"),
        },
        {
            id: 2,
            title: "Wetlab Training",
            type: "Wetlab",
            supervising_doctor: "Dr. Jane Smith",
            activity_photo: null,
            present: null,
            start: new Date("2024-11-27"),
            end: new Date("2024-11-27"),
        },
        {
            id: 3,
            title: "Wetlab Training",
            type: "Wetlab",
            supervising_doctor: "Dr. Jane Smith",
            activity_photo: null,
            present: null,
            start: new Date("2024-11-27"),
            end: new Date("2024-11-27"),
        },
    ];
    const dummyDoctors = [
        { value: "12345", label: "Dr. John Doe" },
        { value: "67890", label: "Dr. Jane Smith" },
    ];

    // useState
    const [myEvents, setMyEvents] = useState(dummyEvents);
    const [event, setEvent] = useState({ start: "", end: "" });
    const [doctors] = useState(dummyDoctors);
    const [showEventEditDialog, setShowEventEditDialog] = useState(false);
    const [showEventCreateDialog, setShowEventCreateDialog] = useState(false);

    // Window Size
    const windowSize = useWindowSize();

    // Add Event

    const handleShowEventCreateDialog = (slotInfo) => {
        // Cek jika slotInfo start dan end ada, jika tidak set ke null
        const startDate = slotInfo.start ? new Date(slotInfo.start) : null;
        const endDate = slotInfo.end ? new Date(slotInfo.end) : null;

        setEvent({
            start: startDate
                ? new Date(startDate.setDate(startDate.getDate() + 1))
                    .toISOString()
                    .split("T")[0]
                : null,
            end: endDate ? endDate.toISOString().split("T")[0] : null,
        });

        setShowEventCreateDialog(true);
    };

    // Show Event
    const handleShowEvent = useCallback((event) => {
        setShowEventEditDialog(true);
        setEvent(event);
    }, []);

    // Change Sunday to red
    const dayPropGetter = useCallback(
        (date) => ({
            ...(moment(date).day() === 0 && {
                style: {
                    backgroundColor: "#fee2e2",
                },
            }),
        }),
        []
    );

    return (
        <React.Fragment>
            {/* Header */}
            <div className="flex items-end justify-end">
                <div>
                    {/* Add Activity Button */}
                    <button
                        type="button"
                        className="px-4 py-1 text-sm font-semibold text-white bg-black rounded"
                        onClick={() =>
                            handleShowEventCreateDialog({ start: null, end: null })
                        }
                    >
                        Add Activity
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col w-full h-full overflow-auto">
                <div className="p-2">
                    <Calendar
                        dayLayoutAlgorithm="no-overlap"
                        localizer={momentLocalizer(moment)}
                        onSelectEvent={handleShowEvent}
                        onSelectSlot={handleShowEventCreateDialog}
                        selectable
                        style={{ height: 800 }}
                        events={myEvents}
                        dayPropGetter={dayPropGetter}
                        components={{
                            event: CustomEvent,
                        }}
                    />
                </div>

                <div className="p-2">
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
            </div>

            {/* Edit Event */}
            {showEventEditDialog && (
                <EventEditDialog
                    show={showEventEditDialog}
                    setShow={setShowEventEditDialog}
                    size="sm"
                    event={event}
                    setEvent={setEvent}
                    doctors={doctors}
                />
            )}

            {/* Create Event */}
            {showEventCreateDialog && (
                <EventCreateDialog
                    show={showEventCreateDialog}
                    setShow={setShowEventCreateDialog}
                    size="sm"
                    event={event}
                    setEvent={setEvent}
                    doctors={doctors}
                    fellowship={props.fellowship}
                />
            )}
        </React.Fragment>
    );
};

// // Render Layout
// Timeline.layout = (page) => {
//     return <Fellowship children={page} />;
// };

const CustomEvent = ({ event }) => {
    return (
        <React.Fragment>
            {event.type === "Poli" ? (
                event.present === "Hadir" ? (
                    <p className="px-1 py-0.5 text-sm font-semibold text-white bg-green-600 rounded">
                        {event.title}
                    </p>
                ) : event.present === "Cuti" || event.present === "Sakit" ? (
                    <p className="px-1 py-0.5 text-sm font-semibold text-white bg-red-600 rounded">
                        {event.title}
                    </p>
                ) : (
                    <p className="px-1 py-0.5 text-sm font-semibold text-white bg-blue-900 rounded">
                        {event.title}
                    </p>
                )
            ) : event.type === "National Holiday" ? (
                <p className="px-1 py-0.5 text-sm font-semibold text-white bg-red-600 rounded">
                    {event.title}
                </p>
            ) : (
                <p className="px-1 py-0.5 text-sm font-semibold text-white bg-yellow-600 rounded">
                    {event.title}
                </p>
            )}
        </React.Fragment>
    );
};

export default Timeline;
