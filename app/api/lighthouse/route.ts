
type LighthouseCategory = {
  score: number | null;
};

type PageSpeedResponse = {
  lighthouseResult?: {
    categories?: {
      performance?: LighthouseCategory;
      accessibility?: LighthouseCategory;
      "best-practices"?: LighthouseCategory;
      seo?: LighthouseCategory;
    };
  };
  error?: {
    message?: string;
  };
};



import { NextRequest, NextResponse } from "next/server";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export async function GET(request: NextRequest) {
  try {
    // 1. Get URL and device strategy from the request
    const searchParams = request.nextUrl.searchParams;

    const websiteUrl = searchParams.get("url");
    const strategy = searchParams.get("strategy") || "mobile";

    // 2. Validate inputs
    if (!websiteUrl) {
      return NextResponse.json(
        { error: "Website URL is required" },
        { status: 400 }
      );
    }

    if (!["mobile", "desktop"].includes(strategy)) {
      return NextResponse.json(
        { error: "Invalid device strategy" },
        { status: 400 }
      );
    }

    let parsedUrl: URL;

    try {
      parsedUrl = new URL(websiteUrl);
    } catch {
      return NextResponse.json(
        { error: "Please enter a valid website URL" },
        { status: 400 }
      );
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return NextResponse.json(
        { error: "Only HTTP and HTTPS URLs are supported" },
        { status: 400 }
      );
    }

    if (!GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: "PageSpeed API key is missing" },
        { status: 500 }
      );
    }

    // 3. Prepare Google's API request
    const googleUrl = new URL(
      "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
    );

    googleUrl.searchParams.set("url", parsedUrl.toString());
    googleUrl.searchParams.set("key", GOOGLE_API_KEY);
    googleUrl.searchParams.set("strategy", strategy);

    googleUrl.searchParams.append("category", "PERFORMANCE");
    googleUrl.searchParams.append("category", "ACCESSIBILITY");
    googleUrl.searchParams.append("category", "BEST_PRACTICES");
    googleUrl.searchParams.append("category", "SEO");

    // 4. Send request to Google
    const response = await fetch(googleUrl.toString(), {
      cache: "no-store",
    });

    const data = (await response.json()) as PageSpeedResponse;

    // 5. Handle Google's errors
    if (!response.ok) {
      return NextResponse.json(
        {
          error: data.error?.message || "Google PageSpeed API failed",
        },
        { status: response.status }
      );
    }

    // 6. Extract the four Lighthouse scores
    const categories = data.lighthouseResult?.categories;

    if (!categories) {
      return NextResponse.json(
        { error: "Lighthouse scores were not returned" },
        { status: 502 }
      );
    }

    const scores = {
      performance: categories.performance?.score ?? null,
      accessibility: categories.accessibility?.score ?? null,
      bestPractices: categories["best-practices"]?.score ?? null,
      seo: categories.seo?.score ?? null,
    };

    // 7. Return scores to our frontend
    return NextResponse.json({
      url: parsedUrl.toString(),
      strategy,
      scores,
    });

} catch (error) {
  console.error("Actual PageSpeed error:", error);

  return NextResponse.json(
    {
      error:
        error instanceof Error
          ? error.message
          : String(error),
    },
    { status: 500 }
  );
}}