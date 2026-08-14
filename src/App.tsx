import { useState, useEffect } from 'react'
import profilePhoto from '@/imports/profile.jpeg'

// ── EDIT YOUR PERSONAL DETAILS & SOCIAL LINKS HERE ──
export const PERSONAL_INFO = {
  name: 'M. Umair Khan',
  title: 'Software Engineer',
  location: 'Pakistan',
  email: 'kzumair939@gmail.com',
  phone: '+92 314 2712220',
  linkedin: 'https://www.linkedin.com/in/umairkhan28/',
  github: 'https://github.com/kzumair939',
  resumeUrl: '/Umair_Khan_Resume.pdf',
  // Get a free direct inbox key at https://web3forms.com (no backend required!)
  web3formsKey: import.meta.env.VITE_WEB3FORMS_KEY || '',
}

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Certifications', 'Journey', 'Education', 'Contact']

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function App() {
  const [activeSection, setActiveSection] = useState('about')
  const [cardHover, setCardHover] = useState<string | null>(null)

  // Hire / Contact Modal State
  const [isHireModalOpen, setIsHireModalOpen] = useState(false)
  const [formState, setFormState] = useState({ name: '', email: '', subject: 'Hire Request / Project Inquiry', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitType, setSubmitType] = useState<'direct' | 'mailto' | null>(null)

  const handleHireClick = (subjectPreset = 'Hire Request / Project Inquiry') => {
    setFormState((prev) => ({ ...prev, subject: subjectPreset }))
    setFormSubmitted(false)
    setSubmitType(null)
    setIsHireModalOpen(true)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Send direct email via Web3Forms API if key is configured
    if (PERSONAL_INFO.web3formsKey && PERSONAL_INFO.web3formsKey !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: PERSONAL_INFO.web3formsKey,
            name: formState.name,
            email: formState.email,
            subject: formState.subject,
            message: formState.message,
            from_name: 'Portfolio Hiring Form',
          }),
        })
        const data = await response.json()
        if (data.success) {
          setSubmitType('direct')
          setFormSubmitted(true)
          setIsSubmitting(false)
          return
        }
      } catch (err) {
        console.error('Web3Forms submit error:', err)
      }
    }

    // Fallback: mailto link
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formState.subject)}&body=${encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    )}`
    window.location.href = mailtoUrl
    setSubmitType('mailto')
    setFormSubmitted(true)
    setIsSubmitting(false)
  }

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
    <div style={{ background: '#0A0A0A', minHeight: '100vh', width: '100%', fontFamily: "'Inter', sans-serif", position: 'relative' }}>
      {/* Ambient background glowing orbs */}
      <div className="glow-orb-left" />
      <div className="glow-orb-right" />

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
          maxWidth: 1080,
          width: '100%',
          margin: '0 auto',
          padding: '24px 20px 120px',
          display: 'grid',
          gridTemplateColumns: '270px minmax(0, 1fr)',
          gap: 28,
          alignItems: 'start',
          boxSizing: 'border-box',
        }}
        className="max-[900px]:grid-cols-1!"
      >
        {/* ── LEFT PROFILE CARD ── */}
        <aside
          style={{ position: 'sticky', top: 24, zIndex: 10, height: 'fit-content', minWidth: 0 }}
          className="max-[900px]:static!"
        >
          <div
            className="glass animate-fade-up"
            style={{
              borderRadius: 20,
              padding: '20px 18px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 10px 40px rgba(0,0,0,0.6), 0 0 30px rgba(57,232,122,0.05)',
            }}
          >
            {/* profile photo */}
            <div
              style={{
                width: 125,
                height: 125,
                borderRadius: 16,
                overflow: 'hidden',
                border: '2px solid rgba(57,232,122,0.3)',
                boxShadow: '0 0 25px rgba(57,232,122,0.18)',
                flexShrink: 0,
                position: 'relative',
              }}
            >
              <img
                src={profilePhoto}
                alt={PERSONAL_INFO.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F5F5F5', margin: 0 }}>
                {PERSONAL_INFO.name}
              </h1>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  color: '#39E87A',
                  marginTop: 3,
                  textTransform: 'uppercase',
                }}
              >
                {PERSONAL_INFO.title}
              </p>

              {/* Status pill badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'rgba(57,232,122,0.08)',
                  border: '1px solid rgba(57,232,122,0.25)',
                  borderRadius: 100,
                  padding: '3px 10px',
                  fontSize: '0.65rem',
                  color: '#39E87A',
                  marginTop: 8,
                  fontWeight: 500,
                }}
                className="animate-pulse-glow"
              >
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#39E87A', boxShadow: '0 0 6px #39E87A' }} />
                Open for Opportunities
              </div>

              <p style={{ fontSize: '0.75rem', color: '#8A8F8B', marginTop: 4 }}>
                📍 {PERSONAL_INFO.location}
              </p>
            </div>

            <div
              style={{
                width: '100%',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
              }}
            >
              <ContactRow icon="✉" label={PERSONAL_INFO.email} href={`mailto:${PERSONAL_INFO.email}`} />
              <ContactRow icon="📞" label={PERSONAL_INFO.phone} href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`} />
              <ContactRow icon={<LinkedInIcon size={15} color="#39E87A" />} label="LinkedIn Profile" href={PERSONAL_INFO.linkedin} />
              <ContactRow icon={<GitHubIcon size={15} color="#39E87A" />} label="GitHub Profile" href={PERSONAL_INFO.github} />
            </div>

            {/* tech stack chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
              {['Java', 'Spring Boot', 'React', 'MySQL', 'Docker'].map((t) => (
                <span key={t} className="tag" style={{ fontSize: '0.65rem', padding: '2px 7px' }}>{t}</span>
              ))}
            </div>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8, marginTop: 2 }}>
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '100%',
                  padding: '8px 0',
                  borderRadius: 8,
                  background: 'rgba(57,232,122,0.1)',
                  border: '1px solid rgba(57,232,122,0.3)',
                  color: '#39E87A',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(57,232,122,0.2)'
                  e.currentTarget.style.borderColor = 'rgba(57,232,122,0.5)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(57,232,122,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(57,232,122,0.3)'
                }}
              >
                📄 View Resume PDF ↗
              </a>
              <button
                onClick={() => handleHireClick('Contact Inquiry')}
                style={{
                  width: '100%',
                  padding: '8px 0',
                  borderRadius: 8,
                  background: '#39E87A',
                  border: 'none',
                  color: '#0A0A0A',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
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
        <main style={{ display: 'flex', flexDirection: 'column', gap: 80, minWidth: 0, width: '100%' }}>

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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14, maxWidth: 540 }}>
              {[
                { num: '2+', label: 'Major Projects' },
                { num: '10+', label: 'Technologies Used' },
                { num: 'Full', label: 'Stack Development' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="glass glass-hover"
                  style={{ borderRadius: 12, padding: '16px 14px' }}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '1.75rem',
                      fontWeight: 700,
                      color: '#F5F5F5',
                      lineHeight: 1,
                    }}
                  >
                    {s.num}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#8A8F8B', marginTop: 6 }}>
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
            <div className="marquee-container" style={{ padding: '8px 0' }}>
              <div className="marquee-track" style={{ animationDuration: '28s', gap: 16 }}>
                {[
                  { cat: 'Backend', skills: ['Java', 'Spring Boot', 'Spring Security', 'REST APIs', 'JWT', 'Microservices'] },
                  { cat: 'Frontend', skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Vite'] },
                  { cat: 'Database', skills: ['MySQL', 'SQL'] },
                  { cat: 'DevOps & Tools', skills: ['Docker', 'Docker Compose', 'Git', 'GitHub', 'Nginx'] },
                  { cat: 'Backend', skills: ['Java', 'Spring Boot', 'Spring Security', 'REST APIs', 'JWT', 'Microservices'] },
                  { cat: 'Frontend', skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Vite'] },
                  { cat: 'Database', skills: ['MySQL', 'SQL'] },
                  { cat: 'DevOps & Tools', skills: ['Docker', 'Docker Compose', 'Git', 'GitHub', 'Nginx'] },
                  { cat: 'Backend', skills: ['Java', 'Spring Boot', 'Spring Security', 'REST APIs', 'JWT', 'Microservices'] },
                  { cat: 'Frontend', skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Vite'] },
                  { cat: 'Database', skills: ['MySQL', 'SQL'] },
                  { cat: 'DevOps & Tools', skills: ['Docker', 'Docker Compose', 'Git', 'GitHub', 'Nginx'] },
                ].map((group, idx) => (
                  <div
                    key={idx}
                    className="glass glass-hover"
                    style={{
                      borderRadius: 16,
                      padding: 20,
                      width: 270,
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.7rem',
                        color: '#39E87A',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        marginBottom: 14,
                        fontWeight: 600,
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
                            padding: '4px 10px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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
                description="A community-focused platform enabling residents to report local infrastructure problems, verify residency, back community campaigns, and track repair progress transparently."
                tags={['Java', 'Spring Boot', 'React', 'MySQL', 'Docker', 'JWT', 'REST API']}
                features={['Issue Reporting', 'Resident Verification', 'Community Funding', 'Campaign Tracking', 'Role-Based Access', 'Admin Management']}
                visual="masail"
                githubUrl="https://github.com/kzumair939/MASAIL"
                hovered={cardHover === 'masail'}
                onHover={(v) => setCardHover(v)}
              />
              <ProjectCard
                title="MindCare"
                subtitle="Mental Health Support Platform"
                description="A modern full-stack mental health platform connecting users with therapists through secure WebRTC video sessions, real-time WebSocket messaging, group therapy rooms, and health assessments."
                tags={['Java', 'Spring Boot', 'React', 'WebRTC', 'WebSockets', 'MySQL', 'Docker', 'JWT', 'OAuth2']}
                features={['WebRTC Video Calls', 'WebSocket Messaging', 'JWT & Google OAuth2', 'Therapist Dashboard', 'Group Therapy Rooms', 'Real-time Chat & Analytics']}
                visual="mindcare"
                githubUrl="https://github.com/kzumair939/MindCare_"
                hovered={cardHover === 'mindcare'}
                onHover={(v) => setCardHover(v)}
              />
            </div>
          </section>

          {/* CERTIFICATIONS */}
          <section id="certifications">
            <div className="section-label" style={{ marginBottom: 12 }}>Certifications</div>
            <h2 style={sectionHeading}>Continuous Learning & Growth</h2>
            <p style={{ color: '#8A8F8B', marginBottom: 32, lineHeight: 1.75, maxWidth: 640 }}>
              Professional certifications in Spring Boot, Java backend engineering, Generative AI integration, and the Anthropic Claude ecosystem.
            </p>

            {/* Spring & Java AI Suite */}
            <div style={{ marginBottom: 36 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.75rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  color: '#39E87A',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: 16,
                  fontWeight: 600,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#39E87A', display: 'inline-block', boxShadow: '0 0 8px #39E87A' }} />
                Spring & Java AI
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: 20,
                }}
              >
                {CERTIFICATIONS.filter((c) => c.provider !== 'Anthropic').map((cert) => (
                  <CertificationCard key={cert.title} {...cert} />
                ))}
              </div>
            </div>

            {/* Anthropic Certifications Suite */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.75rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  color: '#39E87A',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: 16,
                  fontWeight: 600,
                }}
              >
                <AnthropicIcon size={16} color="#39E87A" />
                Anthropic Certifications
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: 20,
                }}
              >
                {CERTIFICATIONS.filter((c) => c.provider === 'Anthropic').map((cert) => (
                  <CertificationCard key={cert.title} {...cert} />
                ))}
              </div>
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
                title="MindCare — Mental Health Support Platform"
                sub="Full-Stack Engineering Project (WebRTC & WebSockets)"
                color="#39E87A"
                last={false}
                items={['Spring Boot', 'React SPA', 'WebRTC Video Calls', 'WebSocket Chat', 'JWT & Google OAuth2', 'MySQL', 'Docker']}
              />
              <TimelineItem
                title="MASAIL — Community Platform"
                sub="Full-Stack Engineering Project"
                color="#39E87A"
                last={true}
                items={['Authentication & Authorization', 'Verification workflows', 'REST APIs', 'Campaign management', 'Docker deployment']}
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
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
            <h2 style={sectionHeading}>Interested in Hiring or Collaborating?</h2>
            <p style={{ color: '#8A8F8B', marginBottom: 28, lineHeight: 1.75, maxWidth: 640 }}>
              I am a Software Engineering student open for software engineering roles, internships, and freelance projects. Feel free to connect directly or submit a hiring inquiry!
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                onClick={() => handleHireClick('Hire / Opportunity Inquiry')}
                style={{
                  padding: '12px 28px',
                  borderRadius: 10,
                  background: '#39E87A',
                  color: '#0A0A0A',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.2s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = '#20C96B')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#39E87A')}
              >
                💼 Hire Me / Send Proposal
              </button>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                style={{
                  padding: '12px 24px',
                  borderRadius: 10,
                  background: 'rgba(57,232,122,0.12)',
                  border: '1px solid rgba(57,232,122,0.3)',
                  color: '#39E87A',
                  fontWeight: 600,
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                ✉ Email Me
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '12px 24px',
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
                <LinkedInIcon size={16} color="#0A66C2" /> LinkedIn ↗
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '12px 24px',
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
                <GitHubIcon size={16} color="#F5F5F5" /> GitHub ↗
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
          overflowX: 'auto',
          boxSizing: 'border-box',
        }}
      >
        {/* mini profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingRight: 12, borderRight: '1px solid rgba(255,255,255,0.08)', marginRight: 4 }}>
          <img
            src={profilePhoto}
            alt={PERSONAL_INFO.name}
            style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '1px solid rgba(57,232,122,0.3)' }}
          />
          <div style={{ display: 'none' }} className="sm:block">
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#F5F5F5', whiteSpace: 'nowrap' }}>{PERSONAL_INFO.name}</div>
            <div style={{ fontSize: '0.6rem', color: '#39E87A', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em' }}>{PERSONAL_INFO.title}</div>
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
          onClick={() => handleHireClick('Hire Me Request')}
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

      {/* ── HIRE ME / CONTACT MODAL ── */}
      {isHireModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          {/* Dark Blur Backdrop */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              zIndex: 1,
            }}
            onClick={() => setIsHireModalOpen(false)}
          />

          {/* Opaque Solid Glass Modal Dialog */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              maxWidth: 500,
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#121413',
              borderRadius: 24,
              padding: '24px 20px',
              border: '1px solid rgba(57, 232, 122, 0.35)',
              boxShadow: '0 25px 70px rgba(0,0,0,0.9), 0 0 50px rgba(57,232,122,0.18)',
              boxSizing: 'border-box',
            }}
            className="scroll-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsHireModalOpen(false)}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#8A8F8B',
                width: 32,
                height: 32,
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F5F5F5', margin: '0 0 6px' }}>
                💼 Hire Me / Send Inquiry
              </h3>
              <p style={{ color: '#8A8F8B', fontSize: '0.85rem', margin: 0 }}>
                Send a direct email to <strong style={{ color: '#39E87A' }}>{PERSONAL_INFO.email}</strong>
              </p>
            </div>

            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '24px 16px' }}>
                <div style={{ fontSize: '3rem', marginBottom: 12 }}>
                  {submitType === 'direct' ? '✨' : '✉'}
                </div>
                <h4 style={{ color: '#39E87A', fontSize: '1.2rem', fontWeight: 700, margin: '0 0 8px' }}>
                  {submitType === 'direct' ? 'Inquiry Sent Directly to Inbox!' : 'Inquiry Opened in Mail App!'}
                </h4>
                <p style={{ color: '#C8CCC9', fontSize: '0.88rem', marginBottom: 20, lineHeight: 1.6 }}>
                  {submitType === 'direct' ? (
                    <>Your message was delivered directly to <strong style={{ color: '#39E87A' }}>{PERSONAL_INFO.email}</strong>. I will get back to you shortly!</>
                  ) : (
                    <>Your default email client has been launched with your formatted inquiry to <strong style={{ color: '#39E87A' }}>{PERSONAL_INFO.email}</strong>.</>
                  )}
                </p>

                {submitType === 'mailto' && (
                  <div style={{ padding: '14px', background: 'rgba(57,232,122,0.06)', borderRadius: 12, border: '1px dashed rgba(57,232,122,0.3)', marginBottom: 20, textAlign: 'left' }}>
                    <div style={{ fontSize: '0.8rem', color: '#39E87A', fontWeight: 600, marginBottom: 6 }}>
                      💡 Enable Direct Instant Inbox Delivery:
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#8A8F8B', lineHeight: 1.6 }}>
                      1. Go to <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer" style={{ color: '#39E87A', fontWeight: 600 }}>web3forms.com</a> (Free, 1-click email key).<br />
                      2. Enter <strong style={{ color: '#F5F5F5' }}>{PERSONAL_INFO.email}</strong> to get your Access Key.<br />
                      3. Create a <code style={{ color: '#39E87A', background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: 4 }}>.env</code> file in the project root and add:<br />
                      <code style={{ color: '#39E87A', display: 'block', marginTop: 6, padding: '6px 10px', background: 'rgba(0,0,0,0.5)', borderRadius: 6 }}>VITE_WEB3FORMS_KEY=your_key_here</code>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setIsHireModalOpen(false)}
                  style={{
                    padding: '10px 24px',
                    borderRadius: 10,
                    background: '#39E87A',
                    color: '#0A0A0A',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#8A8F8B', marginBottom: 4 }}>Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 8,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#F5F5F5',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#8A8F8B', marginBottom: 4 }}>Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 8,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#F5F5F5',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#8A8F8B', marginBottom: 4 }}>Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Project Inquiry / Job Offer"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 8,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#F5F5F5',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#8A8F8B', marginBottom: 4 }}>Project Details / Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your project, role, or proposal..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 8,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#F5F5F5',
                      fontSize: '0.88rem',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 10 }}>
                  <button
                    type="button"
                    onClick={() => setIsHireModalOpen(false)}
                    style={{
                      padding: '10px 20px',
                      borderRadius: 10,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#C8CCC9',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      padding: '10px 24px',
                      borderRadius: 10,
                      background: isSubmitting ? '#20C96B' : '#39E87A',
                      border: 'none',
                      color: '#0A0A0A',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: isSubmitting ? 'wait' : 'pointer',
                      opacity: isSubmitting ? 0.8 : 1,
                    }}
                  >
                    {isSubmitting ? 'Sending Inquiry...' : 'Send Email Inquiry ✉'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Certifications Data & Components ── */

export interface Certification {
  title: string
  provider: 'Simplilearn' | 'Coursera' | 'Anthropic'
  date: string
}

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Spring AI',
    provider: 'Simplilearn',
    date: '2026',
  },
  {
    title: 'Generative AI for Java & Spring',
    provider: 'Coursera',
    date: '2026',
  },
  {
    title: 'Claude Code in Action',
    provider: 'Anthropic',
    date: 'June 2026',
  },
  {
    title: 'Claude Platform 101',
    provider: 'Anthropic',
    date: 'June 2026',
  },
  {
    title: 'AI Fluency: Frameworks',
    provider: 'Anthropic',
    date: 'June 2026',
  },
  {
    title: 'Claude Code 101',
    provider: 'Anthropic',
    date: 'June 2026',
  },
  {
    title: 'Claude 101',
    provider: 'Anthropic',
    date: 'June 2026',
  },
]

