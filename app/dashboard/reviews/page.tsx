"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getReview } from "@/module/review/actions";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";


export default function ReviewsPage() {

    const { data: reviews, isLoading, error } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            return await getReview();
        }
    });

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error loading reviews</div>;

    return (
        <div className="space-y-4">

            <div>
                <h1 className="text-3xl font-bold tracking-tighter text-primary">
                    Code Review History
                </h1>
                <p className="text-muted-foreground">
                    View All AI Code Reviews
                </p>
            </div>

            {reviews?.length === 0 ? (
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">No reviews yet. Connect a repository and open a PR to get started.</p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {reviews?.map((review) => (
                        <Card key={review.id} className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2 flex-1">
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-lg font-bold">
                                                {review.prTitle}
                                            </CardTitle>
                                            {review.status === "Completed" && (
                                                <Badge variant="default" className="gap-1">
                                                    <CheckCircle2 className="h-3 w-3" />
                                                    Completed
                                                </Badge>
                                            )}
                                            {review.status === "Failed" && (
                                                <Badge variant="destructive" className="gap-1">
                                                    <XCircle className="h-3 w-3" />
                                                    Failed
                                                </Badge>
                                            )}
                                            {review.status === "pending" && (
                                                <Badge variant="secondary" className="gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    Pending
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span>{review.repository?.owner}/{review.repository?.name} #{review.prNumber}</span>
                                            <span>•</span>
                                            <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <Link
                                        href={review.prUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-primary hover:underline"
                                    >
                                        View PR
                                    </Link>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-6">
                                    <div className="text-sm text-muted-foreground">
                                        {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                                    </div>

                                    <div className="prose prose-sm dark:prose-invert max-w-none">
                                        <div className="bg-muted p-4 rounded-lg">
                                            <pre className="whitespace-pre-wrap">
                                                {review.review?.substring(0, 300)}....
                                            </pre>
                                        </div>
                                    </div>
                                    <Button variant={"outline"} asChild>
                                        <a href={review.prUrl} target="_blank" rel="noopener noreferrer">
                                            View Full Review on GitHub
                                        </a>
                                    </Button>

                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}