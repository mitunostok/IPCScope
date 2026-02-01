import React, { useState, useMemo, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { GoogleGenAI } from "@google/genai";
import { DEPARTMENTS } from './constants';
import { ScoreValue, AuditHeader, ActionPlanItem, Department, SavedAudit, Section, Question } from './types';
import { db } from './db';

const App: React.FC = () => {
  // --- States ---
  const [customTemplates, setCustomTemplates] = useState<Department[]>([]);
  const [selectedDeptId, setSelectedDeptId] = useState<string>(DEPARTMENTS[0].id);
  const [header, setHeader] = useState<AuditHeader>({
    area: '',
    date: new Date().toISOString().split('T')[0],
    auditor: ''
  });
  const [scores, setScores] = useState<Record<string, ScoreValue>>({});
  const [actionPlan, setActionPlan] = useState<ActionPlanItem[]>([]);
  const [savedAudits, setSavedAudits] = useState<SavedAudit[]>([]);
  const [aiSummary, setAiSummary] = useState<string>('');
  
  // UI States
  const [isExporting, setIsExporting] = useState(false);
  const [showExportSuccess, setShowExportSuccess] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState<Record<string, boolean>>({});
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isTemplateManagerOpen, setIsTemplateManagerOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Template Creator State
  const [newTemplate, setNewTemplate] = useState<Department>({
    id: '',
    name: '',
    description: '',
    sections: [{ id: 's1', title: '', icon: 'ClipboardList', maxScore: 0, questions: [{ id: 'q1', text: '' }] }]
  });

  // --- Effects ---
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
        
    const loadData = async () => {
      try {
        await db.init();
        const audits = await db.getAudits();
        setSavedAudits(audits.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
        
        const templates = await db.getTemplates();
        setCustomTemplates(templates);
      } catch (e) {
        console.error("DB Init error:", e);
      }
    };
    loadData();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);     
    };
  }, []);

  // --- Derived Data ---
  const allTemplates = useMemo(() => [...DEPARTMENTS, ...customTemplates], [customTemplates]);
  
  const selectedDepartment = useMemo(() => 
    allTemplates.find(d => d.id === selectedDeptId) || allTemplates[0],
    [selectedDeptId, allTemplates]
  );

  const totals = useMemo(() => {
    let totalScore = 0;
    let totalMaxPossible = 0;
    const sectionSubtotals: Record<string, number> = {};

    selectedDepartment.sections.forEach(section => {
      let subtotal = 0;
      section.questions.forEach(q => {
        subtotal += scores[q.id] || 0;
      });
      sectionSubtotals[section.id] = subtotal;
      totalScore += subtotal;
      totalMaxPossible += section.maxScore || (section.questions.length * 2);
    });

    const percentage = totalMaxPossible > 0 ? (totalScore / totalMaxPossible) * 100 : 0;
    return { totalScore, totalMaxPossible, percentage, sectionSubtotals };
  }, [selectedDepartment, scores]);

  const getStatus = (percentage: number) => {
    if (percentage >= 90) return { label: 'Excellent', color: 'var(--success)', hex: '#00b894' };
    if (percentage >= 75) return { label: 'Good', color: 'var(--accent)', hex: '#4a69bd' };
    if (percentage >= 60) return { label: 'Needs Improvement', color: 'var(--warning)', hex: '#f1c40f' };
    return { label: 'Poor – Critical', color: 'var(--danger)', hex: '#d63031' };
  };

  const status = getStatus(totals.percentage);

  // --- AI Intelligence ---
  const generateAISummary = async () => {
    if (!isOnline) { setErrorMessage("Active network required for AI synthesis."); return; }
    setIsGeneratingSummary(true);
    setErrorMessage(null);

    const breakdown = selectedDepartment.sections.map(s => {
      const score = totals.sectionSubtotals[s.id];
      const max = s.maxScore || s.questions.length * 2;
      return `${s.title}: ${score}/${max} (${Math.round((score/max)*100)}%)`;
    }).join(', ');

    const issues = actionPlan.map(a => `- ${a.problem}`).join('\n');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Audited Department: ${selectedDepartment.name}
Compliance Score: ${Math.round(totals.percentage)}%
Section Breakdown: ${breakdown}
Identified Deficiencies:
${issues || 'None reported.'}`,
        config: {
          systemInstruction: "You are a World-Class Hospital Infection Control (IPC) Auditor. Provide a high-impact executive summary (max 120 words). Identify top 2 critical risks and provide 1 strategic recommendation. Use precise medical terminology.",
        },
      });
      if (response.text) setAiSummary(response.text.trim());
    } catch (e) {
      setErrorMessage("Gemini Synthesis engine failed. Please retry.");
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const suggestActionPlan = async (id: string, problem: string) => {
    if (!problem.trim() || !isOnline) return;
    setIsSuggesting(prev => ({ ...prev, [id]: true }));
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `IPC Deficiency: ${problem}`,
        config: {
          systemInstruction: "Suggest a concise, medically sound corrective action (max 15 words) for this IPC deficiency.",
        },
      });
      if (response.text) updateActionPlan(id, 'action', response.text.trim());
    } catch (e) {
      setErrorMessage("AI Suggestion failed.");
    } finally {
      setIsSuggesting(prev => ({ ...prev, [id]: false }));
    }
  };

  // --- Handlers ---
  const handleScoreChange = (questionId: string, value: ScoreValue) => {
    setScores(prev => ({ ...prev, [questionId]: value }));
  };

  const updateActionPlan = (id: string, field: keyof ActionPlanItem, value: string) => {
    setActionPlan(actionPlan.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addActionPlanRow = () => {
    setActionPlan([...actionPlan, { id: crypto.randomUUID(), problem: '', action: '', responsible: '', targetDate: '' }]);
  };

  const removeActionPlanRow = (id: string) => {
    setActionPlan(actionPlan.filter(item => item.id !== id));
  };

  const saveTemplate = async () => {
    if (!newTemplate.name) { setErrorMessage("Template name is required."); return; }
    const templateToSave = { 
      ...newTemplate, 
      id: 'custom-' + Date.now(),
      sections: newTemplate.sections.map(s => ({ ...s, maxScore: s.questions.length * 2 }))
    };
    try {
      await db.saveTemplate(templateToSave);
      setCustomTemplates([...customTemplates, templateToSave]);
      setIsTemplateManagerOpen(false);
      setSelectedDeptId(templateToSave.id);
      startNewAudit();
    } catch (e) {
      setErrorMessage("Could not save template.");
    }
  };

  const loadAuditFromHistory = (audit: SavedAudit) => {
    setSelectedDeptId(audit.deptId);
    setHeader(audit.header);
    setScores(audit.scores);
    setActionPlan(audit.actionPlan);
    setAiSummary(audit.aiSummary || '');
    setIsHistoryOpen(false);
  };

  const handleExportPDF = async () => {
    if (!header.area || !header.auditor) { setErrorMessage("Area and Auditor are required."); return; }
    setIsExporting(true);
    try {
      const audit: SavedAudit = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        deptId: selectedDeptId,
        header: { ...header },
        scores: { ...scores },
        actionPlan: [...actionPlan],
        aiSummary,
        percentage: totals.percentage
      };
      await db.saveAudit(audit);
      const updatedAudits = await db.getAudits();
      setSavedAudits(updatedAudits.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
      
      const doc = new jsPDF();
      doc.setFontSize(22); doc.setTextColor(74, 105, 189);
      doc.text(`IPC AUDIT: ${selectedDepartment.name}`, 15, 20);
      
      doc.setFontSize(10); doc.setTextColor(100, 100, 100);
      doc.text(`Auditor: ${header.auditor} | Area: ${header.area} | Date: ${header.date}`, 15, 30);
      doc.text(`Score: ${Math.round(totals.percentage)}% (${status.label})`, 15, 36);
      
      autoTable(doc, { 
        startY: 45, 
        head: [['Section', 'Score', 'Compliance']], 
        body: selectedDepartment.sections.map(s => [
          s.title, 
          `${totals.sectionSubtotals[s.id]} / ${s.maxScore || s.questions.length * 2}`, 
          `${Math.round((totals.sectionSubtotals[s.id]/(s.maxScore || s.questions.length * 2))*100)}%`
        ]),
        headStyles: { fillColor: [74, 105, 189] }
      });

      if (actionPlan.length > 0) {
        doc.setFontSize(14); doc.setTextColor(214, 48, 49);
        doc.text("Corrective Action Plan (Deficiencies)", 15, (doc as any).lastAutoTable.finalY + 15);
        autoTable(doc, {
          startY: (doc as any).lastAutoTable.finalY + 20,
          head: [['Deficiency', 'Remediation', 'Responsibility', 'Target Date']],
          body: actionPlan.map(a => [a.problem, a.action, a.responsible, a.targetDate]),
          headStyles: { fillColor: [214, 48, 49] }
        });
      }

      if (aiSummary) {
        doc.setFontSize(14); doc.setTextColor(74, 105, 189);
        doc.text("Clinical Synthesis & Recommendations", 15, (doc as any).lastAutoTable.finalY + 15);
        doc.setFontSize(9); doc.setTextColor(50, 50, 50);
        const splitSummary = doc.splitTextToSize(aiSummary, 180);
        doc.text(splitSummary, 15, (doc as any).lastAutoTable.finalY + 22);
      }

      // Footer acknowledgement
      doc.setFontSize(8); doc.setTextColor(150, 150, 150);
      doc.text(`Conceptualized & Developed by Dr. Sourav Nath`, 15, 280);
      doc.text(`Under Academic Supervision of Prof. Dr. Md. Akram Hossain`, 15, 285);

      doc.save(`IPCScope_${selectedDepartment.name}_${header.area}.pdf`);
      setShowExportSuccess(true);
      setTimeout(() => setShowExportSuccess(false), 5000);
    } catch (e) {
      setErrorMessage("Export failed.");
    } finally {
      setIsExporting(false);
    }
  };

  const startNewAudit = () => {
    setScores({});
    setActionPlan([]);
    setAiSummary('');
    setHeader({ ...header, area: '' });
  };

  return (
    <div className="min-h-screen px-4 py-8 md:py-12 flex flex-col items-center animate-fade-in bg-[#e8ebf2]">
      
      {/* --- Modals --- */}
      {isTemplateManagerOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#e8ebf2]/95 backdrop-blur-xl animate-fade-in overflow-y-auto">
          <div className="w-full max-w-4xl bg-[#e8ebf2] rounded-[45px] polymer-relief p-10 space-y-8 my-10">
            <header className="flex justify-between items-center">
              <div className="space-y-1">
                <h2 className="text-3xl font-black text-[#1e272e]">Template Architect</h2>
                <p className="text-[10px] font-mono uppercase text-slate-400">Institutional Audit Designer</p>
              </div>
              <button onClick={() => setIsTemplateManagerOpen(false)} className="p-4 bg-[#e8ebf2] rounded-full polymer-relief text-red-500"><LucideIcons.X /></button>
            </header>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-mono text-[9px] uppercase font-black text-slate-400 tracking-widest ml-4">Ward Name</label>
                <input type="text" value={newTemplate.name} onChange={e => setNewTemplate({...newTemplate, name: e.target.value})} placeholder="Ward Name (e.g. Isolation Ward)" className="w-full bg-[#e8ebf2] p-5 rounded-2xl polymer-inset outline-none font-bold text-[#4a69bd]"/>
              </div>
              <button onClick={saveTemplate} className="w-full py-6 bg-[#4a69bd] text-white rounded-2xl font-black uppercase tracking-widest shadow-lg hover:-translate-y-1 transition-all">Save Institutional Standard</button>
            </div>
          </div>
        </div>
      )}

      {isHistoryOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#e8ebf2]/95 backdrop-blur-xl animate-fade-in overflow-y-auto">
          <div className="w-full max-w-3xl bg-[#e8ebf2] rounded-[45px] polymer-relief p-10 space-y-8 my-10 max-h-[90vh] flex flex-col">
            <header className="flex justify-between items-center">
              <h2 className="text-3xl font-black text-[#1e272e]">Audit History</h2>
              <button onClick={() => setIsHistoryOpen(false)} className="p-4 bg-[#e8ebf2] rounded-full polymer-relief text-red-500"><LucideIcons.X /></button>
            </header>
            <div className="flex-grow overflow-y-auto space-y-6 pr-2">
              {savedAudits.length > 0 ? savedAudits.map(audit => (
                <div key={audit.id} onClick={() => loadAuditFromHistory(audit)} className="p-6 bg-[#e8ebf2] rounded-3xl polymer-inset hover:bg-white/40 transition-all cursor-pointer flex justify-between items-center group">
                  <div>
                    <div className="font-bold text-[#4a69bd]">{allTemplates.find(t => t.id === audit.deptId)?.name}</div>
                    <div className="text-[10px] font-mono uppercase text-slate-400">Area: {audit.header.area} • {new Date(audit.timestamp).toLocaleDateString()}</div>
                  </div>
                  <div className="text-2xl font-black text-[#4a69bd] opacity-40 group-hover:opacity-100">{Math.round(audit.percentage)}%</div>
                </div>
              )) : (
                <div className="py-20 text-center text-slate-400 font-black uppercase text-xs tracking-[0.3em]">No saved audits found</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- Main Dashboard --- */}
      <div className="w-full max-w-[1100px] flex flex-col gap-8 flex-grow">
        <header className="space-y-6">
          {errorMessage && (
            <div className="p-5 bg-red-100 border-l-4 border-red-500 rounded-2xl flex justify-between items-center text-red-800 text-xs font-bold uppercase tracking-widest animate-pulse">
              <span>{errorMessage}</span>
              <button onClick={() => setErrorMessage(null)}><LucideIcons.XCircle className="w-5 h-5"/></button>
            </div>
          )}

          {showExportSuccess && (
            <div className="p-5 bg-green-100 border-l-4 border-green-500 rounded-2xl flex justify-between items-center text-green-800 text-xs font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2"><LucideIcons.CheckCircle className="w-4 h-4"/> Clinical Audit Document Finalized</span>
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#1e272e]">
                IPCScope<br /><span className="text-[#4a69bd]">Audit Pro</span>
              </h1>
              <p className="font-mono text-[10px] uppercase font-black text-slate-400 tracking-[0.4em]">See. Assess. Improve.</p>
              <div className="flex flex-wrap gap-2 mt-4 no-print">
                <button onClick={() => setIsHistoryOpen(true)} className="px-5 py-2.5 bg-[#e8ebf2] rounded-full polymer-relief text-slate-400 font-bold uppercase text-[9px] tracking-widest flex items-center gap-2 hover:scale-105 transition-all"><LucideIcons.Archive className="w-3.5 h-3.5"/> History</button>
                <button onClick={() => setIsTemplateManagerOpen(true)} className="px-5 py-2.5 bg-[#e8ebf2] rounded-full polymer-relief text-[#4a69bd] font-bold uppercase text-[9px] tracking-widest flex items-center gap-2 hover:scale-105 transition-all"><LucideIcons.LayoutTemplate className="w-3.5 h-3.5"/> Designer</button>
              </div>
            </div>
            <div className="hidden md:block text-right">
              <div className="px-4 py-2 bg-[#e8ebf2] rounded-full polymer-inset font-mono text-[9px] font-black text-[#00b894] uppercase tracking-widest shadow-inner">
                {isOnline ? 'System: Cloud Linked' : 'System: Offline Vault'}
              </div>
            </div>
          </div>

          <div className="bg-[#e8ebf2] p-8 rounded-[40px] polymer-relief grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="font-mono text-[9px] uppercase font-black text-slate-400 tracking-widest ml-4"> Departmental Protocol</label>
              <select value={selectedDeptId} onChange={e => { setSelectedDeptId(e.target.value); startNewAudit(); }} className="w-full bg-[#e8ebf2] p-5 rounded-3xl polymer-inset font-black text-[#2d3436] outline-none">
                {allTemplates.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[9px] uppercase font-black text-slate-400 tracking-widest ml-4">Ward / Area</label>
              <input type="text" value={header.area} onChange={e => setHeader({...header, area: e.target.value})} placeholder="e.g. ICU-2" className="w-full bg-[#e8ebf2] p-5 rounded-3xl polymer-inset outline-none font-bold text-[#2d3436]"/>
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[9px] uppercase font-black text-slate-400 tracking-widest ml-4">Auditor Credential</label>
              <input type="text" value={header.auditor} onChange={e => setHeader({...header, auditor: e.target.value})} placeholder="Full Name or ID" className="w-full bg-[#e8ebf2] p-5 rounded-3xl polymer-inset outline-none font-bold text-[#2d3436]"/>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          <main className="bg-[#e8ebf2] rounded-[45px] p-8 md:p-12 polymer-relief">
            <div className="space-y-16">
              {/* COMPLIANCE INSTRUCTIONS */}
              <div className="p-6 bg-[#e8ebf2] rounded-3xl polymer-inset flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                  <span>NC: Non Compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                  <span>PC: Partial Compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                  <span>FC: Full Compliance</span>
                </div>
              </div>

              {selectedDepartment.sections.map((section) => {
                const IconComp = (LucideIcons as any)[section.icon] || LucideIcons.FileText;
                return (
                  <section key={section.id} className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#e8ebf2] rounded-xl polymer-relief text-[#4a69bd]"><IconComp className="w-5 h-5" /></div>
                      <h3 className="text-lg font-black text-[#1e272e] uppercase tracking-widest">{section.title}</h3>
                    </div>
                    <div className="space-y-8 pl-4">
                      {section.questions.map((q) => (
                        <div key={q.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                          <p className="font-bold text-[#2d3436] flex-grow pr-4 group-hover:text-[#4a69bd] transition-colors">{q.text}</p>
                          <div className="flex bg-[#e8ebf2] p-2 rounded-2xl polymer-inset gap-1">
                            {[{label:'NC',v:0}, {label:'PC',v:1}, {label:'FC',v:2}].map(opt => (
                              <button key={opt.v} onClick={() => handleScoreChange(q.id, opt.v as ScoreValue)} className={`px-4 py-2 rounded-xl font-mono text-[9px] font-black transition-all ${scores[q.id] === opt.v ? 'bg-[#e8ebf2] polymer-relief text-[#4a69bd] scale-105 shadow-md' : 'text-slate-400'}`}>
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}

              {/* ACTION PLAN SECTION */}
              <section className="space-y-8 pt-8 border-t border-black/5">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#e8ebf2] rounded-xl polymer-relief text-red-500"><LucideIcons.Target className="w-5 h-5" /></div>
                  <h3 className="text-lg font-black text-[#1e272e] uppercase tracking-widest">Corrective Action Plan</h3>
                </div>
                <div className="space-y-8">
                  {actionPlan.map(item => (
                    <div key={item.id} className="bg-[#e8ebf2] p-8 rounded-[40px] polymer-inset relative group animate-fade-in space-y-6">
                      <button onClick={() => removeActionPlanRow(item.id)} className="absolute -top-3 -right-3 p-2.5 bg-white rounded-full text-red-500 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-10"><LucideIcons.Trash2 className="w-4 h-4"/></button>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <div className="h-10 flex items-center"><label className="font-mono text-[9px] uppercase font-black text-slate-400 tracking-widest">Deficiency Detail</label></div>
                          <textarea value={item.problem} onChange={e => updateActionPlan(item.id, 'problem', e.target.value)} className="w-full bg-[#e8ebf2] p-5 rounded-2xl polymer-inset outline-none text-sm min-h-[100px] resize-none focus:ring-1 focus:ring-red-200"  placeholder="Clinical observation..."/>
                        </div>
                        <div className="space-y-2">
                          <div className="h-10 flex items-center justify-between">
                            <label className="font-mono text-[9px] uppercase font-black text-slate-400 tracking-widest">Remediation Steps</label>
                            <button onClick={() => suggestActionPlan(item.id, item.problem)} disabled={isSuggesting[item.id] || !item.problem.trim() || !isOnline} className="text-[8px] font-black uppercase text-[#4a69bd] bg-[#e8ebf2] px-3 py-1.5 rounded-full polymer-relief disabled:opacity-30 hover:scale-105 transition-all">
                              {isSuggesting[item.id] ? <LucideIcons.Loader2 className="animate-spin w-3 h-3"/> : <LucideIcons.Sparkles className="w-3 h-3"/>}
                              AI Assist
                             </button>
                          </div>
                          <textarea value={item.action} onChange={e => updateActionPlan(item.id, 'action', e.target.value)} className="w-full bg-[#e8ebf2] p-5 rounded-2xl polymer-inset outline-none text-sm min-h-[100px] resize-none text-[#4a69bd] font-bold focus:ring-1 focus:ring-[#4a69bd]/20" placeholder="Corrective action to be taken..."/>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-black/5">
                        <div className="space-y-2">
                          <label className="font-mono text-[9px] uppercase font-black text-slate-400 tracking-widest">Accountable Personnel</label>
                          <input type="text" value={item.responsible} onChange={e => updateActionPlan(item.id, 'responsible', e.target.value)} placeholder="Name / Designation" className="w-full bg-[#e8ebf2] p-4 rounded-2xl polymer-inset outline-none text-xs font-bold"/>
                        </div>
                        <div className="space-y-2">
                          <label className="font-mono text-[9px] uppercase font-black text-slate-400 tracking-widest">Target Resolution Date</label>
                          <input type="date" value={item.targetDate} onChange={e => updateActionPlan(item.id, 'targetDate', e.target.value)} className="w-full bg-[#e8ebf2] p-4 rounded-2xl polymer-inset outline-none text-xs font-bold"/>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={addActionPlanRow} className="w-full py-10 border-4 border-dashed border-slate-300 rounded-[35px] text-slate-400 font-black uppercase tracking-widest text-[10px] hover:bg-white/40 transition-all flex items-center justify-center gap-3"><LucideIcons.PlusCircle className="w-5 h-5"/> Log Clinical Deficiency Entry</button>
              </section>

              {/* AI SUMMARY SECTION */}
              <section className="space-y-8 pt-8 border-t border-black/5">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#e8ebf2] rounded-xl polymer-relief text-purple-500"><LucideIcons.BrainCircuit className="w-5 h-5" /></div>
                    <h3 className="text-lg font-black text-[#1e272e] uppercase tracking-widest">Clinical Summary Report</h3>
                  </div>
                  {isOnline && (
                    <div className="flex gap-2">
                      {aiSummary && (
                        <button onClick={() => { navigator.clipboard.writeText(aiSummary); alert("Summary copied to clinical clipboard."); }} className="p-2.5 bg-[#e8ebf2] rounded-full polymer-relief text-slate-400 hover:text-[#4a69bd] transition-all"><LucideIcons.Copy className="w-4 h-4"/></button>
                      )}
                      <button onClick={generateAISummary} disabled={isGeneratingSummary} className="px-5 py-2.5 bg-[#e8ebf2] rounded-full polymer-relief text-[#4a69bd] font-bold uppercase text-[9px] tracking-widest flex items-center gap-2 hover:scale-105 transition-all">
                        {isGeneratingSummary ? <LucideIcons.Loader2 className="animate-spin w-3.5 h-3.5"/> : <LucideIcons.Sparkles className="w-3.5 h-3.5"/>}
                        {aiSummary ? 'Regenerate Analysis' : 'Synthesize Report'}
                      </button>
                    </div>
                  )}
                </div>
                {aiSummary && (
                  <div className="bg-[#e8ebf2] p-8 rounded-[40px] polymer-inset animate-fade-in border-l-4 border-[#4a69bd]">
                    <p className="text-[#2d3436] font-medium leading-relaxed italic text-sm">{aiSummary}</p>
                  </div>
                )}
              </section>
            </div>
          </main>

          <aside className="space-y-8 sticky top-8 h-fit no-print">
            <div className="bg-[#e8ebf2] p-10 rounded-[45px] polymer-relief text-center space-y-8">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase font-black text-slate-400">Total Compliance</span>
                <div className="text-7xl font-black text-[#4a69bd]">{Math.round(totals.percentage)}%</div>
              </div>
              <div className="py-2.5 px-6 bg-black/5 rounded-full inline-block font-black uppercase tracking-widest text-[10px]" style={{ color: status.color }}>{status.label}</div>
              <div className="h-2.5 w-full bg-black/5 rounded-full overflow-hidden polymer-inset">
                <div className="h-full transition-all duration-1000" style={{ width: `${totals.percentage}%`, backgroundColor: status.hex }}></div>
              </div>
            </div>

            {/* Academic Acknowledgement Card */}
            <div className="bg-[#e8ebf2] p-8 rounded-[40px] polymer-relief space-y-5 border-l-4 border-[#4a69bd] hover:bg-white/20 transition-all">
              <div className="flex items-center gap-3">
                <LucideIcons.GraduationCap className="text-[#4a69bd] w-6 h-6" />
                <span className="font-mono text-[10px] uppercase font-black tracking-widest text-slate-500">Academic Mentorship</span>
              </div>
              <div className="space-y-1.5">
                <p className="text-sm font-black text-[#1e272e]">Prof. Dr. Md. Akram Hossain</p>
                <p className="text-[10px] text-slate-500 leading-relaxed italic">Scientific Advisor providing the clinical framework for IPCScope protocols.</p>
              </div>
              <div className="pt-3 border-t border-black/5">
                <p className="text-[9px] font-black uppercase text-[#4a69bd] tracking-tighter">Developed by Dr. Sourav Nath</p>
              </div>
            </div>

            <div className="space-y-4">
              <button onClick={handleExportPDF} disabled={isExporting} className="w-full bg-[#4a69bd] text-white py-10 rounded-[40px] font-black text-2xl uppercase tracking-widest shadow-xl flex items-center justify-center gap-5 hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50 group">
                {isExporting ? <LucideIcons.Loader2 className="animate-spin w-8 h-8"/> : <LucideIcons.ShieldCheck className="w-8 h-8 group-hover:scale-110 transition-transform"/>}
                Seal & Export
              </button>
              <button onClick={startNewAudit} className="w-full bg-[#e8ebf2] text-slate-400 py-4 rounded-[25px] polymer-inset font-bold text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all"><LucideIcons.RotateCcw className="w-3.5 h-3.5"/> Clear & Reset</button>
            </div>
          </aside>
        </div>

        <footer className="w-full py-16 text-center border-t border-black/5 opacity-60">
          <p className="font-mono text-[9px] uppercase font-bold text-slate-400 tracking-[0.2em] leading-loose">
            Developed by Dr. Sourav Nath | Under the academic supervision of Prof. Dr. Md. Akram Hossain<br />
            MedmetricPro Clinical Audit Systems
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
