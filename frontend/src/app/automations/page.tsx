'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Minus, MonitorPlay, Music2, Camera, Power, Settings2, X, Clock, PenTool, Film, PlayCircle, ChevronDown, ChevronUp, CheckCircle2, CircleDashed, Loader2, Sparkles, Wand2, AlertCircle } from 'lucide-react';

export default function AutomationsPage() {
  const [accountsData, setAccountsData] = useState<any[]>([]);
  const [expandedAccounts, setExpandedAccounts] = useState<string[]>(['gaming_ch']); // Default expand first one
  const [savingStatus, setSavingStatus] = useState<Record<string, 'idle' | 'saving' | 'saved'>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/accounts/');
        if (response.ok) {
          const data = await response.json();
          setAccountsData(prevData => {
            if (prevData.length === 0) return data;
            return data.map((newAcc: any) => {
              const existingAcc = prevData.find((a: any) => a.id === newAcc.id);
              if (existingAcc) {
                return {
                  ...newAcc,
                  persona: existingAcc.persona // Preserve local unsaved edits
                };
              }
              return newAcc;
            });
          });
        }
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
    const interval = setInterval(fetchAccounts, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleAccount = (id: string) => {
    setExpandedAccounts(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleQuotaChange = (accountId: string, change: number) => {
    setAccountsData(prev => prev.map(acc => {
      if (acc.id === accountId) {
        const newQuota = Math.max(1, acc.persona.quota + change); // 최소 1개 유지
        return { ...acc, persona: { ...acc.persona, quota: newQuota } };
      }
      return acc;
    }));
  };

  const handleFieldChange = (accountId: string, field: 'prompt' | 'template' | 'target_channels' | 'ai_generation_enabled', value: any) => {
    setAccountsData(prev => prev.map(acc => {
      if (acc.id === accountId) {
        return { ...acc, persona: { ...acc.persona, [field]: value } };
      }
      return acc;
    }));
  };

  const handleSave = async (accountId: string) => {
    setSavingStatus(prev => ({ ...prev, [accountId]: 'saving' }));
    
    const account = accountsData.find(a => a.id === accountId);
    if (!account) return;

    try {
      const response = await fetch(`http://localhost:8000/api/accounts/${accountId}/persona`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(account.persona)
      });
      
      if (response.ok) {
        setSavingStatus(prev => ({ ...prev, [accountId]: 'saved' }));
      } else {
        setSavingStatus(prev => ({ ...prev, [accountId]: 'idle' }));
        console.error("Failed to save persona");
      }
    } catch (error) {
      console.error("Error saving persona:", error);
      setSavingStatus(prev => ({ ...prev, [accountId]: 'idle' }));
    }

    setTimeout(() => {
      setSavingStatus(prev => ({ ...prev, [accountId]: 'idle' }));
    }, 2000);
  };

  const renderStatusBadge = (status: string) => {
    if (status === 'Uploaded') return <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold"><CheckCircle2 size={14}/> Uploaded</span>;
    if (status === 'Pending') return <span className="flex items-center gap-1 text-amber-400 text-xs font-bold animate-pulse"><CircleDashed size={14}/> Pending</span>;
    if (status === 'Failed') return <span className="flex items-center gap-1 text-red-400 text-xs font-bold"><AlertCircle size={14}/> Failed</span>;
    if (status === 'N/A') return <span className="text-zinc-600 text-xs font-medium">-</span>;
    return null;
  };

  return (
    <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mt-2 md:mt-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-50 tracking-tight">Account Automations</h1>
          <p className="mt-1 text-xs md:text-sm text-zinc-400">
            Manage AI personas and multi-platform distribution per Google Account.
          </p>
        </div>
        
        <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] whitespace-nowrap w-full sm:w-auto">
          <Plus size={18} />
          <span>Add Google Account</span>
        </button>
      </header>

      {/* Accounts List (Accordions) */}
      <section className="space-y-4 md:space-y-6">
        {isLoading && accountsData.length === 0 ? (
          <div className="flex items-center justify-center p-12 text-zinc-500">
            <Loader2 className="animate-spin mr-2" size={24} /> Loading accounts...
          </div>
        ) : accountsData.map((account) => {
          const isExpanded = expandedAccounts.includes(account.id);
          
          return (
            <div key={account.id} className="bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden shadow-lg transition-all">
              
              {/* Accordion Header */}
              <div 
                onClick={() => toggleAccount(account.id)}
                className="p-4 md:p-6 cursor-pointer hover:bg-zinc-800/50 transition-colors flex items-start sm:items-center justify-between group"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  {/* Status Toggle (Mock) */}
                  <div className="flex-shrink-0 relative z-10 hidden sm:flex">
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        account.status === 'Active' 
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:bg-blue-500/30' 
                          : 'bg-zinc-800 text-zinc-500 border border-zinc-700 hover:bg-zinc-700'
                      }`}
                    >
                      <Power size={18} className="md:w-5 md:h-5" />
                    </button>
                  </div>
                  
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                      <h2 className="text-lg md:text-xl font-bold text-zinc-100 group-hover:text-blue-400 transition-colors break-all">{account.email}</h2>
                      <span className="bg-zinc-800 text-zinc-400 text-[10px] md:text-xs px-2.5 py-0.5 rounded-full border border-zinc-700 w-fit">Workspace</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2">
                      {/* Platform Icons & Auth Status */}
                      <div className="flex items-center gap-2 opacity-90">
                        <div className="flex items-center gap-1.5">
                          <MonitorPlay size={14} className="md:w-4 md:h-4 text-red-500" />
                          {!account.has_youtube_token ? (
                            <a href={`http://localhost:8000/api/auth/youtube/login?account_id=${account.id}`} className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded hover:bg-red-500/30 transition-colors">Connect</a>
                          ) : (
                            <span className="text-[10px] text-zinc-500">Connected</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Music2 size={14} className="md:w-4 md:h-4 text-[#00f2fe]" />
                          {!account.has_tiktok_token ? (
                            <a href={`http://localhost:8000/api/auth/tiktok/login?account_id=${account.id}`} className="text-[10px] bg-[#00f2fe]/20 text-[#00f2fe] px-2 py-0.5 rounded hover:bg-[#00f2fe]/30 transition-colors">Connect</a>
                          ) : (
                            <span className="text-[10px] text-zinc-500">Connected</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Camera size={14} className="md:w-4 md:h-4 text-pink-500" />
                          {!account.has_instagram_token ? (
                            <a href={`http://localhost:8000/api/auth/instagram/login?account_id=${account.id}`} className="text-[10px] bg-pink-500/20 text-pink-400 px-2 py-0.5 rounded hover:bg-pink-500/30 transition-colors">Connect</a>
                          ) : (
                            <span className="text-[10px] text-zinc-500">Connected</span>
                          )}
                        </div>
                      </div>
                      <span className="text-zinc-600 text-xs hidden sm:inline">•</span>
                      <span className="text-xs md:text-sm text-zinc-400 font-medium">Daily Quota: <span className="text-zinc-200">{account.persona.quota} Clips</span></span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                  {isExpanded ? <ChevronUp size={20} className="md:w-6 md:h-6 text-zinc-500" /> : <ChevronDown size={20} className="md:w-6 md:h-6 text-zinc-500 group-hover:text-zinc-300 transition-colors" />}
                </div>
              </div>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="border-t border-[#27272a] bg-zinc-900/30 p-4 md:p-6 flex flex-col gap-6 md:gap-8">
                  
                  {/* 1. Persona Studio Panel */}
                  <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-4 md:p-6 shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />
                    
                    <div className="flex items-center justify-between mb-4 md:mb-5 relative z-10">
                      <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                        <Sparkles size={16} className="text-amber-400" /> AI Persona Studio
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 relative z-10">
                      {/* Left: Prompt & Sourcing (Takes up 7 cols) */}
                      <div className="lg:col-span-7 flex flex-col gap-4">
                        <div className="flex flex-col">
                          <label className="text-xs font-medium text-zinc-400 mb-2">System Prompt / Tone & Manner</label>
                          <textarea 
                            value={account.persona.prompt || ''}
                            onChange={(e) => handleFieldChange(account.id, 'prompt', e.target.value)}
                            className="w-full flex-1 bg-zinc-900/80 border border-zinc-800 rounded-lg p-3.5 text-sm text-zinc-200 focus:outline-none focus:border-blue-500/50 resize-none min-h-[90px]"
                          />
                        </div>
                        
                        <div className="flex flex-col">
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-medium text-zinc-400">Target Channels (Comma separated URLs)</label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <span className="text-xs font-medium text-purple-400 flex items-center gap-1"><Wand2 size={12}/> AI Generation</span>
                              <input 
                                type="checkbox" 
                                checked={account.persona.ai_generation_enabled || false}
                                onChange={(e) => handleFieldChange(account.id, 'ai_generation_enabled', e.target.checked)}
                                className="accent-purple-500"
                              />
                            </label>
                          </div>
                          <input 
                            type="text"
                            disabled={account.persona.ai_generation_enabled}
                            placeholder="e.g. https://youtube.com/@mrbeast, https://youtube.com/@mkbhd"
                            value={account.persona.target_channels || ''}
                            onChange={(e) => handleFieldChange(account.id, 'target_channels', e.target.value)}
                            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg p-2.5 text-sm text-zinc-200 focus:outline-none focus:border-blue-500/50 disabled:opacity-50"
                          />
                        </div>
                      </div>
                      
                      {/* Right: Controls & Button (Takes up 5 cols) */}
                      <div className="lg:col-span-5 flex flex-col justify-between gap-4 md:gap-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <label className="text-xs font-medium text-zinc-400 mb-2">Target Quota</label>
                            <div className="flex items-center justify-between bg-zinc-900/80 border border-zinc-800 rounded-lg h-[42px] px-1">
                              <button 
                                onClick={() => handleQuotaChange(account.id, -1)}
                                className="w-8 h-[34px] flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/80 rounded-md transition-colors"
                              >
                                <Minus size={14} />
                              </button>
                              <div className="flex items-center gap-1.5 px-2 w-16 justify-center">
                                <span className="text-sm font-bold text-zinc-100">{account.persona.quota}</span>
                                <span className="text-[11px] font-medium text-zinc-500">Clips</span>
                              </div>
                              <button 
                                onClick={() => handleQuotaChange(account.id, 1)}
                                className="w-8 h-[34px] flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/80 rounded-md transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex flex-col">
                            <label className="text-xs font-medium text-zinc-400 mb-2">Design Template</label>
                            <select 
                              value={account.persona.template}
                              onChange={(e) => handleFieldChange(account.id, 'template', e.target.value)}
                              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg p-2.5 text-sm text-zinc-200 focus:outline-none focus:border-blue-500/50 h-[42px]"
                            >
                              <option value="Gaming Bold">Gaming Bold</option>
                              <option value="Tech Review V1">Tech Review V1</option>
                              <option value="Minimalist White">Minimalist White</option>
                              <option value="Subtitle Only">Subtitle Only</option>
                            </select>
                          </div>
                        </div>

                        {/* Save Button aligned to bottom right */}
                        <div className="flex justify-end mt-4">
                          <button 
                            onClick={() => handleSave(account.id)}
                            disabled={savingStatus[account.id] === 'saving'}
                            className={`text-sm py-2.5 px-6 rounded-lg font-medium transition-all shadow-lg w-full sm:w-auto flex items-center justify-center gap-2 ${
                              savingStatus[account.id] === 'saving' ? 'bg-blue-600/50 text-white/70 cursor-not-allowed' :
                              savingStatus[account.id] === 'saved' ? 'bg-emerald-500 hover:bg-emerald-400 text-white' :
                              'bg-blue-600/90 hover:bg-blue-500 text-white'
                            }`}
                          >
                            {savingStatus[account.id] === 'saving' && <Loader2 size={16} className="animate-spin" />}
                            {savingStatus[account.id] === 'saved' && <CheckCircle2 size={16} />}
                            {savingStatus[account.id] === 'saving' ? 'Saving...' :
                             savingStatus[account.id] === 'saved' ? 'Saved Successfully' :
                             'Save Configuration'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. Clip Matrix Board */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                        <Wand2 size={16} className="text-purple-400" /> Today's Clips Matrix
                      </h3>
                      <button className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1">
                        View History <ChevronDown size={14} className="-rotate-90"/>
                      </button>
                    </div>
                    
                    <div className="bg-[#18181b] border border-zinc-800 rounded-xl overflow-x-auto shadow-inner">
                      <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                          <tr className="border-b border-zinc-800 bg-zinc-900/80">
                            <th className="p-4 text-xs font-semibold text-zinc-400 w-16 text-center">Clip #</th>
                            <th className="p-4 text-xs font-semibold text-zinc-400">Topic / Title</th>
                            <th className="p-4 text-xs font-semibold text-zinc-400">Generation</th>
                            <th className="p-4 text-xs font-semibold text-zinc-400 text-center"><div className="flex items-center justify-center gap-1.5"><MonitorPlay size={14} className="text-red-500"/> YouTube</div></th>
                            <th className="p-4 text-xs font-semibold text-zinc-400 text-center"><div className="flex items-center justify-center gap-1.5"><Music2 size={14} className="text-[#00f2fe]"/> TikTok</div></th>
                            <th className="p-4 text-xs font-semibold text-zinc-400 text-center"><div className="flex items-center justify-center gap-1.5"><Camera size={14} className="text-pink-500"/> Instagram</div></th>
                            <th className="p-4 text-xs font-semibold text-zinc-400 w-16"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                          {account.clips.map((clip, index) => (
                            <tr key={clip.id} className="hover:bg-zinc-800/20 transition-colors group">
                              <td className="p-4 text-center">
                                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-500 mx-auto">
                                  {index + 1}
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="text-sm font-medium text-zinc-200 group-hover:text-blue-400 transition-colors">{clip.title}</span>
                              </td>
                              <td className="p-4">
                                {clip.status === 'Done' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20"><CheckCircle2 size={12}/> Done</span>}
                                {clip.status === 'Rendering' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20"><Loader2 size={12} className="animate-spin"/> Rendering 68%</span>}
                                {clip.status === 'Draft' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 text-zinc-400 text-xs font-bold border border-zinc-700">Draft</span>}
                              </td>
                              <td className="p-4 text-center">
                                <div className="flex justify-center">{renderStatusBadge(clip.platforms.youtube)}</div>
                              </td>
                              <td className="p-4 text-center">
                                <div className="flex justify-center">{renderStatusBadge(clip.platforms.tiktok)}</div>
                              </td>
                              <td className="p-4 text-center">
                                <div className="flex justify-center">{renderStatusBadge(clip.platforms.instagram)}</div>
                              </td>
                              <td className="p-4 text-center">
                                <button className="p-1.5 text-zinc-500 hover:text-zinc-200 rounded-md hover:bg-zinc-800 transition-colors">
                                  <Settings2 size={16} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </section>

    </main>
  );
}
