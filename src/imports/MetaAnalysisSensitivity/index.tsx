import svgPaths from "./svg-m614jpd9rn";
import imgScreenshot20260423At11059Pm1 from "./dac3bbdd84bfcce72f7924ffe3c61611b54e6a8e.png";

function Icon() {
  return (
    <div className="absolute bg-[#2e75b6] h-[36px] left-0 rounded-[4px] top-[6px] w-[32px]" data-name="Icon">
      <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold h-[20px] leading-[normal] left-[9px] not-italic text-[16px] text-white top-[8px] w-[16px]">L</p>
    </div>
  );
}

function LogoWrap() {
  return (
    <div className="absolute bg-white h-[48px] left-[19px] top-[11px] w-[212px]" data-name="LogoWrap">
      <Icon />
      <div className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold h-[20px] leading-[0] left-[40px] not-italic text-[#1a1a1a] text-[8px] top-[8px] w-[168px]">
        <p className="leading-[12px] mb-0">LIVING INTERACTIVE</p>
        <p className="leading-[12px]">EVIDENCE SYNTHESIS</p>
      </div>
    </div>
  );
}

function NavHl() {
  return (
    <div className="absolute h-[40px] left-[963px] rounded-[8px] top-[15px] w-[160px]" data-name="NavHL">
      <p className="[word-break:break-word] absolute font-['Articulat_CF:Regular',sans-serif] h-[20px] leading-[normal] left-[14px] not-italic text-[#555] text-[13px] top-[12px] w-[140px]">Living Guidelines</p>
    </div>
  );
}

function NavHl1() {
  return <div className="absolute bg-[#e4f0fe] h-[40px] left-[761px] rounded-[8px] top-[15px] w-[174px]" data-name="NavHL" />;
}

function UniversalNavbar() {
  return (
    <div className="bg-white border border-[#e5e7eb] border-solid h-[72px] overflow-clip pointer-events-auto sticky top-0 w-[1440px]" data-name="Universal Navbar">
      <LogoWrap />
      <NavHl />
      <NavHl1 />
      <p className="[word-break:break-word] absolute font-['Articulat_CF:Regular',sans-serif] h-[20px] leading-[normal] left-[1123px] not-italic text-[#555] text-[13px] top-[27px] w-[70px]">About Us</p>
      <p className="[word-break:break-word] absolute font-['Articulat_CF:Regular',sans-serif] h-[20px] leading-[normal] left-[1225px] not-italic text-[#555] text-[13px] top-[27px] w-[90px]">Contact Us</p>
      <p className="[word-break:break-word] absolute font-['Articulat_CF:Medium',sans-serif] h-[20px] leading-[normal] left-[770px] not-italic text-[#1a1a1a] text-[13px] top-[27px] w-[200px]">Living Systematic Reviews</p>
    </div>
  );
}

function Frame66() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] not-italic relative shrink-0 w-[370px]">
      <p className="font-['Articulat_CF:Regular',sans-serif] relative shrink-0 text-[16px] text-black w-full">Systematic Review - mCRPC</p>
      <p className="font-['Benton_Modern_D:SemiBold',sans-serif] relative shrink-0 text-[#101828] text-[48px] w-full">Pairwise Meta-Analysis</p>
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex items-center justify-center p-[10px] relative shrink-0">
      <p className="[word-break:break-word] font-['Articulat_CF:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-black w-[647px]">Results are summarized as forest plots for primary analysis, sensitivity analysis, and subgroup pairwise meta-analysis. Users can choose to view results for their outcome of interest.</p>
    </div>
  );
}

