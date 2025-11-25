// TradingViewWidget.jsx
"use client";
import useTradingViewWidget from '@/hooks/useTradingViewWidget';
import React, { useRef, memo } from 'react';

interface TradingViewWidgetProps {
  title: string;
  scriptUrl: string;
  config: Record<string, unknown>;
  height?: number;
  className?: string;
}

const TradingViewWidget = ({title, scriptUrl, config, height = 0, className}: TradingViewWidgetProps) => {
  const container = useTradingViewWidget(scriptUrl, config, height);


  return (
    <div className="w-full">
      {title && <h3 className="font-semibold text2xl text-gray-100 mb-5 ">{title}</h3>}
      <div className="" ref={container} style={{ height: "100%", width: "100%" }}>
      <div className="" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
      <div className=""><a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener nofollow" target="_blank"><span className="blue-text">AAPL stock chart</span></a><span className="trademark"> by TradingView</span></div>
    </div>
    </div>
    
  );
}

export default memo(TradingViewWidget);
