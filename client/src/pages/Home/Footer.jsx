import React from "react";

function Footer() {
  return (
    <footer className="py-12">
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-tertiary/40 to-transparent" />
      <div className="flex items-center justify-center flex-col mt-8 gap-1">
        <p className="text-gray-400 text-sm">Designed &amp; developed by</p>
        <p className="gradient-text font-display font-semibold text-lg">
          Prem Jadwani
        </p>
        <p className="text-gray-600 text-xs mt-2">
          © {new Date().getFullYear()} Prem Jadwani. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
