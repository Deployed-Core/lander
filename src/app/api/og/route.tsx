import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const title = req.nextUrl.searchParams.get("title") ?? "Deployed";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px 72px",
          background: "linear-gradient(135deg, #00051e 0%, #012a79 50%, #3f7ae0 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 72,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "rgba(249,246,243,0.9)",
              letterSpacing: "-0.02em",
            }}
          >
            deployed.md
          </div>
        </div>

        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#f9f6f3",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            maxWidth: "85%",
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 22,
            color: "rgba(249,246,243,0.55)",
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}
        >
          Applied AI for the enterprise
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
