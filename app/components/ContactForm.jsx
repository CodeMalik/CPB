'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud, FileText } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useState } from "react"

export  function ContactForm() {
  const { register, handleSubmit, setValue, watch, reset } = useForm()
  const [captchaAnswer, setCaptchaAnswer] = useState(9 * 11)

  const onSubmit = (data) => {
    if (parseInt(data.captcha) !== captchaAnswer) {
      alert("Incorrect captcha!")
      return
    }

    console.log("Form Data:", data)
    alert("Quote requested successfully!")
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border w-[23rem] md:w-full rounded-xl pb-12 md:max-w-4xl md:mx-auto bg-white shadow">
      <div className="grid md:grid-cols-2 items-center mb-6 w-full">
        <div className="bg-black text-white px-6 py-3 rounded-tr-xl md:rounded-tr-none rounded-tl-xl font-semibold text-base">Get Personalized Quote</div>
        <div className="bg-gray-100 px-6 py-3 md:rounded-tr-xl font-semibold text-base">Free Shiping</div>
      </div>
      {/* Top Tabs */}
<div className='px-4 mt-12'>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input placeholder="Length" {...register("length")} className={"py-6"}/>
        <Input placeholder="Width" {...register("width")} className={"py-6"}/>
        <Input placeholder="Depth" {...register("depth")} className={"py-6"}/>
        <Input placeholder="Quantity" {...register("quantity")} className={"py-6"}/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <Select onValueChange={(value) => setValue("boxType", value)}>
          <SelectTrigger className={'w-full py-6'}>
            <SelectValue placeholder="Box Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="custom">Custom</SelectItem>
            <SelectItem value="mailer">Mailer</SelectItem>
            <SelectItem value="display">Display</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setValue("size", value)}>
          <SelectTrigger className={"w-full py-6"}>
            <SelectValue placeholder="Select Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>

        <Select  onValueChange={(value) => setValue("color", value)}>
          <SelectTrigger className={"w-full py-6"}>
            <SelectValue placeholder="Select Color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="white">White</SelectItem>
            <SelectItem value="brown">Brown</SelectItem>
            <SelectItem value="black">Black</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Input placeholder="Name" {...register("name")}  className={'py-6'}/>
        <Input placeholder="Phone" {...register("phone")}  className={'py-6'}/>
        <Input placeholder="E-mail*" type="email" {...register("email", { required: true })}  className={'py-6'}/>
        <Input placeholder="Select Your Country" {...register("country")}  className={'py-6'}/>
      </div>

      <div className="mt-4">
        <Textarea placeholder="Message" {...register("message")} className={"py-6"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 items-center">
        <div className="text-sm font-medium">
          9 * 11 =
        </div>
        <Input placeholder="Captcha" {...register("captcha")} />
      </div>

      <div className="mt-6">
        <Button type="submit" className="w-full rounded-full bg-red-themed text-white py-6 text-base cursor-pointer hover:bg-black/90">
          Get Personalized Quote
        </Button>
      </div>
      </div>
    </form>
  )
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
