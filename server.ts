import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { CloudApiClient } from './src/lib/cloud-api';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  const client = new CloudApiClient(process.env.CLOUDPULSE_API_KEY || process.env.TWENTYI_API_KEY);

  // API Routes
  app.post('/api/domains/search', async (req, res) => {
    try {
      const { query } = req.body;
      if (!query) return res.status(400).json({ error: 'Query is required' });
      const results = await client.searchDomains(query);
      res.json(results);
    } catch (error) {
      console.error('Domain search error:', error);
      res.status(500).json({ error: 'Failed to search domains' });
    }
  });

  app.get('/api/hosting/packages', async (req, res) => {
    try {
      const packages = await client.getHostingPackages();
      res.json(packages);
    } catch (error) {
      console.error('Hosting package fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch hosting packages' });
    }
  });

  // Instant Preview & Speed Audit Endpoint
  app.post('/api/preview/generate', async (req, res) => {
    try {
      const { query } = req.body;
      if (!query) return res.status(400).json({ error: 'Domain or business name is required' });
      const preview = await client.generateSandboxPreview(query);
      res.json(preview);
    } catch (error) {
      console.error('Preview generator error:', error);
      res.status(500).json({ error: 'Failed to generate preview' });
    }
  });

  app.post('/api/checkout', async (req, res) => {
    try {
      const result = await client.processCheckout(req.body);
      res.json(result);
    } catch (error) {
      console.error('Checkout error:', error);
      res.status(500).json({ error: 'Checkout failed' });
    }
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = await vite.transformIndexHtml(
          url,
          fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
        );
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
