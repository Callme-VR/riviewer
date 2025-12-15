"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2, ExternalLink, RefreshCw } from "lucide-react";
import { checkout, customer } from "@/lib/payment-actions";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, Suspense } from "react";
import { toast } from "sonner";
import {
  GetSubscriptionData,
  syncSubscriptionStatus,
} from "@/module/payment/action";
import { Spinner } from "@/components/ui/spinner";
import { UserLimits } from "@/module/payment/subscriptions";

interface SubscriptionData {
  user: {
    id: string;
    name: string;
    email: string;
    polarCustomerId: string | null;
    subscriptionStatus: string | null;
    subscriptionTier: string | null;
    polarSubscriptionId: string | null;
  } | null;
  limits: UserLimits | null;
}

// Wrapper function to handle the server action properly
const fetchSubscriptionData = async (): Promise<SubscriptionData> => {
  try {
    // Call the server action
    const result = await GetSubscriptionData();
    return result;
  } catch (error) {
    console.error("Error fetching subscription data:", error);
    throw error;
  }
};

const PLAN_FEATURES = {
  free: [
    {
      name: "Up to 10 repositories",
      includes: true,
    },
    {
      name: "Up to 10 Reviews per repository",
      includes: true,
    },
    {
      name: "Basic code review",
      includes: true,
    },
    {
      name: "Community support",
      includes: true,
    },
    {
      name: "Advanced analysis",
      includes: false,
    },
    {
      name: "Priority support",
      includes: false,
    },
  ],
  pro: [
    {
      name: "Unlimited repositories",
      includes: true,
    },
    {
      name: "Unlimited Reviews per repository",
      includes: true,
    },
    {
      name: "Advanced code review",
      includes: true,
    },
    {
      name: "Priority support",
      includes: true,
    },
    {
      name: "Email support",
      includes: true,
    },
    {
      name: "Advanced analysis",
      includes: true,
    },
  ],
};

// Loading component for Suspense fallback
function SubscriptionsLoading() {
  return (
    <div className="flex h-full justify-center items-center min-h-screen">
      <Spinner />
    </div>
  );
}

