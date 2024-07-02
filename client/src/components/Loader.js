import React from 'react'

function Loader() {
  return (
    <div className="h-screen flex items-center justify-center fixed inset-0 bg-primary z-[10000]">
        <div className="flex gap-5 text-6xl font-semibold sm:text-3xl ">
            <h1 className="text-secondary p">P</h1>
            <h1 className="text-white c"><i class="ri-code-s-slash-line "></i></h1>
            <h1 className="text-tertiary j">J</h1>

        </div>
    </div>
  )
}

export default Loader