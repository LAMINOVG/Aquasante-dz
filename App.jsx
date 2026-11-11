import React, { useState, useMemo, useEffect } from 'react';
import { 
  Droplets, HeartPulse, ShieldAlert, CheckCircle2, AlertTriangle, 
  Search, Info, ArrowLeftRight, PlusCircle, MapPin, Sparkles, 
  BookOpen, X, Check, RotateCcw, Award, Edit3, Trash2, Globe, 
  Stethoscope, Save, SlidersHorizontal, ChevronRight, Filter
} from 'lucide-react';

const INITIAL_WATERS = [
  // EST
  { id: "ifri", name: "Ifri", nameAr: "إفري", type: "mineral", region: "Est", wilaya: "Béjaïa", wilayaAr: "بجاية", source: "Ighzer Amokrane", composition: { calcium: 93, magnesium: 18, sodium: 17, potassium: 2.2, bicarbonates: 286, sulfates: 45, chlorures: 25, nitrates: 4, residuSec: 390, ph: 7.3 } },
  { id: "toudja", name: "Toudja", nameAr: "توجة", type: "spring", region: "Est", wilaya: "Béjaïa", wilayaAr: "بجاية", source: "Toudja", composition: { calcium: 62, magnesium: 14, sodium: 15, potassium: 1.5, bicarbonates: 215, sulfates: 24, chlorures: 22, nitrates: 5, residuSec: 275, ph: 7.4 } },
  { id: "batna", name: "Batna", nameAr: "باتنة", type: "mineral", region: "Est", wilaya: "Batna", wilayaAr: "باتنة", source: "Aïn Kasrou", composition: { calcium: 78, magnesium: 24, sodium: 11, potassium: 1.8, bicarbonates: 295, sulfates: 32, chlorures: 19, nitrates: 3.5, residuSec: 330, ph: 7.4 } },
  { id: "texanna", name: "Texanna", nameAr: "تاكسانة", type: "spring", region: "Est", wilaya: "Jijel", wilayaAr: "جيجل", source: "Texenna", composition: { calcium: 42, magnesium: 9, sodium: 9.5, potassium: 1.0, bicarbonates: 145, sulfates: 16, chlorures: 15, nitrates: 3, residuSec: 185, ph: 7.3 } },
  { id: "youkous", name: "Youkous", nameAr: "يوكوس", type: "mineral", region: "Est", wilaya: "Tébessa", wilayaAr: "تبسة", source: "Hammamet", composition: { calcium: 96, magnesium: 21, sodium: 13.5, potassium: 2.0, bicarbonates: 310, sulfates: 48, chlorures: 22, nitrates: 4.5, residuSec: 410, ph: 7.2 } },
  { id: "besbassa", name: "Besbassa", nameAr: "بسباسة", type: "spring", region: "Est", wilaya: "Souk Ahras", wilayaAr: "سوق أهراس", source: "M'daourouch", composition: { calcium: 55, magnesium: 13, sodium: 10, potassium: 1.2, bicarbonates: 190, sulfates: 22, chlorures: 16, nitrates: 4, residuSec: 235, ph: 7.4 } },
  { id: "ifren", name: "Ifren", nameAr: "إفرن", type: "spring", region: "Est", wilaya: "Béjaïa", wilayaAr: "بجاية", source: "Akbou", composition: { calcium: 74, magnesium: 16, sodium: 14, potassium: 1.8, bicarbonates: 245, sulfates: 30, chlorures: 20, nitrates: 4.2, residuSec: 310, ph: 7.3 } },
  { id: "hammamet", name: "Hammamet", nameAr: "الحمامات", type: "mineral", region: "Est", wilaya: "Tébessa", wilayaAr: "تبسة", source: "Tébessa", composition: { calcium: 88, magnesium: 19, sodium: 16, potassium: 2.1, bicarbonates: 280, sulfates: 40, chlorures: 24, nitrates: 5, residuSec: 375, ph: 7.3 } },
  { id: "alma", name: "Alma", nameAr: "ألما", type: "spring", region: "Est", wilaya: "Béjaïa", wilayaAr: "بجاية", source: "Fenaïa Ilmaten", composition: { calcium: 68, magnesium: 15, sodium: 13, potassium: 1.6, bicarbonates: 230, sulfates: 28, chlorures: 19, nitrates: 3.8, residuSec: 290, ph: 7.4 } },
  { id: "mileza", name: "Mileza", nameAr: "مليزة", type: "spring", region: "Est", wilaya: "Mila", wilayaAr: "ميلة", source: "Mila", composition: { calcium: 82, magnesium: 19, sodium: 18, potassium: 1.9, bicarbonates: 265, sulfates: 44, chlorures: 26, nitrates: 6, residuSec: 355, ph: 7.2 } },
  { id: "ngaous", name: "N'Gaous", nameAr: "نقاوس", type: "mineral", region: "Est", wilaya: "Batna", wilayaAr: "باتنة", source: "N'Gaous", composition: { calcium: 92, magnesium: 27, sodium: 15, potassium: 2.3, bicarbonates: 325, sulfates: 52, chlorures: 21, nitrates: 4.5, residuSec: 420, ph: 7.3 } },
  { id: "qniaa", name: "Qniaa", nameAr: "قنيعة", type: "spring", region: "Est", wilaya: "Batna", wilayaAr: "باتنة", source: "Merouana", composition: { calcium: 71, magnesium: 20, sodium: 12, potassium: 1.7, bicarbonates: 255, sulfates: 31, chlorures: 18, nitrates: 3.2, residuSec: 305, ph: 7.4 } },
  { id: "bouglez", name: "Bouglez", nameAr: "بوقلاز", type: "spring", region: "Est", wilaya: "El Tarf", wilayaAr: "الطارف", source: "Hammam Beni Salah", composition: { calcium: 36, magnesium: 8, sodium: 11, potassium: 0.9, bicarbonates: 120, sulfates: 14, chlorures: 16, nitrates: 2.5, residuSec: 165, ph: 7.1 } },

  // CENTRE
  { id: "lalla_khedidja", name: "Lalla Khedidja", nameAr: "لالة خديجة", type: "mineral", region: "Centre", wilaya: "Tizi Ouzou", wilayaAr: "تيزي وزو", source: "Djurdjura", composition: { calcium: 48, magnesium: 12, sodium: 8.5, potassium: 1.1, bicarbonates: 175, sulfates: 18, chlorures: 14, nitrates: 2.5, residuSec: 195, ph: 7.5 } },
  { id: "mouzaia", name: "Mouzaïa (Gazeuse)", nameAr: "موزاية (غازية)", type: "sparkling", region: "Centre", wilaya: "Blida", wilayaAr: "البليدة", source: "Mouzaïa", composition: { calcium: 145, magnesium: 48, sodium: 92, potassium: 6.0, bicarbonates: 620, sulfates: 80, chlorures: 75, nitrates: 1.0, residuSec: 850, ph: 6.1 } },
  { id: "sidi_el_kebir", name: "Sidi El Kebir", nameAr: "سيدي الكبير", type: "spring", region: "Centre", wilaya: "Blida", wilayaAr: "البليدة", source: "Atlas Blidéen", composition: { calcium: 58, magnesium: 15, sodium: 11, potassium: 1.4, bicarbonates: 205, sulfates: 25, chlorures: 17, nitrates: 3.5, residuSec: 250, ph: 7.4 } },
  { id: "nestle_pure_life", name: "Nestlé Pure Life", nameAr: "نستله بيور لايف", type: "spring", region: "Centre", wilaya: "Blida", wilayaAr: "البليدة", source: "Oued El Alleug", composition: { calcium: 65, magnesium: 16, sodium: 21, potassium: 2.0, bicarbonates: 220, sulfates: 38, chlorures: 32, nitrates: 5.5, residuSec: 315, ph: 7.3 } },
  { id: "sidi_rached", name: "Sidi Rached", nameAr: "سيدي راشد", type: "spring", region: "Centre", wilaya: "Tipaza", wilayaAr: "تيبازة", source: "Ahmer El Aïn", composition: { calcium: 76, magnesium: 19, sodium: 23, potassium: 2.1, bicarbonates: 250, sulfates: 42, chlorures: 35, nitrates: 6.5, residuSec: 365, ph: 7.2 } },
  { id: "ben_haroun", name: "Ben Haroun", nameAr: "بن هارون", type: "mineral", region: "Centre", wilaya: "Bouira", wilayaAr: "البويرة", source: "Lakhdaria", composition: { calcium: 110, magnesium: 32, sodium: 38, potassium: 3.2, bicarbonates: 410, sulfates: 65, chlorures: 45, nitrates: 4.0, residuSec: 540, ph: 7.1 } },
  { id: "mont_djurdjura", name: "Mont Djurdjura", nameAr: "جبل جرجرة", type: "spring", region: "Centre", wilaya: "Tizi Ouzou", wilayaAr: "تيزي وزو", source: "Boghni", composition: { calcium: 51, magnesium: 11, sodium: 9, potassium: 1.2, bicarbonates: 180, sulfates: 19, chlorures: 15, nitrates: 2.8, residuSec: 210, ph: 7.4 } },
  { id: "ovitale", name: "Ovitale", nameAr: "أوفيتال", type: "spring", region: "Centre", wilaya: "Blida", wilayaAr: "البليدة", source: "Meftah", composition: { calcium: 69, magnesium: 17, sodium: 16, potassium: 1.7, bicarbonates: 235, sulfates: 33, chlorures: 24, nitrates: 4.8, residuSec: 300, ph: 7.3 } },
  { id: "ain_romana", name: "Aïn Romana", nameAr: "عين رمانة", type: "spring", region: "Centre", wilaya: "Blida", wilayaAr: "البليدة", source: "Mouzaïa", composition: { calcium: 64, magnesium: 18, sodium: 14, potassium: 1.6, bicarbonates: 225, sulfates: 29, chlorures: 20, nitrates: 3.9, residuSec: 285, ph: 7.4 } },

  // OUEST
  { id: "saida", name: "Saïda", nameAr: "سعيدة", type: "mineral", region: "Ouest", wilaya: "Saïda", wilayaAr: "سعيدة", source: "Aïn Rebbi", composition: { calcium: 85, magnesium: 22, sodium: 19, potassium: 2.0, bicarbonates: 270, sulfates: 50, chlorures: 28, nitrates: 7, residuSec: 360, ph: 7.2 } },
  { id: "mansourah", name: "Mansourah", nameAr: "منصورة", type: "mineral", region: "Ouest", wilaya: "Tlemcen", wilayaAr: "تلمسان", source: "Tlemcen", composition: { calcium: 79, magnesium: 28, sodium: 14, potassium: 1.6, bicarbonates: 305, sulfates: 34, chlorures: 22, nitrates: 5.5, residuSec: 345, ph: 7.3 } },
  { id: "messerghine", name: "Messerghine", nameAr: "مسرغين", type: "spring", region: "Ouest", wilaya: "Oran", wilayaAr: "وهران", source: "Messerghine", composition: { calcium: 94, magnesium: 29, sodium: 34, potassium: 2.8, bicarbonates: 290, sulfates: 68, chlorures: 52, nitrates: 8.5, residuSec: 460, ph: 7.2 } },
  { id: "sfid", name: "Sfid", nameAr: "سفيد", type: "mineral", region: "Ouest", wilaya: "Saïda", wilayaAr: "سعيدة", source: "Youb", composition: { calcium: 82, magnesium: 24, sodium: 17.5, potassium: 1.9, bicarbonates: 275, sulfates: 46, chlorures: 26, nitrates: 6, residuSec: 350, ph: 7.3 } },
  { id: "lejdar", name: "Lejdar", nameAr: "لجدار", type: "spring", region: "Ouest", wilaya: "Tiaret", wilayaAr: "تيارت", source: "Frenda", composition: { calcium: 75, magnesium: 21, sodium: 15, potassium: 1.7, bicarbonates: 260, sulfates: 36, chlorures: 23, nitrates: 5, residuSec: 325, ph: 7.4 } },
  { id: "dhaya", name: "Dhaya", nameAr: "ضاية", type: "spring", region: "Ouest", wilaya: "Sidi Bel Abbès", wilayaAr: "سيدي بلعباس", source: "Dhaya", composition: { calcium: 88, magnesium: 25, sodium: 22, potassium: 2.1, bicarbonates: 285, sulfates: 48, chlorures: 34, nitrates: 6.5, residuSec: 395, ph: 7.2 } },
  { id: "geryville", name: "Géryville", nameAr: "جيريفيل", type: "spring", region: "Ouest", wilaya: "El Bayadh", wilayaAr: "البيض", source: "El Bayadh", composition: { calcium: 66, magnesium: 19, sodium: 12.5, potassium: 1.5, bicarbonates: 230, sulfates: 32, chlorures: 18, nitrates: 3.5, residuSec: 280, ph: 7.4 } },

  // SUD
  { id: "guedila", name: "Guedila", nameAr: "قديلة", type: "mineral", region: "Sud", wilaya: "Biskra", wilayaAr: "بسكرة", source: "El Kantara", composition: { calcium: 120, magnesium: 36, sodium: 14, potassium: 3.0, bicarbonates: 210, sulfates: 290, chlorures: 35, nitrates: 6, residuSec: 580, ph: 7.4 } },
  { id: "chifaa", name: "Chifaa", nameAr: "شفاء", type: "spring", region: "Sud", wilaya: "Biskra", wilayaAr: "بسكرة", source: "El Outaya", composition: { calcium: 98, magnesium: 28, sodium: 18, potassium: 2.5, bicarbonates: 225, sulfates: 165, chlorures: 29, nitrates: 5.5, residuSec: 445, ph: 7.3 } },
  { id: "manbaa_el_golea", name: "Manbaa El Goléa", nameAr: "منبع القليعة", type: "mineral", region: "Sud", wilaya: "El Meniaa", wilayaAr: "المنيعة", source: "El Meniaa", composition: { calcium: 54, magnesium: 16, sodium: 19, potassium: 2.2, bicarbonates: 185, sulfates: 42, chlorures: 24, nitrates: 3.0, residuSec: 265, ph: 7.5 } },
  { id: "milok", name: "Milok", nameAr: "ميلوك", type: "spring", region: "Sud", wilaya: "Laghouat", wilayaAr: "الأغواط", source: "Laghouat", composition: { calcium: 84, magnesium: 26, sodium: 20, potassium: 2.3, bicarbonates: 245, sulfates: 95, chlorures: 30, nitrates: 5.0, residuSec: 385, ph: 7.3 } },
  { id: "daouia", name: "Daouia", nameAr: "ضاوية", type: "spring", region: "Sud", wilaya: "El Oued", wilayaAr: "الوادي", source: "Oued Souf", composition: { calcium: 62, magnesium: 17, sodium: 24, potassium: 2.1, bicarbonates: 195, sulfates: 58, chlorures: 33, nitrates: 4.5, residuSec: 310, ph: 7.3 } },
  { id: "sidi_okba", name: "Sidi Okba", nameAr: "سيدي عقبة", type: "spring", region: "Sud", wilaya: "Biskra", wilayaAr: "بسكرة", source: "Biskra", composition: { calcium: 105, magnesium: 31, sodium: 21, potassium: 2.6, bicarbonates: 215, sulfates: 210, chlorures: 34, nitrates: 6.2, residuSec: 490, ph: 7.3 } },
  { id: "tassili", name: "Tassili", nameAr: "طاسيلي", type: "spring", region: "Sud", wilaya: "Illizi", wilayaAr: "إليزي", source: "Djanet", composition: { calcium: 46, magnesium: 13, sodium: 14, potassium: 1.8, bicarbonates: 160, sulfates: 28, chlorures: 19, nitrates: 2.2, residuSec: 220, ph: 7.4 } }
];

