import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import PaintArtwork from '../common/PaintArtwork'
import GradientText from '../common/GradientText'
import PrimaryButton from '../common/PrimaryButton'
import DraftNote from '../common/DraftNote'
import { services } from '../../data/services'
import { accents } from '../../data/accents'
import { gsap, useGSAP, MOTION_OK } from '../../lib/gsap'

export default function ServicesPreview() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray('[data-svc-row]').forEach((row) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 88%' } })
          tl.fromTo(row.querySelector('[data-svc-line]'), { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'expo.inOut' })
            .fromTo(row.querySelector('[data-svc-num]'), { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.1, ease: 'expo.out' }, 0.2)
            .fromTo(row.querySelector('[data-svc-copy]'), { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, ease: 'expo.out' }, 0.3)
          const img = row.querySelector('[data-svc-img]')
          if (img) {
            tl.fromTo(img, { clipPath: 'inset(0% 0% 0% 100% round 14px)' }, { clipPath: 'inset(0% 0% 0% 0% round 14px)', duration: 1.3, ease: 'expo.inOut' }, 0.25)
          }
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-labelledby="services-title" className="section-y relative isolate overflow-hidden bg-charcoal">
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10 opacity-50" />
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            className="lg:col-span-8"
            number="03"
            tone="text-orange"
            eyebrow="What we do"
            id="services-title"
            lines={[
              'From the first',
              'idea to the',
              <>
                <GradientText variant="aurora">final frame.</GradientText>
              </>,
            ]}
          />
          <Reveal className="lg:col-span-4 lg:pb-3">
            <p className="text-[1.05rem] leading-relaxed text-muted">
              Every production is a journey. These are the creative disciplines that shape it, from concept to the finished
              cut.
            </p>
            <DraftNote className="mt-5">Proposed services &mdash; pending client confirmation</DraftNote>
          </Reveal>
        </div>

        <ul className="mt-16 md:mt-24">
          {services.map((s) => {
            const a = accents[s.accent]
            return (
              <li key={s.slug} data-svc-row className="group relative">
                <span data-svc-line aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left bg-soft/12" />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 origin-bottom scale-y-0 opacity-0 transition-[transform,opacity] duration-700 ease-cinema group-hover:scale-y-100 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, ${a.glow}, transparent 70%)` }}
                />
                <Link
                  to={`/services#${s.slug}`}
                  className="grid grid-cols-[1fr_auto] items-center gap-x-5 gap-y-3 py-8 md:grid-cols-12 md:gap-x-8 md:py-10"
                >
                  <span className="overflow-hidden md:col-span-2">
                    <span
                      data-svc-num
                      aria-hidden="true"
                      className={`text-outline block font-display text-[clamp(2.6rem,5.5vw,5.75rem)] font-extrabold leading-none tracking-[-0.04em] transition-colors duration-500 ${a.text} group-hover:[-webkit-text-fill-color:currentColor]`}
                    >
                      {s.number}
                    </span>
                  </span>

                  <span data-svc-copy className="col-span-2 block min-w-0 max-md:order-3 md:col-span-6 lg:col-span-5">
                    <span className="block font-display text-[clamp(1.45rem,2.7vw,2.6rem)] font-bold uppercase leading-[1.02] tracking-[-0.02em] transition-transform duration-700 ease-cinema group-hover:translate-x-2">
                      {s.title}
                    </span>
                    <span className="mt-3 hidden max-w-md text-[0.98rem] leading-relaxed text-muted sm:block">{s.short}</span>
                  </span>

                  <span data-svc-img className="relative hidden overflow-hidden rounded-[14px] lg:col-span-3 lg:block">
                    <PaintArtwork
                      image={s.image}
                      sizes="22vw"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-[1200ms] ease-cinema group-hover:scale-110"
                    />
                  </span>

                  <span className="flex justify-end max-md:order-2 md:col-span-4 lg:col-span-2">
                    <span
                      className={`grid size-12 place-items-center rounded-full border border-soft/20 transition-all duration-500 ease-cinema group-hover:rotate-45 group-hover:border-transparent group-hover:text-obsidian md:size-16 ${a.text} ${a.hoverBg}`}
                    >
                      <ArrowUpRight className="size-5 text-current group-hover:text-obsidian" aria-hidden="true" />
                    </span>
                  </span>
                  <span className="sr-only">&mdash; learn more about {s.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
        <div aria-hidden="true" className="h-px bg-soft/12" />

        <Reveal className="mt-14 md:mt-20">
          <PrimaryButton to="/services">Explore all services</PrimaryButton>
        </Reveal>
      </div>
    </section>
  )
}
