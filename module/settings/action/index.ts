"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { deleteWebhook } from "@/module/github/lib/github";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { success } from "zod";

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

    revalidatePath("/dashboard/settings", "page");
    return {
      success: true,
      user: updatedUser
    };

  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}

export async function getConnectecdRepository() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })
    if (!session?.user) {
      throw new Error("Unauthorized")
    }

    const repositories = await prisma.repository.findMany({
      where: {
        userId: session.user.id
      }, select: {
        id: true,
        name: true,
        owner: true,
        url: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    return repositories;
  } catch (error) {
    console.error("Error fetching connected repositories:", error);
    throw error;
  }
}


export async function DisConnectecdRepository(repositoryId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })
    if (!session?.user) {
      throw new Error("Unauthorized")
    }
    
    const repository = await prisma.repository.findFirst({
      where: {
        id: repositoryId,
        userId: session.user.id,
      }
    })
    
    if (!repository) {
      throw new Error("Repository not found")
    }

    await deleteWebhook(repository.name, repository.owner);

    await prisma.repository.delete({
      where: {
        id: repositoryId,
        userId: session.user.id
      }
    });

    revalidatePath("/dashboard/settings", "page");
    revalidatePath("/dashboard/repository", "page");

    return { success: true };
  } catch (error) {
    console.error("Error disconnecting repository:", error);
    throw error;
  }
}



export async function DisConnectedAllRepository() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const repositories = await prisma.repository.findMany({
      where: {
        userId: session.user.id
      }
    })

    await Promise.all(repositories.map(async (repo) => {
      await deleteWebhook(repo.name, repo.owner)
    }))


    // delete all webhooks
    const result = await prisma.repository.deleteMany({
      where: {
        userId: session.user.id
      }
    })

    revalidatePath("/dashboard/settings");
    revalidatePath("/dashboard/repository");
    return { success: true, count: result.count }

  } catch (error) {
    console.error("Error disconnecting all repositories:", error);
    throw error;
  }
}