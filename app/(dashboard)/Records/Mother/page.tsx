import { options } from "@/app/api/auth/[...nextauth]/options";
import MotherRecords from "@/app/components/mother-records";

import {
  TableCard,
  TableCardContent,
  TableCardDescription,
  TableCardHeader,
  TableCardTitle,
} from "@/components/ui/table-card";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Records() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Records/Mother");
  }

  return (
    <>
      <div className="flex-1 space-y-4">
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-7">
          <TableCard className="lg:col-span-12 border-2">
            <TableCardHeader>
              <TableCardTitle>Mother Records</TableCardTitle>
              <TableCardDescription>
                This is a table containing a List of Mothers
              </TableCardDescription>
            </TableCardHeader>
            <TableCardContent>
              <MotherRecords motherAttendanceData={[]} />
            </TableCardContent>
          </TableCard>
        </div>
      </div>
    </>
  );
}