const TRANSLATIONS = {
  fr: {
    dir: "ltr",
    appName: "AquaSanté DZ",
    appSub: "36 Eaux Algériennes • Analyse Médicale & Minérale",
    resetAll: "Réinitialiser les données",
    disclaimerBadge: "MISE EN GARDE MÉDICALE IMPORTANTE",
    disclaimerTitle: "Avis Médical & Responsabilité :",
    disclaimerShort: "Cet outil est conçu pour vous aider à décrypter les étiquettes. Il ne remplace en aucun cas votre médecin traitant ou spécialiste (cardiologue, néphrologue), seuls habilités à poser un diagnostic et à prescrire un régime hydrique adapté.",
    disclaimerFullTitle: "Mise en garde médicale & Conditions d'utilisation",
    disclaimerFullP1: "AquaSanté DZ est un outil informatif et d'aide à la décision basé sur les données analytiques physico-chimiques déclarées par les embouteilleurs en Algérie.",
    disclaimerFullP2: "Cette application NE constitue PAS un acte médical, un diagnostic ou une prescription thérapeutique. Chaque patient présente des particularités métaboliques uniques (stade d'insuffisance rénale, interactions médicamenteuses, traitements diurétiques, etc.).",
    disclaimerFullP3: "Consultez impérativement votre médecin avant de modifier votre consommation hydrique si vous êtes suivi pour une affection chronique.",
    disclaimerAcceptBtn: "J'ai compris et j'accepte",
    disclaimerShowBtn: "Lire la mise en garde médicale",
    disclaimerUnderstood: "Avertissement lu et accepté",
    tabs: {
      catalogue: "Catalogue",
      avis: "Avis Médical",
      compare: "Comparateur",
      add: "+ Ajouter / Éditer",
      guide: "Guide"
    },
    profileTitle: "Sélectionnez vos profils santé (cumulables) :",
    profiles: {
      hypertension: { label: "Hypertension Artérielle", sub: "Sodium < 20 mg/L" },
      calculs_oxalate: { label: "Calculs Rénaux (Oxalate Ca)", sub: "Résidu < 500 & Ca < 100" },
      calculs_urique: { label: "Calculs (Acide Urique)", sub: "Bicarbonates > 300 mg/L" },
      nourrisson: { label: "Nourrisson / Biberons", sub: "NO3 < 10 & Na < 20" },
      constipation: { label: "Transit / Constipation", sub: "Mg ≥ 25 ou SO4 ≥ 150" }
    },
    searchPlaceholder: "Rechercher une marque (Ifri, Guedila, Saïda...) ou wilaya...",
    regions: { Toutes: "Toutes", Centre: "Centre", Est: "Est", Ouest: "Ouest", Sud: "Sud" },
    types: { all: "Tous types", mineral: "Minérale naturelle", spring: "Eau de source", sparkling: "Gazeuse" },
    sort: {
      score: "Trier : Compatibilité Santé",
      sodium: "Sodium (Plus bas d'abord)",
      residuSec: "Résidu sec (Plus léger)",
      calcium: "Calcium (Plus bas)",
      bicarbonates: "Bicarbonates (Plus riche)",
      magnesium: "Magnésium (Plus riche)"
    },
    status: {
      recommended: "Recommandée",
      acceptable: "Tolérée",
      avoid: "Déconseillée"
    },
    minerals: {
      calcium: "Calcium (Ca²⁺)",
      magnesium: "Magnésium (Mg²⁺)",
      sodium: "Sodium (Na⁺)",
      potassium: "Potassium (K⁺)",
      bicarbonates: "Bicarbonates (HCO₃⁻)",
      sulfates: "Sulfates (SO₄²⁻)",
      chlorures: "Chlorures (Cl⁻)",
      nitrates: "Nitrates (NO₃⁻)",
      residuSec: "Résidu sec (180°C)",
      ph: "pH"
    },
    buttons: {
      details: "Avis & Détails",
      edit: "Modifier les valeurs",
      compare: "Comparer",
      save: "Enregistrer l'eau",
      cancel: "Annuler",
      delete: "Supprimer",
      addWater: "Ajouter une nouvelle eau"
    },
    avisModal: {
      title: "Diagnostic & Avis Nutritionnel Détaillé",
      top3Title: "Top 3 des eaux idéales pour votre profil",
      avoidTitle: "Eaux à éviter pour votre profil",
      customAdvice: "Analyse personnalisée selon vos pathologies cochées"
    },
    form: {
      titleAdd: "Ajouter une nouvelle bouteille d'eau",
      titleEdit: "Modifier les données physico-chimiques",
      name: "Nom de la marque",
      wilaya: "Wilaya",
      source: "Localité de la source",
      region: "Région",
      type: "Type d'eau",
      savedSuccess: "Les données de l'eau ont été enregistrées avec succès !"
    }
  },
  ar: {
    dir: "rtl",
    appName: "أكوا سانتي DZ",
    appSub: "36 علامة مياه جزائرية • التوجيه الصحي والمعدني",
    resetAll: "إعادة ضبط البيانات",
    disclaimerBadge: "تنبيه وتحذير طبي هام وإلزامي",
    disclaimerTitle: "إخلاء المسؤولية الطبية :",
    disclaimerShort: "هذا التطبيق وسيلة إرشادية للمساعدة في قراءة الملصقات فقط، ولا يعوض بأي حال من الأحوال طبيبك المعالج أو أخصائي الكلى والقلب، فهو الوحيد المخول بتشخيص حالتك وتحديد نوعية وكميات المياه المناسبة لك.",
    disclaimerFullTitle: "التحذير الطبي وشروط الاستخدام",
    disclaimerFullP1: "أكوا سانتي DZ هو تطبيق إرشادي وتثقيفي يعتمد على التحاليل الفيزيوكيميائية المصرح بها من طرف مصانع تعبئة المياه في الجزائر.",
    disclaimerFullP2: "هذا التطبيق لا يمثل استشارة طبية أو تشخيصاً أو وصفة علاجية. تختلف الحالة الصحية لكل مريض (مثل مرحلة القصور الكلوي، الأدوية المدرة للبول، أمراض القلب وغيرها).",
    disclaimerFullP3: "يجب عليك استشارة طبيبك المعالج قبل إجراء أي تغيير في نظام شرب الماء إذا كنت تعاني من مرض مزمن.",
    disclaimerAcceptBtn: "فهمت وأوافق على الشروط",
    disclaimerShowBtn: "قراءة التحذير الطبي الكامل",
    disclaimerUnderstood: "تمت قراءة التنبيه والموافقة عليه",
    tabs: {
      catalogue: "قائمة المياه",
      avis: "الرأي الطبي",
      compare: "المقارنة",
      add: "+ إضافة / تعديل",
      guide: "الدليل الطبي"
    },
    profileTitle: "اختر حالتك الصحية (يمكن اختيار أكثر من حالة) :",
    profiles: {
      hypertension: { label: "ارتفاع ضغط الدم", sub: "صوديوم أقل من 20 ملغ/ل" },
      calculs_oxalate: { label: "حصى الكلى (أوكسالات الكالسيوم)", sub: "بقايا جافة < 500 وكالسيوم < 100" },
      calculs_urique: { label: "حصى الكلى (حمض اليوريك)", sub: "بيكربونات > 300 ملغ/ل" },
      nourrisson: { label: "الرضع وتحضير الحليب", sub: "نترات < 10 وصوديوم < 20" },
      constipation: { label: "عسر الهضم / الإمساك", sub: "مغنيسيوم ≥ 25 أو كبريتات ≥ 150" }
    },
    searchPlaceholder: "ابحث عن علامة تجارية (إفري، قديلة، سعيدة...) أو ولاية...",
    regions: { Toutes: "كل المناطق", Centre: "الوسط", Est: "الشرق", Ouest: "الغرب", Sud: "الجنوب" },
    types: { all: "كل الأنواع", mineral: "مياه معدنية طبيعية", spring: "مياه منبع", sparkling: "مياه غازية" },
    sort: {
      score: "الترتيب : التوافق الصحي",
      sodium: "الصوديوم (الأقل أولاً)",
      residuSec: "البقايا الجافة (الأخف أولاً)",
      calcium: "الكالسيوم (الأقل أولاً)",
      bicarbonates: "البيكربونات (الأغنى أولاً)",
      magnesium: "المغنيسيوم (الأغنى أولاً)"
    },
    status: {
      recommended: "موصى به",
      acceptable: "مقبول",
      avoid: "غير منصوح به"
    },
    minerals: {
      calcium: "الكالسيوم (Ca²⁺)",
      magnesium: "المغنيسيوم (Mg²⁺)",
      sodium: "الصوديوم (Na⁺)",
      potassium: "البوتاسيوم (K⁺)",
      bicarbonates: "البيكربونات (HCO₃⁻)",
      sulfates: "الكبريتات (SO₄²⁻)",
      chlorures: "الكلوريدات (Cl⁻)",
      nitrates: "النترات (NO₃⁻)",
      residuSec: "البقايا الجافة (180°)",
      ph: "درجة الحموضة pH"
    },
    buttons: {
      details: "الرأي الطبي والتفاصيل",
      edit: "تعديل القيم",
      compare: "مقارنة",
      save: "حفظ التعديلات",
      cancel: "إلغاء",
      delete: "حذف",
      addWater: "إضافة علامة مياه جديدة"
    },
    avisModal: {
      title: "التقييم الطبي والغذائي المفصل",
      top3Title: "أفضل 3 مياه مناسبة لحالتك الصحية",
      avoidTitle: "مياه يجب تجنبها لحالتك",
      customAdvice: "تحليل مخصص بناءً على الحالات الصحية المختارة"
    },
    form: {
      titleAdd: "إضافة قارورة مياه جديدة",
      titleEdit: "تعديل التركيبة المعدنية للماء",
      name: "اسم العلامة التجارية",
      wilaya: "الولاية",
      source: "موقع المنبع",
      region: "المنطقة",
      type: "نوع الماء",
      savedSuccess: "تم حفظ بيانات الماء بنجاح !"
    }
  },
  en: {
    dir: "ltr",
    appName: "AquaSanté DZ",
    appSub: "36 Algerian Waters • Medical & Mineral Guide",
    resetAll: "Reset Data",
    disclaimerBadge: "IMPORTANT MEDICAL DISCLAIMER",
    disclaimerTitle: "Medical Disclaimer & Liability:",
    disclaimerShort: "This tool helps you decode bottled water mineral labels. It does not replace your treating physician, cardiologist, or nephrologist, who alone are qualified to diagnose and prescribe the proper water intake for your health condition.",
    disclaimerFullTitle: "Medical Disclaimer & Terms of Use",
    disclaimerFullP1: "AquaSanté DZ is an educational and informational tool based on publicly declared mineral analysis of bottled waters in Algeria.",
    disclaimerFullP2: "This app DOES NOT provide medical diagnosis or treatment plans. Every individual has specific metabolic needs (kidney disease stage, diuretic medication, cardiovascular history).",
    disclaimerFullP3: "Always consult your healthcare professional before modifying your daily hydration regimen if you have a medical condition.",
    disclaimerAcceptBtn: "I Understand & Accept",
    disclaimerShowBtn: "Read Full Medical Disclaimer",
    disclaimerUnderstood: "Disclaimer accepted",
    tabs: {
      catalogue: "Catalog",
      avis: "Medical Advice",
      compare: "Compare",
      add: "+ Add / Edit",
      guide: "Guide"
    },
    profileTitle: "Select your health profiles (combinable):",
    profiles: {
      hypertension: { label: "High Blood Pressure", sub: "Sodium < 20 mg/L" },
      calculs_oxalate: { label: "Kidney Stones (Ca Oxalate)", sub: "Dry Residue < 500 & Ca < 100" },
      calculs_urique: { label: "Kidney Stones (Uric Acid)", sub: "Bicarbonates > 300 mg/L" },
      nourrisson: { label: "Infants / Baby Formula", sub: "NO3 < 10 & Na < 20" },
      constipation: { label: "Slow Transit / Constipation", sub: "Mg ≥ 25 or SO4 ≥ 150" }
    },
    searchPlaceholder: "Search brand (Ifri, Guedila, Saïda...) or wilaya...",
    regions: { Toutes: "All Regions", Centre: "Center", Est: "East", Ouest: "West", Sud: "South" },
    types: { all: "All Types", mineral: "Natural Mineral", spring: "Spring Water", sparkling: "Sparkling" },
    sort: {
      score: "Sort: Health Match",
      sodium: "Sodium (Lowest first)",
      residuSec: "Dry Residue (Lightest)",
      calcium: "Calcium (Lowest first)",
      bicarbonates: "Bicarbonates (Highest)",
      magnesium: "Magnesium (Highest)"
    },
    status: {
      recommended: "Recommended",
      acceptable: "Acceptable",
      avoid: "Not Recommended"
    },
    minerals: {
      calcium: "Calcium (Ca²⁺)",
      magnesium: "Magnesium (Mg²⁺)",
      sodium: "Sodium (Na⁺)",
      potassium: "Potassium (K⁺)",
      bicarbonates: "Bicarbonates (HCO₃⁻)",
      sulfates: "Sulfates (SO₄²⁻)",
      chlorures: "Chlorides (Cl⁻)",
      nitrates: "Nitrates (NO₃⁻)",
      residuSec: "Dry Residue (180°C)",
      ph: "pH Level"
    },
    buttons: {
      details: "Medical Opinion & Info",
      edit: "Edit Values",
      compare: "Compare",
      save: "Save Water Data",
      cancel: "Cancel",
      delete: "Delete",
      addWater: "Add New Bottled Water"
    },
    avisModal: {
      title: "Detailed Medical & Nutritional Assessment",
      top3Title: "Top 3 Ideal Waters for Your Profile",
      avoidTitle: "Waters to Avoid for Your Profile",
      customAdvice: "Personalized analysis based on your selected conditions"
    },
    form: {
      titleAdd: "Add New Bottled Water",
      titleEdit: "Edit Physico-Chemical Data",
      name: "Brand Name",
      wilaya: "Wilaya / Province",
      source: "Source Location",
      region: "Region",
      type: "Water Type",
      savedSuccess: "Water data saved successfully!"
    }
  }
};