// Main subscription content component
function SubscriptionsContent() {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  const { data, error, refetch, isLoading } = useQuery<SubscriptionData>({
    queryKey: ["subscriptions-data"],
    queryFn: fetchSubscriptionData,
    refetchOnWindowFocus: true,
    retry: false,
  });

  const currentTier = data?.user?.subscriptionTier?.toLowerCase() as
    | "free"
    | "pro"
    | undefined;
  const isPro = currentTier === "pro";

  const handleSync = async () => {
    setSyncLoading(true);
    try {
      const result = await syncSubscriptionStatus();
      if (result.success) {
        toast.success("Subscription status synced successfully");
        refetch();
      }
    } catch {
      toast.error("Failed to sync subscription status");
    } finally {
      setSyncLoading(false);
    }
  };

  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true);
      const result = await checkout();
      
      if (result.error) {
        toast.error(result.error);
        return;
      }
      
      // Success - redirect will happen automatically
      toast.success("Redirecting to checkout...");
    } catch (error) {
      toast.error("Failed to start checkout process");
      console.error("Checkout error:", error);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handlePortal = async () => {
    try {
      setPortalLoading(true);
      const result = await customer.portal();
      
      if (result.error) {
        toast.error(result.error);
        return;
      }
      
      // Success - redirect will happen automatically
      toast.success("Opening customer portal...");
    } catch (error) {
      toast.error("Failed to open customer portal");
      console.error("Portal error:", error);
    } finally {
      setPortalLoading(false);
    }
  };

  useEffect(() => {
    if (success === "true") {
      const sync = async () => {
        try {
          await syncSubscriptionStatus();
          refetch();
        } catch (error) {
          console.error("Error syncing subscription status:", error);
        }
      };
      sync();
    }
  }, [success, refetch]);

  if (isLoading) {
    return <SubscriptionsLoading />;
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">
            Subscription Plan
          </h1>
          <p className="text-muted-foreground">
            Failed to load Subscriptions data
          </p>
        </div>
        <Alert variant={"destructive"}>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to fetch the subscription data. Please try again later
            <Button
              variant={"outline"}
              size={"sm"}
              className="ml-4"
              onClick={() => refetch()}
            >
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!data?.user) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">
            Subscription Plan
          </h1>
          <p className="text-muted-foreground">
            Please login to view your subscription plan
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tighter">
          Subscription Plan
        </h1>
        <p className="text-muted-foreground">Choose the perfect plan</p>
      </div>

      <Button
        disabled={syncLoading}
        onClick={handleSync}
        variant="outline"
        size="sm"
        className="mb-4"
      >
        {syncLoading ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <RefreshCw className="h-4 w-4 mr-2" />
        )}
        Sync Status
      </Button>

      {success === "true" && (
        <Alert className="border-green-500 bg-green-50 dark:bg-green-900">
          <Check className="h-4 w-4 text-green-600" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your subscription status has been synced successfully.
          </AlertDescription>
        </Alert>
      )}

      {data.limits && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Current Usage</CardTitle>
            <CardDescription>
              Your current plan limits and usage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Repositories</span>
                  <Badge
                    variant={
                      data.limits.repositories.canAdd
                        ? "default"
                        : "destructive"
                    }
                  >
                    {data.limits.repositories.current}/
                    {data.limits.repositories.limit ?? "∞"}
                  </Badge>
                </div>
                <div className="h-2 bg-muted overflow-hidden rounded-full">
                  <div className={`h-full ${data.limits.repositories.canAdd
                      ? "bg-primary"
                      : "bg-destructive"
                      }`}
                    style={{
                      width: `${Math.min(
                        (data.limits.repositories.current /
                          (data.limits.repositories.limit || 1)) *
                        100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Reviews per Repository
                  </span>
                  <Badge variant="outline">
                    {isPro ? "Unlimited" : "10 per repo"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {isPro
                    ? "No limits on reviews"
                    : "Free tier allows for 10 reviews per repository"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Free Plan */}
        <Card className={!isPro ? "ring-2 ring-primary" : ""}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Free</CardTitle>
                <CardDescription>Free tier plan</CardDescription>
              </div>
              {!isPro && <Badge className="ml-2">Current plan</Badge>}
            </div>
            <div className="mt-2">
              <span className="text-3xl font-bold">$0</span>
              <span className="text-sm text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {PLAN_FEATURES.free.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  {feature.includes ? (
                    <Check className="h-4 w-4 text-primary" />
                  ) : (
                    <span className="h-4 w-4 text-muted-foreground">—</span>
                  )}
                  <span className="text-sm">{feature.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant={!isPro ? "default" : "outline"}
              className="w-full"
              disabled={!isPro}
              onClick={() => {
                if (!isPro) {
                  // Already on free plan
                } else {
                  handlePortal();
                }
              }}
            >
              {!isPro ? "Current Plan" : "Manage Plan"}
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className={isPro ? "ring-2 ring-primary" : ""}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Pro</CardTitle>
                <CardDescription>For teams and professionals</CardDescription>
              </div>
              {isPro && <Badge className="ml-2">Current plan</Badge>}
            </div>
            <div className="mt-2">
              <span className="text-3xl font-bold">$29</span>
              <span className="text-sm text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {PLAN_FEATURES.pro.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  {feature.includes ? (
                    <Check className="h-4 w-4 text-primary" />
                  ) : (
                    <span className="h-4 w-4 text-muted-foreground">—</span>
                  )}
                  <span className="text-sm">{feature.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            {isPro ? (
              <Button
                variant="default"
                className="w-full"
                onClick={handlePortal}
                disabled={portalLoading}
              >
                {portalLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <ExternalLink className="h-4 w-4 mr-2" />
                )}
                Manage Subscription
              </Button>
            ) : (
              <Button
                variant="default"
                className="w-full"
                onClick={handleCheckout}
                disabled={checkoutLoading}
              >
                {checkoutLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Upgrade to Pro
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

// Main page component wrapped in Suspense
export default function SubscriptionsPage() {
  return (
    <Suspense fallback={<SubscriptionsLoading />}>
      <SubscriptionsContent />
    </Suspense>
  );
}