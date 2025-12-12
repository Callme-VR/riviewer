"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { connectrepository } from "../actions";
import { toast } from "sonner";

export const useConnectRepository = () => {
  const querClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      owner,
      repo,
      githubId,
    }: {
      owner: string;
      repo: string;
      githubId: number;
    }) => {
      return await connectrepository(owner, repo, githubId);
    },

    onSuccess: () => {
      toast.success("Repository is connected Succeessfully");
      querClient.invalidateQueries({ queryKey: ["repositories"] });
    },
    onError:()=>{
        toast.error("Failed to connect repository");
        console.error("Failed to connect repository");
    }
  });
};
