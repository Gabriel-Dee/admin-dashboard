"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PersonalInfo from "@/app/components/child-personal-info";
import ActivityLog from "@/app/components/patient-activity-log";
import NavigationMenu from "@/app/components/graphs/graph-tabs";

const Profile: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [selectedChildData, setSelectedChildData] = useState<any | null>(null);

  console.log("This is the id");
  console.log(id);
  console.log(selectedChildData);

  useEffect(() => {
    if (id) {
      fetch(`http://127.0.0.1:8000/child/${id}/`)
        .then((res) => res.json())
        .then((data) => setSelectedChildData(data))
        .catch((error) =>
          console.error("Error fetching child data:", error)
        );
    }
  }, []);

  if (!selectedChildData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-xl pb-8 border border-rchsLight">
        <div className="w-full h-[200px] bg-rchs rounded-lg"></div>
        <div className="flex flex-col items-center -mt-20">
          <Image
            src="/avatar/me.png"
            className="w-40 border-4 border-white rounded-full"
            alt="Profile Image"
            width={200}
            height={200}
          />
          <div className="flex items-center space-x-2 mt-2">
            {selectedChildData && (
              <p className="text-2xl">{selectedChildData.child_name}</p>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
          <div className="flex items-center space-x-4 mt-2">
            <Link href={"/Visits"}>
              <Button className="flex items-center bg-rchs hover:bg-rchsLight text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                <span>New Visit</span>
              </Button>
            </Link>
            <Button className="flex items-center bg-rchs hover:bg-rchsLight text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
              <span>New Appointment</span>
            </Button>
            <Button className="flex items-center bg-rchs hover:bg-rchsLight text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
              <span>Generate Report</span>
            </Button>
          </div>
        </div>
      </div>
      <PersonalInfo />
      <ActivityLog />
      <NavigationMenu />
    </>
  );
};

export default Profile;
