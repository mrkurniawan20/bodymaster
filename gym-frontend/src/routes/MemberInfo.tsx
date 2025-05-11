import React from 'react';

function MemberInfo() {
  const isExpired = true;
  return (
    // <div className="w-screen h-screen bg-red-600 text-white font-sans rounded-none overflow-hidden relative shadow-md flex flex-col">
    <div className="w-screen h-screen bg-emerald-600 text-white font-sans rounded-none overflow-hidden relative shadow-md flex flex-col">
      {/* Top Design */}
      {/* <div className="h-1/10 bg-teal-100 clip-top"></div> */}
      {/* <div className="h-1/10 bg-gradient-to-br from-black to-emerald-600 clip-top"></div> */}

      {/* Image Section */}
      <div className="relative flex-row items-center text-center justify-center p-0 my-20 rounded-lg">
        <h1 className="text-4xl font-semibold">20 MAY 2025 - 21:20 </h1>
        <div className="flex justify-center my-6">
          <img
            src="/src/assets/img/potrait.jpeg" // Replace with the actual image URL
            alt="Andrea Phillips"
            className="w-1/2 rounded-xl object-cover shadow-xl"
          />
        </div>
        <h2 className="m-0 text-3xl font-bold ">RAFLI KURNIAWAN</h2>
        <div className="mt-6">
          {' '}
          {/* Increased margin for spacing */}
          <p className="text-xl font-semibold">ID: 112</p>
          <p className="text-xl font-semibold">EXPIRED : 27 JUN 2025</p>
        </div>
        <div className="mt-4 flex justify-center items-center">
          <img src="/src/assets/img/bodymaster.png" alt="" className="size-1/2 invert object-contain" />
        </div>
      </div>

      {/* Logo Section */}

      {/* Bottom Design */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-1/10 bg-teal-100 clip-top"></div> */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-1/10 bg-gradient-to-tl from-black to-blue-500 clip-bottom"></div> */}

      {/* Dots */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
        {[...Array(5)].map((_, i) => (
          <div key={`left-dot-${i}`} className="w-2.5 h-2.5 rounded-full bg-white" />
        ))}
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
        {[...Array(5)].map((_, i) => (
          <div key={`right-dot-${i}`} className="w-2.5 h-2.5 rounded-full bg-white" />
        ))}
      </div>
    </div>
  );
}

export default MemberInfo;
