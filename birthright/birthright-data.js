/**
 * BIRTHRIGHT CITIZENSHIP GLOBAL DATA
 * Compiled: April 1, 2026
 *
 * Covers birthright citizenship (jus soli) laws for 196 profiles:
 * the UN member states, plus Taiwan, with a few disputed or non-sovereign
 * territories intentionally left as map-only gray shapes. Data reflects
 * laws in force as of April 2026.
 *
 * Classification rubric:
 *   "unrestricted"   — Birth on soil creates citizenship automatically except
 *                      standard diplomatic/hostile-occupation exceptions.
 *   "conditional"    — Birth on soil matters, but citizenship depends on
 *                      parental status, residence, later registration, anti-
 *                      statelessness protections, or similar conditions.
 *   "sanguinis_only" — Birth on soil alone does not ordinarily create
 *                      citizenship; descent is the primary rule.
 *   "transitional"   — The operative rule is being materially changed,
 *                      litigated, or implemented, making a stable label
 *                      insufficient without active review.
 */

const BIRTHRIGHT_DATA = {

  // ─────────────────────────────────────────────
  // GLOBAL STATISTICS
  // ─────────────────────────────────────────────
  stats: {
    total_countries_analyzed: 196,
    unrestricted: 33,
    conditional: 52,
    sanguinis_only: 109,
    transitional: 1,
    total_verified: 0,
    total_in_review: 0,
    total_unverified: 196,
    source_date: "April 2026",
    note: "Counts vary slightly across sources due to edge cases (choice at age 18, territories). These figures reflect the most commonly cited 2026 data.",
    pew_note: "Pew Research Center (March 2026): 32 countries have laws 'substantially similar' to the US model of unrestricted jus soli; ~50 additional countries maintain limited variations.",
    verification_note: "Verification metadata is now tracked per profile. Unless explicitly reviewed with sources, records default to unverified even when summary text exists."
  },

  // ─────────────────────────────────────────────
  // COUNTRY DATA
  // ─────────────────────────────────────────────
  countries: [
    // ── AMERICAS (mostly unrestricted — dominant region globally) ──
    {
      name: "United States",
      iso2: "US",
      iso3: "USA",
      type: "unrestricted",
      region: "North America",
      flag: "🇺🇸",
      summary: "Birthright citizenship guaranteed by the 14th Amendment (1868). Currently under Supreme Court challenge in Trump v. CASA; oral arguments held April 1, 2026; ruling expected by end of June 2026. Operative law remains unrestricted jus soli.",
      details: "President Trump signed an executive order on January 20, 2025 attempting to restrict birthright citizenship to children of citizens and lawful permanent residents. Multiple federal courts blocked the order as unconstitutional. The Supreme Court agreed to hear the case (December 2025). Oral arguments were held April 1, 2026, with Trump attending — the first known sitting president to attend a Supreme Court argument. Multiple justices, including those appointed by Trump, appeared skeptical of the administration's position; Chief Justice Roberts responded to the government's argument with 'It's the same Constitution.' The constitutional question: does 'subject to the jurisdiction thereof' in the 14th Amendment exclude children of undocumented immigrants and those on temporary visas? The landmark 1898 ruling in United States v. Wong Kim Ark established that the 14th Amendment grants citizenship to US-born children of Chinese parents — the primary precedent defenders of birthright citizenship cite. A ruling is expected by the end of June 2026.",
      law_reference: "14th Amendment (1868); United States v. Wong Kim Ark (1898)",
      recent_changes: [
        { year: 2025, event: "Trump executive order attempts to restrict birthright citizenship; immediately blocked by federal courts" },
        { year: 2025, event: "Birthright Citizenship Act of 2025 introduced in Congress (Graham, Cruz, Britt)" },
        { year: 2025, event: "Supreme Court agrees to hear Trump v. CASA (December 2025)" },
        { year: 2026, event: "Supreme Court oral arguments held April 1, 2026; multiple justices skeptical of EO; ruling expected by end of June 2026" }
      ],
      risk_level: "high",
      notable: true,
      verification: {
        verification_status: "in_review",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.npr.org/2026/04/01/nx-s1-5732437/supreme-court-birthright-citizenship-trump",
          "https://www.scotusblog.com/2026/03/the-key-arguments-in-the-birthright-citizenship-case/",
          "https://www.supremecourt.gov/opinions/24pdf/24a884_8n59.pdf"
        ],
        verification_notes: "Operative law is still the 14th Amendment — unrestricted jus soli. The Trump EO was blocked by federal courts and has never been in effect. Oral arguments in Trump v. CASA were held April 1, 2026; justices appeared skeptical of the EO. Ruling expected by end of June 2026. Classification will need updating immediately after the ruling.",
        requires_human_review: true,
        human_review_reason: "Supreme Court ruling in Trump v. CASA expected by end of June 2026. Once issued, update classification if the Court upholds the EO (would shift from unrestricted to conditional or transitional) or confirms the 14th Amendment rule (remains unrestricted, move to verified).",
        review_bucket: "recent_change",
        review_priority: 2
      }
    },
    {
      name: "Canada",
      iso2: "CA",
      iso3: "CAN",
      type: "unrestricted",
      region: "North America",
      flag: "🇨🇦",
      summary: "Unrestricted birthright citizenship. A person born in Canada is a citizen at birth apart from the standard diplomatic exception.",
      details: "Section 3(1)(a) of Canada's Citizenship Act provides that a person born in Canada after February 14, 1977 is a citizen. The core rule does not depend on the parents' immigration status, so Canada remains an unrestricted jus soli country within this project's rubric. Periodic political debate has not changed the operative statute.",
      law_reference: "Citizenship Act, R.S.C. 1985, c. C-29",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "primary",
        source_urls: [
          "https://laws-lois.justice.gc.ca/eng/acts/C-29/section-3.html"
        ],
        verification_notes: "Verified against section 3 of the Citizenship Act on the Justice Laws website. Classification remains unrestricted under the project's rubric.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Mexico",
      iso2: "MX",
      iso3: "MEX",
      type: "unrestricted",
      region: "North America",
      flag: "🇲🇽",
      summary: "Constitutional guarantee of birthright citizenship for people born in Mexican territory.",
      details: "Article 30 of the Constitution of Mexico defines as Mexican by birth those born in the territory of the Republic. That makes Mexico a clear unrestricted jus soli system in current law, rather than a parental-status or residence-based model.",
      law_reference: "Constitution of Mexico, Article 30",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "primary",
        source_urls: [
          "https://www.ordenjuridico.gob.mx/Constitucion/cn16.pdf"
        ],
        verification_notes: "Verified against article 30 of the Constitution as published by Orden Juridico Nacional. Classification remains unrestricted.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Brazil",
      iso2: "BR",
      iso3: "BRA",
      type: "unrestricted",
      region: "South America",
      flag: "🇧🇷",
      summary: "Constitutional birthright citizenship with the standard foreign-government-service exception.",
      details: "Article 12 of Brazil's Constitution treats as Brazilian by birth those born in the Federative Republic of Brazil, except children of foreign parents who are in the service of their own country. That keeps Brazil within the unrestricted jus soli category used here because the carveout is the standard diplomatic-style exception rather than a general parental-status test.",
      law_reference: "Constitution of Brazil, Article 12 (1988)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "primary",
        source_urls: [
          "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
        ],
        verification_notes: "Verified against article 12 of the 1988 Constitution as published by Planalto. Classification remains unrestricted.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Argentina",
      iso2: "AR",
      iso3: "ARG",
      type: "unrestricted",
      region: "South America",
      flag: "🇦🇷",
      summary: "Strong jus soli tradition: native Argentines include those born in Argentine territory.",
      details: "Argentina's nationality legislation defines native Argentines to include people born in Argentine territory. That supports an unrestricted jus soli classification for current law and aligns with Argentina's long-standing territorial birthright model.",
      law_reference: "Constitution of Argentina (1853/1994); Law 346",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "primary",
        source_urls: [
          "https://www.argentina.gob.ar/normativa/nacional/ley-14354-196124/texto"
        ],
        verification_notes: "Verified against article 1 of Argentina's nationality legislation on Argentina.gob.ar. Classification remains unrestricted.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Chile",
      iso2: "CL",
      iso3: "CHL",
      type: "unrestricted",
      region: "South America",
      flag: "🇨🇱",
      summary: "Unrestricted jus soli for settled residents. Constitution excludes children of foreign transients and diplomats, but Law 21,325 (2021) narrowed 'transient foreigner' to require both a transitory stay permit AND no intention to remain — so undocumented settled residents are not transients and their children receive citizenship.",
      details: "Article 10 of Chile's Constitution grants nationality to those born in Chilean territory, except children of foreigners in the service of their government and children of 'transient foreigners' — though the latter may opt for Chilean nationality as adults. Law 21,325 (Immigration Law, 2021) gave the 'transient foreigner' exception a precise legal definition: both criteria must apply simultaneously — the person must be passing through Chile without intending to remain AND must hold a transitory stay permit. This means undocumented or irregular migrants who have settled in Chile do not qualify as transient foreigners, so their children are born as Chilean citizens. The exception is now functionally limited to true short-stay visa holders, comparable to the standard diplomatic/transient exception recognized internationally.",
      law_reference: "Constitution of Chile, Article 10; Immigration Law 21,325 (2021)",
      recent_changes: [
        { year: 2021, event: "Law 21,325 narrows 'transient foreigner' to require transitory stay permit + no intention to remain, clarifying that undocumented settled residents are not transients" }
      ],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://globalcit.eu/the-implications-of-chiles-2021-immigration-law-for-citizenship-and-nationality/",
          "https://www.bcn.cl/leychile/navegar?idNorma=242302&idParte=8563477"
        ],
        verification_notes: "GlobalCit academic analysis of Law 21,325 confirms that the dual-criteria definition narrows the transient exception to permit-holders with no intent to remain. Undocumented settled residents are not transients; their children receive citizenship at birth. Classification as unrestricted is upheld.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Colombia",
      iso2: "CO",
      iso3: "COL",
      type: "conditional",
      region: "South America",
      flag: "🇨🇴",
      summary: "Conditional jus soli: at least one parent must be a Colombian national or legal resident (domicile requirement). One of very few South American exceptions.",
      details: "Colombia's Constitution grants citizenship to persons born in Colombia if at least one parent is a Colombian national or a legal resident (domicilado). This places Colombia as a notable exception in a region that otherwise universally maintains unrestricted jus soli.",
      law_reference: "Constitution of Colombia, Article 96",
      recent_changes: [],
      risk_level: "low",
      notable: true,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.aljazeera.com/news/2025/2/6/which-countries-other-than-the-us-offer-birthright-citizenship"
        ],
        verification_notes: "Parental national/resident requirement confirmed by constitutional reference and secondary sources. Colombia is a notable regional exception to Latin America's general unrestricted jus soli norm. Classification as conditional is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Venezuela",
      iso2: "VE",
      iso3: "VEN",
      type: "unrestricted",
      region: "South America",
      flag: "🇻🇪",
      summary: "Unrestricted birthright citizenship. Article 32 of the 1999 Constitution grants citizenship to all born on Venezuelan territory.",
      details: "Venezuela grants citizenship to all persons born on Venezuelan territory. The significant Venezuelan diaspora (due to political and economic crisis) has not prompted birthright citizenship restrictions in receiving countries.",
      law_reference: "Constitution of Venezuela (1999), Article 32",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.aljazeera.com/news/2025/2/6/which-countries-other-than-the-us-offer-birthright-citizenship"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources consistent with the constitutional reference. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Ecuador",
      iso2: "EC",
      iso3: "ECU",
      type: "unrestricted",
      region: "South America",
      flag: "🇪🇨",
      summary: "Unrestricted birthright citizenship. Article 7 of the 2008 Constitution grants citizenship to all born on Ecuadorian soil.",
      details: "Ecuador grants citizenship to all persons born on Ecuadorian soil regardless of parental status.",
      law_reference: "Constitution of Ecuador (2008), Article 7",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.aljazeera.com/news/2025/2/6/which-countries-other-than-the-us-offer-birthright-citizenship"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources consistent with the constitutional reference. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Peru",
      iso2: "PE",
      iso3: "PER",
      type: "unrestricted",
      region: "South America",
      flag: "🇵🇪",
      summary: "Unrestricted birthright citizenship. Article 52 of the 1993 Constitution grants citizenship to all born on Peruvian territory.",
      details: "Peru grants citizenship to all persons born on Peruvian territory regardless of parental status.",
      law_reference: "Constitution of Peru (1993), Article 52",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.aljazeera.com/news/2025/2/6/which-countries-other-than-the-us-offer-birthright-citizenship"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources consistent with the constitutional reference. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Bolivia",
      iso2: "BO",
      iso3: "BOL",
      type: "unrestricted",
      region: "South America",
      flag: "🇧🇴",
      summary: "Unrestricted birthright citizenship. Article 141 of the 2009 Constitution grants citizenship to all born on Bolivian territory.",
      details: "Bolivia grants citizenship by birth on Bolivian territory regardless of parental status.",
      law_reference: "Constitution of Bolivia (2009), Article 141",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.aljazeera.com/news/2025/2/6/which-countries-other-than-the-us-offer-birthright-citizenship"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources consistent with the constitutional reference. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Paraguay",
      iso2: "PY",
      iso3: "PRY",
      type: "unrestricted",
      region: "South America",
      flag: "🇵🇾",
      summary: "Unrestricted birthright citizenship. Article 146 of the 1992 Constitution grants citizenship to all born on Paraguayan soil.",
      details: "Paraguay grants citizenship to all persons born on Paraguayan soil regardless of parental status.",
      law_reference: "Constitution of Paraguay (1992), Article 146",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.aljazeera.com/news/2025/2/6/which-countries-other-than-the-us-offer-birthright-citizenship"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources consistent with the constitutional reference. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Uruguay",
      iso2: "UY",
      iso3: "URY",
      type: "unrestricted",
      region: "South America",
      flag: "🇺🇾",
      summary: "Unrestricted birthright citizenship. Article 74 of the 1967 Constitution grants citizenship to all born on Uruguayan soil.",
      details: "Uruguay grants citizenship to all persons born on Uruguayan soil regardless of parental status.",
      law_reference: "Constitution of Uruguay (1967), Article 74",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.aljazeera.com/news/2025/2/6/which-countries-other-than-the-us-offer-birthright-citizenship"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources consistent with the constitutional reference. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Guyana",
      iso2: "GY",
      iso3: "GUY",
      type: "unrestricted",
      region: "South America",
      flag: "🇬🇾",
      summary: "Unrestricted birthright citizenship. Article 43 of the 1980 Constitution grants citizenship to all born on Guyanese territory.",
      details: "Guyana grants citizenship to all persons born on Guyanese territory regardless of parental status.",
      law_reference: "Constitution of Guyana (1980), Article 43",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.aljazeera.com/news/2025/2/6/which-countries-other-than-the-us-offer-birthright-citizenship"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources consistent with the constitutional reference. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Suriname",
      iso2: "SR",
      iso3: "SUR",
      type: "sanguinis_only",
      region: "South America",
      flag: "🇸🇷",
      summary: "No birthright citizenship (jus sanguinis only). One of the very few South American countries without jus soli.",
      details: "Suriname is a notable exception in South America, maintaining a purely jus sanguinis system. Citizenship is acquired only through parental nationality.",
      law_reference: "Surinamese Nationality Act",
      recent_changes: [],
      risk_level: "low",
      notable: true,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://globalcit.eu"
        ],
        verification_notes: "Pure jus sanguinis confirmed by multiple secondary sources. Suriname is consistently listed as the sole South American country without jus soli. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "sanguinis_only",
        review_priority: 6
      }
    },
    {
      name: "Guatemala",
      iso2: "GT",
      iso3: "GTM",
      type: "unrestricted",
      region: "Central America",
      flag: "🇬🇹",
      summary: "Unrestricted birthright citizenship. Article 144 of the 1985 Constitution grants citizenship to all born on Guatemalan territory.",
      details: "Guatemala grants citizenship to all persons born on Guatemalan territory regardless of parental status.",
      law_reference: "Constitution of Guatemala (1985), Article 144",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://en.wikipedia.org/wiki/Guatemalan_nationality_law"
        ],
        verification_notes: "Unrestricted jus soli confirmed by secondary sources consistent with the constitutional reference. Wikipedia article on Guatemalan nationality law confirms jus soli under the 1985 Constitution. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Belize",
      iso2: "BZ",
      iso3: "BLZ",
      type: "unrestricted",
      region: "Central America",
      flag: "🇧🇿",
      summary: "Unrestricted birthright citizenship under the Belize Nationality Act.",
      details: "Belize grants citizenship to all persons born on Belizean territory regardless of parental status.",
      law_reference: "Belize Nationality Act",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.aljazeera.com/news/2025/2/6/which-countries-other-than-the-us-offer-birthright-citizenship"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Honduras",
      iso2: "HN",
      iso3: "HND",
      type: "unrestricted",
      region: "Central America",
      flag: "🇭🇳",
      summary: "Unrestricted birthright citizenship. Article 23 of the 1982 Constitution grants citizenship to all born on Honduran territory.",
      details: "Honduras grants citizenship to all persons born on Honduran territory regardless of parental status.",
      law_reference: "Constitution of Honduras (1982), Article 23",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.aljazeera.com/news/2025/2/6/which-countries-other-than-the-us-offer-birthright-citizenship"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources consistent with the constitutional reference. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "El Salvador",
      iso2: "SV",
      iso3: "SLV",
      type: "unrestricted",
      region: "Central America",
      flag: "🇸🇻",
      summary: "Unrestricted birthright citizenship. Article 90 of the 1983 Constitution grants citizenship to all born on Salvadoran territory.",
      details: "El Salvador grants citizenship to all persons born on Salvadoran territory regardless of parental status.",
      law_reference: "Constitution of El Salvador (1983), Article 90",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.aljazeera.com/news/2025/2/6/which-countries-other-than-the-us-offer-birthright-citizenship"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources consistent with the constitutional reference. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Nicaragua",
      iso2: "NI",
      iso3: "NIC",
      type: "unrestricted",
      region: "Central America",
      flag: "🇳🇮",
      summary: "Unrestricted birthright citizenship. Article 15 of the 1987 Constitution grants citizenship to all born on Nicaraguan territory.",
      details: "Nicaragua grants citizenship to all persons born on Nicaraguan territory regardless of parental status.",
      law_reference: "Constitution of Nicaragua (1987), Article 15",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.aljazeera.com/news/2025/2/6/which-countries-other-than-the-us-offer-birthright-citizenship"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources consistent with the constitutional reference. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Costa Rica",
      iso2: "CR",
      iso3: "CRI",
      type: "unrestricted",
      region: "Central America",
      flag: "🇨🇷",
      summary: "Unrestricted birthright citizenship. Article 13 of the 1949 Constitution grants citizenship to all born on Costa Rican territory. Children born abroad to a Costa Rican parent must register before age 25 (separate jus sanguinis provision).",
      details: "Costa Rica grants citizenship to all persons born on Costa Rican territory regardless of parental status. Separately, children born abroad to a Costa Rican parent acquire nationality by descent but must register before age 25 — this registration requirement applies only to the descent pathway, not to birth-in-territory citizenship.",
      law_reference: "Constitution of Costa Rica (1949), Article 13",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.aljazeera.com/news/2025/2/6/which-countries-other-than-the-us-offer-birthright-citizenship"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources. The age-25 registration applies to the jus sanguinis descent pathway only; territorial births are unrestricted. Classification remains unrestricted.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Panama",
      iso2: "PA",
      iso3: "PAN",
      type: "unrestricted",
      region: "Central America",
      flag: "🇵🇦",
      summary: "Unrestricted birthright citizenship. Article 9 of the 1972 Constitution grants citizenship to all born on Panamanian territory.",
      details: "Panama grants citizenship to all persons born on Panamanian territory regardless of parental status.",
      law_reference: "Constitution of Panama (1972), Article 9",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.aljazeera.com/news/2025/2/6/which-countries-other-than-the-us-offer-birthright-citizenship"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources consistent with the constitutional reference. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Cuba",
      iso2: "CU",
      iso3: "CUB",
      type: "unrestricted",
      region: "Caribbean",
      flag: "🇨🇺",
      summary: "Unrestricted birthright citizenship. Article 34 of the 2019 Constitution grants citizenship to all born on Cuban territory.",
      details: "Cuba grants citizenship to all persons born on Cuban territory regardless of parental status.",
      law_reference: "Constitution of Cuba (2019), Article 34",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.aljazeera.com/news/2025/2/6/which-countries-other-than-the-us-offer-birthright-citizenship"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources consistent with the constitutional reference. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Jamaica",
      iso2: "JM",
      iso3: "JAM",
      type: "unrestricted",
      region: "Caribbean",
      flag: "🇯🇲",
      summary: "Unrestricted birthright citizenship under the 1962 Constitution.",
      details: "Jamaica grants citizenship to all persons born on Jamaican territory regardless of parental status.",
      law_reference: "Constitution of Jamaica (1962)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.aljazeera.com/news/2025/2/6/which-countries-other-than-the-us-offer-birthright-citizenship"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources consistent with the constitutional reference. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Trinidad and Tobago",
      iso2: "TT",
      iso3: "TTO",
      type: "unrestricted",
      region: "Caribbean",
      flag: "🇹🇹",
      summary: "Unrestricted birthright citizenship under the 1976 Constitution.",
      details: "Trinidad and Tobago grants citizenship to all persons born on its territory regardless of parental status. A September 2025 constitutional amendment extended nationality to grandchildren of citizens born abroad (a jus sanguinis change that does not affect the territorial jus soli rule).",
      law_reference: "Constitution of Trinidad and Tobago (1976)",
      recent_changes: [
        { year: 2025, event: "Constitutional amendment extends jus sanguinis to grandchildren of citizens born abroad; does not affect territorial birthright citizenship" }
      ],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.geopoliticalmonitor.com/from-birthright-to-buy-in-the-caribbean-as-a-testing-ground-for-citizenship/"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources. The 2025 amendment extended descent-based nationality to grandchildren of citizens; it did not restrict or condition territorial birth citizenship. Classification remains unrestricted.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Dominican Republic",
      iso2: "DO",
      iso3: "DOM",
      type: "conditional",
      region: "Caribbean",
      flag: "🇩🇴",
      summary: "Conditional and highly restrictive. The 2010 Constitution excludes children of people without migratory status from automatic citizenship at birth, and the 2013 Constitutional Tribunal ruling applied that logic retroactively in a way widely criticized for creating statelessness.",
      details: "The Dominican Republic no longer operates broad jus soli. Article 18 of the 2010 Constitution excludes from citizenship at birth children born to diplomats, persons in transit, and people residing illegally. In 2013, the Constitutional Tribunal's TC/0168/13 decision held that children born to parents considered 'in transit' were not entitled to Dominican nationality, a ruling that had sweeping retroactive consequences for people of Haitian descent. Law 169-14 later created partial regularization and restoration pathways, but the country remains a conditional rather than unrestricted jus soli system.",
      law_reference: "Constitution of the Dominican Republic (2010), Article 18; Constitutional Tribunal ruling TC/0168/13; Law 169-14",
      recent_changes: [
        { year: 2010, event: "Constitutional amendment excludes children of undocumented immigrants" },
        { year: 2013, event: "Constitutional Court Ruling TC/0168/13 retroactively strips citizenship from ~200,000 people of Haitian descent born since 1929" },
        { year: 2026, event: "Statelessness crisis ongoing; international pressure continues with limited resolution" }
      ],
      risk_level: "critical",
      notable: true,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.tribunalconstitucional.gob.do/sala-de-prensa/noticias/declaraci%C3%B3n/",
          "https://www.refworld.org/reference/annualreport/usdos/2017/en/116425"
        ],
        verification_notes: "Verified against the constitutional-court material and Refworld reporting on the 2010 constitutional change and 2013 retroactive interpretation. Classification remains conditional, with severe statelessness consequences.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "recent_change",
        review_priority: 2
      }
    },
    {
      name: "Haiti",
      iso2: "HT",
      iso3: "HTI",
      type: "sanguinis_only",
      region: "Caribbean",
      flag: "🇭🇹",
      summary: "No birthright citizenship. Jus sanguinis only.",
      details: "Haiti follows jus sanguinis. Citizenship is acquired through parental nationality. This, combined with the Dominican Republic's restrictive practices, has contributed to the statelessness crisis for people of Haitian descent born in the DR.",
      law_reference: "Constitution of Haiti (1987)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://globalcit.eu"
        ],
        verification_notes: "Pure jus sanguinis under the 1987 Constitution confirmed by secondary sources. No jus soli provision. The statelessness impact on Haitian-descent persons in the DR is a separate issue from Haiti's own nationality law.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "sanguinis_only",
        review_priority: 6
      }
    },
    {
      name: "Barbados",
      iso2: "BB",
      iso3: "BRB",
      type: "unrestricted",
      region: "Caribbean",
      flag: "🇧🇧",
      summary: "Unrestricted birthright citizenship under the 1966 Constitution.",
      details: "Barbados grants citizenship to all persons born on Barbadian territory regardless of parental status.",
      law_reference: "Constitution of Barbados (1966)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.aljazeera.com/news/2025/2/6/which-countries-other-than-the-us-offer-birthright-citizenship"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources consistent with the constitutional reference. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Antigua and Barbuda",
      iso2: "AG",
      iso3: "ATG",
      type: "unrestricted",
      region: "Caribbean",
      flag: "🇦🇬",
      summary: "Unrestricted birthright citizenship under the 1981 Constitution.",
      details: "Antigua and Barbuda grants citizenship to all persons born on its territory regardless of parental status.",
      law_reference: "Constitution of Antigua and Barbuda (1981)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://en.wikipedia.org/wiki/Antiguan_and_Barbudan_nationality_law"
        ],
        verification_notes: "Unrestricted jus soli confirmed by secondary sources including Wikipedia article on Antiguan and Barbudan nationality law. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Saint Kitts and Nevis",
      iso2: "KN",
      iso3: "KNA",
      type: "unrestricted",
      region: "Caribbean",
      flag: "🇰🇳",
      summary: "Unrestricted birthright citizenship under the 1983 Constitution.",
      details: "Saint Kitts and Nevis grants citizenship to all persons born on its territory regardless of parental status.",
      law_reference: "Constitution of Saint Kitts and Nevis (1983)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.aljazeera.com/news/2025/2/6/which-countries-other-than-the-us-offer-birthright-citizenship"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources consistent with the constitutional reference. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Saint Lucia",
      iso2: "LC",
      iso3: "LCA",
      type: "unrestricted",
      region: "Caribbean",
      flag: "🇱🇨",
      summary: "Unrestricted birthright citizenship under the Saint Lucia Constitution Order (1978).",
      details: "Saint Lucia grants citizenship to all persons born on its territory regardless of parental status.",
      law_reference: "Saint Lucia Constitution Order (1978)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.aljazeera.com/news/2025/2/6/which-countries-other-than-the-us-offer-birthright-citizenship"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Saint Vincent and the Grenadines",
      iso2: "VC",
      iso3: "VCT",
      type: "unrestricted",
      region: "Caribbean",
      flag: "🇻🇨",
      summary: "Unrestricted birthright citizenship under the 1979 Constitution.",
      details: "Saint Vincent and the Grenadines grants citizenship to all persons born on its territory regardless of parental status.",
      law_reference: "Constitution of Saint Vincent and the Grenadines (1979)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.aljazeera.com/news/2025/2/6/which-countries-other-than-the-us-offer-birthright-citizenship"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Grenada",
      iso2: "GD",
      iso3: "GRD",
      type: "unrestricted",
      region: "Caribbean",
      flag: "🇬🇩",
      summary: "Unrestricted birthright citizenship under the 1973 Constitution.",
      details: "Grenada grants citizenship to all persons born on its territory regardless of parental status.",
      law_reference: "Constitution of Grenada (1973)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.aljazeera.com/news/2025/2/6/which-countries-other-than-the-us-offer-birthright-citizenship"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Dominica",
      iso2: "DM",
      iso3: "DMA",
      type: "unrestricted",
      region: "Caribbean",
      flag: "🇩🇲",
      summary: "Unrestricted birthright citizenship under the 1978 Constitution.",
      details: "Dominica grants citizenship to all persons born on its territory regardless of parental status.",
      law_reference: "Constitution of Dominica (1978)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://en.wikipedia.org/wiki/Dominican_nationality_law"
        ],
        verification_notes: "Unrestricted jus soli confirmed by secondary sources including Wikipedia on Dominican nationality law. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },

    // ── EUROPE ──
    {
      name: "United Kingdom",
      iso2: "GB",
      iso3: "GBR",
      type: "conditional",
      region: "Europe",
      flag: "🇬🇧",
      summary: "Conditional since 1 January 1983. A child born in the United Kingdom is a British citizen at birth only if a parent is a British citizen or is settled in the UK.",
      details: "The British Nationality Act 1981 replaced the older unrestricted jus soli rule. Section 1 provides that a person born in the United Kingdom after commencement is a British citizen only if, at the time of birth, a parent is a British citizen or settled in the United Kingdom. Children who do not qualify at birth may still have later registration routes, including the long-residence pathway after 10 years.",
      law_reference: "British Nationality Act 1981, section 1",
      recent_changes: [
        { year: 1983, event: "British Nationality Act 1981 ends unrestricted jus soli. Parent must be citizen or 'settled' (permanent resident)" }
      ],
      risk_level: "low",
      notable: true,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "primary",
        source_urls: [
          "https://www.legislation.gov.uk/ukpga/1981/61/pdfs/ukpga_19810061_en.pdf"
        ],
        verification_notes: "Verified against section 1 of the British Nationality Act 1981. Classification remains conditional.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "recent_change",
        review_priority: 2
      }
    },
    {
      name: "Ireland",
      iso2: "IE",
      iso3: "IRL",
      type: "conditional",
      region: "Europe",
      flag: "🇮🇪",
      summary: "Conditional since 2005. A child born on the island of Ireland is not automatically an Irish citizen unless a parent falls within one of the statutory categories, including Irish/British citizenship or sufficient reckonable residence.",
      details: "Ireland ended unrestricted jus soli through the 2004 constitutional and statutory changes that took effect in 2005. Under section 6A of the Irish Nationality and Citizenship Act, a child born on the island of Ireland to non-national parents is generally entitled to Irish citizenship only if a parent has accumulated at least 3 years of residence on the island during the 4 years before the birth, subject to exceptions for Irish or British citizens and persons entitled to reside without restriction.",
      law_reference: "Irish Nationality and Citizenship Act 2004, section 4 inserting section 6A into the 1956 Act",
      recent_changes: [
        { year: 2005, event: "27th Amendment effective: ends unrestricted jus soli. Ireland was the last EU member with unrestricted jus soli. Referendum passed ~80% in June 2004." }
      ],
      risk_level: "low",
      notable: true,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "primary",
        source_urls: [
          "https://www.irishstatutebook.ie/eli/2004/act/38/section/4/enacted/en/html",
          "https://www.irishstatutebook.ie/eli/2004/act/38/enacted/en/print"
        ],
        verification_notes: "Verified against the operative 2004 statutory amendment establishing section 6A residency conditions for children of certain non-nationals.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "recent_change",
        review_priority: 2
      }
    },
    {
      name: "Germany",
      iso2: "DE",
      iso3: "DEU",
      type: "conditional",
      region: "Europe",
      flag: "🇩🇪",
      summary: "Conditional jus soli. A child born in Germany to foreign parents acquires German citizenship at birth if one parent has lived lawfully in Germany for 5 years and holds a permanent right of residence.",
      details: "Germany introduced conditional jus soli in 2000 through the Staatsangehörigkeitsgesetz. Section 4(3) now provides that a child born in Germany to foreign parents acquires German citizenship at birth if one parent has had habitual lawful residence in Germany for 5 years and holds a permanent right of residence or equivalent status. The 2024 nationality reform reduced the residence threshold from 8 years to 5 years and retained Germany's conditional, not unrestricted, model.",
      law_reference: "Staatsangehörigkeitsgesetz (StAG) § 4(3); 2024 nationality modernization reform",
      recent_changes: [
        { year: 2000, event: "First conditional jus soli introduced: parent with 8+ years lawful legal residence grants child citizenship" },
        { year: 2024, event: "Act to Modernize Nationality Law: reduces parental residency from 8 to 5 years; allows dual citizenship — a significant liberalization bucking global trends" }
      ],
      risk_level: "low",
      notable: true,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "primary",
        source_urls: [
          "https://www.gesetze-im-internet.de/stag/__4.html",
          "https://www.bundesregierung.de/breg-de/bundesregierung/bundeskanzleramt/kabinett-einbuergerung-2350620"
        ],
        verification_notes: "Verified against StAG section 4 and official federal government summary of the 2024/2025 reform sequence. Classification remains conditional.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "recent_change",
        review_priority: 2
      }
    },
    {
      name: "France",
      iso2: "FR",
      iso3: "FRA",
      type: "conditional",
      region: "Europe",
      flag: "🇫🇷",
      summary: "Conditional jus soli. A child born in France to foreign parents becomes French automatically at 18 only if residence conditions are met; earlier acquisition is possible by declaration, and double jus soli still applies at birth where a parent was also born in France.",
      details: "France does not provide unrestricted birthright citizenship. Official government guidance states that a child born in France to foreign parents typically acquires French nationality at age 18 if they reside in France at that age and have lived there for at least 5 years since age 11. A declaration route is available earlier, from age 13 or 16 depending on residence history. France also preserves double jus soli: if a parent was also born in France, the child is French from birth. Separate rules now apply in Mayotte.",
      law_reference: "French Civil Code nationality provisions; Service-Public guidance on nationality of children born in France to foreign parents",
      recent_changes: [
        { year: 1993, event: "Pasqua Laws restrict previous more-automatic jus soli provisions" },
        { year: 2025, event: "Law restricts jus soli in Mayotte: both foreign parents must have been legally resident for 1+ year before birth" }
      ],
      risk_level: "medium",
      notable: true,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.service-public.fr/particuliers/vosdroits/F34708/0_0?lang=en"
        ],
        verification_notes: "Verified against official French government legal guidance. France remains a conditional jus soli system with double jus soli and age-based residence pathways.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "recent_change",
        review_priority: 2
      }
    },
    {
      name: "Belgium",
      iso2: "BE",
      iso3: "BEL",
      type: "conditional",
      region: "Europe",
      flag: "🇧🇪",
      summary: "Double jus soli: automatic citizenship if at least one parent was also born in Belgium. Otherwise, 10 years of parental legal residence required.",
      details: "Belgium uses a double jus soli system. Children born in Belgium to parents who were also born in Belgium receive automatic citizenship. For other children born in Belgium, at least one parent must have legally resided in Belgium for 10 years before the birth.",
      law_reference: "Belgian Nationality Code",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.europarl.europa.eu/RegData/etudes/BRIE/2025/769502/EPRS_BRI(2025)769502_EN.pdf",
          "https://globalcit.eu"
        ],
        verification_notes: "Double jus soli rule confirmed by EU Parliament research brief on citizenship acquisition in EU member states. Classification as conditional is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Netherlands",
      iso2: "NL",
      iso3: "NLD",
      type: "conditional",
      region: "Europe",
      flag: "🇳🇱",
      summary: "Double jus soli: child born in the Netherlands to a parent with permanent residency acquires citizenship.",
      details: "Netherlands grants citizenship by birth if at least one parent holds permanent residency (and was residing there at time of birth). First-generation migrants' children born in the Netherlands are not automatic citizens unless the parental permanent residency condition is met.",
      law_reference: "Dutch Nationality Act (Rijkswet op het Nederlanderschap)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.europarl.europa.eu/RegData/etudes/BRIE/2025/769502/EPRS_BRI(2025)769502_EN.pdf",
          "https://globalcit.eu"
        ],
        verification_notes: "Parental permanent residency requirement confirmed by EU Parliament research brief. Classification as conditional is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Spain",
      iso2: "ES",
      iso3: "ESP",
      type: "conditional",
      region: "Europe",
      flag: "🇪🇸",
      summary: "Double jus soli: automatic if at least one parent was born in Spain. Otherwise, children born in Spain to legal resident parents may acquire citizenship after 1 year with required renunciation of other citizenship.",
      details: "Spain uses a combination of double jus soli and residency-based acquisition. Children born in Spain to parents who were also born in Spain are automatic citizens. Other children born in Spain can acquire citizenship after 1 year of residence but must renounce any other citizenship acquired at birth.",
      law_reference: "Spanish Civil Code, Articles 17-22",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.europarl.europa.eu/RegData/etudes/BRIE/2025/769502/EPRS_BRI(2025)769502_EN.pdf",
          "https://globalcit.eu"
        ],
        verification_notes: "Double jus soli + 1-year residency pathway confirmed by EU Parliament research brief. Classification as conditional is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Portugal",
      iso2: "PT",
      iso3: "PRT",
      type: "conditional",
      region: "Europe",
      flag: "🇵🇹",
      summary: "Conditional jus soli under Law 2/2020. Child born in Portugal is a citizen if: (a) one parent holds a residence permit (no minimum duration); or (b) one parent has de facto residence of 1+ year regardless of legal status; or (c) one parent was themselves born in Portugal (double jus soli). Statelessness safeguard also applies.",
      details: "Law 2/2020, in force from November 2020, significantly liberalized Portugal's nationality law. Under the current rules, a child born in Portugal acquires Portuguese nationality automatically if at least one parent holds a Portuguese residence permit at the time of birth (no minimum residency period required when a permit exists). Even without a formal permit, if a parent has de facto resided in Portugal for at least one year, the child also qualifies. The double jus soli rule gives automatic citizenship if one parent was born in Portugal. A statelessness safeguard applies where a child born in Portugal would otherwise be stateless. Further amendments proposed in 2025 were struck down by the Constitutional Court, leaving Law 2/2020 as the operative text.",
      law_reference: "Portuguese Nationality Act (Law 37/81 as amended by Law 2/2020)",
      recent_changes: [
        { year: 2020, event: "Law 2/2020: parental residency requirement reduced from 5 years to 1 year; residence permit holders now qualify with no minimum duration" },
        { year: 2025, event: "Proposed further amendments struck down by Constitutional Court; Law 2/2020 remains operative" }
      ],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://globalcit.eu/the-2020-amendments-to-the-portuguese-nationality-act-a-big-step-further-towards-pure-ius-soli-and-some-more-inclusive-measures/",
          "https://index.statelessness.eu/news/changes-portuguese-nationality-act-come-force",
          "https://iaservices.pt/en/news-insights/2025/10/29/portugals-approved-changes-to-the-nationality-law-what-they-mean-for-foreign-residents"
        ],
        verification_notes: "Verified against GlobalCit academic analysis of Law 2/2020 and Statelessness Index confirmation of entry into force. The 2025 proposed amendments were struck down by the Constitutional Court, confirming Law 2/2020 as the operative text. Classification as conditional is correct under the rubric.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "recent_change",
        review_priority: 2
      }
    },
    {
      name: "Luxembourg",
      iso2: "LU",
      iso3: "LUX",
      type: "conditional",
      region: "Europe",
      flag: "🇱🇺",
      summary: "Double jus soli: automatic if at least one parent was born in Luxembourg. Otherwise, child can apply from age 12 with 5 years uninterrupted residence.",
      details: "Luxembourg uses a double jus soli system. Automatic citizenship at birth if at least one parent was born in Luxembourg. Otherwise, children born in Luxembourg can apply from age 12, provided they have 5 years of uninterrupted residence and a parent also lived in Luxembourg for 12 months before the birth.",
      law_reference: "Luxembourg Nationality Act",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.europarl.europa.eu/RegData/etudes/BRIE/2025/769502/EPRS_BRI(2025)769502_EN.pdf",
          "https://globalcit.eu"
        ],
        verification_notes: "Double jus soli rule confirmed by EU Parliament research brief. Classification as conditional is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Greece",
      iso2: "GR",
      iso3: "GRC",
      type: "conditional",
      region: "Europe",
      flag: "🇬🇷",
      summary: "Two pathways: one parent is Greek; or both parents are legal residents AND child completes 6 years of schooling in Greece. 5+ year parental permanent residency required.",
      details: "Greece provides citizenship through birth in Greece if both parents are legal permanent residents (5+ years) and the child completes at least 6 years of Greek education. Alternatively, citizenship through descent if one parent is Greek. An extended Greek diaspora means jus sanguinis remains the primary path.",
      law_reference: "Greek Citizenship Code",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.europarl.europa.eu/RegData/etudes/BRIE/2025/769502/EPRS_BRI(2025)769502_EN.pdf",
          "https://globalcit.eu"
        ],
        verification_notes: "Conditional jus soli (schooling + 5-year residency) confirmed by EU Parliament research brief. Classification as conditional is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Sweden",
      iso2: "SE",
      iso3: "SWE",
      type: "conditional",
      region: "Europe",
      flag: "🇸🇪",
      summary: "Statelessness safeguard: citizenship by simple declaration for stateless children born in Sweden.",
      details: "Sweden's jus soli is primarily a statelessness safeguard. Stateless children born in Sweden can acquire citizenship by declaration. For all other children, citizenship follows jus sanguinis.",
      law_reference: "Swedish Citizenship Act (2001:82)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.europarl.europa.eu/RegData/etudes/BRIE/2025/769502/EPRS_BRI(2025)769502_EN.pdf",
          "https://www.statelessness.eu/updates/blog/how-far-do-citizenship-laws-european-union-member-states-safeguard-children-born-there"
        ],
        verification_notes: "Statelessness safeguard confirmed by EU Parliament research brief and European Network on Statelessness analysis. Classification as conditional is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Finland",
      iso2: "FI",
      iso3: "FIN",
      type: "conditional",
      region: "Europe",
      flag: "🇫🇮",
      summary: "Statelessness safeguard: automatically granted to children born in Finland who would otherwise be stateless.",
      details: "Finland grants citizenship by birth to stateless children born on Finnish territory. For all other children born in Finland to foreign parents, citizenship follows jus sanguinis.",
      law_reference: "Finnish Nationality Act (359/2003)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.europarl.europa.eu/RegData/etudes/BRIE/2025/769502/EPRS_BRI(2025)769502_EN.pdf",
          "https://www.statelessness.eu/updates/blog/how-far-do-citizenship-laws-european-union-member-states-safeguard-children-born-there"
        ],
        verification_notes: "Statelessness safeguard confirmed by EU Parliament research brief and European Network on Statelessness analysis. Classification as conditional is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Italy",
      iso2: "IT",
      iso3: "ITA",
      type: "conditional",
      region: "Europe",
      flag: "🇮🇹",
      summary: "Very limited conditional jus soli. Children born in Italy to foreign parents are not citizens at birth. Statelessness safeguard applies at birth. Children who have resided legally in Italy for 10 continuous years may apply for citizenship upon turning 18. Jus scholae (school-based citizenship) has been debated but never passed.",
      details: "Italy's citizenship law (Law 91/1992) provides no automatic birthright citizenship to children of foreign parents. At birth, only the statelessness safeguard applies. Children born in Italy and who have continuously and legally resided there for the first 18 years of life may apply for Italian citizenship upon turning 18 (within one year). This age-18 opt-in pathway, combined with the statelessness safeguard, keeps Italy in the 'conditional' bucket under this project's rubric — territorial birth is a relevant condition, but citizenship is not automatic. Law 74/2025 (in force May 2025) restricts jus sanguinis claims by descent to those with a parent or grandparent born in Italy, ending the previous practice of claiming through unlimited ancestral generations. This reform does not affect the territorial jus soli rules.",
      law_reference: "Italian Citizenship Act (Law 91/1992); Law 74/2025",
      recent_changes: [
        { year: 2025, event: "Law 74/2025 (in force May 2025): restricts jus sanguinis by descent to parent/grandparent born in Italy; does not change jus soli rules" }
      ],
      risk_level: "medium",
      notable: true,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://tramiteitalia.com/en/blog/new-law-on-italian-citizenship",
          "https://consadelaide.esteri.it/en/news/dal_consolato/2025/06/reform-of-citizenship-iure-sanguinis/",
          "https://www.esteri.it/en/servizi-consolari-e-visti/italiani-all-estero/cittadinanza/"
        ],
        verification_notes: "Law 91/1992 jus soli rules (statelessness safeguard + age-18 opt-in after 10 years residence) confirmed unchanged by Law 74/2025. Law 74/2025 is confirmed in force from May 2025 and applies only to jus sanguinis by descent. Classification as conditional is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "recent_change",
        review_priority: 2
      }
    },
    {
      name: "Austria",
      iso2: "AT",
      iso3: "AUT",
      type: "sanguinis_only",
      region: "Europe",
      flag: "🇦🇹",
      summary: "Pure jus sanguinis. No birthright citizenship.",
      details: "Austria follows a purely jus sanguinis model. Being born in Austria confers no automatic citizenship unless a parent is Austrian.",
      law_reference: "Austrian Citizenship Act (Staatsbürgerschaftsgesetz 1985, as amended)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.europarl.europa.eu/RegData/etudes/BRIE/2025/769502/EPRS_BRI(2025)769502_EN.pdf",
          "https://globalcit.eu/national-citizenship-laws/austria/"
        ],
        verification_notes: "Pure jus sanguinis confirmed by EPRS EU Parliament 2025 brief and GlobalCit country profile. No jus soli provision.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "sanguinis_only",
        review_priority: 6
      }
    },
    {
      name: "Switzerland",
      iso2: "CH",
      iso3: "CHE",
      type: "sanguinis_only",
      region: "Europe",
      flag: "🇨🇭",
      summary: "Pure jus sanguinis. No birthright citizenship. Citizenship is also linked to cantonal and municipal citizenship.",
      details: "Switzerland follows a purely jus sanguinis model. Citizenship is acquired through a Swiss parent and is also tied to cantonal and municipal citizenship — a distinctive three-tier system not found elsewhere.",
      law_reference: "Swiss Citizenship Act (BüG, SR 141.0, 2014 consolidation)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.europarl.europa.eu/RegData/etudes/BRIE/2025/769502/EPRS_BRI(2025)769502_EN.pdf",
          "https://globalcit.eu/national-citizenship-laws/switzerland/"
        ],
        verification_notes: "Pure jus sanguinis confirmed by EPRS EU Parliament 2025 brief and GlobalCit country profile. Three-tier citizenship (federal/cantonal/municipal) is established fact.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "sanguinis_only",
        review_priority: 6
      }
    },
    {
      name: "Norway",
      iso2: "NO",
      iso3: "NOR",
      type: "sanguinis_only",
      region: "Europe",
      flag: "🇳🇴",
      summary: "Pure jus sanguinis. No birthright citizenship.",
      details: "Norway follows a purely jus sanguinis model under the Citizenship Act 2005. Birth in Norway without a Norwegian parent confers no citizenship.",
      law_reference: "Norwegian Citizenship Act (Statsborgerloven, 2005)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.europarl.europa.eu/RegData/etudes/BRIE/2025/769502/EPRS_BRI(2025)769502_EN.pdf",
          "https://globalcit.eu/national-citizenship-laws/norway/"
        ],
        verification_notes: "Pure jus sanguinis confirmed by EPRS EU Parliament 2025 brief and GlobalCit country profile.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "sanguinis_only",
        review_priority: 6
      }
    },
    {
      name: "Denmark",
      iso2: "DK",
      iso3: "DNK",
      type: "sanguinis_only",
      region: "Europe",
      flag: "🇩🇰",
      summary: "Pure jus sanguinis. No birthright citizenship.",
      details: "Denmark follows a purely jus sanguinis model. Birth in Denmark without a Danish parent confers no citizenship.",
      law_reference: "Danish Nationality Act (Indfødsretsloven)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.europarl.europa.eu/RegData/etudes/BRIE/2025/769502/EPRS_BRI(2025)769502_EN.pdf",
          "https://globalcit.eu/national-citizenship-laws/denmark/"
        ],
        verification_notes: "Pure jus sanguinis confirmed by EPRS EU Parliament 2025 brief and GlobalCit country profile.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "sanguinis_only",
        review_priority: 6
      }
    },
    {
      name: "Poland",
      iso2: "PL",
      iso3: "POL",
      type: "sanguinis_only",
      region: "Europe",
      flag: "🇵🇱",
      summary: "Pure jus sanguinis. No birthright citizenship.",
      details: "Poland follows a purely jus sanguinis model under the 2009 Citizenship Act. Birth in Poland without a Polish parent confers no citizenship.",
      law_reference: "Polish Citizenship Act (Act of 2 April 2009 on Polish Citizenship)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.europarl.europa.eu/RegData/etudes/BRIE/2025/769502/EPRS_BRI(2025)769502_EN.pdf",
          "https://globalcit.eu/national-citizenship-laws/poland/"
        ],
        verification_notes: "Pure jus sanguinis confirmed by EPRS EU Parliament 2025 brief and GlobalCit country profile.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "sanguinis_only",
        review_priority: 6
      }
    },
    {
      name: "Czech Republic",
      iso2: "CZ",
      iso3: "CZE",
      type: "sanguinis_only",
      region: "Europe",
      flag: "🇨🇿",
      summary: "Pure jus sanguinis. No birthright citizenship.",
      details: "Czech Republic follows a purely jus sanguinis model under Act No. 186/2013. Birth in the Czech Republic without a Czech parent confers no citizenship.",
      law_reference: "Czech Citizenship Act (Act No. 186/2013 on Czech Nationality)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.europarl.europa.eu/RegData/etudes/BRIE/2025/769502/EPRS_BRI(2025)769502_EN.pdf",
          "https://globalcit.eu/national-citizenship-laws/czechia/"
        ],
        verification_notes: "Pure jus sanguinis confirmed by EPRS EU Parliament 2025 brief and GlobalCit country profile.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "sanguinis_only",
        review_priority: 6
      }
    },
    {
      name: "Hungary",
      iso2: "HU",
      iso3: "HUN",
      type: "sanguinis_only",
      region: "Europe",
      flag: "🇭🇺",
      summary: "Pure jus sanguinis. No birthright citizenship.",
      details: "Hungary follows a purely jus sanguinis model. Birth in Hungary without a Hungarian parent confers no citizenship. Hungary notably grants citizenship to ethnic Hungarians abroad under a simplified naturalization procedure, but this does not affect the territorial birth rule.",
      law_reference: "Hungarian Citizenship Act (Act LV of 1993 on Hungarian Citizenship)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.europarl.europa.eu/RegData/etudes/BRIE/2025/769502/EPRS_BRI(2025)769502_EN.pdf",
          "https://globalcit.eu/national-citizenship-laws/hungary/"
        ],
        verification_notes: "Pure jus sanguinis confirmed by EPRS EU Parliament 2025 brief and GlobalCit country profile. Simplified naturalization for ethnic Hungarians abroad is not a jus soli provision.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "sanguinis_only",
        review_priority: 6
      }
    },
    {
      name: "Russia",
      iso2: "RU",
      iso3: "RUS",
      type: "sanguinis_only",
      region: "Europe/Asia",
      flag: "🇷🇺",
      summary: "Primarily jus sanguinis. Limited anti-statelessness provision for foundlings born in Russia.",
      details: "Russia follows a primarily jus sanguinis model under Federal Law No. 62-FZ (2002). A limited anti-statelessness provision applies to foundlings (children of unknown parentage found in Russia who are presumed to be citizens absent evidence to the contrary), but standard territorial births to foreign parents do not confer citizenship.",
      law_reference: "Federal Law on Citizenship of the Russian Federation (No. 62-FZ of 2002)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://globalcit.eu/national-citizenship-laws/russia/",
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship"
        ],
        verification_notes: "Primarily jus sanguinis with foundling provision confirmed by GlobalCit country profile and secondary sources. Foundling provision is anti-statelessness safeguard, not genuine jus soli — sanguinis_only classification is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "sanguinis_only",
        review_priority: 6
      }
    },
    {
      name: "Ukraine",
      iso2: "UA",
      iso3: "UKR",
      type: "conditional",
      region: "Europe",
      flag: "🇺🇦",
      summary: "Limited conditional jus soli — statelessness safeguard only. Primarily jus sanguinis.",
      details: "Ukraine's Law on Citizenship (2001) provides citizenship by birth in Ukraine mainly as an anti-statelessness mechanism. Children born in Ukraine to foreign parents with a known foreign nationality do not automatically receive Ukrainian citizenship; citizenship follows jus sanguinis.",
      law_reference: "Law of Ukraine on Citizenship (2001)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://globalcit.eu",
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship"
        ],
        verification_notes: "Statelessness-safeguard-only conditional rule confirmed by multiple secondary sources. Classification as conditional is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Latvia",
      iso2: "LV",
      iso3: "LVA",
      type: "conditional",
      region: "Europe",
      flag: "🇱🇻",
      summary: "Conditional jus soli — significant 2020 reform. Since January 1, 2020: automatic citizenship at birth for children born in Latvia to stateless parents, non-citizens, or one stateless/non-citizen parent. The large Russian-minority 'non-citizen' population means many births in Latvia now produce automatic citizenship.",
      details: "Latvia's 1994 Citizenship Law was substantially amended in 2020. Before 2020, Latvia had very limited jus soli. The 2020 reform introduced automatic citizenship at birth for children born in Latvia when: (a) both parents are stateless, (b) both parents are Latvian non-citizens, (c) one parent is a non-citizen and the other is stateless, or (d) one parent is a non-citizen and the other is a foreign citizen. This directly addressed the issue of Latvia's large Russian-minority 'non-citizen' community (descendants of Soviet-era settlers who were not granted citizenship at independence). Latvia thus shifted to a more expansive conditional jus soli system in 2020.",
      law_reference: "Law on Citizenship of Latvia (1994, as amended 2020)",
      recent_changes: [
        { year: 2020, event: "Amendment introduces automatic citizenship at birth for children of non-citizens and stateless parents, effective January 1, 2020" }
      ],
      risk_level: "low",
      notable: true,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.europarl.europa.eu/RegData/etudes/BRIE/2025/769502/EPRS_BRI(2025)769502_EN.pdf",
          "https://globalcit.eu"
        ],
        verification_notes: "2020 reform confirmed by EU Parliament research brief. The reform gave automatic citizenship at birth to children of non-citizens and stateless persons. Classification as conditional is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Cyprus",
      iso2: "CY",
      iso3: "CYP",
      type: "conditional",
      region: "Europe",
      flag: "🇨🇾",
      summary: "Primarily jus sanguinis. The current data asserts a statelessness safeguard exists, but a search source states Cyprus has no provision for stateless children born in the country. Classification and details need primary-source confirmation.",
      details: "Cyprus citizenship is primarily jus sanguinis under Cap. 341. Secondary sources disagree on whether Cyprus maintains a statelessness safeguard for children born in Cyprus to stateless parents. One source (European Network on Statelessness) indicates Cyprus has no such provision, while the current dataset entry assumes it does. A review of the Cyprus Citizenship Law (Cap. 341) primary text is needed.",
      law_reference: "Cyprus Citizenship Law (Cap. 341)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "in_review",
        confidence: "low",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.statelessness.eu/updates/blog/how-far-do-citizenship-laws-european-union-member-states-safeguard-children-born-there"
        ],
        verification_notes: "Conflicting secondary sources: the European Network on Statelessness says Cyprus has no provision for stateless children born in the country, contradicting the current dataset entry's 'statelessness safeguard' claim. This could mean Cyprus should be reclassified as sanguinis_only.",
        requires_human_review: true,
        human_review_reason: "Read Cyprus Citizenship Law (Cap. 341) primary text to determine: (a) whether any jus soli or statelessness safeguard exists, (b) whether the correct type is conditional or sanguinis_only.",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Malta",
      iso2: "MT",
      iso3: "MLT",
      type: "conditional",
      region: "Europe",
      flag: "🇲🇹",
      summary: "Conditional: child born in Malta acquires citizenship if at least one parent is Maltese. Also: anyone born in Malta before August 1, 1989 acquired citizenship unconditionally (pre-1989 unrestricted jus soli).",
      details: "Malta's Citizenship Act provides citizenship by birth in Malta if at least one parent is Maltese. Under the pre-1989 rules, anyone born in Malta had automatic citizenship regardless of parental status. Post-1989 births require at least one Maltese parent, making Malta a conditional jus soli system for current births.",
      law_reference: "Maltese Citizenship Act",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.europarl.europa.eu/RegData/etudes/BRIE/2025/769502/EPRS_BRI(2025)769502_EN.pdf",
          "https://globalcit.eu"
        ],
        verification_notes: "Parental Maltese citizenship requirement confirmed by secondary sources. Pre-1989 unconditional jus soli is a historical note. Classification as conditional is correct for current births.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "conditional",
        review_priority: 5
      }
    },

    // ── ASIA ──
    {
      name: "Pakistan",
      iso2: "PK",
      iso3: "PAK",
      type: "transitional",
      region: "South Asia",
      flag: "🇵🇰",
      summary: "TRANSITIONAL: Had unrestricted jus soli since 1951. National Assembly passed a bill on November 11, 2024 ending birthright citizenship, requiring at least one parent to be a citizen/permanent resident. Implementation ongoing.",
      details: "Pakistan's Citizenship Act of 1951 established unrestricted jus soli. On November 11, 2024, the National Assembly passed a bill ending this tradition, requiring at least one parent to be a Pakistani citizen or permanent resident — or the child to reside in Pakistan for 10 years — to qualify for citizenship. The law is primarily aimed at the estimated 3-4 million Afghan refugees in Pakistan, many of whom had children born in Pakistan with Pakistani citizenship. Critics warn it will generate mass statelessness among children who have no connection to Afghanistan. Full constitutional implementation is ongoing as of April 2026.",
      law_reference: "Pakistan Citizenship Act 1951; Amendment Bill November 2024",
      recent_changes: [
        { year: 1951, event: "Pakistan Citizenship Act 1951 establishes unrestricted jus soli" },
        { year: 2024, event: "National Assembly passes bill ending unrestricted jus soli (November 11, 2024). Requires at least one parent to be a citizen/permanent resident." }
      ],
      risk_level: "high",
      notable: true,
      verification: {
        verification_status: "in_review",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://pakistancode.gov.pk/english/LGu0xBD?action=inactive&page=1&year=1951",
          "https://pakistancode.gov.pk/pdffiles/administratora2b6f3407a109a491d47d649f6ff0c01.pdf",
          "https://www.pakistantoday.com.pk/2024/11/11/na-committee-passes-bill-to-restrict-citizenship-for-children-of-foreigners"
        ],
        verification_notes: "The National Assembly passed the amendment bill on November 11, 2024. It is unclear from available sources whether the bill received Senate passage and presidential assent to become enacted law, or whether implementation is fully in force. Pakistan Code (official legal database) still displays the 1951 Act. News reporting describes the bill's NA passage but does not confirm full enactment. Classification remains transitional pending confirmation.",
        requires_human_review: true,
        human_review_reason: "Confirm whether the November 2024 amendment received Senate passage, presidential assent, and gazette notification to become enacted law in force. If fully enacted, reclassify from transitional to conditional (requires one citizen/permanent-resident parent). If only NA-passed but not yet enacted, keep as transitional.",
        review_bucket: "transitional",
        review_priority: 1
      }
    },
    {
      name: "India",
      iso2: "IN",
      iso3: "IND",
      type: "conditional",
      region: "South Asia",
      flag: "🇮🇳",
      summary: "Conditional and heavily restricted. For births after 3 December 2004, a child born in India is a citizen only if both parents are citizens, or one parent is a citizen and the other is not an illegal migrant.",
      details: "Section 3 of the Citizenship Act 1955 creates three periods for citizenship by birth. India originally followed a broad jus soli rule, but the 1986 amendment required at least one Indian parent for births from 1 July 1987 onward. The 2003 amendment imposed the current stricter rule for births after 3 December 2004: one parent must be an Indian citizen and the other must not be an illegal migrant, or both parents must be citizens. India therefore remains a conditional, not unrestricted, jus soli system.",
      law_reference: "Citizenship Act 1955, section 3, as amended in 1986 and 2003",
      recent_changes: [
        { year: 1987, event: "First restriction: amended to require at least one Indian parent" },
        { year: 2003, event: "Further restriction: requires both parents to be Indian citizens, or one citizen + the other not an illegal migrant" }
      ],
      risk_level: "low",
      notable: true,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "primary",
        source_urls: [
          "https://www.indiacode.nic.in/handle/123456789/18545?view_type=browse"
        ],
        verification_notes: "Verified against section 3 of the Citizenship Act 1955 as maintained on India Code. Classification remains conditional.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "recent_change",
        review_priority: 2
      }
    },
    {
      name: "Bangladesh",
      iso2: "BD",
      iso3: "BGD",
      type: "sanguinis_only",
      region: "South Asia",
      flag: "🇧🇩",
      summary: "Pure jus sanguinis. No birthright citizenship.",
      details: "Bangladesh follows a purely jus sanguinis model. Citizenship is acquired through a Bangladeshi parent. The Bangladesh Citizenship (Temporary Provisions) Order 1972 and Citizenship Act 1951 (as adapted) govern acquisition primarily through paternal descent.",
      law_reference: "Bangladesh Citizenship (Temporary Provisions) Order, 1972 (P.O. 149); Bangladesh Citizenship Act 1951 (as adapted)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://globalcit.eu/national-citizenship-laws/bangladesh/",
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship"
        ],
        verification_notes: "Pure jus sanguinis confirmed by GlobalCit country profile and secondary sources. No jus soli provision.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "sanguinis_only",
        review_priority: 6
      }
    },
    {
      name: "Japan",
      iso2: "JP",
      iso3: "JPN",
      type: "conditional",
      region: "East Asia",
      flag: "🇯🇵",
      summary: "Primarily jus sanguinis. Very limited jus soli: stateless children of unknown parentage found in Japan may obtain citizenship.",
      details: "Japan follows a predominantly jus sanguinis system. The Nationality Act does contain a very limited provision for foundlings (stateless children of unknown parentage found in Japan), but this is not a genuine jus soli provision. Japan has very low naturalization rates and has been criticized for making citizenship acquisition difficult even for long-term residents.",
      law_reference: "Japanese Nationality Act (1950, as amended)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://globalcit.eu"
        ],
        verification_notes: "Foundling/stateless-safeguard-only rule confirmed by secondary sources. Classification as conditional is correct (territorial birth can matter for foundlings, making it not pure sanguinis_only).",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "South Korea",
      iso2: "KR",
      iso3: "KOR",
      type: "sanguinis_only",
      region: "East Asia",
      flag: "🇰🇷",
      summary: "Pure jus sanguinis. No birthright citizenship.",
      details: "South Korea follows a purely jus sanguinis model under the Nationality Act (1948, revised 1997 and later). Birth in South Korea without a Korean parent confers no citizenship.",
      law_reference: "Korean Nationality Act (1948, as amended; 1997 revision introduced gender-equal transmission)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://globalcit.eu/national-citizenship-laws/korea-rep/",
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship"
        ],
        verification_notes: "Pure jus sanguinis confirmed by GlobalCit country profile and secondary sources. 1997 revision introduced maternal transmission; no jus soli provision added.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "sanguinis_only",
        review_priority: 6
      }
    },
    {
      name: "China",
      iso2: "CN",
      iso3: "CHN",
      type: "conditional",
      region: "East Asia",
      flag: "🇨🇳",
      summary: "Primarily jus sanguinis with very limited jus soli. Stateless children born in China of unknown parentage may obtain citizenship.",
      details: "China is primarily a jus sanguinis country. The Nationality Law of 1980 grants citizenship based on parental nationality. A very limited provision applies to stateless children of unknown parentage born in China.",
      law_reference: "Nationality Law of the People's Republic of China (1980)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://globalcit.eu"
        ],
        verification_notes: "Foundling/unknown-parentage provision confirmed by secondary sources alongside the primary jus sanguinis rule. Classification as conditional is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Australia",
      iso2: "AU",
      iso3: "AUS",
      type: "conditional",
      region: "Oceania",
      flag: "🇦🇺",
      summary: "Conditional since 20 August 1986. A child born in Australia is a citizen at birth only if at least one parent is an Australian citizen or permanent resident.",
      details: "Australia no longer grants unrestricted birthright citizenship. Under section 12 of the Australian Citizenship Act, a child born in Australia is an Australian citizen at birth if at least one parent is an Australian citizen or permanent resident at the time of the birth. Children who do not qualify at birth may instead become citizens automatically after 10 years of ordinary residence in Australia.",
      law_reference: "Australian Citizenship Act 2007, section 12; Australian Citizenship Amendment Act 1986",
      recent_changes: [
        { year: 1986, event: "Australian Citizenship Amendment Act ends unconditional jus soli. Now requires at least one citizen/permanent resident parent." }
      ],
      risk_level: "low",
      notable: true,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "primary",
        source_urls: [
          "https://www.legislation.gov.au/Details/C2013C00008"
        ],
        verification_notes: "Verified against section 12 of the Australian Citizenship Act. Classification remains conditional rather than unrestricted.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "recent_change",
        review_priority: 2
      }
    },
    {
      name: "New Zealand",
      iso2: "NZ",
      iso3: "NZL",
      type: "conditional",
      region: "Oceania",
      flag: "🇳🇿",
      summary: "Conditional since 1 January 2006. A child born in New Zealand is a citizen at birth only if a parent is a New Zealand citizen or holds an indefinite residence visa.",
      details: "The Citizenship Act 1977 now distinguishes between births before and after 1 January 2006. A person born in New Zealand before that date is generally a citizen by birth. For births on or after 1 January 2006, at least one parent must be a New Zealand citizen or hold a visa allowing indefinite residence. This makes New Zealand a clear conditional jus soli system rather than an unrestricted one.",
      law_reference: "Citizenship Act 1977, section 6; New Zealand government citizenship guidance",
      recent_changes: [
        { year: 2006, event: "Citizenship Act 2005 ends unrestricted jus soli. Now requires at least one citizen/permanent resident parent." }
      ],
      risk_level: "low",
      notable: true,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "primary",
        source_urls: [
          "https://www.legislation.govt.nz/act/public/1977/0061/49.0/DLM443839.html",
          "https://www.govt.nz/browse/passports-citizenship-and-identity/nz-citizenship/types-of-citizenship-grant-birth-and-descent/"
        ],
        verification_notes: "Verified against section 6 of the Citizenship Act and current government guidance distinguishing births before and after 1 January 2006.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "recent_change",
        review_priority: 2
      }
    },
    {
      name: "Fiji",
      iso2: "FJ",
      iso3: "FJI",
      type: "unrestricted",
      region: "Pacific",
      flag: "🇫🇯",
      summary: "Unrestricted birthright citizenship under the Fiji Citizenship Decree. Multiple sources confirm jus soli in force.",
      details: "Fiji grants citizenship to all persons born on Fijian territory. Fiji's citizenship law has a complex history given past political upheavals (coups in 1987, 2000, 2006), but current law maintains territorial birthright citizenship.",
      law_reference: "Fiji Citizenship Decree",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://citizensinternational.com/75-countries-with-birthright-citizenship/"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources. Law_reference 'Fiji Citizenship Decree' should be confirmed against the exact current decree name; the 2013 Constitution may also be relevant. Classification as unrestricted is consistent across sources.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Tuvalu",
      iso2: "TV",
      iso3: "TUV",
      type: "unrestricted",
      region: "Pacific",
      flag: "🇹🇻",
      summary: "Unrestricted birthright citizenship under the Tuvalu Citizenship Act.",
      details: "Tuvalu grants citizenship to all persons born on Tuvaluan territory regardless of parental status.",
      law_reference: "Tuvalu Citizenship Act",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.aljazeera.com/news/2025/2/6/which-countries-other-than-the-us-offer-birthright-citizenship"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Malaysia",
      iso2: "MY",
      iso3: "MYS",
      type: "conditional",
      region: "Southeast Asia",
      flag: "🇲🇾",
      summary: "Conditional: at least one parent must be a citizen or permanent resident. Foundling and statelessness provisions also apply.",
      details: "Malaysia grants citizenship by birth if at least one parent is a citizen or permanent resident. The Constitution also contains foundling provisions and statelessness safeguards.",
      law_reference: "Constitution of Malaysia, Second Schedule",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://globalcit.eu"
        ],
        verification_notes: "Parental citizen/PR requirement confirmed by secondary sources consistent with the constitutional reference. Classification as conditional is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Indonesia",
      iso2: "ID",
      iso3: "IDN",
      type: "conditional",
      region: "Southeast Asia",
      flag: "🇮🇩",
      summary: "Conditional: at least one parent must be an Indonesian citizen.",
      details: "Indonesia grants citizenship by birth if at least one parent is an Indonesian citizen under Law No. 12 of 2006, which replaced the previous, gender-discriminatory law that required paternal citizenship.",
      law_reference: "Law No. 12 of 2006 on Citizenship",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://globalcit.eu"
        ],
        verification_notes: "Parental citizen requirement confirmed by secondary sources. Classification as conditional is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Thailand",
      iso2: "TH",
      iso3: "THA",
      type: "conditional",
      region: "Southeast Asia",
      flag: "🇹🇭",
      summary: "Conditional: citizenship by birth requires at least one Thai parent. Stateless hill-tribe people born in Thailand for generations face significant barriers. The '5-year parental residence' description in prior notes is likely imprecise.",
      details: "Thailand's Nationality Act (1965, as amended) primarily bases citizenship on parental nationality (jus sanguinis). The law also contains provisions for stateless persons and hill-tribe people born in Thailand, but these pathways are heavily restricted in practice. The widely cited '5-year parental residence' rule appears to be an oversimplification; the operative requirement is principally that at least one parent be a Thai citizen. The large stateless hill-tribe population (Akha, Hmong, Karen, etc.) reflects the gap between statutory provisions and practical access to citizenship.",
      law_reference: "Thai Nationality Act (1965, as amended)",
      recent_changes: [],
      risk_level: "medium",
      notable: true,
      verification: {
        verification_status: "in_review",
        confidence: "low",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship"
        ],
        verification_notes: "The current summary's '5-year parental residence' rule is likely inaccurate. Thailand primarily uses parental citizenship (jus sanguinis), not a residence-based test. The exact statutory condition for territorial birthright citizenship needs primary-source confirmation.",
        requires_human_review: true,
        human_review_reason: "Confirm the actual conditional rule in the Thai Nationality Act as amended. Remove the '5-year parental residence' description if it is inaccurate and replace with the correct statutory condition.",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Cambodia",
      iso2: "KH",
      iso3: "KHM",
      type: "conditional",
      region: "Southeast Asia",
      flag: "🇰🇭",
      summary: "Conditional: at least one parent must be a Khmer citizen.",
      details: "Cambodia grants citizenship by birth if at least one parent is a Khmer citizen under the Cambodian Nationality Law.",
      law_reference: "Cambodian Nationality Law",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://globalcit.eu"
        ],
        verification_notes: "Parental Khmer citizen requirement confirmed by secondary sources. Classification as conditional is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Myanmar",
      iso2: "MM",
      iso3: "MMR",
      type: "sanguinis_only",
      region: "Southeast Asia",
      flag: "🇲🇲",
      summary: "Pure jus sanguinis. The 1982 Citizenship Law excludes the Rohingya from recognized ethnic groups, creating mass statelessness. Approximately 1 million Rohingya are denied any citizenship pathway.",
      details: "Myanmar's 1982 Citizenship Law ties citizenship to membership in one of 135 recognized national ethnic groups. The Rohingya, a Muslim minority, are excluded from this list. This has created a situation described by legal scholars and the American Bar Association as 'statelessness as a tool of genocide.' An estimated 1 million Rohingya have no citizenship and no path to citizenship in Myanmar.",
      law_reference: "Burma Citizenship Law 1982",
      recent_changes: [],
      risk_level: "critical",
      notable: true,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.refworld.org/legal/natlegsl/natauth/1982/en/49268",
          "https://www.unhcr.org/ibelong/wp-content/uploads/Statelessness-in-Myanmar.pdf"
        ],
        verification_notes: "Sanguinis_only (ethnic-group-based) classification confirmed by Refworld text of the 1982 Law and UNHCR statelessness documentation. The Rohingya exclusion is well-documented by UNHCR, ICJ, and international human rights bodies. No jus soli provision exists.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "sanguinis_only",
        review_priority: 6
      }
    },
    {
      name: "Israel",
      iso2: "IL",
      iso3: "ISR",
      type: "conditional",
      region: "Middle East",
      flag: "🇮🇱",
      summary: "Primarily jus sanguinis (Law of Return). Very limited jus soli for stateless children of unknown parentage (foundlings).",
      details: "Israel's citizenship system is primarily based on the Law of Return (1950), which grants immigration rights and citizenship to Jews worldwide. For non-Jews, citizenship follows jus sanguinis principles under the Citizenship Law 1952. Very limited jus soli provisions apply to foundlings (stateless children of unknown parentage born in Israel).",
      law_reference: "Law of Return (1950); Citizenship Law (1952)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://globalcit.eu"
        ],
        verification_notes: "Foundling-only jus soli provision confirmed by secondary sources alongside primary Law of Return/jus sanguinis rule. Classification as conditional is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Jordan",
      iso2: "JO",
      iso3: "JOR",
      type: "sanguinis_only",
      region: "Middle East",
      flag: "🇯🇴",
      summary: "Pure jus sanguinis. No birthright citizenship. Citizenship cannot be passed through mothers.",
      details: "Jordan follows a purely jus sanguinis model under the Jordanian Nationality Law 1954. Citizenship follows the father only; Jordanian women cannot pass citizenship to their children. This creates difficulties for children of Jordanian mothers married to stateless Palestinians and is a documented source of statelessness risk.",
      law_reference: "Jordanian Nationality Law (No. 6 of 1954)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.refworld.org/legal/natlegsl/natauth/1954/en/79346",
          "https://globalcit.eu/national-citizenship-laws/jordan/"
        ],
        verification_notes: "Pure paternal jus sanguinis confirmed by Refworld text of the 1954 Act and GlobalCit country profile. No jus soli provision. Gendered transmission is a documented statelessness risk factor.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "sanguinis_only",
        review_priority: 6
      }
    },
    {
      name: "Saudi Arabia",
      iso2: "SA",
      iso3: "SAU",
      type: "sanguinis_only",
      region: "Middle East",
      flag: "🇸🇦",
      summary: "Pure jus sanguinis. No birthright citizenship. The vast majority of residents are non-citizens with no path to birthright citizenship.",
      details: "Saudi Arabia follows a purely jus sanguinis model under the Saudi Nationality System (Royal Decree M/26 of 1954). With approximately 38% of its population being foreign nationals, Saudi Arabia has one of the world's largest proportions of non-citizen permanent residents. These residents and their descendants have no path to birthright citizenship regardless of how long they have resided in the country.",
      law_reference: "Saudi Nationality System (Royal Decree M/26 of 1954)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.refworld.org/country/SAU",
          "https://globalcit.eu/national-citizenship-laws/saudi-arabia/"
        ],
        verification_notes: "Pure jus sanguinis confirmed by Refworld country page and GlobalCit country profile. No jus soli provision. Large non-citizen resident population has no territorial citizenship pathway.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "sanguinis_only",
        review_priority: 6
      }
    },
    {
      name: "United Arab Emirates",
      iso2: "AE",
      iso3: "ARE",
      type: "sanguinis_only",
      region: "Middle East",
      flag: "🇦🇪",
      summary: "Pure jus sanguinis. No birthright citizenship. Approximately 90% of residents are non-citizen expatriates with no citizenship pathway through birth.",
      details: "The UAE follows a purely jus sanguinis model under Federal Law No. 17 of 1972 on Nationality. With approximately 90% of its population being foreign nationals, the UAE has the world's highest proportion of non-citizen residents. No amount of time spent in the UAE, including being born there, confers citizenship rights.",
      law_reference: "Federal Law No. 17 of 1972 on Nationality and its Passports (UAE)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.refworld.org/legal/natlegsl/natauth/1972/en/62984",
          "https://globalcit.eu/national-citizenship-laws/united-arab-emirates/"
        ],
        verification_notes: "Pure jus sanguinis confirmed by Refworld text of Federal Law 17/1972 and GlobalCit country profile. Extremely high non-citizen resident proportion (≈90%) is a widely reported fact.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "sanguinis_only",
        review_priority: 6
      }
    },
    {
      name: "Kuwait",
      iso2: "KW",
      iso3: "KWT",
      type: "sanguinis_only",
      region: "Middle East",
      flag: "🇰🇼",
      summary: "Pure jus sanguinis. No birthright citizenship. Kuwait has the largest stateless population (Bidun) in the Middle East — ~100,000+ people. Decree-Law 116/2024 further tightened nationality law and enabled revocation of ~50,000 citizenships in 2024–2025.",
      details: "Kuwait maintains a purely jus sanguinis system under the Kuwaiti Nationality Act 1959. The Bidun (bidoon jinsiyya — 'without nationality') are Kuwait's stateless population, estimated at over 100,000 people descended from long-term residents not included in the original citizenship rolls at independence in 1961. Kuwaiti women cannot pass citizenship to their children. Decree-Law No. 116/2024, published in the Official Gazette in December 2024, amended the 1959 Act to: remove the right of foreign women who marry Kuwaiti men to acquire citizenship (former Article 8); expand administrative grounds for citizenship revocation. The changes were applied retroactively from September 2024. By mid-2025 approximately 50,000 people — predominantly foreign-born women who had acquired citizenship through marriage — had their nationality revoked without judicial oversight or right of appeal. Multiple international human rights bodies have called for repeal.",
      law_reference: "Kuwaiti Nationality Act (1959); Decree-Law No. 116/2024",
      recent_changes: [
        { year: 2024, event: "Decree-Law 116/2024 (December 2024): removes marriage-based citizenship acquisition for foreign women; expands revocation grounds; applied retroactively from September 2024" },
        { year: 2025, event: "Approximately 50,000 citizenships revoked by mid-2025, predominantly women who had acquired citizenship through marriage to Kuwaiti nationals" }
      ],
      risk_level: "critical",
      notable: true,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.loc.gov/item/global-legal-monitor/2025-09-12/kuwait-authorities-revoke-citizenship-of-thousands-of-citizens",
          "https://minorityrights.org/kuwait-citizenship-stripping/",
          "https://menarights.org/en/articles/kuwaiti-government-must-end-campaign-mass-citizenship-stripping-and-repeal-recent-amendments"
        ],
        verification_notes: "Sanguinis_only classification confirmed. Decree-Law 116/2024 is documented by Library of Congress Global Legal Monitor (high-quality secondary source) and corroborated by Minority Rights Group and MENA Rights Group reporting. The reform restricts acquisition further and does not introduce any jus soli element.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "recent_change",
        review_priority: 2
      }
    },
    {
      name: "Iran",
      iso2: "IR",
      iso3: "IRN",
      type: "conditional",
      region: "Middle East",
      flag: "🇮🇷",
      summary: "Primarily jus sanguinis through the father. Limited jus soli provision for children of unknown/stateless parents born in Iran. Citizenship cannot be passed through mothers.",
      details: "Iran's citizenship is primarily patrilineal jus sanguinis — citizenship passes through the father only; Iranian mothers cannot transmit citizenship to children of non-Iranian fathers. A limited jus soli provision may apply to children born in Iran who would otherwise be stateless (unknown or stateless parents). The maternal-transmission gap disproportionately affects children of Iranian women married to Afghan refugees, creating a large stateless population.",
      law_reference: "Iranian Civil Code; Citizenship Act",
      recent_changes: [],
      risk_level: "medium",
      notable: true,
      verification: {
        verification_status: "in_review",
        confidence: "low",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship"
        ],
        verification_notes: "Primarily jus sanguinis through father confirmed. The specific jus soli anti-statelessness provision needs primary-source confirmation. The inability of mothers to transmit citizenship is confirmed. Could be conditional or sanguinis_only depending on whether the anti-statelessness provision is operative.",
        requires_human_review: true,
        human_review_reason: "Confirm whether Iran has an operative anti-statelessness jus soli provision (which would keep it as conditional) or whether it is effectively sanguinis_only. Check the Iranian Civil Code Articles 976-987 as primary source.",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Bahrain",
      iso2: "BH",
      iso3: "BHR",
      type: "conditional",
      region: "Middle East",
      flag: "🇧🇭",
      summary: "Double jus soli in the paternal line: children born to a foreign father with valid residency, where the father was himself born in Bahrain, have a right to citizenship.",
      details: "Bahrain's citizenship law is primarily jus sanguinis. A double-generational jus soli pathway exists: a child born in Bahrain to a foreign father who also holds valid Bahraini residency and was himself born in Bahrain may acquire citizenship. This is a narrow conditional provision rather than a broad territorial rule.",
      law_reference: "Bahraini Citizenship Act (1963)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://globalcit.eu"
        ],
        verification_notes: "Double jus soli (father born in Bahrain + valid residency) confirmed by secondary sources. Classification as conditional is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Lebanon",
      iso2: "LB",
      iso3: "LBN",
      type: "sanguinis_only",
      region: "Middle East",
      flag: "🇱🇧",
      summary: "Pure jus sanguinis. No birthright citizenship. Citizenship cannot be passed through mothers.",
      details: "Lebanon follows a purely jus sanguinis model based on paternal lineage only under the Lebanese Nationality Act 1925 (Decree 15). Lebanese mothers cannot pass citizenship to their children. This has created significant issues, particularly for children of Lebanese women married to Palestinian refugees, who are rendered stateless.",
      law_reference: "Lebanese Nationality Act (Legislative Decree No. 15 of 1925)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "high",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.refworld.org/legal/natlegsl/natauth/1925/en/128124",
          "https://globalcit.eu/national-citizenship-laws/lebanon/"
        ],
        verification_notes: "Pure paternal jus sanguinis confirmed by Refworld text of Decree 15/1925 and GlobalCit country profile. No jus soli provision. Maternal transmission gap is a documented statelessness risk factor.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "sanguinis_only",
        review_priority: 6
      }
    },
    {
      name: "Turkey",
      iso2: "TR",
      iso3: "TUR",
      type: "sanguinis_only",
      region: "Europe/Asia",
      flag: "🇹🇷",
      summary: "Primarily jus sanguinis. Limited anti-statelessness provision for children born in Turkey who cannot acquire any other nationality.",
      details: "Turkey follows a primarily jus sanguinis model under the Turkish Citizenship Law (Law 5901, 2009). A limited anti-statelessness provision grants citizenship to children born in Turkey who would otherwise be stateless (i.e., whose parents have no citizenship to transmit). Standard births to foreign parents who hold any foreign nationality do not confer Turkish citizenship.",
      law_reference: "Turkish Citizenship Law (Law No. 5901 of 2009, Art. 8)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://globalcit.eu/national-citizenship-laws/turkey/",
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship"
        ],
        verification_notes: "Primarily jus sanguinis with anti-statelessness safeguard confirmed by GlobalCit country profile. Anti-statelessness provision under Art. 8 does not create general jus soli; sanguinis_only classification is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "sanguinis_only",
        review_priority: 6
      }
    },
    {
      name: "Azerbaijan",
      iso2: "AZ",
      iso3: "AZE",
      type: "conditional",
      region: "Asia",
      flag: "🇦🇿",
      summary: "Constitution (Article 52) provides jus soli, but in practice only children of citizens or stateless/unknown-parentage persons are recognized. Effective rule is anti-statelessness safeguard only.",
      details: "Article 52 of Azerbaijan's Constitution states that persons born on Azerbaijani territory are citizens. However, secondary sources indicate this constitutional provision is not enforced as written: in practice, citizenship at birth is only recognized for children of Azerbaijani citizens or children born in Azerbaijan with stateless/unknown-parentage. This is a statute-vs-practice gap similar to the Tanzania situation.",
      law_reference: "Azerbaijani Citizenship Act; Constitution of Azerbaijan, Article 52",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "in_review",
        confidence: "low",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship"
        ],
        verification_notes: "Constitutional Article 52 provides jus soli but practice is reported to limit recognition to children of citizens or stateless persons. This statute-vs-practice gap requires primary-source confirmation from the Citizenship Act text.",
        requires_human_review: true,
        human_review_reason: "Confirm whether the Azerbaijani Citizenship Act limits the constitutional jus soli to anti-statelessness cases. If so, conditional classification is correct. If the constitutional provision is operative, classification may need adjustment upward.",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Mongolia",
      iso2: "MN",
      iso3: "MNG",
      type: "conditional",
      region: "East Asia",
      flag: "🇲🇳",
      summary: "Limited conditional jus soli; primarily jus sanguinis.",
      details: "Mongolia has limited jus soli provisions. The country is primarily jus sanguinis. The specific conditional pathway (anti-statelessness provision or other rule) needs primary-source confirmation.",
      law_reference: "Mongolian Law on Citizenship",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "in_review",
        confidence: "low",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship"
        ],
        verification_notes: "Classified as conditional based on aggregator lists, but the specific conditional provision is not documented in the dataset. Could be statelessness safeguard only.",
        requires_human_review: true,
        human_review_reason: "Confirm the specific jus soli provision in the Mongolian Law on Citizenship and update the summary with the actual conditional rule.",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Taiwan",
      iso2: "TW",
      iso3: "TWN",
      type: "conditional",
      region: "East Asia",
      flag: "🇹🇼",
      summary: "Primarily jus sanguinis. Limited conditional jus soli: stateless persons or foundlings born in Taiwan may acquire citizenship.",
      details: "Taiwan's Nationality Act (Republic of China) is primarily jus sanguinis. Limited jus soli provisions exist for foundlings and persons born in Taiwan who would otherwise be stateless. Taiwan's unique political status (not a UN member state) adds complexity to its nationality framework.",
      law_reference: "Nationality Act of the Republic of China",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "in_review",
        confidence: "low",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship"
        ],
        verification_notes: "Classified as conditional; the specific jus soli provision (likely statelessness safeguard) is not confirmed from a primary source. Taiwan's Nationality Act text should be checked to confirm the precise rule.",
        requires_human_review: true,
        human_review_reason: "Confirm the specific jus soli provision in Taiwan's Nationality Act and update the summary with the exact statutory condition.",
        review_bucket: "conditional",
        review_priority: 5
      }
    },

    // ── AFRICA ──
    {
      name: "Lesotho",
      iso2: "LS",
      iso3: "LSO",
      type: "unrestricted",
      region: "Southern Africa",
      flag: "🇱🇸",
      summary: "Unrestricted birthright citizenship under the Lesotho Citizenship Order (1971).",
      details: "Lesotho grants citizenship to all persons born on Basotho territory regardless of parental status.",
      law_reference: "Lesotho Citizenship Order (1971)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.aljazeera.com/news/2025/2/6/which-countries-other-than-the-us-offer-birthright-citizenship"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Chad",
      iso2: "TD",
      iso3: "TCD",
      type: "unrestricted",
      region: "Central Africa",
      flag: "🇹🇩",
      summary: "Unrestricted jus soli: citizenship granted at birth to all born on Chadian territory. At age 18, dual nationals must elect one nationality.",
      details: "Chad grants citizenship at birth to children born on Chadian territory under the Chadian Nationality Code (Order No. 33/PG-INT of 14 August 1962). At age 18, any child who holds dual nationality (Chadian jus soli plus parental nationality) must elect one citizenship to retain. This age-18 election is a dual-nationality resolution mechanism, not a prerequisite for citizenship — the child holds Chadian citizenship from birth. Chad does not restrict dual nationality during minority.",
      law_reference: "Chadian Nationality Code (Order No. 33/PG-INT of 14 August 1962)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://en.wikipedia.org/wiki/Chadian_nationality_law"
        ],
        verification_notes: "Jus soli confirmed by secondary sources and consistent with the Nationality Code. The age-18 election is a dual-nationality resolution rule, not a condition for initial citizenship. Classification as unrestricted is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "Tanzania",
      iso2: "TZ",
      iso3: "TZA",
      type: "unrestricted",
      region: "East Africa",
      flag: "🇹🇿",
      summary: "Statute grants unrestricted jus soli, but official administrative practice reportedly requires Tanzanian parental descent for recognition of citizenship by birth. Possible reclassification to conditional warranted.",
      details: "The Tanzania Citizenship Act 1995 states that any child born within Tanzanian territory is granted citizenship, except for children of a father with diplomatic immunity or of enemy-alien parents during occupation. On its face, this is unrestricted jus soli. However, Wikipedia and secondary sources report that official practice requires birth to be supported by descent from a Tanzanian parent for formal citizenship recognition. If the practice-based requirement is operative, the correct classification would be conditional, not unrestricted. A human review with primary-source confirmation from Tanzania Immigration is needed.",
      law_reference: "Constitution of Tanzania (1977); Tanzania Citizenship Act 1995",
      recent_changes: [],
      risk_level: "medium",
      notable: false,
      verification: {
        verification_status: "in_review",
        confidence: "low",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.refworld.org/legal/legislation/natlegbod/1995/en/13754",
          "https://en.wikipedia.org/wiki/Tanzanian_nationality_law",
          "https://www.immigration.go.tz/index.php/immigration-services/tanzania-citizenship"
        ],
        verification_notes: "The Citizenship Act 1995 text is unrestricted jus soli, but secondary sources (Wikipedia, WorldPopReview) report that official practice requires Tanzanian parental descent. This statute-vs-practice gap cannot be resolved without reading the Tanzania Immigration Department's primary guidance directly.",
        requires_human_review: true,
        human_review_reason: "Confirm whether Tanzania's official administrative practice truly requires parental descent despite the plain-text jus soli statute. If yes, reclassify from unrestricted to conditional. Check Tanzania Immigration Department guidance as primary source.",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "South Africa",
      iso2: "ZA",
      iso3: "ZAF",
      type: "conditional",
      region: "Southern Africa",
      flag: "🇿🇦",
      summary: "Conditional: at least one parent must be a South African citizen or permanent resident at the time of birth.",
      details: "South Africa grants citizenship by birth if at least one parent is a South African citizen or permanent resident at the time of birth under the South African Citizenship Act 88 of 1995.",
      law_reference: "South African Citizenship Act (88 of 1995)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://globalcit.eu"
        ],
        verification_notes: "Parental citizen/PR requirement confirmed by secondary sources consistent with the statutory reference. Classification as conditional is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Namibia",
      iso2: "NA",
      iso3: "NAM",
      type: "conditional",
      region: "Southern Africa",
      flag: "🇳🇦",
      summary: "Conditional: at least one parent must be a Namibian citizen or permanent resident.",
      details: "Namibia grants citizenship by birth if at least one parent is a Namibian citizen or permanent resident under the Namibian Citizenship Act 14 of 1990.",
      law_reference: "Namibian Citizenship Act (14 of 1990)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://globalcit.eu"
        ],
        verification_notes: "Parental citizen/PR requirement confirmed by secondary sources consistent with the statutory reference. Classification as conditional is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Nigeria",
      iso2: "NG",
      iso3: "NGA",
      type: "sanguinis_only",
      region: "West Africa",
      flag: "🇳🇬",
      summary: "Primarily jus sanguinis. Limited jus soli for persons born in Nigeria to parents not nationals of any country, and for foundlings.",
      details: "Nigeria's 1999 Constitution (Section 25) grants citizenship by birth to persons born in Nigeria before independence (1960) or to at least one Nigerian parent. A limited jus soli provision applies to persons born in Nigeria whose parents are not nationals of any country (anti-statelessness safeguard), and to foundlings. Standard births to foreign parents do not confer Nigerian citizenship.",
      law_reference: "Constitution of the Federal Republic of Nigeria (1999), Section 25; Nigerian Citizenship Act",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.refworld.org/legal/natlegsl/natauth/1999/en/81985",
          "https://globalcit.eu/national-citizenship-laws/nigeria/"
        ],
        verification_notes: "Primarily jus sanguinis with limited anti-statelessness provision confirmed by Refworld constitutional text and GlobalCit country profile. Anti-statelessness provision does not create general jus soli; sanguinis_only classification is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "sanguinis_only",
        review_priority: 6
      }
    },
    {
      name: "Ethiopia",
      iso2: "ET",
      iso3: "ETH",
      type: "sanguinis_only",
      region: "East Africa",
      flag: "🇪🇹",
      summary: "Pure jus sanguinis. No birthright citizenship.",
      details: "Ethiopia follows a purely jus sanguinis model under the Ethiopian Nationality Law (Proclamation 378/2003). Citizenship is acquired through at least one Ethiopian parent. Birth in Ethiopia without an Ethiopian parent confers no citizenship.",
      law_reference: "Ethiopian Nationality Law (Proclamation No. 378/2003)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.refworld.org/legal/natlegsl/natauth/2003/en/30658",
          "https://globalcit.eu/national-citizenship-laws/ethiopia/"
        ],
        verification_notes: "Pure jus sanguinis confirmed by Refworld text of Proclamation 378/2003 and GlobalCit country profile. No jus soli provision.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "sanguinis_only",
        review_priority: 6
      }
    },
    {
      name: "Egypt",
      iso2: "EG",
      iso3: "EGY",
      type: "conditional",
      region: "North Africa",
      flag: "🇪🇬",
      summary: "Double jus soli (paternal line) plus anti-statelessness safeguard; primarily jus sanguinis.",
      details: "Egypt's Nationality Act (Law 26 of 1975) provides two conditional territorial pathways. Article 4 grants automatic citizenship at birth to a person born in Egypt whose father was also born in Egypt — a double jus soli rule in the paternal line. A separate foundling and statelessness provision covers children of unknown or stateless parents born on Egyptian territory. Outside these cases, citizenship is transmitted through paternal descent only. Maternal transmission was partially introduced for children of Egyptian mothers and foreign fathers by Law 154 of 2004, but this is a jus sanguinis reform, not a territorial one.",
      law_reference: "Egyptian Nationality Act, Law No. 26 of 1975 (Arts. 2–4); Law No. 154 of 2004 (maternal jus sanguinis amendment)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.refworld.org/legal/natlegsl/natauth/1975/en/128033",
          "https://globalcit.eu/national-citizenship-laws/egypt/"
        ],
        verification_notes: "Double jus soli (paternal line) confirmed by Refworld text of Law 26/1975 Art. 4 and GlobalCit country profile. Maternal reform (2004) is a jus sanguinis extension, not a territorial one. Classification as conditional is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Morocco",
      iso2: "MA",
      iso3: "MAR",
      type: "conditional",
      region: "North Africa",
      flag: "🇲🇦",
      summary: "Double jus soli (paternal line) with pre-adult declaration requirement; primarily jus sanguinis.",
      details: "Morocco's Nationality Code (Dahir No. 1-58-250, 1958) includes a double jus soli pathway: a person born in Morocco whose father was also born in Morocco may acquire Moroccan nationality, but must declare their intention to do so before age 20. Outside this rule, citizenship flows through paternal descent. The 2007 amendment (Law 62-06) introduced maternal jus sanguinis transmission, allowing children of Moroccan mothers and foreign fathers to acquire nationality — a significant reform, but a jus sanguinis one that does not alter the territorial birth rule.",
      law_reference: "Moroccan Nationality Code, Dahir No. 1-58-250 of 1958 (Art. 8–9); Law 62-06 of 2007 (maternal amendment)",
      recent_changes: [
        { year: 2007, description: "Law 62-06 introduced maternal transmission of nationality — a child born of a Moroccan mother may now acquire Moroccan nationality, a major gender-equality reform that operates through jus sanguinis, not jus soli." }
      ],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.refworld.org/legal/natlegsl/natauth/1958/en/128027",
          "https://globalcit.eu/national-citizenship-laws/morocco/"
        ],
        verification_notes: "Double jus soli (paternal line) with declaration-before-20 requirement confirmed by Refworld text of Dahir 1-58-250 and GlobalCit country profile. 2007 maternal reform is jus sanguinis only. Classification as conditional is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Tunisia",
      iso2: "TN",
      iso3: "TUN",
      type: "conditional",
      region: "North Africa",
      flag: "🇹🇳",
      summary: "Triple-generational jus soli (paternal line) with declaration requirement; primarily jus sanguinis.",
      details: "Tunisia's Nationality Code (1956, amended 1963 and 2002) contains a triple-generational jus soli provision: a person born in Tunisia whose father was also born in Tunisia, and whose paternal grandfather was also born in Tunisia, may acquire Tunisian nationality by declaration before age 20. Outside this narrow rule, citizenship is transmitted through paternal descent. An anti-statelessness safeguard protects children born in Tunisia who would otherwise be stateless. The 2002 amendment extended some maternal transmission rights but did not change the territorial birth rule.",
      law_reference: "Tunisian Nationality Code, Law No. 6 of 1956 (as amended 1963, 2002); anti-statelessness provision Art. 17",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://www.refworld.org/legal/natlegsl/natauth/1956/en/128069",
          "https://globalcit.eu/national-citizenship-laws/tunisia/"
        ],
        verification_notes: "Triple-generational jus soli with declaration before age 20 confirmed by Refworld text and GlobalCit country profile. Paternal-line requirement is strict; maternal reform (2002) does not create territorial pathway. Classification as conditional is correct.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Sudan",
      iso2: "SD",
      iso3: "SDN",
      type: "conditional",
      region: "East Africa",
      flag: "🇸🇩",
      summary: "Primarily jus sanguinis; limited transitional jus soli for pre-independence births and anti-statelessness safeguard.",
      details: "Sudan's Sudanese Nationality Act 1994 (post-South Sudan split) is primarily jus sanguinis. The 1994 Act grants citizenship by birth in Sudan in limited transitional circumstances for those with connections to the pre-independence state, and retains an anti-statelessness provision for children of unknown or stateless parents. Standard territorial births to foreign parents do not automatically confer citizenship. The 2011 separation of South Sudan further complicated the nationality picture, as many persons had to elect between Sudanese and South Sudanese nationality. Current practice requires confirmation of exact post-2011 provisions.",
      law_reference: "Sudanese Nationality Act 1994; transitional provisions following South Sudan independence (2011)",
      recent_changes: [
        { year: 2011, description: "South Sudan independence required nationality election by many persons with connections to both territories. Sudanese nationality law and its jus soli provisions need review in light of post-2011 state practice." }
      ],
      risk_level: "medium",
      notable: false,
      verification: {
        verification_status: "in_review",
        confidence: "low",
        last_verified: null,
        source_tier: "tertiary",
        source_urls: [
          "https://www.refworld.org/country/SDN"
        ],
        verification_notes: "1994 Act text and post-2011 transitional rules need primary source verification. Current practice on the jus soli anti-statelessness provision and post-separation nationality elections is unclear from secondary sources alone.",
        requires_human_review: true,
        human_review_reason: "Verify exact current jus soli scope under the 1994 Act and whether any transitional provisions remain active post-2011 South Sudan separation; confirm whether anti-statelessness safeguard is statutory and currently enforced",
        review_bucket: "conditional",
        review_priority: 5
      }
    },
    {
      name: "Gambia",
      iso2: "GM",
      iso3: "GMB",
      type: "unrestricted",
      region: "West Africa",
      flag: "🇬🇲",
      summary: "Unrestricted birthright citizenship under the Gambian Citizenship Act.",
      details: "Gambia grants citizenship to all persons born on Gambian territory regardless of parental status.",
      law_reference: "Gambian Citizenship Act",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "verified",
        confidence: "medium",
        last_verified: "2026-04-01",
        source_tier: "secondary",
        source_urls: [
          "https://worldpopulationreview.com/country-rankings/countries-with-birthright-citizenship",
          "https://www.aljazeera.com/news/2025/2/6/which-countries-other-than-the-us-offer-birthright-citizenship"
        ],
        verification_notes: "Unrestricted jus soli confirmed by multiple secondary sources. No recent changes reported.",
        requires_human_review: false,
        human_review_reason: "",
        review_bucket: "unrestricted",
        review_priority: 3
      }
    },
    {
      name: "São Tomé and Príncipe",
      iso2: "ST",
      iso3: "STP",
      type: "conditional",
      region: "Central Africa",
      flag: "🇸🇹",
      summary: "Primarily jus sanguinis with limited territorial provisions; specific conditions require source confirmation.",
      details: "São Tomé and Príncipe follows a primarily jus sanguinis nationality regime. Birth in the territory to at least one Santomean parent confers citizenship. An anti-statelessness provision for children of unknown or stateless parents is commonly reported but has not been confirmed against a primary legal text. Specific conditions for the jus soli pathway (if broader than parentage-based) require primary-source verification against the current nationality law.",
      law_reference: "São Tomé and Príncipe Nationality Law (Lei da Nacionalidade)",
      recent_changes: [],
      risk_level: "low",
      notable: false,
      verification: {
        verification_status: "in_review",
        confidence: "low",
        last_verified: null,
        source_tier: "unreviewed",
        source_urls: [],
        verification_notes: "No primary or secondary source confirming the exact jus soli provision has been located. Secondary sources classify the country as conditional but do not specify the statutory condition.",
        requires_human_review: true,
        human_review_reason: "Locate and verify the current Nationality Law text; confirm whether the jus soli pathway requires one Santomean parent or is purely an anti-statelessness safeguard; confirm whether current classification as conditional is correct or should be sanguinis_only",
        review_bucket: "conditional",
        review_priority: 5
      }
    }
  ],

  // ─────────────────────────────────────────────
  // HISTORICAL TIMELINE
  // ─────────────────────────────────────────────
  timeline: [
    {
      year: 1350,
      country: "United Kingdom",
      event: "England establishes jus soli tradition — all persons born on English soil are subjects of the Crown",
      type: "established",
      significance: "high"
    },
    {
      year: 1868,
      country: "United States",
      event: "14th Amendment ratified: 'All persons born or naturalized in the United States, and subject to the jurisdiction thereof, are citizens of the United States'",
      type: "established",
      significance: "critical"
    },
    {
      year: 1898,
      country: "United States",
      event: "United States v. Wong Kim Ark: Supreme Court rules 6-2 that 14th Amendment grants citizenship to US-born children of Chinese immigrant parents",
      type: "reinforced",
      significance: "critical"
    },
    {
      year: 1913,
      country: "Germany",
      event: "Pure jus sanguinis law enacted (Reichs- und Staatsangehörigkeitsgesetz), replacing any prior jus soli traditions",
      type: "restricted",
      significance: "medium"
    },
    {
      year: 1950,
      country: "India",
      event: "Constitution of India establishes broad jus soli: all persons born in India are citizens",
      type: "established",
      significance: "high"
    },
    {
      year: 1951,
      country: "Pakistan",
      event: "Pakistan Citizenship Act 1951 establishes unrestricted jus soli",
      type: "established",
      significance: "medium"
    },
    {
      year: 1982,
      country: "Myanmar",
      event: "Burma Citizenship Law 1982 ties citizenship to 135 recognized ethnic groups, excluding Rohingya — creating mass statelessness",
      type: "restricted",
      significance: "critical"
    },
    {
      year: 1983,
      country: "United Kingdom",
      event: "British Nationality Act 1981 takes effect: ends unrestricted jus soli. Parent must be a British citizen or 'settled' (permanent resident)",
      type: "restricted",
      significance: "high"
    },
    {
      year: 1986,
      country: "Australia",
      event: "Australian Citizenship Amendment Act 1986 (August 20): ends unconditional jus soli. At least one parent must be a citizen or permanent resident",
      type: "restricted",
      significance: "high"
    },
    {
      year: 1987,
      country: "India",
      event: "First restriction: Citizenship Act amended to require at least one Indian parent (previously all births on Indian soil were automatic citizens)",
      type: "restricted",
      significance: "high"
    },
    {
      year: 1993,
      country: "France",
      event: "Pasqua Laws restrict previous more-automatic jus soli provisions in France",
      type: "restricted",
      significance: "medium"
    },
    {
      year: 2000,
      country: "Germany",
      event: "Staatsangehörigkeitsgesetz reform: Germany introduces conditional jus soli for the first time — child born in Germany to a parent with 8+ years lawful residence acquires citizenship",
      type: "established",
      significance: "high"
    },
    {
      year: 2003,
      country: "India",
      event: "Citizenship (Amendment) Act 2003: requires both parents to be Indian citizens, or one citizen + other not an illegal migrant. Effectively ends jus soli",
      type: "restricted",
      significance: "high"
    },
    {
      year: 2005,
      country: "Ireland",
      event: "27th Amendment effective: ends unrestricted jus soli. Ireland was the LAST EU member with unrestricted jus soli. Referendum approved ~80% in June 2004.",
      type: "restricted",
      significance: "high"
    },
    {
      year: 2006,
      country: "New Zealand",
      event: "Citizenship Act 2005 (January 1, 2006): ends unconditional jus soli. At least one parent must be a citizen or permanent resident",
      type: "restricted",
      significance: "medium"
    },
    {
      year: 2010,
      country: "Dominican Republic",
      event: "Constitutional amendment excludes children of undocumented immigrants from birthright citizenship",
      type: "restricted",
      significance: "high"
    },
    {
      year: 2013,
      country: "Dominican Republic",
      event: "Constitutional Court Ruling TC/0168/13 retroactively strips citizenship from ~200,000 people of Haitian descent born since 1929 — condemned internationally as creating mass statelessness",
      type: "restricted",
      significance: "critical"
    },
    {
      year: 2020,
      country: "Portugal",
      event: "Liberalization: Law 2/2020 reduces parental legal residency requirement from 5 years to 1 year",
      type: "liberalized",
      significance: "medium"
    },
    {
      year: 2024,
      country: "Germany",
      event: "Act to Modernize Nationality Law (June 2024): reduces parental residency from 8 to 5 years; allows dual citizenship for the first time — a significant liberalization bucking the global trend",
      type: "liberalized",
      significance: "high"
    },
    {
      year: 2024,
      country: "Pakistan",
      event: "National Assembly passes bill ending unrestricted jus soli (November 11, 2024). Requires at least one parent to be a citizen/permanent resident. Primarily targets Afghan refugee children.",
      type: "restricted",
      significance: "high"
    },
    {
      year: 2025,
      country: "United States",
      event: "Trump executive order (January 20, 2025) attempts to restrict birthright citizenship. Immediately blocked by multiple federal courts as unconstitutional.",
      type: "contested",
      significance: "critical"
    },
    {
      year: 2025,
      country: "France",
      event: "Law restricting jus soli in Mayotte: both foreign parents must have been legally resident for 1+ year before birth (May 2025). Critics call it 'a laboratory for the far-right.'",
      type: "restricted",
      significance: "medium"
    },
    {
      year: 2025,
      country: "Italy",
      event: "Law 74/2025 (March 2025): restricts jus sanguinis ancestry claims to parent or grandparent born in Italy (was previously unlimited generational depth)",
      type: "restricted",
      significance: "medium"
    },
    {
      year: 2025,
      country: "United States",
      event: "Supreme Court agrees to hear Trump v. CASA (December 2025) — the first major constitutional challenge to birthright citizenship since Wong Kim Ark in 1898",
      type: "contested",
      significance: "critical"
    },
    {
      year: 2026,
      country: "United States",
      event: "Supreme Court oral arguments held April 1, 2026 in Trump v. CASA. Ruling expected Summer 2026. Trump attends in person — historically unprecedented.",
      type: "contested",
      significance: "critical"
    }
  ],

  // ─────────────────────────────────────────────
  // NOTABLE CASES / DEEP DIVES
  // ─────────────────────────────────────────────
  notable_cases: [
    {
      title: "The Dominican Republic Mass Denationalization",
      country: "Dominican Republic",
      iso2: "DO",
      severity: "critical",
      summary: "In 2013, ~200,000 people of Haitian descent had citizenship retroactively stripped, creating generational statelessness.",
      full_text: "The 2013 Constitutional Court Ruling TC/0168/13 retroactively applied the 2010 constitutional restriction on children of undocumented immigrants to anyone born after 1929 without a Dominican parent. This stripped approximately 200,000 people — 86% of Haitian descent — of citizenship, many of whom had lived their entire lives in the DR and had no meaningful connection to Haiti. The ruling was condemned by the Inter-American Court of Human Rights and is considered one of the worst cases of state-created statelessness in the 21st century. The situation remains unresolved as of 2026."
    },
    {
      title: "Rohingya Statelessness — Myanmar's Citizenship as a Weapon",
      country: "Myanmar",
      iso2: "MM",
      severity: "critical",
      summary: "Myanmar's 1982 Citizenship Law excludes Rohingya from recognized ethnic groups, making ~1 million people stateless across generations.",
      full_text: "Myanmar's 1982 Citizenship Law ties citizenship to membership in one of 135 recognized national ethnic groups. The Rohingya, a Muslim ethnic minority from the Rakhine State, were excluded from this list. Since 1982, approximately 1 million Rohingya have lived as stateless persons in Myanmar — ineligible for citizenship at birth, unable to naturalize, and denied virtually all civic rights. Legal scholars and the American Bar Association have described this as 'statelessness as a tool of genocide.' The subsequent ethnic cleansing of Rohingya (2017 military crackdown) displaced approximately 700,000 to Bangladesh."
    },
    {
      title: "The US 14th Amendment Challenge",
      country: "United States",
      iso2: "US",
      severity: "high",
      summary: "President Trump's executive order (January 20, 2025) seeks to end birthright citizenship for children of undocumented immigrants. Currently before the Supreme Court.",
      full_text: "On January 20, 2025, President Trump signed an executive order directing federal agencies to stop recognizing as US citizens children born to parents who are neither citizens nor lawful permanent residents. Multiple federal district courts immediately blocked the order, calling it 'blatantly unconstitutional.' Two circuit courts of appeals upheld those injunctions. In December 2025, the Supreme Court agreed to hear the case (Trump v. CASA). Oral arguments were held April 1, 2026, with Trump attending in person — an historically unprecedented action by a sitting president. A ruling is expected by summer 2026. The key question: does 'subject to the jurisdiction thereof' in the 14th Amendment exclude children of undocumented immigrants? The last time the Supreme Court addressed this was United States v. Wong Kim Ark (1898), which broadly upheld birthright citizenship."
    },
    {
      title: "Ireland — The Last EU Country to End Jus Soli",
      country: "Ireland",
      iso2: "IE",
      severity: "medium",
      summary: "Ireland held a constitutional referendum in 2004, with ~80% voting to end unrestricted birthright citizenship — the last EU country to do so.",
      full_text: "Ireland was the last EU member state with unrestricted jus soli. The impetus for change was partly the 'Chen case,' in which a Chinese woman deliberately traveled to Belfast (Northern Ireland) to give birth so her child would gain Irish — and therefore EU — citizenship, entitling the mother to reside in the UK as the primary carer of an EU citizen. The Irish government held a constitutional referendum in June 2004, which passed with approximately 80% of voters in favour. The 27th Amendment to the Irish Constitution, effective 2005, removed the automatic right to citizenship for children born in Ireland to non-citizen parents. At least one parent must now be an Irish or British citizen, or have been lawfully resident in Ireland for 3 of the 4 years before the birth."
    },
    {
      title: "Kuwait's Bidun — The Stateless Gulf",
      country: "Kuwait",
      iso2: "KW",
      severity: "high",
      summary: "Kuwait's estimated 100,000+ stateless Bidun population has been denied citizenship for decades. In 2024–2025, Kuwait revoked citizenship from ~50,000 more people.",
      full_text: "Kuwait's Bidun (bidoon jinsiyya — 'without nationality') are descended from people who were long-term residents of Kuwait but were not included in the original citizenship rolls when Kuwait gained independence from Britain in 1961. Estimates put the Bidun population at over 100,000 people. They are denied citizenship, state employment, education, and basic services. Kuwait Women married to Bidun men cannot pass Kuwaiti citizenship to their children. In 2024–2025, Kuwait revoked the citizenship of approximately 50,000 people in a large-scale campaign. Human Rights Watch has documented extensive discrimination against the Bidun population."
    },
    {
      title: "Germany — A Liberalization Against the Trend",
      country: "Germany",
      iso2: "DE",
      severity: "low",
      summary: "Germany's June 2024 reform reduced parental residency requirements and allowed dual citizenship — bucking the global trend of restriction.",
      full_text: "While most developed democracies have been tightening birthright citizenship since the 1980s, Germany moved in the opposite direction in June 2024. The Act to Modernize Nationality Law reduced the required parental legal residency from 8 to 5 years and — for the first time — allowed dual citizenship. Germany had been purely jus sanguinis from 1913 until 2000, when conditional jus soli was first introduced. The 2024 reform represents a significant liberalization. Research cited during the legislative debate showed that children who naturalize earlier have better educational outcomes. Right-wing parties in Germany have pledged to reverse the 2024 reform if they gain power."
    }
  ]
};

