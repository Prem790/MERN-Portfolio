import React from "react";
import SectionTitle from "../../components/SectionTitle";
import Reveal from "../../components/Reveal";
import { useSelector } from "react-redux";

const ICONS = {
  name: "ri-user-3-line",
  email: "ri-mail-line",
  mobile: "ri-phone-line",
  phone: "ri-phone-line",
  address: "ri-map-pin-line",
  gender: "ri-user-smile-line",
};

const LINKS = {
  email: (v) => `mailto:${v}`,
  mobile: (v) => `tel:${v}`,
  phone: (v) => `tel:${v}`,
};

function Contact() {
  const { portfolioData } = useSelector((state) => state.root);
  const { contact } = portfolioData;
  const hidden = ["_id", "__v", "gender", "address"];
  const fields = Object.keys(contact).filter((k) => !hidden.includes(k));

  return (
    <div className="py-16">
      <SectionTitle title="Contact Me" />
      <div className="flex gap-12 items-center sm:flex-col">
        <Reveal className="w-1/2 sm:w-full">
          <div className="glass-card p-8 flex flex-col gap-5">
            <h3 className="text-2xl font-display text-white">
              Let's build something together
            </h3>
            <div className="flex flex-col gap-4">
              {fields.map((key) => {
                const value = contact[key];
                const href = LINKS[key] ? LINKS[key](value) : null;
                const row = (
                  <>
                    <span className="grid place-items-center h-10 w-10 rounded-lg glass text-secondary shrink-0">
                      <i className={ICONS[key] || "ri-hashtag"} />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-xs uppercase tracking-wider text-tertiary">
                        {key}
                      </span>
                      <span className="text-white break-all">{value}</span>
                    </span>
                  </>
                );
                return href ? (
                  <a
                    key={key}
                    href={href}
                    className="flex items-center gap-4 hover:translate-x-1 transition-transform"
                  >
                    {row}
                  </a>
                ) : (
                  <div key={key} className="flex items-center gap-4">
                    {row}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="w-1/2 sm:w-full h-[400px] sm:h-[280px]">
          <dotlottie-player
            src="https://lottie.host/fbdda05f-c1d4-4c2b-b16a-5e736671f839/pCpjnDaeTI.json"
            background="transparent"
            speed="1"
            style={{ width: "100%", height: "100%" }}
            loop
            autoplay
          ></dotlottie-player>
        </div>
      </div>
    </div>
  );
}

export default Contact;
