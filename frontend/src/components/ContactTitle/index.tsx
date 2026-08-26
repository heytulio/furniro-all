import React from "react";

type ContactTitleProps = {
  title: string;
  description: string;
};

const ContactTitle = ({ title, description }: ContactTitleProps) => {
  return (
    <div className="mb-12 flex flex-col items-center justify-center text-center">
      <h1 className="font-poppins text-4xl font-semibold">{title}</h1>
      <p className="mt-4 max-w-161 font-poppins text-[#9f9f9f]">
        {description}
      </p>
    </div>
  );
};

export default ContactTitle;
