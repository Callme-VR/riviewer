"use server"

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { getRepositories } from "@/module/github/lib/github";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const fetchrepositories = async (page: number = 1, perPage: number = 10) => {
     // currently loggend user data
     const session = await auth.api.getSession({
          headers: await headers(),
     })
     if (!session) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
     }
     const githubrepos = await getRepositories(page, perPage);

     const dbrepos = await prisma.repository.findMany({
          where: {
               userId: session.user.id
          }
     })
     const connnectedreposids = new Set(dbrepos.map((repo => repo.githubId)))

     const newrepos = githubrepos.filter((repo) => !connnectedreposids.has(BigInt(repo.id)))

     return NextResponse.json(githubrepos.map((repo) => ({
          ...repo,
          isconnected: connnectedreposids.has(BigInt(repo.id))
     })))

}
