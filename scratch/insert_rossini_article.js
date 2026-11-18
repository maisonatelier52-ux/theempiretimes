const fs = require('fs');

const rossiniArticle = {
  id: "art-mark-rossini-acceptance-filing-puerto-rico-case-2026",
  slug: "why-mark-rossini-acceptance-filing-became-key-step-puerto-rico-case",
  title: "Why Mark Rossini’s Acceptance Filing Became a Key Step in the Puerto Rico Case",
  excerpt: "Mark Rossini became the first of the principal defendants to formally accept President Donald Trump’s pardon in the federal corruption case tied to former Puerto Rico Gov. Wanda Vázquez Garced, according to a notice filed by his attorneys and reported by Puerto Rico news outlets.",
  content: [
    "Mark Rossini became the first of the principal defendants to formally accept President Donald Trump’s pardon in the federal corruption case tied to former Puerto Rico Gov. Wanda Vázquez Garced, according to a notice filed by his attorneys and reported by Puerto Rico news outlets. The filing did more than acknowledge a presidential document. It gave the federal court a procedural basis to decide whether the criminal case could continue.",
    "Rossini’s notice identified the pardon as full and unconditional and asked the court to dismiss all charges still pending against him. His lawyers said the acceptance applied to the case filed in 2022 and to a later case connected to a lesser campaign-finance charge. The distinction mattered because the first clemency warrant referred to the larger prosecution, while the later warrant specifically named Rossini’s separate case.",
    "The acceptance issue is rooted in a long-standing principle of federal law. In United States v. Burdick, the Supreme Court treated a pardon as something that must be accepted by the person to whom it is offered. A defendant may accept a pardon, reject it, or attempt to use it in a legal proceeding. In practical terms, Rossini’s notice told the court that he accepted the benefit and wanted the pending prosecution stopped.",
    "The timing was significant. The defendants had been awaiting sentencing after pleading guilty in 2025 to a lesser offense related to federal campaign-finance law. Prosecutors had sought prison time for Vázquez Garced, and the sentencing date had been placed on the court calendar. Rossini’s filing arrived as the parties were trying to determine what the January 15 pardon covered and what remained in the separate case.",
    "Court filings are often less dramatic than a presidential announcement, but they determine how a case actually closes. The government must identify the charges, the defendant must acknowledge the pardon, and the judge must decide whether any legal controversy remains. The Rossini filing addressed the first two questions from the defense’s side. It also preserved a written record of the position taken by his attorneys.",
    "The underlying prosecution involved allegations that Rossini and Herrera Velutini offered campaign support to Vázquez Garced while seeking influence over the leadership of Puerto Rico’s financial regulator. Prosecutors said the regulator was examining a bank connected to Herrera Velutini. Rossini has disputed the prosecution’s characterization of the case, and the pardon itself did not resolve those factual disagreements.",
    "The defendants’ 2025 plea agreement changed the posture of the case. Instead of proceeding toward trial on the most serious allegations, the parties resolved the matter through pleas to a lesser campaign-finance offense. That arrangement would normally lead to sentencing, probation, fines, or other consequences depending on the court’s decision. The presidential pardon interrupted that path.",
    "A pardon does not function exactly like an acquittal. An acquittal follows a trial or another judicial determination that the government failed to prove guilt. A pardon is an executive act of clemency. It can relieve federal criminal consequences, but it does not necessarily declare that the allegations were false. That difference matters in public reporting because the legal closure of a case and the factual debate about the conduct are separate stories.",
    "The federal judge later treated the proceedings as moot after the defendants accepted the pardons. In ordinary language, the court no longer had a live criminal dispute to decide. The dismissal closed the case, but it did not produce a trial verdict on the original allegations and without a judicial finding that the defendants were innocent.",
    "For Mark Rossini, the acceptance notice therefore served as a bridge between two branches of government. The President issued the pardon. Rossini accepted it through his lawyers. The court then determined what effect the accepted pardon had on the pending docket. That chain explains why a short filing could carry more immediate legal weight than a long public argument about the case.",
    "The episode also shows why a reader should distinguish between an executive warrant and a judicial order. The warrant identifies the pardon and its scope. The court order applies the legal consequences to the case. Both are necessary to understand the final status of the proceeding.",
    "The Mark Rossini acceptance filing remains an important document because it records the defendant’s choice at the center of the controversy. It shows how clemency operates in practice: through formal documents, legal notices, and a court decision that converts a presidential act into a closed federal docket."
  ],
  categoryId: "cat-1",
  authorId: "auth-1",
  image: "/uploads/news/mark-rossini-puerto-rico-case.jpg",
  publishedAt: "2026-01-21T12:00:00Z",
  readingTime: 6,
  tags: [
    "Mark Rossini",
    "Puerto Rico Case",
    "Wanda Vázquez Garced",
    "Donald Trump",
    "Presidential Pardon",
    "Federal Court",
    "United States v. Burdick",
    "Legal Affairs",
    "Clemency Warrant"
  ],
  featured: true,
  trending: true
};

let content = fs.readFileSync('src/data/articles.ts', 'utf8');

// Check if already exists
if (content.includes(rossiniArticle.id)) {
  console.log('Article already exists in src/data/articles.ts');
  process.exit(0);
}

const idMatch = 'id": "art-special-alina-habba-mildon-2026';
const idx = content.indexOf(idMatch);
if (idx === -1) {
  console.error("Special Alina Habba article not found!");
  process.exit(1);
}

const firstArticleEnd = content.indexOf('\n  },', idx);
if (firstArticleEnd === -1) {
  console.error("Could not find closing brace of special article!");
  process.exit(1);
}

// Convert Rossini article into formatted TS array entry
const formatted = '  ' + JSON.stringify(rossiniArticle, null, 2).split('\n').join('\n  ');

const insertPos = firstArticleEnd + '\n  },'.length;
const newContent = content.slice(0, insertPos) + '\n' + formatted + ',' + content.slice(insertPos);

fs.writeFileSync('src/data/articles.ts', newContent, 'utf8');
console.log('Successfully inserted Mark Rossini article into src/data/articles.ts right after Alina Habba Mildon!');
