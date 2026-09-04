import type { Metadata } from "next";
import Link from "next/link";

const linkedinUrl = "https://www.linkedin.com/in/moritz-jaeger-innovator";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy information for the Adaptance website and internal social media automation tool.",
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <header className="privacy-header">
        <Link className="brand-lockup" href="/" aria-label="Back to Adaptance">
          <img src="/adaptance-logo.svg" alt="Adaptance" width="900" height="180" />
        </Link>
        <Link className="text-link" href="/">
          Back to website
        </Link>
      </header>

      <div className="privacy-shell">
        <aside className="privacy-intro">
          <p className="eyebrow">Privacy</p>
          <h1>Clear by design.</h1>
          <p>
            This policy covers the public Adaptance website and the private social media workflow
            used by its founder.
          </p>
          <p>Last updated: 27 August 2026</p>
        </aside>

        <article className="privacy-content">
          <section>
            <h2>1. Who is responsible</h2>
            <p>
              Moritz Jäger, operating under the Adaptance brand, is responsible for the processing
              described in this policy. Privacy requests can be submitted through his{" "}
              <a href={linkedinUrl} target="_blank" rel="noreferrer">
                LinkedIn profile
              </a>.
            </p>
          </section>

          <section>
            <h2>2. What this policy covers</h2>
            <p>This policy applies to:</p>
            <ul>
              <li>the public Adaptance website;</li>
              <li>the private, single-user social media automation tool used by Moritz Jäger;</li>
              <li>authorized connections to LinkedIn, Microsoft OneDrive and configured AI services.</li>
            </ul>
            <p>
              The social media tool is currently an internal workflow. It is not offered as a public
              service and does not accept third-party user accounts.
            </p>
          </section>

          <section>
            <h2>3. Website data</h2>
            <p>
              The website does not currently use account registration, contact forms, advertising
              trackers or marketing analytics. The hosting provider may process basic technical logs,
              such as IP address, browser information, requested page, timestamp and security events,
              to deliver and protect the site.
            </p>
          </section>

          <section>
            <h2>4. LinkedIn data</h2>
            <p>
              When the internal tool is connected to LinkedIn through the official authorization
              process, it may process the minimum data needed for the permissions granted by LinkedIn.
              This can include:
            </p>
            <ul>
              <li>the authorized member identifier and basic account information;</li>
              <li>authorization tokens and permission status;</li>
              <li>draft, scheduled and published post content;</li>
              <li>publication identifiers, status and errors;</li>
              <li>engagement data only where LinkedIn has granted the relevant permission.</li>
            </ul>
            <p>
              The tool uses official LinkedIn interfaces. It is not designed to scrape LinkedIn,
              share session cookies or operate an autonomous engagement bot. Every externally visible
              post or comment requires human review and approval before publication.
            </p>
          </section>

          <section>
            <h2>5. OneDrive and Logseq notes</h2>
            <p>
              Selected private notes may be retrieved from an explicitly authorized Microsoft
              OneDrive location. The purpose is to identify work-relevant experiences and ideas that
              can inform a draft. Personal material that is not relevant to the selected task should
              be excluded through source selection and relevance filtering.
            </p>
            <p>
              Access is limited to the authorized account and folders. Disconnecting the Microsoft
              connection stops future retrieval.
            </p>
          </section>

          <section>
            <h2>6. AI-assisted processing</h2>
            <p>
              Research material, selected notes and editorial instructions may be sent to configured
              AI service providers to produce drafts, evaluations or visual directions. Only the data
              needed for the requested task should be transmitted. AI output is treated as a draft,
              not as a final decision or autonomous publication.
            </p>
            <p>
              Provider-specific security, retention and international-transfer terms apply to this
              processing. Business or API configurations with limited retention are preferred where
              available.
            </p>
          </section>

          <section>
            <h2>7. Why data is processed</h2>
            <p>Data is processed only to:</p>
            <ul>
              <li>operate and secure the website;</li>
              <li>authenticate authorized connections;</li>
              <li>research, draft, review, schedule and publish Adaptance content;</li>
              <li>maintain an editorial record and diagnose publication errors;</li>
              <li>comply with legal obligations and platform rules.</li>
            </ul>
            <p>
              Depending on the context, processing is based on authorization or consent, steps needed
              to provide the requested function, legal obligations, or legitimate interests in secure
              and reliable business operations.
            </p>
          </section>

          <section>
            <h2>8. Service providers and transfers</h2>
            <p>
              Data may be processed by hosting providers, LinkedIn, Microsoft and configured AI
              providers only where necessary for the functions described above. Some providers may
              process data outside the country in which it was collected. Appropriate contractual or
              provider safeguards are used where required.
            </p>
            <p>Personal data is not sold or used for third-party advertising.</p>
          </section>

          <section>
            <h2>9. Retention and deletion</h2>
            <ul>
              <li>Authorization tokens are kept until they expire, are revoked or are no longer needed.</li>
              <li>Drafts and editorial records are kept until deleted or no longer useful.</li>
              <li>Retrieved note excerpts should be kept only for the active editorial purpose.</li>
              <li>Technical logs are retained only for security, reliability and troubleshooting needs.</li>
            </ul>
            <p>
              Revoking LinkedIn or Microsoft access stops future access. Stored records can be deleted
              separately on request.
            </p>
          </section>

          <section>
            <h2>10. Security</h2>
            <p>
              The tool is designed around least-privilege access, encrypted connections, protected
              credentials, human approval gates and separation between private source material and
              public content. No online system can guarantee absolute security, but access and stored
              data are restricted to what the workflow needs.
            </p>
          </section>

          <section>
            <h2>11. Your rights</h2>
            <p>
              Depending on applicable law, individuals may request access, correction, deletion,
              restriction, portability or objection, and may withdraw consent where processing is
              based on consent. A complaint may also be submitted to the relevant data protection
              authority.
            </p>
          </section>

          <section>
            <h2>12. Changes to this policy</h2>
            <p>
              This policy will be updated when the website, connected services, permissions or use of
              the internal tool materially changes. The current version and update date will remain
              available on this page.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
