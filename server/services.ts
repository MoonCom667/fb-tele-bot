import { GoogleGenAI } from '@google/genai';
import { 
  CompatibilityReport, 
  CompatibilityIssue, 
  PCBuildParts, 
  Product, 
  Order, 
  OrderCustomer, 
  OrderItem 
} from '../src/types.js';
import { PRODUCTS, STORE_INFO } from './data/products.js';
import { storeRepo } from './store.js';

export interface AdvisorHistoryMessage {
  sender: 'ai' | 'user';
  text: string;
}

let geminiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (geminiClient) return geminiClient;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    geminiClient = new GoogleGenAI({ apiKey });
    return geminiClient;
  }
  return null;
}

export function checkPCCompatibility(parts: PCBuildParts): CompatibilityReport {
  const issues: CompatibilityIssue[] = [];
  let calculatedWattage = 70; // Baseline for motherboard, fans, storage, system overhead

  // 1. CPU & Motherboard socket check
  if (parts.cpu && parts.motherboard) {
    const cpuSocket = parts.cpu.specs.socket;
    const mbSocket = parts.motherboard.specs.socket;

    if (cpuSocket && mbSocket && cpuSocket !== mbSocket) {
      issues.push({
        type: 'error',
        component: 'المعالج واللوحة الأم',
        message: `عدم توافق في المقبس: المعالج يحتاج مقبس (${cpuSocket}) بينما اللوحة الأم تدعم مقبس (${mbSocket}). يرجى اختيار لوحة متوافقة.`
      });
    } else if (cpuSocket && mbSocket) {
      issues.push({
        type: 'info',
        component: 'المعالج والمذربورد',
        message: `المعالج واللوحة الأم متوافقان تماماً على مقبس (${cpuSocket}).`
      });
    }
  }

  // 2. RAM & Motherboard generation check (DDR4 vs DDR5)
  if (parts.ram && parts.motherboard) {
    const ramType = parts.ram.specs.memoryType;
    const mbType = parts.motherboard.specs.memoryType;

    if (ramType && mbType && !mbType.includes(ramType)) {
      issues.push({
        type: 'error',
        component: 'الذاكرة العشوائية (RAM)',
        message: `نوع الرام (${ramType}) لا يتطابق مع نوع الذاكرة المدعوم في اللوحة الأم (${mbType}).`
      });
    }
  }

  // 3. Wattage calculation
  if (parts.cpu?.specs.wattage) {
    calculatedWattage += Number(parts.cpu.specs.wattage);
  }
  if (parts.gpu?.specs.wattage) {
    calculatedWattage += Number(parts.gpu.specs.wattage);
  }
  if (parts.cooler?.specs.wattage) {
    calculatedWattage += Number(parts.cooler.specs.wattage);
  }

  const recommendedPsu = Math.ceil((calculatedWattage + 150) / 50) * 50;

  if (parts.powerSupply) {
    const psuWattage = Number(parts.powerSupply.specs.wattage) || 0;
    if (psuWattage < calculatedWattage) {
      issues.push({
        type: 'error',
        component: 'مزود الطاقة (Power Supply)',
        message: `الباور سبلاي المختار (${psuWattage}W) غير كافٍ. استهلاك القطع الفعلي يقارب (${calculatedWattage}W)، ننصح بباور سبلاي لا يقل عن (${recommendedPsu}W).`
      });
    } else if (psuWattage < recommendedPsu) {
      issues.push({
        type: 'warning',
        component: 'مزود الطاقة (Power Supply)',
        message: `الباور سبلاي يغطي الاستهلاك ولكن مع هامش ضئيل. ننصح بباور سبلاي بقوة (${recommendedPsu}W) أو أعلى لضمان الاستقرار وكفاءة الطاقة.`
      });
    } else {
      issues.push({
        type: 'info',
        component: 'مزود الطاقة',
        message: `الباور سبلاي (${psuWattage}W) ممتاز ويوفر فائض طاقة كافي للتجميعة وأي ترقيات مستقبلية.`
      });
    }
  }

  // 4. GPU Clearance in Case
  if (parts.gpu && parts.pcCase) {
    const gpuLen = Number(parts.gpu.specs.gpuLength) || 0;
    const maxGpu = Number(parts.pcCase.specs.maxGpuLength) || 400;

    if (gpuLen > maxGpu) {
      issues.push({
        type: 'error',
        component: 'كيس الحاسوب وكرت الشاشة',
        message: `طول كرت الشاشة (${gpuLen}mm) يتجاوز المساحة المتاحة في الكيس (${maxGpu}mm).`
      });
    }
  }

  // 5. Cooler Socket Check
  if (parts.cpu && parts.cooler) {
    const cpuSocket = parts.cpu.specs.socket;
    const supportedSockets = String(parts.cooler.specs.supportedSockets || '');
    if (cpuSocket && supportedSockets && !supportedSockets.includes(cpuSocket)) {
      issues.push({
        type: 'warning',
        component: 'مبرد المعالج',
        message: `تأكد من وجود قاعدة تثبيت متوافقة مع مقبس (${cpuSocket}) في ملحقات المبرد.`
      });
    }
  }

  // Calculate estimated FPS based on GPU & CPU tier
  let fpsMultiplier = 0.5;
  if (parts.gpu) {
    const score = parts.gpu.gamingScore || 70;
    fpsMultiplier = score / 100;
  }
  if (parts.cpu) {
    const cpuScore = parts.cpu.gamingScore || 70;
    fpsMultiplier = (fpsMultiplier * 0.7) + ((cpuScore / 100) * 0.3);
  }

  const estimatedFps = [
    {
      game: 'Cyberpunk 2077 (Ultra + Ray Tracing)',
      fps1080p: Math.round(140 * fpsMultiplier),
      fps1440p: Math.round(110 * fpsMultiplier),
      fps4k: Math.round(75 * fpsMultiplier)
    },
    {
      game: 'Call of Duty: Warzone',
      fps1080p: Math.round(220 * fpsMultiplier),
      fps1440p: Math.round(175 * fpsMultiplier),
      fps4k: Math.round(115 * fpsMultiplier)
    },
    {
      game: 'Counter-Strike 2 / Valorant',
      fps1080p: Math.round(420 * fpsMultiplier),
      fps1440p: Math.round(350 * fpsMultiplier),
      fps4k: Math.round(240 * fpsMultiplier)
    },
    {
      game: 'Grand Theft Auto V / Red Dead Redemption 2',
      fps1080p: Math.round(160 * fpsMultiplier),
      fps1440p: Math.round(130 * fpsMultiplier),
      fps4k: Math.round(85 * fpsMultiplier)
    }
  ];

  const hasErrors = issues.some(i => i.type === 'error');

  return {
    isCompatible: !hasErrors,
    totalWattage: calculatedWattage,
    recommendedPsuWattage: recommendedPsu,
    estimatedFps,
    issues
  };
}