const VERIFICATION_QUEUE_ORDER = [
  "transitional",
  "recent_change",
  "unrestricted",
  "supplemental_generic",
  "conditional",
  "sanguinis_only"
];

const SOURCE_TIER_RULES = {
  primary: "Official government source, constitutional text, nationality statute, court ruling, or state legal text.",
  secondary: "High-quality institutional legal summary such as UNHCR, Refworld, Library of Congress, or comparable research body.",
  tertiary: "Reputable explanatory or journalistic summary used only to support context, not as the sole classification basis.",
  unreviewed: "No source-backed review has been completed yet."
};

const REVIEW_ACCEPTANCE_CRITERIA = [
  "Classification matches the locked rubric for unrestricted, conditional, sanguinis_only, or transitional.",
  "At least one supporting source URL is recorded.",
  "Summary and details reflect the verified rule rather than a generic fallback.",
  "Recent reform or litigation dates are checked when present.",
  "Map metadata and region metadata remain intact."
];

const GENERIC_LAW_REFERENCE = "Constitutional nationality provisions and nationality/citizenship legislation";

function flagFromISO2(iso2) {
  return String.fromCodePoint(...iso2.toUpperCase().split("").map(char => 127397 + char.charCodeAt(0)));
}

function genericSummary(type) {
  if (type === "unrestricted") {
    return "Unrestricted birthright citizenship: birth in the territory normally grants citizenship automatically, subject to standard diplomatic exceptions.";
  }
  if (type === "conditional") {
    return "Conditional jus soli: place of birth can matter, but citizenship depends on additional conditions such as parental status, residence, registration, or statelessness safeguards.";
  }
  if (type === "transitional") {
    return "Birthright citizenship law is changing or politically contested.";
  }
  return "No ordinary birthright citizenship. Citizenship is generally transmitted through parental nationality, with limited foundling or anti-statelessness safeguards.";
}