function Frame68() {
  return (
    <div className="absolute content-stretch flex gap-[75px] items-start left-[40px] top-[39px]">
      <Frame66 />
      <Frame67 />
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute h-[37px] left-px rounded-[20px] top-px w-[1101px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip pl-[32px] pr-[12px] py-[8px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(85,85,85,0.54)] tracking-[-0.1504px] whitespace-nowrap">Search patient outcomes, treatment options, etc</p>
      </div>
      <div aria-hidden className="absolute border border-[rgba(3,103,195,0.41)] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)]" />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[11px] size-[16px] top-[12px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p107a080} id="Vector" stroke="var(--stroke-0, #0367C3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14 14L11.1333 11.1333" id="Vector_2" stroke="var(--stroke-0, #0367C3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[38px] relative shrink-0 w-full" data-name="Container">
      <TextInput />
      <Icon1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[32px] relative rounded-[20px] shrink-0" data-name="Frame">
      <div className="[word-break:break-word] content-stretch flex gap-[4px] items-center leading-[normal] not-italic overflow-clip px-[16px] relative rounded-[inherit] size-full whitespace-nowrap">
        <p className="font-['Articulat_CF:Medium',sans-serif] relative shrink-0 text-[#000105] text-[11px]">Type of therapy</p>
        <p className="font-['Inter:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal relative shrink-0 text-[#2e75b6] text-[20px]">▾</p>
      </div>
      <div aria-hidden className="absolute border border-[#2e75b5] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Frame1() {
  return (
    <div className="h-[32px] relative rounded-[20px] shrink-0" data-name="Frame">
      <div className="[word-break:break-word] content-stretch flex gap-[4px] items-center leading-[normal] not-italic overflow-clip px-[16px] relative rounded-[inherit] size-full whitespace-nowrap">
        <p className="font-['Articulat_CF:Medium',sans-serif] relative shrink-0 text-[#000105] text-[11px]">Treatment class</p>
        <p className="font-['Inter:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal relative shrink-0 text-[#2e75b6] text-[20px]">▾</p>
      </div>
      <div aria-hidden className="absolute border border-[#2e75b5] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-[32px] relative rounded-[20px] shrink-0" data-name="Frame">
      <div className="[word-break:break-word] content-stretch flex gap-[4px] items-center leading-[normal] not-italic overflow-clip px-[16px] relative rounded-[inherit] size-full whitespace-nowrap">
        <p className="font-['Articulat_CF:Medium',sans-serif] relative shrink-0 text-[#000105] text-[11px]">Treatment</p>
        <p className="font-['Inter:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal relative shrink-0 text-[#2e75b6] text-[20px]">▾</p>
      </div>
      <div aria-hidden className="absolute border border-[#2e75b5] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="h-[32px] relative rounded-[20px] shrink-0" data-name="Frame">
      <div className="[word-break:break-word] content-stretch flex gap-[4px] items-center leading-[normal] not-italic overflow-clip px-[16px] relative rounded-[inherit] size-full whitespace-nowrap">
        <p className="font-['Articulat_CF:Medium',sans-serif] relative shrink-0 text-[#000105] text-[11px]">Control</p>
        <p className="font-['Inter:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal relative shrink-0 text-[#2e75b6] text-[20px]">▾</p>
      </div>
      <div aria-hidden className="absolute border border-[#2e75b5] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Frame4() {
  return (
    <div className="h-[32px] relative rounded-[20px] shrink-0" data-name="Frame">
      <div className="[word-break:break-word] content-stretch flex gap-[4px] items-center leading-[normal] not-italic overflow-clip px-[16px] relative rounded-[inherit] size-full whitespace-nowrap">
        <p className="font-['Articulat_CF:Medium',sans-serif] relative shrink-0 text-[#000105] text-[11px]">Line of therapy</p>
        <p className="font-['Inter:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal relative shrink-0 text-[#2e75b6] text-[20px]">▾</p>
      </div>
      <div aria-hidden className="absolute border border-[#2e75b5] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Frame5() {
  return (
    <div className="h-[32px] relative rounded-[20px] shrink-0" data-name="Frame">
      <div className="[word-break:break-word] content-stretch flex gap-[4px] items-center leading-[normal] not-italic overflow-clip px-[16px] relative rounded-[inherit] size-full whitespace-nowrap">
        <p className="font-['Articulat_CF:Medium',sans-serif] relative shrink-0 text-[#000105] text-[11px]">Trial phase</p>
        <p className="font-['Inter:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal relative shrink-0 text-[#2e75b6] text-[20px]">▾</p>
      </div>
      <div aria-hidden className="absolute border border-[#2e75b5] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Frame69() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame />
      <Frame1 />
      <Frame2 />
      <Frame3 />
      <Frame4 />
      <Frame5 />
    </div>
  );
}

function Frame65() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[40px] top-[203px] w-[1102px]">
      <Container />
      <Frame69 />
    </div>
  );
}

function PageContent() {
  return (
    <div className="absolute backdrop-blur-[2px] h-[281px] left-[-2px] rounded-[20px] top-[-2px] w-[1171px]" style={{ backgroundImage: "linear-gradient(180.024deg, rgba(133, 200, 250, 0.27) 0%, rgba(255, 255, 255, 0.27) 99.911%)" }} data-name="Page content">
      <Frame68 />
      <Frame65 />
    </div>
  );
}

function Frame70() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center pr-[10px] py-[10px] relative shrink-0">
      <p className="[word-break:break-word] font-['Articulat_CF:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#101828] text-[32px] whitespace-nowrap">Sensitivity Analysis</p>
    </div>
  );
}

