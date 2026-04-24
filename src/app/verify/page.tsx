"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = searchParams.get("from") || "/";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push(redirectTo);
      } else {
        const data = await res.json();
        setError(data.error || "Incorrect password. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
      <div className="w-full max-w-md mx-4">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Top accent bar */}
          <div className="h-2 bg-[#AA2C45]" />

          <div className="px-10 py-10">
            {/* Logo + title */}
            <div className="flex flex-col items-center mb-8 gap-3">
              <Image
                src="/logos/hci-logo.png"
                alt="Temple HCI Lab"
                width={64}
                height={64}
                className="rounded-full"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="text-center">
                <h1 className="text-xl font-semibold text-[#292727] font-[var(--font-outfit)]">
                  Temple HCI Lab
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  This site is currently under construction.
                  <br />
                  Enter the access password to continue.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#292727] mb-1.5"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter access password"
                  required
                  autoFocus
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-[#292727] placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#AA2C45] focus:border-transparent transition"
                />
              </div>

              {error && (
                <p className="text-sm text-[#AA2C45] bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full py-2.5 px-4 rounded-lg bg-[#AA2C45] hover:bg-[#963145] active:bg-[#620719] text-white text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying…" : "Enter Site"}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} Temple University HCI Lab
        </p>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyForm />
    </Suspense>
  );
}
