"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExternalLink, Star, Search } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useRepositories } from "@/module/repository/hooks/use-repositories"

interface Repository {
  id: string,
  name: string
  full_name: string,
  description: string,
  stargazers_count: number,
  html_url: string,
  language: string | null,
  topics: string[] | null,
  isConnected?: boolean
}

export default function DashboardRepositories() {
  const [localConnectingId, setLocalConnectingId] = useState<string | null>(null)
  
  const handleConnect = (repo: Repository) => {
    // Implement connect logic here
    console.log("Connecting repository:", repo.name)
    setLocalConnectingId(repo.id)
    // Simulate connection process
    setTimeout(() => {
      setLocalConnectingId(null)
    }, 1000)
  }

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useRepositories()
  
  // Add infinite scroll observer
  const observer = useRef<IntersectionObserver | null>(null)
  const lastRepositoryRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (isLoading || isFetchingNextPage) return
    
    if (observer.current) observer.current.disconnect()
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    })
    
    if (lastRepositoryRef.current) {
      observer.current.observe(lastRepositoryRef.current)
    }
    
    return () => {
      if (observer.current) observer.current.disconnect()
    }
  }, [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage])

  const [searchQuery, setSearchQuery] = useState("")
  const allRepositories = data?.pages.flatMap(page => page.data) || []

  // Filter the repositories
  const filteredRepositories = allRepositories.filter((repo: Repository) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    repo.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return <div>Loading repositories...</div>
  }

  if (isError) {
    return <div>Error loading repositories</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          Repositories
        </h1>
        <p className="text-muted-foreground text-sm">
          This is a list of your repositories. You can manage them here.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          type="text" 
          placeholder="Search repositories..." 
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid gap-4">
        {filteredRepositories.map((repo: Repository, index: number) => (
          <div 
            ref={index === filteredRepositories.length - 1 ? lastRepositoryRef : null}
            key={repo.id}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-lg">
                        {repo.name}
                      </CardTitle>
                      <Badge variant={"outline"}>
                        {repo.language || "N/A"}
                      </Badge>
                      {repo.isConnected && <Badge variant={"secondary"}>Connected</Badge>}
                    </div>

                    <CardDescription>
                      {repo.description || "No description provided"}
                    </CardDescription>
                  </div>

                  <div className="flex gap-2">
                    <Button variant={"ghost"} size={"icon"}>
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>

                    <Button
                      onClick={() => handleConnect(repo)}
                      disabled={localConnectingId === repo.id || repo.isConnected}
                      variant={repo.isConnected ? "outline" : "default"}
                    >
                      {localConnectingId === repo.id ? "Connecting..." : repo.isConnected ? "Connected" : "Connect"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
      
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <div>Loading more repositories...</div>
        </div>
      )}
    </div>
  )
}