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
      <p class="text-lg mb-6 font-semibold text-red-700">"साहित्यिक सँधार" मा तपाईंलाई स्वागत छ — नेपाली साहित्यप्रेमीहरूको लागि समर्पित एक अनलाइन थलो।</p>
      <p class="mb-4 text-gray-700 leading-relaxed">
        हाम्रो ब्लग नेपाली भाषा, साहित्य र संस्कृतिप्रतिको गहिरो प्रेमबाट प्रेरित छ। परम्परागत गद्य, कविता, समीक्षादेखि नयाँ पुस्ताको आवाजसम्म — हामी विविध र समृद्ध साहित्यिक अभिव्यक्तिहरूलाई प्रवाह गर्ने उद्देश्य राख्छौं।
      </p>
      <ul class="list-disc list-inside mb-4 text-gray-700 space-y-1">
        <li>मौलिक कविता, कथा र निबन्ध</li>
        <li>साहित्यिक समीक्षा र विश्लेषण</li>
        <li>स्रष्टा परिचय तथा अन्तर्वार्ता</li>
        <li>नेपाली साहित्यको अंग्रेजी अनुवाद</li>
      </ul>
      <p class="mb-4">
        यदि तपाईं साहित्यप्रेमी हुनुहुन्छ, लेखक बन्न चाहनुहुन्छ वा नेपाली साहित्यका बारेमा बुझ्न चाहनुहुन्छ भने — तपाईं बिल्कुलै सही ठाउँमा हुनुहुन्छ।
      </p>

      <div class="mt-8 space-y-6">
        <div>
          <h2 class="text-2xl font-semibold text-gray-800 mb-1">हाम्रो दृष्टिकोण</h2>
          <p class="text-gray-700">नेपाली साहित्यको माध्यमबाट पुस्ता र भौगोलिक सीमाहरूसँग सम्बन्ध विस्तार गर्नु।</p>
        </div>
        <div>
          <h2 class="text-2xl font-semibold text-gray-800 mb-1">हाम्रो उद्देश्य</h2>
          <p class="text-gray-700">नेपाली लेखकहरूलाई प्रवर्धन गर्नु, नयाँ पाठकसँग साहित्यलाई जोड्नु र सांस्कृतिक संवादलाई बलियो बनाउनु।</p>
        </div>
      </div>
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