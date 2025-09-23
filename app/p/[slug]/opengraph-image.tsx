// app/p/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export const runtime = "nodejs"; // use Node so Mongoose works
export const alt = "Project preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function looksLikeObjectId(s: string) {
    return /^[a-f\d]{24}$/i.test(s);
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    await connectDB();
    const query = looksLikeObjectId(slug) ? { _id: slug } : { slug };
    const p = await Project.findOne(query).lean();

    const title = p?.title || "SathTheBuilder";
    const bg = p?.images?.[0];

    return new ImageResponse(
        (
            // ROOT: must have display:flex if it has multiple children
            <div
                style={{
                    width: 1200,
                    height: 630,
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    backgroundColor: "#111827", // fallback dark bg
                    color: "white",
                    fontSize: 56,
                    fontWeight: 800,
                }}
            >
                {/* Background image (no filters; Satori is strict) */}
                {bg ? (
                    <img
                        src={bg}
                        alt=""
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            width: 1200,
                            height: 630,
                            objectFit: "cover",
                            opacity: 0.6, // simple darkening instead of filter()
                        }}
                    />
                ) : null}

                {/* Simple overlay (avoid gradients) */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.25)",
                    }}
                />

                {/* TEXT WRAPPER: has 2 children → must declare display:flex */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "40px 56px",
                        // zIndex must be number; or omit entirely (last child is on top)
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            fontSize: 28,
                            fontWeight: 600,
                            opacity: 0.9,
                            marginBottom: 8,
                        }}
                    >
                        SathTheBuilder
                    </div>
                    <div style={{ display: "flex", lineHeight: 1.1, maxWidth: 980 }}>{title}</div>
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}
