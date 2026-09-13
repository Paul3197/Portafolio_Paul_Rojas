export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; code: string; lang?: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  content: ContentBlock[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "clean-architecture-en-sistemas-erp",
    title: "Clean Architecture in ERP Systems: Taming Business Complexity",
    excerpt:
      "ERP modules accumulate business rules fast. Here's how Clean Architecture and clear domain boundaries keep an invoicing module maintainable as SUNAT requirements evolve.",
    date: "2026-08-12",
    readingTime: "7 min read",
    tags: ["Clean Architecture", ".NET", "ERP", "Backend"],
    content: [
      {
        type: "p",
        text: "ERP systems are unforgiving. A single module — electronic invoicing, for example — sits at the intersection of tax regulation, accounting rules, and whatever the business decided last quarter. Requirements don't just grow, they mutate. The architecture has to absorb that change without rotting.",
      },
      {
        type: "p",
        text: "Working on the electronic invoicing module of an ERP tied to SUNAT (Peru's tax authority) taught me that the biggest risk isn't a bad algorithm — it's letting tax logic, persistence details, and HTTP concerns bleed into each other until nobody can safely touch the code.",
      },
      {
        type: "h2",
        text: "Why layering matters more in ERP than in a typical CRUD app",
      },
      {
        type: "p",
        text: "A basic CRUD app can get away with a thin, sloppy architecture because the business rules are simple. ERP software doesn't have that luxury. An invoice isn't just a database row — it's a document with legal validity, a specific XML structure, digital signature requirements, and a lifecycle (draft, sent, accepted, rejected, voided) that the tax authority partially dictates.",
      },
      {
        type: "p",
        text: "Clean Architecture's core idea — dependencies point inward, toward the domain — is what makes this manageable. The domain layer models an invoice and its rules without knowing whether SUNAT's API is SOAP, REST, or something else entirely. When the tax authority changes its schema (and it will), the blast radius is contained to the infrastructure layer.",
      },
      {
        type: "h3",
        text: "A simplified layer breakdown",
      },
      {
        type: "ul",
        items: [
          "Domain — Invoice, InvoiceLine, TaxRule entities and the business invariants that must always hold true.",
          "Application — use cases like IssueInvoice or VoidInvoice, orchestrating domain objects without knowing about databases or HTTP.",
          "Infrastructure — SUNAT API clients, XML/CDR generation, PostgreSQL repositories, digital signature providers.",
          "Presentation — REST endpoints or internal UI actions that translate requests into application use cases.",
        ],
      },
      {
        type: "h2",
        text: "The pattern that paid off: isolating the tax authority as a port",
      },
      {
        type: "p",
        text: "Instead of calling SUNAT's endpoints directly from application logic, the use case depends on an interface — something like ITaxAuthorityGateway — with methods like SubmitInvoice and CheckStatus. The concrete implementation lives in infrastructure and deals with the ugly parts: XML signing, retries, timeouts, and SUNAT's occasionally inconsistent responses.",
      },
      {
        type: "code",
        lang: "csharp",
        code: `public interface ITaxAuthorityGateway
{
    Task<SubmissionResult> SubmitInvoiceAsync(InvoiceDocument document);
    Task<InvoiceStatus> CheckStatusAsync(string invoiceId);
}

public class IssueInvoiceHandler
{
    private readonly ITaxAuthorityGateway _taxAuthority;
    private readonly IInvoiceRepository _invoices;

    public IssueInvoiceHandler(
        ITaxAuthorityGateway taxAuthority,
        IInvoiceRepository invoices)
    {
        _taxAuthority = taxAuthority;
        _invoices = invoices;
    }

    public async Task<InvoiceResult> Handle(IssueInvoiceCommand command)
    {
        var invoice = Invoice.Create(command.Lines, command.Buyer);

        var submission = await _taxAuthority.SubmitInvoiceAsync(
            invoice.ToDocument());

        invoice.RegisterSubmission(submission);
        await _invoices.SaveAsync(invoice);

        return InvoiceResult.From(invoice);
    }
}`,
      },
      {
        type: "p",
        text: "This one boundary made it possible to build a working fake gateway for local development and integration tests, without ever touching SUNAT's sandbox. It also meant that when a downstream change affected the government API contract, the fix stayed entirely inside one infrastructure class.",
      },
      {
        type: "h2",
        text: "Where SOLID actually shows up day to day",
      },
      {
        type: "p",
        text: "SOLID principles tend to get discussed abstractly, but in ERP work they show up as very concrete decisions. Single Responsibility means the class that calculates tax amounts doesn't also know how to serialize XML. Open/Closed means adding a new tax rule (a new detraction percentage, a new exemption case) shouldn't require rewriting the invoice validation pipeline — it should mean adding one more rule object that plugs into a pipeline that already exists.",
      },
      {
        type: "quote",
        text: "The real test of an architecture isn't how it looks on day one — it's how much you have to touch when a regulation changes six months later.",
      },
      {
        type: "h2",
        text: "Takeaways for backend-heavy business software",
      },
      {
        type: "ul",
        items: [
          "Model the domain first — invoices, business rules, and invariants — before worrying about frameworks.",
          "Push external systems (tax authorities, payment providers, legacy databases) behind interfaces owned by the domain, not the other way around.",
          "Expect regulatory change. Design the seams where that change will land before it happens, not after.",
          "Keep use cases thin and explicit — one class, one business operation, one reason to change.",
        ],
      },
      {
        type: "p",
        text: "None of this is exotic. It's disciplined, sometimes tedious layering — but it's the difference between an ERP module that survives five years of tax law changes and one that gets rewritten every time SUNAT publishes a new resolution.",
      },
    ],
  },
  {
    slug: "diseno-apis-rest-software-financiero",
    title: "Designing REST APIs for Financial Software That People Actually Trust",
    excerpt:
      "Financial data has zero tolerance for ambiguity. Notes on API design, consistency, and data modeling from building a platform that centralizes financial information for companies.",
    date: "2026-08-28",
    readingTime: "6 min read",
    tags: ["REST APIs", "PostgreSQL", "Financial Software", "Backend"],
    content: [
      {
        type: "p",
        text: "When I set out to build a financial information platform designed to centralize company data, the hardest problems weren't in the frontend charts or dashboards — they were in the API contract underneath. Financial data has to be exact, auditable, and unambiguous, or the whole platform loses trust.",
      },
      {
        type: "h2",
        text: "Start from the questions the business actually asks",
      },
      {
        type: "p",
        text: "It's tempting to design a REST API around your database tables — one endpoint per entity, CRUD everywhere. That falls apart quickly for financial software, because the business doesn't think in tables. It thinks in questions: What's our current cash position across accounts? What changed since last month's close? Which transactions are still pending reconciliation?",
      },
      {
        type: "p",
        text: "Designing endpoints around those questions — not just around entities — made the API far more usable for the frontend and far easier to reason about for the backend. A route like GET /accounts/{id}/summary answers a real question; a generic GET /transactions dump forces every consumer to reimplement the aggregation logic themselves.",
      },
      {
        type: "h2",
        text: "Money is not a float",
      },
      {
        type: "p",
        text: "This one is almost a cliché in financial software circles, but it still gets violated constantly. Every monetary amount in the API and the database uses fixed-precision numeric types, never floating point. In PostgreSQL that means NUMERIC(19, 4) for currency amounts, with the currency code stored alongside the value rather than assumed.",
      },
      {
        type: "code",
        lang: "sql",
        code: `CREATE TABLE ledger_entry (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id    UUID NOT NULL REFERENCES account(id),
    amount        NUMERIC(19, 4) NOT NULL,
    currency_code CHAR(3) NOT NULL,
    entry_type    TEXT NOT NULL CHECK (entry_type IN ('debit', 'credit')),
    posted_at     TIMESTAMPTZ NOT NULL,
    reference     TEXT NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ledger_entry_account_posted
    ON ledger_entry (account_id, posted_at DESC);`,
      },
      {
        type: "p",
        text: "The API layer mirrors this discipline: amounts are serialized as strings, not JSON numbers, to avoid client-side floating point rounding when a consumer parses the response. It's a small decision that prevents an entire category of reconciliation bugs later.",
      },
      {
        type: "h2",
        text: "Idempotency is not optional",
      },
      {
        type: "p",
        text: "Any endpoint that creates a financial record — a transaction, a manual adjustment, a reconciliation entry — has to be safe to retry. Network failures happen, clients retry, and a financial platform cannot afford to double-post an entry because a request timed out on the way back.",
      },
      {
        type: "p",
        text: "The pattern I rely on is a required Idempotency-Key header on write endpoints, tied to a unique constraint in the database. If the same key arrives twice, the API returns the original result instead of creating a duplicate record.",
      },
      {
        type: "code",
        lang: "csharp",
        code: `[HttpPost("transactions")]
public async Task<IActionResult> CreateTransaction(
    [FromHeader(Name = "Idempotency-Key")] string idempotencyKey,
    [FromBody] CreateTransactionRequest request)
{
    var existing = await _idempotency.FindAsync(idempotencyKey);
    if (existing is not null)
        return Ok(existing.Response);

    var result = await _transactions.CreateAsync(request.ToCommand());
    await _idempotency.StoreAsync(idempotencyKey, result);

    return Ok(result);
}`,
      },
      {
        type: "h2",
        text: "Every response should explain itself",
      },
      {
        type: "p",
        text: "In financial software, an error response like 400 Bad Request with no detail is a support ticket waiting to happen. Every error includes a stable machine-readable code, a human-readable message, and — when relevant — the specific field or business rule that failed. Consistency across endpoints matters more here than in most domains, because finance teams script against these APIs and build their own tooling on top.",
      },
      {
        type: "quote",
        text: "An API for financial data is a promise about correctness. Every inconsistency in the contract becomes someone else's reconciliation problem.",
      },
      {
        type: "h2",
        text: "What carried over from this project",
      },
      {
        type: "ul",
        items: [
          "Design endpoints around business questions, not just database tables.",
          "Treat monetary values as exact, currency-aware, fixed-precision data — never plain floats.",
          "Make write operations idempotent by default wherever money or ledger state is involved.",
          "Invest in consistent, descriptive error contracts — they double as documentation.",
        ],
      },
      {
        type: "p",
        text: "None of these ideas are unique to finance, but finance is where skipping them gets expensive fast. Building this platform reinforced something I now treat as a default: understand the business problem and the cost of being wrong before writing the first endpoint.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
