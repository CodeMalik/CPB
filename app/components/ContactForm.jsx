'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud, FileText } from 'lucide-react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    clearErrors('api');

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === 'artwork') {
        formData.append(key, data[key][0]); // first file
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      const res = await fetch('/api/send-mail-box', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        setError('api', { type: 'manual', message: 'Failed to send message. Try again.' });
      } else {
        reset();
      }
    } catch (error) {
      setError('api', { type: 'manual', message: 'Something went wrong.' });
    }
  };

  return (
    <div className="bg-[#f5f5f5] my-12 rounded-tr-[80px] rounded-bl-[80px] overflow-hidden mx-auto shadow-xk max-w-6xl">
      <div className="bg-red-themed text-white text-center text-2xl font-bold py-6">CONTACT US!</div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        {/* Product Info */}
        <div>
          <Label className="font-bold flex items-center gap-2 text-sm text-black">
            <UploadCloud className="text-red-600 w-4 h-4" /> PRODUCT INFO
          </Label>
          <Input placeholder="Product Name" {...register('productName')} className=" bg-white py-2 rounded-none" />
        </div>

        {/* Size */}
        <div>
          <Label className="font-bold flex items-center gap-2 text-sm text-black">
            <UploadCloud className="text-red-600 w-4 h-4" /> SELECT SIZE
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Input placeholder="Length" {...register('length')} className="bg-white py-2 rounded-none" />
            <Input placeholder="Width" {...register('width')} className="bg-white py-2 rounded-none" />
            <Input placeholder="Depth" {...register('depth')} className="bg-white py-2 rounded-none" />
            <select {...register('unit')} className="bg-white py-2 px-3 border rounded-none">
              <option value="inches">Inches</option>
              <option value="cm">CM</option>
              <option value="mm">MM</option>
            </select>
          </div>
        </div>

        {/* Material */}
        <div>
          <Label className="font-bold flex items-center gap-2 text-sm text-black">
            <UploadCloud className="text-red-600 w-4 h-4" /> CHOOSE MATERIAL
          </Label>
          <div className="grid sm:grid-cols-3 gap-3">
            <select {...register('stock')} className="bg-white py-2 px-3 border rounded-none">
              <option value="kraft">Kraft</option>
              <option value="corrugated">Corrugated</option>
            </select>
            <select {...register('color')} className="bg-white py-2 px-3 border rounded-none">
              <option value="full">Full Color</option>
              <option value="c1">Color 1</option>
              <option value="c2">Color 2</option>
              <option value="c3">Color 3</option>
            </select>
            <Input placeholder="Quantity" {...register('quantity')} className="bg-white py-2 rounded-none" />
          </div>
        </div>

        {/* Upload Artwork */}
        <div>
          <Label className="font-bold flex items-center gap-2 text-sm text-black">
            <UploadCloud className="text-red-600 w-4 h-4" /> UPLOAD ARTWORK
          </Label>
          <Input type="file" {...register('artwork')} className="bg-white py-2" />
        </div>

        {/* Personal Info */}
        <div>
          <Label className="font-bold flex items-center gap-2 text-sm text-black">
            <UploadCloud className="text-red-600 w-4 h-4" /> PERSONAL INFORMATION
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input placeholder="Name" {...register('name')} className="bg-white py-2 rounded-none" />
            <Input placeholder="Email" {...register('email')} type="email" className="bg-white py-2 rounded-none" />
            <Input placeholder="Phone" {...register('phone')} className="bg-white py-2 rounded-none" />
          </div>
        </div>

        {/* Additional Info */}
        <div>
          <Label className="font-bold flex items-center gap-2 text-sm text-black">
            <UploadCloud className="text-red-600 w-4 h-4" /> ADDITIONAL INFORMATION
          </Label>
          <Textarea placeholder="Additional information" {...register('additionalInfo')} className="bg-white py-2 rounded-none" />
        </div>

        {/* Error Message */}
        {errors.api && <p className="text-red-600">{errors.api.message}</p>}
        {isSubmitSuccessful && !errors.api && <p className="text-green-600">Message sent successfully!</p>}

        {/* Submit */}
        <div className="text-center">
          <Button disabled={isSubmitting} type="submit" className="bg-red-themed hover:bg-red-themed/80 text-white font-bold px-8 py-2 rounded">
            {isSubmitting ? 'Sending...' : 'SEND'}
          </Button>
        </div>
      </form>
    </div>
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
