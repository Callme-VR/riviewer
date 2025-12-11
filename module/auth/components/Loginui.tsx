"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import { GithubIcon } from "lucide-react";

export default function LoginUI() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn.social({ provider: "github" });
    } catch (error) {
      console.log("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-zinc-900 text-white flex">
      {/* Left section */}
      <div className="flex-1 flex flex-col justify-center px-12 py-16">
        {/* Logo */}
        <div className="max-w-lg">
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 text-2xl font-bold">
              <div className="w-8 h-8 bg-brown-500 rounded-full" />
              <span>Riviewer</span>
            </div>
          </div>

          {/* Main content */}
          <h1 className="text-5xl font-bold mb-6 leading-tight text-balance">
            Cut Code Review Time and Bugs in Half 
            <span className="block">Instantly.</span>
          </h1>

          <p className="text-lg text-gray-400 leading-relaxed">
            Supercharge your team to help ship faster with the most advanced AI-powered code review tool.
          </p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex-1 flex flex-col justify-center items-center px-12 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
            <p className="text-primary-foreground">Login using your GitHub account to continue.</p>
          </div>

          {/* GitHub Login Button */}
          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-white text-black rounded-lg hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center gap-2 mb-8"
          >
            {isLoading ? (
              "Logging in..."
            ) : (
              <>
                <GithubIcon className="w-5 h-5" />
                Continue with GitHub
              </>
            )}
          </Button>

          {/* Footer Links */}
          <div className="space-y-4 text-center text-sm text-gray-400">
            <div>
              New to Riviewer?{" "}
              <a href="#" className="text-primary hover:text-primary-foreground font-semibold">Sign up</a>
            </div>
            <div>
              <a href="#" className="text-primary hover:text-primary-foreground font-semibold">Self Hosted Services</a>
            </div>
          </div>

          {/* Bottom links */}
          <div className="mt-10 pt-6 border-t border-gray-800 flex items-center justify-center gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-400">
              Terms of Use
            </a>
            <span>and</span>
            <a href="#" className="hover:text-gray-400">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}