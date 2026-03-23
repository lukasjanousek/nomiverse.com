'use client'

import { useEffect } from 'react'
import deckData from '@/public/content/deck.json'

export default function Home() {
  useEffect(() => {
    // Scroll-triggered animations via IntersectionObserver
    const sel = '.anim, .anim-children, .anim-scale, .anim-fade, .anim-bar, .anim-progress'
    const els = document.querySelectorAll(sel)
    if (!els.length) return

    // Store original bar widths
    document.querySelectorAll('.anim-bar .fill').forEach((f: any) => {
      f.dataset.w = f.style.width
    })
    document.querySelectorAll('.anim-progress .progress-xl > div, .progress-xl.anim-progress > div').forEach((f: any) => {
      f.dataset.w = f.style.width
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            // Restore bar widths
            e.target.querySelectorAll('.fill[data-w]').forEach((f: any) => {
              f.style.setProperty('width', f.dataset.w, 'important')
            })
            e.target.querySelectorAll('.progress-xl > div[data-w]').forEach((f: any) => {
              f.style.setProperty('width', f.dataset.w, 'important')
            })
            if (e.target.classList.contains('progress-xl')) {
              const inner = e.target.querySelector('div[data-w]')
              if (inner) inner.style.setProperty('width', (inner as any).dataset.w, 'important')
            }
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    els.forEach((el) => {
      observer.observe(el)
    })

    // Animate metric numbers
    const metrics = document.querySelectorAll('.metric .num')
    const mObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          mObs.unobserve(el)
          const text = el.textContent || ''
          const match = text.match(/^[â¬]?(\d[\d.,]*)/)
          if (!match) return
          const prefix = text.match(/^[â¬]/)?.[0] || ''
          const numStr = match[1].replace(/,/g, '')
          const suffix = text.slice(match[0].length)
          const target = parseFloat(numStr)
          if (isNaN(target) || target === 0) return
          const dur = 1200
          const start = performance.now()
          function ease(t: number) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
          }
          function step(now: number) {
            const t = Math.min((now - start) / dur, 1)
            const v = ease(t) * target
            const display = (target >= 100 ? Math.round(v) : Math.round(v * 10) / 10).toLocaleString('en')
            el.textContent = prefix + display + suffix
            if (t < 1) requestAnimationFrame(step)
            else el.textContent = text
          }
          el.textContent = prefix + '0' + suffix
          requestAnimationFrame(step)
        })
      },
      { threshold: 0.3 }
    )
    metrics.forEach((m) => {
      mObs.observe(m)
    })
  }, [])

  return (
    <div className="deck">
      {deckData.slides.map((slide) => (
        <Slide key={slide.number} slide={slide} />
      ))}
    </div>
  )
}

function Slide({ slide }: { slide: any }) {
  const slideNum = parseInt(slide.number)

  return (
    <section className="slide">
      <div className="topbar">
        <div className="kicker">
          <b>{slide.kicker_title}</b> <span>{slide.kicker_subtitle}</span>
        </div>
        <div className="page">{slide.number}</div>
      </div>

      {slide.title && <h1 className="anim">{slide.title}</h1>}
      {slide.subtitle && <p className="subtitle anim">{slide.subtitle}</p>}
      {slide.big_statement && <p className="big-statement anim">{parseHTML(slide.big_statement)}</p>}

      {slide.metrics && slide.metrics.length > 0 && (
        <div className="metric-row anim-children">
          {slide.metrics.map((metric: any, idx: number) => (
            <div className="metric" key={idx}>
              <div className="num">{metric.value}</div>
              <div className="lbl">{metric.label}</div>
            </div>
          ))}
        </div>
      )}

      {slideNum === 1 && <SlideOne />}
      {slideNum === 2 && <SlideTwo />}
      {slideNum === 3 && <SlideThree />}
      {slideNum === 4 && <SlideFour />}
      {slideNum === 5 && <SlideFive />}
      {slideNum === 6 && <SlideSix />}
      {slideNum === 7 && <SlideSeven />}
      {slideNum === 8 && <SlideEight />}
    </section>
  )
}

function parseHTML(html: string) {
  return html.split(/(<b>.*?<\/b>)/).map((part, i) => {
    if (part.startsWith('<b>')) {
      return <b key={i}>{part.replace(/<\/?b>/g, '')}</b>
    }
    return part
  })
}

