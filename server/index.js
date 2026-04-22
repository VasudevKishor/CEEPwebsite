const express = require("express");
const cors = require("cors");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_DIR = path.join(__dirname, "data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");
const REGISTRATIONS_FILE = path.join(DATA_DIR, "registrations.json");

app.use(cors());
app.use(express.json());

const ensureDataStore = async () => {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const files = [INQUIRIES_FILE, REGISTRATIONS_FILE];
  await Promise.all(
    files.map(async (file) => {
      try {
        await fs.access(file);
      } catch {
        await fs.writeFile(file, "[]", "utf8");
      }
    })
  );
};

const readItems = async (filePath) => {
  await ensureDataStore();
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
};

const writeItems = async (filePath, items) => {
  await fs.writeFile(filePath, JSON.stringify(items, null, 2), "utf8");
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
    const inquiries = await readItems(INQUIRIES_FILE);
    const newInquiry = {
      id: Date.now().toString(),
      name: String(name).trim(),
      mobile: String(mobile).trim(),
      email: String(email).trim().toLowerCase(),
      createdAt: new Date().toISOString(),
    };

    inquiries.push(newInquiry);
    await writeItems(INQUIRIES_FILE, inquiries);

    return res.status(201).json({ ok: true, inquiry: newInquiry });
  } catch (error) {
    console.error("Failed to save inquiry:", error);
    return res.status(500).json({ ok: false, message: "failed to save inquiry" });
  }
});

app.get("/api/inquiries", async (_req, res) => {
  try {
    const inquiries = await readItems(INQUIRIES_FILE);
    return res.json({ ok: true, inquiries });
  } catch (error) {
    console.error("Failed to read inquiries:", error);
    return res.status(500).json({ ok: false, message: "failed to read inquiries" });
  }
});

app.post("/api/registrations", async (req, res) => {
  const { name, email, mobile, organization, requestedFile, requestedName } = req.body || {};

  if (!name || !email || !mobile || !organization || !requestedFile) {
    return res.status(400).json({
      ok: false,
      message: "name, email, mobile, organization and requestedFile are required",
    });
  }

  try {
    const registrations = await readItems(REGISTRATIONS_FILE);
    const newRegistration = {
      id: Date.now().toString(),
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      mobile: String(mobile).trim(),
      organization: String(organization).trim(),
      requestedFile: String(requestedFile).trim(),
      requestedName: String(requestedName || requestedFile).trim(),
      createdAt: new Date().toISOString(),
    };

    registrations.push(newRegistration);
    await writeItems(REGISTRATIONS_FILE, registrations);

    return res.status(201).json({ ok: true, registration: newRegistration });
  } catch (error) {
    console.error("Failed to save registration:", error);
    return res.status(500).json({ ok: false, message: "failed to save registration" });
  }
});

app.get("/api/registrations", async (_req, res) => {
  try {
    const registrations = await readItems(REGISTRATIONS_FILE);
    return res.json({ ok: true, registrations });
  } catch (error) {
    console.error("Failed to read registrations:", error);
    return res.status(500).json({ ok: false, message: "failed to read registrations" });
  }
});

app.listen(PORT, () => {
  console.log(`Inquiry API running on http://localhost:${PORT}`);
});
