"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getConnectecdRepository,
  DisConnectecdRepository,
  DisConnectedAllRepository,
} from "../action";
import { toast } from "sonner";
import { useState } from "react";

import { AlertTriangle, ExternalLink, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";

export default function RepositoryList() {
  const queryClient = useQueryClient();
  const [disconnectallOpen, setDisconnectallOpen] = useState(false);

  const { data: repositories, isLoading } = useQuery({
    queryKey: ["connected-repositoriess"],
    queryFn: async () => await getConnectecdRepository(),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });

  const disconnectMutation = useMutation({
    mutationFn: async (RepositoryId: string) => {
      return await DisConnectecdRepository(RepositoryId);
    },
    onSuccess: (result) => {
      if (result?.success) {
        queryClient.invalidateQueries({
          queryKey: ["connected-repositoriess"],
        });
        queryClient.invalidateQueries({
          queryKey: ["dashboard-stats"],
        });
        toast.success("Repository disconnected successfully");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to disconnect repository");
    },
  });

  const disconnectAllMutation = useMutation({
    mutationFn: async () => {
      return await DisConnectedAllRepository();
    },
    onSuccess: (result) => {
      if (result?.success) {
        queryClient.invalidateQueries({
          queryKey: ["connected-repositoriess"],
        });
        queryClient.invalidateQueries({
          queryKey: ["dashboard-stats"],
        });
        toast.success(`Successfully disconnected ${result.count} repositories`);
        setDisconnectallOpen(false);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to disconnect all repositories");
    },
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Connected Repositories</CardTitle>
            <CardDescription>
              Manage Your Connected Github Repositories
            </CardDescription>
          </div>
          {/* if repositories fetches */}
          {repositories && repositories?.length > 0 && (
            <AlertDialog
              open={disconnectallOpen}
              onOpenChange={setDisconnectallOpen}
            >
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4 cursor-pointer" />
                  Disconnect All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive cursor-pointer" />
                    Disconnect All
                  </AlertDialogTitle>

                  <AlertDialogDescription>
                    This will disconnect all {repositories?.length} repositories
                    and delete all associated AI reviews.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => disconnectAllMutation.mutate()}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    disabled={disconnectAllMutation.isPending}
                  >
                    {disconnectAllMutation.isPending
                      ? "Disconnecting..."
                      : "Disconnect All"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-20 bg-muted rounded"></div>
            <div className="h-20 bg-muted rounded"></div>
            <div className="h-20 bg-muted rounded"></div>
          </div>
        ) : repositories && repositories.length > 0 ? (
          <div className="space-y-4">
            {repositories.map((repo) => (
              <div
                key={repo.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="font-medium">{repo.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {repo.owner}
                    </p>
                  </div>
                  <Badge variant="secondary">Connected</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View
                    </a>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => disconnectMutation.mutate(repo.id)}
                    disabled={disconnectMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Disconnect
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No connected repositories found.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
