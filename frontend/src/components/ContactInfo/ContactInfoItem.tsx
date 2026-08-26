import type { LucideIcon } from "lucide-react";

type ContactInfoItemProps = {
  icon: LucideIcon;
  title: string;
  description: string[];
};

const ContactInfoItem = ({
  icon: Icon,
  title,
  description,
}: ContactInfoItemProps) => {
  return (
    <div className="flex items-start gap-4">
      <Icon className="h-6 w-6 shrink-0 text-black pt-1" />

      <div className="flex flex-col">
        <h3 className="text-base font-bold text-black">{title}</h3>
        {description.map((line, index) => (
          <p key={index} className="text-sm text-gray-800">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ContactInfoItem;
