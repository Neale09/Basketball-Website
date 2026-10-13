import React from 'react';
import { Truck, Users, PackageCheck } from 'lucide-react';

export const TrustBanner: React.FC = () => {
  return (
    <div className="bg-[#111315] text-white border-y border-neutral-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
          {/* Feature 1 */}
          <div className="flex items-center justify-center gap-3 py-6 px-4 hover:bg-neutral-900/50 transition-colors">
            <Truck className="w-5 h-5 text-neutral-300 stroke-[1.8]" />
            <span className="text-sm font-semibold tracking-tight text-neutral-200">
              Free shipping on orders above Rs. 999
            </span>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center justify-center gap-3 py-6 px-4 hover:bg-neutral-900/50 transition-colors">
            <Users className="w-5 h-5 text-neutral-300 stroke-[1.8]" />
            <span className="text-sm font-semibold tracking-tight text-neutral-200">
              Cash On Delivery
            </span>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center justify-center gap-3 py-6 px-4 hover:bg-neutral-900/50 transition-colors">
            <PackageCheck className="w-5 h-5 text-neutral-300 stroke-[1.8]" />
            <span className="text-sm font-semibold tracking-tight text-neutral-200">
              Return policy (Upto 7 days)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
