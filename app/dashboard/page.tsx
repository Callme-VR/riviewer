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

    // Loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground text-xl tracking-tighter">
                    Overview of Your Code activity and AI Review of the code
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Repositories
                        </CardTitle>
                        <GitBranch className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold">
                            {state?.totalRepos || 0}
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
                            {state?.totalCommits || 0}
                        </div>
                        <p className="text-muted-foreground text-xs">
                            Total commits in Last years
                        </p>
                    </CardContent>
                </Card>
                {/* card for total prs */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Pull Requests
                        </CardTitle>
                        <GitPullRequest className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold">
                            {state?.totalPRs || 0}
                        </div>
                        <p className="text-muted-foreground text-xs">
                            Total pull requests across all repositories
                        </p>
                    </CardContent>
                </Card>
                {/* card for ai review */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total AI Review
                        </CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold">
                            {state?.totalReviews || 0}
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
            {/* this div for the footer graphs  */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Activity Overview</CardTitle>
                        <CardDescription>
                            Monthly breakdown of commits, PRs, and reviews (last 6 months)
                        </CardDescription>
                    </CardHeader>


                    {/* try to understand this componenets */}
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyActivity}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="commits" fill="#8884d8" name="Commits" />
                                    <Bar dataKey="prs" fill="#82ca9d" name="Pull Requests" />
                                    <Bar dataKey="reviews" fill="#ffc658" name="AI Reviews" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>

                </Card>
            </div>
        </div>
    );
}