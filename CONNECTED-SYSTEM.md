# Workforce NON-DOT Connected System

This website is connected to the Screenings4u Enterprise Supabase project.

Public website runtime:
- `nondot-website-public` — pages, redirects, SEO, pricing catalog, blog, inquiries
- `nondot-checkout` — NON-DOT Employer/C/TPA Stripe checkout
- `nondot-checkout-status` — payment status and NON-DOT account provisioning

Management portal:
- `nondot-management-read`
- `nondot-management-actions`
- `nondot-portal-control`

Website Management controls:
- `workforce_website_pages`
- `workforce_website_pricing`
- `workforce_website_redirects`
- `workforce_website_seo_settings`
- `workforce_blog`
- `workforce_marketing_inquiries`

Managed pricing codes are synchronized with `workforce_plans` so public pricing and checkout use the same plan amounts.
