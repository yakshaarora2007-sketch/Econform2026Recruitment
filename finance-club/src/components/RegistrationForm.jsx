import { useRef, useState } from 'react'
import './RegistrationForm.css'
import { supabase } from '../supabaseClient'

import dealDefaultIcon from '../assets/new images/deal_default.png'
import dealHoverIcon from '../assets/new images/deal_hover.png'
import identityDefaultIcon from '../assets/new images/identity_default.png'
import identityHoverIcon from '../assets/new images/identity_hover.png'
import marketDefaultIcon from '../assets/new images/market_default.png'
import marketHoverIcon from '../assets/new images/market_hover.png'
import econLeftBranding from '../../assets_images/econ_left_branding.png'
import monopolyBottomSection from '../../assets_images/monopoly_bottom_section.png'
import playerDefaultIcon from '../assets/new images/player_default.png'
import playerHoverIcon from '../assets/new images/player_hover.png'
import freeParkingImage from '../../assets_images/free_parking.png'
import communityChestImage from '../../assets_images/community_chest.png'
import chanceImage from '../../assets_images/chance.png'
import goToJailImage from '../../assets_images/go_to_jail.png'
import nameUserIcon from '../../assets_images/name_user.png'
import phoneFormIcon from '../../assets_images/phone.png'
import applicationIdIcon from '../../assets_images/application_id.png'
import emailFormIcon from '../../assets_images/email.png'
import financeGlobeIcon from '../../assets_images/finance_globe.png'
import contributionHandshakeIcon from '../../assets_images/contribution_handshake.png'
import expectationsTargetIcon from '../../assets_images/expectations_target.png'

const CATEGORY_COLORS = {
  player: '#ED1C24',
  identity: '#F5C400',
  market: '#00843D',
  deal: '#0057B8'
}

const STEPS = [
  { id: 'player', num: '01', label: 'PLAYER', defaultIcon: playerDefaultIcon, activeIcon: playerHoverIcon },
  { id: 'identity', num: '02', label: 'IDENTITY', defaultIcon: identityDefaultIcon, activeIcon: identityHoverIcon },
  { id: 'market', num: '03', label: 'MARKET', defaultIcon: marketDefaultIcon, activeIcon: marketHoverIcon },
  { id: 'deal', num: '04', label: 'DEAL', defaultIcon: dealDefaultIcon, activeIcon: dealHoverIcon }
]

const STEP_DETAILS = {
  player: { property: 'PROPERTY 01', color: CATEGORY_COLORS.player, focusRef: 'name' },
  identity: { property: 'PROPERTY 02', color: CATEGORY_COLORS.identity, focusRef: 'roll_no' },
  market: { property: 'PROPERTY 03', color: CATEGORY_COLORS.market, focusRef: 'stock_market' },
  deal: { property: 'PROPERTY 04', color: CATEGORY_COLORS.deal, focusRef: 'contribution' }
}

const TOP_TILES = [
  { title: 'FREE PARKING', image: freeParkingImage, special: true, accent: 'transparent' },
  { title: 'COS', accent: '#2f9b43' },
  { title: 'OAT', accent: '#2f9b43' },
  { title: 'FETE AREA', accent: '#2f9b43' },
  { title: 'COMMUNITY CHEST', image: communityChestImage, special: true, accent: 'transparent' },
  { title: 'TSLAS', accent: '#db1212' },
  { title: 'VENTURE LAB', accent: '#db1212' },
  { title: 'FLAVORS CAFE', accent: '#db1212' },
  { title: 'CHANCE', image: chanceImage, special: true, accent: 'transparent' },
  { title: 'HEALTH CENTRE', accent: '#f0bc1a' },
  { title: 'AUDITORIUM', accent: '#f0bc1a' },
  { title: 'AAHAR', accent: '#f0bc1a' },
  { title: 'GO TO JAIL', image: goToJailImage, special: true, accent: 'transparent' }
]