function SlideOne() {
  return (
    <div className="anim-children">
      <div className="panel strong">
        <div className="card-title">Investment angle</div>
        <p className="small">
          FyzickÃ¡ infrastruktura (servisy, storage, dealerstvÃ­) zÅ¯stÃ¡vÃ¡ fragmentovanÃ¡ a manuÃ¡lnÄ spravovanÃ¡. KonsolidaÄnÃ­
          platforma, kterÃ¡ pÅinese software, centrÃ¡lnÃ­ nÃ¡kup a operaÄnÃ­ disciplÃ­nu, mÅ¯Å¾e ovlÃ¡dnout sektor pÅesnÄjÅ¡Ã­cho neÅ¾
          ÄistÄ digitÃ¡lnÃ­ hÃ¡Äi.
        </p>
      </div>
    </div>
  )
}

function SlideTwo() {
  return (
    <div className="cols-2 anim-children">
      <div className="panel">
        <div className="card-title">TrendovÃ¡ data</div>
        <div className="bars">
          <div className="bar">
            <div className="bar-top">
              <span>PodÃ­l EU tourism trips pro osobnÃ­ ÃºÄely</span>
              <span>89.7%</span>
            </div>
            <div className="track">
              <div className="fill good" style={{ width: '90%' }}></div>
            </div>
          </div>
          <div className="bar">
            <div className="bar-top">
              <span>Trips s hlavnÃ­m ÃºÄelem holidays / leisure / recreation</span>
              <span>53.2%</span>
            </div>
            <div className="track">
              <div className="fill" style={{ width: '53%' }}></div>
            </div>
          </div>
          <div className="bar">
            <div className="bar-top">
              <span>MezinÃ¡rodnÃ­ pÅÃ­jezdy ve svÄtÄ 2025 vs. 2024</span>
              <span>+4%</span>
            </div>
            <div className="track">
              <div className="fill warn" style={{ width: '62%' }}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="panel">
        <div className="card-title">Co to znamenÃ¡ pro nÃ¡s</div>
        <div className="bullet">
          <div className="item">
            <div className="dot"></div>
            <p>NevsÃ¡zÃ­me na hypotetickou zmÄnu chovÃ¡nÃ­. UÅ¾ dnes je vÄtÅ¡ina travel poptÃ¡vky v EvropÄ osobnÃ­ / leisure.</p>
          </div>
          <div className="item">
            <div className="dot"></div>
            <p>Caravanning nenÃ­ vÃ½stÅelek z covidu. Registrace zÅ¯stÃ¡vajÃ­ na vysokÃ© Ãºrovni i po normalizaci trhu.</p>
          </div>
          <div className="item">
            <div className="dot"></div>
            <p>To vytvÃ¡ÅÃ­ prostor pro skupinu, kterÃ¡ bude ÅÃ­dit fyzickou vrstvu trhu efektivnÄji neÅ¾ dneÅ¡nÃ­ lokÃ¡lnÃ­ operÃ¡toÅi.</p>
          </div>
        </div>
        <div className="chip-row">
          <div className="chip">Demand tailwind</div>
          <div className="chip">Supply inefficiency</div>
          <div className="chip">Operational roll-up</div>
        </div>
      </div>
    </div>
  )
}

