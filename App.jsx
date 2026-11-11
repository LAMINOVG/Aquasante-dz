import React, { useState, useMemo, useEffect } from 'react';
import { 
  Droplets, HeartPulse, ShieldAlert, CheckCircle2, AlertTriangle, 
  Search, Info, SlidersHorizontal, ArrowLeftRight, PlusCircle, 
  MapPin, Sparkles, BookOpen, X, Check, RotateCcw, Award
} from 'lucide-react';

const INITIAL_WATERS = [
  // EST
  { id: "ifri", name: "Ifri", type: "eau_minerale_naturelle", region: "Est", wilaya: "Béjaïa", source: "Ighzer Amokrane", composition: { calcium: 93, magnesium: 18, sodium: 17, potassium: 2.2, bicarbonates: 286, sulfates: 45, chlorures: 25, nitrates: 4, residuSec: 390, ph: 7.3 } },
  { id: "toudja", name: "Toudja", type: "eau_de_source", region: "Est", wilaya: "Béjaïa", source: "Toudja", composition: { calcium: 62, magnesium: 14, sodium: 15, potassium: 1.5, bicarbonates: 215, sulfates: 24, chlorures: 22, nitrates: 5, residuSec: 275, ph: 7.4 } },
  { id: "batna", name: "Batna", type: "eau_minerale_naturelle", region: "Est", wilaya: "Batna", source: "Aïn Kasrou", composition: { calcium: 78, magnesium: 24, sodium: 11, potassium: 1.8, bicarbonates: 295, sulfates: 32, chlorures: 19, nitrates: 3.5, residuSec: 330, ph: 7.4 } },
  { id: "texanna", name: "Texanna", type: "eau_de_source", region: "Est", wilaya: "Jijel", source: "Texenna", composition: { calcium: 42, magnesium: 9, sodium: 9.5, potassium: 1.0, bicarbonates: 145, sulfates: 16, chlorures: 15, nitrates: 3, residuSec: 185, ph: 7.3 } },
  { id: "youkous", name: "Youkous", type: "eau_minerale_naturelle", region: "Est", wilaya: "Tébessa", source: "Hammamet", composition: { calcium: 96, magnesium: 21, sodium: 13.5, potassium: 2.0, bicarbonates: 310, sulfates: 48, chlorures: 22, nitrates: 4.5, residuSec: 410, ph: 7.2 } },
  { id: "besbassa", name: "Besbassa", type: "eau_de_source", region: "Est", wilaya: "Souk Ahras", source: "M'daourouch", composition: { calcium: 55, magnesium: 13, sodium: 10, potassium: 1.2, bicarbonates: 190, sulfates: 22, chlorures: 16, nitrates: 4, residuSec: 235, ph: 7.4 } },
  { id: "ifren", name: "Ifren", type: "eau_de_source", region: "Est", wilaya: "Béjaïa", source: "Akbou", composition: { calcium: 74, magnesium: 16, sodium: 14, potassium: 1.8, bicarbonates: 245, sulfates: 30, chlorures: 20, nitrates: 4.2, residuSec: 310, ph: 7.3 } },
  { id: "hammamet", name: "Hammamet", type: "eau_minerale_naturelle", region: "Est", wilaya: "Tébessa", source: "Tébessa", composition: { calcium: 88, magnesium: 19, sodium: 16, potassium: 2.1, bicarbonates: 280, sulfates: 40, chlorures: 24, nitrates: 5, residuSec: 375, ph: 7.3 } },
  { id: "alma", name: "Alma", type: "eau_de_source", region: "Est", wilaya: "Béjaïa", source: "Fenaïa Ilmaten", composition: { calcium: 68, magnesium: 15, sodium: 13, potassium: 1.6, bicarbonates: 230, sulfates: 28, chlorures: 19, nitrates: 3.8, residuSec: 290, ph: 7.4 } },
  { id: "mileza", name: "Mileza", type: "eau_de_source", region: "Est", wilaya: "Mila", source: "Mila", composition: { calcium: 82, magnesium: 19, sodium: 18, potassium: 1.9, bicarbonates: 265, sulfates: 44, chlorures: 26, nitrates: 6, residuSec: 355, ph: 7.2 } },
  { id: "ngaous", name: "N'Gaous", type: "eau_minerale_naturelle", region: "Est", wilaya: "Batna", source: "N'Gaous", composition: { calcium: 92, magnesium: 27, sodium: 15, potassium: 2.3, bicarbonates: 325, sulfates: 52, chlorures: 21, nitrates: 4.5, residuSec: 420, ph: 7.3 } },
  { id: "qniaa", name: "Qniaa", type: "eau_de_source", region: "Est", wilaya: "Batna", source: "Merouana", composition: { calcium: 71, magnesium: 20, sodium: 12, potassium: 1.7, bicarbonates: 255, sulfates: 31, chlorures: 18, nitrates: 3.2, residuSec: 305, ph: 7.4 } },
  { id: "bouglez", name: "Bouglez", type: "eau_de_source", region: "Est", wilaya: "El Tarf", source: "Hammam Beni Salah", composition: { calcium: 36, magnesium: 8, sodium: 11, potassium: 0.9, bicarbonates: 120, sulfates: 14, chlorures: 16, nitrates: 2.5, residuSec: 165, ph: 7.1 } },

  // CENTRE
  { id: "lalla_khedidja", name: "Lalla Khedidja", type: "eau_minerale_naturelle", region: "Centre", wilaya: "Tizi Ouzou", source: "Djurdjura", composition: { calcium: 48, magnesium: 12, sodium: 8.5, potassium: 1.1, bicarbonates: 175, sulfates: 18, chlorures: 14, nitrates: 2.5, residuSec: 195, ph: 7.5 } },
  { id: "mouzaia", name: "Mouzaïa (Gazeuse)", type: "eau_gazeuse", region: "Centre", wilaya: "Blida", source: "Mouzaïa", composition: { calcium: 145, magnesium: 48, sodium: 92, potassium: 6.0, bicarbonates: 620, sulfates: 80, chlorures: 75, nitrates: 1.0, residuSec: 850, ph: 6.1 } },
  { id: "sidi_el_kebir", name: "Sidi El Kebir", type: "eau_de_source", region: "Centre", wilaya: "Blida", source: "Atlas Blidéen", composition: { calcium: 58, magnesium: 15, sodium: 11, potassium: 1.4, bicarbonates: 205, sulfates: 25, chlorures: 17, nitrates: 3.5, residuSec: 250, ph: 7.4 } },
  { id: "nestle_pure_life", name: "Nestlé Pure Life", type: "eau_de_source", region: "Centre", wilaya: "Blida", source: "Oued El Alleug", composition: { calcium: 65, magnesium: 16, sodium: 21, potassium: 2.0, bicarbonates: 220, sulfates: 38, chlorures: 32, nitrates: 5.5, residuSec: 315, ph: 7.3 } },
  { id: "sidi_rached", name: "Sidi Rached", type: "eau_de_source", region: "Centre", wilaya: "Tipaza", source: "Ahmer El Aïn", composition: { calcium: 76, magnesium: 19, sodium: 23, potassium: 2.1, bicarbonates: 250, sulfates: 42, chlorures: 35, nitrates: 6.5, residuSec: 365, ph: 7.2 } },
  { id: "ben_haroun", name: "Ben Haroun", type: "eau_minerale_naturelle", region: "Centre", wilaya: "Bouira", source: "Lakhdaria", composition: { calcium: 110, magnesium: 32, sodium: 38, potassium: 3.2, bicarbonates: 410, sulfates: 65, chlorures: 45, nitrates: 4.0, residuSec: 540, ph: 7.1 } },
  { id: "mont_djurdjura", name: "Mont Djurdjura", type: "eau_de_source", region: "Centre", wilaya: "Tizi Ouzou", source: "Boghni", composition: { calcium: 51, magnesium: 11, sodium: 9, potassium: 1.2, bicarbonates: 180, sulfates: 19, chlorures: 15, nitrates: 2.8, residuSec: 210, ph: 7.4 } },
  { id: "ovitale", name: "Ovitale", type: "eau_de_source", region: "Centre", wilaya: "Blida", source: "Meftah", composition: { calcium: 69, magnesium: 17, sodium: 16, potassium: 1.7, bicarbonates: 235, sulfates: 33, chlorures: 24, nitrates: 4.8, residuSec: 300, ph: 7.3 } },
  { id: "ain_romana", name: "Aïn Romana", type: "eau_de_source", region: "Centre", wilaya: "Blida", source: "Mouzaïa", composition: { calcium: 64, magnesium: 18, sodium: 14, potassium: 1.6, bicarbonates: 225, sulfates: 29, chlorures: 20, nitrates: 3.9, residuSec: 285, ph: 7.4 } },

  // OUEST
  { id: "saida", name: "Saïda", type: "eau_minerale_naturelle", region: "Ouest", wilaya: "Saïda", source: "Aïn Rebbi", composition: { calcium: 85, magnesium: 22, sodium: 19, potassium: 2.0, bicarbonates: 270, sulfates: 50, chlorures: 28, nitrates: 7, residuSec: 360, ph: 7.2 } },
  { id: "mansourah", name: "Mansourah", type: "eau_minerale_naturelle", region: "Ouest", wilaya: "Tlemcen", source: "Tlemcen", composition: { calcium: 79, magnesium: 28, sodium: 14, potassium: 1.6, bicarbonates: 305, sulfates: 34, chlorures: 22, nitrates: 5.5, residuSec: 345, ph: 7.3 } },
  { id: "messerghine", name: "Messerghine", type: "eau_de_source", region: "Ouest", wilaya: "Oran", source: "Messerghine", composition: { calcium: 94, magnesium: 29, sodium: 34, potassium: 2.8, bicarbonates: 290, sulfates: 68, chlorures: 52, nitrates: 8.5, residuSec: 460, ph: 7.2 } },
  { id: "sfid", name: "Sfid", type: "eau_minerale_naturelle", region: "Ouest", wilaya: "Saïda", source: "Youb", composition: { calcium: 82, magnesium: 24, sodium: 17.5, potassium: 1.9, bicarbonates: 275, sulfates: 46, chlorures: 26, nitrates: 6, residuSec: 350, ph: 7.3 } },
  { id: "lejdar", name: "Lejdar", type: "eau_de_source", region: "Ouest", wilaya: "Tiaret", source: "Frenda", composition: { calcium: 75, magnesium: 21, sodium: 15, potassium: 1.7, bicarbonates: 260, sulfates: 36, chlorures: 23, nitrates: 5, residuSec: 325, ph: 7.4 } },
  { id: "dhaya", name: "Dhaya", type: "eau_de_source", region: "Ouest", wilaya: "Sidi Bel Abbès", source: "Dhaya", composition: { calcium: 88, magnesium: 25, sodium: 22, potassium: 2.1, bicarbonates: 285, sulfates: 48, chlorures: 34, nitrates: 6.5, residuSec: 395, ph: 7.2 } },
  { id: "geryville", name: "Géryville", type: "eau_de_source", region: "Ouest", wilaya: "El Bayadh", source: "El Bayadh", composition: { calcium: 66, magnesium: 19, sodium: 12.5, potassium: 1.5, bicarbonates: 230, sulfates: 32, chlorures: 18, nitrates: 3.5, residuSec: 280, ph: 7.4 } },

  // SUD
  { id: "guedila", name: "Guedila", type: "eau_minerale_naturelle", region: "Sud", wilaya: "Biskra", source: "El Kantara", composition: { calcium: 120, magnesium: 36, sodium: 14, potassium: 3.0, bicarbonates: 210, sulfates: 290, chlorures: 35, nitrates: 6, residuSec: 580, ph: 7.4 } },
  { id: "chifaa", name: "Chifaa", type: "eau_de_source", region: "Sud", wilaya: "Biskra", source: "El Outaya", composition: { calcium: 98, magnesium: 28, sodium: 18, potassium: 2.5, bicarbonates: 225, sulfates: 165, chlorures: 29, nitrates: 5.5, residuSec: 445, ph: 7.3 } },
  { id: "manbaa_el_golea", name: "Manbaa El Goléa", type: "eau_minerale_naturelle", region: "Sud", wilaya: "El Meniaa", source: "El Meniaa", composition: { calcium: 54, magnesium: 16, sodium: 19, potassium: 2.2, bicarbonates: 185, sulfates: 42, chlorures: 24, nitrates: 3.0, residuSec: 265, ph: 7.5 } },
  { id: "milok", name: "Milok", type: "eau_de_source", region: "Sud", wilaya: "Laghouat", source: "Laghouat", composition: { calcium: 84, magnesium: 26, sodium: 20, potassium: 2.3, bicarbonates: 245, sulfates: 95, chlorures: 30, nitrates: 5.0, residuSec: 385, ph: 7.3 } },
  { id: "daouia", name: "Daouia", type: "eau_de_source", region: "Sud", wilaya: "El Oued", source: "Oued Souf", composition: { calcium: 62, magnesium: 17, sodium: 24, potassium: 2.1, bicarbonates: 195, sulfates: 58, chlorures: 33, nitrates: 4.5, residuSec: 310, ph: 7.3 } },
  { id: "sidi_okba", name: "Sidi Okba", type: "eau_de_source", region: "Sud", wilaya: "Biskra", source: "Biskra", composition: { calcium: 105, magnesium: 31, sodium: 21, potassium: 2.6, bicarbonates: 215, sulfates: 210, chlorures: 34, nitrates: 6.2, residuSec: 490, ph: 7.3 } },
  { id: "tassili", name: "Tassili", type: "eau_de_source", region: "Sud", wilaya: "Illizi", source: "Djanet", composition: { calcium: 46, magnesium: 13, sodium: 14, potassium: 1.8, bicarbonates: 160, sulfates: 28, chlorures: 19, nitrates: 2.2, residuSec: 220, ph: 7.4 } }
];

