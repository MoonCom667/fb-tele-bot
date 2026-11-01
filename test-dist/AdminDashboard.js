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

// src/components/AdminDashboard.tsx
var AdminDashboard_exports = {};
__export(AdminDashboard_exports, {
  AdminDashboard: () => AdminDashboard
});
module.exports = __toCommonJS(AdminDashboard_exports);
var import_react = require("react");
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
var AdminDashboard = ({
  products = [],
  categories = [],
  onAddProduct = () => {
  },
  onEditProduct = () => {
  },
  onDeleteProduct = () => {
  },
  onDuplicateProduct = () => {
  },
  onQuickStockChange = () => {
  },
  storeInfo,
  onUpdateStoreInfo = () => {
  },
  onUpdateExchangeRate = () => {
  },
  homeSections = {
    showPromoBanner: true,
    showHeroBanner: true,
    showFlashSale: true,
    showRecommended: true,
    showNewArrivals: true,
    showBestSellers: true,
    showBuyTogetherBundles: true,
    showStoreVideo: true,
    showDeliveryMap: true,
    showCustomerStories: true,
    showSocialMediaFeed: true,
    showTestimonials: true,
    showTechBlog: true,
    showFAQ: true,
    promoBannerText: ""
  },
  onUpdateHomeSections = () => {
  },
  orders,
  recentOrders,
  onUpdateOrderStatus = () => {
  },
  onExitAdmin,
  onClose,
  onLogoutAdmin,
  onLogout,
  currency = "IQD"
}) => {
  const safeOrders = orders || recentOrders || [];
  const handleExitAdmin = onExitAdmin || onClose || (() => {
  });
  const handleLogoutAdmin = onLogoutAdmin || onLogout || (() => {
  });
  const [activeAdminTab, setActiveAdminTab] = (0, import_react.useState)("products");
  const [searchFilter, setSearchFilter] = (0, import_react.useState)("");
  const [categoryFilter, setCategoryFilter] = (0, import_react.useState)("all");
  const [tempRate, setTempRate] = (0, import_react.useState)(storeInfo.exchangeRate || 1520);
  const [autoRecalculate, setAutoRecalculate] = (0, import_react.useState)(true);
  const [rateSuccessMsg, setRateSuccessMsg] = (0, import_react.useState)(false);
  const [tempStoreInfo, setTempStoreInfo] = (0, import_react.useState)(storeInfo);
  const [storeSaveSuccess, setStoreSaveSuccess] = (0, import_react.useState)(false);
  const [tempHomeSections, setTempHomeSections] = (0, import_react.useState)(homeSections);
  const [homeSaveSuccess, setHomeSaveSuccess] = (0, import_react.useState)(false);
  const [newPin, setNewPin] = (0, import_react.useState)("");
  const [pinSuccessMsg, setPinSuccessMsg] = (0, import_react.useState)(false);
  const totalProducts = products.length;
  const inStockProducts = products.filter((p) => p.inStock).length;
  const outOfStockProducts = totalProducts - inStockProducts;
  const totalStoreValueUSD = products.reduce((acc, p) => acc + p.priceUSD * (p.stockCount || 0), 0);
  const filteredProducts = products.filter((p) => {
    if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.nameAr.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    }
    return true;
  });
  const handleApplyExchangeRate = (e) => {
    e.preventDefault();
    onUpdateExchangeRate(tempRate, autoRecalculate);
    setRateSuccessMsg(true);
    setTimeout(() => setRateSuccessMsg(false), 3e3);
  };
  const handleSaveStoreInfo = (e) => {
    e.preventDefault();
    onUpdateStoreInfo(tempStoreInfo);
    setStoreSaveSuccess(true);
    setTimeout(() => setStoreSaveSuccess(false), 3e3);
  };
  const handleSaveHomeSections = () => {
    onUpdateHomeSections(tempHomeSections);
    setHomeSaveSuccess(true);
    setTimeout(() => setHomeSaveSuccess(false), 3e3);
  };
  const handleUpdatePin = (e) => {
    e.preventDefault();
    if (newPin.trim().length >= 4) {
      localStorage.setItem("alqamar_admin_pin", newPin.trim());
      setPinSuccessMsg(true);
      setNewPin("");
      setTimeout(() => setPinSuccessMsg(false), 3e3);
    } else {
      alert("\u064A\u062C\u0628 \u0623\u0646 \u064A\u062A\u0643\u0648\u0646 \u0631\u0645\u0632 \u0627\u0644\u062F\u062E\u0648\u0644 \u0645\u0646 4 \u0623\u0631\u0642\u0627\u0645 \u0623\u0648 \u0623\u062D\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644");
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "min-h-screen bg-slate-950 text-slate-100 text-right selection:bg-amber-500 selection:text-slate-950 pb-20", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { className: "sticky top-0 z-40 bg-slate-900/95 border-b border-slate-800 backdrop-blur-xl px-4 sm:px-6 py-3.5 shadow-2xl", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/20", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ShieldCheck, { className: "w-6 h-6" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "text-base sm:text-lg font-black text-white", children: "\u0644\u0648\u062D\u0629 \u062A\u062D\u0643\u0645 \u0627\u0644\u0645\u062F\u064A\u0631 (Master Admin)" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30", children: "\u062C\u0644\u0633\u0629 \u0622\u0645\u0646\u0629 \u0646\u0634\u0637\u0629 \u{1F512}" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-[11px] text-slate-400", children: [
            "\u0645\u0643\u062A\u0628 \u0627\u0644\u0642\u0645\u0631 \u0644\u0644\u062D\u0627\u0633\u0628\u0627\u062A \u2022 \u0633\u0639\u0631 \u0627\u0644\u0635\u0631\u0641 \u0627\u0644\u0645\u0639\u062A\u0645\u062F: ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "text-amber-400 font-tech font-bold", children: [
              storeInfo.exchangeRate,
              " \u062F.\u0639"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            onClick: handleExitAdmin,
            className: "px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-700",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Eye, { className: "w-3.5 h-3.5 text-amber-400" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0645\u062A\u062C\u0631 \u0643\u0632\u0628\u0648\u0646" })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            onClick: handleLogoutAdmin,
            title: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C \u0645\u0646 \u0644\u0648\u062D\u0629 \u0627\u0644\u0625\u062F\u0627\u0631\u0629",
            className: "p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.LogOut, { className: "w-4 h-4" })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-1 shadow-lg", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between text-slate-400 text-xs", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Package, { className: "w-4 h-4 text-amber-400" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-xl sm:text-2xl font-black text-white font-tech", children: [
            totalProducts,
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-xs text-slate-400 font-normal", children: "\u0642\u0637\u0639\u0629" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-[11px] text-emerald-400", children: [
            inStockProducts,
            " \u0645\u062A\u0648\u0641\u0631 \u0628\u0627\u0644\u0645\u0639\u0631\u0636"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-1 shadow-lg", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between text-slate-400 text-xs", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u0633\u0639\u0631 \u0635\u0631\u0641 \u0627\u0644\u062F\u0648\u0644\u0627\u0631" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.DollarSign, { className: "w-4 h-4 text-cyan-400" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-xl sm:text-2xl font-black text-cyan-400 font-tech", children: [
            storeInfo.exchangeRate,
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-xs text-slate-400 font-normal", children: "\u062F.\u0639" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-[11px] text-slate-400", children: [
            "$100 = ",
            (storeInfo.exchangeRate * 100).toLocaleString(),
            " \u062F.\u0639"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-1 shadow-lg", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between text-slate-400 text-xs", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u0627\u0644\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0648\u0627\u0631\u062F\u0629" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ShoppingBag, { className: "w-4 h-4 text-purple-400" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-xl sm:text-2xl font-black text-white font-tech", children: [
            safeOrders.length,
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-xs text-slate-400 font-normal", children: "\u0637\u0644\u0628" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-[11px] text-purple-400", children: [
            safeOrders.filter((o) => o.status === "pending").length,
            " \u0637\u0644\u0628 \u0645\u0639\u0644\u0642 \u0644\u0644\u062A\u062C\u0647\u064A\u0632"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-1 shadow-lg", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between text-slate-400 text-xs", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0627\u0644\u0645\u0642\u062F\u0631\u0629" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.TrendingUp, { className: "w-4 h-4 text-emerald-400" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-xl sm:text-2xl font-black text-emerald-400 font-tech", children: [
            "$",
            totalStoreValueUSD.toLocaleString()
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-[11px] text-slate-400", children: [
            "\u2248 ",
            (totalStoreValueUSD * storeInfo.exchangeRate / 1e6).toFixed(1),
            " \u0645\u0644\u064A\u0648\u0646 \u062F.\u0639"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-slate-800", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            onClick: () => setActiveAdminTab("products"),
            className: `flex items-center gap-2 px-4 py-3 rounded-t-2xl font-bold text-xs whitespace-nowrap transition-all border-b-2 ${activeAdminTab === "products" ? "bg-slate-900 text-amber-400 border-amber-500 shadow-md" : "text-slate-400 hover:text-slate-200 border-transparent"}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Package, { className: "w-4 h-4" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
                "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0648\u0627\u0644\u0642\u0637\u0639 (",
                totalProducts,
                ")"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            onClick: () => setActiveAdminTab("exchange"),
            className: `flex items-center gap-2 px-4 py-3 rounded-t-2xl font-bold text-xs whitespace-nowrap transition-all border-b-2 ${activeAdminTab === "exchange" ? "bg-slate-900 text-amber-400 border-amber-500 shadow-md" : "text-slate-400 hover:text-slate-200 border-transparent"}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.DollarSign, { className: "w-4 h-4" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u0633\u0639\u0631 \u0627\u0644\u0635\u0631\u0641 \u0648\u0627\u0644\u0639\u0645\u0644\u0629 \u{1F4B1}" })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            onClick: () => setActiveAdminTab("homepage"),
            className: `flex items-center gap-2 px-4 py-3 rounded-t-2xl font-bold text-xs whitespace-nowrap transition-all border-b-2 ${activeAdminTab === "homepage" ? "bg-slate-900 text-amber-400 border-amber-500 shadow-md" : "text-slate-400 hover:text-slate-200 border-transparent"}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Layout, { className: "w-4 h-4" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u062A\u062E\u0635\u064A\u0635 \u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 \u{1F3A8}" })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            onClick: () => setActiveAdminTab("orders"),
            className: `flex items-center gap-2 px-4 py-3 rounded-t-2xl font-bold text-xs whitespace-nowrap transition-all border-b-2 ${activeAdminTab === "orders" ? "bg-slate-900 text-amber-400 border-amber-500 shadow-md" : "text-slate-400 hover:text-slate-200 border-transparent"}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ShoppingBag, { className: "w-4 h-4" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
                "\u0627\u0644\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0648\u0627\u0631\u062F\u0629 (",
                safeOrders.length,
                ")"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            onClick: () => setActiveAdminTab("settings"),
            className: `flex items-center gap-2 px-4 py-3 rounded-t-2xl font-bold text-xs whitespace-nowrap transition-all border-b-2 ${activeAdminTab === "settings" ? "bg-slate-900 text-amber-400 border-amber-500 shadow-md" : "text-slate-400 hover:text-slate-200 border-transparent"}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Settings, { className: "w-4 h-4" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u0639\u0631\u0636 \u0648\u0627\u0644\u0623\u0645\u0627\u0646 \u2699\uFE0F" })
            ]
          }
        )
      ] }),
      activeAdminTab === "products" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-lg", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-1 items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  type: "text",
                  value: searchFilter,
                  onChange: (e) => setSearchFilter(e.target.value),
                  placeholder: "\u0627\u0628\u062D\u062B \u0639\u0646 \u0642\u0637\u0639\u0629\u060C \u0645\u0648\u062F\u064A\u0644\u060C \u0628\u0631\u0627\u0646\u062F (RTX, Ryzen, ASUS)...",
                  className: "w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Search, { className: "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "select",
              {
                value: categoryFilter,
                onChange: (e) => setCategoryFilter(e.target.value),
                className: "bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none cursor-pointer",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "all", children: "\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0642\u0633\u0627\u0645" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "gpus", children: "\u0643\u0631\u0648\u062A \u0627\u0644\u0634\u0627\u0634\u0629" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "cpus", children: "\u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0627\u062A" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "motherboards", children: "\u0627\u0644\u0644\u0648\u062D\u0627\u062A \u0627\u0644\u0623\u0645" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "ram", children: "\u0627\u0644\u0631\u0627\u0645\u0627\u062A" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "storage", children: "\u0627\u0644\u0647\u0627\u0631\u062F\u0627\u062A" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "power_supplies", children: "\u0645\u0632\u0648\u062F\u0627\u062A \u0627\u0644\u0637\u0627\u0642\u0629" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "cooling", children: "\u0627\u0644\u062A\u0628\u0631\u064A\u062F" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "cases", children: "\u0627\u0644\u0643\u064A\u0633\u0627\u062A" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "laptops", children: "\u0627\u0644\u0644\u0627\u0628\u062A\u0648\u0628\u0627\u062A" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "monitors", children: "\u0627\u0644\u0634\u0627\u0634\u0627\u062A" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "accessories", children: "\u0627\u0644\u0645\u0644\u062D\u0642\u0627\u062A" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "prebuilt_pcs", children: "\u062A\u062C\u0645\u064A\u0639\u0627\u062A \u062C\u0627\u0647\u0632\u0629" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "button",
            {
              onClick: onAddProduct,
              className: "px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5 shrink-0",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Plus, { className: "w-4 h-4" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u0625\u0636\u0627\u0641\u0629 \u0645\u0646\u062A\u062C \u062C\u062F\u064A\u062F \u0644\u0644\u0643\u062A\u0627\u0644\u0648\u062C" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "w-full text-right text-xs", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { className: "bg-slate-950/80 text-slate-400 border-b border-slate-800", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "p-3.5", children: "\u0627\u0644\u0645\u0646\u062A\u062C \u0648\u0627\u0644\u0627\u0633\u0645" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "p-3.5", children: "\u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0648\u0627\u0644\u0634\u0631\u0643\u0629" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "p-3.5", children: "\u0627\u0644\u0633\u0639\u0631 \u0628\u0627\u0644\u062F\u0648\u0644\u0627\u0631 ($)" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "p-3.5", children: "\u0627\u0644\u0633\u0639\u0631 \u0628\u0627\u0644\u062F\u064A\u0646\u0627\u0631 (\u062F.\u0639)" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "p-3.5", children: "\u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0627\u0644\u0633\u0631\u064A\u0639" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "p-3.5", children: "\u0627\u0644\u0634\u0627\u0631\u0627\u062A" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "p-3.5 text-center", children: "\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0625\u062F\u0627\u0631\u0629" })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { className: "divide-y divide-slate-800/60", children: filteredProducts.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { className: "hover:bg-slate-800/40 transition-colors", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "p-3.5", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "img",
                {
                  src: product.image,
                  alt: product.nameAr,
                  className: "w-12 h-12 rounded-xl object-cover border border-slate-800 shrink-0 bg-slate-950"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { className: "font-bold text-white line-clamp-1", children: product.nameAr }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-[10px] text-slate-400 font-tech block line-clamp-1", children: product.name })
              ] })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { className: "p-3.5", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded text-[10px] border border-amber-500/20 uppercase font-tech", children: product.brand }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-slate-400 block text-[11px] mt-0.5", children: product.category })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { className: "p-3.5 font-black text-white font-tech", children: [
              "$",
              product.priceUSD.toLocaleString()
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { className: "p-3.5 font-black text-amber-400 font-tech", children: [
              product.priceIQD.toLocaleString(),
              " \u062F.\u0639"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "p-3.5", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  onClick: () => onQuickStockChange(product.id, -1),
                  title: "\u0625\u0646\u0642\u0627\u0635 \u0642\u0637\u0639\u0629 \u0648\u0627\u062D\u062F\u0629",
                  className: "w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold flex items-center justify-center text-xs",
                  children: "-"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `font-tech font-bold px-2 py-0.5 rounded text-xs ${product.stockCount > 0 ? "bg-slate-950 text-emerald-400 border border-emerald-500/30" : "bg-rose-950 text-rose-400"}`, children: product.stockCount }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  onClick: () => onQuickStockChange(product.id, 1),
                  title: "\u0632\u064A\u0627\u062F\u0629 \u0642\u0637\u0639\u0629 \u0648\u0627\u062D\u062F\u0629",
                  className: "w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold flex items-center justify-center text-xs",
                  children: "+"
                }
              )
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "p-3.5", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-wrap gap-1", children: [
              product.isBestSeller && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-[9px] bg-orange-500/20 text-orange-400 px-1.5 py-0.2 rounded font-bold", children: "\u{1F525} \u0645\u0628\u064A\u0639\u0627\u062A" }),
              product.isNewArrival && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.2 rounded font-bold", children: "\u2728 \u062C\u062F\u064A\u062F" }),
              product.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-[9px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.2 rounded font-bold", children: "\u2B50 \u0645\u0645\u064A\u0632" })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "p-3.5", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-center gap-1.5", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  onClick: () => onEditProduct(product),
                  title: "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0646\u062A\u062C",
                  className: "p-1.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 rounded-lg transition-colors",
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Edit3, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  onClick: () => onDuplicateProduct(product),
                  title: "\u062A\u0643\u0631\u0627\u0631 / \u0646\u0633\u062E \u0647\u0630\u0627 \u0627\u0644\u0645\u0646\u062A\u062C",
                  className: "p-1.5 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 rounded-lg transition-colors",
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Copy, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  onClick: () => {
                    if (confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0631\u063A\u0628\u062A\u0643 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0645\u0646\u062A\u062C "${product.nameAr}"\u061F`)) {
                      onDeleteProduct(product.id);
                    }
                  },
                  title: "\u062D\u0630\u0641 \u0627\u0644\u0645\u0646\u062A\u062C \u0646\u0647\u0627\u0626\u064A\u0627\u064B",
                  className: "p-1.5 bg-slate-800 hover:bg-rose-500 hover:text-white text-rose-400 rounded-lg transition-colors",
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Trash2, { className: "w-3.5 h-3.5" })
                }
              )
            ] }) })
          ] }, product.id)) })
        ] }) }) })
      ] }),
      activeAdminTab === "exchange" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-3 pb-4 border-b border-slate-800", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.DollarSign, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "text-lg font-black text-white", children: "\u0625\u062F\u0627\u0631\u0629 \u0633\u0639\u0631 \u0627\u0644\u0635\u0631\u0641 \u0648\u0627\u0644\u0639\u0645\u0644\u0627\u062A (Currency Master)" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xs text-slate-400", children: "\u062A\u062D\u062F\u064A\u062B \u0633\u0639\u0631 \u0635\u0631\u0641 \u0627\u0644\u062F\u0648\u0644\u0627\u0631 \u0627\u0644\u0623\u0645\u0631\u064A\u0643\u064A \u0645\u0642\u0627\u0628\u0644 \u0627\u0644\u062F\u064A\u0646\u0627\u0631 \u0627\u0644\u0639\u0631\u0627\u0642\u064A \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0641\u0648\u0631\u064A\u0627\u064B." })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { onSubmit: handleApplyExchangeRate, className: "space-y-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "text-xs font-bold text-slate-300 block", children: "\u0633\u0639\u0631 \u0635\u0631\u0641 \u0627\u0644\u0640 100 \u062F\u0648\u0644\u0627\u0631 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 (IQD):" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  type: "number",
                  min: "1000",
                  max: "3000",
                  value: tempRate,
                  onChange: (e) => setTempRate(Number(e.target.value)),
                  className: "flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-xl font-black text-amber-400 font-tech focus:outline-none focus:border-amber-500"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-sm font-bold text-slate-400", children: "\u062F.\u0639 \u0644\u0643\u0644 \u062F\u0648\u0644\u0627\u0631" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-wrap gap-2 pt-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-xs text-slate-400 block w-full", children: "\u0623\u0633\u0639\u0627\u0631 \u0633\u0631\u064A\u0639\u0629 \u0634\u0627\u0626\u0639\u0629 \u0628\u0633\u0648\u0642 \u0628\u063A\u062F\u0627\u062F \u0648\u0634\u0627\u0631\u0639 \u0627\u0644\u0635\u0646\u0627\u0639\u0629:" }),
              [1500, 1510, 1520, 1525, 1530, 1540, 1550].map((rate) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "button",
                {
                  type: "button",
                  onClick: () => setTempRate(rate),
                  className: `px-3 py-1.5 rounded-xl text-xs font-tech font-bold transition-all ${tempRate === rate ? "bg-amber-500 text-slate-950 font-black shadow-md" : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700"}`,
                  children: [
                    rate,
                    " \u062F.\u0639 ($",
                    100,
                    " = ",
                    (rate * 100).toLocaleString(),
                    ")"
                  ]
                },
                rate
              ))
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "flex items-center gap-3 cursor-pointer", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                type: "checkbox",
                checked: autoRecalculate,
                onChange: (e) => setAutoRecalculate(e.target.checked),
                className: "w-5 h-5 rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-0 cursor-pointer"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-xs", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-bold text-white block", children: "\u0625\u0639\u0627\u062F\u0629 \u062D\u0633\u0627\u0628 \u0648\u062A\u062D\u062F\u064A\u062B \u062C\u0645\u064A\u0639 \u0623\u0633\u0639\u0627\u0631 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0628\u0627\u0644\u062F\u064A\u0646\u0627\u0631 \u0641\u0648\u0631\u0627\u064B" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "text-slate-400 text-[11px]", children: [
                "\u0633\u064A\u062A\u0645 \u0636\u0631\u0628 \u0627\u0644\u0633\u0639\u0631 \u0628\u0627\u0644\u062F\u0648\u0644\u0627\u0631 \u0644\u0643\u0644 \u0642\u0637\u0639\u0629 \u0641\u064A \u0627\u0644\u0643\u062A\u0627\u0644\u0648\u062C \u0628\u0633\u0639\u0631 \u0627\u0644\u0635\u0631\u0641 \u0627\u0644\u062C\u062F\u064A\u062F (",
                tempRate,
                " \u062F.\u0639)."
              ] })
            ] })
          ] }) }),
          rateSuccessMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in duration-200", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Check, { className: "w-4 h-4" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
              "\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0633\u0639\u0631 \u0627\u0644\u0635\u0631\u0641 \u0627\u0644\u062C\u062F\u064A\u062F (",
              tempRate,
              " \u062F.\u0639) \u0648\u062A\u062D\u062F\u064A\u062B \u062C\u0645\u064A\u0639 \u0623\u0633\u0639\u0627\u0631 \u0627\u0644\u0645\u0639\u0631\u0636 \u0628\u0646\u062C\u0627\u062D!"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "button",
            {
              type: "submit",
              className: "w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-amber-500/20 active:scale-98 transition-all flex items-center justify-center gap-2",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Save, { className: "w-4 h-4" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u062A\u0637\u0628\u064A\u0642 \u0648\u062D\u0641\u0638 \u0633\u0639\u0631 \u0627\u0644\u0635\u0631\u0641 \u0644\u0644\u0645\u062A\u062C\u0631" })
              ]
            }
          )
        ] })
      ] }),
      activeAdminTab === "homepage" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between pb-4 border-b border-slate-800", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Layout, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "text-lg font-black text-white", children: "\u062A\u0639\u062F\u064A\u0644 \u0623\u0642\u0633\u0627\u0645 \u0648\u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xs text-slate-400", children: "\u064A\u0645\u0643\u0646\u0643 \u0625\u0638\u0647\u0627\u0631 \u0623\u0648 \u0625\u062E\u0641\u0627\u0621 \u0623\u064A \u0642\u0633\u0645 \u0641\u064A \u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 \u0648\u062A\u0639\u062F\u064A\u0644 \u0646\u0635\u0648\u0635 \u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0631\u0648\u064A\u062C\u064A\u0629." })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "button",
            {
              onClick: handleSaveHomeSections,
              className: "px-4 py-2.5 bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Save, { className: "w-4 h-4" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "font-bold text-xs text-amber-400 block", children: "\u0646\u0635 \u0634\u0631\u064A\u0637 \u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0631\u0648\u064A\u062C\u064A \u0627\u0644\u0639\u0644\u0648\u064A (Announcement Bar):" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              type: "text",
              value: tempHomeSections.promoBannerText,
              onChange: (e) => setTempHomeSections({ ...tempHomeSections, promoBannerText: e.target.value }),
              placeholder: "\u0627\u0643\u062A\u0628 \u0627\u0644\u0639\u0631\u0636 \u0623\u0648 \u0627\u0644\u0625\u0639\u0644\u0627\u0646 \u0647\u0646\u0627...",
              className: "w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3.5", children: [
          { key: "showPromoBanner", label: "\u{1F4E2} \u0634\u0631\u064A\u0637 \u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0631\u0648\u064A\u062C\u064A \u0627\u0644\u0639\u0644\u0648\u064A" },
          { key: "showHeroBanner", label: "\u{1F31F} \u0627\u0644\u0628\u0646\u0631 \u0627\u0644\u0631\u0626\u064A\u0633\u064A (Hero Showcase & Slider)" },
          { key: "showFlashSale", label: "\u26A1 \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u062E\u0641\u064A\u0636\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0639\u0629 (Flash Sale)" },
          { key: "showBestSellers", label: "\u{1F3C6} \u0642\u0633\u0645 \u0627\u0644\u0623\u0643\u062B\u0631 \u0645\u0628\u064A\u0639\u0627\u064B (Best Sellers)" },
          { key: "showNewArrivals", label: "\u2728 \u0642\u0633\u0645 \u0627\u0644\u0648\u0627\u0635\u0644 \u062D\u062F\u064A\u062B\u0627\u064B (New Arrivals Carousel)" },
          { key: "showBuyTogetherBundles", label: "\u{1F9E9} \u0628\u0627\u0642\u0627\u062A \u0648\u0641\u0631 \u0623\u0643\u062B\u0631 \u0645\u0639\u0627\u064B (Hardware Bundles)" },
          { key: "showRecommended", label: "\u{1F916} \u0642\u0633\u0645 \u0627\u0644\u062A\u0648\u0635\u064A\u0627\u062A \u0627\u0644\u0630\u0643\u064A\u0629 (AI Recommendations)" },
          { key: "showDeliveryMap", label: "\u{1F5FA}\uFE0F \u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0634\u062D\u0646 \u0648\u0627\u0644\u062A\u0648\u0635\u064A\u0644 \u0644\u0644\u0645\u062D\u0627\u0641\u0638\u0627\u062A" },
          { key: "showCustomerStories", label: "\u2B50 \u062A\u062C\u0627\u0631\u0628 \u0648\u0642\u0635\u0635 \u0632\u0628\u0627\u0626\u0646 \u0627\u0644\u0645\u0639\u0631\u0636 \u0627\u0644\u0645\u0635\u0648\u0631\u0629" },
          { key: "showTestimonials", label: "\u{1F4AC} \u0622\u0631\u0627\u0621 \u0648\u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0632\u0628\u0627\u0626\u0646 \u0634\u0627\u0631\u0639 \u0627\u0644\u0635\u0646\u0627\u0639\u0629" },
          { key: "showStoreVideo", label: "\u{1F3AC} \u0641\u064A\u062F\u064A\u0648 \u062C\u0648\u0644\u0629 \u0627\u0644\u0645\u0639\u0631\u0636 \u0648\u0648\u0631\u0634\u0629 \u0627\u0644\u062A\u062C\u0645\u064A\u0639" },
          { key: "showSocialMediaFeed", label: "\u{1F4F1} \u0645\u0646\u0634\u0648\u0631\u0627\u062A \u0627\u0644\u0633\u0648\u0634\u064A\u0627\u0644 \u0645\u064A\u062F\u064A\u0627 \u0627\u0644\u062D\u064A\u0629" },
          { key: "showTechBlog", label: "\u{1F4F0} \u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062A \u0648\u0627\u0644\u062F\u0644\u064A\u0644 \u0627\u0644\u062A\u0642\u0646\u064A (Tech Blog)" },
          { key: "showFAQ", label: "\u2753 \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0648\u0627\u0644\u0636\u0645\u0627\u0646 (FAQ)" }
        ].map((sec) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            className: "flex items-center justify-between p-3.5 bg-slate-950/70 border border-slate-800/80 rounded-2xl hover:border-slate-700 transition-colors",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-xs font-bold text-slate-200", children: sec.label }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "relative inline-flex items-center cursor-pointer", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "input",
                  {
                    type: "checkbox",
                    checked: Boolean(tempHomeSections[sec.key]),
                    onChange: (e) => setTempHomeSections({
                      ...tempHomeSections,
                      [sec.key]: e.target.checked
                    }),
                    className: "sr-only peer"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500" })
              ] })
            ]
          },
          sec.key
        )) }),
        homeSaveSuccess && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Check, { className: "w-4 h-4" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0648\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 \u0628\u0646\u062C\u0627\u062D!" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            onClick: handleSaveHomeSections,
            className: "w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Save, { className: "w-4 h-4" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0639\u0644\u0649 \u0627\u0644\u0645\u062A\u062C\u0631 \u0641\u0648\u0631\u0627\u064B" })
            ]
          }
        )
      ] }),
      activeAdminTab === "orders" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-2xl", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "text-base font-black text-white", children: "\u0625\u062F\u0627\u0631\u0629 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0634\u0631\u0627\u0621 \u0627\u0644\u0648\u0627\u0631\u062F\u0629" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xs text-slate-400", children: "\u0645\u062A\u0627\u0628\u0639\u0629 \u0648\u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0634\u062D\u0646 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0632\u0628\u0627\u0626\u0646 \u0645\u0628\u0627\u0634\u0631\u0629." })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20 font-tech", children: [
            safeOrders.length,
            " \u0637\u0644\u0628\u0627\u062A \u0645\u0633\u062C\u0644\u0629"
          ] })
        ] }),
        safeOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ShoppingBag, { className: "w-12 h-12 text-slate-600 mx-auto" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-sm font-bold text-slate-200", children: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u062C\u062F\u064A\u062F\u0629 \u062D\u0627\u0644\u064A\u0627\u064B" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xs text-slate-500 max-w-sm mx-auto", children: "\u0639\u0646\u062F \u0642\u064A\u0627\u0645 \u0627\u0644\u0632\u0628\u0627\u0626\u0646 \u0628\u0625\u062A\u0645\u0627\u0645 \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u0634\u0631\u0627\u0621 \u0645\u0646 \u0627\u0644\u0633\u0644\u0629\u060C \u0633\u062A\u0638\u0647\u0631 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062A \u0647\u0646\u0627 \u0645\u0628\u0627\u0634\u0631\u0629." })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "space-y-3", children: safeOrders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-sm font-black text-white font-tech", children: order.id }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-[10px] text-slate-400 font-tech", children: new Date(order.createdAt).toLocaleString("ar-IQ") })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-xs text-slate-300 mt-1", children: [
                "\u0627\u0644\u0632\u0628\u0648\u0646: ",
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { className: "text-amber-400", children: order.customer.fullName }),
                " \u2022 \u0647\u0627\u062A\u0641: ",
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-tech text-slate-200", children: order.customer.phoneNumber }),
                " \u2022 ",
                order.customer.province,
                " (",
                order.customer.cityOrArea,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "select",
                {
                  value: order.status,
                  onChange: (e) => onUpdateOrderStatus(order.id, e.target.value),
                  className: "bg-slate-950 border border-slate-700 text-xs text-amber-400 font-bold rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "pending", children: "\u23F3 \u0645\u0639\u0644\u0642 \u0644\u0644\u062A\u062C\u0647\u064A\u0632" }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "processing", children: "\u2699\uFE0F \u0642\u064A\u062F \u0627\u0644\u0641\u062D\u0635 \u0648\u0627\u0644\u062A\u0631\u0643\u064A\u0628" }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "shipped", children: "\u{1F69A} \u062A\u0645 \u0627\u0644\u0634\u062D\u0646 \u0644\u0644\u0645\u062D\u0627\u0641\u0638\u0629" }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "completed", children: "\u2705 \u062A\u0645 \u0627\u0644\u062A\u0633\u0644\u064A\u0645 \u0628\u0646\u062C\u0627\u062D" }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "cancelled", children: "\u274C \u0645\u0644\u063A\u064A" })
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "a",
                {
                  href: `https://wa.me/${order.customer.phoneNumber.replace(/[^0-9]/g, "")}`,
                  target: "_blank",
                  rel: "noreferrer",
                  className: "px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.MessageCircle, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u0648\u0627\u062A\u0633\u0627\u0628" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-slate-950/80 rounded-xl p-3 divide-y divide-slate-800/60 text-xs", children: [
            order.items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "py-1.5 flex items-center justify-between text-slate-300", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
                item.name,
                " \xD7 ",
                item.quantity
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-tech font-bold text-amber-400", children: order.currency === "IQD" ? `${item.priceIQD.toLocaleString()} \u062F.\u0639` : `$${item.priceUSD}` })
            ] }, idx)),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "pt-2 flex items-center justify-between font-black text-white text-xs", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0637\u0644\u0628:" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-amber-400 font-tech text-sm", children: order.currency === "IQD" ? `${order.totalIQD.toLocaleString()} \u062F.\u0639` : `$${order.totalUSD}` })
            ] })
          ] })
        ] }, order.id)) })
      ] }),
      activeAdminTab === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { className: "text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Settings, { className: "w-4 h-4 text-amber-400" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0639\u0631\u0636 \u0648\u0627\u0644\u0627\u062A\u0635\u0627\u0644" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { onSubmit: handleSaveStoreInfo, className: "space-y-4 text-xs", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "font-bold text-slate-300 block", children: "\u0627\u0633\u0645 \u0627\u0644\u0645\u0639\u0631\u0636 \u0628\u0627\u0644\u0639\u0631\u0628\u064A\u0629:" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  type: "text",
                  value: tempStoreInfo.name,
                  onChange: (e) => setTempStoreInfo({ ...tempStoreInfo, name: e.target.value }),
                  className: "w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "font-bold text-slate-300 block", children: "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641 \u0627\u0644\u0631\u0633\u0645\u064A:" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  type: "text",
                  value: tempStoreInfo.phone,
                  onChange: (e) => setTempStoreInfo({ ...tempStoreInfo, phone: e.target.value }),
                  className: "w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 font-tech"
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "font-bold text-slate-300 block", children: "\u0631\u0642\u0645 \u0627\u0644\u0648\u0627\u062A\u0633\u0627\u0628 \u0644\u0644\u0637\u0644\u0628\u0627\u062A:" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  type: "text",
                  value: tempStoreInfo.whatsapp,
                  onChange: (e) => setTempStoreInfo({ ...tempStoreInfo, whatsapp: e.target.value }),
                  className: "w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 font-tech"
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "font-bold text-slate-300 block", children: "\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A:" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  type: "text",
                  value: tempStoreInfo.addressDetails,
                  onChange: (e) => setTempStoreInfo({ ...tempStoreInfo, addressDetails: e.target.value }),
                  className: "w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "font-bold text-slate-300 block", children: "\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644:" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  type: "text",
                  value: tempStoreInfo.workingHours,
                  onChange: (e) => setTempStoreInfo({ ...tempStoreInfo, workingHours: e.target.value }),
                  className: "w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                }
              )
            ] }),
            storeSaveSuccess && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs", children: "\u062A\u0645 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0639\u0631\u0636 \u0628\u0646\u062C\u0627\u062D!" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "submit",
                className: "w-full py-3 bg-amber-500 text-slate-950 font-black rounded-xl text-xs shadow-md",
                children: "\u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062A\u062C\u0631"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { className: "text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Lock, { className: "w-4 h-4 text-cyan-400" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u0623\u0645\u0627\u0646 \u0648\u0631\u0645\u0632 \u062F\u062E\u0648\u0644 \u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u062F\u064A\u0631" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xs text-slate-400 leading-relaxed", children: "\u064A\u0645\u0643\u0646\u0643 \u062A\u063A\u064A\u064A\u0631 \u0631\u0645\u0632 \u0627\u0644\u0623\u0645\u0627\u0646 (PIN) \u0627\u0644\u062E\u0627\u0635 \u0628\u062F\u062E\u0648\u0644 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0644\u0645\u0646\u0639 \u0623\u064A \u0634\u062E\u0635 \u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0647 \u0645\u0646 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0623\u0648 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A." }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { onSubmit: handleUpdatePin, className: "space-y-4 text-xs", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "font-bold text-slate-300 block", children: "\u0631\u0645\u0632 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u062C\u062F\u064A\u062F (New PIN / Password):" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  type: "text",
                  required: true,
                  value: newPin,
                  onChange: (e) => setNewPin(e.target.value),
                  placeholder: "\u0645\u062B\u0627\u0644: 9988 \u0623\u0648 pass123",
                  className: "w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 font-tech"
                }
              )
            ] }),
            pinSuccessMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs", children: "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0631\u0645\u0632 \u0645\u0631\u0648\u0631 \u0627\u0644\u0645\u062F\u064A\u0631 \u0628\u0646\u062C\u0627\u062D!" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "submit",
                className: "w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs shadow-md transition-all",
                children: "\u062A\u062D\u062F\u064A\u062B \u0631\u0645\u0632 \u0627\u0644\u0645\u0631\u0648\u0631"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "pt-6 border-t border-slate-800 space-y-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-xs font-bold text-rose-400 block", children: "\u0625\u0639\u0627\u062F\u0629 \u0636\u0628\u0637 \u0627\u0644\u0645\u0635\u0646\u0639 \u0644\u0644\u0643\u062A\u0627\u0644\u0648\u062C:" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-[11px] text-slate-500", children: "\u0625\u0630\u0627 \u0623\u0631\u062F\u062A \u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0648\u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0627\u0644\u0623\u0635\u0644\u064A\u0629 \u0641\u064A \u0623\u064A \u0648\u0642\u062A." }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "button",
              {
                onClick: () => {
                  if (confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0631\u063A\u0628\u062A\u0643 \u0641\u064A \u0645\u0633\u062D \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0648\u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0627\u0644\u0643\u062A\u0627\u0644\u0648\u062C \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u061F")) {
                    localStorage.removeItem("alqamar_admin_products");
                    localStorage.removeItem("alqamar_admin_store");
                    localStorage.removeItem("alqamar_admin_home_sections");
                    window.location.reload();
                  }
                },
                className: "px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.RotateCcw, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0627\u0644\u0643\u062A\u0627\u0644\u0648\u062C \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A" })
                ]
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AdminDashboard
});
