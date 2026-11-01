import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { storeRepo } from './server/store.js';
import { checkPCCompatibility, createOrder, askTechAdvisor } from './server/services.js';
import { ProductCategory, Product, StoreCategoryItem } from './src/types.js';

dotenv.config();

const app = express();
const PORT = 3000;

// Support large payloads (for base64 product images, gallery, specs)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- API Routes ---

// 1. Store Information & Exchange Rate
app.get('/api/store', (req, res) => {
  res.json({
    success: true,
    data: storeRepo.getStoreInfo()
  });
});

app.post('/api/store', (req, res) => {
  try {
    const { storeInfo, autoRecalculate } = req.body;
    if (!storeInfo) {
      return res.status(400).json({ success: false, error: 'Store info payload is required' });
    }
    const updated = storeRepo.updateStoreInfo(storeInfo, Boolean(autoRecalculate));
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update store info' });
  }
});

// 2. Products (CRUD & Batch Sync)
app.get('/api/products', (req, res) => {
  try {
    const { category, search, brand, minPrice, maxPrice, inStock, sort, featured } = req.query;

    const filtered = storeRepo.getProducts({
      category: category as string,
      search: search as string,
      brand: brand as string,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      inStock: inStock === 'true',
      featured: featured === 'true',
      sort: sort as string
    });

    res.json({
      success: true,
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.get('/api/products/:id', (req, res) => {
  const product = storeRepo.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

// Add or update a product
app.post('/api/products', (req, res) => {
  try {
    const product = req.body as Product;
    if (!product || !product.id || !product.nameAr) {
      return res.status(400).json({ success: false, error: 'Valid product data with id and nameAr is required' });
    }

    const saved = storeRepo.saveProduct(product);
    res.json({ success: true, data: saved });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to save product' });
  }
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
  try {
    const deleted = storeRepo.deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete product' });
  }
});

// Batch sync products (e.g. migrate products from PC's localStorage to server database)
app.post('/api/products/sync', (req, res) => {
  try {
    const { products } = req.body;
    if (!Array.isArray(products)) {
      return res.status(400).json({ success: false, error: 'Products array is required' });
    }
    const synced = storeRepo.syncProducts(products);
    res.json({ success: true, count: synced.length, data: synced });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to sync products' });
  }
});

// 3. Categories
app.get('/api/categories', (req, res) => {
  try {
    const categories = storeRepo.getCategories();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch categories' });
  }
});

app.post('/api/categories', (req, res) => {
  try {
    const category = req.body as StoreCategoryItem;
    if (!category || !category.nameAr) {
      return res.status(400).json({ success: false, error: 'Category with nameAr is required' });
    }
    const saved = storeRepo.addCategory(category);
    res.json({ success: true, data: saved, allCategories: storeRepo.getCategories() });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to add category' });
  }
});

app.delete('/api/categories/:id', (req, res) => {
  try {
    const deleted = storeRepo.deleteCategory(req.params.id);
    res.json({ success: true, deleted, allCategories: storeRepo.getCategories() });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete category' });
  }
});

// 4. Brands
app.get('/api/brands', (req, res) => {
  res.json({ success: true, data: storeRepo.getBrands() });
});

// 5. Home Sections Config
app.get('/api/home-sections', (req, res) => {
  res.json({ success: true, data: storeRepo.getHomeSections() });
});

app.post('/api/home-sections', (req, res) => {
  try {
    const updated = storeRepo.updateHomeSections(req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update home sections' });
  }
});

// 6. Hero Slides
app.get('/api/hero-slides', (req, res) => {
  res.json({ success: true, data: storeRepo.getHeroSlides() });
});

app.post('/api/hero-slides', (req, res) => {
  try {
    const updated = storeRepo.updateHeroSlides(req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update hero slides' });
  }
});

// 7. Store Intro Videos
app.get('/api/videos', (req, res) => {
  res.json({ success: true, data: storeRepo.getVideos() });
});

app.post('/api/videos', (req, res) => {
  try {
    const { videos, video } = req.body;
    if (Array.isArray(videos)) {
      const updated = storeRepo.updateVideos(videos);
      return res.json({ success: true, data: updated });
    }
    if (video && video.titleAr) {
      const saved = storeRepo.addVideo(video);
      return res.json({ success: true, data: saved, allVideos: storeRepo.getVideos() });
    }
    return res.status(400).json({ success: false, error: 'Valid video data or videos array required' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to save video data' });
  }
});

app.delete('/api/videos/:id', (req, res) => {
  try {
    const deleted = storeRepo.deleteVideo(req.params.id);
    res.json({ success: true, deleted, allVideos: storeRepo.getVideos() });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete video' });
  }
});

// 8. Theme Customization (Button colors and styling)
app.get('/api/theme', (req, res) => {
  res.json({ success: true, data: storeRepo.getTheme() });
});

app.post('/api/theme', (req, res) => {
  try {
    const updated = storeRepo.updateTheme(req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update theme' });
  }
});

// 7. PC Builder Compatibility Checking
app.post('/api/pc-builder/check', (req, res) => {
  try {
    const { parts } = req.body;
    if (!parts) {
      return res.status(400).json({ success: false, error: 'Parts object is required' });
    }
    const report = checkPCCompatibility(parts);
    res.json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Compatibility check failed' });
  }
});

// Auto-Recommend PC Build based on budget / preset
app.post('/api/pc-builder/recommend', (req, res) => {
  try {
    const { tier } = req.body; // 'budget' | 'mid' | 'ultra'
    
    let selected: Record<string, string> = {};
    if (tier === 'ultra') {
      selected = {
        cpu: 'cpu-i9-14900k',
        gpu: 'gpu-rtx4090-rog',
        motherboard: 'mb-z790-aorus-elite',
        ram: 'ram-gskill-trident-32gb',
        storage: 'ssd-samsung-990pro-2tb',
        powerSupply: 'psu-seasonic-1000w',
        cooler: 'cooler-nzxt-kraken-360',
        pcCase: 'case-lianli-o11-evo'
      };
    } else if (tier === 'mid') {
      selected = {
        cpu: 'cpu-r7-7800x3d',
        gpu: 'gpu-rtx4070tis-gigabyte',
        motherboard: 'mb-b650-tomahawk',
        ram: 'ram-corsair-ddr5-32gb',
        storage: 'ssd-wd-black-sn850x-1tb',
        powerSupply: 'psu-corsair-rm850x',
        cooler: 'cooler-deepcool-lt720',
        pcCase: 'case-nzxt-h9-flow'
      };
    } else {
      // budget
      selected = {
        cpu: 'cpu-r5-7600x',
        gpu: 'gpu-rtx4060-asus',
        motherboard: 'mb-b760m-asus-tuf',
        ram: 'ram-corsair-ddr5-32gb',
        storage: 'ssd-wd-black-sn850x-1tb',
        powerSupply: 'psu-corsair-rm850x',
        cooler: 'cooler-deepcool-lt720',
        pcCase: 'case-nzxt-h9-flow'
      };
    }

    const parts: Record<string, Product | undefined> = {};
    for (const [key, prodId] of Object.entries(selected)) {
      parts[key] = storeRepo.getProductById(prodId);
    }

    const compatibility = checkPCCompatibility(parts);
    res.json({ success: true, data: { parts, compatibility } });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Recommendation error' });
  }
});

// 8. Orders
app.post('/api/orders', (req, res) => {
  try {
    const { customer, items, currency } = req.body;
    if (!customer || !items || !items.length) {
      return res.status(400).json({ success: false, error: 'Customer and items are required' });
    }

    const order = createOrder(customer, items, currency || 'IQD');
    storeRepo.addOrder(order);

    res.json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create order' });
  }
});

app.get('/api/orders', (req, res) => {
  res.json({ success: true, data: storeRepo.getOrders() });
});

app.patch('/api/orders/:id/status', (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ success: false, error: 'Status is required' });
  }
  const updated = storeRepo.updateOrderStatus(req.params.id, status);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Order not found' });
  }
  res.json({ success: true, message: 'Order status updated' });
});

// 9. AI Hardware Consultant Endpoint
app.post('/api/ai-advisor', async (req, res) => {
  try {
    const { message, context, history } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    const answer = await askTechAdvisor(message, history || [], context);
    res.json({ success: true, data: { reply: answer } });
  } catch (error) {
    res.status(500).json({ success: false, error: 'AI advisor service error' });
  }
});

// --- Start Server and Vite Middleware ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Al-Qamar Computers server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