function genericDetails(name, type) {
  if (type === "unrestricted") {
    return `${name} generally follows a broad jus soli model in which birth on the territory creates citizenship automatically except for children of diplomats or enemy occupiers.`;
  }
  if (type === "conditional") {
    return `${name} does not operate a simple automatic jus soli rule. Birth in the territory can still matter, but typically only alongside residency, descent, registration, anti-statelessness, or foundling provisions.`;
  }
  if (type === "transitional") {
    return `${name} is currently in a period of legal or political transition on nationality questions, so recent litigation, statutory amendments, or executive action matter more than a simple permanent rule label.`;
  }
  return `${name} primarily follows jus sanguinis. Birth in the territory alone does not usually create citizenship, though limited protections may still exist for foundlings or children who would otherwise be stateless.`;
}

function makeCountry(entry) {
  const usedGenericSummary = !entry.summary;
  const usedGenericDetails = !entry.details;
  const usedGenericLawReference = !entry.law_reference;

  return {
    summary: genericSummary(entry.type),
    details: genericDetails(entry.name, entry.type),
    law_reference: GENERIC_LAW_REFERENCE,
    recent_changes: [],
    risk_level: "low",
    notable: false,
    flag: flagFromISO2(entry.iso2),
    data_origin: entry.data_origin || (
      usedGenericSummary || usedGenericDetails || usedGenericLawReference
        ? "supplemental_generic"
        : "supplemental_specific"
    ),
    autogenerated_fields: {
      summary: usedGenericSummary,
      details: usedGenericDetails,
      law_reference: usedGenericLawReference
    },
    ...entry
  };
}

