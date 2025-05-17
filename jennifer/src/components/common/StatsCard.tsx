import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  bgColor?: string;
  textColor?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  bgColor = 'bg-white',
  textColor = 'text-neutral-800',
}) => {
  return (
    <div className={`${bgColor} rounded-lg shadow-sm p-5 transition-all duration-300 hover:shadow-md`}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500">{title}</p>
          <p className={`text-2xl font-bold mt-1 ${textColor}`}>{value}</p>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-xs font-medium ${
                  trend.isPositive ? 'text-success-500' : 'text-error-500'
                }`}
              >
                {trend.isPositive ? '+' : ''}
                {trend.value}%
              </span>
              <span className="text-xs text-neutral-500 ml-1">from last period</span>
            </div>
          )}
          
          {description && (
            <p className="text-xs text-neutral-500 mt-1">{description}</p>
          )}
        </div>
        
        <div className="p-2 rounded-md bg-primary-50 text-primary-500">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;