function ForestPlotTitle() {
  return (
    <div className="content-stretch flex items-end pb-[6px] relative shrink-0" data-name="Forest Plot title">
      <p className="[word-break:break-word] font-['Articulat_CF:Medium',sans-serif] h-[41px] leading-[0] not-italic relative shrink-0 text-[#2e75b5] text-[20px] w-[933px]">
        <span className="leading-[normal]">{`Overall Survival | `}</span>
        <span className="leading-[normal]">BRCA positive (cohort 1)</span>
      </p>
    </div>
  );
}

function ForestPlotDropDown() {
  return (
    <div className="bg-white h-[52px] relative shrink-0 w-full" data-name="Forest Plot Drop down">
      <div className="content-stretch flex items-start pb-[8px] pl-[21px] pr-[853px] pt-[7px] relative size-full">
        <ForestPlotTitle />
      </div>
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex gap-[32px] items-end pb-[7px] relative shrink-0 w-full">
      <div aria-hidden className="absolute border-[#d0d5dc] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#101318] text-[12px] w-[135px]">Study</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#101318] text-[12px] w-[212px]">Trial Name</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#101318] text-[12px] whitespace-nowrap">HR</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#101318] text-[12px] whitespace-nowrap">95% CI</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#101318] text-[12px] whitespace-nowrap">Relative weight</p>
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex gap-[28px] items-center py-[13px] relative shrink-0 w-full">
      <div aria-hidden className="absolute border-[#eaedf1] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#0663ad] text-[13px] w-[135px]">Motzer et al 2024</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] w-[220px]">CHECKMATE-914 PART B</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] whitespace-nowrap">0.87</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] w-[78px]">[0.62; 1.22]</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] whitespace-nowrap">14.3%</p>
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex gap-[32px] items-center py-[13px] relative shrink-0 w-full">
      <div aria-hidden className="absolute border-[#eaedf1] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#0663ad] text-[13px] w-[135px]">Choueiri et al 2024</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] w-[212px]">KEYNOTE-564</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] whitespace-nowrap">0.72</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] whitespace-nowrap">[0.59; 0.87]</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] whitespace-nowrap">34.1%</p>
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex gap-[32px] items-center py-[13px] relative shrink-0 w-full">
      <div aria-hidden className="absolute border-[#eaedf1] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#0663ad] text-[13px] w-[135px]">Motzer et al 2023</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] w-[212px]">CHECKMATE-914 PART A</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] whitespace-nowrap">0.92</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] w-[69px]">[0.71; 1.19]</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] whitespace-nowrap">22.1%</p>
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex gap-[32px] items-center py-[13px] relative shrink-0 w-full">
      <div aria-hidden className="absolute border-[#101318] border-b-3 border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#0663ad] text-[13px] w-[135px]">Pal et al 2022</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] w-[212px]">IMMOTION010</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] whitespace-nowrap">0.93</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] w-[69px]">[0.75; 1.15]</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] whitespace-nowrap">29.6%</p>
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex gap-[38px] items-center py-[13px] relative shrink-0 w-full">
      <div aria-hidden className="absolute border-[#eaedf1] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] w-[369px]">Random effects model</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] whitespace-nowrap">0.84</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] whitespace-nowrap">[0.74; 0.96]</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] whitespace-nowrap">100%</p>
    </div>
  );
}

function Frame55() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[23px] top-[12px] w-[667px]">
      <Frame49 />
      <Frame50 />
      <Frame51 />
      <Frame52 />
      <Frame53 />
      <Frame54 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#333c48] text-[12px] w-full">Heterogeneity: I² = 21.2%; τ² = 0.0041; p = 0.2828</p>
    </div>
  );
}

function ForestPlotDataTable() {
  return (
    <div className="bg-white h-[326px] overflow-clip relative rounded-[8px] shrink-0 w-[713px]" data-name="Forest Plot Data Table">
      <Frame55 />
    </div>
  );
}