function getReviewBucket(country) {
  if (country.type === "transitional") return "transitional";
  if (Array.isArray(country.recent_changes) && country.recent_changes.length > 0) return "recent_change";
  if (country.type === "unrestricted") return "unrestricted";
  if (country.data_origin === "supplemental_generic") return "supplemental_generic";
  if (country.type === "conditional") return "conditional";
  return "sanguinis_only";
}

function createVerification(country) {
  const review_bucket = getReviewBucket(country);
  return {
    verification_status: "unverified",
    confidence: "low",
    last_verified: null,
    source_tier: "unreviewed",
    source_urls: [],
    verification_notes: "Pending source-backed legal review.",
    requires_human_review: false,
    human_review_reason: "",
    review_bucket,
    review_priority: VERIFICATION_QUEUE_ORDER.indexOf(review_bucket) + 1
  };
}

function getHumanReviewReason(country) {
  const bucket = country.verification?.review_bucket || getReviewBucket(country);
  if (bucket === "transitional") {
    return "Need a human check on whether the transitional reform or litigation actually changed the operative rule in force as of April 2026.";
  }
  if (bucket === "recent_change") {
    return "Need a human check on the current operative rule, the exact effect of the recent reform or litigation, and whether the summary still matches the law in force.";
  }
  if (bucket === "unrestricted") {
    return "Need a human check that territorial birth still grants automatic citizenship apart from standard diplomatic exceptions and that no hidden residency or registration condition applies.";
  }
  if (bucket === "supplemental_generic") {
    return "Need a human check because this profile still relies on generic fallback text and does not yet have country-specific, source-backed rule language.";
  }
  if (bucket === "conditional") {
    return "Need a human check on the exact legal condition that makes territorial birth effective, including any residence, declaration, anti-statelessness, or parental-status requirements.";
  }
  return "Need a human check that territorial birth alone does not ordinarily create citizenship and that any foundling or anti-statelessness safeguards do not change the classification.";
}

