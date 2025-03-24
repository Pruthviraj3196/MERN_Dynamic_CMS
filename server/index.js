require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database is connected Successfully"))
.catch((err) => console.log(err));

const ContentSchema = new mongoose.Schema({
  appName: String,
  bannerImage: String,
  tagline: String,
  services: [{ title: String, description: String }],
  faqs: [{ question: String, answer: String }],
});

const Content = mongoose.model("Content", ContentSchema);

// Get content
app.get("/api/content", async (req, res) => {
 try {
  const content = await Content.findOne();
  res.status(200).json(content);
 } catch (error) {
  res.status(500).json({ error: "Failed to fetch content" });
 }
});

// Update content (Admin functionality)
app.post("/api/content", async (req, res) => {
 try {
  await Content.findOneAndUpdate({}, req.body, { upsert: true });
  res.status(200).json({ message: "Content updated successfully" });
 } catch (error) {
  res.status(500).json({ error: "Failed to fetch content" });

 }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  