import React from "react";
import { getCitation, citationUrl } from "../lib/citations";

/**
 * Reference-style study list shared by the PRISMA Study List page and the
 * "Studies included" popup. Each entry reads like a bibliography row —
 * linked title, authors, bold year with the outbound identifier link, and
 * the NCT id — separated by hairline dividers, matching the reference design.
 */
export function CitationList({ trialNames }: { trialNames: string[] }) {
  return (
    <ul className="divide-y divide-gray-100">
      {trialNames.map((trialName) => {
        const c = getCitation(trialName);
        if (!c) {
          return (
            <li key={trialName} className="py-4">
              <p className="text-[14px] font-semibold text-gray-900 font-['Inter',sans-serif]">{trialName}</p>
              <p className="text-[12px] text-gray-400 font-['Inter',sans-serif] mt-1">
                No citation on file for this record in the prototype.
              </p>
            </li>
          );
        }
        return (
          <li key={trialName} className="py-4 flex flex-col gap-1.5 font-['Inter',sans-serif]">
            <a
              href={citationUrl(c)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] leading-snug font-medium text-[#2E75B5] hover:underline w-fit"
            >
              {c.title ?? `${c.trialName} — ${c.journal}.`}
            </a>
            <p className="text-[13px] italic text-gray-600 leading-snug">{c.authors}</p>
            <p className="text-[12px] text-gray-500 flex flex-wrap items-center gap-x-2">
              <span className="font-bold text-gray-800">{c.year}</span>
              <span aria-hidden>–</span>
              <a
                href={citationUrl(c)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#2E75B5] hover:underline"
              >
                {c.pmid ? `PMID:${c.pmid}` : "View on PubMed"}
              </a>
              {c.nct && <span className="text-gray-400">{c.nct}</span>}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
