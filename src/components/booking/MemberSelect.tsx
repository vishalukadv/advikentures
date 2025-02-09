import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface MemberSelectProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

const MemberSelect: React.FC<MemberSelectProps> = ({ value, onChange, max = 20 }) => {
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => value > 1 && onChange(value - 1)}
        className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200"
        disabled={value <= 1}
      >
        <Minus size={16} />
      </button>
      
      <span className="text-xl font-semibold w-12 text-center">{value}</span>
      
      <button
        onClick={() => value < max && onChange(value + 1)}
        className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200"
        disabled={value >= max}
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default MemberSelect;