"use client";
import React from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { User, X } from "lucide-react";

export default function Page() {
    return (
        <div className="container p-4 mx-auto">
            {/* Personal Information Section */}
            <div className="p-6 mb-6 bg-white rounded-lg shadow-lg">
                <h2 className="mb-4 text-xl font-semibold">Personal Information</h2>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                    {/* Profile Picture */}
                    <div className="w-[150px] h-[150px]">
                        <Avatar className="w-[150px] h-[150px]">
                            <AvatarFallback>
                                <User className="w-[75px] h-[75px] text-gray-500" />
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    {/* Name and Institution */}
                    <div className="flex-grow">
                        <label className="block text-sm font-medium">Name</label>
                        <Input value="Dr Sri Mariati, SpM" readOnly className="mt-1" />
                        <label className="block mt-4 text-sm font-medium">
                            Institution
                        </label>
                        <Input
                            value="RSUD dr Soedomo Trenggalek"
                            readOnly
                            className="mt-1"
                        />
                    </div>
                </div>

                {/* Program and Service */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium">Program</label>
                        <select className="block w-full p-2 mt-1 text-sm bg-gray-200 border border-gray-300 rounded-md">
                            <option value="">Fellowship</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Service</label>
                        <select className="block w-full p-2 mt-1 text-sm bg-gray-200 border border-gray-300 rounded-md">
                            <option value="">Retina</option>
                        </select>
                    </div>
                </div>

                {/* Start Date and End Date */}
                <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium">Start Date</label>
                        <select className="block w-full p-2 mt-1 text-sm bg-gray-200 border border-gray-300 rounded-md">
                            <option value="">--Select--</option>
                            <option value="2024-01-01">2024-01-01</option>
                            <option value="2024-02-01">2024-02-01</option>
                            <option value="2024-03-01">2024-03-01</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">End Date</label>
                        <select className="block w-full p-2 mt-1 text-sm bg-gray-200 border border-gray-300 rounded-md">
                            <option value="">--Select--</option>
                            <option value="2024-06-01">2024-06-01</option>
                            <option value="2024-07-01">2024-07-01</option>
                            <option value="2024-08-01">2024-08-01</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                </div>

                {/* Locations */}
                <div className="mt-4">
                    <label className="block text-sm font-medium">Location</label>
                    <div className="flex flex-wrap gap-2 p-2 bg-gray-300 rounded-md">
                        {[
                            "JEC @ Kedoya",
                            "JEC @ Menteng",
                            "JEC - Primasana @ Tj. Priok",
                        ].map((location, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Badge variant="outline" readOnly className="mt-1 bg-gray-200">
                                    {location}
                                    <button
                                        type="button"
                                        className="ml-2 text-gray-600 hover:text-gray-800"
                                        onClick={() => {
                                            console.log(`Remove ${location}`);
                                        }}
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lecturers */}
                <div className="mt-4">
                    <label className="block text-sm font-medium">Lecturer</label>
                    <div className="flex flex-wrap gap-2 p-2 bg-gray-300 rounded-md">
                        {[
                            "Dr. Soedarman Sjamsoe, SpM(K)",
                            "Dr. Waldesnius Girsang, SpM(K)",
                            "Dr. Elvioza, SpM(K)",
                            "Dr. Referano Agustiawan, SpM(K)",
                            "Dr. Cosmos O. Mangunsong, SpM(K)",
                            "Dr. Gitalisa Andayani, SpM(K)",
                            "Dr. Ferdiriva Hamzah, SpM(K)",
                            "Dr. Soefiandi Soedarman, SpM(K)",
                            "Dr. Wahyu Kartika Andayani, SpM",
                            "Dr. Martin Hertanto, SpM",
                            "Dr. Joshua P. F. Lumbantobing, SpM",
                            "Dr. Mario Marbungaran Hutapea, SpM(K)",
                            "Dr. King Hans Kurnia, SpM",
                            "Dr. Melita Suwan Djaja, SpM",
                            "Dr. Elyas Aditya Pradana, SpM",
                            "Dr. Astriwiani Switania Sari Dirgahayu, SpM",
                        ].map((lecturer, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Badge variant="outline" readOnly className="mt-1 bg-gray-200">
                                    {lecturer}
                                    <button
                                        type="button"
                                        className="ml-2 text-gray-600 hover:text-gray-800"
                                        onClick={() => {
                                            console.log(`Remove ${lecturer}`);
                                        }}
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Save Button */}
                <div className="mt-6">
                    <Button
                        variant="primary"
                        className="w-full text-white bg-gray-600 sm:w-auto"
                        onClick={() => {
                            console.log("berhasil disimpan");
                        }}
                    >
                        Save
                    </Button>
                </div>
            </div>

            {/* Contact Section */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
                <h2 className="mb-4 text-xl font-semibold">Contact</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <Input
                            type="email"
                            value="dr.sri.mariati@gmail.com"
                            readOnly
                            className="mt-1 bg-gray-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Phone Number</label>
                        <Input type="tel" value="082135809795" readOnly className="mt-1" />
                    </div>
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium">Address</label>
                    <Textarea
                        value="Jl. Panglima Sudirman No. 51 Kelurahan Sumbergedong Kecamatan Trenggalek Kabupaten Trenggalek 66315"
                        rows={3}
                        className="mt-1"
                        readOnly
                    />
                </div>
                {/* Save Button */}
                <div className="mt-6">
                    <Button
                        variant="primary"
                        className="w-full text-white bg-gray-600 sm:w-auto"
                        onClick={() => {
                            console.log("berhasil disimpan");
                        }}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}
