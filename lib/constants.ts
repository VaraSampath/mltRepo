export const patients = [
  {
    id: 1,
    date: new Date(),
    name: "John Doe",
    age: 25,
    gender: "Male",
    phone: "1234567890",
    village: "Village 1",
    amount: 1000,
    refferedBy: "Dr. Smith",
  },
  {
    id: 2,
    date: new Date(),
    name: "Jane Doe",
    age: 25,
    gender: "Female",
    phone: "1234567890",
    village: "Village 2",
    amount: 1000,
    refferedBy: "Dr. Smith",
  },
];

export const doctors = [
  {
    id: 1,
    name: "Dilip Kumar",
    address: "KGM",
  },
  {
    id: 2,
    name: "CH. Jagadheesh, MBBS",
    address: "Koyyalagudem",
  },
];

export const testGroups = [
  { value: "hemogram", label: "Hemogram/CBP/Blood Coagulation/PTT" },
  { value: "diabaties", label: "Diabaties/Bio Chemistry" },
  { value: "urine", label: "Urine/Microscope" },
  { value: "stool", label: "Stool/Semen" },
  { value: "lipid", label: "Lipid/RFT/Serum" },
  { value: "serology", label: "Serology" },
  { value: "hormones", label: "Hormones" },
];