function SlideThree() {
  return (
    <div className="anim-children">
      <div style={{ fontSize: '13px', color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 650, marginTop: '22px', position: 'relative', zIndex: 2 }}>
        Problem
      </div>
      <div className="cols-3">
        <div className="panel strong">
          <div className="card-title">Fragmented ownership</div>
          <p className="small">
            Mnoho nezÃ¡vislÃ½ch, regionÃ¡lnÃ­ch, Äasto rodinnÃ½ch firem. SlabÃ© nÃ¡stupnictvÃ­, podcenÄnÃ¡ digitalizace, brand a marketing,
            minimÃ¡lnÃ­ economy of scale.
          </p>
        </div>
        <div className="panel strong">
          <div className="card-title">Under-digitized operations</div>
          <p className="small">
            ServisnÃ­ kapacita, pricing, storage, fleet rotation, lead management, finance a pojiÅ¡tÄnÃ­ bÃ½vajÃ­ ÅÃ­zenÃ© manuÃ¡lnÄ nebo
            pÅes nesourodÃ© nÃ¡stroje.
          </p>
        </div>
        <div className="panel strong">
          <div className="card-title">No scaled integrator</div>
          <p className="small">
            Na trhu chybÃ­ hrÃ¡Ä, kterÃ½ by kombinoval M&A, centrÃ¡lnÃ­ procurement, software layer a kapitÃ¡lovou disciplÃ­nu napÅÃ­Ä
            regiony.
          </p>
        </div>
      </div>
      <div style={{ fontSize: '13px', color: 'var(--good)', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 650, marginTop: '26px', position: 'relative', zIndex: 2 }}>
        Solution
      </div>
      <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '18px', background: 'rgba(134,239,172,.04)', position: 'relative', zIndex: 2, marginTop: '6px' }}>
        <div className="flow">
          <div className="step">
            <div className="n">01</div>
            <h3>Dealer</h3>
            <p className="small">lokÃ¡lnÃ­ prodej a vztah se zÃ¡kaznÃ­kem</p>
          </div>
          <div className="step">
            <div className="n">02</div>
            <h3>Service</h3>
            <p className="small">workshop, dÃ­ly, pÅestavby, warranty</p>
          </div>
          <div className="step">
            <div className="n">03</div>
            <h3>Storage</h3>
            <p className="small">sezÃ³nnÃ­ parkovÃ¡nÃ­, pÅÃ­prava a logistika</p>
          </div>
          <div className="step">
            <div className="n">04</div>
            <h3>Rental</h3>
            <p className="small">yield management a asset utilization</p>
          </div>
          <div className="step">
            <div className="n">05</div>
            <h3>Software</h3>
            <p className="small">sjednocenÃ­ workflow a datovÃ© vrstvy</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '13px', color: 'var(--good)', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 600 }}>
          â pod jednou znaÄkou, spoleÄnÃ½m IT a centrÃ¡lnÃ­m ÅÃ­zenÃ­m
        </div>
      </div>
    </div>
  )
}

function SlideFour() {
  return (
    <div>
      <div style={{ fontSize: '12px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 650, marginTop: '18px', marginBottom: '6px', position: 'relative', zIndex: 2 }} className="anim">
        Digital & service platform
      </div>
      <div className="diagram anim-children">
        <div className="core anim-scale">
          <div className="lines">
            <svg viewBox="0 0 1000 600" preserveAspectRatio="none">
              <path d="M500 300 C350 170, 240 120, 155 95" />
              <path d="M500 300 C650 155, 770 120, 850 115" />
              <path d="M500 300 C360 390, 220 485, 155 520" />
              <path d="M500 300 C650 390, 790 480, 850 525" />
              <path d="M500 300 C295 290, 160 300, 105 300" />
              <path d="M500 300 C705 300, 840 300, 895 300" />
            </svg>
          </div>
          <div className="core-center">
            <div className="title">
              RV Infrastructure
              <br />
              Platform
            </div>
            <p className="small" style={{ marginTop: '10px', color: '#eef3ff' }}>
              central purchasing Â· shared systems Â· operating playbook Â· data layer
            </p>
          </div>
          <div className="orbit o1">Dealership</div>
          <div className="orbit o2">Service & Parts</div>
          <div className="orbit o3">Storage & Prep</div>
          <div className="orbit o4">Rental & Remarketing</div>
          <div className="orbit o5">F&I / Ancillary</div>
          <div className="orbit o6">Software Layer</div>
        </div>
        <div className="rightbox">
          <div className="panel strong">
            <div className="card-title">Kde vznikÃ¡ synergie</div>
            <div className="bullet">
              <div className="item">
                <div className="dot"></div>
                <p>centrÃ¡lnÃ­ nÃ¡kup vozÅ¯, dÃ­lÅ¯ a pÅÃ­sluÅ¡enstvÃ­</p>
              </div>
              <div className="item">
                <div className="dot"></div>
                <p>shared CRM / ERP / booking / workshop scheduling</p>
              </div>
              <div className="item">
                <div className="dot"></div>
                <p>cross-sell rental â retail â service â storage</p>
              </div>
              <div className="item">
                <div className="dot"></div>
                <p>vyÅ¡Å¡Ã­ utilizace servisnÃ­ a storage kapacity</p>
              </div>
            </div>
          </div>
          <div className="panel strong">
            <div className="card-title">3 vrstvy platformy</div>
            <div className="bullet">
              <div className="item">
                <div className="dot"></div>
                <p>
                  <b>FyzickÃ¡ infrastruktura:</b> servisy, dealerstvÃ­, storage, rental â to, co AI nenahradÃ­.
                </p>
              </div>
              <div className="item">
                <div className="dot"></div>
                <p>
                  <b>OperaÄnÃ­ software:</b> sjednocuje procesy, data a pricing napÅÃ­Ä sÃ­tÃ­.
                </p>
              </div>
              <div className="item">
                <div className="dot"></div>
                <p>
                  <b>ZÃ¡kaznickÃ© brandy:</b> Campiri, Nomivans, Dokempu â demand, trust, repeat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: 'var(--warn)', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 650, marginTop: '6px', marginBottom: '6px', position: 'relative', zIndex: 2 }} className="anim">
        Physical branch
      </div>
      <div className="diagram anim">
        <div className="panel">
          <div className="card-title">Real estate optionality â "McDonalds" styl</div>
          <p className="small">Koupit vybranÃ© areÃ¡ly a pronajÃ­mat operÃ¡torÅ¯m pro zvyÅ¡ovÃ¡nÃ­ kontroly nad kapacitou a strategickou pozicÃ­.</p>
        </div>
        <div></div>
      </div>
    </div>
  )
}

