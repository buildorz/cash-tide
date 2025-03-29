
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <span className="font-bold text-2xl text-black">cash</span>
      <span className="font-bold text-2xl text-app-green">tide</span>
      <div className="w-2 h-2 rounded-full bg-app-green ml-1"></div>
    </div>
  );
};

export default Logo;