function ForestPlotImg() {
  return (
    <div className="h-[326px] relative shrink-0 w-[461px]" data-name="Forest Plot img">
      <div className="absolute h-[290px] left-[-8px] top-[-16px] w-[404px]" data-name="Screenshot 2026-04-23 at 1.10.59 PM 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[103%] left-[-1.26%] max-w-none top-[-3%] w-[101.26%]" src={imgScreenshot20260423At11059Pm1} />
        </div>
      </div>
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <ForestPlotDataTable />
      <ForestPlotImg />
    </div>
  );
}

function ForestPlotSection() {
  return (
    <div className="content-stretch flex flex-col h-[378px] items-start relative shrink-0 w-full" data-name="Forest Plot section">
      <ForestPlotDropDown />
      <Frame59 />
    </div>
  );
}

function ForestPlotTitle1() {
  return (
    <div className="content-stretch flex items-end pb-[6px] relative shrink-0" data-name="Forest Plot title">
      <p className="[word-break:break-word] font-['Articulat_CF:Medium',sans-serif] h-[41px] leading-[0] not-italic relative shrink-0 text-[#2e75b5] text-[20px] w-[933px]">
        <span className="leading-[normal]">{`Progression-free Survival | `}</span>
        <span className="leading-[normal]">BRCA positive (cohort 1)</span>
      </p>
    </div>
  );
}

function ForestPlotDropDown1() {
  return (
    <div className="bg-white h-[52px] relative shrink-0 w-full" data-name="Forest Plot Drop down">
      <div className="content-stretch flex items-start pb-[8px] pl-[21px] pr-[853px] pt-[7px] relative size-full">
        <ForestPlotTitle1 />
      </div>
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex gap-[32px] items-end pb-[7px] relative shrink-0 w-full">
      <div aria-hidden className="absolute border-[#d0d5dc] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#101318] text-[12px] w-[135px]">Study</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#101318] text-[12px] w-[212px]">Trial Name</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#101318] text-[12px] whitespace-nowrap">HR</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#101318] text-[12px] whitespace-nowrap">95% CI</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#101318] text-[12px] whitespace-nowrap">Relative weight</p>
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex gap-[28px] items-center py-[13px] relative shrink-0 w-full">
      <div aria-hidden className="absolute border-[#eaedf1] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#0663ad] text-[13px] w-[135px]">Motzer et al 2024</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] w-[220px]">CHECKMATE-914 PART B</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] whitespace-nowrap">0.87</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] w-[78px]">[0.62; 1.22]</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] whitespace-nowrap">14.3%</p>
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex gap-[32px] items-center py-[13px] relative shrink-0 w-full">
      <div aria-hidden className="absolute border-[#eaedf1] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#0663ad] text-[13px] w-[135px]">Choueiri et al 2024</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] w-[212px]">KEYNOTE-564</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] whitespace-nowrap">0.72</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] whitespace-nowrap">[0.59; 0.87]</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] whitespace-nowrap">34.1%</p>
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex gap-[32px] items-center py-[13px] relative shrink-0 w-full">
      <div aria-hidden className="absolute border-[#eaedf1] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#0663ad] text-[13px] w-[135px]">Motzer et al 2023</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] w-[212px]">CHECKMATE-914 PART A</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] whitespace-nowrap">0.92</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] w-[69px]">[0.71; 1.19]</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] whitespace-nowrap">22.1%</p>
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex gap-[32px] items-center py-[13px] relative shrink-0 w-full">
      <div aria-hidden className="absolute border-[#101318] border-b-3 border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#0663ad] text-[13px] w-[135px]">Pal et al 2022</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] w-[212px]">IMMOTION010</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] whitespace-nowrap">0.93</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] w-[69px]">[0.75; 1.15]</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] whitespace-nowrap">29.6%</p>
    </div>
  );
}

function Frame64() {
  return (
    <div className="content-stretch flex gap-[38px] items-center py-[13px] relative shrink-0 w-full">
      <div aria-hidden className="absolute border-[#eaedf1] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] w-[369px]">Random effects model</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] whitespace-nowrap">0.84</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] whitespace-nowrap">[0.74; 0.96]</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#101318] text-[13px] whitespace-nowrap">100%</p>
    </div>
  );
}

