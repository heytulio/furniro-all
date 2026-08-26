import PageBanner from "@/components/Shop/PageBanner";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import ContactTitle from "@/components/ContactTitle";
import Benefits from "@/components/Benefits/Benefits";

export function Contact() {
  return (
    <>
      <PageBanner
        breadcrumbCurrent="Contact"
        title="Contact"
        breadcrumbHome="Home"
      />
      <div className="flex-row mx-auto max-w-310 px-4 py-16 gap-10">
        <ContactTitle
          title="Get In Touch With Us"
          description="For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!"
        />
        <div className="flex flex-col items-center justify-center gap-12 md:flex-row md:items-start md:justify-between">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
      <Benefits />
    </>
  );
}