const SUPPLEMENTAL_COUNTRIES = [
  { name: "Afghanistan", iso2: "AF", iso3: "AFG", numeric: 4, type: "sanguinis_only", region: "South Asia" },
  { name: "Albania", iso2: "AL", iso3: "ALB", numeric: 8, type: "conditional", region: "Europe" },
  { name: "Algeria", iso2: "DZ", iso3: "DZA", numeric: 12, type: "conditional", region: "North Africa" },
  { name: "Andorra", iso2: "AD", iso3: "AND", numeric: 20, type: "conditional", region: "Europe" },
  { name: "Angola", iso2: "AO", iso3: "AGO", numeric: 24, type: "conditional", region: "Southern Africa" },
  { name: "Armenia", iso2: "AM", iso3: "ARM", numeric: 51, type: "conditional", region: "Europe/Asia" },
  { name: "Bahamas", iso2: "BS", iso3: "BHS", numeric: 44, type: "conditional", region: "Caribbean", summary: "Conditional jus soli: birth in the Bahamas does not automatically grant citizenship to children of foreign parents, but they may usually apply at adulthood.", details: "The Bahamas does not confer fully automatic citizenship at birth on all children born in the territory. In the common case where neither parent is Bahamian, a child born in the Bahamas may seek citizenship through registration after turning 18, making the system a clear example of conditional rather than automatic jus soli.", law_reference: "Constitution of the Commonwealth of The Bahamas, nationality provisions", notable: true },
  { name: "Belarus", iso2: "BY", iso3: "BLR", numeric: 112, type: "conditional", region: "Europe" },
  { name: "Benin", iso2: "BJ", iso3: "BEN", numeric: 204, type: "conditional", region: "West Africa" },
  { name: "Bhutan", iso2: "BT", iso3: "BTN", numeric: 64, type: "sanguinis_only", region: "South Asia" },
  { name: "Bosnia and Herzegovina", iso2: "BA", iso3: "BIH", numeric: 70, type: "conditional", region: "Europe" },
  { name: "Botswana", iso2: "BW", iso3: "BWA", numeric: 72, type: "conditional", region: "Southern Africa" },
  { name: "Brunei", iso2: "BN", iso3: "BRN", numeric: 96, type: "sanguinis_only", region: "Southeast Asia" },
  { name: "Bulgaria", iso2: "BG", iso3: "BGR", numeric: 100, type: "conditional", region: "Europe" },
  { name: "Burkina Faso", iso2: "BF", iso3: "BFA", numeric: 854, type: "conditional", region: "West Africa" },
  { name: "Burundi", iso2: "BI", iso3: "BDI", numeric: 108, type: "conditional", region: "East Africa" },
  { name: "Cabo Verde", iso2: "CV", iso3: "CPV", numeric: 132, type: "conditional", region: "West Africa" },
  { name: "Cameroon", iso2: "CM", iso3: "CMR", numeric: 120, type: "conditional", region: "Central Africa" },
  { name: "Central African Republic", iso2: "CF", iso3: "CAF", numeric: 140, type: "conditional", region: "Central Africa" },
  { name: "Comoros", iso2: "KM", iso3: "COM", numeric: 174, type: "conditional", region: "East Africa" },
  { name: "Congo", iso2: "CG", iso3: "COG", numeric: 178, type: "conditional", region: "Central Africa" },
  { name: "Côte d'Ivoire", iso2: "CI", iso3: "CIV", numeric: 384, type: "conditional", region: "West Africa", summary: "Conditional jus soli: citizenship law combines descent with territorial, registration, and anti-statelessness pathways rather than a fully automatic birthright rule.", details: "Côte d'Ivoire does not follow a classic unrestricted jus soli model. Birth in the territory can matter in combination with family status, registration, or later acquisition rules, which places the country in the conditional category rather than the Americas-style automatic jus soli group.", law_reference: "Ivorian nationality legislation and related constitutional provisions" },
  { name: "Croatia", iso2: "HR", iso3: "HRV", numeric: 191, type: "conditional", region: "Europe" },
  { name: "Democratic Republic of the Congo", iso2: "CD", iso3: "COD", numeric: 180, type: "conditional", region: "Central Africa" },
  { name: "Djibouti", iso2: "DJ", iso3: "DJI", numeric: 262, type: "sanguinis_only", region: "East Africa" },
  { name: "Equatorial Guinea", iso2: "GQ", iso3: "GNQ", numeric: 226, type: "sanguinis_only", region: "Central Africa" },
  { name: "Eritrea", iso2: "ER", iso3: "ERI", numeric: 232, type: "sanguinis_only", region: "East Africa" },
  { name: "Estonia", iso2: "EE", iso3: "EST", numeric: 233, type: "conditional", region: "Europe" },
  { name: "Eswatini", iso2: "SZ", iso3: "SWZ", numeric: 748, type: "sanguinis_only", region: "Southern Africa" },
  { name: "Gabon", iso2: "GA", iso3: "GAB", numeric: 266, type: "conditional", region: "Central Africa" },
  { name: "Georgia", iso2: "GE", iso3: "GEO", numeric: 268, type: "conditional", region: "Europe/Asia" },
  { name: "Ghana", iso2: "GH", iso3: "GHA", numeric: 288, type: "conditional", region: "West Africa" },
  { name: "Guinea", iso2: "GN", iso3: "GIN", numeric: 324, type: "conditional", region: "West Africa" },
  { name: "Guinea-Bissau", iso2: "GW", iso3: "GNB", numeric: 624, type: "conditional", region: "West Africa" },
  { name: "Holy See", iso2: "VA", iso3: "VAT", numeric: 336, type: "sanguinis_only", region: "Europe", summary: "No birthright citizenship. Vatican City citizenship is functional and office-based rather than territorial in the jus soli sense.", details: "The Holy See does not operate an ordinary birthright citizenship model. Citizenship in Vatican City is tied to office, residence, and service to the Holy See rather than automatic territorial birth, so it sits outside the jus soli tradition entirely.", law_reference: "Fundamental Law of Vatican City State and nationality rules of the Holy See", notable: true },
  { name: "Iceland", iso2: "IS", iso3: "ISL", numeric: 352, type: "conditional", region: "Europe" },
  { name: "Iraq", iso2: "IQ", iso3: "IRQ", numeric: 368, type: "sanguinis_only", region: "Middle East" },
  { name: "Kazakhstan", iso2: "KZ", iso3: "KAZ", numeric: 398, type: "conditional", region: "Central Asia" },
  { name: "Kenya", iso2: "KE", iso3: "KEN", numeric: 404, type: "conditional", region: "East Africa" },
  { name: "Kiribati", iso2: "KI", iso3: "KIR", numeric: 296, type: "conditional", region: "Pacific", summary: "Limited jus soli: birth in Kiribati can matter, especially where no other nationality is available, but the system is not a broad unconditional model.", details: "Kiribati nationality law combines descent with a narrow territorial rule aimed in part at preventing statelessness. That puts Kiribati in the mixed or conditional category rather than alongside the classic unrestricted jus soli countries of the Americas.", law_reference: "Constitution of Kiribati and Citizenship Act" },
  { name: "Kyrgyzstan", iso2: "KG", iso3: "KGZ", numeric: 417, type: "conditional", region: "Central Asia" },
  { name: "Laos", iso2: "LA", iso3: "LAO", numeric: 418, type: "sanguinis_only", region: "Southeast Asia" },
  { name: "Liberia", iso2: "LR", iso3: "LBR", numeric: 430, type: "sanguinis_only", region: "West Africa", summary: "No ordinary birthright citizenship. Liberia's citizenship regime is strongly descent-based and historically restrictive.", details: "Liberia is not an unrestricted jus soli country. Citizenship is primarily transmitted through Liberian parentage, and the constitutional framework has long been controversial because it restricts natural-born citizenship in racially exclusionary terms. Birth in Liberia alone does not ordinarily create citizenship.", law_reference: "Constitution of Liberia, Article 27; Aliens and Nationality Law", notable: true, risk_level: "medium" },
  { name: "Libya", iso2: "LY", iso3: "LBY", numeric: 434, type: "sanguinis_only", region: "North Africa" },
  { name: "Liechtenstein", iso2: "LI", iso3: "LIE", numeric: 438, type: "sanguinis_only", region: "Europe" },
  { name: "Lithuania", iso2: "LT", iso3: "LTU", numeric: 440, type: "conditional", region: "Europe" },
  { name: "Madagascar", iso2: "MG", iso3: "MDG", numeric: 450, type: "conditional", region: "East Africa" },
  { name: "Malawi", iso2: "MW", iso3: "MWI", numeric: 454, type: "conditional", region: "Southern Africa" },
  { name: "Maldives", iso2: "MV", iso3: "MDV", numeric: 462, type: "sanguinis_only", region: "South Asia" },
  { name: "Mali", iso2: "ML", iso3: "MLI", numeric: 466, type: "conditional", region: "West Africa" },
  { name: "Marshall Islands", iso2: "MH", iso3: "MHL", numeric: 584, type: "conditional", region: "Pacific", summary: "Limited jus soli: birth in the Marshall Islands can produce citizenship in narrower cases, particularly where another nationality is unavailable.", details: "The Marshall Islands mixes citizenship by descent with a restricted territorial rule. It therefore fits better with conditional jus soli systems than with countries where mere birth on the territory is enough in almost every case.", law_reference: "Constitution and citizenship provisions of the Republic of the Marshall Islands" },
  { name: "Mauritania", iso2: "MR", iso3: "MRT", numeric: 478, type: "conditional", region: "West Africa" },
  { name: "Mauritius", iso2: "MU", iso3: "MUS", numeric: 480, type: "conditional", region: "East Africa" },
  { name: "Micronesia", iso2: "FM", iso3: "FSM", numeric: 583, type: "sanguinis_only", region: "Pacific" },
  { name: "Moldova", iso2: "MD", iso3: "MDA", numeric: 498, type: "conditional", region: "Europe" },
  { name: "Monaco", iso2: "MC", iso3: "MCO", numeric: 492, type: "conditional", region: "Europe" },
  { name: "Montenegro", iso2: "ME", iso3: "MNE", numeric: 499, type: "conditional", region: "Europe" },
  { name: "Mozambique", iso2: "MZ", iso3: "MOZ", numeric: 508, type: "conditional", region: "Southern Africa" },
  { name: "Nauru", iso2: "NR", iso3: "NRU", numeric: 520, type: "conditional", region: "Pacific", summary: "Limited jus soli: birth in Nauru may matter mainly for children who would otherwise be stateless, rather than as a broad automatic rule.", details: "Nauru does not maintain unrestricted birthright citizenship. Its nationality regime is overwhelmingly descent-based, with a narrower territorial safety valve around potential statelessness, making it a conditional jus soli system.", law_reference: "Constitution of Nauru and Naoero Citizenship Act" },
  { name: "Nepal", iso2: "NP", iso3: "NPL", numeric: 524, type: "conditional", region: "South Asia" },
  { name: "North Korea", iso2: "KP", iso3: "PRK", numeric: 408, type: "sanguinis_only", region: "East Asia" },
  { name: "North Macedonia", iso2: "MK", iso3: "MKD", numeric: 807, type: "conditional", region: "Europe" },
  { name: "Oman", iso2: "OM", iso3: "OMN", numeric: 512, type: "sanguinis_only", region: "Middle East" },
  { name: "Palau", iso2: "PW", iso3: "PLW", numeric: 585, type: "sanguinis_only", region: "Pacific" },
  { name: "Papua New Guinea", iso2: "PG", iso3: "PNG", numeric: 598, type: "sanguinis_only", region: "Pacific" },
  { name: "Philippines", iso2: "PH", iso3: "PHL", numeric: 608, type: "sanguinis_only", region: "Southeast Asia" },
  { name: "Qatar", iso2: "QA", iso3: "QAT", numeric: 634, type: "sanguinis_only", region: "Middle East" },
  { name: "Romania", iso2: "RO", iso3: "ROU", numeric: 642, type: "conditional", region: "Europe" },
  { name: "Rwanda", iso2: "RW", iso3: "RWA", numeric: 646, type: "conditional", region: "East Africa" },
  { name: "Samoa", iso2: "WS", iso3: "WSM", numeric: 882, type: "conditional", region: "Pacific" },
  { name: "San Marino", iso2: "SM", iso3: "SMR", numeric: 674, type: "sanguinis_only", region: "Europe" },
  // São Tomé and Príncipe is in the main country list above (iso3: STP); omitted here to avoid duplicate.
  { name: "Senegal", iso2: "SN", iso3: "SEN", numeric: 686, type: "conditional", region: "West Africa" },
  { name: "Serbia", iso2: "RS", iso3: "SRB", numeric: 688, type: "conditional", region: "Europe" },
  { name: "Seychelles", iso2: "SC", iso3: "SYC", numeric: 690, type: "conditional", region: "East Africa" },
  { name: "Sierra Leone", iso2: "SL", iso3: "SLE", numeric: 694, type: "conditional", region: "West Africa" },
  { name: "Singapore", iso2: "SG", iso3: "SGP", numeric: 702, type: "conditional", region: "Southeast Asia" },
  { name: "Slovakia", iso2: "SK", iso3: "SVK", numeric: 703, type: "conditional", region: "Europe" },
  { name: "Slovenia", iso2: "SI", iso3: "SVN", numeric: 705, type: "conditional", region: "Europe" },
  { name: "Solomon Islands", iso2: "SB", iso3: "SLB", numeric: 90, type: "sanguinis_only", region: "Pacific" },
  { name: "Somalia", iso2: "SO", iso3: "SOM", numeric: 706, type: "sanguinis_only", region: "East Africa" },
  { name: "South Sudan", iso2: "SS", iso3: "SSD", numeric: 728, type: "sanguinis_only", region: "East Africa" },
  { name: "Sri Lanka", iso2: "LK", iso3: "LKA", numeric: 144, type: "conditional", region: "South Asia" },
  { name: "Syria", iso2: "SY", iso3: "SYR", numeric: 760, type: "sanguinis_only", region: "Middle East" },
  { name: "Tajikistan", iso2: "TJ", iso3: "TJK", numeric: 762, type: "conditional", region: "Central Asia" },
  { name: "Timor-Leste", iso2: "TL", iso3: "TLS", numeric: 626, type: "conditional", region: "Southeast Asia" },
  { name: "Togo", iso2: "TG", iso3: "TGO", numeric: 768, type: "conditional", region: "West Africa" },
  { name: "Tonga", iso2: "TO", iso3: "TON", numeric: 776, type: "sanguinis_only", region: "Pacific" },
  { name: "Turkmenistan", iso2: "TM", iso3: "TKM", numeric: 795, type: "conditional", region: "Central Asia" },
  { name: "Uganda", iso2: "UG", iso3: "UGA", numeric: 800, type: "conditional", region: "East Africa" },
  { name: "Uzbekistan", iso2: "UZ", iso3: "UZB", numeric: 860, type: "conditional", region: "Central Asia" },
  { name: "Vanuatu", iso2: "VU", iso3: "VUT", numeric: 548, type: "sanguinis_only", region: "Pacific", summary: "No ordinary birthright citizenship. Vanuatu primarily follows jus sanguinis, not a territorial birthright model.", details: "Vanuatu's citizenship rules are centered on descent from a ni-Vanuatu parent rather than birth on the territory. Limited protections exist around ancestry and nationality status, but ordinary birth in Vanuatu alone does not make the country an unrestricted jus soli state.", law_reference: "Constitution of Vanuatu and Citizenship Act" },
  { name: "Vietnam", iso2: "VN", iso3: "VNM", numeric: 704, type: "sanguinis_only", region: "Southeast Asia" },
  { name: "Yemen", iso2: "YE", iso3: "YEM", numeric: 887, type: "sanguinis_only", region: "Middle East" },
  { name: "Zambia", iso2: "ZM", iso3: "ZMB", numeric: 894, type: "conditional", region: "Southern Africa" },
  { name: "Zimbabwe", iso2: "ZW", iso3: "ZWE", numeric: 716, type: "conditional", region: "Southern Africa" },
  { name: "Palestine", iso2: "PS", iso3: "PSE", numeric: 275, type: "sanguinis_only", region: "Middle East", summary: "No ordinary unrestricted birthright citizenship. Palestinian nationality questions are primarily descent-based and shaped by sovereignty, registration, and legal fragmentation.", details: "Palestinian nationality is not governed by a simple jus soli model. Questions of citizenship, residence, and legal status depend heavily on descent, civil registration, and the fragmented legal environment across Palestinian territories and diaspora communities.", law_reference: "Palestinian nationality practice, civil registration rules, and related legal instruments", risk_level: "high", notable: true }
].map(makeCountry);

