import React, { useState } from 'react';
import {Link} from 'react-router-dom'

// Example data with categories added for filtering
const literatureMenu = [
  { title: "मुनामदान", slug: "munamadan", category: "कविता", author: "लक्ष्मीप्रसाद देवकोटा", description: "नेपाली साहित्यको सबैभन्दा लोकप्रिय महाकाव्यात्मक कविता।", image: "https://upload.wikimedia.org/wikipedia/en/9/9f/Muna_madan_book_cover.jpg" },
  { title: "शिरीषको फूल", slug: "shirishko-phool", category: "उपन्यास", author: "परिजात", description: "एक उपन्यास जसले जटिल भावना र मानवीय सम्बन्धलाई चित्रण गर्छ।", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1537332295i/38489009.jpg" },
  { title: "बसाइँ", slug: "basain", category: "उपन्यास", author: "डायमण्ड शम्शेर राणा", description: "गाउँले जीवनका सामाजिक वास्तविकता र कष्टहरूलाई प्रस्तुत गर्ने उपन्यास।", image: "https://upload.wikimedia.org/wikipedia/en/7/7b/Basain_cover.jpg" },
  { title: "सेतो बाघ", slug: "seto-bagh", category: "ऐतिहासिक", author: "डायमण्ड शम्शेर राणा", description: "राणाकालको अन्तिम दिनहरूमा आधारित ऐतिहासिक उपन्यास।", image: "data:image/jpeg;base64,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" },
  { title: "पल्पसा क्याफे", slug: "palpasa-cafe", category: "उपन्यास", author: "नारायण वाग्ले", description: "नेपालको गृहयुद्धले मानिसहरूको जीवनमा पार्ने प्रभावलाई उजागर गर्ने उपन्यास।", image: "https://upload.wikimedia.org/wikipedia/en/0/0f/Palpasa_Cafe.jpg" }
];

// Extract unique categories plus an "All" option
const categories = ["सबै", ...new Set(literatureMenu.map(item => item.category))];

const BlogList = () => {
  const [selectedCategory, setSelectedCategory] = useState("सबै");

  // Filter literature based on category selection
  const filteredLiterature = selectedCategory === "सबै" 
    ? literatureMenu 
    : literatureMenu.filter(item => item.category === selectedCategory);

  return (
    <>
      {/* Category buttons */}
      <div className="flex justify-center flex-wrap gap-4 mb-8">
       
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-semibold transition
              ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-100'}
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {filteredLiterature.map((item) => (
          <div
            key={item.slug}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-fill"
            />
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">{item.title}</h2>
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full whitespace-nowrap">
                  {item.category}
                </span>
              </div>
              <h3 className="text-gray-700 mb-2">लेखक: {item.author}</h3>
              <p className="text-gray-600 flex-grow">{item.description}</p>
              <Link
                to={`/blog/${item.slug}`}
                className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-semibold"
              >
                थप पढ्नुहोस् &rarr;
              </Link>
            </div>
          </div>
        ))}
         
      </div>
      
    </>
  );
};

export default BlogList;