const HEALTH_PROFILES = [
  { id: 'hypertension', label: 'Hypertension', subtitle: 'Sodium < 20 mg/L', icon: HeartPulse },
  { id: 'calculs_oxalate', label: 'Calculs (Oxalate Ca)', subtitle: 'Résidu < 500 & Ca < 100', icon: ShieldAlert },
  { id: 'calculs_urique', label: 'Calculs (Acide Urique)', subtitle: 'Bicarbonates > 300 mg/L', icon: Sparkles },
  { id: 'nourrisson', label: 'Nourrisson / Biberon', subtitle: 'NO3 < 10 & Na < 20', icon: Droplets },
  { id: 'constipation', label: 'Transit / Constipation', subtitle: 'Mg >= 25 ou SO4 >= 150', icon: Award }
];

function evaluateWater(water, conditions) {
  if (!conditions || conditions.length === 0) {
    return { status: 'recommended', score: 90, reasons: ['Profil général : Eau potable équilibrée'] };
  }

  let worstStatus = 'recommended';
  let score = 100;
  const reasons = [];
  const c = water.composition;

  const setStatus = (newStatus) => {
    const order = { recommended: 3, acceptable: 2, avoid: 1 };
    if (order[newStatus] < order[worstStatus]) worstStatus = newStatus;
  };

  if (conditions.includes('hypertension')) {
    if (c.sodium <= 15) {
      reasons.push(`Sodium très bas (${c.sodium} mg/L) : idéal pour l'hypertension`);
    } else if (c.sodium < 20) {
      reasons.push(`Faible en sodium (${c.sodium} mg/L) : adapté à l'hypertension`);
      score -= 5;
    } else if (c.sodium <= 40) {
      setStatus('acceptable');
      score -= 30;
      reasons.push(`Sodium modéré (${c.sodium} mg/L) : à consommer avec modération`);
    } else {
      setStatus('avoid');
      score -= 70;
      reasons.push(`Alerte Hypertension : Sodium trop élevé (${c.sodium} mg/L)`);
    }
  }

  if (conditions.includes('calculs_oxalate')) {
    if (c.residuSec < 350 && c.calcium < 80) {
      reasons.push(`Faiblement minéralisée (${c.residuSec} mg/L) et pauvre en calcium (${c.calcium} mg/L)`);
    } else if (c.residuSec <= 500 && c.calcium <= 100) {
      setStatus('acceptable');
      score -= 20;
      reasons.push(`Minéralisation modérée (${c.residuSec} mg/L) tolérée pour calculs d'oxalate`);
    } else {
      setStatus('avoid');
      score -= 65;
      reasons.push(`Déconseillé Calculs Oxalate : Calcium (${c.calcium} mg/L) ou Résidu sec (${c.residuSec} mg/L) trop élevé`);
    }
  }

  if (conditions.includes('calculs_urique')) {
    if (c.bicarbonates >= 300) {
      reasons.push(`Riche en bicarbonates (${c.bicarbonates} mg/L) : aide à alcaliniser les urines`);
    } else if (c.bicarbonates >= 220) {
      setStatus('acceptable');
      score -= 20;
      reasons.push(`Teneur moyenne en bicarbonates (${c.bicarbonates} mg/L)`);
    } else {
      setStatus('acceptable');
      score -= 35;
      reasons.push(`Faible pouvoir alcalinisant (Bicarbonates : ${c.bicarbonates} mg/L)`);
    }
  }

  if (conditions.includes('nourrisson')) {
    if (c.nitrates <= 5 && c.sodium < 15 && c.residuSec < 350 && water.type !== 'eau_gazeuse') {
      reasons.push(`Parfaite pour nourrissons (Nitrates ${c.nitrates} mg/L, Résidu ${c.residuSec} mg/L)`);
    } else if (c.nitrates <= 10 && c.sodium <= 20 && c.residuSec <= 500 && water.type !== 'eau_gazeuse') {
      setStatus('acceptable');
      score -= 15;
      reasons.push(`Conforme aux critères nourrissons (Nitrates ${c.nitrates} mg/L)`);
    } else {
      setStatus('avoid');
      score -= 75;
      reasons.push(`Non adaptée aux biberons (Minéralisation, Sodium ou Gaz inadapté)`);
    }
  }

  if (conditions.includes('constipation')) {
    if (c.sulfates >= 150 || c.magnesium >= 30) {
      reasons.push(`Riche en Magnésium (${c.magnesium} mg/L) / Sulfates (${c.sulfates} mg/L) : stimule le transit`);
    } else if (c.magnesium >= 20) {
      setStatus('acceptable');
      score -= 20;
      reasons.push(`Apport modéré en magnésium (${c.magnesium} mg/L)`);
    } else {
      setStatus('acceptable');
      score -= 35;
      reasons.push(`Faible effet sur le transit (Mg: ${c.magnesium} mg/L, SO4: ${c.sulfates} mg/L)`);
    }
  }

  return { status: worstStatus, score: Math.max(5, score), reasons };
}

