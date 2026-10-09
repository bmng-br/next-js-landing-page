# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Owners and managers of small and mid-size companies in Brazil decide whether to bring Boomerang in. IT and operations leads at those companies are a secondary audience who validate the choice. Visitors arrive with messy processes or scattered tools and want to know if Boomerang is a partner they can trust.

## Product Purpose
Landing page for Boomerang Soluções (Barueri, SP; CNPJ 46.994.388/0001-94). It presents the company and turns visitors into qualified leads through the contact form. Success is a submitted form: it is saved to the `leads` table in Neon and emailed to `contato@bmng.com.br`, with a stated reply time of 3 to 5 business days.

## Positioning
Boomerang works on processes and technology side by side with the client, instead of delivering software from a distance. This follows the Testamento v3: a 5-stage journey, 5 services, and 5 company moments.

## Operating Context
Bilingual site, pt-BR (default) and en, with copy in `src/locales/`. Hosted on Cloudflare Workers (free plan) at https://boomerangsolucoes.com.br. Contact: `contato@bmng.com.br`; phones SP +55 31 93624-5393 and MG +55 31 93618-3916 (the SP area code is unconfirmed); LinkedIn https://www.linkedin.com/company/boomerangsolucoes.

## Capabilities and Constraints
- Landing page, contact form with lead storage and email alert, and a Clerk-protected `/dashboard` with `/dashboard/leads` limited to `DASHBOARD_ALLOWED_EMAILS`.
- Worker bundle must stay under the free-plan limit (3 MiB gzipped); avoid heavy dependencies.
- Content source of truth: `Testamento_Boomerang_v3.pdf` and the identity manual v1.1 in `C:\Users\lucas\Documents\Boomerang\`.

## Brand Commitments
- Voice from the identity manual: "você" and "nós", plain language, no jargon.
- The sócios' faith phrase never appears on the site.
- Brand assets and the identity manual live in `C:\Users\lucas\Documents\Boomerang\`. The landing page originated from the `Alt-Sobrio` Claude Design export.

## Evidence on Hand
No client logos, testimonials, case studies, or metrics exist yet. Do not invent them. No pricing or SLAs are published; do not state any.

## Product Principles
- Plain words over consulting jargon; say what Boomerang does with the client.
- Nothing unproven: no fabricated customers, numbers, prices, or guarantees.
- Every section moves the visitor toward the contact form.
- Owners come first; technical readers should still find enough substance to trust.
- pt-BR is the primary language; en must carry the same meaning.
