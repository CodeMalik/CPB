import 'dotenv/config'; // automatically calls dotenv.config()
import {connectDB} from "../lib/mongoose.js"
import Product from "../app/models/Product.js"; // adjust path if needed

async function wipeImages() {
  await connectDB();

  const result = await Product.updateMany({}, { $set: { images: [] } });

  console.log(`✅ Wiped images for ${result.modifiedCount} products`);
  process.exit(0);
}

wipeImages().catch((err) => {
  console.error("❌ Failed to wipe images", err);
  process.exit(1);
});
