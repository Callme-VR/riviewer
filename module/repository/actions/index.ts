"use server"

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { getRepositories } from "@/module/github/lib/github";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const fetchrepositories = async (page: number = 1, perPage: number = 10) => {
  try {
    // currently logged user data
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const githubrepos = await getRepositories(page, perPage);

    const dbrepos = await prisma.repository.findMany({
      where: {
        userId: session.user.id
      }
    });
    
    const connectedreposids = new Set(dbrepos.map((repo) => repo.githubId));

    const filteredRepos = githubrepos.filter((repo) => !connectedreposids.has(BigInt(repo.id)));

    return NextResponse.json({
      data: githubrepos.map((repo) => ({
        ...repo,
        isconnected: connectedreposids.has(BigInt(repo.id))
      })),
      nextPage: page + 1,
      hasNextPage: filteredRepos.length > 0
    });
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return NextResponse.json({ error: "Failed to fetch repositories" }, { status: 500 });
  }
};