export function createOrder(customer: OrderCustomer, items: OrderItem[], currency: 'IQD' | 'USD'): Order {
  const orderId = `AQ-${Math.floor(100000 + Math.random() * 900000)}`;
  const totalUSD = items.reduce((sum, item) => sum + item.priceUSD * item.quantity, 0);
  const totalIQD = items.reduce((sum, item) => sum + item.priceIQD * item.quantity, 0);

  // Generate WhatsApp formatted message
  const itemsText = items
    .map((item, index) => `${index + 1}. *${item.name}* × ${item.quantity} = ${currency === 'IQD' ? `${(item.priceIQD * item.quantity).toLocaleString()} د.ع` : `$${item.priceUSD * item.quantity}`}`)
    .join('\n');

  const paymentText = customer.paymentMethod === 'cash_on_delivery' 
    ? 'الدفع عند الاستلام' 
    : customer.paymentMethod === 'zain_cash' 
    ? 'زين كاش (Zain Cash)' 
    : 'استلام مباشر من مكتب القمر (شارع الصناعة)';

  const message = `*طلب جديد من موقع مكتب القمر للحاسبات*\n` +
    `🔖 *رقم الطلب:* #${orderId}\n` +
    `👤 *الاسم:* ${customer.fullName}\n` +
    `📞 *رقم الهاتف:* ${customer.phoneNumber}\n` +
    `📍 *المحافظة / العنوان:* ${customer.province} - ${customer.cityOrArea}\n` +
    `💳 *طريقة الدفع:* ${paymentText}\n` +
    `\n🛒 *القطع والمنتجات:*\n${itemsText}\n\n` +
    `💰 *المجموع الكلي:* ${currency === 'IQD' ? `${totalIQD.toLocaleString()} دينار عراقي` : `$${totalUSD.toLocaleString()} دولار`}\n` +
    (customer.notes ? `📝 *ملاحظات الزبون:* ${customer.notes}\n` : '') +
    `\n-- تم الإرسال عبر منصة مكتب القمر الإلكترونية --`;

  const whatsappLink = `https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(message)}`;

  return {
    id: orderId,
    createdAt: new Date().toISOString(),
    customer,
    items,
    totalUSD,
    totalIQD,
    currency,
    status: 'pending',
    whatsappLink
  };
}

