"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function getUserProfile() {
  try {
    const session = await auth.api.getSession({
      headers: headers(),
    });
    if (!session?.user) {
      throw new Error("Unauthorized");
    }





















    
  } catch (error) {}
}
