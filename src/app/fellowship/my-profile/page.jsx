"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import useWindowSize from "@/hooks/use-window-size";

export default function Page() {
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
            <BreadcrumbPage>My Profile</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <CardTitle className="mb-4 text-left">Personal Information</CardTitle>
          <div className="flex justify-center items-center">
            <Avatar className="w-[150px] h-[150px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex w-full gap-4 mb-4">
            <div className="flex flex-col w-1/2 gap-2">
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" placeholder="Name" />
            </div>
            <div className="flex flex-col w-1/2 gap-2 ">
              <Label htmlFor="institution">Institution</Label>
              <Input type="text" id="institution" placeholder="Institution" />
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex flex-col w-1/4 gap-2">
              <Label htmlFor="program">Program</Label>
              <Select>
                <SelectTrigger disabled className="w-full">
                  <SelectValue placeholder="Fellowship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="program1">Fellowship</SelectItem>
                  <SelectItem value="program2">Program 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col w-1/4 gap-2">
              <Label htmlFor="service">Service</Label>
              <Select>
                <SelectTrigger disabled className="w-full">
                  <SelectValue placeholder="Retina" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service1">Retina</SelectItem>
                  <SelectItem value="service2">Service 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col w-1/4 gap-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                type="text"
                id="start-date"
                placeholder="01/01/2024"
                disabled
                className="bg-gray-200"
              />
            </div>
            <div className="flex flex-col w-1/4 gap-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                type="text"
                id="end-date"
                placeholder="01/01/2025"
                disabled
                className="bg-gray-200"
              />
            </div>
          </div>

          <div className="flex w-full gap-4 mt-4">
            <div className="flex flex-col w-1/2 gap-2">
              <Label htmlFor="location">Location</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="location1">
                    <Badge>JEC @ Kedoya</Badge>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col w-1/2 gap-2">
              <Label htmlFor="lecture">Lecture</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Lecture" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lecture1">
                    <Badge>Dr. Soedarman Sjamsoe, SpM(K)</Badge>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            onClick={() =>
              console.log("Personal information berhasil disimpan")
            }
          >
            Save
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex w-full gap-4 mb-4">
            <div className="flex flex-col w-1/2 gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                disabled
                placeholder="dr.sri.mariati@gmail.com"
              />
            </div>
            <div className="flex flex-col w-1/2 gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" placeholder="Type your message here." />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            onClick={() => console.log("Contact berhasil disimpan")}
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