export async function askTechAdvisor(
  userMessage: string, 
  history: AdvisorHistoryMessage[] = [],
  context?: { budget?: number; currency?: string; currentParts?: string[] }
): Promise<string> {
  const ai = getGeminiClient();
  const currentStore = storeRepo ? storeRepo.getStoreInfo() : STORE_INFO;
  const liveProducts = storeRepo ? storeRepo.getProducts({}) : PRODUCTS;

  if (ai) {
    const candidateModels = ['gemini-3.8-flash', 'gemini-3.5-flash', 'gemini-2.5-flash-lite'];
    const catalogSummary = liveProducts.slice(0, 30).map(p => 
      `- [${p.category}] ${p.nameAr} (${p.name}): $${p.priceUSD} / ${p.priceIQD?.toLocaleString() || (p.priceUSD * (currentStore.exchangeRate || 1520)).toLocaleString()} د.ع | ${p.specs.vram || p.specs.socket || p.specs.capacity || ''}`
    ).join('\n');

    const systemInstruction = `أنت "مستشار القمر الذكي"، مهندس وخبير الهاردوير وتجميعات البي سي المعتمد لدى "مكتب القمر للحاسبات" (Moon Computer) في بغداد، شارع الصناعة، مقابل الجامعة التكنولوجية، مقابل عمود رقم 14 (هاتف/واتساب: ${currentStore.phone || '07708732185'}).
سعر صرف الدولار الحالي المعتمد في المحل: 1 دولار = ${currentStore.exchangeRate || 1520} دينار عراقي.

مهمتك:
1. الإجابة بدقة واحترافية عالية على جميع أسئلة الزبائن بلهجة عراقية محترمة وودودة ومتقنة تقنياً.
2. عند السؤال عن مقارنات (مثل Intel vs AMD، 7800X3D vs i7-14700K، أو كروت الشاشة مثل RTX 4070 Ti Super و 4K)، قدم مقارنة هندسية تفصيلية (الفريمات، الفارق في الألعاب مقابل المونتاج، استهلاك الطاقة، واقتراح الباور سبلاي المناسب).
3. عند السؤال عن "المزيد" أو أسئلة متابعة، أكمل على السياق السابق واقترح إضافات (مثل ترقية الرام لـ 32GB CL30، شاشات 240Hz Fast IPS أو OLED، التبريد المائي، وفحص التوافقية المجاني).
4. جميع القطع أصلية مع ضمان استبدال محلي مسجل بالسيريال وتوصيل لكافة محافظات العراق.

بعض المنتجات المتوفرة حالياً في صالة عرض مكتب القمر:
${catalogSummary}`;

    // Build multi-turn contents
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history) && history.length > 0) {
      // Use up to the last 10 messages for rich conversational context
      for (const item of history.slice(-10)) {
        if (!item.text?.trim()) continue;
        contents.push({
          role: item.sender === 'user' ? 'user' : 'model',
          parts: [{ text: item.text }]
        });
      }
    }

    // Add current user message with optional context details
    let promptWithContext = userMessage;
    if (context?.budget) {
      promptWithContext += `\n[ميزانية الزبون المقترحة: ${context.budget} ${context.currency || 'د.ع'}]`;
    }
    if (context?.currentParts?.length) {
      promptWithContext += `\n[القطع المختارة حالياً في أداة التجميع: ${context.currentParts.join(', ')}]`;
    }

    contents.push({
      role: 'user',
      parts: [{ text: promptWithContext }]
    });

    // Try candidate models in order (handles 503 high demand spikes or model deprecations)
    for (const model of candidateModels) {
      try {
        const timeoutPromise = new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error(`Model ${model} timeout`)), 6000)
        );
        const apiPromise = ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction
          }
        });

        const response: any = await Promise.race([apiPromise, timeoutPromise]);

        if (response && response.text && response.text.trim()) {
          return response.text;
        }
      } catch (err: any) {
        console.warn(`Gemini advisor model ${model} failed:`, err?.message || err);
        // Continue to next candidate model
      }
    }
  }

  // High-quality expert rule-based fallback that handles multi-turn and all common hardware questions
  return generateSmartFallbackResponse(userMessage, history, context);
}

