'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  BrainCircuit, 
  FileText, 
  ListTodo, 
  Globe, 
  PenTool, 
  CheckCircle2, 
  ArrowRight,
  Settings2,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

// Mock Data for the design
const MOCK_REPORT_CONTENT = `
## 전기차 전고체 배터리의 현재와 미래

### 1. 전고체 배터리란?
전고체 배터리(All-Solid-State Battery)는 배터리 양극과 음극 사이의 전해질이 액체가 아닌 고체로 이루어진 차세대 2차전지입니다. 화재 위험이 낮고 에너지 밀도가 높아 '꿈의 배터리'로 불립니다.

### 2. 주요 기술적 난제
- **이온 전도도:** 고체 전해질의 이온 전도도가 액체보다 낮아 출력이 떨어질 수 있습니다.
- **계면 저항:** 고체 물질 간의 접촉면에서 저항이 발생하여 수명이 단축될 수 있습니다.
- **제조 비용:** 황화물계 등 주요 소재의 가격이 매우 높습니다.

### 3. 시장 전망
주요 자동차 제조사(Toyota, Volkswagen, Hyundai)와 배터리 기업(Samsung SDI, LG Energy Solution)이 2027~2030년 상용화를 목표로 하고 있습니다.
`;

export default function DesignMockupPage() {
  const [viewState, setViewState] = useState<'idle' | 'processing' | 'result'>('idle');
  const [mode, setMode] = useState<'quick' | 'deep'>('quick');
  const [autoPilot, setAutoPilot] = useState(true);
  
  // Simulation for processing state
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { id: 'analyze', label: 'Analyzing', icon: BrainCircuit, desc: '질의 분석 및 전략 수립' },
    { id: 'plan', label: 'Planning', icon: ListTodo, desc: '리서치 계획 및 쿼리 생성' },
    { id: 'research', label: 'Researching', icon: Globe, desc: '웹 검색 및 정보 수집' },
    { id: 'synthesize', label: 'Synthesizing', icon: PenTool, desc: '데이터 종합 및 보고서 작성' },
  ];

  useEffect(() => {
    if (viewState === 'processing') {
      const interval = setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= steps.length - 1) {
            clearInterval(interval);
            setTimeout(() => setViewState('result'), 1000);
            return prev;
          }
          return prev + 1;
        });
      }, 1500); // Change step every 1.5s
      return () => clearInterval(interval);
    } else {
        setActiveStep(0);
    }
  }, [viewState]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
        {/* Navigation Mock */}
        <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                        <BrainCircuit className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">ProbeAI <span className="text-xs font-normal text-muted-foreground px-2 py-0.5 bg-secondary rounded-full">Design Preview</span></span>
                </div>
                <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                    <button onClick={() => setViewState('idle')} className={cn("hover:text-foreground transition-colors", viewState === 'idle' && "text-foreground")}>Search</button>
                    <button onClick={() => setViewState('processing')} className={cn("hover:text-foreground transition-colors", viewState === 'processing' && "text-foreground")}>Dashboard</button>
                    <button onClick={() => setViewState('result')} className={cn("hover:text-foreground transition-colors", viewState === 'result' && "text-foreground")}>Report</button>
                </div>
            </div>
        </nav>

        <main className="max-w-5xl mx-auto px-4 py-12">
            
            {/* 1. SEARCH CONSOLE (IDLE) */}
            {viewState === 'idle' && (
                <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-10 animate-in fade-in zoom-in-95 duration-500">
                    <div className="text-center space-y-4 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-xs font-medium mb-4 border border-border/50">
                            <Sparkles className="h-3 w-3 text-warning" />
                            <span>Gemini 2.5 Flash Lite Powered</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
                            Deep Research <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Autonomously.</span>
                        </h1>
                        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                            복잡한 주제도 문제없습니다. <br className="hidden md:block"/>
                            ProbeAI가 스스로 계획하고, 조사하고, 보고서를 작성합니다.
                        </p>
                    </div>

                    <div className="w-full max-w-2xl space-y-6">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                            <div className="relative">
                                <textarea 
                                    className="w-full min-h-[140px] p-6 text-lg bg-background rounded-xl border border-input shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none placeholder:text-muted-foreground/50"
                                    placeholder="무엇을 조사할까요? (예: 2026년 생성형 AI 시장 트렌드와 주요 기업 분석)"
                                />
                                <div className="absolute bottom-4 right-4 flex gap-2">
                                    <Button size="icon" className="h-10 w-10 rounded-full shadow-lg" onClick={() => setViewState('processing')}>
                                        <ArrowRight className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Mode Toggle */}
                            <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors cursor-pointer" onClick={() => setMode(mode === 'quick' ? 'deep' : 'quick')}>
                                <div className="flex items-center gap-3">
                                    <div className={cn("p-2 rounded-lg transition-colors", mode === 'quick' ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600" : "bg-blue-100 dark:bg-blue-900/30 text-blue-600")}>
                                        {mode === 'quick' ? <Sparkles className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <span className="font-semibold text-sm">{mode === 'quick' ? 'Quick Scan' : 'Deep Probe'}</span>
                                        <span className="text-xs text-muted-foreground">{mode === 'quick' ? '3-5개 소스 요약 (빠름)' : '다각도 심층 분석 (정밀)'}</span>
                                    </div>
                                </div>
                                <div className="relative h-6 w-11 rounded-full bg-secondary">
                                    <div className={cn("absolute top-1 left-1 h-4 w-4 rounded-full bg-background shadow-sm transition-all duration-300", mode === 'deep' && "translate-x-5")} />
                                </div>
                            </div>

                            {/* Human-in-the-loop Toggle */}
                            <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors cursor-pointer" onClick={() => setAutoPilot(!autoPilot)}>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600">
                                        <Settings2 className="h-5 w-5" />
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <span className="font-semibold text-sm">Plan Confirmation</span>
                                        <span className="text-xs text-muted-foreground">{!autoPilot ? '계획 승인 후 진행' : '자동 진행 (Auto-Pilot)'}</span>
                                    </div>
                                </div>
                                <div className={cn("h-6 w-6 rounded border flex items-center justify-center transition-colors", !autoPilot ? "bg-primary border-primary text-primary-foreground" : "border-input")}>
                                    {!autoPilot && <CheckCircle2 className="h-4 w-4" />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 2. STATUS DASHBOARD (PROCESSING) */}
            {viewState === 'processing' && (
                <div className="max-w-3xl mx-auto py-10 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
                     <div className="text-center space-y-2 mb-12">
                        <h2 className="text-2xl font-bold">Research in Progress</h2>
                        <p className="text-muted-foreground">ProbeAI가 조사 계획을 실행하고 있습니다.</p>
                     </div>

                     {/* Progress Stepper */}
                     <div className="relative">
                        <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-border -z-10" />
                        <div className="space-y-8">
                            {steps.map((step, index) => {
                                const isActive = index === activeStep;
                                const isCompleted = index < activeStep;
                                const isPending = index > activeStep;

                                return (
                                    <div key={step.id} className="flex items-start gap-4">
                                        <div className={cn(
                                            "relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 transition-all duration-500 bg-background",
                                            isActive && "border-primary text-primary scale-110 shadow-lg shadow-primary/20",
                                            isCompleted && "border-primary bg-primary text-primary-foreground",
                                            isPending && "border-secondary text-muted-foreground"
                                        )}>
                                            {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : <step.icon className="h-6 w-6" />}
                                            
                                            {isActive && (
                                                <span className="absolute -right-1 -top-1 flex h-4 w-4">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
                                                </span>
                                            )}
                                        </div>
                                        <div className={cn("pt-3 transition-opacity duration-500", isPending ? "opacity-50" : "opacity-100")}>
                                            <h3 className="text-lg font-semibold leading-none">{step.label}</h3>
                                            <p className="text-sm text-muted-foreground mt-1">{step.desc}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                     </div>

                     {/* Live Log Terminal */}
                     <div className="mt-8 rounded-xl bg-slate-950 text-slate-200 p-6 font-mono text-sm shadow-xl overflow-hidden border border-slate-800">
                        <div className="flex gap-2 mb-4">
                            <div className="h-3 w-3 rounded-full bg-red-500/50" />
                            <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                            <div className="h-3 w-3 rounded-full bg-green-500/50" />
                        </div>
                        <div className="space-y-2">
                            <div className="text-emerald-400">$ start-research --topic "Solid-state Batteries"</div>
                            <div className="opacity-80">[Analyzer] Context identified: Technology/Market</div>
                            {activeStep >= 1 && <div className="opacity-80 animate-pulse">[Planner] Generating search queries...</div>}
                            {activeStep >= 1 && <div className="text-blue-400 pl-4">Query 1: "Solid-state battery latest technology 2025"</div>}
                            {activeStep >= 2 && <div className="text-blue-400 pl-4">Query 2: "Market forecast EV batteries"</div>}
                            {activeStep >= 2 && <div className="opacity-80">[Researcher] Scraping 5 sources...</div>}
                            {activeStep >= 3 && <div className="opacity-80">[Synthesizer] Compiling final report...</div>}
                            <div className="animate-pulse text-primary mt-2">_</div>
                        </div>
                     </div>
                </div>
            )}

            {/* 3. REPORT VIEWER (RESULT) */}
            {viewState === 'result' && (
                <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex items-center justify-between mb-8">
                        <Button variant="ghost" onClick={() => setViewState('idle')} className="gap-2 pl-0 hover:pl-2 transition-all">
                            <ArrowRight className="h-4 w-4 rotate-180" /> Back to Search
                        </Button>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm"><FileText className="h-4 w-4 mr-2"/> PDF Export</Button>
                            <Button variant="outline" size="sm"><Settings2 className="h-4 w-4 mr-2"/> Customize</Button>
                        </div>
                    </div>

                    <Card className="p-8 md:p-12 shadow-sm border-border/60 bg-card">
                        {/* Header */}
                        <div className="border-b pb-8 mb-8 space-y-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-wider font-semibold">
                                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">Deep Probe</span>
                                <span>•</span>
                                <span>Jan 14, 2026</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                                전기차 전고체 배터리의<br/>현재 기술 수준과 시장 전망
                            </h1>
                        </div>

                        {/* TOC */}
                        <div className="bg-secondary/30 rounded-lg p-6 mb-10">
                            <h4 className="font-semibold mb-4 flex items-center gap-2"><ListTodo className="h-4 w-4"/> 목차</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="hover:text-primary cursor-pointer transition-colors flex items-center gap-2"><ChevronRight className="h-3 w-3"/> 1. 전고체 배터리란?</li>
                                <li className="hover:text-primary cursor-pointer transition-colors flex items-center gap-2"><ChevronRight className="h-3 w-3"/> 2. 주요 기술적 난제</li>
                                <li className="hover:text-primary cursor-pointer transition-colors flex items-center gap-2"><ChevronRight className="h-3 w-3"/> 3. 시장 전망</li>
                            </ul>
                        </div>

                        {/* Content */}
                        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-6 prose-p:text-muted-foreground prose-p:leading-relaxed">
                            <div className="whitespace-pre-line">
                                {MOCK_REPORT_CONTENT}
                            </div>
                        </div>

                        {/* Visualization Placeholder */}
                        <div className="my-12 border rounded-xl overflow-hidden bg-background">
                            <div className="bg-secondary/50 px-4 py-2 border-b flex items-center justify-between">
                                <span className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                                    <BarChart3 className="h-3 w-3"/> Market Growth Forecast
                                </span>
                                <span className="text-[10px] text-muted-foreground">Mermaid.js</span>
                            </div>
                            <div className="h-64 flex flex-col items-center justify-center text-muted-foreground bg-secondary/10 p-4">
                                {/* Abstract Chart Representation */}
                                <div className="flex items-end gap-4 h-32 w-full max-w-xs justify-between opacity-50">
                                    <div className="w-8 bg-primary/20 h-1/4 rounded-t"></div>
                                    <div className="w-8 bg-primary/40 h-2/4 rounded-t"></div>
                                    <div className="w-8 bg-primary/60 h-3/4 rounded-t"></div>
                                    <div className="w-8 bg-primary h-full rounded-t"></div>
                                </div>
                                <p className="mt-4 text-xs">Visualization rendered by AI Agent</p>
                            </div>
                        </div>

                         {/* References */}
                         <div className="mt-16 pt-8 border-t">
                            <h3 className="font-bold text-lg mb-4">참고 문헌 (References)</h3>
                            <div className="grid gap-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-3 items-start p-3 rounded-lg hover:bg-secondary/50 transition-colors group cursor-pointer">
                                        <div className="mt-0.5 text-xs font-mono bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded border">
                                            {i}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">Global Solid-state Battery Market Report 2025</p>
                                            <p className="text-xs text-muted-foreground">market-research.com • 2 days ago</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                         </div>
                    </Card>
                </div>
            )}
        </main>
    </div>
  );
}
