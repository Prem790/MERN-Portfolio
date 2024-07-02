import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux';

function Contact() {

 
    const {portfolioData} = useSelector((state)=>state.root);
    const {contact} = portfolioData;
    
   
  return (
    <div>
        <SectionTitle title="Contact Me..!"/>
        <div className="flex sm:flex-col items-center">
            <div className="flex flex-col gap-2">
            <p className="text-tertiary ">{'{'}</p>
            {Object.keys(contact).map((key)=>
            key!== "_id" && (
              <p className="ml-5">
                    <span className="text-tertiary">{key} : </span>
                    <span className="text-tertiary">{contact[key]}</span>
                </p>
            )
            )}
            <p className="text-tertiary">{"}"}</p>

            </div>
            <div className="h-[400px] ml-10">
            <dotlottie-player src="https://lottie.host/fbdda05f-c1d4-4c2b-b16a-5e736671f839/pCpjnDaeTI.json" background="transparent" speed="1" 
             loop autoplay></dotlottie-player>
             </div>
        </div>
    </div>
  )
}

export default Contact