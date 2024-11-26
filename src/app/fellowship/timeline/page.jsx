"use client";

import "@/styles/react-big-calendar.css"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
// import Calendar from "@/components/layout/fellowship/calender";
import Timeline from "@/components/layout/fellowship/timeline";

import useWindowSize from "@/hooks/use-window-size";

export default function Page() {
  // Mendapatkan ukuran window
  const windowSize = useWindowSize();

  return (
    <div
      className="p-4 space-y-8 overflow-auto"
      style={{
        maxWidth: windowSize.width > 768 ? windowSize.width - 256 : "100%",
      }}
    >
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Timeline</BreadcrumbPage> {/* Ganti teks di sini */}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* <Calendar /> */}
      <Timeline />
    </div>
  );
}
