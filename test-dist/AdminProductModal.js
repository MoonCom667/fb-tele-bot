var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/components/AdminProductModal.tsx
var AdminProductModal_exports = {};
__export(AdminProductModal_exports, {
  AdminProductModal: () => AdminProductModal
});
module.exports = __toCommonJS(AdminProductModal_exports);
var import_react = require("react");
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
var PRESET_HARDWARE_IMAGES = [
  { label: "RTX 4090 ASUS ROG STRIX", url: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80", cat: "gpus" },
  { label: "RTX 4070 Ti SUPER MSI", url: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80", cat: "gpus" },
  { label: "AMD Ryzen 7 7800X3D CPU", url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&auto=format&fit=crop&q=80", cat: "cpus" },
  { label: "Intel Core i9-14900K CPU", url: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80", cat: "cpus" },
  { label: "Motherboard ROG Strix X670E", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80", cat: "motherboards" },
  { label: "RAM Corsair Dominator DDR5 RGB", url: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=600&auto=format&fit=crop&q=80", cat: "ram" },
  { label: "Samsung 990 PRO NVMe SSD", url: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop&q=80", cat: "storage" },
  { label: "ASUS ROG Strix SCAR 18 Laptop", url: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80", cat: "laptops" },
  { label: "Samsung Odyssey OLED G9 Monitor", url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80", cat: "monitors" },
  { label: "Lian Li O11 Vision Case", url: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&auto=format&fit=crop&q=80", cat: "cases" },
  { label: "NZXT Kraken Elite 360 Liquid Cooler", url: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80", cat: "cooling" },
  { label: "Corsair RM1000x Gold PSU", url: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80", cat: "power_supplies" },
  { label: "\u062A\u062C\u0645\u064A\u0639\u0629 \u0627\u0644\u0642\u0645\u0631 \u0627\u0644\u0623\u0644\u062A\u0631\u0627 4K Beast", url: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&auto=format&fit=crop&q=80", cat: "prebuilt_pcs" }
];
var AdminProductModal = ({
  isOpen,
  onClose,
  onSaveProduct,
  onSave,
  editingProduct,
  productToEdit,
  categories = [],
  brands = ["ASUS", "MSI", "Gigabyte", "Corsair", "Kingston", "NZXT", "Lian Li", "Intel", "AMD", "NVIDIA", "Samsung"],
  exchangeRate = 1520
}) => {
  const activeProduct = editingProduct !== void 0 ? editingProduct : productToEdit || null;
  const handleSave = onSaveProduct || onSave || (() => {
  });
  const safeBrands = brands && brands.length > 0 ? brands : ["ASUS", "MSI", "Gigabyte", "Corsair", "Kingston", "NZXT", "Lian Li", "Intel", "AMD", "NVIDIA", "Samsung"];
  const [formData, setFormData] = (0, import_react.useState)({
    name: "",
    nameAr: "",
    category: "gpus",
    brand: safeBrands[0] || "ASUS",
    priceUSD: 0,
    priceIQD: 0,
    originalPriceUSD: 0,
    originalPriceIQD: 0,
    image: "",
    description: "",
    descriptionAr: "",
    inStock: true,
    stockCount: 5,
    featured: false,
    isNewArrival: false,
    isBestSeller: false,
    rating: 5,
    reviewsCount: 12,
    warranty: "\u0636\u0645\u0627\u0646 \u0633\u0646\u0629 \u0648\u0627\u062D\u062F\u0629 \u0627\u0633\u062A\u0628\u062F\u0627\u0644 \u0641\u0648\u0631\u064A",
    gamingScore: 90,
    specs: {}
  });
  const [specs, setSpecs] = (0, import_react.useState)({});
  const [autoCalculateIQD, setAutoCalculateIQD] = (0, import_react.useState)(true);
  (0, import_react.useEffect)(() => {
    if (activeProduct) {
      setFormData(activeProduct);
      setSpecs(activeProduct.specs || {});
    } else {
      setFormData({
        id: `prod-custom-${Date.now()}`,
        name: "",
        nameAr: "",
        category: "gpus",
        brand: safeBrands[0] || "ASUS",
        priceUSD: 100,
        priceIQD: 100 * exchangeRate,
        image: PRESET_HARDWARE_IMAGES[0].url,
        description: "",
        descriptionAr: "",
        inStock: true,
        stockCount: 5,
        featured: false,
        isNewArrival: true,
        isBestSeller: false,
        rating: 5,
        reviewsCount: 1,
        warranty: "\u0636\u0645\u0627\u0646 \u0633\u0646\u0629 \u0648\u0627\u062D\u062F\u0629 \u0627\u0633\u062A\u0628\u062F\u0627\u0644 \u0645\u0628\u0627\u0634\u0631",
        gamingScore: 85,
        specs: {}
      });
      setSpecs({
        vram: "16GB GDDR6X",
        socket: "AM5 / LGA1700",
        wattage: 750
      });
    }
  }, [activeProduct, isOpen, exchangeRate, safeBrands]);
  if (!isOpen) return null;
  const handleUSDPriceChange = (usd) => {
    setFormData((prev) => ({
      ...prev,
      priceUSD: usd,
      priceIQD: autoCalculateIQD ? Math.round(usd * exchangeRate) : prev.priceIQD
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nameAr || !formData.name) {
      alert("\u064A\u0631\u062C\u0649 \u0643\u062A\u0627\u0628\u0629 \u0627\u0633\u0645 \u0627\u0644\u0645\u0646\u062A\u062C \u0628\u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0648\u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629");
      return;
    }
    const finalProduct = {
      id: formData.id || `prod-${Date.now()}`,
      name: formData.name || "",
      nameAr: formData.nameAr || "",
      category: formData.category || "gpus",
      brand: formData.brand || "ASUS",
      priceUSD: Number(formData.priceUSD) || 0,
      priceIQD: Number(formData.priceIQD) || Math.round((Number(formData.priceUSD) || 0) * exchangeRate),
      originalPriceUSD: formData.originalPriceUSD ? Number(formData.originalPriceUSD) : void 0,
      originalPriceIQD: formData.originalPriceIQD ? Number(formData.originalPriceIQD) : void 0,
      image: formData.image || PRESET_HARDWARE_IMAGES[0].url,
      description: formData.description || formData.name || "",
      descriptionAr: formData.descriptionAr || formData.nameAr || "",
      inStock: Boolean(formData.inStock),
      stockCount: Number(formData.stockCount) || 0,
      featured: Boolean(formData.featured),
      isNewArrival: Boolean(formData.isNewArrival),
      isBestSeller: Boolean(formData.isBestSeller),
      rating: Number(formData.rating) || 5,
      reviewsCount: Number(formData.reviewsCount) || 1,
      specs,
      gamingScore: Number(formData.gamingScore) || 80,
      warranty: formData.warranty || "\u0636\u0645\u0627\u0646 \u0633\u0646\u0629 \u0648\u0627\u062D\u062F\u0629 \u0627\u0633\u062A\u0628\u062F\u0627\u0644"
    };
    handleSave(finalProduct);
    onClose();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-slate-900 border border-slate-700/90 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl text-right", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30", children: activeProduct ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Save, { className: "w-5 h-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Plus, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "text-base sm:text-lg font-black text-white", children: activeProduct ? "\u062A\u0639\u062F\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0642\u0637\u0639\u0629 / \u0627\u0644\u0645\u0646\u062A\u062C" : "\u0625\u0636\u0627\u0641\u0629 \u0645\u0646\u062A\u062C \u062C\u062F\u064A\u062F \u0644\u0644\u0643\u062A\u0627\u0644\u0648\u062C" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-xs text-slate-400", children: [
            "\u0633\u0639\u0631 \u0627\u0644\u0635\u0631\u0641 \u0627\u0644\u0646\u0634\u0637 \u0627\u0644\u0622\u0646: 1 \u062F\u0648\u0644\u0627\u0631 = ",
            exchangeRate.toLocaleString(),
            " \u062F.\u0639"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          onClick: onClose,
          className: "p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.X, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { onSubmit: handleSubmit, className: "p-6 overflow-y-auto space-y-6 text-xs flex-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "font-bold text-slate-300 block", children: "\u0627\u0633\u0645 \u0627\u0644\u0645\u0646\u062A\u062C \u0628\u0627\u0644\u0639\u0631\u0628\u064A\u0629 *" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              type: "text",
              required: true,
              value: formData.nameAr || "",
              onChange: (e) => setFormData({ ...formData, nameAr: e.target.value }),
              placeholder: "\u0645\u062B\u0627\u0644: \u0643\u0631\u062A \u0634\u0627\u0634\u0629 ASUS ROG Strix RTX 4090 24GB",
              className: "w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-amber-500 text-xs"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "font-bold text-slate-300 block", children: "\u0627\u0633\u0645 \u0627\u0644\u0645\u0646\u062A\u062C \u0628\u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629 (Model Code) *" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              type: "text",
              required: true,
              value: formData.name || "",
              onChange: (e) => setFormData({ ...formData, name: e.target.value }),
              placeholder: "e.g. ASUS ROG Strix GeForce RTX 4090 OC 24GB",
              className: "w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-amber-500 text-xs font-tech"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "font-bold text-slate-300 block", children: "\u0627\u0644\u0642\u0633\u0645 \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0641" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "select",
            {
              value: formData.category || "gpus",
              onChange: (e) => setFormData({ ...formData, category: e.target.value }),
              className: "w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-amber-500 text-xs cursor-pointer",
              children: categories.filter((c) => c.id !== "all").map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: cat.id, children: cat.nameAr }, cat.id))
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "font-bold text-slate-300 block", children: "\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629 / Brand" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex gap-2", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              type: "text",
              value: formData.brand || "",
              onChange: (e) => setFormData({ ...formData, brand: e.target.value }),
              placeholder: "ASUS, MSI, Intel, Corsair...",
              className: "w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-amber-500 text-xs font-tech uppercase"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between border-b border-slate-800 pb-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "font-bold text-amber-400 flex items-center gap-1.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.DollarSign, { className: "w-4 h-4" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u062A\u0633\u0639\u064A\u0631 \u0627\u0644\u0645\u0646\u062A\u062C (\u062F\u0648\u0644\u0627\u0631 \u0648\u062F\u064A\u0646\u0627\u0631)" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "flex items-center gap-2 cursor-pointer text-[11px] text-slate-300", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                type: "checkbox",
                checked: autoCalculateIQD,
                onChange: (e) => setAutoCalculateIQD(e.target.checked),
                className: "rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-0"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
              "\u062D\u0633\u0627\u0628 \u0627\u0644\u062F\u064A\u0646\u0627\u0631 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0628\u0633\u0639\u0631 \u0627\u0644\u0635\u0631\u0641 (",
              exchangeRate,
              " \u062F.\u0639)"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "font-bold text-slate-300 block", children: "\u0627\u0644\u0633\u0639\u0631 \u0628\u0627\u0644\u062F\u0648\u0644\u0627\u0631 ($ USD) *" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                type: "number",
                min: "0",
                required: true,
                value: formData.priceUSD || 0,
                onChange: (e) => handleUSDPriceChange(Number(e.target.value)),
                className: "w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-amber-400 font-tech font-bold text-sm focus:outline-none focus:border-amber-500"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "font-bold text-slate-300 block", children: "\u0627\u0644\u0633\u0639\u0631 \u0628\u0627\u0644\u062F\u064A\u0646\u0627\u0631 \u0627\u0644\u0639\u0631\u0627\u0642\u064A (IQD) *" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                type: "number",
                min: "0",
                required: true,
                value: formData.priceIQD || 0,
                onChange: (e) => setFormData({ ...formData, priceIQD: Number(e.target.value) }),
                className: "w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-amber-400 font-tech font-bold text-sm focus:outline-none focus:border-amber-500"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "font-bold text-slate-300 block", children: "\u0631\u0627\u0628\u0637 \u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0646\u062A\u062C (Image URL) *" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex gap-3 items-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              type: "url",
              required: true,
              value: formData.image || "",
              onChange: (e) => setFormData({ ...formData, image: e.target.value }),
              placeholder: "https://...",
              className: "w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-amber-500 text-xs font-tech"
            }
          ),
          formData.image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "img",
            {
              src: formData.image,
              alt: "\u0645\u0639\u0627\u064A\u0646\u0629",
              className: "w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0 bg-slate-950"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "pt-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-[11px] text-slate-400 block mb-1.5", children: "\u0623\u0648 \u0627\u062E\u062A\u0631 \u0635\u0648\u0631\u0629 \u062C\u0627\u0647\u0632\u0629 \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062F\u0642\u0629 \u0628\u0646\u0642\u0631\u0629 \u0648\u0627\u062D\u062F\u0629:" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex gap-2 overflow-x-auto pb-1 no-scrollbar", children: PRESET_HARDWARE_IMAGES.map((img, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "button",
            {
              type: "button",
              onClick: () => setFormData({ ...formData, image: img.url }),
              className: "px-2.5 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-[10px] whitespace-nowrap transition-colors",
              children: [
                "\u{1F4F7} ",
                img.label
              ]
            },
            idx
          )) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "font-bold text-slate-300 block", children: "\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u062A\u0648\u0641\u0631\u0629 \u0628\u0627\u0644\u0645\u0639\u0631\u0636" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              type: "number",
              min: "0",
              value: formData.stockCount ?? 5,
              onChange: (e) => {
                const count = Number(e.target.value);
                setFormData({ ...formData, stockCount: count, inStock: count > 0 });
              },
              className: "w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-amber-500 text-xs font-tech font-bold"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "font-bold text-slate-300 block", children: "\u0645\u0624\u0634\u0631 \u0623\u062F\u0627\u0621 \u0627\u0644\u0623\u0644\u0639\u0627\u0628 (1-100)" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              type: "number",
              min: "1",
              max: "100",
              value: formData.gamingScore ?? 90,
              onChange: (e) => setFormData({ ...formData, gamingScore: Number(e.target.value) }),
              className: "w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-cyan-400 focus:outline-none focus:border-amber-500 text-xs font-tech font-bold"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "font-bold text-slate-300 block", children: "\u0645\u062F\u0629 \u0627\u0644\u0636\u0645\u0627\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              type: "text",
              value: formData.warranty || "",
              onChange: (e) => setFormData({ ...formData, warranty: e.target.value }),
              placeholder: "\u0636\u0645\u0627\u0646 \u0633\u0646\u0629 \u0648\u0627\u062D\u062F\u0629 \u0627\u0633\u062A\u0628\u062F\u0627\u0644",
              className: "w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-amber-500 text-xs"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "p-3.5 bg-slate-950/60 border border-slate-800 rounded-2xl flex flex-wrap gap-4 items-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              type: "checkbox",
              checked: Boolean(formData.inStock),
              onChange: (e) => setFormData({ ...formData, inStock: e.target.checked }),
              className: "rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-bold", children: "\u0645\u062A\u0648\u0641\u0631 \u062D\u0627\u0644\u064A\u0627\u064B \u0628\u0627\u0644\u0641\u0631\u0639" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              type: "checkbox",
              checked: Boolean(formData.isBestSeller),
              onChange: (e) => setFormData({ ...formData, isBestSeller: e.target.checked }),
              className: "rounded bg-slate-900 border-slate-700 text-orange-500 focus:ring-0"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-bold", children: "\u{1F525} \u0627\u0644\u0623\u0643\u062B\u0631 \u0645\u0628\u064A\u0639\u0627\u064B (Best Seller)" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              type: "checkbox",
              checked: Boolean(formData.isNewArrival),
              onChange: (e) => setFormData({ ...formData, isNewArrival: e.target.checked }),
              className: "rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-0"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-bold", children: "\u2728 \u0648\u0627\u0635\u0644 \u062D\u062F\u064A\u062B\u0627\u064B (New Arrival)" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              type: "checkbox",
              checked: Boolean(formData.featured),
              onChange: (e) => setFormData({ ...formData, featured: e.target.checked }),
              className: "rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-bold", children: "\u2B50 \u0645\u0646\u062A\u062C \u0645\u0645\u064A\u0632" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-bold text-slate-300 block", children: "\u0627\u0644\u0645\u0648\u0627\u0635\u0641\u0627\u062A \u0627\u0644\u062A\u0642\u0646\u064A\u0629 (Specs):" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              type: "text",
              value: specs.vram || "",
              onChange: (e) => setSpecs({ ...specs, vram: e.target.value }),
              placeholder: "\u0633\u0639\u0629 \u0627\u0644\u0630\u0627\u0643\u0631\u0629 (\u0645\u062B\u0627\u0644: 16GB GDDR6X)",
              className: "bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              type: "text",
              value: specs.socket || "",
              onChange: (e) => setSpecs({ ...specs, socket: e.target.value }),
              placeholder: "\u0627\u0644\u0645\u0642\u0628\u0633 (Socket: LGA1700 / AM5)",
              className: "bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              type: "text",
              value: specs.capacity || "",
              onChange: (e) => setSpecs({ ...specs, capacity: e.target.value }),
              placeholder: "\u0627\u0644\u0633\u0639\u0629 (Capacity: 2TB NVMe)",
              className: "bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "font-bold text-slate-300 block", children: "\u0648\u0635\u0641 \u0648\u0645\u0645\u064A\u0632\u0627\u062A \u0627\u0644\u0645\u0646\u062A\u062C" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "textarea",
          {
            rows: 3,
            value: formData.descriptionAr || "",
            onChange: (e) => setFormData({ ...formData, descriptionAr: e.target.value }),
            placeholder: "\u0627\u0643\u062A\u0628 \u0646\u0628\u0630\u0629 \u0639\u0646 \u0642\u0648\u0629 \u0627\u0644\u0642\u0637\u0639\u0629\u060C \u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621\u060C \u0648\u0646\u0638\u0627\u0645 \u0627\u0644\u062A\u0628\u0631\u064A\u062F...",
            className: "w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-amber-500 text-xs"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "pt-4 border-t border-slate-800 flex items-center justify-end gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors",
            children: "\u0625\u0644\u063A\u0627\u0621"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            type: "submit",
            className: "px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Save, { className: "w-4 h-4" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: editingProduct ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0646\u062A\u062C \u0641\u0648\u0631\u0627\u064B" })
            ]
          }
        )
      ] })
    ] })
  ] }) });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AdminProductModal
});
