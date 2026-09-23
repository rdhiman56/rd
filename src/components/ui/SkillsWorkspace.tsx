import { useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  skillCategories,
  type SkillCategoryId,
  type SkillItem,
} from '../../data/skills'
import '../../styles/skills.css'

type SkillsWorkspaceProps = {
  interactive?: boolean
}

const FILTERS: { id: SkillCategoryId | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  ...skillCategories.map((c) => ({ id: c.id as SkillCategoryId | 'all', label: c.label })),
]

export function SkillsWorkspace({ interactive = true }: SkillsWorkspaceProps) {
  const [filter, setFilter] = useIdFilter()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const visibleCategories = useMemo(() => {
    if (filter === 'all') return skillCategories
    return skillCategories.filter((c) => c.id === filter)
  }, [filter])

  const selected = useMemo(() => {
    if (!selectedId) return null
    for (const category of skillCategories) {
      const item = category.items.find((s) => s.id === selectedId)
      if (item) return { category, item }
    }
    return null
  }, [selectedId])

  return (
    <div className="skills-workspace">
      <header className="skills-workspace__intro">
        <p className="os-panel__eyebrow">Toolkit</p>
        <h2 className="os-panel__title">Skills</h2>
        <p className="os-panel__text">
          Interactive technology map from the resume — no skill percentages.
          Exploring items are marked when listed under Interests / AI skills.
        </p>
      </header>

      <div className="skills-workspace__filters" role="tablist" aria-label="Skill categories">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={filter === item.id}
            className={`skills-filter ${filter === item.id ? 'is-active' : ''}`}
            disabled={!interactive}
            onClick={() => {
              setFilter(item.id)
              setSelectedId(null)
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="skills-workspace__layout">
        <div className="skills-workspace__board" aria-label="Skills grid">
          {visibleCategories.map((category) => (
            <section key={category.id} className="skills-group">
              <div className="skills-group__head">
                <h3>{category.label}</h3>
                <p>{category.summary}</p>
              </div>
              <div className="skills-group__grid">
                {category.items.map((item, index) => (
                  <SkillCard
                    key={item.id}
                    item={item}
                    index={index}
                    selected={selectedId === item.id}
                    hovered={hoveredId === item.id}
                    interactive={interactive}
                    onHover={setHoveredId}
                    onSelect={() =>
                      setSelectedId((prev) => (prev === item.id ? null : item.id))
                    }
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside
          className={`skills-workspace__detail ${selected ? 'is-open' : ''}`}
          aria-live="polite"
        >
          {selected ? (
            <SkillDetail
              item={selected.item}
              categoryLabel={selected.category.label}
              onClose={() => setSelectedId(null)}
              interactive={interactive}
            />
          ) : (
            <p className="skills-workspace__placeholder">
              Hover to highlight a technology. Click a card for description and
              resume-linked context.
            </p>
          )}
        </aside>
      </div>
    </div>
  )
}

function useIdFilter() {
  return useState<SkillCategoryId | 'all'>('all')
}

function SkillCard({
  item,
  index,
  selected,
  hovered,
  interactive,
  onHover,
  onSelect,
}: {
  item: SkillItem
  index: number
  selected: boolean
  hovered: boolean
  interactive: boolean
  onHover: (id: string | null) => void
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      className={`skill-card ${selected ? 'is-selected' : ''} ${
        hovered ? 'is-hovered' : ''
      } ${item.evidence === 'exploring' ? 'is-exploring' : ''}`}
      style={{ '--i': index } as CSSProperties}
      disabled={!interactive}
      onClick={onSelect}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(item.id)}
      onBlur={() => onHover(null)}
    >
      <span className="skill-card__glyph" aria-hidden>
        {item.name.slice(0, 1)}
      </span>
      <span className="skill-card__body">
        <span className="skill-card__name">{item.name}</span>
        <span className="skill-card__meta">
          {item.evidence === 'exploring' ? 'Exploring' : 'Applied'}
        </span>
      </span>
    </button>
  )
}

function SkillDetail({
  item,
  categoryLabel,
  onClose,
  interactive,
}: {
  item: SkillItem
  categoryLabel: string
  onClose: () => void
  interactive: boolean
}) {
  return (
    <article className="skill-detail">
      <header className="skill-detail__header">
        <div>
          <p className="skill-detail__category">{categoryLabel}</p>
          <h3 className="skill-detail__name">{item.name}</h3>
          <p className="skill-detail__badge">
            {item.evidence === 'exploring'
              ? 'Listed as exploring / interests on resume'
              : 'Supported by resume experience or project stacks'}
          </p>
        </div>
        <button
          type="button"
          className="os-btn"
          onClick={onClose}
          disabled={!interactive}
        >
          Close
        </button>
      </header>

      <p className="skill-detail__description">{item.description}</p>

      <section className="skill-detail__section">
        <h4>Resume context</h4>
        {item.contexts.length > 0 ? (
          <ul className="skill-detail__contexts">
            {item.contexts.map((ctx) => (
              <li key={`${ctx.label}-${ctx.detail ?? ''}`}>
                <strong>{ctx.label}</strong>
                {ctx.detail ? <span>{ctx.detail}</span> : null}
              </li>
            ))}
          </ul>
        ) : (
          <p className="skill-detail__empty">No additional context on the resume.</p>
        )}
      </section>
    </article>
  )
}