function Frame56() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[23px] top-[12px] w-[667px]">
      <Frame57 />
      <Frame58 />
      <Frame61 />
      <Frame62 />
      <Frame63 />
      <Frame64 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#333c48] text-[12px] w-full">Heterogeneity: I² = 21.2%; τ² = 0.0041; p = 0.2828</p>
    </div>
  );
}

function ForestPlotDataTable1() {
  return (
    <div className="bg-white h-[326px] overflow-clip relative rounded-[8px] shrink-0 w-[713px]" data-name="Forest Plot Data Table">
      <Frame56 />
    </div>
  );
}

function ForestPlotImg1() {
  return (
    <div className="h-[326px] relative shrink-0 w-[461px]" data-name="Forest Plot img">
      <div className="absolute h-[290px] left-[-8px] top-[-16px] w-[404px]" data-name="Screenshot 2026-04-23 at 1.10.59 PM 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[103%] left-[-1.26%] max-w-none top-[-3%] w-[101.26%]" src={imgScreenshot20260423At11059Pm1} />
        </div>
      </div>
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <ForestPlotDataTable1 />
      <ForestPlotImg1 />
    </div>
  );
}

function ForestPlotSection1() {
  return (
    <div className="content-stretch flex flex-col h-[378px] items-start relative shrink-0 w-full" data-name="Forest Plot section">
      <ForestPlotDropDown1 />
      <Frame60 />
    </div>
  );
}

function Frame72() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[38px] top-[311px] w-[1130px]">
      <Frame70 />
      <ForestPlotSection />
      <ForestPlotSection1 />
    </div>
  );
}

function Main() {
  return (
    <div className="absolute border-2 border-[rgba(209,213,220,0.25)] border-solid h-[1482px] left-[calc(16.67%+47px)] rounded-[20px] shadow-[-1px_4px_4px_0px_rgba(0,0,0,0.25)] top-[80px] w-[1153px]" data-name="Main">
      <PageContent />
      <Frame72 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[12.5%]" data-name="Group">
      <div className="absolute inset-[-2.94%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27">
          <g id="Group">
            <path d={svgPaths.p396d8300} id="Vector" stroke="var(--stroke-0, #2E75B5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p204ab000} id="Vector_2" stroke="var(--stroke-0, #2E75B5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function IconoirSidebarCollapse() {
  return (
    <div className="relative shrink-0 size-[34px]" data-name="iconoir:sidebar-collapse">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Group />
      </div>
    </div>
  );
}

function MaterialSymbolsHome() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-symbols:home">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:home">
          <path d={svgPaths.p31a62500} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, #2E75B5)" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <MaterialSymbolsHome />
      <p className="[word-break:break-word] font-['Articulat_CF:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[13px] text-black text-center w-[65px]">Home</p>
    </div>
  );
}

function LineiconsPrisma() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="lineicons:prisma">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="lineicons:prisma">
          <path d={svgPaths.p17b66500} fill="var(--fill-0, #2E75B5)" id="Vector" stroke="var(--stroke-0, #2E75B5)" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <LineiconsPrisma />
      <p className="[word-break:break-word] font-['Articulat_CF:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[13px] text-black text-center w-[65px]">Prisma</p>
    </div>
  );
}

function ArcticonsNextcloudTables() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arcticons:nextcloud-tables">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arcticons:nextcloud-tables">
          <path d={svgPaths.peee47f0} id="Vector" stroke="var(--stroke-0, #2E75B5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <ArcticonsNextcloudTables />
      <p className="[word-break:break-word] font-['Articulat_CF:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[13px] text-black text-center w-[65px]">Summary Tables</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="relative shrink-0 size-[19.643px]" data-name="Group">
      <div className="absolute inset-[-3.82%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.1429 21.1429">
          <g id="Group">
            <path d={svgPaths.p3947a180} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.pcbf9c00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function StreamlineCodeAnalysis() {
  return (
    <div className="bg-[#2e75b5] content-stretch flex items-center p-[4px] relative rounded-[6px] shrink-0" data-name="streamline:code-analysis">
      <Group1 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <StreamlineCodeAnalysis />
      <p className="[word-break:break-word] font-['Articulat_CF:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[13px] text-black text-center w-[65px]">Meta Analysis</p>
    </div>
  );
}