BIRTHRIGHT_DATA.countries.push(...SUPPLEMENTAL_COUNTRIES);

const ISO3_NUMERIC_FILL = {
  USA: 840, CAN: 124, MEX: 484, BRA: 76, ARG: 32, CHL: 152, COL: 170, VEN: 862, ECU: 218, PER: 604,
  BOL: 68, PRY: 600, URY: 858, GUY: 328, SUR: 740, GTM: 320, BLZ: 84, HND: 340, SLV: 222, NIC: 558,
  CRI: 188, PAN: 591, CUB: 192, JAM: 388, TTO: 780, DOM: 214, HTI: 332, BRB: 52, ATG: 28, KNA: 659,
  LCA: 662, VCT: 670, GRD: 308, DMA: 212, GBR: 826, IRL: 372, DEU: 276, FRA: 250, BEL: 56, NLD: 528,
  ESP: 724, PRT: 620, LUX: 442, GRC: 300, SWE: 752, FIN: 246, ITA: 380, AUT: 40, CHE: 756, NOR: 578,
  DNK: 208, POL: 616, CZE: 203, HUN: 348, RUS: 643, UKR: 804, LVA: 428, CYP: 196, MLT: 470, PAK: 586,
  IND: 356, BGD: 50, JPN: 392, KOR: 410, CHN: 156, AUS: 36, NZL: 554, FJI: 242, TUV: 798, MYS: 458,
  IDN: 360, THA: 764, KHM: 116, MMR: 104, ISR: 376, JOR: 400, SAU: 682, ARE: 784, KWT: 414, IRN: 364,
  BHR: 48, LBN: 422, TUR: 792, AZE: 31, MNG: 496, TWN: 158, LSO: 426, TCD: 148, TZA: 834, ZAF: 710,
  NAM: 516, NGA: 566, ETH: 231, EGY: 818, MAR: 504, TUN: 788, SDN: 729, GMB: 270, STP: 678
};