const RIGHT_TILES = [
  { title: 'SKYWALK', accent: '#2f9de0' },
  { title: 'WATERBODY CAFE', accent: '#2f9de0' },
  { title: 'LIBRARY', accent: '#2f9de0' },
  { title: 'COMMUNITY CHEST', image: communityChestImage, special: true, accent: 'transparent' },
  { title: 'POLICY PLACE', accent: '#2f9de0' },
  { title: 'BUDGET BOULEVARD', accent: '#2f9de0' },
  { title: 'FISCAL STREET', accent: '#2f9de0' },
  { title: 'GO' }
]

const FIELD_ICONS = {
  name: nameUserIcon,
  phone: phoneFormIcon,
  identity: applicationIdIcon,
  email: emailFormIcon,
  market: marketDefaultIcon,
  finance: financeGlobeIcon,
  deal: contributionHandshakeIcon,
  expectations: expectationsTargetIcon
}

const TILE_ICONS = {
  parking: (
    <g>
      <rect x="0" y="0" width="80" height="80" fill="#F0E68C" stroke="#333" strokeWidth="2" rx="2" />
      <circle cx="40" cy="20" r="10" fill="#DD0000" />
      <circle cx="40" cy="20" r="6" fill="none" stroke="#FFF" strokeWidth="1" />
      <text x="40" y="50" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#333">
        PARKING
      </text>
    </g>
  ),
  chance: (
    <g>
      <rect x="0" y="0" width="80" height="80" fill="#FFF" stroke="#333" strokeWidth="2" rx="2" />
      <text x="40" y="35" fontSize="28" fontWeight="bold" textAnchor="middle" fill="#CC0000">
        ?
      </text>
      <text x="40" y="60" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#333">
        CHANCE
      </text>
    </g>
  ),
  chest: (
    <g>
      <rect x="0" y="0" width="80" height="80" fill="#4169E1" stroke="#333" strokeWidth="2" rx="2" />
      <rect x="15" y="15" width="50" height="30" fill="#8B7355" stroke="#333" strokeWidth="1" rx="1" />
      <text x="40" y="40" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#FFD700">
        CC
      </text>
      <text x="40" y="60" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#FFF">
        COMMUNITY
      </text>
      <text x="40" y="72" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#FFF">
        CHEST
      </text>
    </g>
  ),
  jail: (
    <g>
      <rect x="0" y="0" width="80" height="80" fill="#F0E68C" stroke="#333" strokeWidth="2" rx="2" />
      <circle cx="40" cy="18" r="8" fill="#003366" stroke="#333" strokeWidth="1" rx="1" />
      <text x="40" y="22" fontSize="6" fill="#FFF" textAnchor="middle" fontWeight="bold">
        JAIL
      </text>
      <text x="40" y="50" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#333">
        GO TO
      </text>
      <text x="40" y="65" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#333">
        JAIL
      </text>
    </g>
  )
}

