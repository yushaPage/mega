import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/check", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.json({ status: "error", message: "No URL provided" });

  try {
    const response = await fetch(url);
    const text = await response.text();

    if (text.includes("no longer available") || text.includes("invalid")) {
      res.json({ status: "invalid" });
    } else {
      res.json({ status: "available" });
    }
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log("Server running...")
);