BIRTHRIGHT_DATA.countries.forEach(country => {
  if (!Number.isFinite(country.numeric) && ISO3_NUMERIC_FILL[country.iso3]) {
    country.numeric = ISO3_NUMERIC_FILL[country.iso3];
  }
  if (!country.data_origin) {
    country.data_origin = "researched_seed";
  }
  if (!country.autogenerated_fields) {
    country.autogenerated_fields = { summary: false, details: false, law_reference: false };
  }
  if (!country.verification) {
    country.verification = createVerification(country);
  }
  if (country.verification.verification_status === "unverified") {
    country.verification.verification_status = "in_review";
    country.verification.requires_human_review = true;
    country.verification.human_review_reason = getHumanReviewReason(country);
    country.verification.verification_notes = country.verification.verification_notes === "Pending source-backed legal review."
      ? "Triaged for human review after automated verification pass did not reach publication-grade certainty."
      : country.verification.verification_notes;
  }
});

BIRTHRIGHT_DATA.verification = {
  queue_order: VERIFICATION_QUEUE_ORDER,
  source_tier_rules: SOURCE_TIER_RULES,
  acceptance_criteria: REVIEW_ACCEPTANCE_CRITERIA,
  rubric: {
    unrestricted: "Automatic citizenship by birth on the territory except standard diplomatic or hostile-occupation exclusions.",
    conditional: "Citizenship by birth exists only when an additional legal condition is satisfied.",
    sanguinis_only: "Territorial birth alone is not enough; descent controls the default rule.",
    transitional: "The legal rule is actively changing, contested, or awaiting authoritative implementation."
  }
};