const Chevron = ({ color }) => (
  <svg className="chevron" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9L12 15L18 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function FieldIcon({ name, alt }) {
  return (
    <img
      src={FIELD_ICONS[name]}
      alt={alt}
      className="field-image-icon"
    />
  )
}

function TileIllustration({ name, label }) {
  return (
    <svg className="board-illustration" viewBox="0 0 80 80" role="img" aria-label={label}>
      {TILE_ICONS[name]}
    </svg>
  )
}

function BoardTile({ tile, vertical = false }) {
  if (tile.title === 'GO') {
    return (
      <div className="board-tile vertical large go-tile">
        <span className="go-sub-top">COLLECT</span>
        <span className="go-sub-top">₹200 AS</span>
        <span className="go-sub-top">YOU PASS</span>
        <span className="go-word">GO</span>
        <svg viewBox="0 0 40 16" className="go-arrow-svg">
          <path d="M 35 8 L 5 8 M 5 8 L 12 3 M 5 8 L 12 13" stroke="#E01418" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    )
  }

  return (
    <div className={`board-tile ${vertical ? 'vertical' : ''} ${tile.large ? 'large' : ''}`}>
      {tile.accent !== 'transparent' && (
        <span
          className={`board-accent ${vertical ? 'vertical' : ''}`}
          style={{ backgroundColor: tile.accent }}
        />
      )}
      {tile.image ? (
        <img
          src={tile.image}
          alt={tile.title}
          className={`board-illustration ${tile.special ? 'board-special-image' : ''}`}
        />
      ) : tile.icon ? (
        <TileIllustration name={tile.icon} label={tile.title} />
      ) : (
        <div className="board-copy">
          <span>{tile.title}</span>
          {tile.subtitle && <span>{tile.subtitle}</span>}
        </div>
      )}
    </div>
  )
}

export default function RegistrationForm() {
  const [activeStep, setActiveStep] = useState('player')
  const [hoveredStep, setHoveredStep] = useState(null)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    roll_no: '',
    email: '',
    stock_market: '',
    finance_geopolitics: '',
    contribution: '',
    expectations: ''
  })

  const nameRef = useRef(null)
  const rollNoRef = useRef(null)
  const stockMarketRef = useRef(null)
  const contributionRef = useRef(null)

  const fieldRefs = {
    name: nameRef,
    roll_no: rollNoRef,
    stock_market: stockMarketRef,
    contribution: contributionRef
  }

  // Every form field belongs to one of the four left-side cards.
  // Focusing either field in a pair selects the corresponding card.
  const FIELD_TO_STEP = {
    name: 'player',
    phone_number: 'player',

    roll_no: 'identity',
    email: 'identity',

    stock_market: 'market',
    finance_geopolitics: 'market',

    contribution: 'deal',
    expectations: 'deal'
  }

  const handleFieldFocus = (fieldName) => {
    const stepId = FIELD_TO_STEP[fieldName]

    if (stepId) {
      setActiveStep(stepId)
    }
  }

  const handleStepClick = (stepId) => {
    setActiveStep(stepId)

    const focusTarget = STEP_DETAILS[stepId]?.focusRef
    const targetRef = fieldRefs[focusTarget]

    requestAnimationFrame(() => {
      targetRef?.current?.focus()
    })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value === 'yes' ? true : value === 'no' ? false : ''
    }))
  }

  const selectValue = (field) => {
    if (formData[field] === true) {
      return 'yes'
    }

    if (formData[field] === false) {
      return 'no'
    }

    return ''
  }

  const validateField = (field, value) => {
    const trimmedValue = typeof value === 'string' ? value.trim() : value

    switch (field) {
      case 'name':
        if (!trimmedValue) return 'Please enter your full name.'
        if (!/^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/.test(trimmedValue)) {
          return 'Please enter a valid name.'
        }
        if (trimmedValue.length < 2) return 'Name must be at least 2 characters.'
        return ''

      case 'phone_number': {
        const normalizedPhone = String(trimmedValue)
          .replace(/[\s()-]/g, '')
          .replace(/^\+91/, '')
        if (!normalizedPhone) return 'Please enter your phone number.'
        if (!/^\d{10}$/.test(normalizedPhone)) {
          return 'Please enter a valid 10-digit phone number.'
        }
        return ''
      }

      case 'roll_no':
        if (!trimmedValue) return 'Please enter your application or roll number.'
        if (!/^\d{10}$/.test(trimmedValue)) {
          return 'Roll Number must be exactly 10 digits.'
        }
        return ''

      case 'email':
        if (!trimmedValue) return 'Please enter your email address.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedValue)) {
          return 'Please enter a valid email address.'
        }
        return ''

      case 'stock_market':
        if (value !== true && value !== false) return 'Please select an option.'
        return ''

      case 'finance_geopolitics':
        if (value !== true && value !== false) return 'Please select an option.'
        return ''

      case 'contribution':
        if (!trimmedValue) return 'Please tell us how you would like to contribute.'
        if (trimmedValue.length < 10) return 'Please enter at least 10 characters.'
        return ''

      case 'expectations':
        if (!trimmedValue) return 'Please tell us what you expect from ECON.'
        if (trimmedValue.length < 10) return 'Please enter at least 10 characters.'
        return ''

      default:
        return ''
    }
  }

  const handleFieldBlur = (event) => {
    const { name, value } = event.target
    const fieldValue = name === 'stock_market' || name === 'finance_geopolitics'
      ? (value === 'yes' ? true : value === 'no' ? false : '')
      : value

    const message = validateField(name, fieldValue)
    setErrors((prev) => {
      const next = { ...prev }
      if (message) next[name] = message
      else delete next[name]
      return next
    })
  }

  const validateForm = () => {
    const fields = [
      'name',
      'phone_number',
      'roll_no',
      'email',
      'stock_market',
      'finance_geopolitics',
      'contribution',
      'expectations'
    ]

    const nextErrors = {}

    fields.forEach((field) => {
      const message = validateField(field, formData[field])
      if (message) nextErrors[field] = message
    })

    setErrors(nextErrors)
    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (isSubmitting) return

    setSubmitStatus(null)

    const nextErrors = validateForm()
    const firstInvalidField = Object.keys(nextErrors)[0]

    if (firstInvalidField) {
      const target = document.getElementById(firstInvalidField)
      if (target) {
        target.focus()
        target.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    setIsSubmitting(true)

    const { error } = await supabase
      .from('registrations')
      .insert([
        {
          name: formData.name.trim(),
          roll_no: formData.roll_no.trim(),
          phone_number: formData.phone_number.trim(),
          email: formData.email.trim(),
          stock_market: formData.stock_market,
          finance_geopolitics: formData.finance_geopolitics,
          contribution: formData.contribution.trim(),
          expectations: formData.expectations.trim()
        }
      ])

    if (error) {
      console.error('Supabase insert error:', error)
      const isDuplicateRollNo =
        error.code === '23505' || /duplicate|unique/i.test(error.message || '')

      if (isDuplicateRollNo) {
        setErrors((prev) => ({
          ...prev,
          roll_no: 'This Roll Number is already registered.'
        }))
        const rollNoTarget = document.getElementById('roll_no')
        if (rollNoTarget) {
          rollNoTarget.focus()
          rollNoTarget.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      } else {
        setSubmitStatus({
          type: 'error',
          message: 'Registration failed. Please try again.'
        })
      }

      setIsSubmitting(false)
      return
    }

    setSubmitStatus({ type: 'success', message: 'Registration successful!' })
    setFormData({
      name: '',
      phone_number: '',
      roll_no: '',
      email: '',
      stock_market: '',
      finance_geopolitics: '',
      contribution: '',
      expectations: ''
    })
    setErrors({})
    setIsSubmitting(false)
  }

  const errorStyle = {
    marginTop: '4px',
    color: '#c80e13',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '11px',
    fontWeight: 700,
    lineHeight: 1.2
  }

  return (
    <div className="page-shell">
      <div className="board-layout">
        <aside className="promo-panel">
          <img
            src={econLeftBranding}
            alt="ECON Orientation 2026"
            className="econ-left-branding"
          />
          <img
            src={monopolyBottomSection}
            alt=""
            aria-hidden="true"
            className="monopoly-bottom-section"
          />
        </aside>  
        <section className="game-board" aria-label="ECON registration board">
          <div className="board-top-strip">
            {TOP_TILES.map((tile) => (
              <BoardTile key={`${tile.title}-${tile.subtitle ?? ''}`} tile={tile} />
            ))}
          </div>

          <div className="board-body">
            <nav className="step-rail" aria-label="Registration steps">
              {STEPS.map((step) => {
                const isHighlighted = hoveredStep === step.id || activeStep === step.id
                const stepIcon = isHighlighted ? step.activeIcon : step.defaultIcon

                return (
                  <button
                    key={step.id}
                    type="button"
                    className={`step-card ${isHighlighted ? 'active' : ''}`}
                    onMouseEnter={() => setHoveredStep(step.id)}
                    onMouseLeave={() => setHoveredStep(null)}
                    onFocus={() => setHoveredStep(step.id)}
                    onBlur={() => setHoveredStep(null)}
                    onClick={() => handleStepClick(step.id)}
                    style={{ '--step-accent': CATEGORY_COLORS[step.id] }}
                    aria-pressed={activeStep === step.id}
                  >
                    <span className="step-card-inner-border" aria-hidden="true" />
                    <span className="step-card-number">{step.num}</span>
                    <img src={stepIcon} alt="" aria-hidden="true" className="step-card-icon" />
                    <span className="step-card-label">{step.label}</span>
                  </button>
                )
              })}

            </nav>

            <main className="form-panel">
              <div className="form-panel-inner">
                <div className="form-kicker">
                  <span
                    className="kicker-number"
                    style={{ color: STEP_DETAILS[activeStep].color }}
                  >
                    {STEPS.find((step) => step.id === activeStep)?.num}
                  </span>
                  <span className="kicker-divider">|</span>
                  <span className="kicker-label">
                    {STEP_DETAILS[activeStep].property}
                  </span>
                </div>

                <h1 className="form-title">PLAYER DETAILS</h1>
                <div className="title-stripes" aria-hidden="true">
                  <span className="title-stripe red" />
                  <span className="title-stripe green" />
                </div>
                <p className="form-subtitle">Let&apos;s get your basic details on the board.</p>

                <form className="registration-form" onSubmit={handleSubmit} noValidate>
                  <div className="field-grid">
                    <div className="field-group">
                      <label htmlFor="name" className="field-label red">Name *</label>
                      <div className="field-shell red">
                        <FieldIcon name="name" alt="Name" />
                        <input
                          id="name"
                          ref={nameRef}
                          type="text"
                          name="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onFocus={() => handleFieldFocus('name')}
                          onBlur={handleFieldBlur}
                          aria-invalid={Boolean(errors.name)}
                        />
                      </div>
                      {errors.name && <div style={errorStyle}>{errors.name}</div>}
                    </div>

                    <div className="field-group">
                      <label htmlFor="phone_number" className="field-label red">Phone Number *</label>
                      <div className="field-shell red">
                        <FieldIcon name="phone" alt="Phone" />
                        <input
                          id="phone_number"
                          type="tel"
                          name="phone_number"
                          placeholder="Enter your phone number"
                          inputMode="numeric"
                          value={formData.phone_number}
                          onChange={handleInputChange}
                          onFocus={() => handleFieldFocus('phone_number')}
                          onBlur={handleFieldBlur}
                          aria-invalid={Boolean(errors.phone_number)}
                        />
                      </div>
                      {errors.phone_number && <div style={errorStyle}>{errors.phone_number}</div>}
                    </div>

                    <div className="field-group">
                      <label htmlFor="roll_no" className="field-label amber">Application No. / Roll No. *</label>
                      <div className="field-shell amber">
                        <FieldIcon name="identity" alt="Roll number" />
                        <input
                          id="roll_no"
                          ref={rollNoRef}
                          type="text"
                          name="roll_no"
                          placeholder="Enter your roll number"
                          inputMode="numeric"
                          maxLength="10"
                          value={formData.roll_no}
                          onChange={handleInputChange}
                          onFocus={() => handleFieldFocus('roll_no')}
                          onBlur={handleFieldBlur}
                          aria-invalid={Boolean(errors.roll_no)}
                        />
                      </div>
                      {errors.roll_no && <div style={errorStyle}>{errors.roll_no}</div>}
                    </div>

                    <div className="field-group">
                      <label htmlFor="email" className="field-label amber">Email Address *</label>
                      <div className="field-shell amber">
                        <FieldIcon name="email" alt="Email" />
                        <input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={handleInputChange}
                          onFocus={() => handleFieldFocus('email')}
                          onBlur={handleFieldBlur}
                          aria-invalid={Boolean(errors.email)}
                        />
                      </div>
                      {errors.email && <div style={errorStyle}>{errors.email}</div>}
                    </div>

                    <div className="field-group">
                      <label htmlFor="stock_market" className="field-label green">Interested in Stock Market? *</label>
                      <div className="field-shell green select-shell">
                        <FieldIcon name="market" alt="Stock market" />
                        <select
                          id="stock_market"
                          ref={stockMarketRef}
                          name="stock_market"
                          value={selectValue('stock_market')}
                          onChange={handleSelectChange}
                          onFocus={() => handleFieldFocus('stock_market')}
                          onBlur={handleFieldBlur}
                          aria-invalid={Boolean(errors.stock_market)}
                        >
                          <option value="">Select an option</option>
                          <option value="yes">Yes, I&apos;m interested</option>
                          <option value="no">No, not interested</option>
                        </select>
                        <Chevron color={CATEGORY_COLORS.market} />
                      </div>
                      {errors.stock_market && <div style={errorStyle}>{errors.stock_market}</div>}
                    </div>

                    <div className="field-group">
                      <label htmlFor="finance_geopolitics" className="field-label green">Interested in Finance &amp; Geopolitics? *</label>
                      <div className="field-shell green select-shell">
                        <FieldIcon name="finance" alt="Finance and geopolitics" />
                        <select
                          id="finance_geopolitics"
                          name="finance_geopolitics"
                          value={selectValue('finance_geopolitics')}
                          onChange={handleSelectChange}
                          onFocus={() => handleFieldFocus('finance_geopolitics')}
                          onBlur={handleFieldBlur}
                          aria-invalid={Boolean(errors.finance_geopolitics)}
                        >
                          <option value="">Select an option</option>
                          <option value="yes">Yes, I&apos;m interested</option>
                          <option value="no">No, not interested</option>
                        </select>
                        <Chevron color={CATEGORY_COLORS.market} />
                      </div>
                      {errors.finance_geopolitics && <div style={errorStyle}>{errors.finance_geopolitics}</div>}
                    </div>

                    <div className="field-group">
                      <label htmlFor="contribution" className="field-label blue">How would you like to contribute to ECON? *</label>
                      <div className="field-shell blue textarea-shell">
                        <FieldIcon name="deal" alt="Contribution" />
                        <textarea
                          id="contribution"
                          ref={contributionRef}
                          name="contribution"
                          placeholder="Share your ideas..."
                          value={formData.contribution}
                          onChange={handleInputChange}
                          onFocus={() => handleFieldFocus('contribution')}
                          onBlur={handleFieldBlur}
                          aria-invalid={Boolean(errors.contribution)}
                          rows="4"
                        />
                      </div>
                      {errors.contribution && <div style={errorStyle}>{errors.contribution}</div>}
                    </div>

                    <div className="field-group">
                      <label htmlFor="expectations" className="field-label blue">What do you expect from ECON? *</label>
                      <div className="field-shell blue textarea-shell">
                        <FieldIcon name="expectations" alt="Expectations" />
                        <textarea
                          id="expectations"
                          name="expectations"
                          placeholder="Share your expectations..."
                          value={formData.expectations}
                          onChange={handleInputChange}
                          onFocus={() => handleFieldFocus('expectations')}
                          onBlur={handleFieldBlur}
                          aria-invalid={Boolean(errors.expectations)}
                          rows="4"
                        />
                      </div>
                      {errors.expectations && <div style={errorStyle}>{errors.expectations}</div>}
                    </div>
                  </div>

                  {submitStatus && (
                    <div
                      className={`form-status ${submitStatus.type}`}
                      role={submitStatus.type === 'error' ? 'alert' : 'status'}
                    >
                      {submitStatus.message}
                    </div>
                  )}

                  <div className="form-actions">
                    <button type="submit" className="next-button" disabled={isSubmitting}>
                      <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
                      <span aria-hidden="true" className="next-arrow">→</span>
                    </button>
                  </div>
                </form>
              </div>
            </main>

            <aside className="right-rail">
              {RIGHT_TILES.map((tile) => (
                <BoardTile
                  key={`${tile.title}-${tile.subtitle ?? ''}`}
                  tile={tile}
                  vertical
                />
              ))}
            </aside>
          </div>
        </section>
      </div>
    </div>
  )
}
