"use client";

import { useState } from "react";
import { Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function AttendancePage() {
    const [attendanceData, setAttendanceData] = useState([
        {
            date: "2024-09-03",
            hour: "08:56",
            activity: "Poli JEC @Menteng, Operasi JEC @Menteng",
            doctor: "DR. Dr. Cosmos O. Mangunsong, SpM(K)",
        },
        {
            date: "2024-09-04",
            hour: "13:57",
            activity: "Poli JEC @Kedoya",
            doctor: "Dr. Soedarman Sjamsoe, SpM(K)",
        },
        {
            date: "2024-09-05",
            hour: "13:34",
            activity: "Poli JEC @Menteng, Rawat Inap (Kontrol Pasien)",
            doctor: "Dr. Soedarman Sjamsoe, SpM(K)",
        },
        {
            date: "2024-09-06",
            hour: "17:10",
            activity: "Poli JEC @Kedoya, Operasi JEC @Kedoya",
            doctor: "DR. Dr. Gitalisa Andayani, SpM(K)",
        },
    ]);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredData = attendanceData.filter(
        (attendance) =>
            attendance.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
            attendance.doctor.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="min-h-screen p-6 text-gray-800 bg-gray-100">
            {/* Header with Download and Search */}
            <div className="flex items-end justify-end mb-4">
                <Button
                    className="flex items-center mr-5"
                    onClick={() => {
                        console.log("Berhasil Download");
                    }}
                >
                    <Download className="mr-2" /> Download
                </Button>
                <div className="flex items-center space-x-4">
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="p-2 border rounded-lg"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {/* Attendance Table */}
            <div className="bg-white rounded-lg shadow-lg">
                <Table>
                    <TableHeader className="text-black bg-gray-300">
                        <TableRow>
                            <TableHead>DATE</TableHead>
                            <TableHead>HOUR</TableHead>
                            <TableHead>ACTIVITY</TableHead>
                            <TableHead>SUPERVISING DOCTER</TableHead>
                            <TableHead>VIEW</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.length > 0 ? (
                            filteredData.map((attendance, index) => (
                                <TableRow key={index}>
                                    <TableCell>{attendance.date}</TableCell>
                                    <TableCell>{attendance.hour}</TableCell>
                                    <TableCell>{attendance.activity}</TableCell>
                                    <TableCell>{attendance.doctor}</TableCell>
                                    <TableCell>
                                        <Button
                                            className="flex items-center mr-5"
                                            onClick={() => {
                                                console.log("Berhasil Preview");
                                            }}
                                        >
                                            <Eye />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="4" className="text-center text-gray-500">
                                    No data available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
