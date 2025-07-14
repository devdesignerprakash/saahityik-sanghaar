import React from 'react'
import Footer from '../components/footer'

const About = () => {
  return (
    <>
    {/* <!-- Unified Main Container --> */}
   <main class="max-w-7xl mx-auto px-4 py-16 space-y-20">

    {/* <!-- About Section --> */}
    <section class="bg-white rounded-xl shadow-xl p-10 md:p-16 border-l-4 border-red-600">
      <h1 class="text-4xl font-bold text-blue-700 mb-6">हाम्रो बारेमा</h1>
      <p class="text-lg mb-6 font-semibold text-red-700">हार्दिक स्वागत छ–शब्द, श्रृङ्गार र र्सिजनाको दुनियाँमा । यहाँहरुकै साहित्य घर “साहित्यिक सङ्घार” ।</p>
      <p class="mb-4 text-gray-700 leading-relaxed">
        `साहित्यिक सङ्घार´ अर्थात यहाँहरुको साहित्यिक घर एउटा अभिलाषाको मूर्त रूप हो । त्यो अभिलाषा नितान्त नेपाली वाङ्मयको प्रवर्द्धन हो जसको जन्म काठमाडौंको एउटा चिया घरमा भएको हो, केही साहित्य अनुरागीहरूको चियाचर्चाको दौरान । थुप्रै नेपाली युवाहरू परोक्ष वा अपरोक्ष रूपमा साहित्य सिर्जनामा समर्पित भएतापनि त्यी सिर्जनाहरु विभिन्न माध्यममा छरिएर रहेको अवस्था छ । यस्तो अवस्थामा  एउटा साझा डिजिटल प्ल्याटफर्ममा त्यी सिर्जनाहरूलाई सङ्ग्रह गरी सिर्जनशीलता र प्राज्ञिकतालाई बढवा दिनु  हाम्रो उद्देश्य हो । 

      </p>
      <p class="mb-4">
        नेपाली साहित्यको गौरवपूर्ण इतिहासको अनुशीलन तथा सम्वर्द्धनलाई हामीले हाम्रो कर्तव्य ठानेका छौँ । त्यस्ता युवाहरू जो नेपाली साहित्यको विराट शब्द कुञ्जमा प्रवेश गर्न चाहन्छ्न्, उनीहरूको लागि `साहित्यिक सङ्घार´ एउटा बलियो प्रवेशद्वार बन्न सकोस् । यहाँहरूको सिर्जनालाई हामी हार्दिक स्वागत गर्दछौं ।
। यदि तपाईं साहित्यप्रेमी हुनुहुन्छ, लेखक बन्न चाहनुहुन्छ वा नेपाली साहित्यका बारेमा बुझ्न चाहनुहुन्छ भने — तपाईं बिल्कुलै सही ठाउँमा हुनुहुन्छ।
      </p>
    </section>

    {/* <!-- Our Team Section --> */}
    <section>
      <h2 class="text-3xl font-bold text-center text-red-600 mb-10">हाम्रो टिम</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

        {/* <!-- Team Member 1 --> */}
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
          <img class="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-blue-100 object-cover" src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=faces&fit=crop&w=200&h=200" alt="Saraswati Sharma"/>
          <h3 class="text-xl font-semibold text-gray-800 text-center">सरस्वती शर्मा</h3>
          <p class="text-sm text-blue-600 text-center mb-2">संस्थापक तथा प्रधान सम्पादक</p>
          <p class="text-gray-600 text-sm text-center">१५ वर्षभन्दा बढी साहित्यिक अनुभव भएकी सरस्वतीले ब्लगको सम्पादकीय दिशा तय गर्नुहुन्छ।</p>
        </div>

        {/* <!-- Team Member 2 --> */}
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
          <img class="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-blue-100 object-cover" src="https://images.unsplash.com/photo-1614285302321-b6b10cd1c3e8?crop=faces&fit=crop&w=200&h=200" alt="Ram Prasad Gautam"/>
          <h3 class="text-xl font-semibold text-gray-800 text-center">रामप्रसाद गौतम</h3>
          <p class="text-sm text-blue-600 text-center mb-2">साहित्यिक विश्लेषक</p>
          <p class="text-gray-600 text-sm text-center">परम्परागत साहित्य र अनुवादमा गहिरो रुचि। रामप्रसादले समीक्षात्मक सामग्री तयार गर्नुहुन्छ।</p>
        </div>

        {/* <!-- Team Member 3 --> */}
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
          <img class="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-blue-100 object-cover" src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?crop=faces&fit=crop&w=200&h=200" alt="Anisha Thapa"/>
          <h3 class="text-xl font-semibold text-gray-800 text-center">अनिशा थापा</h3>
          <p class="text-sm text-blue-600 text-center mb-2">सामग्री योजनाकार</p>
          <p class="text-gray-600 text-sm text-center">अनिशा सम्पादकीय तालिका र डिजिटल मिडिया व्यवस्थापनमा संलग्न छिन्।</p>
        </div>

      </div>
    </section>
  </main>
  <Footer/>
  </>
  )
}

export default About