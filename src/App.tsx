import { useState, useEffect } from 'react'
import profilePhoto from '@/imports/profile.jpeg'

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Journey', 'Education', 'Contact']

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function App() {
  const [activeSection, setActiveSection] = useState('about')
  const [cardHover, setCardHover] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { threshold: 0.3 }
    )
    NAV_LINKS.forEach((l) => {
      const el = document.getElementById(l.toLowerCase())
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* subtle grid overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(57,232,122,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(57,232,122,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1280,
          margin: '0 auto',
          padding: '32px 24px 120px',
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: 32,
          alignItems: 'start',
        }}
        className="max-[900px]:grid-cols-1!"
      >
        {/* ── LEFT PROFILE CARD ── */}
        <aside
          style={{ position: 'sticky', top: 32 }}
          className="max-[900px]:static!"
        >
          <div
            className="glass"
            style={{
              borderRadius: 24,
              padding: 28,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >
            {/* profile photo */}
            <div
              style={{
                width: 180,
                height: 180,
                borderRadius: 18,
                overflow: 'hidden',
                border: '2px solid rgba(57,232,122,0.25)',
                boxShadow: '0 0 30px rgba(57,232,122,0.1)',
                flexShrink: 0,
              }}
            >
              <img
                src={profilePhoto}
                alt="M. Umair Khan"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F5F5F5', margin: 0 }}>
                M. Umair Khan
              </h1>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.68rem',
                  letterSpacing: '0.12em',
                  color: '#39E87A',
                  marginTop: 4,
                  textTransform: 'uppercase',
                }}
              >
                Software Engineer
              </p>
              <p style={{ fontSize: '0.78rem', color: '#8A8F8B', marginTop: 6 }}>
                📍 Pakistan
              </p>
            </div>

            <div
              style={{
                width: '100%',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <ContactRow icon="✉" label="umair@example.com" />
              <ContactRow icon="🔗" label="linkedin.com/in/umair" />
              <ContactRow icon="🐙" label="github.com/umair" />
            </div>

            {/* tech stack chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
              {['Java', 'Spring Boot', 'React', 'MySQL', 'Docker'].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                style={{
                  width: '100%',
                  padding: '10px 0',
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#F5F5F5',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
              >
                📄 View Resume
              </button>
              <button
                onClick={() => scrollTo('contact')}
                style={{
                  width: '100%',
                  padding: '10px 0',
                  borderRadius: 10,
                  background: '#39E87A',
                  border: 'none',
                  color: '#0A0A0A',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = '#20C96B')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#39E87A')}
              >
                ✉ Contact Me
              </button>
            </div>
          </div>
        </aside>

        {/* ── RIGHT CONTENT ── */}
        <main style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>

          {/* ABOUT */}
          <section id="about">
            <div className="section-label" style={{ marginBottom: 20 }}>About</div>
            <p style={{ fontSize: '1rem', color: '#8A8F8B', marginBottom: 8, fontWeight: 400 }}>
              Hello! I'm a{' '}
              <span style={{ color: '#39E87A', fontWeight: 600 }}>Software Engineer</span>
            </p>
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                color: '#F5F5F5',
                margin: '0 0 24px',
                letterSpacing: '-0.02em',
              }}
            >
              Building Software That
              <br />
              <span style={{ color: '#39E87A' }}>Solves Real Problems</span>
            </h2>
            <p
              style={{
                fontSize: '1rem',
                color: '#8A8F8B',
                lineHeight: 1.75,
                maxWidth: 640,
                marginBottom: 36,
              }}
            >
              I'm M. Umair Khan, a Software Engineering student focused on building modern
              applications with Java, Spring Boot, React, and Docker. I enjoy designing backend
              systems, REST APIs, authentication flows, and practical software solutions that solve
              real-world problems.
            </p>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { num: '2+', label: 'Major Projects' },
                { num: '10+', label: 'Technologies Used' },
                { num: 'Full', label: 'Stack Development' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="glass glass-hover"
                  style={{ borderRadius: 14, padding: '20px 18px' }}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '2rem',
                      fontWeight: 700,
                      color: '#F5F5F5',
                      lineHeight: 1,
                    }}
                  >
                    {s.num}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#8A8F8B', marginTop: 6 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SKILLS */}
          <section id="skills">
            <div className="section-label" style={{ marginBottom: 12 }}>Skills</div>
            <h2 style={sectionHeading}>Tools I Build With</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
              {[
                {
                  cat: 'Backend',
                  skills: ['Java', 'Spring Boot', 'Spring Security', 'REST APIs', 'JWT', 'Microservices'],
                },
                {
                  cat: 'Frontend',
                  skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Vite'],
                },
                {
                  cat: 'Database',
                  skills: ['MySQL', 'SQL'],
                },
                {
                  cat: 'DevOps & Tools',
                  skills: ['Docker', 'Docker Compose', 'Git', 'GitHub', 'Nginx'],
                },
              ].map((group) => (
                <div key={group.cat} className="glass" style={{ borderRadius: 14, padding: 18 }}>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.68rem',
                      color: '#39E87A',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginBottom: 12,
                    }}
                  >
                    {group.cat}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {group.skills.map((s) => (
                      <span
                        key={s}
                        style={{
                          fontSize: '0.78rem',
                          color: '#C8CCC9',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: 6,
                          padding: '3px 10px',
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects">
            <div className="section-label" style={{ marginBottom: 12 }}>Projects</div>
            <h2 style={sectionHeading}>Things I've Built</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <ProjectCard
                title="MASAIL"
                subtitle="Community Issue Reporting & Crowdfunding Platform"
                description="A community-focused platform that allows residents to report local infrastructure problems, verify residency, support community issues, and track funded repair campaigns."
                tags={['Java', 'Spring Boot', 'React', 'MySQL', 'Docker', 'JWT', 'REST API']}
                features={['Issue reporting', 'Resident verification', 'Community funding', 'Campaign tracking', 'Role-based access', 'Admin management']}
                visual="masail"
                hovered={cardHover === 'masail'}
                onHover={(v) => setCardHover(v)}
              />
              <ProjectCard
                title="MindCare"
                subtitle="Mental Health Support Platform"
                description="A full-stack platform built around authentication, user dashboards, secure backend APIs, and mental-health support workflows."
                tags={['Java', 'Spring Boot', 'React', 'MySQL', 'Docker', 'JWT', 'OAuth2']}
                features={['JWT authentication', 'Google OAuth2', 'REST APIs', 'React SPA', 'Spring Boot backend', 'MySQL']}
                visual="mindcare"
                hovered={cardHover === 'mindcare'}
                onHover={(v) => setCardHover(v)}
              />
            </div>
          </section>

          {/* JOURNEY */}
          <section id="journey">
            <div className="section-label" style={{ marginBottom: 12 }}>Engineering Journey</div>
            <h2 style={sectionHeading}>Learning By Building</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <TimelineItem
                title="Software Engineering Student"
                sub="Mohammad Ali Jinnah University"
                color="#39E87A"
                last={false}
                items={['Java', 'Spring Boot', 'Backend development', 'Databases', 'Software architecture', 'Full-stack development']}
              />
              <TimelineItem
                title="MASAIL — Community Platform"
                sub="Full-Stack Engineering Project"
                color="#39E87A"
                last={false}
                items={['Authentication & Authorization', 'Verification workflows', 'REST APIs', 'Campaign management', 'Docker deployment']}
              />
              <TimelineItem
                title="MindCare — Health Platform"
                sub="Full-Stack Engineering Project"
                color="#39E87A"
                last={true}
                items={['Spring Boot', 'React SPA', 'JWT & OAuth2', 'MySQL', 'Docker']}
              />
            </div>
          </section>

          {/* EDUCATION */}
          <section id="education">
            <div className="section-label" style={{ marginBottom: 12 }}>Education</div>
            <h2 style={sectionHeading}>Software Engineering</h2>
            <div
              className="glass"
              style={{
                borderRadius: 16,
                padding: 28,
                display: 'flex',
                gap: 20,
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'rgba(57,232,122,0.12)',
                  border: '1px solid rgba(57,232,122,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  flexShrink: 0,
                }}
              >
                🎓
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#F5F5F5' }}>
                  Bachelor of Science in Software Engineering
                </div>
                <div style={{ color: '#39E87A', fontSize: '0.85rem', marginTop: 4 }}>
                  Mohammad Ali Jinnah University
                </div>
                <div style={{ color: '#8A8F8B', fontSize: '0.8rem', marginTop: 8 }}>
                  Focus on backend systems, software architecture, databases, and full-stack development.
                </div>
              </div>
            </div>
          </section>

          {/* PHILOSOPHY */}
          <section id="philosophy">
            <div
              className="glass"
              style={{
                borderRadius: 20,
                padding: 40,
                textAlign: 'center',
                borderColor: 'rgba(57,232,122,0.12)',
              }}
            >
              <h2
                style={{
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                  fontWeight: 800,
                  color: '#F5F5F5',
                  marginBottom: 32,
                  letterSpacing: '-0.02em',
                }}
              >
                I Don't Just Write Code.{' '}
                <span style={{ color: '#39E87A' }}>I Build Systems.</span>
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {[
                  { icon: '🔨', title: 'Build', text: 'Create practical software that solves real problems.' },
                  { icon: '🧠', title: 'Understand', text: 'Focus on backend architecture, databases, APIs, and system behavior.' },
                  { icon: '📈', title: 'Improve', text: 'Continuously learn better engineering practices.' },
                ].map((p) => (
                  <div
                    key={p.title}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 14,
                      padding: '20px 16px',
                    }}
                  >
                    <div style={{ fontSize: '1.5rem', marginBottom: 10 }}>{p.icon}</div>
                    <div style={{ fontWeight: 700, color: '#F5F5F5', marginBottom: 6 }}>{p.title}</div>
                    <div style={{ fontSize: '0.82rem', color: '#8A8F8B', lineHeight: 1.6 }}>{p.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact">
            <div className="section-label" style={{ marginBottom: 12 }}>Contact</div>
            <h2 style={sectionHeading}>Have a Project in Mind?</h2>
            <p style={{ color: '#8A8F8B', marginBottom: 32, lineHeight: 1.7 }}>
              I'm interested in building meaningful software and exploring new engineering challenges.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href="mailto:umair@example.com"
                style={{
                  padding: '12px 28px',
                  borderRadius: 10,
                  background: '#39E87A',
                  color: '#0A0A0A',
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = '#20C96B')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#39E87A')}
              >
                ✉ Email Me
              </a>
              <a
                href="#"
                style={{
                  padding: '12px 28px',
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#F5F5F5',
                  fontWeight: 500,
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                🔗 LinkedIn
              </a>
              <a
                href="#"
                style={{
                  padding: '12px 28px',
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#F5F5F5',
                  fontWeight: 500,
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                🐙 GitHub
              </a>
            </div>
          </section>
        </main>
      </div>

      {/* ── FLOATING BOTTOM NAV ── */}
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          background: 'rgba(15,15,15,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 100,
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(57,232,122,0.05)',
          maxWidth: 'calc(100vw - 32px)',
        }}
      >
        {/* mini profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingRight: 12, borderRight: '1px solid rgba(255,255,255,0.08)', marginRight: 4 }}>
          <img
            src={profilePhoto}
            alt="Umair"
            style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '1px solid rgba(57,232,122,0.3)' }}
          />
          <div style={{ display: 'none' }} className="sm:block">
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#F5F5F5', whiteSpace: 'nowrap' }}>M. Umair Khan</div>
            <div style={{ fontSize: '0.6rem', color: '#39E87A', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em' }}>Software Engineer</div>
          </div>
        </div>

        {/* nav links */}
        {NAV_LINKS.map((link) => (
          <button
            key={link}
            onClick={() => scrollTo(link.toLowerCase())}
            style={{
              background: activeSection === link.toLowerCase() ? 'rgba(57,232,122,0.12)' : 'transparent',
              border: 'none',
              color: activeSection === link.toLowerCase() ? '#39E87A' : '#8A8F8B',
              fontSize: '0.78rem',
              fontWeight: activeSection === link.toLowerCase() ? 600 : 400,
              padding: '6px 10px',
              borderRadius: 8,
              cursor: 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseOver={(e) => { if (activeSection !== link.toLowerCase()) e.currentTarget.style.color = '#F5F5F5' }}
            onMouseOut={(e) => { if (activeSection !== link.toLowerCase()) e.currentTarget.style.color = '#8A8F8B' }}
          >
            {link}
          </button>
        ))}

        {/* Hire Me */}
        <button
          onClick={() => scrollTo('contact')}
          style={{
            marginLeft: 8,
            padding: '7px 16px',
            borderRadius: 100,
            background: '#39E87A',
            border: 'none',
            color: '#0A0A0A',
            fontWeight: 700,
            fontSize: '0.78rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = '#20C96B')}
          onMouseOut={(e) => (e.currentTarget.style.background = '#39E87A')}
        >
          Hire Me
        </button>
      </div>
    </div>
  )
}

/* ── Helpers ── */

const sectionHeading: React.CSSProperties = {
  fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
  fontWeight: 800,
  color: '#F5F5F5',
  marginBottom: 28,
  letterSpacing: '-0.02em',
  lineHeight: 1.15,
}

function ContactRow({ icon, label }: { icon: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: '#8A8F8B' }}>
      <span>{icon}</span>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  )
}

function ProjectCard({
  title, subtitle, description, tags, features, visual, hovered, onHover,
}: {
  title: string
  subtitle: string
  description: string
  tags: string[]
  features: string[]
  visual: string
  hovered: boolean
  onHover: (v: string | null) => void
}) {
  return (
    <div
      className="glass"
      onMouseEnter={() => onHover(visual)}
      onMouseLeave={() => onHover(null)}
      style={{
        borderRadius: 18,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        borderColor: hovered ? 'rgba(57,232,122,0.25)' : 'rgba(255,255,255,0.08)',
        boxShadow: hovered ? '0 12px 40px rgba(57,232,122,0.08)' : 'none',
      }}
    >
      {/* abstract visual */}
      <div
        style={{
          height: 160,
          background: 'rgba(0,0,0,0.5)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          transition: 'all 0.3s',
        }}
      >
        {visual === 'masail' ? <MasailVisual hovered={hovered} /> : <MindCareVisual hovered={hovered} />}
      </div>

      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
          <div>
            <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.1rem', fontWeight: 700, color: '#F5F5F5', margin: 0 }}>
              {title}
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#39E87A', marginTop: 2 }}>{subtitle}</p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <button style={ghostBtn}>View Project ↗</button>
            <button style={ghostBtn}>GitHub</button>
          </div>
        </div>
        <p style={{ fontSize: '0.85rem', color: '#8A8F8B', lineHeight: 1.7, marginBottom: 14 }}>{description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          {features.map((f) => (
            <span key={f} style={{ fontSize: '0.73rem', color: '#8A8F8B', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, padding: '2px 8px' }}>
              {f}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

const ghostBtn: React.CSSProperties = {
  padding: '5px 12px',
  borderRadius: 8,
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#C8CCC9',
  fontSize: '0.73rem',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: 'all 0.2s',
}

function MasailVisual({ hovered }: { hovered: boolean }) {
  const steps = ['Issue', 'Verify', 'Campaign', 'Fund', 'Repair', 'Done']
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, padding: '0 24px', transform: hovered ? 'scale(1.03)' : 'scale(1)', transition: 'transform 0.3s' }}>
      {steps.map((s, i) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <div style={{ background: 'rgba(57,232,122,0.1)', border: '1px solid rgba(57,232,122,0.3)', borderRadius: 8, padding: '6px 10px', fontSize: '0.65rem', color: '#39E87A', fontFamily: "'JetBrains Mono', monospace', whiteSpace: 'nowrap" }}>
            {s}
          </div>
          {i < steps.length - 1 && (
            <div style={{ width: 18, height: 1, background: 'rgba(57,232,122,0.3)', margin: '0 2px' }} />
          )}
        </div>
      ))}
    </div>
  )
}

function MindCareVisual({ hovered }: { hovered: boolean }) {
  const boxes = [
    { label: 'JWT Auth', col: '#39E87A' },
    { label: 'OAuth2', col: '#39E87A' },
    { label: 'REST API', col: '#20C96B' },
    { label: 'React SPA', col: '#20C96B' },
    { label: 'Spring Boot', col: '#39E87A' },
    { label: 'MySQL', col: '#20C96B' },
  ]
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '0 24px', justifyContent: 'center', transform: hovered ? 'scale(1.03)' : 'scale(1)', transition: 'transform 0.3s' }}>
      {boxes.map((b) => (
        <div key={b.label} style={{ background: 'rgba(57,232,122,0.07)', border: `1px solid ${b.col}33`, borderRadius: 8, padding: '6px 12px', fontSize: '0.65rem', color: b.col, fontFamily: "'JetBrains Mono', monospace" }}>
          {b.label}
        </div>
      ))}
    </div>
  )
}

function TimelineItem({ title, sub, items, last }: { title: string; sub: string; color: string; items: string[]; last: boolean }) {
  return (
    <div style={{ display: 'flex', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#39E87A', boxShadow: '0 0 8px #39E87A', marginTop: 4, flexShrink: 0 }} />
        {!last && <div style={{ width: 1, flex: 1, background: 'rgba(57,232,122,0.2)', margin: '6px 0' }} />}
      </div>
      <div style={{ paddingBottom: last ? 0 : 32 }}>
        <div style={{ fontWeight: 700, color: '#F5F5F5', fontSize: '0.95rem' }}>{title}</div>
        <div style={{ color: '#39E87A', fontSize: '0.78rem', marginTop: 2, marginBottom: 10 }}>{sub}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {items.map((item) => (
            <span key={item} style={{ fontSize: '0.73rem', color: '#8A8F8B', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 4, padding: '2px 8px' }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
