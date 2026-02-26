import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: subscribers, error } = await supabase
    .from("newsletters")
    .select("email, status, source, subscribed_at")
    .order("subscribed_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const header = "email,status,source,subscribed_at\n";
  const rows = (subscribers ?? [])
    .map((s) =>
      [
        `"${s.email}"`,
        `"${s.status}"`,
        `"${s.source ?? ""}"`,
        `"${s.subscribed_at}"`,
      ].join(",")
    )
    .join("\n");

  const csv = header + rows;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="newsletter-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
