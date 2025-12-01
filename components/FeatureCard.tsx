import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ServiceCardItem } from '../types';

interface Props {
  item: ServiceCardItem;
}

const FeatureCard: React.FC<Props> = ({ item }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group h-full flex flex-col justify-between relative overflow-hidden">
      {/* Background Decor */}
      <div className={`absolute top-0 right-0 w-24 h-24 ${item.color} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150`}></div>
      
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-lg ${item.color} bg-opacity-10 text-gray-800`}>
             <span className="text-2xl">{item.icon}</span>
          </div>
          {item.isNew && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
              Mới
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#06b6d4] transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          {item.description}
        </p>
      </div>

      <div className="mt-6 flex items-center text-sm font-semibold text-[#06b6d4] gap-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
        Khám phá ngay <ArrowRight size={16} />
      </div>
    </div>
  );
};

export default FeatureCard;