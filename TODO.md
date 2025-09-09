# TODO List for jimmypocock.com

## Project Roadmap

This document tracks the implementation of recommendations from GUIDE.md to transform the personal website into a comprehensive tech leader portfolio.

### P0 - Critical (Must Have) - These are essential items that need to be completed first

- [ ] **[Infrastructure]** Deploy to AWS `[JPCOM-029]`
- [ ] 🔄 **[UI/UX]** Update design system with new color palette (#ff6100 accent, #090909 background, #ffffff text) `[JPCOM-001]`
- [ ] 🔄 **[UI/UX]** Replace Montserrat with Noto Sans/Serif typography pairing `[JPCOM-002]`
- [ ] **[Features]** Create impact-driven Hero section showcasing RoverPass achievement ($5.2M revenue) `[JPCOM-003]`
- [ ] **[UI/UX]** Implement new navigation structure (Leadership, Projects, Insights, Music, Connect) `[JPCOM-004]`
- [ ] 🔄 **[Features]** Personalize About page with Jimmy's story and achievements `[JPCOM-005]`

### P1 - High Priority - Important features that significantly enhance the site

- [ ] **[Infrastructure]** Verify Google Analytics works `[JPCOM-033]`
- [ ] **[SEO]** Submit sitemap `[JPCOM-032]`
- [ ] **[SEO]** Add structured data `[JPCOM-031]`
- [ ] **[SEO]** Create sitemap `[JPCOM-030]`
- [ ] **[Features]** Create comprehensive RoverPass case study page with metrics and impact `[JPCOM-006]`
- [ ] **[Features]** Build Technical Projects showcase section featuring RoverPass, Vocal Technique Translator, and SongSnips `[JPCOM-007]`
- [ ] **[Features]** Design and implement Music portfolio section with placeholder for future recordings `[JPCOM-008]`
- [ ] **[Infrastructure]** Implement Person schema markup for SEO and brand building `[JPCOM-009]`
- [ ] **[UI/UX]** Add strategic humor and personality through micro-copy and interactions `[JPCOM-010]`

### P2 - Medium Priority - Enhancements that improve user experience and technical excellence

- [ ] **[Content]** Create the article: RoverPass `[JPCOM-028]`
- [ ] **[Content]** Create the article: SongSnips `[JPCOM-027]`
- [ ] **[Content]** Create the article: Vocal Technique Translator `[JPCOM-026]`
- [ ] **[Content]** Create the article: My First EP `[JPCOM-025]`
- [ ] **[Content]** Create the article: My Life With Claude `[JPCOM-024]`
- [ ] **[Content]** Create the article: My Journey to Become a Singer...Don't Stop Believin' `[JPCOM-023]`
- [ ] **[Content]** Create the article: My Experience With KTVA `[JPCOM-022]`
- [ ] **[Content]** Create the article: Why You Should Get a Vocal Coach `[JPCOM-021]`
- [ ] **[Features]** Create reusable components (ProjectCard, SkillBadge, MusicPlayer) `[JPCOM-011]`
- [ ] **[Infrastructure]** Optimize for Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1) `[JPCOM-012]`
- [ ] **[Features]** Enhance Thoughts section with better categorization and filtering `[JPCOM-013]`
- [ ] **[UI/UX]** Implement subtle animations and interactive elements for memorable experience `[JPCOM-014]`
- [ ] **[Features]** Add downloadable resume/CV for recruiters `[JPCOM-015]`

### P3 - Low Priority - Nice-to-have features for future enhancement

- [ ] **[Infrastructure]** Integrate headless CMS (Strapi/Sanity) for dynamic content management `[JPCOM-016]`
- [ ] **[Features]** Add search functionality across all content `[JPCOM-017]`
- [ ] **[Features]** Implement content relationships and cross-referencing `[JPCOM-018]`
- [ ] **[Documentation]** Create style guide and component documentation `[JPCOM-020]`

## Implementation Phases

### Phase 1: Foundation (Week 1-2)

- Complete all P0 tasks
- Focus on design system, typography, and core navigation

### Phase 2: Content Development (Week 3-4)

- Complete P1 tasks focusing on content
- RoverPass case study, Projects showcase, Music section

### Phase 3: Technical Excellence (Week 5-6)

- Complete remaining P1 and P2 infrastructure tasks
- SEO, performance optimization, component development

### Phase 4: Enhancement & Polish (Week 7+)

- P2 UI/UX improvements
- P3 features as time permits
- Continuous iteration based on feedback

## Notes

- Color palette: Using #ff6100 (orange accent), #090909 (dark background), #ffffff (white text) as base, with potential earthy tones for additional sections
- Projects to showcase: RoverPass (https://www.roverpass.com), Vocal Technique Translator (https://www.vocaltechniquetranslator.com), SongSnips (https://www.songsnips.com)
- Music section will be created with placeholder content, ready for future recordings
- Following GUIDE.md's 70-20-10 content balance: 70% professional, 20% thought leadership, 10% personal interests

## Usage

Use npm scripts to manage todos:

- `npm run todo` - Show current todos
- `npm run todo:add` - Add a new todo item
- `npm run todo:complete` - Mark a todo as complete
- `npm run todo:progress` - Update todo progress

Or use the script directly:

- `./scripts/update-todos.sh show` - Display all todos
- `./scripts/update-todos.sh complete JPCOM-001` - Mark specific todo as complete
- `./scripts/update-todos.sh progress JPCOM-002` - Mark as in progress
- `./scripts/update-todos.sh add P1 Features "Description"` - Add new todo
