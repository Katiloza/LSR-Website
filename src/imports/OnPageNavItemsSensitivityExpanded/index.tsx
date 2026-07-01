import svgPaths from "./svg-xgzrpvkykr";

function Heading() {
  return (
    <div className="flex-[1_0_0] h-[30px] min-w-px relative" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Articulat_CF:Medium',sans-serif] leading-[30px] left-0 not-italic text-[#2e75b5] text-[24px] top-0 tracking-[-0.4492px] whitespace-nowrap">Meta-Analysis</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] h-[30px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Heading />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] h-[62px] items-center pl-[4px] pr-[8px] py-[16px] relative shrink-0 w-[163px]" data-name="Container">
      <Container1 />
      <div className="relative shrink-0 size-[19px]" data-name="Replay" />
    </div>
  );
}

function Frame() {
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

function Frame1() {
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

function Frame2() {
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

function Frame3() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Frame">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex gap-[4px] items-center leading-[normal] not-italic pl-[46px] pr-[8px] relative size-full">
          <p className="font-['Inter:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal relative shrink-0 text-[#2e75b6] text-[20px] whitespace-nowrap">▾</p>
          <p className="flex-[1_0_0] font-['Articulat_CF:Regular',sans-serif] min-w-px relative text-[11px] text-black">BRCA status</p>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-0 w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">BRCA positive (cohort 1)</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-[38px] w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">BRCA positive (cohort 2)</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-[76px] w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">BRCA negative (cohort 1)</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-[114px] w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">BRCA negative (cohort 2)</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-[152px] w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">BRCA1 positive (cohort 2)</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-[190px] w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">BRCA2 positive (cohort 2)</p>
    </div>
  );
}

function BrcaStatusPfs() {
  return (
    <div className="h-[222px] relative shrink-0 w-[187px]" data-name="BRCA status--PFS">
      <Frame4 />
      <Frame5 />
      <Frame6 />
      <Frame7 />
      <Frame8 />
      <Frame9 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Frame">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex gap-[4px] items-center leading-[normal] not-italic pl-[46px] pr-[8px] relative size-full">
          <p className="font-['Inter:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal relative shrink-0 text-[#2e75b6] text-[20px] whitespace-nowrap">▾</p>
          <p className="flex-[1_0_0] font-['Articulat_CF:Regular',sans-serif] min-w-px relative text-[11px] text-black">HRR status</p>
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-0 w-[169px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">HRR positive (cohort 1)</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-[38px] w-[169px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">HRR positive (cohort 2)</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-[76px] w-[169px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">HRR negative (cohort 1)</p>
    </div>
  );
}

function HrrStatusPfs() {
  return (
    <div className="h-[108px] relative shrink-0 w-[177px]" data-name="HRR status-PFS">
      <Frame11 />
      <Frame12 />
      <Frame13 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Frame">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex gap-[4px] items-center leading-[normal] not-italic pl-[46px] pr-[8px] relative size-full">
          <p className="font-['Inter:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal relative shrink-0 text-[#2e75b6] text-[20px] whitespace-nowrap">▾</p>
          <p className="font-['Articulat_CF:Regular',sans-serif] h-full relative shrink-0 text-[11px] text-black w-[100px]">Other gene mutations (cohort 2)</p>
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-0 w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">ATM positive</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-[38px] w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">CDK12 positive</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-[76px] w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">CHEK2 positive</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-[116px] w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">PALB2 positive</p>
    </div>
  );
}

function OtherGeneMutationsCohort2Os() {
  return (
    <div className="h-[148px] relative shrink-0 w-[177px]" data-name="Other gene mutations (cohort 2)-OS">
      <Frame15 />
      <Frame16 />
      <Frame17 />
      <Frame18 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[4px] h-[32px] items-center leading-[normal] not-italic overflow-clip pl-[46px] pr-[8px] relative shrink-0 w-[164px]" data-name="Frame">
      <p className="font-['Inter:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal relative shrink-0 text-[#2e75b6] text-[20px] whitespace-nowrap">▾</p>
      <p className="font-['Articulat_CF:Regular',sans-serif] relative shrink-0 text-[11px] text-black w-[100px]">Gleason score</p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-0 w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">{`Gleason score <8`}</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-[38px] w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">{`Gleason score >8`}</p>
    </div>
  );
}

function GleasonScorePfs() {
  return (
    <div className="h-[70px] relative shrink-0 w-[177px]" data-name="Gleason score-PFS">
      <Frame20 />
      <Frame21 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[4px] h-[32px] items-center leading-[normal] not-italic overflow-clip pl-[46px] pr-[8px] relative shrink-0 w-[164px]" data-name="Frame">
      <p className="font-['Inter:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal relative shrink-0 text-[#2e75b6] text-[20px] whitespace-nowrap">▾</p>
      <p className="font-['Articulat_CF:Regular',sans-serif] relative shrink-0 text-[11px] text-black w-[100px]">Metastatic burden</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-0 w-[190px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">Visceral metastases</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-[40px] w-[201px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">No visceral metastases</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-[80px] w-[201px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">Measurable disease at baseline</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-[120px] w-[201px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">No measurable disease at baseline</p>
    </div>
  );
}

function MetastaticBurdenPfs() {
  return (
    <div className="h-[152px] relative shrink-0 w-[201px]" data-name="Metastatic burden-PFS">
      <Frame23 />
      <Frame24 />
      <Frame25 />
      <Frame26 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[4px] h-[32px] items-center leading-[normal] not-italic overflow-clip pl-[46px] pr-[8px] relative shrink-0 w-[164px]" data-name="Frame">
      <p className="font-['Inter:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal relative shrink-0 text-[#2e75b6] text-[20px] whitespace-nowrap">▾</p>
      <p className="font-['Articulat_CF:Regular',sans-serif] relative shrink-0 text-[11px] text-black w-[100px]">Patient factors</p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-0 w-[190px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">{`Age <70`}</p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-[40px] w-[201px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">{`Age >70`}</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-[80px] w-[201px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">ECOG PS 0–1</p>
    </div>
  );
}

function Frame31() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-[120px] w-[201px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">ECOG PS 2</p>
    </div>
  );
}

function PatientFactorsPfs() {
  return (
    <div className="h-[152px] relative shrink-0 w-[201px]" data-name="Patient factors-PFS">
      <Frame28 />
      <Frame29 />
      <Frame30 />
      <Frame31 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[4px] h-[32px] items-center leading-[normal] not-italic overflow-clip pl-[46px] pr-[8px] relative shrink-0 w-[164px]" data-name="Frame">
      <p className="font-['Inter:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal relative shrink-0 text-[#2e75b6] text-[20px] whitespace-nowrap">▾</p>
      <p className="font-['Articulat_CF:Regular',sans-serif] relative shrink-0 text-[11px] text-black w-[100px]">Endpoint type</p>
    </div>
  );
}

function Frame33() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-0 w-[187px]" data-name="Frame">
      <div className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[0] min-w-px not-italic relative text-[11px] text-black">
        <p className="leading-[normal] mb-0">Radiographic PFS</p>
        <p className="leading-[normal]">(overall population)</p>
      </div>
    </div>
  );
}

function Frame34() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-[38px] w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">Radiographic PFS (BICR)</p>
    </div>
  );
}

function Frame35() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-[76px] w-[177px]" data-name="Frame">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Articulat_CF:Light',sans-serif] leading-[normal] min-w-px not-italic relative text-[11px] text-black">Radiographic PFS (INV)</p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center left-0 overflow-clip pl-[67px] pr-[8px] top-[114px] w-[177px]" data-name="Frame">
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
      <Frame33 />
      <Frame34 />
      <Frame35 />
      <Frame36 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] h-[648px] items-start left-0 pl-[16px] pr-[8px] top-0 w-[201px]">
      <Container />
      <Frame />
      <Frame1 />
      <Frame2 />
      <Frame3 />
      <BrcaStatusPfs />
      <Frame10 />
      <HrrStatusPfs />
      <Frame14 />
      <OtherGeneMutationsCohort2Os />
      <Frame19 />
      <GleasonScorePfs />
      <Frame22 />
      <MetastaticBurdenPfs />
      <Frame27 />
      <PatientFactorsPfs />
      <Frame32 />
      <EndpointTypePfs />
    </div>
  );
}

export default function OnPageNavItemsSensitivityExpanded() {
  return (
    <div className="bg-white relative size-full" data-name="On-page nav items-Sensitivity (expanded)">
      <Frame37 />
    </div>
  );
}