
import React from 'react'
import SectionTitle from '../../components/SectionTitle';
import { useSelector } from 'react-redux';
//import { expreiences } from '../../resources/expreiences';




function Expreiences() {

    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
    const {portfolioData} = useSelector((state)=>state.root);
    const {expreiences} = portfolioData;

  return (
    <div>
        <SectionTitle title="Experiences" />
        <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-tertiary w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
            {expreiences.map((experience,index)=>(
                <div onClick={()=>{
                    setSelectedItemIndex(index)
                }}
                className="cursor-pointer">
                <h1 className={`text-xl px-5 ${selectedItemIndex===index ? "text-white border-tertiary border-l-4 -ml-[4px] bg-[#45a29d49] py-4 rounded-sm" : "text-tertiary"}`}>{experience.period}</h1>
                </div>
            )
            )}
        </div>

        <div className="flex flex-col gap-5">
            <h1 className="text-secondary text-2xl">
            {expreiences[selectedItemIndex].title}
            </h1>
            <h1 className="text-[#707373] text-xl">
            {expreiences[selectedItemIndex].company}
            </h1>
            <p className="text-white">
           lorem  ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quaerat voluptatum eaque nulla ipsam velit repudiandae  lorem  ipsum dolor sit amet consectetur adipisicing elit. 
           </p>
          
        </div>



        </div>
        

        
    </div>
  )
}

export default Expreiences