function evaluateWater(water, conditions, lang) {
  const c = water.composition;
  if (!conditions || conditions.length === 0) {
    const defaultMsg = {
      fr: "Profil général : Eau équilibrée pour l'hydratation quotidienne",
      ar: "الوضع العام : مياه متوازنة للترطيب اليومي",
      en: "General profile: Balanced water for daily hydration"
    };
    return { status: 'recommended', score: 92, reasons: [defaultMsg[lang]] };
  }

  let worstStatus = 'recommended';
  let score = 100;
  const reasons = [];

  const setStatus = (newStatus) => {
    const order = { recommended: 3, acceptable: 2, avoid: 1 };
    if (order[newStatus] < order[worstStatus]) worstStatus = newStatus;
  };

  if (conditions.includes('hypertension')) {
    if (c.sodium <= 15) {
      reasons.push(
        lang === 'ar' ? `صوديوم منخفض جداً (${c.sodium} ملغ/ل): مثالي لمرضى ضغط الدم` :
        lang === 'en' ? `Very low sodium (${c.sodium} mg/L): ideal for hypertension` :
        `Sodium très bas (${c.sodium} mg/L) : idéal pour l'hypertension`
      );
    } else if (c.sodium < 20) {
      score -= 5;
      reasons.push(
        lang === 'ar' ? `قليل الصوديوم (${c.sodium} ملغ/ل): مناسب لضغط الدم` :
        lang === 'en' ? `Low sodium (${c.sodium} mg/L): suitable for hypertension` :
        `Faible en sodium (${c.sodium} mg/L) : adapté à l'hypertension`
      );
    } else if (c.sodium <= 35) {
      setStatus('acceptable');
      score -= 28;
      reasons.push(
        lang === 'ar' ? `صوديوم متوسط (${c.sodium} ملغ/ل): يستهلك باعتدال` :
        lang === 'en' ? `Moderate sodium (${c.sodium} mg/L): consume in moderation` :
        `Sodium modéré (${c.sodium} mg/L) : à consommer avec modération`
      );
    } else {
      setStatus('avoid');
      score -= 70;
      reasons.push(
        lang === 'ar' ? `تنبيه ضغط الدم: نسبة الصوديوم مرتفعة (${c.sodium} ملغ/ل)` :
        lang === 'en' ? `Hypertension Alert: Sodium too high (${c.sodium} mg/L)` :
        `Alerte Hypertension : Sodium trop élevé (${c.sodium} mg/L)`
      );
    }
  }

  if (conditions.includes('calculs_oxalate')) {
    if (c.residuSec < 320 && c.calcium < 75) {
      reasons.push(
        lang === 'ar' ? `خفيفة المعادن (${c.residuSec} ملغ/ل) وقليلة الكالسيوم (${c.calcium} ملغ/ل): ممتازة للكلى` :
        lang === 'en' ? `Lightly mineralized (${c.residuSec} mg/L) & low calcium (${c.calcium} mg/L)` :
        `Faiblement minéralisée (${c.residuSec} mg/L) et pauvre en calcium (${c.calcium} mg/L)`
      );
    } else if (c.residuSec <= 500 && c.calcium <= 100) {
      setStatus('acceptable');
      score -= 18;
      reasons.push(
        lang === 'ar' ? `معادن متوسطة (${c.residuSec} ملغ/ل) مقبولة لحصى الأوكسالات` :
        lang === 'en' ? `Moderate mineralization (${c.residuSec} mg/L) acceptable for oxalate stones` :
        `Minéralisation modérée (${c.residuSec} mg/L) tolérée pour calculs d'oxalate`
      );
    } else {
      setStatus('avoid');
      score -= 65;
      reasons.push(
        lang === 'ar' ? `غير منصوح به لحصى الأوكسالات: كالسيوم (${c.calcium}) أو بقايا جافة (${c.residuSec}) مرتفعة` :
        lang === 'en' ? `Avoid for Oxalate Stones: High Calcium (${c.calcium} mg/L) or Dry Residue (${c.residuSec} mg/L)` :
        `Déconseillé Calculs Oxalate : Calcium (${c.calcium} mg/L) ou Résidu sec (${c.residuSec} mg/L) élevé`
      );
    }
  }

  if (conditions.includes('calculs_urique')) {
    if (c.bicarbonates >= 290) {
      reasons.push(
        lang === 'ar' ? `غني بالبيكربونات (${c.bicarbonates} ملغ/ل): يساعد على قلونة البول وإذابة حمض اليوريك` :
        lang === 'en' ? `Rich in bicarbonates (${c.bicarbonates} mg/L): helps alkalinize urine` :
        `Riche en bicarbonates (${c.bicarbonates} mg/L) : aide à alcaliniser les urines`
      );
    } else if (c.bicarbonates >= 210) {
      setStatus('acceptable');
      score -= 20;
      reasons.push(
        lang === 'ar' ? `نسبة بيكربونات متوسطة (${c.bicarbonates} ملغ/ل)` :
        lang === 'en' ? `Moderate bicarbonate content (${c.bicarbonates} mg/L)` :
        `Teneur moyenne en bicarbonates (${c.bicarbonates} mg/L)`
      );
    } else {
      setStatus('acceptable');
      score -= 35;
      reasons.push(
        lang === 'ar' ? `قدرة قلونة منخفضة (بيكربونات: ${c.bicarbonates} ملغ/ل)` :
        lang === 'en' ? `Low alkalinizing power (Bicarbonates: ${c.bicarbonates} mg/L)` :
        `Faible pouvoir alcalinisant (Bicarbonates : ${c.bicarbonates} mg/L)`
      );
    }
  }

  if (conditions.includes('nourrisson')) {
    if (c.nitrates <= 5 && c.sodium < 15 && c.residuSec < 350 && water.type !== 'sparkling') {
      reasons.push(
        lang === 'ar' ? `مثالي للرضع وتحضير الحليب (نترات ${c.nitrates} ملغ/ل، بقايا ${c.residuSec} ملغ/ل)` :
        lang === 'en' ? `Ideal for infants (Nitrates ${c.nitrates} mg/L, Dry residue ${c.residuSec} mg/L)` :
        `Parfaite pour nourrissons (Nitrates ${c.nitrates} mg/L, Résidu ${c.residuSec} mg/L)`
      );
    } else if (c.nitrates <= 10 && c.sodium <= 20 && c.residuSec <= 500 && water.type !== 'sparkling') {
      setStatus('acceptable');
      score -= 15;
      reasons.push(
        lang === 'ar' ? `مطابق لمعايير الرضع (نترات ${c.nitrates} ملغ/ل)` :
        lang === 'en' ? `Meets infant standards (Nitrates ${c.nitrates} mg/L)` :
        `Conforme aux critères nourrissons (Nitrates ${c.nitrates} mg/L)`
      );
    } else {
      setStatus('avoid');
      score -= 75;
      reasons.push(
        lang === 'ar' ? `غير مناسب للرضع (المعادن أو الصوديوم أو الغاز غير ملائم)` :
        lang === 'en' ? `Unsuitable for baby formula (Mineralization, Sodium or Carbonation)` :
        `Non adaptée aux biberons (Minéralisation, Sodium ou Gaz inadapté)`
      );
    }
  }

  if (conditions.includes('constipation')) {
    if (c.sulfates >= 150 || c.magnesium >= 28) {
      reasons.push(
        lang === 'ar' ? `غني بالمغنيسيوم (${c.magnesium}) والكبريتات (${c.sulfates}): يحفز الهضم والأمعاء` :
        lang === 'en' ? `Rich in Magnesium (${c.magnesium} mg/L) / Sulfates (${c.sulfates} mg/L): aids transit` :
        `Riche en Magnésium (${c.magnesium} mg/L) / Sulfates (${c.sulfates} mg/L) : stimule le transit`
      );
    } else if (c.magnesium >= 20) {
      setStatus('acceptable');
      score -= 20;
      reasons.push(
        lang === 'ar' ? `نسبة مغنيسيوم متوسطة (${c.magnesium} ملغ/ل)` :
        lang === 'en' ? `Moderate magnesium intake (${c.magnesium} mg/L)` :
        `Apport modéré en magnésium (${c.magnesium} mg/L)`
      );
    } else {
      setStatus('acceptable');
      score -= 35;
      reasons.push(
        lang === 'ar' ? `تأثير ضعيف على الإمساك (مغنيسيوم ${c.magnesium} ملغ/ل)` :
        lang === 'en' ? `Low effect on transit (Mg: ${c.magnesium} mg/L)` :
        `Faible effet sur le transit (Mg: ${c.magnesium} mg/L, SO4: ${c.sulfates} mg/L)`
      );
    }
  }

  return { status: worstStatus, score: Math.max(5, score), reasons };
}

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('aquasante_lang') || 'fr');
  const t = TRANSLATIONS[lang];

  const [waters, setWaters] = useState(() => {
    const saved = localStorage.getItem('aquasante_waters_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_WATERS; }
    }
    return INITIAL_WATERS;
  });

  useEffect(() => {
    localStorage.setItem('aquasante_waters_v2', JSON.stringify(waters));
  }, [waters]);

  useEffect(() => {
    localStorage.setItem('aquasante_lang', lang);
  }, [lang]);

  const [selectedConditions, setSelectedConditions] = useState(['hypertension']);
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('Toutes');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('score');
  const [activeTab, setActiveTab] = useState('catalogue');
  const [selectedWater, setSelectedWater] = useState(null);

  // Compare state
  const [compareId1, setCompareId1] = useState('lalla_khedidja');
  const [compareId2, setCompareId2] = useState('ifri');

  // Form Add/Edit state
  const emptyForm = {
    id: '',
    name: '',
    nameAr: '',
    wilaya: 'Alger',
    wilayaAr: 'الجزائر',
    source: '',
    region: 'Centre',
    type: 'spring',
    composition: {
      calcium: 60, magnesium: 15, sodium: 12, potassium: 1.5,
      bicarbonates: 210, sulfates: 25, chlorures: 18, nitrates: 4,
      residuSec: 260, ph: 7.3
    }
  };
  const [editingWater, setEditingWater] = useState(emptyForm);
  const [isEditingExisting, setIsEditingExisting] = useState(false);
  const [saveBanner, setSaveBanner] = useState(false);

  const toggleCondition = (id) => {
    setSelectedConditions(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const evaluatedWaters = useMemo(() => {
    return waters
      .map(w => ({ ...w, evaluation: evaluateWater(w, selectedConditions, lang) }))
      .filter(w => {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          w.name.toLowerCase().includes(q) ||
          (w.nameAr && w.nameAr.includes(q)) ||
          w.wilaya.toLowerCase().includes(q) ||
          (w.wilayaAr && w.wilayaAr.includes(q));
        const matchesRegion = regionFilter === 'Toutes' || w.region === regionFilter;
        const matchesType = typeFilter === 'all' || w.type === typeFilter;
        return matchesSearch && matchesRegion && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === 'score') return b.evaluation.score - a.evaluation.score;
        if (sortBy === 'sodium') return a.composition.sodium - b.composition.sodium;
        if (sortBy === 'residuSec') return a.composition.residuSec - b.composition.residuSec;
        if (sortBy === 'calcium') return a.composition.calcium - b.composition.calcium;
        if (sortBy === 'bicarbonates') return b.composition.bicarbonates - a.composition.bicarbonates;
        if (sortBy === 'magnesium') return b.composition.magnesium - a.composition.magnesium;
        return 0;
      });
  }, [waters, selectedConditions, searchQuery, regionFilter, typeFilter, sortBy, lang]);

  const startEditWater = (water) => {
    setEditingWater(JSON.parse(JSON.stringify(water)));
    setIsEditingExisting(true);
    setSelectedWater(null);
    setActiveTab('add');
  };

  const startAddNewWater = () => {
    setEditingWater({ ...emptyForm, id: 'custom_' + Date.now() });
    setIsEditingExisting(false);
    setActiveTab('add');
  };

  const handleSaveWater = (e) => {
    e.preventDefault();
    if (!editingWater.name.trim()) return;
    const formatted = {
      ...editingWater,
      id: editingWater.id || 'water_' + Date.now(),
      composition: Object.fromEntries(
        Object.entries(editingWater.composition).map(([k, v]) => [k, parseFloat(v) || 0])
      )
    };
    setWaters(prev => {
      const exists = prev.some(w => w.id === formatted.id);
      if (exists) return prev.map(w => w.id === formatted.id ? formatted : w);
      return [formatted, ...prev];
    });
    setSaveBanner(true);
    setTimeout(() => {
      setSaveBanner(false);
      setActiveTab('catalogue');
    }, 1200);
  };

  const handleDeleteWater = (id) => {
    setWaters(prev => prev.filter(w => w.id !== id));
    setSelectedWater(null);
  };

  const resetAllDatabase = () => {
    if (window.confirm(lang === 'ar' ? 'هل تريد استعادة البيانات الأصلية لـ 36 علامة؟' : 'Restaurer les valeurs d\'origine des 36 eaux ?')) {
      setWaters(INITIAL_WATERS);
      localStorage.removeItem('aquasante_waters_v2');
    }
  };

  const badgeStyle = (status) => {
    if (status === 'recommended') return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if (status === 'acceptable') return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-rose-100 text-rose-800 border-rose-300';
  };

  const displayWaterName = (w) => (lang === 'ar' && w.nameAr ? `${w.nameAr} (${w.name})` : w.name);
  const displayWilaya = (w) => (lang === 'ar' && w.wilayaAr ? w.wilayaAr : w.wilaya);

  const topRecommended = useMemo(() => evaluatedWaters.filter(w => w.evaluation.status === 'recommended').slice(0, 4), [evaluatedWaters]);
  const topAvoid = useMemo(() => evaluatedWaters.filter(w => w.evaluation.status === 'avoid').slice(0, 3), [evaluatedWaters]);

  return (
    <div dir={t.dir} className="min-h-screen bg-slate-100 pb-24 text-slate-900">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-sky-800 via-sky-700 to-cyan-600 text-white px-4 pt-5 pb-4 shadow-lg sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-sm">
              <Droplets className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight flex items-center gap-2">
                {t.appName}
                <span className="text-[11px] bg-emerald-400/20 border border-emerald-300/40 text-emerald-100 px-2 py-0.5 rounded-full font-semibold">
                  {waters.length} {lang === 'ar' ? 'علامة' : 'Eaux'}
                </span>
              </h1>
              <p className="text-xs text-sky-100">{t.appSub}</p>
            </div>
          </div>

          {/* Language Switcher + Reset */}
          <div className="flex items-center gap-2">
            <div className="flex bg-black/25 p-1 rounded-xl border border-white/15">
              {[
                { code: 'fr', label: 'FR' },
                { code: 'ar', label: 'عربي' },
                { code: 'en', label: 'EN' }
              ].map(l => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    lang === l.code ? 'bg-white text-sky-800 shadow' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <button
              onClick={resetAllDatabase}
              title={t.resetAll}
              className="p-2 bg-white/15 hover:bg-white/25 rounded-xl text-white"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-3 sm:px-4 pt-4 space-y-4">
        {/* MEDICAL DISCLAIMER - PROMINENT MEDICAL WARNING BANNER */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-3.5 shadow-sm space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2.5">
              <div className="bg-amber-500 text-white p-1.5 rounded-xl shrink-0 mt-0.5 shadow-xs">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-md inline-block mb-1">
                  {t.disclaimerBadge}
                </span>
                <p className="text-xs font-bold text-amber-950 leading-relaxed">
                  {t.disclaimerShort}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowDisclaimerModal(true)}
              className="text-[11px] font-bold text-sky-700 hover:text-sky-900 bg-white hover:bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-xl shrink-0 shadow-xs transition"
            >
              {t.disclaimerShowBtn}
            </button>
          </div>
        </div>

        {/* HEALTH PROFILE SELECTOR (Always visible on Catalogue & Avis) */}
        {(activeTab === 'catalogue' || activeTab === 'avis') && (
          <section className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-sky-600" />
                {t.profileTitle}
              </h2>
              <button
                onClick={() => setActiveTab('avis')}
                className="text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm transition"
              >
                <Stethoscope className="w-3.5 h-3.5" />
                {t.tabs.avis}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {[
                { id: 'hypertension', icon: HeartPulse },
                { id: 'calculs_oxalate', icon: ShieldAlert },
                { id: 'calculs_urique', icon: Sparkles },
                { id: 'nourrisson', icon: Droplets },
                { id: 'constipation', icon: Award }
              ].map((prof) => {
                const Icon = prof.icon;
                const active = selectedConditions.includes(prof.id);
                const info = t.profiles[prof.id];
                return (
                  <button
                    key={prof.id}
                    onClick={() => toggleCondition(prof.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-start transition ${
                      active
                        ? 'bg-sky-50/90 border-sky-500 text-sky-950 shadow-sm ring-1 ring-sky-500/30'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg ${active ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">{info.label}</div>
                        <div className="text-[11px] text-slate-500">{info.sub}</div>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${active ? 'bg-sky-600 text-white' : 'border border-slate-300'}`}>
                      {active && <Check className="w-3 h-3" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* ==================== TAB 1: CATALOGUE ==================== */}
        {activeTab === 'catalogue' && (
          <>
            {/* Search & Filters */}
            <section className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200/80 space-y-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute start-3 top-3" />
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full ps-9 pe-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>
                <button
                  onClick={startAddNewWater}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shrink-0 shadow-sm"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.buttons.addWater}</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {['Toutes', 'Centre', 'Est', 'Ouest', 'Sud'].map(reg => (
                    <button
                      key={reg}
                      onClick={() => setRegionFilter(reg)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                        regionFilter === reg ? 'bg-sky-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {t.regions[reg]}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="text-xs bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium"
                  >
                    <option value="all">{t.types.all}</option>
                    <option value="mineral">{t.types.mineral}</option>
                    <option value="spring">{t.types.spring}</option>
                    <option value="sparkling">{t.types.sparkling}</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-xs bg-sky-50 border border-sky-200 rounded-lg px-2.5 py-1.5 text-sky-900 font-semibold"
                  >
                    {Object.entries(t.sort).map(([k, label]) => (
                      <option key={k} value={k}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* Water Cards Grid */}
            <section className="space-y-3">
              {evaluatedWaters.map((w) => (
                <div
                  key={w.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/90 hover:border-sky-400 transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-extrabold text-base text-slate-900">{displayWaterName(w)}</h3>
                        <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                          {t.types[w.type] || w.type}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-sky-600" /> {displayWilaya(w)} ({t.regions[w.region]})
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 mt-1.5 font-medium flex items-center gap-1.5">
                        <Stethoscope className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        {w.evaluation.reasons[0]}
                      </p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border shrink-0 ${badgeStyle(w.evaluation.status)}`}>
                      {t.status[w.evaluation.status]} • {w.evaluation.score}%
                    </span>
                  </div>

                  {/* Rich 6-mineral preview */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mt-3 pt-3 border-t border-slate-100 text-center">
                    <div className="bg-slate-50 rounded-xl p-1.5 border border-slate-100">
                      <div className="text-[10px] text-slate-400">Na⁺ (Sodium)</div>
                      <div className={`text-xs font-extrabold ${w.composition.sodium < 20 ? 'text-emerald-700' : 'text-slate-800'}`}>
                        {w.composition.sodium} <span className="text-[10px] font-normal">mg/L</span>
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-1.5 border border-slate-100">
                      <div className="text-[10px] text-slate-400">Ca²⁺ (Calcium)</div>
                      <div className="text-xs font-extrabold text-slate-800">{w.composition.calcium} <span className="text-[10px] font-normal">mg/L</span></div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-1.5 border border-slate-100">
                      <div className="text-[10px] text-slate-400">Mg²⁺ (Magnés.)</div>
                      <div className="text-xs font-extrabold text-slate-800">{w.composition.magnesium} <span className="text-[10px] font-normal">mg/L</span></div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-1.5 border border-slate-100">
                      <div className="text-[10px] text-slate-400">HCO₃⁻ (Bicarb.)</div>
                      <div className="text-xs font-extrabold text-slate-800">{w.composition.bicarbonates} <span className="text-[10px] font-normal">mg/L</span></div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-1.5 border border-slate-100">
                      <div className="text-[10px] text-slate-400">NO₃⁻ (Nitrates)</div>
                      <div className="text-xs font-extrabold text-slate-800">{w.composition.nitrates} <span className="text-[10px] font-normal">mg/L</span></div>
                    </div>
                    <div className="bg-sky-50/70 rounded-xl p-1.5 border border-sky-100">
                      <div className="text-[10px] text-sky-600 font-medium">Résidu Sec</div>
                      <div className="text-xs font-extrabold text-sky-900">{w.composition.residuSec} <span className="text-[10px] font-normal">mg/L</span></div>
                    </div>
                  </div>

                  {/* Action Buttons on every card */}
                  <div className="flex flex-wrap items-center justify-end gap-2 mt-3 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedWater(w)}
                      className="text-xs font-bold bg-sky-50 hover:bg-sky-100 text-sky-700 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition"
                    >
                      <Stethoscope className="w-3.5 h-3.5" />
                      {t.buttons.details}
                    </button>
                    <button
                      onClick={() => startEditWater(w)}
                      className="text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      {t.buttons.edit}
                    </button>
                  </div>
                </div>
              ))}
            </section>
          </>
        )}

        {/* ==================== TAB 2: AVIS MEDICAL ==================== */}
        {activeTab === 'avis' && (
          <section className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-sky-100 text-sky-700">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">{t.avisModal.title}</h2>
                  <p className="text-xs text-slate-500">{t.avisModal.customAdvice}</p>
                </div>
              </div>

              {/* Top Recommended Waters */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  {t.avisModal.top3Title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {topRecommended.map((w, idx) => (
                    <div
                      key={w.id}
                      onClick={() => setSelectedWater(w)}
                      className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/60 cursor-pointer hover:bg-emerald-50 transition"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-sm text-emerald-950">#{idx + 1} {displayWaterName(w)}</span>
                        <span className="text-xs font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">{w.evaluation.score}%</span>
                      </div>
                      <div className="text-[11px] text-emerald-800 mt-1 space-y-0.5">
                        {w.evaluation.reasons.map((r, i) => <div key={i}>• {r}</div>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Waters to Avoid */}
              {topAvoid.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-2.5 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    {t.avisModal.avoidTitle}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {topAvoid.map(w => (
                      <div
                        key={w.id}
                        onClick={() => setSelectedWater(w)}
                        className="p-3 rounded-xl border border-rose-200 bg-rose-50/60 cursor-pointer"
                      >
                        <div className="font-bold text-xs text-rose-950">{displayWaterName(w)}</div>
                        <div className="text-[11px] text-rose-700 mt-1">{w.evaluation.reasons[0]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ==================== TAB 3: COMPARATEUR FACE-A-FACE ==================== */}
        {activeTab === 'compare' && (
          <section className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <ArrowLeftRight className="w-5 h-5 text-sky-600" />
              {t.tabs.compare} Face-à-Face
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <select
                value={compareId1}
                onChange={(e) => setCompareId1(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-sky-50 border border-sky-200 font-bold text-xs text-sky-950"
              >
                {waters.map(w => <option key={w.id} value={w.id}>{displayWaterName(w)}</option>)}
              </select>

              <select
                value={compareId2}
                onChange={(e) => setCompareId2(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-cyan-50 border border-cyan-200 font-bold text-xs text-cyan-950"
              >
                {waters.map(w => <option key={w.id} value={w.id}>{displayWaterName(w)}</option>)}
              </select>
            </div>

            {(() => {
              const w1 = waters.find(w => w.id === compareId1) || waters[0];
              const w2 = waters.find(w => w.id === compareId2) || waters[1];
              const ev1 = evaluateWater(w1, selectedConditions, lang);
              const ev2 = evaluateWater(w2, selectedConditions, lang);

              return (
                <div className="space-y-2">
                  <div className="grid grid-cols-3 text-center py-2 bg-slate-50 rounded-xl font-bold text-xs">
                    <div className="text-sky-800">{displayWaterName(w1)} ({ev1.score}%)</div>
                    <div className="text-slate-400">Minéral</div>
                    <div className="text-cyan-800">{displayWaterName(w2)} ({ev2.score}%)</div>
                  </div>

                  {Object.keys(t.minerals).map((mKey) => {
                    const v1 = w1.composition[mKey];
                    const v2 = w2.composition[mKey];
                    return (
                      <div key={mKey} className="grid grid-cols-3 items-center text-center py-2 border-b border-slate-100 text-xs">
                        <div className={`font-bold ${v1 < v2 ? 'text-emerald-700' : 'text-slate-800'}`}>
                          {v1} {mKey === 'ph' ? '' : 'mg/L'}
                        </div>
                        <div className="text-[11px] font-medium text-slate-500">{t.minerals[mKey]}</div>
                        <div className={`font-bold ${v2 < v1 ? 'text-emerald-700' : 'text-slate-800'}`}>
                          {v2} {mKey === 'ph' ? '' : 'mg/L'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </section>
        )}

        {/* ==================== TAB 4: AJOUTER / MODIFIER UNE EAU ==================== */}
        {activeTab === 'add' && (
          <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-sky-600" />
                {isEditingExisting ? t.form.titleEdit : t.form.titleAdd}
              </h2>
              {isEditingExisting && (
                <button
                  type="button"
                  onClick={startAddNewWater}
                  className="text-xs bg-sky-50 text-sky-700 font-bold px-3 py-1.5 rounded-xl"
                >
                  + {t.buttons.addWater}
                </button>
              )}
            </div>

            {saveBanner && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {t.form.savedSuccess}
              </div>
            )}

            {/* Quick selector to edit any existing brand */}
            <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                {lang === 'ar' ? 'أو اختر علامة موجودة لتعديل قيمها فوراً :' : lang === 'en' ? 'Or select an existing water to edit its values:' : 'Ou sélectionnez une marque existante pour modifier ses valeurs :'}
              </label>
              <select
                value={isEditingExisting ? editingWater.id : ''}
                onChange={(e) => {
                  const found = waters.find(w => w.id === e.target.value);
                  if (found) startEditWater(found);
                }}
                className="w-full p-2 text-xs bg-white border border-slate-300 rounded-lg font-semibold"
              >
                <option value="">-- {lang === 'ar' ? 'اختر علامة لتعديلها' : 'Choisir une eau parmi les 36 marques'} --</option>
                {waters.map(w => (
                  <option key={w.id} value={w.id}>{displayWaterName(w)} ({displayWilaya(w)})</option>
                ))}
              </select>
            </div>

            <form onSubmit={handleSaveWater} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.form.name} (FR/EN) *</label>
                  <input
                    type="text"
                    required
                    value={editingWater.name}
                    onChange={(e) => setEditingWater({ ...editingWater, name: e.target.value })}
                    className="w-full p-2.5 text-sm border border-slate-300 rounded-xl"
                    placeholder="Ex: Ifri, Saïda..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.form.name} (عربي)</label>
                  <input
                    type="text"
                    value={editingWater.nameAr || ''}
                    onChange={(e) => setEditingWater({ ...editingWater, nameAr: e.target.value })}
                    className="w-full p-2.5 text-sm border border-slate-300 rounded-xl"
                    placeholder="مثال: إفري، سعيدة..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.form.wilaya}</label>
                  <input
                    type="text"
                    value={editingWater.wilaya}
                    onChange={(e) => setEditingWater({ ...editingWater, wilaya: e.target.value })}
                    className="w-full p-2.5 text-sm border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.form.region}</label>
                  <select
                    value={editingWater.region}
                    onChange={(e) => setEditingWater({ ...editingWater, region: e.target.value })}
                    className="w-full p-2.5 text-sm border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="Centre">{t.regions.Centre}</option>
                    <option value="Est">{t.regions.Est}</option>
                    <option value="Ouest">{t.regions.Ouest}</option>
                    <option value="Sud">{t.regions.Sud}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.form.type}</label>
                  <select
                    value={editingWater.type}
                    onChange={(e) => setEditingWater({ ...editingWater, type: e.target.value })}
                    className="w-full p-2.5 text-sm border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="mineral">{t.types.mineral}</option>
                    <option value="spring">{t.types.spring}</option>
                    <option value="sparkling">{t.types.sparkling}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.form.source}</label>
                  <input
                    type="text"
                    value={editingWater.source}
                    onChange={(e) => setEditingWater({ ...editingWater, source: e.target.value })}
                    className="w-full p-2.5 text-sm border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-3">
                  Composition Minérale (mg/L)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {Object.keys(t.minerals).map((mKey) => (
                    <div key={mKey} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">{t.minerals[mKey]}</label>
                      <input
                        type="number"
                        step="0.1"
                        value={editingWater.composition[mKey]}
                        onChange={(e) =>
                          setEditingWater({
                            ...editingWater,
                            composition: { ...editingWater.composition, [mKey]: e.target.value }
                          })
                        }
                        className="w-full p-1.5 text-sm font-bold bg-white border border-slate-300 rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('catalogue')}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700"
                >
                  {t.buttons.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-1.5 shadow"
                >
                  <Save className="w-4 h-4" />
                  {t.buttons.save}
                </button>
              </div>
            </form>
          </section>
        )}

        {/* ==================== TAB 5: GUIDE MEDICAL ==================== */}
        {activeTab === 'guide' && (
          <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-600" />
              {lang === 'ar' ? 'دليل قراءة الملصقات المعدنية' : lang === 'en' ? 'How to Read Water Labels' : 'Guide de lecture des étiquettes minérales'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 space-y-1">
                <div className="font-bold text-sky-950">1. Hypertension Artérielle (Sodium Na⁺)</div>
                <p className="text-slate-700">Privilégiez toujours une eau avec <strong>Sodium &lt; 20 mg/L</strong> (ex: Lalla Khedidja, Texanna, Besbassa, Batna). Évitez les eaux gazeuses salées.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <div className="font-bold text-emerald-950">2. Calculs Rénaux (Oxalate de Calcium)</div>
                <p className="text-slate-700">Choisissez une eau oligominérale légère avec un <strong>Résidu sec à 180°C &lt; 350 mg/L</strong> et un Calcium &lt; 80 mg/L pour ne pas saturer les reins.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                <div className="font-bold text-amber-950">3. Calculs d'Acide Urique (Bicarbonates)</div>
                <p className="text-slate-700">Optez pour une eau riche en <strong>Bicarbonates (&gt; 300 mg/L)</strong> et au pH alcalin afin d'alcaliniser les urines et dissoudre les cristaux.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
                <div className="font-bold text-purple-950">4. Préparation des Biberons (Nourrissons)</div>
                <p className="text-slate-700">Vérifiez impérativement : <strong>Nitrates &lt; 10 mg/L</strong> (idéalement &lt; 5 mg/L), Sodium &lt; 20 mg/L et Résidu sec &lt; 500 mg/L.</p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ==================== MODAL MISE EN GARDE MEDICALE EXPLICITE ==================== */}
      {showDisclaimerModal && (
        <div className="fixed inset-0 bg-black/65 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border-2 border-amber-300 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-amber-100 text-amber-700 rounded-2xl">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                    {t.disclaimerBadge}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1">
                    {t.disclaimerFullTitle}
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setShowDisclaimerModal(false)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed border-y border-slate-100 py-3">
              <p className="font-semibold text-slate-900">
                {t.disclaimerFullP1}
              </p>
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-950 font-medium">
                {t.disclaimerFullP2}
              </div>
              <p className="font-bold text-amber-900 bg-amber-50 p-3 rounded-xl border border-amber-200">
                ⚠️ {t.disclaimerFullP3}
              </p>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => setShowDisclaimerModal(false)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-extrabold bg-sky-600 hover:bg-sky-700 text-white shadow-md flex items-center justify-center gap-2 transition"
              >
                <Check className="w-4 h-4" />
                {t.disclaimerAcceptBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL FICHE DETAIL & AVIS ==================== */}
      {selectedWater && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl p-5 max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">{displayWaterName(selectedWater)}</h3>
                <p className="text-xs text-slate-500">
                  Source : {selectedWater.source} • {displayWilaya(selectedWater)} ({t.regions[selectedWater.region]})
                </p>
              </div>
              <button onClick={() => setSelectedWater(null)} className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200">
                <X className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            {/* Medical Evaluation Box */}
            <div className={`p-3.5 rounded-2xl border ${badgeStyle(selectedWater.evaluation.status)}`}>
              <div className="font-extrabold text-xs mb-1.5 flex items-center justify-between">
                <span>{t.status[selectedWater.evaluation.status]}</span>
                <span>Score Santé : {selectedWater.evaluation.score}/100</span>
              </div>
              <ul className="list-disc list-inside text-xs space-y-1 font-medium">
                {selectedWater.evaluation.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            {/* Full Mineral Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Composition Physico-Chimique (mg/L)
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(t.minerals).map(([k, label]) => (
                  <div key={k} className="flex justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-600 font-medium">{label}</span>
                    <span className="font-extrabold text-slate-900">
                      {selectedWater.composition[k]} {k === 'ph' ? '' : 'mg/L'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Edit or Delete actions inside modal */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <button
                onClick={() => handleDeleteWater(selectedWater.id)}
                className="text-xs font-bold text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-xl flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                {t.buttons.delete}
              </button>
              <button
                onClick={() => startEditWater(selectedWater)}
                className="text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl flex items-center gap-1.5 shadow"
              >
                <Edit3 className="w-4 h-4" />
                {t.buttons.edit}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== BOTTOM NAVIGATION BAR ==================== */}
      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 shadow-lg z-40">
        <div className="max-w-4xl mx-auto grid grid-cols-5 py-1.5 px-2">
          {[
            { id: 'catalogue', label: t.tabs.catalogue, icon: Droplets },
            { id: 'avis', label: t.tabs.avis, icon: Stethoscope },
            { id: 'compare', label: t.tabs.compare, icon: ArrowLeftRight },
            { id: 'add', label: t.tabs.add, icon: PlusCircle },
            { id: 'guide', label: t.tabs.guide, icon: BookOpen }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center py-1 rounded-xl transition ${
                  active ? 'text-sky-600 font-extrabold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-sky-600' : 'text-slate-400'}`} />
                <span className="text-[10px] mt-0.5 truncate max-w-full px-1">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