function SlideFive() {
  return (
    <div className="cols-2 anim-children">
      <div className="panel strong anim-bar">
        <div className="card-title">AI expozice napÅÃ­Ä profesemi</div>
        <div className="bars">
          <div className="bar">
            <div className="bar-top">
              <span>ProgramÃ¡toÅi</span>
              <span>~75%</span>
            </div>
            <div className="track">
              <div className="fill warn" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div className="bar">
            <div className="bar-top">
              <span>ZÃ¡kaznickÃ¡ podpora</span>
              <span>~70%</span>
            </div>
            <div className="track">
              <div className="fill warn" style={{ width: '70%' }}></div>
            </div>
          </div>
          <div className="spectrum-divider">
            <span>â AI-resilient profese</span>
          </div>
          <div className="bar">
            <div className="bar-top">
              <span>Instalace & opravy</span>
              <span>~12%</span>
            </div>
            <div className="track">
              <div className="fill resilient" style={{ width: '12%' }}></div>
            </div>
          </div>
          <div className="bar">
            <div className="bar-top">
              <span>Transport & logistika</span>
              <span>~14%</span>
            </div>
            <div className="track">
              <div className="fill resilient" style={{ width: '14%' }}></div>
            </div>
          </div>
        </div>
        <p className="small" style={{ marginTop: '14px' }}>
          Servis, dÃ­lna, dvÅ¯r, handover â to jsou profese ze spodnÃ­ ÄÃ¡sti spektra. AI nÃ¡m zvyÅ¡uje marÅ¾i na centrÃ¡le (backoffice,
          pricing, scheduling), ale nerozbÃ­jÃ­ investiÄnÃ­ tezi platformy.
        </p>
      </div>
      <div className="panel">
        <div className="card-title">Leisure tailwind</div>
        <div className="bullet">
          <div className="item">
            <div className="dot"></div>
            <p>
              AI zlevÅuje a zrychluje knowledge work. ÄÃ¡st uvolnÄnÃ© kapacity pÅeteÄe do <b>volnÃ©ho Äasu, zÃ¡Å¾itkÅ¯ a cestovÃ¡nÃ­</b>.
            </p>
          </div>
          <div className="item">
            <div className="dot"></div>
            <p>
              Data to potvrzujÃ­: 89.7 % cest v EU je osobnÃ­ch, 53.2 % pÅÃ­mo za dovolenou. Leisure dominuje evropskÃ©mu cestovnÃ­mu trhu
              uÅ¾ dnes.
            </p>
          </div>
          <div className="item">
            <div className="dot"></div>
            <p>
              RV sedÃ­ na prÅ¯seÄÃ­ku <b>mobility + hospitality + outdoor</b> â jednom z nejÄistÅ¡Ã­ch formÃ¡tÅ¯ tÃ©to poptÃ¡vky.
            </p>
          </div>
        </div>
        <div className="chip-row">
          <div className="chip">AI jako provoznÃ­ pÃ¡ka</div>
          <div className="chip">Leisure jako strukturÃ¡lnÃ­ tailwind</div>
        </div>
      </div>
    </div>
  )
}

