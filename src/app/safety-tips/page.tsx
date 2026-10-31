import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Eye,
  CreditCard,
  Building,
  PhoneCall,
  ArrowRight
} from 'lucide-react';

export const metadata = {
  title: 'Real Estate Safety & Anti-Fraud Advice — Regis Integrated Services Limited',
  description: 'Crucial safety guidelines for renting and buying property in Nigeria. Learn how to verify land titles, avoid upfront payment scams, and inspect properties safely.',
};

export default function SafetyTipsPage() {
  const tips = [
    {
      icon: Eye,
      title: 'Always Conduct a Physical Inspection First',
      description: 'Never commit funds, make deposits, or pay "booking fees" for any house, flat, or land before you or your trusted representative have physically visited and inspected the property.',
      action: 'Inspections should occur during daylight hours in the presence of the verified agent or caretaker.',
    },
    {
      icon: CreditCard,
      title: 'Do Not Pay Into Private Personal Accounts',
      description: 'Avoid agents requesting money into personal bank accounts for purported legal fees or owner hold fees. For transactions, ensure payments are made directly to the verified owner or reputable developer corporate accounts with formal receipts.',
      action: 'Demand a written agreement or letter of allocation before transferring any transaction funds.',
    },
    {
      icon: FileCheck,
      title: 'Verify Land Titles at Alausa or AGIS',
      description: 'Before finalizing any purchase or joint venture, instruct a licensed real estate solicitor to search the title at the relevant Lands Registry (e.g. Alausa in Lagos or AGIS in Abuja) to verify Governor\'s Consent, Certificate of Occupancy (C of O), or Gazette.',
      action: 'Confirm the seller\'s identity matches the name recorded on the title documents.',
    },
    {
      icon: Building,
      title: 'Check Drainage & Rainy Season Accessibility',
      description: 'Ask neighbors and inspect road levels, drainage gutters, and water marks on fence walls to evaluate if the area is prone to severe flooding during the rainy season in coastal cities like Lagos or Port Harcourt.',
      action: 'Look for functional central drainage systems and check access roads.',
    },
    {
      icon: ShieldCheck,
      title: 'Transact with Accredited Agents & Developers',
      description: 'Look for verified and accredited developers and certified estate surveyors. Prioritize firms registered with the Corporate Affairs Commission (CAC) and licensed with bodies like NIESV (Nigerian Institution of Estate Surveyors and Valuers) or REDAN.',
      action: 'Check an agent\'s listing track record and customer reviews on our platform.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <main className="flex-1 py-10 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Header Banner */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 mb-3">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>OFFICIAL BUYER & TENANT PROTECTION GUIDE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[var(--foreground-strong)] tracking-tight">
              Safety Advice for Property Seekers in Nigeria
            </h1>
            <p className="mt-2 text-sm text-[var(--foreground-muted)] max-w-2xl mx-auto">
              Protect your hard-earned funds with our essential checklist before renting, buying, or investing in real estate across Nigeria.
            </p>
          </div>

          {/* Critical Warning Callout */}
          <div className="rounded-2xl bg-red-50 dark:bg-red-950/30 border-2 border-red-500/40 p-6 sm:p-8 mb-10 flex flex-col sm:flex-row items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400 shrink-0 mt-1" />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-red-900 dark:text-red-200">
                CRITICAL WARNING: Zero Upfront Payment Policy
              </h2>
              <p className="text-xs sm:text-sm text-red-800 dark:text-red-300 leading-relaxed mt-1">
                Regis Integrated Services Limited maintains strict transparent client documentation and bank transactions. Any unauthorized individual asking you to send personal "caution deposits", "commitment fees", or "inspection fees" via personal mobile transfer before meeting physically is a fraudster. Report such communications immediately.
              </p>
            </div>
          </div>

          {/* Detailed Tips List */}
          <div className="space-y-6 mb-12">
            {tips.map((tip, idx) => {
              const Icon = tip.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-sm flex flex-col sm:flex-row gap-5 items-start"
                >
                  <div className="size-12 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-extrabold text-base text-[var(--foreground-strong)]">
                      {idx + 1}. {tip.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                      {tip.description}
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 pt-1">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{tip.action}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Support / Report Card */}
          <div className="rounded-2xl bg-[var(--surface-1)] border border-[var(--border)] p-6 sm:p-8 text-center space-y-4">
            <h3 className="text-lg font-bold text-[var(--foreground-strong)]">
              Need to Report a Suspicious Listing or Agent?
            </h3>
            <p className="text-xs text-[var(--foreground-muted)] max-w-lg mx-auto">
              Our trust and safety team actively monitors the platform. If you encounter any irregularities, please contact our support desk immediately.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="mailto:support@nigeriapropertycentre.com"
                className="px-5 py-2.5 rounded-full text-xs font-bold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm"
              >
                Email Trust & Safety Desk
              </a>
              <Link
                href="/for-sale"
                className="px-5 py-2.5 rounded-full text-xs font-bold bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--surface-2)] text-[var(--foreground-strong)] transition-colors"
              >
                Browse Verified Properties
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