function CarbonSummaryKpi() {
  return (
    <div className="h-[28.999px] relative shrink-0 w-[32.5px]" data-name="carbon:summary-kpi">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32.5 28.999">
        <g id="carbon:summary-kpi">
          <path d={svgPaths.p233f6000} fill="var(--fill-0, #2E75B5)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <CarbonSummaryKpi />
      <p className="[word-break:break-word] font-['Articulat_CF:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[13px] text-black text-center w-[65px]">Summary of Findings</p>
    </div>
  );
}

function RiMoreFill() {
  return (
    <div className="relative shrink-0 w-full" data-name="ri:more-fill">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[3px] py-[10px] relative size-full">
          <div className="h-[4px] relative shrink-0 w-[18px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 4">
              <path d={svgPaths.p11907800} fill="var(--fill-0, #2E75B5)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <RiMoreFill />
      <p className="[word-break:break-word] font-['Articulat_CF:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[13px] text-black text-center w-full">More</p>
    </div>
  );
}

function NavItems() {
  return (
    <div className="relative shrink-0 w-full" data-name="nav items">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-center justify-center relative size-full">
        <Frame6 />
        <Frame7 />
        <Frame8 />
        <Frame9 />
        <Frame10 />
        <Frame11 />
      </div>
    </div>
  );
}

function CarbonNotificationNew() {
  return (
    <div className="relative shrink-0 size-[27px]" data-name="carbon:notification-new">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27">
        <g id="carbon:notification-new">
          <path d={svgPaths.p3e4e8100} fill="var(--fill-0, #2E75B5)" id="Vector" />
          <path d={svgPaths.p1d8dc500} fill="var(--fill-0, #2E75B5)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function IxUserProfileFilled() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="ix:user-profile-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="ix:user-profile-filled">
          <path d={svgPaths.p3e0b7300} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, #2E75B5)" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Profile() {
  return (
    <div className="relative shrink-0" data-name="profile">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[14px] items-center pt-px px-[6px] relative size-full">
        <CarbonNotificationNew />
        <IxUserProfileFilled />
      </div>
    </div>
  );
}

function SidebarNav() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[90px] items-center left-[2px] px-[8px] py-[16px] top-[72px] w-[81px]" data-name="Sidebar nav">
      <IconoirSidebarCollapse />
      <NavItems />
      <Profile />
    </div>
  );
}

function Heading() {
  return (
    <div className="flex-[1_0_0] h-[30px] min-w-px relative" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Articulat_CF:Medium',sans-serif] leading-[30px] left-0 not-italic text-[#2e75b5] text-[24px] top-0 tracking-[-0.4492px] whitespace-nowrap">Meta-Analysis</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[1_0_0] h-[30px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Heading />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] h-[62px] items-center pl-[4px] pr-[8px] py-[16px] relative shrink-0 w-[163px]" data-name="Container">
      <Container2 />
      <div className="relative shrink-0 size-[19px]" data-name="Replay" />
    </div>
  );
}

function Frame12() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Frame">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[8px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Demi_Bold',sans-serif] leading-[normal] min-w-px not-italic relative text-[#000105] text-[11px]">Type of Analysis</p>
        </div>
      </div>
    </div>
  );
}

function ChartCandlestickSharpLightFull() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chart-candlestick-sharp-light-full 1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chart-candlestick-sharp-light-full 1">
          <path d={svgPaths.p24ee8100} fill="var(--fill-0, #2E75B5)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-white h-[32px] relative rounded-[9px] shrink-0 w-full" data-name="Frame">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[22px] pr-[8px] relative size-full">
          <ChartCandlestickSharpLightFull />
          <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Medium',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">Primary</p>
        </div>
      </div>
    </div>
  );
}

function ChartRadarSharpLightFull() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chart-radar-sharp-light-full 1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chart-radar-sharp-light-full 1">
          <path d={svgPaths.p37679100} fill="var(--fill-0, #2E75B5)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-[#f5f5f5] h-[32px] relative rounded-[9px] shrink-0 w-full" data-name="Frame">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[22px] pr-[8px] relative size-full">
          <ChartRadarSharpLightFull />
          <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Medium',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">Sensitivity</p>
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Frame">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex gap-[4px] items-center leading-[normal] not-italic pl-[32px] pr-[8px] relative size-full">
          <p className="font-['Inter:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal relative shrink-0 text-[#2e75b6] text-[20px] whitespace-nowrap">▾</p>
          <p className="flex-[1_0_0] font-['Articulat_CF:Regular',sans-serif] min-w-px relative text-[11px] text-black">BRCA status</p>
        </div>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-0 w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">BRCA positive (cohort 1)</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-[38px] w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">BRCA positive (cohort 2)</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-[76px] w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">BRCA negative (cohort 1)</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-[114px] w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">BRCA negative (cohort 2)</p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-[152px] w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">BRCA1 positive (cohort 2)</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-[190px] w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">BRCA2 positive (cohort 2)</p>
    </div>
  );
}