function SimplilearnIcon({ size = 16, color = '#39E87A' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  )
}

function CourseraIcon({ size = 16, color = '#39E87A' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" />
      <path d="M14.5 9a3.5 3.5 0 1 0 0 6" />
    </svg>
  )
}

function AnthropicIcon({ size = 16, color = '#39E87A' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
      <path d="M13.827 3.536h2.955L24 20.464h-3.327l-1.89-4.282H11.21l-1.89 4.282H6l7.827-16.928zm3.844 9.873l-2.316-5.247-2.316 5.247h4.632zM0 20.464l4.282-9.255h3.045L3.045 20.464H0z" />
    </svg>
  )
}

function AwardIcon({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  )
}

function ProviderIcon({ provider, size = 16 }: { provider: string; size?: number }) {
  if (provider === 'Anthropic') return <AnthropicIcon size={size} color="#39E87A" />
  if (provider === 'Coursera') return <CourseraIcon size={size} color="#39E87A" />
  if (provider === 'Simplilearn') return <SimplilearnIcon size={size} color="#39E87A" />
  return <AwardIcon size={size} color="#39E87A" />
}

function CertificationCard({ title, provider, date }: Certification) {
  return (
    <div
      className="glass glass-card"
      style={{
        borderRadius: 16,
        padding: '20px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 16,
      }}
    >
      {/* Top row: Provider icon/badge + date */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'rgba(57,232,122,0.08)',
            border: '1px solid rgba(57,232,122,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <ProviderIcon provider={provider} size={18} />
        </div>

        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.72rem',
            color: '#39E87A',
            background: 'rgba(57,232,122,0.08)',
            border: '1px solid rgba(57,232,122,0.2)',
            borderRadius: 6,
            padding: '3px 9px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          {date}
        </span>
      </div>

      {/* Primary Certification Title & Provider Subtext */}
      <div>
        <h3
          style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            color: '#F5F5F5',
            margin: '0 0 6px 0',
            lineHeight: 1.35,
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: '0.8rem',
            color: '#8A8F8B',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span>{provider}</span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
          <span style={{ color: '#39E87A', fontSize: '0.75rem' }}>Certificate</span>
        </p>
      </div>

      {/* Card Footer / Metadata Accent */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.7rem',
          color: '#8A8F8B',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          <AwardIcon size={13} color="#39E87A" />
          Verified Credential
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem' }}>
          {provider.toUpperCase()}
        </span>
      </div>
    </div>
  )
}

/* ── Icons & Helpers ── */

function LinkedInIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}

function GitHubIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

const sectionHeading: React.CSSProperties = {
  fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
  fontWeight: 800,
  color: '#F5F5F5',
  marginBottom: 28,
  letterSpacing: '-0.02em',
  lineHeight: 1.15,
}

function ContactRow({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  return href ? (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: '0.78rem',
        color: '#8A8F8B',
        textDecoration: 'none',
        transition: 'color 0.2s',
      }}
      onMouseOver={(e) => (e.currentTarget.style.color = '#39E87A')}
      onMouseOut={(e) => (e.currentTarget.style.color = '#8A8F8B')}
    >
      <span>{icon}</span>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
    </a>
  ) : (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: '#8A8F8B' }}>
      <span>{icon}</span>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  )
}

