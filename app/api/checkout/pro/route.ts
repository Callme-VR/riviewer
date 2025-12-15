import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Use better-auth's checkout API
    const checkoutUrl = await auth.api.checkout({
      headers: await headers(),
      body: {
        slug: "Coder",
      },
    });

    // Return the correct URL structure
    return NextResponse.json({ url: checkoutUrl.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Use better-auth's checkout API
    const checkoutUrl = await auth.api.checkout({
      headers: await headers(),
      body: {
        slug: "Coder",
      },
    });

    // Redirect to checkout URL
    return NextResponse.redirect(checkoutUrl.url);
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
