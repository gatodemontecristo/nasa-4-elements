'use client';
import React from 'react';
import { useSystemAlerts } from '@/hooks/useNasaWater';
import { IoWarning } from 'react-icons/io5';
import { MdNotificationsActive } from 'react-icons/md';
import { PiShareNetworkFill } from 'react-icons/pi';
import { FaDatabase } from 'react-icons/fa6';

interface SystemAlertsProps {
  className?: string;
}

export const SystemAlerts = ({ className = '' }: SystemAlertsProps) => {
  const { data: alerts, isLoading, error } = useSystemAlerts();

  const getAlertIcon = (message: string) => {
    if (message.toLowerCase().includes('water')) {
      return <FaDatabase className="h-4 w-4" />;
    }
    if (message.toLowerCase().includes('sewage')) {
      return <PiShareNetworkFill className="h-4 w-4" />;
    }
    if (message.toLowerCase().includes('project')) {
      return <MdNotificationsActive className="h-4 w-4" />;
    }
    return <IoWarning className="h-4 w-4" />;
  };

  const getAlertColor = (index: number) => {
    const colors = [
      'border-red-500/30 bg-red-900/20 text-red-400',
      'border-orange-500/30 bg-orange-900/20 text-orange-400',
      'border-yellow-500/30 bg-yellow-900/20 text-yellow-400',
    ];
    return colors[index % colors.length];
  };

  if (isLoading) {
    return (
      <div className={`rounded-lg border border-gray-700 bg-gray-900/50 p-4 ${className}`}>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-4 w-4 animate-pulse rounded bg-gray-600"></div>
          <div className="h-4 w-24 animate-pulse rounded bg-gray-600"></div>
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-10 animate-pulse rounded-lg bg-gray-800"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !alerts) {
    return (
      <div className={`rounded-lg border border-red-500/30 bg-gray-900/50 p-4 ${className}`}>
        <div className="mb-2 flex items-center gap-2">
          <IoWarning className="h-4 w-4 text-red-400" />
          <h3 className="font-nasalization text-sm tracking-wider text-red-400 uppercase">
            System Error
          </h3>
        </div>
        <p className="font-jetbrains text-xs text-gray-400">Unable to load system alerts</p>
      </div>
    );
  }

  return (
    <div className={`rounded-lg border border-gray-700 bg-gray-900/50 p-4 ${className}`}>
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex items-center gap-1">
          <IoWarning className="h-4 w-4 animate-pulse text-amber-400" />
          <div className="h-2 w-2 animate-ping rounded-full bg-amber-400"></div>
        </div>
        <h3 className="font-nasalization text-sm tracking-wider text-white uppercase">
          System Alerts
        </h3>
        <div className="ml-auto">
          <span className="font-jetbrains rounded-full border border-amber-500/30 bg-amber-500/20 px-2 py-1 text-xs text-amber-400">
            {alerts.length} ACTIVE
          </span>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`rounded-lg border p-3 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${getAlertColor(index)}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getAlertIcon(alert.message)}</div>
              <div className="flex-1">
                <p className="font-inter text-sm leading-relaxed">{alert.message}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-current opacity-60"></div>
                  <span className="font-jetbrains text-xs tracking-wide uppercase opacity-70">
                    {alert.type}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 border-t border-gray-700 pt-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-jetbrains text-gray-400">REAL-TIME MONITORING</span>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
            <span className="font-jetbrains text-green-400">ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