function ProjectCard({
  title, subtitle, description, tags, features, visual, githubUrl, hovered, onHover,
}: {
  title: string
  subtitle: string
  description: string
  tags: string[]
  features: string[]
  visual: string
  githubUrl?: string
  hovered: boolean
  onHover: (v: string | null) => void
}) {
  return (
    <div
      className="glass glass-card"
      onMouseEnter={() => onHover(visual)}
      onMouseLeave={() => onHover(null)}
      style={{
        borderRadius: 18,
        overflow: 'hidden',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        borderColor: hovered ? 'rgba(57,232,122,0.35)' : 'rgba(255,255,255,0.08)',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.6), 0 0 30px rgba(57,232,122,0.15)' : 'none',
      }}
    >
      {/* Sleek 50px Marquee Ticker */}
      <div
        style={{
          height: 48,
          background: 'rgba(0,0,0,0.6)',
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

      <div style={{ padding: '20px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.15rem', fontWeight: 700, color: '#F5F5F5', margin: 0 }}>
              {title}
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#39E87A', marginTop: 2 }}>{subtitle}</p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
            {githubUrl ? (
              <>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    background: 'rgba(57,232,122,0.12)',
                    border: '1px solid rgba(57,232,122,0.35)',
                    color: '#39E87A',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(57,232,122,0.25)'
                    e.currentTarget.style.borderColor = 'rgba(57,232,122,0.6)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(57,232,122,0.12)'
                    e.currentTarget.style.borderColor = 'rgba(57,232,122,0.35)'
                  }}
                >
                  View Project ↗
                </a>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#F5F5F5',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                  }}
                >
                  <GitHubIcon size={14} color="#F5F5F5" /> GitHub ↗
                </a>
              </>
            ) : (
              <>
                <button style={ghostBtn}>View Project ↗</button>
                <button style={ghostBtn}>GitHub</button>
              </>
            )}
          </div>
        </div>
        <p style={{ fontSize: '0.85rem', color: '#8A8F8B', lineHeight: 1.65, marginBottom: 14 }}>{description}</p>
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
  const steps = ['Issue Reporting', 'Residency Verification', 'Campaign Funding', 'Repair Tracking', 'Role Access', 'Admin Dashboard']
  const doubleSteps = [...steps, ...steps, ...steps]

  return (
    <div className="marquee-container">
      <div className="marquee-track" style={{ animationDuration: '35s' }}>
        {doubleSteps.map((s, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(57,232,122,0.08)',
              border: '1px solid rgba(57,232,122,0.35)',
              borderRadius: 8,
              padding: '6px 14px',
              fontSize: '0.72rem',
              color: '#39E87A',
              fontFamily: "'JetBrains Mono', monospace",
              whiteSpace: 'nowrap',
              boxShadow: '0 0 12px rgba(57,232,122,0.1)',
            }}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  )
}

function MindCareVisual({ hovered }: { hovered: boolean }) {
  const functionalities = [
    { label: 'Secure Video Sessions', col: '#39E87A' },
    { label: 'Real-Time Chat', col: '#39E87A' },
    { label: 'Therapist Dashboard', col: '#20C96B' },
    { label: 'Group Therapy Rooms', col: '#20C96B' },
    { label: 'Book Therapy Sessions', col: '#39E87A' },
    { label: 'Mental Health Surveys', col: '#39E87A' },
    { label: 'JWT & Google Login', col: '#20C96B' },
    { label: 'Session Management', col: '#20C96B' },
    { label: 'Feedback & Ratings System', col: '#39E87A' },
    { label: 'Payment Integration', col: '#39E87A' },
  ]
  const doubleBoxes = [...functionalities, ...functionalities, ...functionalities]

  return (
    <div className="marquee-container">
      <div className="marquee-track" style={{ animationDuration: '38s' }}>
        {doubleBoxes.map((b, idx) => (
          <div
            key={idx}
            style={{
              background: 'rgba(57,232,122,0.07)',
              border: `1px solid ${b.col}44`,
              borderRadius: 8,
              padding: '6px 14px',
              fontSize: '0.72rem',
              color: b.col,
              fontFamily: "'JetBrains Mono', monospace",
              whiteSpace: 'nowrap',
              boxShadow: '0 0 12px rgba(57,232,122,0.1)',
            }}
          >
            {b.label}
          </div>
        ))}
      </div>
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
