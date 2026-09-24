# TAC GLOBAL & TAC STUDIOS v2.0 - Full-Stack Deployment Architecture Guide

This guide details deployment options for TAC GLOBAL v2.0 across **Vercel** and **AWS Amplify** (Gen 2), ensuring native database synchronization (Firebase Firestore & Supabase PostgreSQL), edge middleware protection, and client file asset stores.

---

## 1. Environment Variables Configuration

Copy `.env.example` to your deployment environment (Vercel Project Settings or AWS Amplify Hosting):

```bash
# Firebase Credentials (Configured via Google Cloud & Firebase Console)
VITE_FIREBASE_API_KEY="AIzaSy..."
VITE_FIREBASE_AUTH_DOMAIN="gen-lang-client-0757966892.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="gen-lang-client-0757966892"
VITE_FIREBASE_STORAGE_BUCKET="gen-lang-client-0757966892.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="343653226757"
VITE_FIREBASE_APP_ID="1:343653226757:web:f0cf36c51a165ce1a03f6c"
VITE_FIREBASE_FIRESTORE_DATABASE_ID="ai-studio-tacglobaltacstud-1a269885-c451-4dbb-8e18-73776b968adc"

# Optional Supabase Connection (If running dual-sync SQL replica)
SUPABASE_URL="https://[project-id].supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOi..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOi..."

# Executive Admin Emails
ADMIN_EMAILS="awudeyrichard@gmail.com,inquiries@tacglobal.org,admin@tacglobal.org"
```

---

## 2. Vercel Deployment Guide

1. **Connect Git Repository:**
   - Link the TAC GLOBAL repository in your Vercel Dashboard.
   - Framework Preset: **Next.js** or **Vite** (depending on entry configuration).
2. **Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist` (for Vite SPA) or `.next` (for Next.js App Router).
   - Install Command: `npm install`
3. **Configure Edge Middleware (`middleware.ts`):**
   - Vercel automatically deploys `middleware.ts` to Vercel Edge Network locations, intercepting `/dashboard/*` and `/admin/*` prior to page renders.
4. **Deploy Firestore Rules:**
   - Run `firebase deploy --only firestore:rules` via GitHub Actions or using the AI Studio deployment tool.

---

## 3. AWS Amplify Deployment Guide (Amplify Hosting Gen 2)

1. **Amplify Console:**
   - Navigate to AWS Amplify Console > Create new app > Host web app.
   - Connect GitHub repository and select the target branch (`main`).
2. **Amplify Build Specification (`amplify.yml`):**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
3. **Rewrite & Redirect Rules for Single-Page Routing:**
   In AWS Amplify Hosting > Rewrites and redirects:
   - Source: `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/>`
   - Target: `/index.html`
   - Status: `200 (Rewrite)`
4. **S3 Storage Bucket for Client File Uploads:**
   - Use AWS S3 or Firebase Storage bucket `gen-lang-client-0757966892.firebasestorage.app` with CORS configured for `https://*.amplifyapp.com`.

---

## 4. Database Verification & Seeding

1. **Automatic Runtime Seeding:**
   - On first load, `src/lib/servicesDb.ts` checks the Firestore `services` collection and seeds all default services from `services.json`.
2. **PostgreSQL Migration (Supabase):**
   - Run `supabase_migration_v2.sql` inside the Supabase SQL Editor to establish relational tables, ENUM types, and Row Level Security (RLS) policies.
