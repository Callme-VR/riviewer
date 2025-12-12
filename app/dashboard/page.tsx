"use client";
import { useEffect, useState } from "react";
import React from "react";
import {
  GitCommit,
  GitPullRequest,
  MessageSquare,
  GitBranch,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getGithubStats, getMonthlyActivity } from "@/module/dashboard/actions";
import { constructNow } from "date-fns";
import ContributionGraph from "@/module/dashboard/components/contribution-graph";

export default function DashboardPage() {
  const { data: state, isLoading } = useQuery({
    queryKey: ["Dashboard-stats"],
    queryFn: async () => await getGithubStats(),
    refetchOnWindowFocus: false,
  });
  const { data: monthlyActivity } = useQuery({
    queryKey: ["Dashboard-monthly-activity"],
    queryFn: async () => await getMonthlyActivity(),
    refetchOnWindowFocus: false,
  });
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-xl tracking-tighter">
          Overview of Your Code activity and Ai Review of the code
        </p>
      </div>

      {/* now current div for the card componenets */}

      <div className="grid  gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Repositories
            </CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {isLoading ? "...." : state?.totalRepos}
            </div>
            <p className="text-muted-foreground text-xs">
              Connected Repositories
            </p>
          </CardContent>
        </Card>

        {/* card for total commits */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commits</CardTitle>
            <GitCommit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {isLoading ? "...." : state?.totalCommits || 0}
            </div>
            <p className="text-muted-foreground text-xs">
              Total commits in Last years
            </p>
          </CardContent>
        </Card>

        {/* card fot total prs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pull Requests
            </CardTitle>
            <GitPullRequest className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {isLoading ? "...." : state?.totalPRs || 0}
            </div>
            <p className="text-muted-foreground text-xs">
              Total pull requests across all repositories
            </p>
          </CardContent>
        </Card>

        {/* card fo ai review */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total AI Review
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {isLoading ? "...." : state?.totalReviews || 0}
            </div>
            <p className="text-muted-foreground text-xs">
              Total AI review across all repositories
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contribution Graph Activity</CardTitle>
          <CardDescription>
            Visualize your contribution activity over time
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ContributionGraph />
        </CardContent>
      </Card>

      <div className="grid  gap-4 md:grid-col-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>
              monthlyActivity Breakdown commit,pr,review(lat 6 monthly) data
            </CardDescription>
          </CardHeader>

          <CardContent>
            {isLoading?():(
                 <div classname="h-80 w-full flex items-center justify-center">
                 <Spinner />
                 </div>:(
                    <div className="h-[300px] w-full">
                    <ResponsiveContainer width={100%} height={100%}>
                    <BarChart />
                    </ResponsiveContainer>
                    </div>
                 )
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
