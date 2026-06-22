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
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">
        AI Investment Research Agent
      </h1>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="border p-3 rounded w-80"
        />

        <button
          onClick={analyzeCompany}
          className="bg-black text-white px-5 py-3 rounded"
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

      {result && (

  <div className="border rounded p-6">

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

    <p className="mb-4">
      <strong>Confidence:</strong> {result.confidence}%
    </p>

    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-6">
      <div className="border p-3 rounded">
        <p className="text-sm">Current Price</p>
        <p className="font-bold">
          ${result.financials?.currentPrice}
        </p>
      </div>

      <div className="border p-3 rounded">
        <p className="text-sm">Market Cap</p>
        <p className="font-bold">
          ${(result.financials?.marketCap / 1000000000).toFixed(0)}B
        </p>
      </div>

      <div className="border p-3 rounded">
        <p className="text-sm">P/E Ratio</p>
        <p className="font-bold">
          {result.financials?.peRatio?.toFixed(2)}
        </p>
      </div>

      <div className="border p-3 rounded">
        <p className="text-sm">52W High</p>
        <p className="font-bold">
          ${result.financials?.fiftyTwoWeekHigh}
        </p>
      </div>

      <div className="border p-3 rounded">
        <p className="text-sm">52W Low</p>
        <p className="font-bold">
          ${result.financials?.fiftyTwoWeekLow}
        </p>
      </div>
    </div>

    <h3 className="mt-4 font-bold">Pros</h3>
    <ul className="list-disc ml-6">
      {result.pros?.map((item: string, index: number) => (
        <li key={index}>{item}</li>
      ))}
    </ul>

    <h3 className="mt-4 font-bold">Cons</h3>
    <ul className="list-disc ml-6">
      {result.cons?.map((item: string, index: number) => (
        <li key={index}>{item}</li>
      ))}
    </ul>

    <h3 className="mt-4 font-bold">Summary</h3>
    
    <p>{result.summary}</p>

    <h3 className="mt-6 font-bold">Latest News</h3>

    <ul className="list-disc ml-6">
      {result.news?.slice(0, 5).map((item: any, index: number) => (
        <li key={index}>
          <a
            href={item.url}
            target="_blank"
            className="text-blue-500 underline"
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>

  </div>
      )}
    </main>
  );
}
