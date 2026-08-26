import { MapPin, Phone, Clock } from "lucide-react";
import ContactInfoItem from "./ContactInfoItem";

const contactInfoItems = [
  {
    icon: MapPin,
    title: "Address",
    description: ["236 5th SE Avenue", "New York NY10000", "United States"],
  },
  {
    icon: Phone,
    title: "Phone",
    description: ["Mobile: +(84) 546-6789", "Hotline: +(84) 456-6789"],
  },
  {
    icon: Clock,
    title: "Working Time",
    description: [
      "Monday-Friday: 9:00 - 22:00",
      "Saturday-Sunday: 9:00 - 21:00",
    ],
  },
];

const ContactInfo = () => {
  return (
    <div className="flex flex-col gap-10">
      {contactInfoItems.map((item) => {
        return (
          <ContactInfoItem
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        );
      })}
    </div>
  );
};

export default ContactInfo;
