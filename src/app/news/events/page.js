import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Gift,
  Ticket,
  CheckCircle,
} from "lucide-react";

export default function BAESAPicnicPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-0  pt-10 h-[300] md:h-[600] overflow-hidden">
        <img
          src="https://github.com/alzabid/Next-template/blob/main/public/picnic.jpg?raw=true"
          alt="BAESA Picnic 2026"
          className="w-full h-full object-fill rounded-2xl"
        />
      </div>

      {/* Invitation Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-2xl p-8 md:p-12 border-t-4 border-blue-900">
          <p className="text-base md:text-xl text-gray-800 mb-4 font-semibold">
            সুধী,
            <br />
            <br />
            আসসালামু আলাইকুম ও শুভেচ্ছা।
          </p>

          <p className=" text-sm md:text-lg text-gray-700 mb-6 leading-relaxed text-justify">
            বাংলাদেশ পরমাণু শক্তি বিজ্ঞানী সংঘ (বাপসা)-এর উদ্যোগে আগামী ০৭
            ফেব্রুয়ারি ২০২৬ খ্রি. শেলটন রিসোর্ট অ্যান্ড কনভেনশন সেন্টার,
            গাজীপুর-এ বাপসা পিকনিক-২০২৬ আয়োজন করা হয়েছে। উক্ত আয়োজনে বাংলাদেশ
            পরমাণু শক্তি কমিশনে কর্মরত সকলের বিজ্ঞানীবৃন্দ ও তাদের পরিবারবর্গ
            অংশগ্রহণ করবেন।
          </p>

          <p className="text-sm md:text-lg text-gray-700 leading-relaxed text-justify">
            বাপসা পিকনিক-২০২৬-এর এই আনন্দঘন আয়োজনে আপনাকে সপরিবারে অংশগ্রহণের
            জন্য বিশেষভাবে আমন্ত্রণ জানাচ্ছি। আপনার সান্নিধ্য উপস্থিতি আমাদের
            আয়োজনকে সার্থক এবং সকলকে অনুপ্রাণিত করবে।
          </p>
          <div className="mt-16 mb-8">
            <h3 className="text-xl font-semibold text-black mb-4 text-center font-bengali">
              অনুষ্ঠানসূচি
            </h3>

            <div className=" overflow-x-auto flex justify-center items-center">
              <table className="max-w-xl bg-blue-50 rounded-lg overflow-hidden shadow-sm text-sm md:text-lg">
                <thead>
                  <tr className=" ">
                    <th className="font-bengali text-left py-4 px-6 text-blue-900 font-semibold border-b-2 border-blue-700">
                      কার্যক্রম
                    </th>
                    <th className="font-bengali text-left py-4 px-6 text-blue-900 font-semibold border-b-2 border-blue-700">
                      সময়
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                    <td className="font-bengali py-4 px-6 text-gray-800 font-medium">
                      ঢাকা থেকে যাত্রা
                    </td>
                    <td className="font-bengali py-4 px-6 text-gray-700">
                      সকাল ৭.৩০ মিনিট
                    </td>
                  </tr>

                  <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                    <td className="font-bengali py-4 px-6 text-gray-800 font-medium">
                      রিসোর্টে উপস্থিতি
                    </td>
                    <td className="font-bengali py-4 px-6 text-gray-700">
                      সকাল ৮.৩০ মিনিট
                    </td>
                  </tr>

                  <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                    <td className="font-bengali py-4 px-6 text-gray-800 font-medium">
                      নাস্তা
                    </td>
                    <td className="font-bengali py-4 px-6 text-gray-700">
                      সকাল ৮.৩০ – ৯.৩০ মিনিট
                    </td>
                  </tr>

                  <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                    <td className="font-bengali py-4 px-6 text-gray-800 font-medium">
                      ইভেন্টসমূহ
                    </td>
                    <td className="font-bengali py-4 px-6 text-gray-700">
                      সকাল ১০.০০ – দুপুর ১.৩০টা
                    </td>
                  </tr>

                  <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                    <td className="font-bengali py-4 px-6 text-gray-800 font-medium">
                      মধ্যাহ্ন ভোজ
                    </td>
                    <td className="font-bengali py-4 px-6 text-gray-700">
                      দুপুর ১.৩০ – ২.৩০টা
                    </td>
                  </tr>

                  <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                    <td className="font-bengali py-4 px-6 text-gray-800 font-medium">
                      চা/কফি
                    </td>
                    <td className="font-bengali py-4 px-6 text-gray-700">
                      দিনব্যাপী
                    </td>
                  </tr>

                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="font-bengali py-4 px-6 text-gray-800 font-medium">
                      সাংস্কৃতিক অনুষ্ঠান ও রাফেল ড্র
                    </td>
                    <td className="font-bengali py-4 px-6 text-gray-700">
                      বিকাল ৩.০০ – ৫.০০টা
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Closing */}
          <div className="text-center  text-blue-900 mb-8">
            <p className="font-bengali text-lg">বিনীত,</p>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="font-bengali font-medium text-gray-800">
                ড. মোঃ গোলাম রসুল
              </p>
              <p className="font-bengali text-gray-700">সাধারণ সম্পাদক</p>
              <p className="font-bengali text-sm text-gray-600 mt-2">
                মোবাইল নং ০১৯১১১৬১৯২২
              </p>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="font-bengali font-medium text-gray-800">
                ড. একেএম সাইফুল্লাহ
              </p>
              <p className="font-bengali text-gray-700">সহসভাপতি</p>
              <p className="font-bengali text-sm text-gray-600 mt-2">
                মোবাইল নং ০১৯১১৬৯৭৬৩৬
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t-2 border-blue-600">
            <h2 className="text-center font-bengali text-xl sm:text-2xl font-bold text-blue-800">
              বাংলাদেশ পরমাণু শক্তি বিজ্ঞানী সংস (বায়েসা)
            </h2>
          </div>
        </div>
      </div>

      {/* Lottery Program Section - Image with Text */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Side - Image */}
            <div className="relative h-96 lg:h-auto">
              <img
                src="https://github.com/alzabid/Next-template/blob/main/public/lottery.jpg?raw=true"
                alt="Lucky Draw"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent" />
            </div>

            {/* Right Side - Text Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-block mb-4">
                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold uppercase">
                  Special Program
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Lucky Draw & Lottery
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Get ready for the most exciting part of the day! Our special
                lucky draw and lottery program offers amazing prizes for all
                participants. Every registered attendee will automatically
                receive a lottery ticket upon arrival.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">
                      Grand Prize
                    </h3>
                    <p className="text-gray-600">
                      Smart TV, Refrigerator, and other home appliances
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">
                      2nd & 3rd Prize
                    </h3>
                    <p className="text-gray-600">
                      Smartphones, tablets, and electronic gadgets
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">
                      Multiple Winners
                    </h3>
                    <p className="text-gray-600">
                      50+ consolation prizes including gift vouchers and hampers
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-lg">
                <p className="text-lg font-bold mb-2">
                  🎫 Lottery Draw Time: 3:00 PM - 4:00 PM
                </p>
                <p className="text-orange-100">
                  Don't miss this exciting opportunity! Be present during the
                  draw to claim your prize.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration CTA */}
      <div className=" py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
            Ready to Join Us?
          </h2>
          <p className="text-blue-900 text-lg mb-8">
            Register now to confirm your spot and receive your lottery ticket!
          </p>
          <button className="bg-blue-800 text-white px-8 py-3 rounded-lg cursor-pointer font-semibold hover:bg-blue-900 transition-colors duration-200 shadow-lg">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}
