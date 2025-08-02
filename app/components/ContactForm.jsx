"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, UploadCloud } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState, useRef } from "react";
import { formDetails } from "../constant";
import Link from "next/link";

export function ContactForm({ isHome = true, content, isBread = false, name }) {
  const [submitted, setIsSubmetted] = useState(false)
  const [error, setError] = useState(null)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [captchaAnswer, setCaptchaAnswer] = useState(9 * 11);
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef(null);

  const onSubmit = async (data) => {
    if (parseInt(data.captcha) !== captchaAnswer) {
      alert("Incorrect captcha!");
      return;
    }
    const formData = new FormData();

    formData.append("name", data.name || "");
    formData.append("email", data.email || "");
    formData.append("phone", data.phone || "");
    formData.append("length", data.length || "");
    formData.append("width", data.width || "");
    formData.append("depth", data.depth || "");
    formData.append("quantity", data.quantity || "");
    formData.append("boxType", data.boxType || "");
    formData.append("size", data.size || "");
    formData.append("color", data.color || "");
    formData.append("message", data.message || "");

    if (data.image) {
      formData.append("artwork", data.image);
    }

    try {
      const response = await fetch("/api/send-mail-box", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unknown error");
      }

      setIsSubmetted(true)
      reset();
      setPreview(null);
    } catch (err) {
      console.error("Error sending form:", err.message);
      setError(err.message)
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setValue("image", file, { shouldValidate: true });
  };
  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };
  const { productType, size, color } = formDetails;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" border md:w-full rounded-xl mt-10 pb-12 md:mx-auto md:max-w-6xl bg-white shadow"
    >
      {isHome ? (
        <div className="grid md:grid-cols-2 items-center mb-6 w-full">
          <div className="bg-red-themed text-white px-6 py-3 rounded-tr-xl md:rounded-tr-none rounded-tl-xl font-semibold text-base">
            Get Personalized Quote
          </div>
          <div className="bg-gray-100 px-6 py-3 md:rounded-tr-xl font-semibold text-base">
            Free Shiping
          </div>
        </div>
      ) : (
        <div
          className={`text-center w-full ${
            isBread
              ? "py-6"
              : "pt-4 pb-1 mb-7 bg-red-themed text-white rounded-tl-lg rounded-tr-lg"
          }`}
        >
          <span
            className={`text-2xl md:text-2xl  font-semibold`}
          >{`Get ${content} At Wholesale Prices`}</span>
          <div className="mt-4 text-sm">
            {isBread ?? <Link href={"/"}>Home</Link> / <span>{name}</span>}
          </div>
        </div>
      )}

      {/* Top Tabs */}
      <div className={`px-4 ${!isHome ? "mt-12" : "mt-12"}`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Input
            placeholder="Length"
            {...register("length")}
            className={"py-6"}
          />
          <Input
            placeholder="Width"
            {...register("width")}
            className={"py-6"}
          />
          <Input
            placeholder="Depth"
            {...register("depth")}
            className={"py-6"}
          />
          <Input
            placeholder="Quantity"
            {...register("quantity")}
            className={`py-6`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Select onValueChange={(value) => setValue("boxType", value)}>
            <SelectTrigger className={"w-full py-6"}>
              <SelectValue placeholder="Box Type" />
            </SelectTrigger>
            <SelectContent>
              {productType.map((product, index) => (
                <SelectItem
                  className={index === 3 ? "col-span-2 md:col-span-1" : ""}
                  key={index}
                  value={product}
                >
                  {product}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setValue("size", value)}>
            <SelectTrigger className={"w-full py-6"}>
              <SelectValue placeholder="Select Size" />
            </SelectTrigger>
            <SelectContent>
              {size.map((s, index) => (
                <SelectItem key={index} value={s}>
                  {s.toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setValue("color", value)}>
            <SelectTrigger className={"w-full py-6"}>
              <SelectValue placeholder="Select Color" />
            </SelectTrigger>
            <SelectContent>
              {color.map((c, index) => (
                <SelectItem key={index} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4">
          <span className="relative">
  {errors.name && (
    <p className="text-xs absolute text-red-themed -top-4">
      {errors.name.message}
    </p>
  )}
  <Input
    placeholder="Name"
    {...register("name", {
      required: "Name is required",
      minLength: {
        value: 3,
        message: "Name must be at least 3 characters",
      },
    })}
    className={`py-6 ${errors.name ? "border border-red-themed" : ""}`}
  />
</span>

<Input
  placeholder="Phone"
  {...register("phone")}
  className="py-6"
/>

<span className="relative">
  {errors.email && (
    <p className="text-xs absolute text-red-themed -top-4">
      {errors.email.message}
    </p>
  )}
  <Input
    placeholder="E-mail*"
    type="email"
    {...register("email", {
      required: "Email is Required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email address",
      },
    })}
    className={`py-6 ${errors.email ? "border border-red-themed" : ""}`}
  />
</span>
          <div className="flex items-center">
            <Input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
            <Button
              variant="outline"
              className={"py-6 justify-start text-base"}
              type="button"
              onClick={triggerFileSelect}
            >
              <UploadCloud className="w-4 h-4 mr-2" />
              Upload
            </Button>
            {preview && (
              <div className="ml-6">
                <img
                  src={preview}
                  width={100}
                  height={50}
                  alt="Preview"
                  className="max-w-xs border"
                />
                <span></span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          {errors.email && (
            <p className="text-xs  text-red-themed">{errors.email.message}</p>
          )}
          <Textarea
            placeholder="Message"
            {...register("message", { required: "Please Enter you message" })}
            className={`py-6 ${
              errors.message ? "border border-red-themed" : ""
            }`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 items-center">
          <div className="text-sm font-medium">9 * 11 =</div>
          <Input placeholder="Captcha" {...register("captcha")} />
        </div>

        <div className="mt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-red-themed text-white py-6 text-base cursor-pointer hover:bg-black/90"
          >
           {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
          {error && (
              <p>{error}</p>
          ) }
      {submitted && (
          <p className="text-green-600 text-sm mt-2">
            ✅ Your message was sent successfully!
          </p>
          )}
        </div>
      </div>
    </form>
  );
}

export function ContactFormWithMap() {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Form Box */}
        <div className="bg-gray-100 shadow-sm">
          {/* Red Header */}
          <div className="bg-red-themed text-white text-center py-6 font-semibold text-xl">
            Leave a Message
          </div>

          <form className="p-6 space-y-4">
            {/* Personal Info */}
            <div>
              <label className="font-semibold text-sm text-black mb-1 flex items-center gap-1">
                <FileText className="w-4 h-4 text-red-themed" />
                PERSONAL INFORMATION
              </label>
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 rounded-sm bg-white shadow-md outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold text-sm text-black mb-1">
                EMAIL
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-sm bg-white shadow-md outline-none"
              />
            </div>

            {/* Number */}
            <div>
              <label className="block font-semibold text-sm text-black mb-1">
                NUMBER
              </label>
              <input
                type="tel"
                placeholder="Phone"
                className="w-full p-3 rounded-sm bg-white shadow-md outline-none"
              />
            </div>

            {/* Additional Info */}
            <div>
              <label className="font-semibold text-sm text-black mb-1 flex items-center gap-1">
                <FileText className="w-4 h-4 text-red-600" />
                ADDITIONAL INFORMATION
              </label>
              <textarea
                rows="4"
                placeholder="Additional information"
                className="w-full p-3 rounded-sm bg-white shadow-md outline-none"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center pt-2">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-semibold"
              >
                SEND
              </button>
            </div>
          </form>
        </div>

        {/* Right Map Box */}
        <div className="w-full h-[600px]">
          <iframe
            src="https://www.google.com/maps?q=1001+S+Main+St+%237115,+Kalispell,+MT+59901,+USA&output=embed"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            className="border-0 rounded-md"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
