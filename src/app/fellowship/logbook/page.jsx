"use client";

import { useState } from "react";
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

import { Download, Eye, Plus } from "lucide-react";

export default function Page() {
    const [logbookData, setLogbookData] = useState([
        {
            logbookName: "Logbook Patient",
            mrNumber: "001-040-64-80",
            patientName: "Troesno djati prakoso",
            supervisingDoctor: "Dr. Referano Agustiawan, SpM(K)",
            date: "2024-10-21",
        },
        {
            logbookName: "Logbook Patient",
            mrNumber: "002-005-72-9_",
            patientName: "Juhono satya sudirgo",
            supervisingDoctor: "Dr. Referano Agustiawan, SpM(K)",
            date: "2024-10-21",
        },
        {
            logbookName: "Logbook Patient",
            mrNumber: "001-028-65-61",
            patientName: "Evi yanti",
            supervisingDoctor: "Dr. Referano Agustiawan, SpM(K)",
            date: "2024-10-21",
        },
        {
            logbookName: "Logbook Patient",
            mrNumber: "001-040-64-63",
            patientName: "Banun zinatul hayati",
            supervisingDoctor: "Dr. Referano Agustiawan, SpM(K)",
            date: "2024-10-21",
        },
        {
            logbookName: "Logbook Patient",
            mrNumber: "001-037-28-24",
            patientName: "Budhi santoso",
            supervisingDoctor: "Dr. Referano Agustiawan, SpM(K)",
            date: "2024-10-21",
        },
        {
            logbookName: "Logbook Patient",
            mrNumber: "001-040-64-76",
            patientName: "Tan soi suan",
            supervisingDoctor: "Dr. Referano Agustiawan, SpM(K)",
            date: "2024-10-21",
        },
        {
            logbookName: "Logbook Patient",
            mrNumber: "001-039-89-41",
            patientName: "Prisnaresmi sh",
            supervisingDoctor: "Dr. Referano Agustiawan, SpM(K)",
            date: "2024-10-21",
        },
    ]);

    const [searchQuery, setSearchQuery] = useState("");

    const filteredData = logbookData.filter(
        (logbook) =>
            logbook.supervisingDoctor
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            logbook.logbookName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="min-h-screen p-6 text-gray-800 bg-gray-100">
            <div className="flex items-center justify-between mb-4">
                {/* Create Logbook button on the left */}
                <Button
                    className="flex items-center mr-5"
                    onClick={() => {
                        console.log("Berhasil Create Logbook!!");
                    }}
                >
                    <Plus className="mr-2" /> Create Logbook
                </Button>
                {/* Download button and search input on the right */}
                <div className="flex items-center space-x-4">
                    <Button
                        className="flex items-center mr-5"
                        onClick={() => {
                            console.log("Berhasil Download");
                        }}
                    >
                        <Download className="mr-2" /> Download
                    </Button>
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="p-2 border rounded-lg"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {/* Logbook Table */}
            <div className="bg-white rounded-lg shadow-lg">
                <Table>
                    <TableHeader className="text-black bg-gray-300">
                        <TableRow>
                            <TableHead>LOGBOOK NAME</TableHead>
                            <TableHead>MR NUMBER</TableHead>
                            <TableHead>PATIENT NAME</TableHead>
                            <TableHead>SUPERVISING DOCTER</TableHead>
                            <TableHead>DATE</TableHead>
                            <TableHead>VIEW</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.length > 0 ? (
                            filteredData.map((logbook, index) => (
                                <TableRow key={index}>
                                    <TableCell>{logbook.logbookName}</TableCell>
                                    <TableCell>{logbook.mrNumber}</TableCell>
                                    <TableCell>{logbook.patientName}</TableCell>
                                    <TableCell>{logbook.supervisingDoctor}</TableCell>
                                    <TableCell>{logbook.date}</TableCell>
                                    <TableCell>
                                        <Button
                                            className="flex items-center"
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
                                <TableCell colSpan="6" className="text-center text-gray-500">
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
