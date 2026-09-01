import { Handshake, Network, Route, Search, ShieldCheck, Users } from "lucide-react";

const linkedinUrl = "https://www.linkedin.com/in/moritz-jaeger-innovator";
const workshopImageUrl = "/images/workshop-mapping-sebastien-bonneval.jpg";
const teamImageUrl = "/images/team-collaboration-luke-miller.jpg";

function BrandLockup({ light = false }: { light?: boolean }) {
  return (
    <span className={`brand-lockup${light ? " brand-lockup-light" : ""}`}>
      <img
        src={light ? "/adaptance-logo-light.svg" : "/adaptance-logo.svg"}
        alt="Adaptance"
        width="760"
        height="160"
      />
    </span>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand-link" href="#top" aria-label="Adaptance home">
          <BrandLockup light />
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#sprint">The sprint</a>
          <a href="#method">Method</a>
          <a href="#team">Team</a>
          <a className="nav-cta" href={linkedinUrl} target="_blank" rel="noreferrer">
            Start a conversation <Arrow />
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">AI adoption · Digital transformation · Organizational change</p>
          <h1>
            Technology moves fast.
            <span>Make change workable.</span>
          </h1>
          <p className="hero-intro">
            Adaptance helps leaders turn AI and digital ambition into clearer priorities, better
            workflows and focused experiments that teams can actually carry.
          </p>
          <div className="hero-actions">
            <a className="button button-amber" href={linkedinUrl} target="_blank" rel="noreferrer">
              Start a readiness conversation <Arrow />
            </a>
            <a className="text-link text-link-light" href="#sprint">
              Explore the Adaptance Sprint <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="hero-audience">
            For leaders in health, education, development, innovation and emerging ventures.
          </p>
        </div>

        <div
          className="reality-map"
          role="img"
          aria-label="A reality map showing how visible AI activity, underlying work and organizational constraints lead to focused action"
        >
          <div className="map-heading">
            <span>Reality map / 01</span>
            <strong>Look beneath the rollout.</strong>
          </div>
          <div className="map-track" aria-hidden="true">
            <span />
          </div>
          <div className="map-layer map-visible">
            <span className="layer-label">Visible</span>
            <div className="layer-items">
              <b>AI strategy</b>
              <b>Training</b>
              <b>Pilots</b>
            </div>
          </div>
          <div className="map-layer map-underlying">
            <span className="layer-label">Underlying</span>
            <div className="layer-items">
              <b>Workarounds</b>
              <b>Slow decisions</b>
              <b>Shadow workflows</b>
            </div>
          </div>
          <div className="map-layer map-constraint">
            <span className="layer-label">Constraint</span>
            <strong>Coordination capacity</strong>
            <small>Ownership · trust · priorities · operating reality</small>
          </div>
          <div className="map-action">
            <span className="layer-label">Action</span>
            <strong>One focused experiment</strong>
            <span className="action-arrow" aria-hidden="true">→</span>
          </div>
        </div>
      </section>

      <section className="friction-section" aria-labelledby="friction-heading">
        <div className="section-rail">
          <span>01</span>
          <p>The real gap</p>
        </div>
        <div className="friction-content">
          <p className="eyebrow">The technology is rarely the whole problem</p>
          <h2 id="friction-heading">More tools will not fix an absorption problem.</h2>
          <div className="friction-grid">
            <span className="friction-path" aria-hidden="true" />
            <article>
              <span>VISIBLE</span>
              <h3>Interest is high.</h3>
              <p>New tools, pilots and workshops keep appearing.</p>
            </article>
            <article>
              <span>UNDERLYING</span>
              <h3>Real work shifts quietly.</h3>
              <p>People create shortcuts, parallel routines and invisible dependencies.</p>
            </article>
            <article className="friction-accent">
              <span>CONSTRAINT</span>
              <h3>Capacity stays the same.</h3>
              <p>Priorities, decisions, ownership and trust cannot absorb the change.</p>
            </article>
          </div>
          <p className="friction-conclusion">
            Adaptance starts where most transformation programmes stop: inside the real system of
            work.
          </p>
          <figure className="work-figure">
            <img
              src={workshopImageUrl}
              alt="A team mapping a workflow together with sticky notes"
              width="1800"
              height="1100"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            <figcaption>
              <div>
                <span>Make the work visible</span>
                <strong>Shared maps turn assumptions into a conversation.</strong>
              </div>
              <a
                href="https://unsplash.com/photos/man-in-gray-shirt-facing-sticky-notes-UIpFY1Umamw"
                target="_blank"
                rel="noreferrer"
              >
                Photo · Sebastien Bonneval / Unsplash
              </a>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="sprint-section" id="sprint" aria-labelledby="sprint-heading">
        <div className="sprint-title">
          <p className="section-index section-index-light">02 / A practical starting point</p>
          <p className="sprint-kicker">Focused advisory engagement</p>
          <h2 id="sprint-heading">The Adaptance Sprint</h2>
          <p className="sprint-promise">
            One stuck challenge. One shared reality. One executable next move.
          </p>
        </div>
        <div className="sprint-body">
          <p>
            Bring a concrete AI, digital or organizational challenge. Together, we turn scattered
            signals into a clear diagnosis, a priority decision and a focused route into action.
          </p>
          <div className="sprint-outputs" aria-label="Adaptance Sprint outputs">
            <div><span>01</span><strong>Constraint map</strong></div>
            <div><span>02</span><strong>Priority map</strong></div>
            <div><span>03</span><strong>Experiment backlog</strong></div>
            <div><span>04</span><strong>First implementation steps</strong></div>
          </div>
          <a className="button button-paper" href={linkedinUrl} target="_blank" rel="noreferrer">
            Discuss a sprint with the team <Arrow />
          </a>
        </div>
      </section>

      <section className="method-section" id="method" aria-labelledby="method-heading">
        <div className="method-intro">
          <p className="section-index">03 / The Adaptance method</p>
          <h2 id="method-heading">Reveal. Align. Act.</h2>
          <p>
            A simple operating sequence for moving from a visible symptom to change that holds in
            real work.
          </p>
        </div>
        <div className="method-steps">
          <article>
            <div className="method-card-top">
              <span className="method-number">01</span>
              <Search aria-hidden="true" />
            </div>
            <p className="method-verb">Reveal</p>
            <h3>What is really happening beneath the visible issue?</h3>
            <p>Map workflows, decisions, incentives, skills, trust and operational constraints.</p>
            <strong className="method-output">Output · Reality and constraint map</strong>
          </article>
          <article>
            <div className="method-card-top">
              <span className="method-number">02</span>
              <Users aria-hidden="true" />
            </div>
            <p className="method-verb">Align</p>
            <h3>What matters now, and what can the system realistically carry?</h3>
            <p>Bring people, processes and priorities into one practical direction.</p>
            <strong className="method-output">Output · Priority decision</strong>
          </article>
          <article className="method-action">
            <div className="method-card-top">
              <span className="method-number">03</span>
              <Route aria-hidden="true" />
            </div>
            <p className="method-verb">Act</p>
            <h3>Which experiment changes real work first?</h3>
            <p>Translate insight into workflow changes, use cases and implementation steps.</p>
            <strong className="method-output">Output · Action backlog</strong>
          </article>
        </div>
      </section>

      <section className="trigger-section" aria-labelledby="trigger-heading">
        <div className="section-rail section-rail-dark">
          <span>04</span>
          <p>When to call</p>
        </div>
        <div className="trigger-content">
          <p className="eyebrow eyebrow-amber">Bring Adaptance in when...</p>
          <h2 id="trigger-heading">The ambition is clear, but the route into real work is not.</h2>
          <div className="trigger-list">
            <article>
              <span>01</span>
              <p>AI interest is high, but no one agrees where to start.</p>
            </article>
            <article>
              <span>02</span>
              <p>A promising pilot refuses to become normal work.</p>
            </article>
            <article>
              <span>03</span>
              <p>A digital workflow looks efficient on paper but creates shadow work underneath.</p>
            </article>
          </div>
          <div className="focus-band">
            <span>AI readiness</span>
            <span>Workflow modernization</span>
            <span>Implementation support</span>
          </div>
        </div>
      </section>

      <section className="team-section" id="team" aria-labelledby="team-heading">
        <div className="team-media-stack">
          <figure className="team-photo">
            <img
              src={teamImageUrl}
              alt="Two professionals reviewing documents and working together at a laptop"
              width="1600"
              height="1067"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            <figcaption>
              <span>Collaboration in practice</span>
              <a
                href="https://www.pexels.com/photo/people-sitting-at-a-table-writing-and-using-laptop-13701583/"
                target="_blank"
                rel="noreferrer"
              >
                Photo · Luke Miller / Pexels
              </a>
            </figcaption>
          </figure>

          <div
            className="team-model"
            role="img"
            aria-label="Adaptance forms one accountable engagement team from a trusted network of specialists"
          >
            <div className="team-model-heading">
              <span>How the team works</span>
              <strong>Flexible expertise. Clear accountability.</strong>
            </div>
            <div className="team-flow" aria-hidden="true">
              <span className="team-flow-progress"><i /></span>
              <div className="team-stage team-stage-network">
                <small>01</small>
                <strong>Trusted network</strong>
                <span>Finance · Software · Programmes · Change</span>
              </div>
              <div className="team-stage team-stage-match">
                <small>02</small>
                <strong>Right mix</strong>
                <span>Selected for the challenge</span>
              </div>
              <div className="team-stage team-stage-core">
                <small>03</small>
                <strong>One accountable team</strong>
                <span>Clear lead · Shared standards</span>
              </div>
            </div>
            <p className="team-model-caption">
              Independent specialists today. A stable core team as Adaptance grows.
            </p>
          </div>
        </div>
        <div className="team-copy">
          <p className="section-index team-section-index">
            <span>05</span>
            <span>A small, reliable team</span>
          </p>
          <h2 id="team-heading">Small by design. Built for reliable delivery.</h2>
          <p className="team-lead">
            Adaptance works through a trusted network of independent specialists, bringing
            systems thinking, finance, software delivery and programme leadership around one
            practical challenge.
          </p>
          <p>
            For clients and funding partners, that creates one clear line of responsibility without
            pretending every challenge needs a large permanent team.
          </p>
          <p className="team-honesty">
            The model is deliberately lean today. Over the coming months, selected roles will move
            into a permanent core while Adaptance keeps the specialist flexibility of its network.
          </p>
          <div className="team-principles" aria-label="Adaptance team operating principles">
            <article>
              <ShieldCheck aria-hidden="true" />
              <strong>Accountable ownership</strong>
              <span>One clear lead from diagnosis through delivery.</span>
            </article>
            <article>
              <Network aria-hidden="true" />
              <strong>Complementary expertise</strong>
              <span>The right disciplines around one shared problem.</span>
            </article>
            <article>
              <Handshake aria-hidden="true" />
              <strong>Continuity by design</strong>
              <span>Knowledge and responsibility do not sit with one person.</span>
            </article>
          </div>
          <div className="experience-line" aria-label="Adaptance capability areas">
            <span>Systems and change</span>
            <span>Finance and commercial thinking</span>
            <span>Software and digital delivery</span>
            <span>Programme management</span>
            <span>Health and development</span>
          </div>
          <a className="text-link" href={linkedinUrl} target="_blank" rel="noreferrer">
            Start a conversation with Adaptance <Arrow />
          </a>
        </div>
      </section>

      <section className="closing-section">
        <div className="closing-question">
          <p className="eyebrow eyebrow-amber">From uncertainty to action</p>
          <h2>What is getting stuck between technological possibility and real work?</h2>
        </div>
        <div className="closing-action">
          <p>
            Bring one concrete challenge. We will determine whether an Adaptance Sprint is the
            right starting point.
          </p>
          <a className="button button-amber" href={linkedinUrl} target="_blank" rel="noreferrer">
            Talk it through with Adaptance <Arrow />
          </a>
          <small>Focused. Practical. No transformation theatre.</small>
        </div>
      </section>

      <footer className="site-footer">
        <BrandLockup light />
        <p>From uncertainty to action.</p>
        <div>
          <a href="/privacy">Privacy</a>
          <a href={linkedinUrl} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </footer>
    </main>
  );
}
