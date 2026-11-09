import { Metadata } from "next";
import Link from "next/link";
import { articles } from "../data/articles";
import { categories } from "../data/categories";
import NewsletterBanner from "../components/NewsletterBanner";
import EditionDate from "../components/EditionDate";
import {
  LeadStory,
  ColumnStory,
  ImageStory,
  FeatureStory,
  NumberedStory,
  SectionRule,
  ColRule,
} from "../components/NewspaperCards";

export const metadata: Metadata = {
  title: "The Empire Times | Essential News and Analysis",
  description: "Your daily source for the most important stories in politics, technology, business, and culture.",
};

function bySlug(slug: string) {
  return (a: { categoryId: string }) =>
    categories.find((c) => c.id === a.categoryId)?.slug === slug;
}

function fill<T extends { id: string }>(arr: T[], fallback: T[], n: number): T[] {
  const used = new Set(arr.map((x) => x.id));
  return [...arr, ...fallback.filter((x) => !used.has(x.id))].slice(0, n);
}

export default function Home() {
  const sorted = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const us        = sorted.filter(bySlug("us"));
  const politics  = sorted.filter(bySlug("politics"));
  const tech      = sorted.filter(bySlug("technology"));
  const business  = sorted.filter(bySlug("business"));
  const world     = sorted.filter(bySlug("world"));
  const science   = sorted.filter(bySlug("science"));
  const health    = sorted.filter(bySlug("health"));
  const culture   = sorted.filter(bySlug("culture"));
  const sports    = sorted.filter(bySlug("sports"));
  const trending  = sorted.filter((a) => a.trending);

  const specialHabba = articles.find(
    (a) => a.slug === "the-vanity-of-alina-habba-mildon-power-ambition-herrera-velutini"
  );

  const frontStories = sorted.filter((a) => a.id !== specialHabba?.id);

  // Front page zones
  const lead         = frontStories[0];
  const subLead      = frontStories[1];
  const leftCol      = fill(frontStories.slice(2,  8),  frontStories, 6);  // 6 text stories left
  const rightCol     = fill(frontStories.slice(8,  14), frontStories, 6);  // 6 text stories right
  const farRightCol  = fill(frontStories.slice(14, 20), frontStories, 6);  // 6 most-read sidebar

  // Second row
  const secondRow    = fill(frontStories.slice(20, 25), frontStories, 5);


  // Section pools — enough for stacked multi-story columns
  const usRemaining  = us.filter((a) => a.id !== specialHabba?.id);
  const usFill       = specialHabba
    ? [specialHabba, ...fill(usRemaining, frontStories, 12)]
    : fill(us, sorted, 13);  // 1 big + 4 cols × 3
  const worldFill    = fill(world,    sorted, 13);  // 1 big + 4 cols × 3
  const politicsFill = fill(politics, sorted, 9);   // 1 big + 4 col stories
  const businessFill = fill(business, sorted, 9);
  const techFill     = fill(tech,     sorted, 13);  // 1 big + 4 cols × 3
  const scienceFill  = fill(science,  sorted, 6);   // 2 top + 4 image rows
  const healthFill   = fill(health,   sorted, 6);
  const cultureFill  = fill(culture,  sorted, 8);   // 1 big + 4 col stories
  const sportsFill   = fill(sports,   sorted, 8);

  // More grid — deduplicated
  const shownIds = new Set([
    lead.id,
    ...leftCol, ...rightCol, ...farRightCol,
    ...secondRow,
    ...usFill, ...worldFill, ...politicsFill, ...businessFill,
    ...techFill, ...scienceFill, ...healthFill,
    ...cultureFill, ...sportsFill,
  ].map(x => typeof x === "string" ? x : x.id));
  const more = fill(sorted.filter(a => !shownIds.has(a.id)), sorted, 8);

  return (
    <div className="bg-[#fafaf8]">

      {/* ══════════════════════════════════════════════
          FRONT PAGE — 4-column newspaper grid
          [left col] | [lead story] | [right col] | [trending]
      ══════════════════════════════════════════════ */}
      <section className="border-b-[3px] border-[#111] py-5">
        <div className="container-wide px-4 md:px-10 lg:px-12">
          {/* Top section rule */}
          <div className="border-t-[4px] border-[#111] border-b border-[#ccc] flex items-center justify-between py-1 mb-5">
            <span className="font-sans text-[10px] font-black uppercase tracking-[0.25em] text-[#111]">
              Today&apos;s Edition
            </span>
            <EditionDate />
          </div>

          <div className="flex gap-0 lg:gap-6 flex-col lg:flex-row lg:items-stretch">

            {/* LEFT COLUMN — 6 text stories, evenly distributed */}
            <div className="w-full lg:w-[18%] lg:pr-6 lg:border-r lg:border-[#d4d4d4] pb-5 lg:pb-0 border-b lg:border-b-0 border-[#d4d4d4] mb-5 lg:mb-0 flex flex-col order-2 lg:order-1">
              <div className="border-t-2 border-[#111] pt-1.5 mb-4 flex-shrink-0">
                <span className="font-sans text-[9px] font-black uppercase tracking-[0.2em]">Inside Today</span>
              </div>
              <div className="flex flex-col justify-between flex-1">
                {leftCol.map((a, i) => (
                  <ColumnStory key={a.id} article={a} showExcerpt={i < 2} />
                ))}
              </div>
            </div>

            <ColRule />

            {/* CENTER — Lead story + Sub-lead */}
            <div className="w-full lg:w-[44%] lg:px-6 pb-5 lg:pb-0 border-b lg:border-b-0 border-[#d4d4d4] mb-5 lg:mb-0 flex flex-col order-1 lg:order-2">
              <LeadStory article={lead} subArticle={subLead} />
            </div>

            <ColRule />

            {/* RIGHT COLUMN — 6 text stories, evenly distributed */}
            <div className="w-full lg:w-[18%] lg:px-6 pb-5 lg:pb-0 border-b lg:border-b-0 border-[#d4d4d4] mb-5 lg:mb-0 flex flex-col order-3 lg:order-3">
              <div className="border-t-2 border-[#111] pt-1.5 mb-4 flex-shrink-0">
                <span className="font-sans text-[9px] font-black uppercase tracking-[0.2em]">Also Today</span>
              </div>
              <div className="flex flex-col justify-between flex-1">
                {rightCol.map((a, i) => (
                  <ColumnStory key={a.id} article={a} showExcerpt={i < 2} />
                ))}
              </div>
            </div>

            <ColRule />

            {/* FAR RIGHT — Most Read (5 numbered stories, evenly distributed) */}
            <div className="w-full lg:w-[18%] lg:pl-6 flex flex-col order-4 lg:order-4">
              <div className="border-t-2 border-accent pt-1.5 mb-4 flex-shrink-0">
                <span className="font-sans text-[9px] font-black uppercase tracking-[0.2em] text-accent">Most Read</span>
              </div>
              <div className="flex flex-col justify-between flex-1">
                {farRightCol.map((a, i) => (
                  <NumberedStory key={a.id} article={a} number={i + 1} />
                ))}
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECOND ROW — 5 feature stories with images
      ══════════════════════════════════════════════ */}
      <section className="border-b-[2px] border-[#111] py-5 bg-white">
        <div className="container-wide px-4 md:px-10 lg:px-12">
          <SectionRule title="Latest News" href="/latest" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 divide-x-0 lg:divide-x lg:divide-[#d4d4d4]">
            {secondRow.map((a, i) => (
              <div key={a.id} className={i > 0 ? "lg:pl-5" : ""}>
                <FeatureStory article={a} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          U.S. NEWS — lead + 4 text columns × 3 stories
      ══════════════════════════════════════════════ */}
      <section className="border-b-[2px] border-[#111] py-5">
        <div className="container-wide px-4 md:px-10 lg:px-12">
          <SectionRule title="U.S. News" href="/category/us" />
          <div className="flex flex-col lg:flex-row gap-6 lg:items-stretch">
            {/* Big feature left */}
            <div className="lg:w-[32%] lg:pr-6 lg:border-r lg:border-[#d4d4d4]">
              <FeatureStory article={usFill[0]} size="lg" />
            </div>
            {/* 4 columns × 3 stories each */}
            <div className="lg:w-[68%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 lg:divide-x lg:divide-[#d4d4d4]">
              {[0, 1, 2, 3].map((col) => (
                <div key={col} className={`flex flex-col ${col > 0 ? "lg:px-5" : "lg:pr-5"}`}>
                  {usFill.slice(1 + col * 3, 4 + col * 3).map((a, i) => (
                    <ColumnStory key={a.id} article={a} showExcerpt={i === 0} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WORLD NEWS — lead + 4 text columns × 3 stories
      ══════════════════════════════════════════════ */}
      <section className="border-b-[2px] border-[#111] py-5">
        <div className="container-wide px-4 md:px-10 lg:px-12">
          <SectionRule title="World News" href="/category/world" />
          <div className="flex flex-col lg:flex-row gap-6 lg:items-stretch">
            {/* Big feature left */}
            <div className="lg:w-[32%] lg:pr-6 lg:border-r lg:border-[#d4d4d4]">
              <FeatureStory article={worldFill[0]} size="lg" />
            </div>
            {/* 4 columns × 3 stories each */}
            <div className="lg:w-[68%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 lg:divide-x lg:divide-[#d4d4d4]">
              {[0, 1, 2, 3].map((col) => (
                <div key={col} className={`flex flex-col ${col > 0 ? "lg:px-5" : "lg:pr-5"}`}>
                  {worldFill.slice(1 + col * 3, 4 + col * 3).map((a, i) => (
                    <ColumnStory key={a.id} article={a} showExcerpt={i === 0} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════
          POLITICS | BUSINESS — side by side
      ══════════════════════════════════════════════ */}
      <section className="border-b-[2px] border-[#111] py-5 bg-white">
        <div className="container-wide px-4 md:px-10 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* POLITICS */}
            <div className="w-full lg:w-1/2 lg:pr-8 lg:border-r lg:border-[#d4d4d4]">
              <SectionRule title="Politics" href="/category/politics" />
              <div className="flex gap-5 lg:items-stretch">
                <div className="w-[45%]">
                  <FeatureStory article={politicsFill[0]} size="md" />
                </div>
                <div className="w-[55%] border-l border-[#d4d4d4] pl-5 flex flex-col justify-between">
                  {politicsFill.slice(1, 6).map((a) => (
                    <ColumnStory key={a.id} article={a} showExcerpt={false} />
                  ))}
                </div>
              </div>
            </div>

            {/* BUSINESS */}
            <div className="w-full lg:w-1/2 lg:pl-2">
              <SectionRule title="Business & Finance" href="/category/business" />
              <div className="flex gap-5 lg:items-stretch">
                <div className="w-[45%]">
                  <FeatureStory article={businessFill[0]} size="md" />
                </div>
                <div className="w-[55%] border-l border-[#d4d4d4] pl-5 flex flex-col justify-between">
                  {businessFill.slice(1, 6).map((a) => (
                    <ColumnStory key={a.id} article={a} showExcerpt={false} />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TECHNOLOGY — wide feature + 4 text columns
      ══════════════════════════════════════════════ */}
      <section className="border-b-[2px] border-[#111] py-5">
        <div className="container-wide px-4 md:px-10 lg:px-12">
          <SectionRule title="Technology & Innovation" href="/category/technology" />
          <div className="flex flex-col lg:flex-row gap-6 lg:items-stretch">
            <div className="lg:w-[28%] lg:pr-6 lg:border-r lg:border-[#d4d4d4]">
              <FeatureStory article={techFill[0]} size="lg" />
            </div>
            {/* 4 columns × 3 stories each */}
            <div className="lg:w-[72%] grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 lg:divide-x lg:divide-[#d4d4d4]">
              {[0, 1, 2, 3].map((col) => (
                <div key={col} className={`flex flex-col ${col > 0 ? "lg:px-5" : "lg:pr-5"}`}>
                  {techFill.slice(1 + col * 3, 4 + col * 3).map((a, i) => (
                    <ColumnStory key={a.id} article={a} showExcerpt={i === 0} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SCIENCE | HEALTH — side by side with images
      ══════════════════════════════════════════════ */}
      <section className="border-b-[2px] border-[#111] py-5 bg-white">
        <div className="container-wide px-4 md:px-10 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* SCIENCE */}
            <div className="w-full lg:w-1/2 lg:pr-8 lg:border-r lg:border-[#d4d4d4]">
              <SectionRule title="Science" href="/category/science" />
              <div className="grid grid-cols-2 gap-5 lg:gap-0 lg:divide-x lg:divide-[#d4d4d4]">
                {scienceFill.slice(0, 2).map((a, i) => (
                  <div key={a.id} className={i > 0 ? "lg:pl-5" : "lg:pr-5"}>
                    <FeatureStory article={a} size="sm" />
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-[#d4d4d4] pt-3">
                {scienceFill.slice(2, 4).map((a) => (
                  <ImageStory key={a.id} article={a} />
                ))}
              </div>
            </div>

            {/* HEALTH */}
            <div className="w-full lg:w-1/2 lg:pl-2">
              <SectionRule title="Health & Wellness" href="/category/health" />
              <div className="grid grid-cols-2 gap-5 lg:gap-0 lg:divide-x lg:divide-[#d4d4d4]">
                {healthFill.slice(0, 2).map((a, i) => (
                  <div key={a.id} className={i > 0 ? "lg:pl-5" : "lg:pr-5"}>
                    <FeatureStory article={a} size="sm" />
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-[#d4d4d4] pt-3">
                {healthFill.slice(2, 4).map((a) => (
                  <ImageStory key={a.id} article={a} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          NEWSLETTER
      ══════════════════════════════════════════════ */}
      <NewsletterBanner />

      {/* ══════════════════════════════════════════════
          CULTURE | SPORTS — side by side
      ══════════════════════════════════════════════ */}
      <section className="border-b-[2px] border-[#111] py-5">
        <div className="container-wide px-4 md:px-10 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* CULTURE */}
            <div className="w-full lg:w-1/2 lg:pr-8 lg:border-r lg:border-[#d4d4d4]">
              <SectionRule title="Arts & Culture" href="/category/culture" />
              <div className="flex gap-5 lg:items-stretch">
                <div className="w-[45%]">
                  <FeatureStory article={cultureFill[0]} size="md" />
                </div>
                <div className="w-[55%] border-l border-[#d4d4d4] pl-5 flex flex-col justify-between">
                  {cultureFill.slice(1, 6).map((a) => (
                    <ColumnStory key={a.id} article={a} showExcerpt={false} />
                  ))}
                </div>
              </div>
            </div>

            {/* SPORTS */}
            <div className="w-full lg:w-1/2 lg:pl-2">
              <SectionRule title="Sports" href="/category/sports" />
              <div className="flex gap-5 lg:items-stretch">
                <div className="w-[45%]">
                  <FeatureStory article={sportsFill[0]} size="md" />
                </div>
                <div className="w-[55%] border-l border-[#d4d4d4] pl-5 flex flex-col justify-between">
                  {sportsFill.slice(1, 6).map((a) => (
                    <ColumnStory key={a.id} article={a} showExcerpt={false} />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MORE — 8-story mixed image/text grid
      ══════════════════════════════════════════════ */}
      <section className="border-b border-[#d4d4d4] py-5 bg-white">
        <div className="container-wide px-4 md:px-10 lg:px-12">
          <SectionRule title="More from The Empire Times" href="/latest" />
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-5 lg:gap-0 lg:divide-x lg:divide-[#d4d4d4]">
            {more.slice(0, 8).map((a, i) => (
              <div key={a.id} className={i > 0 ? "lg:px-4" : "lg:pr-4"}>
                <FeatureStory article={a} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