export default function App() {
  const [waters, setWaters] = useState(() => {
    const saved = localStorage.getItem('aquasante_custom_waters');
    return saved ? [...INITIAL_WATERS, ...JSON.parse(saved)] : INITIAL_WATERS;
  });
  const [selectedConditions, setSelectedConditions] = useState(['hypertension']);
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('Toutes');
  const [sortBy, setSortBy] = useState('score');
  const [selectedWater, setSelectedWater] = useState(null);
  const [activeTab, setActiveTab] = useState('catalogue');

  const toggleCondition = (id) => {
    setSelectedConditions(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const evaluatedWaters = useMemo(() => {
    return waters
      .map(w => ({ ...w, evaluation: evaluateWater(w, selectedConditions) }))
      .filter(w => {
        const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              w.wilaya.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRegion = regionFilter === 'Toutes' || w.region === regionFilter;
        return matchesSearch && matchesRegion;
      })
      .sort((a, b) => {
        if (sortBy === 'score') return b.evaluation.score - a.evaluation.score;
        if (sortBy === 'sodium') return a.composition.sodium - b.composition.sodium;
        if (sortBy === 'residuSec') return a.composition.residuSec - b.composition.residuSec;
        if (sortBy === 'calcium') return a.composition.calcium - b.composition.calcium;
        if (sortBy === 'bicarbonates') return b.composition.bicarbonates - a.composition.bicarbonates;
        return 0;
      });
  }, [waters, selectedConditions, searchQuery, regionFilter, sortBy]);

  const badgeStyle = (status) => {
    if (status === 'recommended') return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if (status === 'acceptable') return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-rose-100 text-rose-800 border-rose-300';
  };

  const badgeLabel = (status) => {
    if (status === 'recommended') return 'Recommandée';
    if (status === 'acceptable') return 'Tolérée';
    return 'Déconseillée';
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-gradient-to-r from-sky-700 to-cyan-600 text-white px-4 pt-6 pb-5 shadow-md sticky top-0 z-20">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-white/20 p-2 rounded-xl">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">AquaSanté DZ</h1>
              <p className="text-xs text-sky-100">36 Eaux Algériennes • Guide Médical & Minéral</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedConditions([])}
            className="text-xs bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Réinitialiser
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-4 space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>Orientation nutritionnelle :</strong> Cette application aide à lire les étiquettes minérales en Algérie et ne remplace pas l'avis de votre médecin ou néphrologue.
          </span>
        </div>

        <section className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
          <h2 className="text-sm font-semibold text-slate-800 mb-2.5 flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-sky-600" />
            Sélectionnez votre profil santé (cumulable) :
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {HEALTH_PROFILES.map((prof) => {
              const Icon = prof.icon;
              const active = selectedConditions.includes(prof.id);
              return (
                <button
                  key={prof.id}
                  onClick={() => toggleCondition(prof.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition ${
                    active 
                      ? 'bg-sky-50 border-sky-500 text-sky-950 shadow-sm' 
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${active ? 'text-sky-600' : 'text-slate-400'}`} />
                    <div>
                      <div className="text-xs font-semibold">{prof.label}</div>
                      <div className="text-[11px] text-slate-500">{prof.subtitle}</div>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${active ? 'bg-sky-600 text-white' : 'border border-slate-300'}`}>
                    {active && <Check className="w-3 h-3" />}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Rechercher une marque (ex: Ifri, Guedila, Saïda) ou wilaya..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {['Toutes', 'Centre', 'Est', 'Ouest', 'Sud'].map(reg => (
                <button
                  key={reg}
                  onClick={() => setRegionFilter(reg)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                    regionFilter === reg ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700"
            >
              <option value="score">Trier : Compatibilité Santé</option>
              <option value="sodium">Sodium (Plus bas)</option>
              <option value="residuSec">Résidu sec (Plus léger)</option>
              <option value="calcium">Calcium (Plus bas)</option>
              <option value="bicarbonates">Bicarbonates (Plus riche)</option>
            </select>
          </div>
        </section>

        <section className="space-y-2.5">
          {evaluatedWaters.map((w) => (
            <div
              key={w.id}
              onClick={() => setSelectedWater(w)}
              className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-sky-400 transition cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-slate-900">{w.name}</h3>
                    <span className="text-xs text-slate-500 flex items-center gap-0.5">
                      <MapPin className="w-3 h-3" /> {w.wilaya} ({w.region})
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{w.evaluation.reasons[0]}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badgeStyle(w.evaluation.status)}`}>
                  {badgeLabel(w.evaluation.status)} ({w.evaluation.score}%)
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 mt-3 pt-2.5 border-t border-slate-100 text-center">
                <div className="bg-slate-50 rounded-lg p-1.5">
                  <div className="text-[10px] text-slate-400">Sodium</div>
                  <div className="text-xs font-bold text-slate-800">{w.composition.sodium} mg/L</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-1.5">
                  <div className="text-[10px] text-slate-400">Calcium</div>
                  <div className="text-xs font-bold text-slate-800">{w.composition.calcium} mg/L</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-1.5">
                  <div className="text-[10px] text-slate-400">Résidu Sec</div>
                  <div className="text-xs font-bold text-slate-800">{w.composition.residuSec} mg/L</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-1.5">
                  <div className="text-[10px] text-slate-400">Bicarbonates</div>
                  <div className="text-xs font-bold text-slate-800">{w.composition.bicarbonates} mg/L</div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      {selectedWater && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl p-5 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedWater.name}</h3>
                <p className="text-xs text-slate-500">Source : {selectedWater.source} ({selectedWater.wilaya})</p>
              </div>
              <button onClick={() => setSelectedWater(null)} className="p-1.5 rounded-full bg-slate-100">
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className={`p-3 rounded-xl border ${badgeStyle(selectedWater.evaluation.status)}`}>
              <div className="font-bold text-xs mb-1">
                Statut : {badgeLabel(selectedWater.evaluation.status)} ({selectedWater.evaluation.score}/100)
              </div>
              <ul className="list-disc list-inside text-xs space-y-1">
                {selectedWater.evaluation.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Composition Physico-Chimique (mg/L)</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(selectedWater.composition).map(([k, v]) => (
                  <div key={k} className="flex justify-between p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="capitalize text-slate-600">{k}</span>
                    <span className="font-bold text-slate-900">{v} {k === 'ph' ? '' : 'mg/L'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
