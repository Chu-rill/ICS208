import React from 'react';

interface ProgressCardProps {
  title: string;
  value: number;
  maxValue: number;
  unit?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  value,
  maxValue,
  unit = '',
  color = 'primary',
  size = 'md',
}) => {
  const percentage = Math.round((value / maxValue) * 100);
  
  // Size classes
  const sizeClasses = {
    sm: {
      card: 'p-3',
      title: 'text-xs',
      value: 'text-sm font-semibold',
      bar: 'h-1.5',
    },
    md: {
      card: 'p-4',
      title: 'text-sm',
      value: 'text-lg font-bold',
      bar: 'h-2',
    },
    lg: {
      card: 'p-5',
      title: 'text-base',
      value: 'text-2xl font-bold',
      bar: 'h-2.5',
    },
  };
  
  // Color classes
  const colorClasses = {
    primary: {
      text: 'text-primary-600',
      bg: 'bg-primary-100',
      fill: 'bg-primary-500',
    },
    success: {
      text: 'text-success-600',
      bg: 'bg-success-100',
      fill: 'bg-success-500',
    },
    warning: {
      text: 'text-warning-600',
      bg: 'bg-warning-100',
      fill: 'bg-warning-500',
    },
    error: {
      text: 'text-error-600',
      bg: 'bg-error-100',
      fill: 'bg-error-500',
    },
    neutral: {
      text: 'text-neutral-600',
      bg: 'bg-neutral-100',
      fill: 'bg-neutral-500',
    },
  };
  
  const selectedSize = sizeClasses[size];
  const selectedColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.primary;

  return (
    <div className={`bg-white rounded-lg shadow-sm ${selectedSize.card} transition-all duration-300 hover:shadow-md`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className={`${selectedSize.title} text-neutral-500`}>{title}</h3>
        <span className={`${selectedSize.value} ${selectedColor.text}`}>
          {value}
          {unit && <span className="text-xs text-neutral-500 ml-1">{unit}</span>}
        </span>
      </div>
      
      <div className="relative">
        <div className={`w-full ${selectedColor.bg} rounded-full ${selectedSize.bar}`}>
          <div
            className={`${selectedColor.fill} rounded-full ${selectedSize.bar}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-neutral-500 mt-1 text-right">{percentage}% of {maxValue}{unit}</p>
      </div>
    </div>
  );
};

export default ProgressCard;