import AddPatientDetails from "@/components/custom/add-patient-details";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col  h-screen">
      <Button className="mb-8 self-start">
        <Link href="/normal-values">Go to Normal Values</Link>
      </Button>

      <p className="text-2xl font-bold mb-8">
        Add Patient Details (Don&apos;t use this)
      </p>
      <AddPatientDetails />
    </div>
  );
}
