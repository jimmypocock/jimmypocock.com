# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a production-ready Next.js 15 template with comprehensive AWS infrastructure, designed for scalable web applications with Google Analytics and modern web development tools.

## Project Context

This is Jimmy Pocock's personal website built with Next.js and AWS infrastructure. The site includes:

- Personal/professional information pages
- Thoughts/articles system for writing and publishing content
- Google Analytics integration
- Privacy-compliant cookie consent management
- An old static site preserved in the `old_site/` directory for reference

## Development Commands

### Core Development

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint (check this after code changes)

### CDK Infrastructure

- `npm run cdk:install` - Install CDK dependencies
- `npm run cdk:synth` - Synthesize CDK templates
- `npm run build:cdk` - Build CDK TypeScript files

### Deployment Commands

- `npm run deploy:all` - Deploy all AWS stacks (recommended)
- `npm run deploy:foundation` - Deploy S3 buckets and core infrastructure
- `npm run deploy:cert` - Deploy SSL certificates
- `npm run deploy:edge` - Deploy Lambda@Edge functions
- `npm run deploy:waf` - Deploy Web Application Firewall
- `npm run deploy:cdn` - Deploy CloudFront distribution
- `npm run deploy:app` - Deploy application content
- `npm run deploy:monitoring` - Deploy CloudWatch dashboards and alerts

### Monitoring & Maintenance

- `npm run status:all` - Check all stack deployment status
- `npm run maintenance:on` - Enable maintenance mode
- `npm run maintenance:off` - Disable maintenance mode

### Todo Management

- `npm run todo` - Show current todos
- `npm run todo:add` - Add a new todo item
- `npm run todo:complete` - Mark a todo as complete
- `npm run todo:progress` - Update todo progress

## Architecture

### Frontend Stack

- **Next.js 15** with App Router and Turbopack
- **TypeScript** for type safety
- **Tailwind CSS** for styling with custom CSS variables in `app/globals.css`
- **Google Fonts**: Noto Sans (UI) and Noto Serif (content)

### AWS Infrastructure (Decoupled Stacks)

The infrastructure uses a decoupled stack architecture (see `cdk/src/ARCHITECTURE.md`) with these independent stacks:

1. **Foundation Stack** - S3 buckets for content and logs (deploy once)
2. **Certificate Stack** - ACM SSL certificates (deploy once)
3. **Edge Functions Stack** - CloudFront functions for redirects and security headers
4. **WAF Stack** - Web Application Firewall with rate limiting and geo-blocking
5. **CDN Stack** - CloudFront distribution with custom domains
6. **App Stack** - Content deployment and CloudFront invalidation
7. **Monitoring Stack** - CloudWatch dashboards, SNS alerts, and billing alarms

### Google Integrations

- **Google Analytics** with consent management (`components/GoogleAnalytics.tsx`)
- **Cookie Consent Management Platform** (`components/GoogleCMP.tsx`)

## Key Directories

- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components
- `content/thoughts/` - Markdown files for thoughts/articles
- `lib/` - Utility functions and helpers (includes thoughts system)
- `cdk/` - AWS CDK infrastructure code (separate TypeScript project)
- `scripts/` - Deployment and maintenance shell scripts
- `public/` - Static assets including `sitemap.xml`

## Environment Configuration

Copy `.env.example` to `.env` and configure:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics measurement ID
- `AWS_REGION`, `AWS_ACCOUNT_ID`, `DOMAIN_NAME` - AWS deployment settings
- `APP_NAME` - Application name for CDK stacks

## Customization Areas

### Brand Colors

Update CSS variables in `app/globals.css` and `tailwind.config.ts`:

- `--primary`, `--secondary`, `--accent`, `--neutral`

### Content & Metadata

- `app/layout.tsx` - Site metadata, Open Graph, schema markup
- `app/page.tsx` - Home page content
- `package.json` - Project name and description

## Development Notes

### CDK Infrastructure

- CDK code is in a separate TypeScript project under `cdk/`
- Run `npm run build:cdk` before CDK operations
- Stack dependencies must be deployed in order (see ARCHITECTURE.md)
- Use `npm run deploy:all` for full deployment

### ESLint Configuration

- Ignores `cdk/` directory (separate linting rules)
- Extends Next.js recommended configs
- Always run `npm run lint` after making code changes

### Theme System

- Uses Tailwind CSS with custom CSS variables for easy theme customization
- Animated gradient orbs provide dynamic background effects
- Theme toggle component supports light/dark modes

## Testing

Currently, no test framework is configured. When adding tests:

- Consider Jest for unit tests
- Use React Testing Library for component tests
- Add Playwright or Cypress for E2E tests

## Performance Considerations

- Next.js 15 with Turbopack provides fast HMR in development
- CloudFront CDN caching is configured for production
- Images should be optimized using Next.js Image component
- Bundle size monitoring can be added with `@next/bundle-analyzer`

## Common Issues & Solutions

### CDK Deployment Issues

- If stacks fail to deploy, check `scripts/diagnose-stack.sh <stack-name>`
- Ensure AWS credentials are configured: `aws sts get-caller-identity`
- Stack deployment order matters - use `deploy:all` for correct sequencing

### Local Development

- Clear Next.js cache if seeing stale content: `rm -rf .next`
- Ensure all environment variables are set in `.env`
- CDK and Next.js are separate TypeScript projects - build CDK with `npm run build:cdk`

## Migration from Old Site

The `old_site/` directory contains the previous static HTML version. Key considerations:

- Thoughts articles have been migrated to markdown format in `content/thoughts/`
- Static assets (thinker.png) have been moved to `public/`
- Privacy and terms pages have been recreated as Next.js pages

## Thoughts/Articles System

- Articles are stored as markdown files in `content/thoughts/`
- Each file has frontmatter with title and date
- The system automatically generates listing and individual pages
- To add a new thought: create a `.md` file in `content/thoughts/` with proper frontmatter

## Security Considerations

- WAF is configured with rate limiting and geo-blocking
- All secrets must be in environment variables, never committed
- Security headers are applied via CloudFront Edge Functions
- Content Security Policy is configured for XSS protection
