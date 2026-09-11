# DNS cutover record

Snapshot captured on 10 September 2026 before any production DNS change.

| Name | Type | Current value | Planned value |
| --- | --- | --- | --- |
| `capitalcareerclub.com` | A | `216.198.79.1` | `76.13.177.250` |
| `www.capitalcareerclub.com` | CNAME | `69e1799756d153fc.vercel-dns-017.com` | remove and point to `76.13.177.250` |

At capture time the `www` CNAME resolved to `216.198.79.1` and
`64.29.17.1`. Keep these values and the existing Vercel deployment until the
first VPS observation window is complete.

The production change has **not** been made from this workstation. Before
cutover, lower the relevant TTLs, validate the Basic-Auth staging hostname,
then obtain certificates for the apex and `www`. The Nginx configuration makes
`www` a permanent redirect to `https://capitalcareerclub.com`.