function SlideSix() {
  return (
    <div className="cols-2 anim-children">
      <div className="panel strong">
        <div className="card-title">Priority targets</div>
        <table>
          <thead>
            <tr>
              <th>Archetype</th>
              <th>Who interesting</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dealer + service</td>
              <td>nejlepÅ¡Ã­ kombinace retail + after-sales</td>
              <td>
                <span className="tag">High</span>
              </td>
            </tr>
            <tr>
              <td>Service + storage hub</td>
              <td>niÅ¾Å¡Ã­ cyclicality, vyÅ¡Å¡Ã­ repeat revenue</td>
              <td>
                <span className="tag">High</span>
              </td>
            </tr>
            <tr>
              <td>Used RV specialist</td>
              <td>remarketing engine + sourcing edge</td>
              <td>
                <span className="tag">Medium</span>
              </td>
            </tr>
            <tr>
              <td>Rental support operator</td>
              <td>fleet prep, maintenance, handovers</td>
              <td>
                <span className="tag">Medium</span>
              </td>
            </tr>
            <tr>
              <td>Standalone land / site</td>
              <td>jen pokud unlockuje servisnÃ­ cluster</td>
              <td>
                <span className="tag">Selective</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="panel">
        <div className="card-title">Filter criteria</div>
        <div className="bullet">
          <div className="item">
            <div className="dot"></div>
            <p>strategickÃ¡ regionÃ¡lnÃ­ pozice</p>
          </div>
          <div className="item">
            <div className="dot"></div>
            <p>distribuÄnÃ­ licence na prodej komplementÃ¡rnÃ­ch RV brandÅ¯</p>
          </div>
          <div className="item">
            <div className="dot"></div>
            <p>servisnÃ­ kapacita jako bottleneck, kterÃ½ umÃ­me lÃ©pe monetizovat</p>
          </div>
          <div className="item">
            <div className="dot"></div>
            <p>vlastnickÃ¡ motivace k exitu / succession issue</p>
          </div>
          <div className="item">
            <div className="dot"></div>
            <p>prostor pro central purchasing, brand a marketing, software rollout a KPI governance</p>
          </div>
          <div className="item">
            <div className="dot"></div>
            <p>geografickÃ½ fit s existujÃ­cÃ­ sÃ­tÃ­ nebo plÃ¡novanÃ½m clusterem</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SlideSeven() {
  return (
    <div className="status-grid anim-children">
      <div className="status-stack">
        <div className="status-card">
          <div className="status-head">
            <h3>Physical infrastructure</h3>
            <div className="status-tag">today: 1 location live</div>
          </div>
          <p className="small">MÃ¡me jednu fyzickou poboÄku, kterÃ¡ uÅ¾ dnes kombinuje klÃ­ÄovÃ© moduly infrastruktury.</p>
          <div className="mini-list">
            <div className="mini-item">
              <div className="mini-dot"></div>
              <span>service</span>
            </div>
            <div className="mini-item">
              <div className="mini-dot"></div>
              <span>RV dealer</span>
            </div>
            <div className="mini-item">
              <div className="mini-dot"></div>
              <span>used RV specialist</span>
            </div>
            <div className="mini-item">
              <div className="mini-dot"></div>
              <span>rental</span>
            </div>
          </div>
          <div className="brand-pill-row">
            <div className="brand-pill">Nomivans</div>
          </div>
        </div>
        <div className="status-card">
          <div className="status-head">
            <h3>Digital operational platform</h3>
            <div className="status-tag">WIP Â· ~20% built</div>
          </div>
          <p className="small">OperaÄnÃ­ software vrstva je rozpracovanÃ¡, ale nenÃ­ hotovÃ¡. MVP launch Q2/2026.</p>
          <div className="progress-xl anim-progress">
            <div style={{ width: '20%' }}></div>
          </div>
          <div className="brand-pill-row">
            <div className="brand-pill">Carivio</div>
          </div>
        </div>
        <div className="status-card">
          <div className="status-head">
            <h3>Customer-facing brands & community</h3>
            <div className="status-tag">live</div>
          </div>
          <p className="small">Na demand side uÅ¾ mÃ¡me dvÄ znaÄky, kterÃ© drÅ¾Ã­ vztah se zÃ¡kaznÃ­kem a distribuÄnÃ­ touchpoint.</p>
          <div className="brand-pill-row">
            <div className="brand-pill">Campiri</div>
            <div className="brand-pill">Dokempu</div>
          </div>
        </div>
      </div>
      <div className="now-board">
        <div className="card-title">Nomiverse today = asymmetric starting point</div>
        <p className="small">
          NejdÅ¯leÅ¾itÄjÅ¡Ã­ nenÃ­ absolutnÃ­ velikost dneÅ¡nÃ­ bÃ¡ze, ale to, Å¾e uÅ¾ dnes kombinujeme reÃ¡lnou fyzickou delivery vrstvu,
          zÃ¡kaznickÃ© brandy a rozestavÄnou operaÄnÃ­ platformu.
        </p>
        <div className="strategic-timeline" style={{ marginTop: '18px' }}>
          <div className="tl-item done">
            <div className="tl-marker">â</div>
            <div className="tl-body">
              <div className="tl-date">2020 â 2025</div>
              <div className="tl-label">Build + validace unit economics</div>
            </div>
          </div>
          <div className="tl-item next">
            <div className="tl-marker">â</div>
            <div className="tl-body">
              <div className="tl-date">2026</div>
              <div className="tl-label">Standardizace, procesy a pÅÃ­prava na dalÅ¡Ã­ akvizice</div>
            </div>
          </div>
          <div className="tl-item future">
            <div className="tl-marker">â</div>
            <div className="tl-body">
              <div className="tl-date">2026 â 2031</div>
              <div className="tl-label">Å kÃ¡lovÃ¡nÃ­ a M&A v ÄeskÃ© republice a dosaÅ¾enÃ­ 1 mld KÄ roÄnÃ­ch trÅ¾eb</div>
            </div>
          </div>
        </div>
        <div className="panel strong" style={{ marginTop: '16px' }}>
          <div className="card-title">Build sequence from here</div>
          <div className="timeline" style={{ marginTop: '14px' }}>
            <div className="phase">
              <div className="when">01 Â· Now</div>
              <h3>Validate stack</h3>
              <p className="small">dokonÄit zÃ¡kladnÃ­ playbook na stÃ¡vajÃ­cÃ­m uzlu a potvrdit economics</p>
              <div className="progress-xl anim-progress" style={{ marginTop: '8px' }}>
                <div style={{ width: '90%' }}></div>
              </div>
              <div className="small" style={{ textAlign: 'right', marginTop: '2px', color: 'var(--good)', fontWeight: 600, fontSize: '11px' }}>
                90 %
              </div>
            </div>
            <div className="phase">
              <div className="when">02 Â· Next</div>
              <h3>Add nodes</h3>
              <p className="small">pÅidat dalÅ¡Ã­ fyzickÃ© uzly a zvÃ½Å¡it network density</p>
            </div>
            <div className="phase">
              <div className="when">03 Â· Then</div>
              <h3>Standardize software</h3>
              <p className="small">sjednotit data, workflow a reporting napÅÃ­Ä skupinou</p>
            </div>
            <div className="phase">
              <div className="when">04 Â· Scale</div>
              <h3>Compound brands</h3>
              <p className="small">posÃ­lit demand capture a repeat customer flywheel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SlideEight() {
  return (
    <div className="cols-2 anim-children">
      <div className="panel strong" style={{ minHeight: '430px', display: 'flex', alignItems: 'center' }}>
        <div>
          <div className="card-title">One-line thesis</div>
          <div className="quote" style={{ fontSize: '40px' }}>
            Konsolidujeme fyzickÃ© uzly evropskÃ©ho RV trhu do jednÃ©{' '}
            <span style={{ background: 'linear-gradient(90deg,#7dd3fc,#c4b5fd)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              RV Infrastructure Platform
            </span>
            , kterÃ¡ je AI-resilient, asset-backed a napojenÃ¡ na strukturÃ¡lnÃ­ rÅ¯st leisure economy.
          </div>
        </div>
      </div>
      <div className="panel">
        <div className="card-title">Why this can work</div>
        <div className="bullet">
          <div className="item">
            <div className="dot"></div>
            <p>SilnÃ¡ leisure poptÃ¡vka + fragmentovanÃ¡ a neefektivnÃ­ nabÃ­dkovÃ¡ strana = konsolidaÄnÃ­ okno.</p>
          </div>
          <div className="item">
            <div className="dot"></div>
            <p>Asset-backed model s fyzickou vrstvou, kterou AI nenahradÃ­ a software zefektivnÃ­.</p>
          </div>
          <div className="item">
            <div className="dot"></div>
            <p>Prostor vybudovat prvnÃ­ Å¡kÃ¡lovanou evropskou RV infrastrukturnÃ­ platformu.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
