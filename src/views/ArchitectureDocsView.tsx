import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Code,
  Copy,
  CreditCard,
  Database,
  FileText,
  Layers,
  Lock,
  Milestone,
  Server,
  Shield,
  Smartphone,
  Terminal,
  Workflow,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ArchitectureDocsView: React.FC = () => {
  const { showToast } = useApp();
  const [activeDocTab, setActiveDocTab] = useState<
    'flows' | 'schema' | 'wireframes' | 'copy' | 'security' | 'payments' | 'mvp'
  >('flows');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    showToast(`📋 ${label} imenakiliwa!`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-6 pb-28 text-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-950 via-[#1A6B3C] to-gray-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 bg-[#F5A623]/20 border border-[#F5A623]/30 px-3 py-1 rounded-full text-xs font-black text-[#F5A623]">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Nyaraka za Uhandisi & Usanifu (System Specifications)</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black">
          ChumbaConnect TZ — Nyaraka na Mwongozo wa Mfumo
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
          Hapa kuna maelezo kamili ya usanifu wa programu, michoro ya mtiririko (user flows), database
          schema ya PostgreSQL, mwongozo wa malipo ya AzamPay/ClickPesa, na orodha ya hatua za MVP.
        </p>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-gray-200 overflow-x-auto gap-2 pb-1 text-xs font-bold no-scrollbar">
        {[
          { id: 'flows', label: '1. User Flows', icon: Workflow },
          { id: 'schema', label: '2. Database Schema', icon: Database },
          { id: 'wireframes', label: '3. Wireframes', icon: Layers },
          { id: 'copy', label: '4. UI Copy (Swahili & English)', icon: FileText },
          { id: 'security', label: '5. Usalama & Privacy', icon: Shield },
          { id: 'payments', label: '6. AzamPay / ClickPesa Guide', icon: CreditCard },
          { id: 'mvp', label: '7. Orodha ya MVP Roadmap', icon: Milestone },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeDocTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveDocTab(tab.id as any)}
              className={`py-2.5 px-3.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#1A6B3C] text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. USER FLOWS */}
      {activeDocTab === 'flows' && (
        <div className="space-y-6 bg-white p-6 rounded-3xl border border-gray-200 shadow-xs">
          <div>
            <h3 className="text-lg font-black text-gray-900">1. Mtiririko wa Watumiaji (User Flows)</h3>
            <p className="text-xs text-gray-500 mt-1">
              Mtiririko wa kina kwa Majukumu matatu: Mpangaji (Tenant), Mwenye Nyumba (Landlord), na Msimamizi (Admin).
            </p>
          </div>

          <div className="space-y-4">
            {/* Tenant Flow */}
            <div className="border border-emerald-200 bg-emerald-50/40 rounded-2xl p-5 space-y-3">
              <h4 className="font-extrabold text-sm text-emerald-950 flex items-center gap-2">
                <span>🎓 Mtiririko wa Mpangaji (Student / Tenant Flow)</span>
              </h4>
              <div className="space-y-2 text-xs text-gray-700 font-mono bg-white p-4 rounded-xl border border-emerald-200 leading-relaxed">
                <div>[1. Fungua App / Tovuti] ➔ [2. Chagua Eneo / Campus ya Chuo]</div>
                <div>➔ [3. Chuja kulingana na Bajeti (TZS), Maji, Umeme & Samani]</div>
                <div>➔ [4. Chagua Chumba ➔ Angalia Picha & Maelezo ya Ndani]</div>
                <div>➔ [5. Bonyeza "Fungua Mawasiliano" (Paywall: TZS 2,000 au 1 Free Referral)]</div>
                <div>➔ [6. Chagua Mtandao: M-Pesa / Airtel / Tigo / Halopesa]</div>
                <div>➔ [7. Ingiza Namba ➔ Pokea STK Push ➔ Thibitisha PIN au Tuma Kumbukumbu ya Lipa]</div>
                <div>➔ [8. Mfumo Uthibitisha ➔ Namba ya Simu & WhatsApp Inafunguka Mara Moja!]</div>
                <div>➔ [9. Mwanafunzi Anapiga Simu / Anatuma WhatsApp ➔ Anatembelea & Kupanga]</div>
              </div>
            </div>

            {/* Landlord Flow */}
            <div className="border border-amber-200 bg-amber-50/40 rounded-2xl p-5 space-y-3">
              <h4 className="font-extrabold text-sm text-amber-950 flex items-center gap-2">
                <span>🏡 Mtiririko wa Mwenye Nyumba (Landlord Flow)</span>
              </h4>
              <div className="space-y-2 text-xs text-gray-700 font-mono bg-white p-4 rounded-xl border border-amber-200 leading-relaxed">
                <div>[1. Jisajili kama Mwenye Nyumba] ➔ [2. Thibitisha Nambari kwa SMS OTP]</div>
                <div>➔ [3. Bonyeza "Orodhesha Chumba Chako"] ➔ [4. Pakia Picha (hadi 10)]</div>
                <div>➔ [5. Jaza Mkoa ➔ Wilaya ➔ Mtaa ➔ Chuo Kilicho Karibu ➔ Kodi / Mwezi]</div>
                <div>➔ [6. Chapisha Hewani (Bila Malipo yoyote ya awali)]</div>
                <div>➔ [7. Simamia kupitia Dashibodi: Tazama Mionekano na Waliofungua]</div>
                <div>➔ [8. Kikumbusho Kila Baada ya Siku 14: "Je Chumba Hiki Kimechukuliwa?"]</div>
                <div>➔ [9. Kikiwa "Kimechukuliwa" ➔ Kinafichwa hewani mara moja; kikiwa wazi tena ➔ Bonyeza "Nakili" au "Washa"]</div>
              </div>
            </div>

            {/* Admin Flow */}
            <div className="border border-purple-200 bg-purple-50/40 rounded-2xl p-5 space-y-3">
              <h4 className="font-extrabold text-sm text-purple-950 flex items-center gap-2">
                <span>⚡ Mtiririko wa Msimamizi (Admin Control Flow)</span>
              </h4>
              <div className="space-y-2 text-xs text-gray-700 font-mono bg-white p-4 rounded-xl border border-purple-200 leading-relaxed">
                <div>[1. Ingia kwenye Panel ya Admin kwa 2FA / Secure Credentials]</div>
                <div>➔ [2. Ukaguzi wa Miamala ya Malipo: Angalia Logs za AzamPay & Malipo ya Offline Lipa]</div>
                <div>➔ [3. Idhinisha (Approve) au Kataa (Reject) Malipo ya Manual ya Lipa Namba]</div>
                <div>➔ [4. Sasisha Nambari za Lipa (M-Pesa, Airtel, Tigo, Halopesa) wakati wowote]</div>
                <div>➔ [5. Dhibiti Vyumba & Watumiaji: Futa matangazo feki na fungia akaunti korofi]</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. DATABASE SCHEMA */}
      {activeDocTab === 'schema' && (
        <div className="space-y-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-gray-900">2. Mfumo wa Database (PostgreSQL DDL)</h3>
              <p className="text-xs text-gray-500">
                Relational schema kamili iliyoundwa kwa ajili ya Postgres / Supabase na utendaji wa juu wa miamala.
              </p>
            </div>
            <button
              onClick={() =>
                copyToClipboard(
                  `-- PostgreSQL DDL for ChumbaConnect TZ\n...`,
                  'PostgreSQL Schema'
                )
              }
              className="py-1.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" /> Nakili Schema
            </button>
          </div>

          <pre className="bg-gray-950 text-emerald-400 p-5 rounded-2xl overflow-x-auto text-[11px] font-mono leading-relaxed border border-gray-800">
{`-- 1. USERS TABLE
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL, -- Format: +255XXXXXXXXX
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'tenant' CHECK (role IN ('tenant', 'landlord', 'admin')),
    referral_code VARCHAR(30) UNIQUE NOT NULL,
    referred_by_id UUID REFERENCES users(id),
    free_views_remaining INT DEFAULT 1,
    is_banned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. LISTINGS TABLE
CREATE TABLE listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    landlord_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    region VARCHAR(100) NOT NULL,      -- Dar es Salaam, Mwanza, etc.
    district VARCHAR(100) NOT NULL,    -- Kinondoni, Nyamagana, etc.
    area VARCHAR(150) NOT NULL,        -- Mwenge, Bwawani, Iyumbu
    campus_nearby VARCHAR(150) NOT NULL, -- UDSM, UDOM, SAUT, etc.
    distance_from_campus VARCHAR(100) NOT NULL,
    price_per_month NUMERIC(12, 2) NOT NULL, -- TZS
    room_type VARCHAR(50) NOT NULL,    -- Single, Self-contained, Bedsitter
    furnishing TEXT[] DEFAULT '{}',    -- ['Kitanda', 'Godoro', 'Meza']
    water_status VARCHAR(100) NOT NULL,
    electricity_status VARCHAR(100) NOT NULL,
    gender_preference VARCHAR(50) DEFAULT 'Wote',
    house_rules TEXT,
    photos TEXT[] NOT NULL,            -- S3 / Cloudinary URLs
    status VARCHAR(20) DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'TAKEN', 'FLAGGED')),
    views_count INT DEFAULT 0,
    unlocks_count INT DEFAULT 0,
    last_verified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. PAYMENTS & TRANSACTIONS TABLE
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    listing_id UUID NOT NULL REFERENCES listings(id),
    operator VARCHAR(30) NOT NULL CHECK (operator IN ('mpesa', 'airtel', 'tigo', 'halo')),
    amount NUMERIC(10, 2) DEFAULT 2000.00,
    currency VARCHAR(10) DEFAULT 'TZS',
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED', 'REJECTED')),
    method VARCHAR(30) DEFAULT 'automated_stk', -- 'automated_stk' or 'manual_lipa'
    transaction_reference VARCHAR(100) NOT NULL,
    receipt_note TEXT,
    receipt_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    verified_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '24 HOURS'
);

-- 4. CONTACT ACCESS PERMISSIONS (UNLOCKED TABLE)
CREATE TABLE contact_unlocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    listing_id UUID NOT NULL REFERENCES listings(id),
    payment_id UUID REFERENCES payments(id),
    used_referral_credit BOOLEAN DEFAULT FALSE,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '24 HOURS',
    UNIQUE (user_id, listing_id)
);

-- 5. REFERRALS TABLE
CREATE TABLE referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_id UUID NOT NULL REFERENCES users(id),
    referee_id UUID NOT NULL REFERENCES users(id),
    has_paid BOOLEAN DEFAULT FALSE,
    bonus_claimed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. LIPA CONFIGURATION TABLE (ADMIN MANAGED)
CREATE TABLE lipa_configs (
    operator VARCHAR(30) PRIMARY KEY,
    operator_name VARCHAR(100) NOT NULL,
    lipa_number VARCHAR(50) NOT NULL,
    account_name VARCHAR(150) NOT NULL,
    contact_phone VARCHAR(50),
    instructions TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`}
          </pre>
        </div>
      )}

      {/* 3. WIREFRAMES */}
      {activeDocTab === 'wireframes' && (
        <div className="space-y-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-xs">
          <h3 className="text-lg font-black text-gray-900">3. Muhtasari wa Wireframes za Skrini Kuu</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-1.5">
              <h4 className="font-extrabold text-sm text-[#1A6B3C]">Skrini ya Mwanzo (Home Wireframe)</h4>
              <p>• Top Banner yenye nembo ya ChumbaConnect TZ, lugha, na arifa.</p>
              <p>• Hero search bar yenye utafutaji wa chuo au eneo.</p>
              <p>• Kadi mbili za hatua ya kwanza: "Tafuta Chumba" (Mpangaji) na "Weka Chumba" (Mwenye Nyumba).</p>
              <p>• Orodha ya vitufe vya vyuo maarufu (UDSM, UDOM, SAUT, MUST, SUA, ARU).</p>
              <p>• Gridi ya vyumba vipya vilivyothibitishwa.</p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-1.5">
              <h4 className="font-extrabold text-sm text-[#1A6B3C]">Skrini ya Utafutaji (Search & Filter)</h4>
              <p>• Upau wa utafutaji wa wakati halisi (Live query filter).</p>
              <p>• Vichujio vya haraka (Single, Self-contained, Bedsitter, n.k.).</p>
              <p>• Kitelezi cha bei (TZS 50,000 hadi 350,000+).</p>
              <p>• Kadi za matokeo zenye picha, umbali kwa miguu, na vitufe vya "Angalia" na "Fungua".</p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-1.5">
              <h4 className="font-extrabold text-sm text-[#1A6B3C]">Paywall ya Kufungua Mawasiliano</h4>
              <p>• Ada: TZS 2,000 (Muda wa saa 24 wa upatikanaji wa namba).</p>
              <p>• Chagua Mtandao: Vodacom M-Pesa, Airtel Money, Tigo/Mixx, Halopesa.</p>
              <p>• STK Push ya papo hapo yenye skrini ya PIN au nambari rasmi ya Lipa.</p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-1.5">
              <h4 className="font-extrabold text-sm text-[#1A6B3C]">Dashibodi ya Mwenye Nyumba</h4>
              <p>• Takwimu za mionekano ya chumba na idadi ya waliofungua mawasiliano.</p>
              <p>• Kitufe cha kugeuza "Kinapatikana" au "Kimechukuliwa".</p>
              <p>• Kitufe cha "Nakili (Duplicate)" ili kuorodhesha chumba kingine kinachofanana kwa sekunde moja.</p>
            </div>
          </div>
        </div>
      )}

      {/* 4. UI COPY BILINGUAL TABLE */}
      {activeDocTab === 'copy' && (
        <div className="space-y-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-xs">
          <h3 className="text-lg font-black text-gray-900">4. Maneno Rasmi ya UI (Kiswahili & Kiingereza)</h3>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-gray-100 font-extrabold text-gray-700 uppercase">
                <tr>
                  <th className="p-3">Sehemu (Component)</th>
                  <th className="p-3">Kiswahili (Primary)</th>
                  <th className="p-3">Kiingereza (English)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                <tr>
                  <td className="p-3 font-bold">App Title</td>
                  <td className="p-3 text-[#1A6B3C]">ChumbaConnect TZ</td>
                  <td className="p-3">ChumbaConnect TZ</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Hero Tagline</td>
                  <td className="p-3">Pata Chumba Safi Karibu na Chuo Chako</td>
                  <td className="p-3">Find Verified Student Rooms Near Your Campus</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Role 1</td>
                  <td className="p-3">Mwanafunzi / Mpangaji</td>
                  <td className="p-3">Student / Tenant</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Role 2</td>
                  <td className="p-3">Mwenye Nyumba</td>
                  <td className="p-3">Landlord / Host</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Unlock CTA</td>
                  <td className="p-3">Fungua Mawasiliano (TZS 2,000)</td>
                  <td className="p-3">Unlock Landlord Contact (2,000 TZS)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Availability 1</td>
                  <td className="p-3 text-emerald-700">Kinapatikana</td>
                  <td className="p-3">Available</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Availability 2</td>
                  <td className="p-3 text-rose-700">Kimechukuliwa</td>
                  <td className="p-3">Taken / Occupied</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Auto-Check</td>
                  <td className="p-3">Je, chumba hiki kimechukuliwa?</td>
                  <td className="p-3">Is this room still available?</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Referral CTA</td>
                  <td className="p-3">Pata Angalia Bure kwa Kila Rafiki Anayejiunga</td>
                  <td className="p-3">Earn 1 Free Contact Unlock Per Referral</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. USALAMA & PRIVACY */}
      {activeDocTab === 'security' && (
        <div className="space-y-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-xs text-xs">
          <h3 className="text-lg font-black text-gray-900">5. Miongozo ya Usalama na Ulinzi wa Data</h3>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <h4 className="font-bold text-sm text-emerald-950 mb-1">
                🔒 Sheria ya Ulinzi wa Taarifa Binafsi (Tanzania Personal Data Protection Act - PDPA)
              </h4>
              <p>
                Nambari za simu za wenye nyumba hazionekani kamwe hadharani kwenye HTML payload ya awali bila malipo halali. Nambari ya simu na WhatsApp inafichwa (masked) na inapewa mtumiaji tu kupitia session token iliyothibitishwa ya backend baada ya malipo ya TZS 2,000.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-1.5">
              <h4 className="font-bold text-sm text-gray-900">Kinga Dhidi ya Mashambulizi ya Mtandao:</h4>
              <p>• <strong>SQL Injection:</strong> Utumiaji wa Parametrized Queries na ORM (Drizzle/Prisma) unaozuia uwekaji wa nambari au herufi haramu.</p>
              <p>• <strong>XSS (Cross-Site Scripting):</strong> Kusafisha pembejeo zote za maelezo ya chumba kwa kutumia sanitize-html kabla ya kuonyeshwa.</p>
              <p>• <strong>Brute-Force & Rate Limiting:</strong> Kuzuia maombi yasiyozidi 5 kwa dakika kwenye endpoints za kuingia na kuomba OTP (Redis rate-limiter).</p>
              <p>• <strong>CSRF Protection:</strong> Utumiaji wa SameSite=Lax/Strict HttpOnly cookies kwa session management.</p>
            </div>
          </div>
        </div>
      )}

      {/* 6. PAYMENT INTEGRATION GUIDE */}
      {activeDocTab === 'payments' && (
        <div className="space-y-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-xs text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-gray-900">
              6. Mwongozo wa Hatua kwa Hatua: AzamPay au ClickPesa
            </h3>
            <span className="text-[10px] bg-[#1A6B3C] text-white font-bold px-2.5 py-1 rounded-full">
              Recommended Aggregator
            </span>
          </div>

          <div className="space-y-3 leading-relaxed">
            <div className="border border-gray-200 rounded-2xl p-4 space-y-2">
              <h4 className="font-bold text-sm text-gray-900">Hatua ya 1: Usajili wa Akaunti & Sandbox Keys</h4>
              <p>
                1. Jisajili kama Kampuni / Biashara kwenye tovuti ya AzamPay (<strong>azampay.co.tz</strong>) au ClickPesa.
              </p>
              <p>
                2. Pata <code>Client ID</code>, <code>Client Secret</code>, na <code>Webhook Secret</code> kwa ajili ya Mazingira ya Majaribio (Sandbox).
              </p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-4 space-y-2">
              <h4 className="font-bold text-sm text-gray-900">Hatua ya 2: Kuanzisha Muamala (STK Push API)</h4>
              <p>Backend inatuma ombi la <code>POST https://sandbox.azampay.co.tz/azampay/mno/checkout</code>:</p>
              <pre className="bg-gray-900 text-amber-300 p-3 rounded-xl font-mono text-[11px] overflow-x-auto">
{`{
  "accountNumber": "255712345678",
  "amount": "2000.00",
  "currency": "TZS",
  "provider": "Mpesa", // Mpesa | Airtel | Tigo | Halopesa
  "externalId": "txn_89210_chumba",
  "additionalProperties": {
    "listingId": "list_1",
    "userId": "user_tenant_1"
  }
}`}
              </pre>
            </div>

            <div className="border border-gray-200 rounded-2xl p-4 space-y-2">
              <h4 className="font-bold text-sm text-gray-900">Hatua ya 3: Kupokea Webhook Callback</h4>
              <p>
                AzamPay inatuma matokeo ya muamala kwenye endpoint yako <code>POST /api/payments/callback</code>:
              </p>
              <pre className="bg-gray-900 text-emerald-300 p-3 rounded-xl font-mono text-[11px] overflow-x-auto">
{`// 1. Validate signature headers
// 2. If status === "success"
await db.contact_unlocks.create({
  userId: payload.userId,
  listingId: payload.listingId,
  expiresAt: new Date(Date.now() + 24 * 3600 * 1000)
});`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* 7. MVP ROADMAP */}
      {activeDocTab === 'mvp' && (
        <div className="space-y-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-xs text-xs">
          <h3 className="text-lg font-black text-gray-900">7. Orodha ya Awamu za MVP (Roadmap)</h3>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="font-bold text-emerald-900 block text-sm">
                Awamu ya 1: MVP ya Awali (Iliyotekelezwa Kikamilifu Sasa)
              </span>
              <p>• Utafutaji wa vyumba kwa campus na maeneo ya Tanzania.</p>
              <p>• Usajili wa wenye nyumba na wapangaji wenye OTP.</p>
              <p>• Paywall ya TZS 2,000 yenye mitandao minne ya simu (M-Pesa, Airtel, Tigo, Halopesa) na Lipa namba za dharura.</p>
              <p>• Mfumo wa rufaa (Referrals) wenye kiungo na share ya WhatsApp.</p>
              <p>• Panel ya Admin ya kuidhinisha malipo na kusimamia vyumba.</p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-1">
              <span className="font-bold text-gray-900 block text-sm">
                Awamu ya 2: Maboresho ya Baadaye (Post-MVP Enhancements)
              </span>
              <p>• Ramani shirikishi (Interactive Leaflet / Google Maps routing kutoka lango la chuo).</p>
              <p>• Chat ya ndani ya app (In-app real-time messaging kabla ya kubadilishana namba).</p>
              <p>• Malipo ya kodi ya mwezi nzima kupitia Escrow kulinda wanafunzi dhidi ya wenye nyumba wasioaminika.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
