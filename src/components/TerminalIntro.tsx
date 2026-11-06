import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, Copy, Check } from 'lucide-react';
import { profileData } from '../data/profile';

type CommandMode = 'whoami' | 'drf-spec' | 'health';

export const TerminalIntro: React.FC = () => {
  const [activeMode, setActiveMode] = useState<CommandMode>('whoami');
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [copied, setCopied] = useState(false);

  const terminalScripts: Record<CommandMode, { cmd: string; lines: string[] }> = {
    whoami: {
      cmd: 'whoami --verbose',
      lines: [
        `Name: ${profileData.name}`,
        `Role: Software Engineering Apprentice | Python Backend Developer`,
        `Location: ${profileData.location}`,
        `Core Stack: Python • Django • Django REST Framework • PostgreSQL`,
        `Apprenticeship: Production API development & enterprise system workflows`,
        `Status: [ACTIVE] Available for backend roles & collaboration`,
      ],
    },
    'drf-spec': {
      cmd: 'python manage.py show_urls | grep /api/v1/',
      lines: [
        'POST   /api/v1/clients/              -> ClientViewSet.create [RBAC: Officer]',
        'GET    /api/v1/loans/                -> LoanViewSet.list [Filter: status]',
        'POST   /api/v1/loans/apply/          -> LoanApplicationView [Transaction: Atomic]',
        'GET    /api/v1/loans/<ref>/status/   -> WorkflowStateView [Guards: JWT]',
        'GET    /api/v1/audit-logs/           -> AuditLogViewSet.readonly',
        'Database: PostgreSQL (ACID guaranteed, normalized schema)',
      ],
    },
    health: {
      cmd: 'curl -i https://backend.ugandaexim.local/healthz',
      lines: [
        'HTTP/1.1 200 OK',
        'Server: gunicorn/23.0.0 (Python 3.12+)',
        'Content-Type: application/json; charset=utf-8',
        'X-Service-State: healthy (PostgreSQL latency: 1.8ms)',
        '{"status": "UP", "database": "CONNECTED", "auth_guard": "OPERATIONAL"}',
      ],
    },
  };

  useEffect(() => {
    let timeout: any;
    const currentScript = terminalScripts[activeMode];
    const fullContent = currentScript.lines.join('\n');
    let index = 0;
    setDisplayedText('');
    setIsTyping(true);

    const typeChar = () => {
      if (index < fullContent.length) {
        setDisplayedText(fullContent.slice(0, index + 3));
        index += 3;
        timeout = setTimeout(typeChar, 18);
      } else {
        setDisplayedText(fullContent);
        setIsTyping(false);
      }
    };

    timeout = setTimeout(typeChar, 120);
    return () => clearTimeout(timeout);
  }, [activeMode]);

  const handleCopy = () => {
    const script = terminalScripts[activeMode];
    const textToCopy = `$ ${script.cmd}\n${script.lines.join('\n')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl overflow-hidden border border-sky-500/25 bg-[#090f1e]/95 backdrop-blur-xl shadow-2xl shadow-sky-950/40 text-slate-200 font-mono text-xs sm:text-[13px]">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e172a] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/40" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/40" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/40" />
          <span className="ml-2 text-slate-400 text-xs flex items-center gap-1.5 font-sans">
            <TerminalIcon className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-mono text-slate-300">jovin@backend-node: ~/workspace</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1 text-slate-400 hover:text-sky-300 transition-colors rounded hover:bg-slate-800"
            title="Copy terminal session"
            aria-label="Copy terminal text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Interactive Command Tabs */}
      <div className="flex items-center gap-1 px-3 py-2 bg-[#0b1324] border-b border-slate-800/80 overflow-x-auto">
        <span className="text-[11px] text-slate-400 mr-1 uppercase font-semibold tracking-wider font-sans">Run:</span>
        <button
          onClick={() => setActiveMode('whoami')}
          className={`px-2.5 py-1 rounded-md text-xs transition-colors flex items-center gap-1.5 ${
            activeMode === 'whoami'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30 font-medium'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <span>$ whoami</span>
        </button>
        <button
          onClick={() => setActiveMode('drf-spec')}
          className={`px-2.5 py-1 rounded-md text-xs transition-colors flex items-center gap-1.5 ${
            activeMode === 'drf-spec'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30 font-medium'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <span>$ show_urls</span>
        </button>
        <button
          onClick={() => setActiveMode('health')}
          className={`px-2.5 py-1 rounded-md text-xs transition-colors flex items-center gap-1.5 ${
            activeMode === 'health'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30 font-medium'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <span>$ curl /healthz</span>
        </button>
      </div>

      {/* Terminal Screen Body */}
      <div className="p-4 sm:p-5 min-h-[190px] leading-relaxed select-text space-y-2">
        <div className="flex items-center gap-2 text-sky-400 font-semibold">
          <span className="text-emerald-400">jovin@uganda-exim</span>
          <span className="text-slate-400">:</span>
          <span className="text-blue-400">~/app</span>
          <span className="text-slate-400">$</span>
          <span className="text-white">{terminalScripts[activeMode].cmd}</span>
        </div>

        <pre className="text-slate-300 whitespace-pre-wrap font-mono text-[12px] sm:text-[13px] leading-relaxed">
          {displayedText}
          {isTyping && (
            <span className="inline-block w-2 h-4 ml-1 bg-sky-400 animate-pulse align-middle" />
          )}
        </pre>
      </div>

      {/* Terminal Status bar */}
      <div className="px-4 py-2 bg-[#070c17] border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>DRF Session: Attached</span>
        </div>
        <div className="text-slate-400">
          Python 3.12 • PostgreSQL 16
        </div>
      </div>
    </div>
  );
};
