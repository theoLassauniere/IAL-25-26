import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";
import { HeartBeat } from "../types/heartbeat";
import "../styles/HeartBeatChart.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  TimeScale,
  Legend
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, TimeScale, Legend);

export default function HeartBeatChart({ data }: { data: HeartBeat[] }) {
  const labels = data.map(d => new Date(d.time));
  const values = data.map(d => d.heart_beats);

  const stats = useMemo(() => {
    if (!values.length) return { avg: 0, min: 0, max: 0, last: 0 };
    const sum = values.reduce((a, b) => a + b, 0);
    return {
      avg: Math.round((sum / values.length) * 10) / 10,
      min: Math.min(...values),
      max: Math.max(...values),
      last: values[values.length - 1]
    };
  }, [values]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "BPM",
        data: values,
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        borderWidth: 2,
        tension: 0.2,
        pointRadius: 0,
        pointHoverRadius: 5,
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
          tooltipFormat: 'HH:mm',
          displayFormats: {
            minute: 'HH:mm'
          }
        },
        grid: {
          display: true,
          color: '#f3f4f6'
        }
      },
      y: {
        suggestedMin: 40,
        suggestedMax: 140,
        grid: {
          display: true,
          color: '#f3f4f6'
        },
        ticks: {
          callback: function(value: string | number) {
            return value + ' bpm';
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return context.parsed.y + ' bpm';
          }
        }
      }
    }
  };

  return (
    <div>
      <div className="stats-container">
        <div className="stat-box">
          <div className="stat-label">Moyenne</div>
          <div className="stat-value">{stats.avg} bpm</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Min</div>
          <div className="stat-value">{stats.min} bpm</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Max</div>
          <div className="stat-value">{stats.max} bpm</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Dernière</div>
          <div className="stat-value-highlight">{stats.last} bpm</div>
        </div>
      </div>
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}


