"use server";

import { Prisma } from "@prisma/client";
import prisma from "./db";
import bcrypt from "bcrypt";

export async function getPatients(authorId: string) {
  console.log(authorId, "authorId");
  const patients = await prisma.patient.findMany({
    where: {
      authorId,
    },
  });

  return patients;
}

export async function loginUser(user: { email: string; password: string }) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });
  if (!existingUser) {
    throw new Error("User not found");
  }
  const passwordMatch = await bcrypt.compare(
    user.password,
    existingUser.password
  );
  if (!passwordMatch) {
    throw new Error("Invalid password");
  }
  return existingUser;
}

export async function signUpUser(user: Prisma.UserCreateInput) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = await prisma.user.create({
    data: {
      ...user,
      password: hashedPassword,
    },
  });
  return newUser;
}

export async function createPatient(patient: Prisma.PatientCreateInput) {
  const newPatient = await prisma.patient.create({
    data: patient,
  });
  return newPatient;
}
