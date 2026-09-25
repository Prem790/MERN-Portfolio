import React from "react";

function Loader() {
  return (
    <div className="h-screen flex items-center justify-center fixed inset-0 app-bg z-[10000]">
      <div className="flex gap-4 text-6xl sm:text-4xl font-display font-bold">
        <h1 className="text-secondary p">P</h1>
        <h1 className="text-white c">
          <i className="ri-code-s-slash-line" />
        </h1>
        <h1 className="text-tertiary j">J</h1>
      </div>
    </div>
  );
}

export default Loader;
