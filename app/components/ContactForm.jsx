import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UploadCloud, FileText } from "lucide-react"

export function ContactForm() {
  return (
    <div className="bg-[#f5f5f5] my-12 rounded-tr-[80px] rounded-bl-[80px] overflow-hidden mx-auto shadow-xk max-w-6xl">
      {/* Header */}
      <div className="bg-red-themed text-white text-center text-2xl font-bold py-6">
        CONTACT US!
      </div>

      <form className="p-6 space-y-6">
        {/* Product Info */}
        <div>
          <Label className="font-bold flex items-center gap-2 text-sm text-black">
            <UploadCloud className="text-red-600 w-4 h-4" /> PRODUCT INFO
          </Label>
          <Input placeholder="Product Name" className="mt-2 bg-white" name="productName" />
        </div>

        {/* Select Size */}
        <div>
          <Label className="font-bold flex items-center gap-2 text-sm text-black">
            <UploadCloud className="text-red-600 w-4 h-4" /> SELECT SIZE
          </Label>
          <div className="grid w-full grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
            <Input placeholder="Length" name="length" className={'bg-white'}/>
            <Input placeholder="Width" name="width" className={'bg-white'}/>
            <Input placeholder="Depth" name="depth" className={'bg-white'}/>
            <Select name="unit">
              <SelectTrigger className={'bg-white w-full'}>
                <SelectValue placeholder="Inches" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inches">Inches</SelectItem>
                <SelectItem value="mm">MM</SelectItem>
                <SelectItem value="cm">CM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Choose Material */}
        <div>
          <Label className="font-bold flex items-center gap-2 text-sm text-black">
            <UploadCloud className="text-red-600 w-4 h-4" /> CHOOSE MATERIAL
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
            <Select name="stock">
              <SelectTrigger className={'bg-white w-full'}>
                <SelectValue placeholder="Stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kraft">Kraft</SelectItem>
                <SelectItem value="corrugated">Corrugated</SelectItem>
              </SelectContent>
            </Select>
            <Select name="color">
              <SelectTrigger className={'bg-white w-full'}>
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full Color</SelectItem>
                <SelectItem value="c1">Color 1</SelectItem>
                <SelectItem value="c2">Color 2</SelectItem>
                <SelectItem value="c3">Color 3</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Quantity" className={'bg-white'} name="quantity" />
          </div>
        </div>

        {/* Upload Artwork */}
        <div>
          <Label className="font-bold flex items-center gap-2 text-sm text-black">
            <UploadCloud className="text-red-600 w-4 h-4" /> UPLOAD ARTWORK
          </Label>
          <Input type="file" className="mt-2 bg-white" name="artwork"/>
        </div>

        {/* Personal Info */}
        <div>
          <Label className="font-bold flex items-center gap-2 text-sm text-black">
            <UploadCloud className="text-red-600 w-4 h-4" /> PERSONAL INFORMATION
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
            <Input placeholder="Name" name="name" className={'bg-white'}/>
            <Input placeholder="Email" name="email" type="email" className={'bg-white'}/>
            <Input placeholder="Phone" name="phone" className={'bg-white'}/>
          </div>
        </div>

        {/* Additional Info */}
        <div>
          <Label className="font-bold flex items-center gap-2 text-sm text-black">
            <UploadCloud className="text-red-600 w-4 h-4" /> ADDITIONAL INFORMATION
          </Label>
          <Textarea placeholder="Additional information" name="additionalInfo" className="mt-2 bg-white" />
        </div>

        {/* Submit */}
        <div className="text-center">
          <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-2 rounded">
            SEND
          </Button>
        </div>
      </form>
    </div>
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
              <label className="block font-semibold text-sm text-black mb-1 flex items-center gap-1">
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
