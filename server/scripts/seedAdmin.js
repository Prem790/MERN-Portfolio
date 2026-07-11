/**
 * Create or reset the admin user with a bcrypt-hashed password.
 *
 * Usage (from the server/ folder):
 *   node scripts/seedAdmin.js
 *
 * Reads ADMIN_USERNAME and ADMIN_PASSWORD from your .env file.
 * Run this once after deploying the security update so a hashed
 * admin account exists (the old plaintext password will no longer work).
 */
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/userModel");

const MONGO_URL = process.env.mongo_url;
const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;

async function run() {
  if (!MONGO_URL) throw new Error("mongo_url is not set in .env");
  if (!username || !password) {
    throw new Error("ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env");
  }

  await mongoose.connect(MONGO_URL);

  let user = await User.findOne({ username }).select("+password");
  if (user) {
    user.password = password; // pre-save hook hashes it
    await user.save();
    console.log(`✔ Updated password for admin user "${username}".`);
  } else {
    user = new User({ username, password }); // pre-save hook hashes it
    await user.save();
    console.log(`✔ Created admin user "${username}".`);
  }

  await mongoose.disconnect();
  console.log("Done. You can now log in with the credentials from your .env.");
  process.exit(0);
}

run().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