function generateSmartFallbackResponse(
  query: string, 
  history: AdvisorHistoryMessage[] = [],
  context?: { budget?: number; currency?: string }
): string {
  const q = query.toLowerCase().trim();
  const phone = '07708732185';
  const lastUserMsg = history.filter(m => m.sender === 'user').slice(-2, -1)[0]?.text?.toLowerCase() || '';

  // 1. Follow-up "المزيد" / More details
  if (q === 'المزيد' || q.includes('المزيد') || q.includes('تفاصيل اكثر') || q.includes('شنو بعد') || q.includes('اكمل') || q.includes('خيارات اخرى')) {
    if (lastUserMsg.includes('ميزانية') || lastUserMsg.includes('تجميعة') || lastUserMsg.includes('مليون')) {
      return `تدلل يا الغالي! إليك تفاصيل إضافية لتطوير التجميعة وضمان أفضل استثمار لميزانيتك: 🌙🎮\n\n` +
        `🔧 **نصائح الترقية الذكية في مكتب القمر:**\n` +
        `• **الرامات (RAM):** ننصح دائماً بذاكرة 32GB (2x16GB) DDR5 بتردد 6000MHz وتوقيت CL30 للحصول على أقل تأخير زمني في ألعاب الأونلاين التنافسية.\n` +
        `• **التبريد (Cooling):** لمعالجات الجيل الجديد، مبرد مائي 240mm أو 360mm (مثل DeepCool LT720 أو Kraken 360) يضمن ثبات الفريمات ومنع الـ Thermal Throttling في صيف العراق.\n` +
        `• **مزود الطاقة (Power Supply):** اختيار باور سبلاي 750W أو 850W بشهادة 80+ Gold يمنحك راحة بال لأي ترقية كرت شاشة مستقبلية.\n` +
        `• **الشاشة المقترحة:** شاشة Fast IPS 165Hz-240Hz بدقة 2K (1440p) تكمل قوة الكرت وتعطيك تجربة بصرية سينمائية.\n\n` +
        `💡 في صالة عرض مكتب القمر (شارع الصناعة)، نقدم خدمة تجميع احترافي مع كيبل مانجمنت وفحص حراري شامل وضمان استبدال حقيقي مسجل بالسيريال. اتصل بنا أو راسلنا واتساب: ${phone}.`;
    }

    return `تدلل يا الغالي! في مكتب القمر للحاسبات نقدم لك دائماً خيارات إضافية وخدمات حصرية: 🌙\n\n` +
      `1️⃣ **شاشات الجيمنج الاحترافية:** متوفر شاشات 240Hz و 360Hz Fast IPS و OLED بأوقات استجابة 0.03ms لضمان سلاسة خارقة في الألعاب.\n` +
      `2️⃣ **ترقيات التخزين الفائق:** وحدات Samsung 990 PRO Gen4 بسرعات قراءة تصل 7450MB/s لتقليل أوقات تحميل الألعاب.\n` +
      `3️⃣ **إكسسوارات الجيمنج:** كيبوردات ميكانيكية وماوسات خفيفة الوزن من ASUS ROG و Razer و Corsair.\n` +
      `4️⃣ **الضمان والاستبدال:** جميع قطعنا مشمولة بضمان استبدال محلي فوري مسجل بالسيريال نمبر.\n\n` +
      `يسعدنا دائماً استقبالك في فرعنا بشارع الصناعة أو تواصل معنا مباشرة عبر الواتساب: ${phone}.`;
  }

  // 2. CPU Comparison: Ryzen 7 7800X3D vs Intel i7-14700K
  if ((q.includes('7800x3d') && q.includes('14700k')) || (q.includes('intel') && q.includes('amd')) || (q.includes('رايزن') && q.includes('انتل')) || q.includes('7800x3d') || q.includes('14700k')) {
    return `مقارنة احترافية من واقع الاختبارات في مختبر مكتب القمر للحاسبات: ⚔️🖥️\n\n` +
      `🏆 **AMD Ryzen 7 7800X3D (ملك الألعاب بلا منازع):**\n` +
      `• **نقاط القوة للألعاب:** تقنية 3D V-Cache (ذاكرة كاش ضخمة 96MB L3) تمنحه تفوقاً بنسبة 10% إلى 20% في الفريمات والـ 1% Low في ألعاب مثل Warzone, CS2, Cyberpunk, Valorant.\n` +
      `• **استهلاك الطاقة والحرارة:** يستهلك فقط 65W إلى 85W أثناء اللعب، مما يجعله بارداً جداً ويكفيه مبرد هوائي ممتاز أو مائي 240mm.\n` +
      `• **المستقبل:** سوكت AM5 مدعوم من AMD حتى عام 2027+ لترقيات مستقبلية سهلة.\n\n` +
      `⚡ **Intel Core i7-14700K (الوحش المتعدد المهام):**\n` +
      `• **نقاط القوة للإنتاجية:** 20 نواة (8 للأداء + 12 للكفاءة) و 28 مسار، يتفوق بوضوح في المونتاج (Premiere / After Effects)، الرندرة (Blender)، وصناعة المحتوى الثقيل.\n` +
      `• **نقاط الضعف:** استهلاك طاقة عالي يصل 250W-300W تحت الضغط، ويحتاج مبرد مائي 360mm وباور سبلاي لا يقل عن 850W.\n\n` +
      `🎯 **نصيحة مهندس مكتب القمر:**\n` +
      `إذا كان هدفك الأساسي **ألعاب بحتة وستريمنج خفيف**، فاختيارك الأول هو **Ryzen 7 7800X3D**. أما إذا كنت **صانع محتوى محترف ومصمم ورندرة بجانب الألعاب**، فتوجه للـ **i7-14700K**.\n` +
      `كلا المعالجين متوفران في صالتنا بشارع الصناعة مع بوردات B650 و Z790 وضمان محلي حقيقي!`;
  }

  // 3. GPU 4K Query: RTX 4070 Ti Super for 4K
  if ((q.includes('4070') && q.includes('4k')) || (q.includes('4070 ti super') || q.includes('4070ti super') || q.includes('4070 ti'))) {
    return `نعم وبكل تأكيد! كرت **NVIDIA GeForce RTX 4070 Ti SUPER 16GB** يعتبر من أقوى وأفضل كروت الشاشة لألعاب دقة 4K في الوقت الحالي: 🚀🎮\n\n` +
      `✨ **لماذا هو ممتاز لدقة 4K؟**\n` +
      `1. **الذاكرة (16GB GDDR6X):** ترقية جوهرية عن الـ 4070 Ti القديم (الذي كان 12GB فقط). سعة 16GB مع ناقل 256-bit تمنع أي عنق زجاجة للذاكرة في ألعاب 4K الثقيلة مثل Hogwarts Legacy و The Last of Us.\n` +
      `2. **تقنية DLSS 3 & Frame Generation:** تسمح لك بلعب Cyberpunk 2077 و Alan Wake 2 على 4K بأعلى إعدادات رسومية مع تتبع الأشعة بمعدل يتجاوز 75-100+ فريم.\n` +
      `3. **الأداء في الألعاب التنافسية:** على دقة 4K في Warzone أو Apex Legends يعطي بين 110 إلى 140+ إطار بالثانية.\n` +
      `4. **الباور سبلاي المنصوح به:** كرت يستهلك 285W، وننصح معه بمزود طاقة 750W أو 850W Gold مع كابل 12VHPWR الأصلي لضمان الأمان التام.\n\n` +
      `الكرت متوفر لدينا بنسخ Gigabyte Gaming OC و ASUS TUF و MSI Gaming X Trio بفرعنا بشارع الصناعة. اتصل بنا: ${phone}.`;
  }

  // 4. High Refresh Rate Monitor Query: 240Hz
  if (q.includes('240hz') || q.includes('شاشة') || q.includes('شاشات') || q.includes('monitor') || q.includes('شاشه')) {
    return `أهلاً بك في قسم الشاشات الاحترافية بمكتب القمر للحاسبات! 🖥️✨\n\n` +
      `إليك أفضل خيارات شاشات الألعاب بمعدل تحديث **240Hz** المتوفرة لدينا:\n\n` +
      `1️⃣ **ASUS ROG Swift OLED PG27AQDM (الفئة العليا المطلقة):**\n` +
      `• الحجم والدقة: 27 بوصة 2K QHD (2560x1440)\n` +
      `• اللوحة وسرعة الاستجابة: OLED حقيقي مع وقت استجابة خيالي 0.03ms!\n` +
      `• الميزة: تباين لا نهائي وسواد حقيقي مع 240Hz لأعلى دقة تنافسية في ألعاب الشوتر.\n\n` +
      `2️⃣ **Samsung Odyssey G6 / G7 Fast IPS 240Hz (الأكثر طلباً وتوازناً):**\n` +
      `• الحجم والدقة: 27 أو 32 بوصة QHD 2K بتردد 240Hz و 1ms GtG.\n` +
      `• ألوان دقيقة 99% sRGB مع دعم AMD FreeSync Premium Pro و G-Sync Compatible.\n\n` +
      `3️⃣ **BenQ ZOWIE XL2546K 240Hz (الخيار الأول لبطولات الإيسبورتس):**\n` +
      `• الحجم والدقة: 24.5 بوصة FHD بتقنية DyAc+ للوضوح التام في الحركة السريعة لـ CS2 و Valorant.\n\n` +
      `نوفر فحص كامل للشاشة من البكسلات الميتة قبل الاستلام، مع ضمان استبدال رسمي. زورنا في شارع الصناعة أو راسلنا: ${phone}.`;
  }

  // 5. Budget Gaming Build (1.5 Million IQD / general budget)
  if (q.includes('تجميعة') || q.includes('ميزانية') || q.includes('مليون') || q.includes('سعر') || q.includes('build') || q.includes('budget')) {
    return `أهلاً بك في مكتب القمر للحاسبات (شارع الصناعة، مجمع النعمان)! 🎮🌙\n\n` +
      `بناءً على طلبك وميزانية **المليون ونص دينار عراقي (حوالي 1,000$)**، إليك أفضل تجميعة ألعاب متوازنة تمنحك أعلى فريمات مقابل السعر:\n\n` +
      `🛠️ **تجميعة الجيمنج التنافسية الذكية (1,520,000 د.ع):**\n` +
      `• **المعالج:** Intel Core i5-13400F (10 أنوية) أو AMD Ryzen 5 7600 (سداسي النواة بتبريد ممتاز)\n` +
      `• **كرت الشاشة:** ASUS Dual GeForce RTX 4060 8GB GDDR6 OC (أداء ممتاز لـ 1080p و 2K مع DLSS 3)\n` +
      `• **اللوحة الأم:** MSI PRO B760M-P DDR5 أو ASUS TUF B650M\n` +
      `• **الذاكرة العشوائية:** 32GB (2x16GB) Kingston Fury DDR5 5600MHz/6000MHz\n` +
      `• **التخزين السريع:** 1TB Kingston NV2 PCIe 4.0 NVMe SSD فائق السرعة\n` +
      `• **مزود الطاقة:** DeepCool PK650D 650W Bronze معتمد\n` +
      `• **الكيس والتبريد:** كيس احترافي بمراوح ARGB وتدفق هواء قوي مع مبرد هوائي عالي الكفاءة\n\n` +
      `✨ **مميزات مكتب القمر المجانية:**\n` +
      `• تركيب وتجميع احترافي وتنسيق كابلات مجاني 100%.\n` +
      `• فحص حراري وضغط للنظام تحت أقصى جهد قبل التسليم.\n` +
      `• ضمان حقيقي مسجل بالسيريال وتوصيل لكافة محافظات العراق.\n\n` +
      `يمكنك زيارة صالتنا بشارع الصناعة أو حجز التجميعة فوراً عبر واتساب: ${phone}.`;
  }

  // 6. Laptops
  if (q.includes('لابتوب') || q.includes('laptop') || q.includes('محمول') || q.includes('asus rog') || q.includes('lenovo')) {
    return `أهلاً بك! لدينا أحدث لابتوبات الجيمنج وصناع المحتوى الأصلية في مكتب القمر: 💻⚡\n\n` +
      `🔥 **ASUS ROG Strix SCAR 16 (2024):**\n` +
      `• معالج: Intel Core i9-14900HX\n` +
      `• كرت شاشة: RTX 4080 12GB\n` +
      `• شاشة: ROG Nebula HDR Mini-LED بدقة 2.5K بتردد 240Hz\n` +
      `• السعر التقريبي: 2,850$\n\n` +
      `⚡ **ASUS TUF Gaming A15 / F15 (الأكثر طلباً):**\n` +
      `• معالج: Ryzen 7 أو Core i7 الجيل 13\n` +
      `• كرت شاشة: RTX 4060 8GB\n` +
      `• شاشة: 144Hz IPS\n` +
      `• السعر: يبدأ من 1,050$\n\n` +
      `جميع اللابتوبات مع ضمان حقيقي سنتين وتوصيل لكافة المحافظات. للتفاصيل: ${phone}.`;
  }

  // Default fallback
  return `أهلاً بك في مستشار "مكتب القمر للحاسبات" الذكي - شارع الصناعة، مجمع النعمان التجاري! 💻🌙\n\n` +
    `نحن متخصصون في:\n` +
    `• بناء وتجميع حواسيب الجيمنج وصناع المحتوى من الفئات الاقتصادية حتى الـ Extreme.\n` +
    `• توفير كروت الشاشة الأصلية (RTX 4060, 4070 Ti Super, 4080 Super, 4090) والمعالجات (Ryzen 7000/9000 & Intel Core 14th Gen).\n` +
    `• شاشات 144Hz و 240Hz Fast IPS و OLED بضمان فحص البكسلات.\n` +
    `• خدمة الفحص والتجميع والضمان المسجل بالسيريال نمبر.\n\n` +
    `اكتب سؤالك بخصوص ميزانيتك، القطع التي تريد مقارنتها، أو تواصل معنا مباشرة عبر الهاتف والواتساب: ${phone}.`;
}

