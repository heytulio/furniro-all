import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import ContactFormInput from "./ContactFormInput";

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ContactFormErrors>({});

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: ContactFormErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Your name is required";
    if (!formData.email.trim()) {
      nextErrors.email = "Email address is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      nextErrors.email = "Invalid email address";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    toast.success("Message sent successfully!");
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl flex-col gap-6"
      noValidate
    >
      <ContactFormInput
        id="name"
        label="Your name"
        placeholder="Abc"
        error={errors.name}
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <ContactFormInput
        id="email"
        type="email"
        label="Email address"
        placeholder="Abc@def.com"
        error={errors.email}
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <ContactFormInput
        id="subject"
        label="Subject"
        placeholder="This is an optional"
        error={errors.subject}
        name="subject"
        value={formData.subject}
        onChange={handleChange}
      />

      <ContactFormInput
        id="message"
        label="Message"
        isTextArea
        placeholder="Hi! I'd like to ask about"
        error={errors.message}
        name="message"
        value={formData.message}
        onChange={handleChange}
      />

      <div>
        <button
          type="submit"
          className="rounded-md bg-[#B88E2F] px-12 py-3 font-medium text-white transition-colors hover:bg-[#a07b28]"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
