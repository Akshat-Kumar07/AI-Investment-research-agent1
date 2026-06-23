"use client";

import { useState } from "react";

export default function Home() {
  const [company, setCompany] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeCompany = async () => {
    if (!company) return;

    setLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen text-white">
  
      <div className="max-w-7xl mx-auto px-6">
<nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md flex justify-between items-center py-6">
  <h1
  onClick={() =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
  className="text-2xl font-bold text-green-400 cursor-pointer"
>
  📈 InvestAI
</h1>

  <a
    href="#analyze"
    className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-xl font-semibold"
  >
    Analyze Now
  </a>
</nav>
  <div 
  id="analyze"
  className="flex gap-12 items-center min-h-[85vh]">

    {/* Left Side */}
    <div>

      <h1 className="text-6xl font-bold mt-6">
        AI Investment
        <br />
        Research Agent
      </h1>

      <p className="text-slate-400 mt-6 text-xl">
        Analyze stocks using AI, financial metrics,
        market news and investment insights.
      </p>

      {/* Search Bar Here */}
      
      <div className="flex gap-3 mt-8">


        <input
          type="text"
          placeholder="Enter company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-700 p-4 rounded-xl"
        />

        <button
          onClick={analyzeCompany}
          className="bg-green-500 hover:bg-green-600 px-8 rounded-xl font-semibold"
        >
          {loading ? (
  <div className="flex items-center gap-2">
    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
    Analyzing...
  </div>
) : (
  "Analyze"
)}
        </button>
      </div>

    </div>

    {/* Right Side */}
    <div>
      <img
        src="/hero.png"
        alt="Investment"
        className="w-full rounded-3xl"
      />
    </div>

  </div>

      

      {result && (

  <div className="max-w-7xl mx-auto mt-12 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

    <h2 className="text-2xl font-bold mb-4">
      {result.company} ({result.ticker})
    </h2>

    <p className="text-xl font-bold mb-2">
  Verdict:
  <span
    className={
      result.verdict === "INVEST"
      ? "bg-green-600 text-white px-2 py-1 rounded"
      : result.verdict === "SPECULATIVE_INVEST"
      ? "bg-yellow-500 text-black px-2 py-1 rounded"
      : result.verdict === "NEUTRAL"
      ? "bg-blue-600 text-white px-2 py-1 rounded"
      : "bg-red-600 text-white px-2 py-1 rounded"
    }
  >
    {" "}
    {result.verdict || "N/A"}
  </span>
</p>

    <div className="mt-4">

  <div className="flex justify-between">
    <span>Confidence</span>
    <span>{result.confidence}%</span>
  </div>

  <div className="w-full bg-slate-700 h-3 rounded-full mt-2">
    <div
      className="bg-green-500 h-3 rounded-full"
      style={{ width: `${result.confidence}%` }}
    />
  </div>

</div>

    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-6">
      <div className="bg-slate-800 rounded-2xl p-5 hover:bg-slate-700 transition-all hover:scale-105">
        <p className="text-sm">Current Price</p>
        <p className="font-bold">
          ${result.financials?.currentPrice}
        </p>
      </div>

      <div className="bg-slate-800 rounded-2xl p-5 hover:bg-slate-700 transition-all hover:scale-105">
        <p className="text-sm">Market Cap</p>
        <p className="font-bold">
          ${result.financials?.marketCap
 ? `$${(result.financials.marketCap / 1000000000).toFixed(0)}B`
 : "N/A"}
        </p>
      </div>

      <div className="bg-slate-800 rounded-2xl p-5 hover:bg-slate-700 transition-all hover:scale-105">
        <p className="text-sm">P/E Ratio</p>
        <p className="font-bold">
          {result.financials?.peRatio?.toFixed(2)}
        </p>
      </div>

      <div className="bg-slate-800 rounded-2xl p-5 hover:bg-slate-700 transition-all hover:scale-105">
        <p className="text-sm">52W High</p>
        <p className="font-bold">
          ${result.financials?.fiftyTwoWeekHigh}
        </p>
      </div>

      <div className="bg-slate-800 rounded-2xl p-5 hover:bg-slate-700 transition-all hover:scale-105">
        <p className="text-sm">52W Low</p>
        <p className="font-bold">
          ${result.financials?.fiftyTwoWeekLow}
        </p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6 mt-8">

  <div className="bg-green-500/10 border border-green-500/20 p-5 rounded-2xl">
    <h3 className="text-green-400 font-bold text-xl mb-3">
      Pros
    </h3>

    <ul className="space-y-2">
      {result.pros?.map((item, index) => (
        <li key={index}>✅ {item}</li>
      ))}
    </ul>
  </div>

  <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl">
    <h3 className="text-red-400 font-bold text-xl mb-3">
      Cons
    </h3>

    <ul className="space-y-2">
      {result.cons?.map((item, index) => (
        <li key={index}>❌ {item}</li>
      ))}
    </ul>
  </div>

</div>

   <div className="mt-8 bg-slate-800 rounded-2xl p-6">

  <h3 className="text-2xl font-bold mb-4">
    AI Investment Analysis
  </h3>

  <p className="text-slate-300 whitespace-pre-wrap leading-8">
    {result.analysis}
  </p>

</div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">

  {result.news?.slice(0,5).map((item,index) => (
    <a
      key={index}
      href={item.url}
      target="_blank"
      className="bg-slate-800 p-5 rounded-2xl hover:bg-slate-700 transition"
    >
      <h4 className="font-semibold">
        {item.title}
      </h4>

      <p className="text-green-400 mt-3">
        Read More →
      </p>
    </a>
  ))}

</div>

  </div>
      )}
      </div> {/* max-w-7xl mx-auto px-6 */}
    </main>
  );
}
