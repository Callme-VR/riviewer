"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function getUserProfile() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      }
    })

    return user;

  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

export async function updateUserProfile(data: { name?: string, email?: string }) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        name: data.name,
        email: data.email
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      }
    })

    revalidatePath("/dashboard/settings","page");
    return {
      success:true,
      user:updatedUser
    };

  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}