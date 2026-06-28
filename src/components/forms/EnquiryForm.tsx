"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";

// Form Schema with Zod
const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  designation: z.string().optional(),
  company: z.string().min(2, "Company Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().min(1, "Please select a country"),
  phone: z.string().min(7, "Contact number must be at least 7 digits"),
  query: z.string().min(10, "Inquiry must be at least 10 characters"),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

const countries = [
  "India", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla",
  "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia",
  "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
  "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina",
  "Botswana", "Bouvet Island", "Brazil", "Brunei Darussalam", "Bulgaria", "Burkina Faso",
  "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic",
  "Chad", "Chile", "China", "Christmas Island", "Colombia", "Comoros",
  "Congo", "Cook Islands", "Costa Rica", "Cote D'Ivoire", "Croatia", "Cuba", "Cyprus",
  "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia",
  "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan",
  "French Guiana", "French Polynesia", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
  "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea",
  "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland",
  "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Latvia", "Lebanon", "Lesotho",
  "Liberia", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar",
  "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique",
  "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova", "Monaco",
  "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
  "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue",
  "Norfolk Island", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Paraguay", "Peru",
  "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion",
  "Romania", "Russian Federation", "Rwanda", "Saint Lucia", "Samoa", "San Marino",
  "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia",
  "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka",
  "St Helena", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Taiwan",
  "Tajikistan", "Tanzania", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago",
  "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
  "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City State",
  "Venezuela", "Viet Nam", "Virgin Islands (British)", "Virgin Islands (US)",
  "Western Sahara", "Yemen", "Zaire", "Zambia", "Zimbabwe", "Other-Not Shown"
];

export default function EnquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      country: "India",
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setUserName(data.name);
    setUserEmail(data.email);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center space-y-6 animate-[fade-up_0.5s_ease-out_forwards]">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-brand-navy">Enquiry Sent Successfully!</h3>
          <p className="text-brand-steel text-sm sm:text-base font-semibold leading-relaxed max-w-md mx-auto">
            Thank you, <span className="text-brand-navy font-bold">{userName}</span>. We have received your enquiry and our team will get back to you within 24 hours.
          </p>
          <p className="text-brand-steel text-xs font-semibold">
            Our team will contact you at: <span className="text-brand-navy font-bold">{userEmail}</span>
          </p>
        </div>
        <button
          onClick={() => setSubmitStatus("idle")}
          className="bg-brand-orange text-white hover:bg-orange-600 px-6 py-3 rounded font-bold text-sm tracking-wide transition-all shadow-md"
        >
          Send Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitStatus === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 flex items-start space-x-3 text-sm font-semibold">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <span>
            Something went wrong. Please try again or contact us directly at{" "}
            <a href="mailto:mahavirvalves@gmail.com" className="underline hover:text-red-950">
              mahavirvalves@gmail.com
            </a>
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="text-sm font-bold text-brand-navy mb-1.5 block">
            Your Name <span className="text-brand-orange">*</span>
          </label>
          <input
            type="text"
            {...register("name")}
            className={`border-2 rounded-lg px-4 py-3 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition w-full text-sm font-medium ${
              errors.name ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.name.message}</p>}
        </div>

        {/* Designation */}
        <div>
          <label className="text-sm font-bold text-brand-navy mb-1.5 block">Designation</label>
          <input
            type="text"
            {...register("designation")}
            className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition w-full text-sm font-medium"
            placeholder="Purchase Manager (e.g.)"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Company Name */}
        <div>
          <label className="text-sm font-bold text-brand-navy mb-1.5 block">
            Company Name <span className="text-brand-orange">*</span>
          </label>
          <input
            type="text"
            {...register("company")}
            className={`border-2 rounded-lg px-4 py-3 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition w-full text-sm font-medium ${
              errors.company ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="Acme Industrial Corp"
          />
          {errors.company && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.company.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-bold text-brand-navy mb-1.5 block">
            Email ID <span className="text-brand-orange">*</span>
          </label>
          <input
            type="email"
            {...register("email")}
            className={`border-2 rounded-lg px-4 py-3 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition w-full text-sm font-medium ${
              errors.email ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="john@company.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* City */}
        <div>
          <label className="text-sm font-bold text-brand-navy mb-1.5 block">City</label>
          <input
            type="text"
            {...register("city")}
            className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition w-full text-sm font-medium"
            placeholder="Ludhiana (e.g.)"
          />
        </div>

        {/* Country */}
        <div>
          <label className="text-sm font-bold text-brand-navy mb-1.5 block">
            Country <span className="text-brand-orange">*</span>
          </label>
          <select
            {...register("country")}
            className={`border-2 rounded-lg px-4 py-3 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition w-full text-sm font-medium bg-white ${
              errors.country ? "border-red-500" : "border-gray-200"
            }`}
          >
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.country && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.country.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Contact Numbers */}
        <div>
          <label className="text-sm font-bold text-brand-navy mb-1.5 block">
            Contact Numbers <span className="text-brand-orange">*</span>
          </label>
          <input
            type="text"
            {...register("phone")}
            className={`border-2 rounded-lg px-4 py-3 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition w-full text-sm font-medium ${
              errors.phone ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="+91 98156-52779"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.phone.message}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="text-sm font-bold text-brand-navy mb-1.5 block">Address</label>
          <input
            type="text"
            {...register("address")}
            className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition w-full text-sm font-medium"
            placeholder="Plot. 1240, Janta Nagar"
          />
        </div>
      </div>

      {/* Query */}
      <div>
        <label className="text-sm font-bold text-brand-navy mb-1.5 block">
          Specific Query / Enquiry <span className="text-brand-orange">*</span>
        </label>
        <textarea
          {...register("query")}
          rows={5}
          className={`border-2 rounded-lg px-4 py-3 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition w-full text-sm font-medium resize-y min-h-[120px] ${
            errors.query ? "border-red-500" : "border-gray-200"
          }`}
          placeholder="Please describe your valve requirements, sizes, materials, quantity..."
        />
        {errors.query && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.query.message}</p>}
      </div>

      <p className="text-brand-steel text-xs font-semibold italic">
        * Field values are strictly required to route the query.
      </p>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center bg-brand-orange text-white hover:bg-orange-600 py-4 rounded-lg font-bold text-lg tracking-wide shadow-md hover:shadow-lg transition-all duration-300 disabled:bg-brand-orange/70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Sending Enquiry...
          </>
        ) : (
          "Send Enquiry"
        )}
      </button>
    </form>
  );
}
