"use client"

import { ActivityCalendar } from "react-activity-calendar"
import { useTheme } from "next-themes"
import React from "react"
import { useQuery } from "@tanstack/react-query";
import { getContributionState } from "../actions";


export default function ContributionGraph() {

  const { theme } = useTheme();
  const { data: isLoading } = useQuery({
    queryKey: ["github.contributionGraph"],
    queryFn: async () => await getContributionState(),
    staleTime: 1000 * 60 * 5

  })

  if (!isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-9">
        <div className="animate-pulse text-primary">
          Loading Contribution Data....
        </div>

      </div>
    )

  }

  if (!data || !data.contribution.length) {
    return <div>No contribution data found.</div>
  }


  return (
    <div className="w-full flex flex-col items-center gap-4 p-4">
      <div className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">
          {data?.totalContributions || 0}
        </span>
        Contributions in the last year

      </div>
      {/* for graphs */}
      <div className="w-full overflow-x-auto">
        <div className="flex justify-center min-w-max px-4">
          <ActivityCalendar data={data.contribution} colorScheme={theme === "dark" ? "dark" : "light"}
          blockMargin={4}
          fontSize={12}
          blockSize={10}
          
          />
        </div>

      </div>
    </div>
  )


































  return <div>Contribution Graph</div>
}
function getGithubContributionGraph(): any {
  throw new Error("Function not implemented.");
}

