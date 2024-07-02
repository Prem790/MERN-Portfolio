import React from 'react'

function LeftSlider() {
  return (
    <div className="fixed left-0 bottom-0 px-10 sm:static">
    <div className="flex flex-col items-center">
    <div className="flex flex-col gap-4 sm:flex-row">
    <a href="https://www.facebook.com/">
        <i class="ri-facebook-circle-line text-gray-500 text-xl"></i>
        </a>
        <a href="mailto:jadwaniprem@gmail.com">
        <i class="ri-mail-fill text-gray-500 text-xl"></i>
        </a>
        <a href="https://www.instagram.com/prem_jadwani/">
        <i class="ri-instagram-line text-gray-500 text-xl"></i>
        </a>
        <a href="https://www.linkedin.com/in/prem-jadwani-5b8748221/"><i class="ri-linkedin-box-fill text-gray-500 text-xl"></i></a>
        
        <a href="https://github.com/Prem790"><i class="ri-github-fill text-gray-500 text-xl"></i>
        </a>
        </div>
        <div className="w-[1px] h-32 bg-[#6B7280] sm:hidden">

        </div>
    </div>
    </div>
  )
}

export default LeftSlider