function BrcaStatusPfs() {
  return (
    <div className="h-[222px] relative shrink-0 w-[187px]" data-name="BRCA status--PFS">
      <Frame16 />
      <Frame17 />
      <Frame18 />
      <Frame19 />
      <Frame20 />
      <Frame21 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Frame">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex gap-[4px] items-center leading-[normal] not-italic pl-[32px] pr-[8px] relative size-full">
          <p className="font-['Inter:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal relative shrink-0 text-[#2e75b6] text-[20px] whitespace-nowrap">▾</p>
          <p className="flex-[1_0_0] font-['Articulat_CF:Regular',sans-serif] min-w-px relative text-[11px] text-black">HRR status</p>
        </div>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-0 w-[169px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">HRR positive (cohort 1)</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-[38px] w-[169px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">HRR positive (cohort 2)</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-[76px] w-[169px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">HRR negative (cohort 1)</p>
    </div>
  );
}

function HrrStatusPfs() {
  return (
    <div className="h-[108px] relative shrink-0 w-[177px]" data-name="HRR status-PFS">
      <Frame23 />
      <Frame24 />
      <Frame25 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Frame">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex gap-[4px] items-center leading-[normal] not-italic pl-[32px] pr-[8px] relative size-full">
          <p className="font-['Inter:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal relative shrink-0 text-[#2e75b6] text-[20px] whitespace-nowrap">▾</p>
          <p className="font-['Articulat_CF:Regular',sans-serif] h-full relative shrink-0 text-[11px] text-black w-[100px]">Other gene mutations (cohort 2)</p>
        </div>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-0 w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">ATM positive</p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-[38px] w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">CDK12 positive</p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-[76px] w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">CHEK2 positive</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-[116px] w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">PALB2 positive</p>
    </div>
  );
}

function OtherGeneMutationsCohort2Os() {
  return (
    <div className="h-[148px] relative shrink-0 w-[177px]" data-name="Other gene mutations (cohort 2)-OS">
      <Frame27 />
      <Frame28 />
      <Frame29 />
      <Frame30 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[4px] h-[32px] items-center leading-[normal] not-italic overflow-clip pl-[32px] pr-[8px] relative shrink-0 w-[164px]" data-name="Frame">
      <p className="font-['Inter:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal relative shrink-0 text-[#2e75b6] text-[20px] whitespace-nowrap">▾</p>
      <p className="font-['Articulat_CF:Regular',sans-serif] relative shrink-0 text-[11px] text-black w-[100px]">Gleason score</p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-0 w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">{`Gleason score <8`}</p>
    </div>
  );
}

function Frame33() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-[38px] w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">{`Gleason score >8`}</p>
    </div>
  );
}

function GleasonScorePfs() {
  return (
    <div className="h-[70px] relative shrink-0 w-[177px]" data-name="Gleason score-PFS">
      <Frame32 />
      <Frame33 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[4px] h-[32px] items-center leading-[normal] not-italic overflow-clip pl-[32px] pr-[8px] relative shrink-0 w-[164px]" data-name="Frame">
      <p className="font-['Inter:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal relative shrink-0 text-[#2e75b6] text-[20px] whitespace-nowrap">▾</p>
      <p className="font-['Articulat_CF:Regular',sans-serif] relative shrink-0 text-[11px] text-black w-[100px]">Metastatic burden</p>
    </div>
  );
}

function Frame35() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-0 w-[190px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">Visceral metastases</p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-[40px] w-[201px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">No visceral metastases</p>
    </div>
  );
}

function Frame37() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-[80px] w-[201px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">Measurable disease at baseline</p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-[120px] w-[201px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">No measurable disease at baseline</p>
    </div>
  );
}

