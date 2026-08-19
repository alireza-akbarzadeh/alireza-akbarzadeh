# Graph Report - .  (2026-08-19)

## Corpus Check
- 215 files · ~177,459 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1229 nodes · 1860 edges · 111 communities (81 shown, 30 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 39 edges (avg confidence: 0.54)
- Token cost: 0 input · 73,573 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 44
- Community 45
- Community 46
- Community 47
- Community 48
- Community 49
- Community 50
- Community 51
- Community 52
- Community 53
- Community 54
- Community 55
- Community 56
- Community 57
- Community 58
- Community 59
- Community 60
- Community 61
- Community 62
- Community 63
- Community 64
- Community 65
- Community 66
- Community 67
- Community 68
- Community 69
- Community 70
- Community 71
- Community 72
- Community 73
- Community 74
- Community 75
- Community 76
- Community 77
- Community 78
- Community 79
- Community 80
- Community 82
- Community 83
- Community 84
- Community 85
- Community 86
- Community 87
- Community 88
- Community 89
- Community 90
- Community 91
- Community 92
- Community 93
- Community 94
- Community 95
- Community 96
- Community 98
- Community 99
- Community 100
- Community 101
- Community 102
- Community 103
- Community 104
- Community 105
- Community 106
- Community 107
- Community 108

## God Nodes (most connected - your core abstractions)
1. `TailwindConfigGenerator` - 58 edges
2. `cn()` - 57 edges
3. `TestTailwindConfigGenerator` - 35 edges
4. `ShadcnInstaller` - 34 edges
5. `DesignSystemGenerator` - 29 edges
6. `TestShadcnInstaller` - 26 edges
7. `button` - 18 edges
8. `compilerOptions` - 16 edges
9. `color` - 15 edges
10. `search()` - 15 edges

## Surprising Connections (you probably didn't know these)
- `Alireza Akbarzadeh — Portfolio Design System` --semantically_similar_to--> `Storybook-Documented Design System (shared across three products)`  [INFERRED] [semantically similar]
  DESIGN.md → README.md
- `BentoGrid()` --calls--> `cn()`  [EXTRACTED]
  components/ui/BentoGrid.tsx → lib/utils.ts
- `BentoGridItem()` --calls--> `cn()`  [EXTRACTED]
  components/ui/BentoGrid.tsx → lib/utils.ts
- `Own-Work-Only Screenshot Rule (removed template p1-p4.svg and stock profile.svg)` --conceptually_related_to--> `Alireza Akbarzadeh (Senior Frontend Engineer)`  [INFERRED]
  public/work/README.md → README.md
- `Error()` --calls--> `button`  [EXTRACTED]
  app/error.tsx → components/ui/Button.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Portfolio Components Implementing the Shared Design System Tokens** — design_nav_bar_component, design_button_primary_component, design_button_secondary_component, design_button_nav_component, design_tag_pill_component, design_case_study_card_component, design_timeline_item_component, design_skill_group_component, design_footer_component, design_ink_canvas_hairline_scale, design_typography_scale, design_elevation_model, design_shape_radius_scale [INFERRED 0.85]
- **Two Deliberate Deviations From the geist-system Skill** — design_geist_system_skill, design_dark_first_theme_deviation, design_amber_accent_deviation [EXTRACTED 1.00]
- **Selected Work Portfolio Showcase** — readme_alireza_akbarzadeh, readme_novastudio, readme_stramify, readme_react_launchpad, readme_frontend_handbook [EXTRACTED 1.00]

## Communities (111 total, 30 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (53): $type, $value, $type, $value, $type, $value, $type, $value (+45 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (42): BM25, detect_domain(), get_cip_brief(), _load_csv(), Load CSV and return list of dicts, Core search function using BM25, Auto-detect the most relevant domain from query, Main search function with auto-domain detection (+34 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (35): class-variance-authority, clsx, Card(), CanvasRevealEffect(), DotMatrix(), DotMatrixProps, ShaderProps, Uniforms (+27 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (36): format_context(), format_result(), main(), Format a single search result for display, Format contextual recommendations for display., BM25, calculate_pattern_break(), detect_domain() (+28 more)

### Community 4 - "Community 4"
Cohesion: 0.12
Nodes (23): generateMetadata(), Params, ProjectPage(), About(), CaseStudy(), Experience(), SelectedWork(), GROUP_ICONS (+15 more)

### Community 5 - "Community 5"
Cohesion: 0.06
Nodes (34): $type, $value, $type, $value, $type, $value, $type, $value (+26 more)

### Community 6 - "Community 6"
Cohesion: 0.11
Nodes (18): ArchitectureDiagram(), SURFACES, BoundaryDiagram(), TrajectoryGraphic(), FloatingNav(), Direction, HoverBorderGradient(), InfiniteMovingCards() (+10 more)

### Community 7 - "Community 7"
Cohesion: 0.06
Nodes (31): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, postcss, tailwindcss, @tailwindcss/postcss (+23 more)

### Community 8 - "Community 8"
Cohesion: 0.07
Nodes (15): Test adding colors multiple times., Test adding full color palette., Test adding custom breakpoints., Test TailwindConfigGenerator class., Test that adding same plugin twice doesn't duplicate., Test plugin recommendations for Next.js., Test initialization with default settings., Test generating JavaScript configuration. (+7 more)

### Community 9 - "Community 9"
Cohesion: 0.11
Nodes (25): ansi_ljust(), _detect_page_type(), format_ascii_box(), format_markdown(), format_master_md(), format_page_override_md(), generate_design_system(), _generate_intelligent_overrides() (+17 more)

### Community 10 - "Community 10"
Cohesion: 0.14
Nodes (24): get_context(), is_allowed_exception(), is_allowed_rgba(), is_inside_block(), load_css_variables(), main(), print_result(), print_summary() (+16 more)

### Community 11 - "Community 11"
Cohesion: 0.11
Nodes (19): BM25, _domain_keywords(), _get_bm25(), _load_csv(), _load_product_keywords(), _normalize(), Apply synonym substitution before tokenizing., BM25 ranking algorithm for text search (+11 more)

### Community 12 - "Community 12"
Cohesion: 0.07
Nodes (27): dom, dom.iterable, esnext, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts (+19 more)

### Community 13 - "Community 13"
Cohesion: 0.12
Nodes (19): BM25, detect_domain(), _load_csv(), Load CSV and return list of dicts, Core search function using BM25, Auto-detect the most relevant domain from query, Main search function with auto-domain detection, Search across all domains and combine results (+11 more)

### Community 14 - "Community 14"
Cohesion: 0.09
Nodes (25): button-primary Component, case-study-card Component, Dark-First Theme Deviation (dual dark/light instead of light-only), Legacy Decorative Components To Retire (GradientBg, Spotlight, MovingBorders, CanvasRevealEffect, HoverBorder, confetti/globe assets, blob keyframes), Hairline-First Elevation Model (shadow-whisper / shadow-floating), geist-system Skill, Optional Hero Mesh Gradient (off by default), Ink / Canvas / Hairline Neutral Scale (+17 more)

### Community 15 - "Community 15"
Cohesion: 0.15
Nodes (16): Error(), NotFound(), Contact(), Footer(), ICONS, Nav(), SECTION_ALIASES, ButtonProps (+8 more)

### Community 16 - "Community 16"
Cohesion: 0.14
Nodes (11): DesignSystemGenerator, _palette_is_dark(), WCAG relative luminance of a #RRGGBB string, or None if unparseable., True when a colors.csv row's Background is a dark surface., Generates design system recommendations from aggregated searches., Load reasoning rules from CSV., _relative_luminance(), TestReasoningMatch (+3 more)

### Community 17 - "Community 17"
Cohesion: 0.15
Nodes (19): _e(), generate_chart_slide(), generate_cta_slide(), generate_deck(), generate_metrics_slide(), generate_problem_slide(), generate_solution_slide(), generate_testimonial_slide() (+11 more)

### Community 18 - "Community 18"
Cohesion: 0.10
Nodes (11): Generate Tailwind CSS configuration files., Add full color palette (50-950 shades) for a base color. Args: name: Color name…, TailwindConfigGenerator, Test adding custom spacing., Test validating config with no content paths., Test validating config with empty theme extensions., Test writing configuration to file., Test initialization with different frameworks. (+3 more)

### Community 19 - "Community 19"
Cohesion: 0.11
Nodes (19): $type, $value, background, foreground, muted-foreground, primary, primary-hover, secondary (+11 more)

### Community 20 - "Community 20"
Cohesion: 0.16
Nodes (10): _filter_anti_patterns_for_mode(), _query_wants_dark(), True when a styles.csv row describes itself as dark-first., True when the query explicitly asks for a dark theme., Resolve the mode the rest of the output has to agree with., Drop "avoid dark mode" advice once dark mode is the resolved answer., _resolve_color_mode(), _style_is_dark_primary() (+2 more)

### Community 21 - "Community 21"
Cohesion: 0.17
Nodes (17): generate_css_for_background(), get_background_image(), get_curated_images(), get_overlay_css(), get_pexels_search_url(), load_backgrounds_config(), load_brand_colors(), main() (+9 more)

### Community 22 - "Community 22"
Cohesion: 0.16
Nodes (11): PinContainer(), ProjectShots(), SocialLink, WorkExperience, ArchitectureLayer, ArchitectureSpec, Project, ProjectLink (+3 more)

### Community 23 - "Community 23"
Cohesion: 0.12
Nodes (10): Test ShadcnInstaller class., Test adding all components without config., Test adding all components in dry run mode., Create temporary project structure., Test listing installed components when none exist., Test listing installed components when they exist., Test checking for existing shadcn config., Test getting installed components without config. (+2 more)

### Community 24 - "Community 24"
Cohesion: 0.20
Nodes (15): apply_color(), apply_viewbox_size(), extract_svgs(), generate_batch(), generate_icon(), generate_sizes(), load_env(), main() (+7 more)

### Community 25 - "Community 25"
Cohesion: 0.12
Nodes (16): $type, $value, $type, $value, $type, $value, $type, $value (+8 more)

### Community 26 - "Community 26"
Cohesion: 0.17
Nodes (8): main(), Add all available shadcn/ui components. Args: overwrite: If True, overwrite…, List installed components. Returns: Tuple of (success, message with component…, Check if shadcn is initialized in project. Returns: True if components.json…, Get list of already installed components. Returns: List of installed component…, Read shadcn version from project package.json; fall back to a pinned default., Add shadcn/ui components. Args: components: List of component names to add…, Tests for shadcn_add.py

### Community 27 - "Community 27"
Cohesion: 0.13
Nodes (8): main(), Add custom font families. Args: fonts: Dict of font_type: [font_names] e.g.,…, Add custom spacing values. Args: spacing: Dict of name: value e.g., {'18':…, Add custom breakpoints. Args: breakpoints: Dict of name: width e.g., {'3xl':…, Add plugin requirements. Args: plugins: List of plugin names e.g.,…, Get plugin recommendations based on configuration. Returns: List of recommended…, Validate configuration. Returns: Tuple of (valid, message), Add custom colors to theme. Args: colors: Dict of color_name: color_value Value…

### Community 28 - "Community 28"
Cohesion: 0.20
Nodes (9): alt, contentType, ProjectOgImage(), size, ProjectMotif(), Motif, MotifCell, projectMotif() (+1 more)

### Community 29 - "Community 29"
Cohesion: 0.22
Nodes (11): calculateCompliance(), colorDistance(), displayPalette(), extractHexColors(), findNearestBrandColor(), fs, generateImageMagickCommand(), hexToRgb() (+3 more)

### Community 30 - "Community 30"
Cohesion: 0.25
Nodes (13): checkManifest(), formatBytes(), formatOutput(), fs, main(), parseFilename(), path, RULES (+5 more)

### Community 31 - "Community 31"
Cohesion: 0.14
Nodes (8): Handle shadcn/ui component installation., ShadcnInstaller, Test adding components that are already installed., Test initialization with default project root., Test initialization with custom project root., Test checking for non-existent shadcn config., Test getting installed components when none exist., Test getting installed components when files exist.

### Community 32 - "Community 32"
Cohesion: 0.19
Nodes (8): Main search function with auto-domain detection, Search stack-specific guidelines, search(), search_stack(), format_output(), Format results for Claude consumption (token-optimized), Known query -> expected top-domain sanity checks (not exact-row pinning, since…, TestSearchDomains

### Community 33 - "Community 33"
Cohesion: 0.14
Nodes (8): Execute searches across multiple domains., Find matching reasoning rule for a category., Apply reasoning rules to search results., Select best matching result based on priority keywords., Extract results list from search result dict., Generate complete design system recommendation. variance/motion/density are…, Bucket a 1-10 dial value into its tier config. Returns None if value is None., _resolve_dial()

### Community 34 - "Community 34"
Cohesion: 0.14
Nodes (13): aliases, components, utils, rsc, $schema, style, tailwind, baseColor (+5 more)

### Community 35 - "Community 35"
Cohesion: 0.21
Nodes (5): inter, metadata, viewport, ThemeProvider(), siteUrl

### Community 36 - "Community 36"
Cohesion: 0.15
Nodes (12): component, $type, $value, dark, semantic, $schema, $type, $value (+4 more)

### Community 37 - "Community 37"
Cohesion: 0.24
Nodes (11): extensions, formatReport(), fs, getFiles(), main(), parseArgs(), path, patterns (+3 more)

### Community 38 - "Community 38"
Cohesion: 0.20
Nodes (12): $type, $value, bg, bg, padding, shadow, card, bg (+4 more)

### Community 39 - "Community 39"
Cohesion: 0.20
Nodes (8): Tests for tailwind_config_gen.py, Reduce a generated TS/JS config to a bare assignable object so it can be handed…, Regression guard for the missing-comma bug between the ``theme`` block and…, The property preceding ``plugins`` must end with a comma (pure-Python check, so…, The emitted config parses as valid JS via ``node --check``., _strip_to_object(), TestGeneratedConfigIsValidJs, parametrize

### Community 40 - "Community 40"
Cohesion: 0.20
Nodes (6): Generate configuration file content. Returns: Configuration file as string, Generate TypeScript configuration., Generate JavaScript configuration., Format plugins array for config. Validates each plugin name against a strict…, Add indentation to JSON string., Write configuration to file. Returns: Tuple of (success, message)

### Community 41 - "Community 41"
Cohesion: 0.20
Nodes (9): genRandomNumbers(), Globe(), GlobeConfig, hexToRgb(), numbersOfRings, Position, @react-three/fiber, ThreeElements (+1 more)

### Community 42 - "Community 42"
Cohesion: 0.31
Nodes (10): extractColorsFromTable(), extractCoreAttributes(), extractHexColors(), extractImageStyle(), extractTypography(), extractVoice(), fs, generatePromptAddition() (+2 more)

### Community 43 - "Community 43"
Cohesion: 0.20
Nodes (9): args, extractTokens(), fs, minimal, MINIMAL_TOKENS, path, projectRoot, tokensPath (+1 more)

### Community 44 - "Community 44"
Cohesion: 0.18
Nodes (11): fast, normal, slow, $type, $value, $type, $value, primitive (+3 more)

### Community 45 - "Community 45"
Cohesion: 0.18
Nodes (6): Test adding components with overwrite flag., Test successful component addition., Test component addition with subprocess error., Test component addition when npx is not found., Test successful addition of all components., patch

### Community 46 - "Community 46"
Cohesion: 0.22
Nodes (6): Any, Path, Initialize generator. Args: typescript: If True, generate .ts config, else .js…, Determine default output path., Create base configuration structure., Get default content paths for framework.

### Community 47 - "Community 47"
Cohesion: 0.29
Nodes (9): enhance_prompt(), generate_batch(), generate_logo(), load_env(), main(), Enhance the logo prompt with style and industry modifiers, Generate a logo using Gemini models with image generation Args: aspect_ratio:…, Generate multiple logo variants with different styles (+1 more)

### Community 48 - "Community 48"
Cohesion: 0.36
Nodes (9): flattenTokens(), fs, generateCSS(), generateTailwind(), main(), parseArgs(), path, resolveReference() (+1 more)

### Community 49 - "Community 49"
Cohesion: 0.20
Nodes (10): fg, font-size, hover-bg, button, $type, $value, $type, $value (+2 more)

### Community 50 - "Community 50"
Cohesion: 0.27
Nodes (6): MagicButton(), BentoGrid(), BentoGridItem(), BackgroundGradientAnimation(), GridGlobe(), World

### Community 51 - "Community 51"
Cohesion: 0.33
Nodes (8): adjustBrightness(), { execFileSync }, extractColorsFromMarkdown(), fs, generateColorScale(), main(), path, updateDesignTokens()

### Community 52 - "Community 52"
Cohesion: 0.28
Nodes (8): Path, Regression tests for validate-tokens.cjs. The validator used to skip any line…, A hardcoded hex on the same line as a var() token is still a violation., A line that references only tokens produces no false positives., _run(), test_flags_hardcoded_hex_sharing_line_with_token(), test_token_only_line_reports_no_violation(), CompletedProcess

### Community 53 - "Community 53"
Cohesion: 0.29
Nodes (8): padding-x, input, $type, $value, focus-ring, padding-x, $type, $value

### Community 54 - "Community 54"
Cohesion: 0.29
Nodes (8): $type, $value, $type, $value, radius, default, full, default

### Community 55 - "Community 55"
Cohesion: 0.43
Nodes (3): detect_domain(), Auto-detect the most relevant domain from query. Matches are weighted by…, TestDomainDetection

### Community 56 - "Community 56"
Cohesion: 0.43
Nodes (3): Pick the highest-ranked palette matching the resolved mode. Only the dark case…, _select_palette_for_mode(), TestPaletteSelection

### Community 57 - "Community 57"
Cohesion: 0.29
Nodes (4): FieldProps, HeroSceneProps, PALETTES, SceneTheme

### Community 58 - "Community 58"
Cohesion: 0.47
Nodes (6): sm, shadow, sm, sm, $type, $value

### Community 59 - "Community 59"
Cohesion: 0.47
Nodes (4): Hero(), CountUp(), parse(), heroFacts

### Community 60 - "Community 60"
Cohesion: 0.40
Nodes (3): alt, contentType, size

### Community 61 - "Community 61"
Cohesion: 0.60
Nodes (5): $type, $value, border, border, border

### Community 62 - "Community 62"
Cohesion: 0.60
Nodes (5): radius, radius, radius, $type, $value

### Community 63 - "Community 63"
Cohesion: 0.60
Nodes (5): lg, $type, $value, lg, lg

### Community 64 - "Community 64"
Cohesion: 0.60
Nodes (3): HeroCanvas(), HeroScene, useMediaQuery()

### Community 65 - "Community 65"
Cohesion: 0.67
Nodes (4): padding-y, padding-y, $type, $value

### Community 66 - "Community 66"
Cohesion: 0.67
Nodes (4): xl, xl, $type, $value

### Community 67 - "Community 67"
Cohesion: 0.67
Nodes (4): $type, $value, md, md

### Community 68 - "Community 68"
Cohesion: 0.67
Nodes (4): $type, $value, none, none

### Community 69 - "Community 69"
Cohesion: 0.83
Nodes (3): _check_file(), main(), _read_rows()

### Community 72 - "Community 72"
Cohesion: 0.67
Nodes (3): destructive, $type, $value

### Community 73 - "Community 73"
Cohesion: 0.67
Nodes (3): destructive-foreground, $type, $value

### Community 74 - "Community 74"
Cohesion: 0.67
Nodes (3): muted, $type, $value

### Community 75 - "Community 75"
Cohesion: 0.67
Nodes (3): primary-foreground, $type, $value

### Community 76 - "Community 76"
Cohesion: 0.67
Nodes (3): ring, $type, $value

### Community 77 - "Community 77"
Cohesion: 0.67
Nodes (3): secondary-foreground, $type, $value

### Community 79 - "Community 79"
Cohesion: 0.67
Nodes (3): accent-brand Color Token, Original Amber Accent Deviation (vs. Vercel #0070f3), nav-bar Component

## Knowledge Gaps
- **252 isolated node(s):** `fs`, `path`, `fs`, `path`, `fs` (+247 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `primitive` connect `Community 44` to `Community 0`, `Community 36`, `Community 5`, `Community 54`, `Community 25`, `Community 58`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `cn()` connect `Community 6` to `Community 2`, `Community 4`, `Community 15`, `Community 50`, `Community 22`, `Community 59`, `Community 28`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 2` to `Community 7`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `TailwindConfigGenerator` (e.g. with `TestGeneratedConfigIsValidJs` and `TestTailwindConfigGenerator`) actually correct?**
  _`TailwindConfigGenerator` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 10 inferred relationships involving `DesignSystemGenerator` (e.g. with `TestDomainDetection` and `TestPersistence`) actually correct?**
  _`DesignSystemGenerator` has 10 INFERRED edges - model-reasoned connections that need verification._
- **What connects `fs`, `path`, `fs` to the rest of the system?**
  _252 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05370101596516691 - nodes in this community are weakly interconnected._