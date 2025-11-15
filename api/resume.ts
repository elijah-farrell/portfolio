import { promises as fs } from "fs";
import { join } from "path";
import type { IncomingMessage, ServerResponse } from "http";

const resumePath = join(process.cwd(), "private", "ElijahFarrell.pdf");

export default async function handler(
  _: IncomingMessage,
  res: ServerResponse
) {
  try {
    const resume = await fs.readFile(resumePath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="ElijahFarrell.pdf"'
    );
    res.setHeader("Cache-Control", "public, max-age=86400, immutable");
    res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
    res.statusCode = 200;
    res.end(resume);
  } catch (error) {
    console.error("Resume API error", error);
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Resume not found" }));
  }
}