function MetastaticBurdenPfs() {
  return (
    <div className="h-[152px] relative shrink-0 w-[201px]" data-name="Metastatic burden-PFS">
      <Frame35 />
      <Frame36 />
      <Frame37 />
      <Frame38 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[4px] h-[32px] items-center leading-[normal] not-italic overflow-clip pl-[32px] pr-[8px] relative shrink-0 w-[164px]" data-name="Frame">
      <p className="font-['Inter:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal relative shrink-0 text-[#2e75b6] text-[20px] whitespace-nowrap">▾</p>
      <p className="font-['Articulat_CF:Regular',sans-serif] relative shrink-0 text-[11px] text-black w-[100px]">Patient factors</p>
    </div>
  );
}

function Frame40() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-0 w-[190px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">{`Age <70`}</p>
    </div>
  );
}

function Frame41() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-[40px] w-[201px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">{`Age >70`}</p>
    </div>
  );
}

function Frame42() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-[80px] w-[201px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">ECOG PS 0–1</p>
    </div>
  );
}

function Frame43() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-[120px] w-[201px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">ECOG PS 2</p>
    </div>
  );
}

function PatientFactorsPfs() {
  return (
    <div className="h-[152px] relative shrink-0 w-[201px]" data-name="Patient factors-PFS">
      <Frame40 />
      <Frame41 />
      <Frame42 />
      <Frame43 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[4px] h-[32px] items-center leading-[normal] not-italic overflow-clip pl-[32px] pr-[8px] relative shrink-0 w-[164px]" data-name="Frame">
      <p className="font-['Inter:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal relative shrink-0 text-[#2e75b6] text-[20px] whitespace-nowrap">▾</p>
      <p className="font-['Articulat_CF:Regular',sans-serif] relative shrink-0 text-[11px] text-black w-[100px]">Endpoint type</p>
    </div>
  );
}

function Frame45() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-0 w-[187px]" data-name="Frame">
      <div className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[0] min-w-px not-italic relative text-[11px] text-black">
        <p className="leading-[normal] mb-0">Radiographic PFS</p>
        <p className="leading-[normal]">(overall population)</p>
      </div>
    </div>
  );
}

function Frame46() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-[38px] w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">Radiographic PFS (BICR)</p>
    </div>
  );
}

function Frame47() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-[76px] w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">Radiographic PFS (INV)</p>
    </div>
  );
}

function Frame48() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[48px] pr-[8px] top-[114px] w-[177px]" data-name="Frame">
      <div className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[0] min-w-px not-italic relative text-[11px] text-black">
        <p className="leading-[normal] mb-0">Composite PFS</p>
        <p className="leading-[normal]">(overall population)</p>
      </div>
    </div>
  );
}

function EndpointTypePfs() {
  return (
    <div className="h-[146px] relative shrink-0 w-[187px]" data-name="Endpoint type-PFS">
      <Frame45 />
      <Frame46 />
      <Frame47 />
      <Frame48 />
    </div>
  );
}

function Frame71() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] h-[648px] items-start left-0 pl-[16px] pr-[8px] top-0 w-[201px]">
      <Container1 />
      <Frame12 />
      <Frame13 />
      <Frame14 />
      <Frame15 />
      <BrcaStatusPfs />
      <Frame22 />
      <HrrStatusPfs />
      <Frame26 />
      <OtherGeneMutationsCohort2Os />
      <Frame31 />
      <GleasonScorePfs />
      <Frame34 />
      <MetastaticBurdenPfs />
      <Frame39 />
      <PatientFactorsPfs />
      <Frame44 />
      <EndpointTypePfs />
    </div>
  );
}

function FiltersSensitivityExpanded() {
  return (
    <div className="absolute bg-white h-[1500px] left-0 top-0 w-[193px]" data-name="Filters-Sensitivity (expanded)">
      <Frame71 />
    </div>
  );
}

function Filters() {
  return (
    <div className="absolute h-[1309px] left-[78px] top-[80px] w-[201px]" data-name="Filters">
      <FiltersSensitivityExpanded />
    </div>
  );
}

export default function MetaAnalysisSensitivity() {
  return (
    <div className="bg-white relative size-full" data-name="Meta Analysis-Sensitivity">
      <div className="absolute bottom-0 h-[1580px] left-[2px] pointer-events-none top-0">
        <UniversalNavbar />
      </div>
      <Main />
      <SidebarNav />
      <Filters />
    </div>
  );
}