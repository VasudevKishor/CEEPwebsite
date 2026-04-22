const express = require("express");
const cors = require("cors");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "inquiries.json");

app.use(cors());
app.use(express.json());

const ensureDataStore = async () => {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf8");
  }
};

const readInquiries = async () => {
  await ensureDataStore();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  return JSON.parse(raw);
};

const writeInquiries = async (items) => {
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf8");
};

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/inquiries", async (req, res) => {
  const { name, mobile, email } = req.body || {};

  if (!name || !mobile || !email) {
    return res.status(400).json({
      ok: false,
      message: "name, mobile and email are required",
    });
  }

  try {
    const inquiries = await readInquiries();
    const newInquiry = {
      id: Date.now().toString(),
      name: String(name).trim(),
      mobile: String(mobile).trim(),
      email: String(email).trim().toLowerCase(),
      createdAt: new Date().toISOString(),
    };

    inquiries.push(newInquiry);
    await writeInquiries(inquiries);

    return res.status(201).json({ ok: true, inquiry: newInquiry });
  } catch (error) {
    console.error("Failed to save inquiry:", error);
    return res.status(500).json({ ok: false, message: "failed to save inquiry" });
  }
});

app.get("/api/inquiries", async (_req, res) => {
  try {
    const inquiries = await readInquiries();
    return res.json({ ok: true, inquiries });
  } catch (error) {
    console.error("Failed to read inquiries:", error);
    return res.status(500).json({ ok: false, message: "failed to read inquiries" });
  }
});

app.listen(PORT, () => {
  console.log(`Inquiry API running on http://localhost:${PORT}`);
});
