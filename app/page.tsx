import AddPatientDetails from "@/components/custom/add-patient-details";
import LoginBtn from "@/components/custom/login-btn";

export default function Home() {
  return (
    <div className="flex flex-col  h-screen">
      <LoginBtn />
      <AddPatientDetails />
    </div>
  );
}