BIRTHRIGHT_DATA.stats.total_countries_analyzed = BIRTHRIGHT_DATA.countries.length;
BIRTHRIGHT_DATA.stats.unrestricted = BIRTHRIGHT_DATA.countries.filter(country => country.type === "unrestricted").length;
BIRTHRIGHT_DATA.stats.conditional = BIRTHRIGHT_DATA.countries.filter(country => country.type === "conditional").length;
BIRTHRIGHT_DATA.stats.sanguinis_only = BIRTHRIGHT_DATA.countries.filter(country => country.type === "sanguinis_only").length;
BIRTHRIGHT_DATA.stats.transitional = BIRTHRIGHT_DATA.countries.filter(country => country.type === "transitional").length;
BIRTHRIGHT_DATA.stats.total_verified = BIRTHRIGHT_DATA.countries.filter(country => country.verification.verification_status === "verified").length;
BIRTHRIGHT_DATA.stats.total_in_review = BIRTHRIGHT_DATA.countries.filter(country => country.verification.verification_status === "in_review").length;
BIRTHRIGHT_DATA.stats.total_unverified = BIRTHRIGHT_DATA.countries.filter(country => country.verification.verification_status === "unverified").length;
BIRTHRIGHT_DATA.stats.note = "Counts below are computed from the currently loaded local dataset. Supplemental country entries added in April 2026 use concise research summaries to complete global coverage and should still be spot-checked against primary nationality laws for publication-grade work.";

// Make available globally for non-module environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = BIRTHRIGHT_DATA;
}
