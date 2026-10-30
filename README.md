# CM AI — Intelligent AI Task & Cost Router

> **"Right AI. Right Task. Less Cost. More Learning."**

CM AI is an intelligent AI router, cost tracker, and Socratic learning platform for students and professionals. It analyzes tasks to recommend optimal AI models, catches unnecessary AI usage on simple math/utilities to save tokens, tracks spending against monthly budget caps, and provides step-by-step guidance in Learning Mode.

---

## 🚀 GitHub Actions Auto-Deployment Setup

An automated CI/CD pipeline is configured in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) that builds, tests, and deploys the app on every push to `main` or `master`.

### One-Time Setup in GitHub:

1. Push this codebase to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: setup CM AI with GitHub Actions auto-deployment"
   git push origin main
   ```
2. In your GitHub repository, open **Settings** → **Pages** (in the left sidebar).
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. That's it! Every future push will automatically:
   - Run unit tests (`npm test`)
   - Check TypeScript types (`npm run lint`)
   - Build production assets (`npm run build`)
   - Deploy live to GitHub Pages (`https://<username>.github.io/<repo>/`)

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm run dev

# Run unit tests
npm test

# Build for production
npm run build
```
