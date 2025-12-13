"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, updateUserProfile } from "../action";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProfileForm() {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { data: profile, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => await getUserProfile(),
    staleTime: 6 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // Initialize form with profile data when it loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setEmail(profile.email || "");
    }
  }, [profile]);

  const updateMutation = useMutation({
    mutationFn: async (data: { name: string; email: string }) => {
      return await updateUserProfile(data);
    },
    onSuccess: (Result) => {
      if (Result.success) {
        queryClient.invalidateQueries({ queryKey: ["user-profile"] });

        toast.success("profile update sucessfully");
      }
    },
    onError: () => {
      toast.error("update profile failed");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMutation.mutate({ name, email });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle> Profile Settings</CardTitle>
        <CardDescription>Update your profile informations</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">
              Full Name
              <Input
                id="name"
                placeholder="Enter your New Name..."
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                disabled={updateMutation.isPending}
              />
            </Label>
          </div>

          <div className="space-x-4">
            <Label htmlFor="email">
              Email
              <Input
                id="email"
                placeholder="Enter You Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={updateMutation.isPending}
              />
            </Label>
          </div>

          {/* buttons componene */}
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Saving" : "Save changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
