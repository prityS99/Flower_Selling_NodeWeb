"use client";

const reviews = [
  {
    id: 1,
    name: "Ananya Sharma",
    review: "The flowers were fresh and beautifully arranged. Delivery was fast!",
  },
  {
    id: 2,
    name: "Rahul Verma",
    review: "Best online flower shop I’ve used. Highly recommended!",
  },
  {
    id: 3,
    name: "Priya Kapoor",
    review: "The bouquet looked exactly like the picture. Loved it!",
  },
];

export default function Reviews() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-4xl font-bold mb-12">
          ⭐ Customer Reviews
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition"
            >
              <p className="text-gray-600 italic mb-6">
                "{review.review}"
              </p>

              <h4 className="font-semibold text-lg">
                {review.name}
              </h4>

              <div className="text-yellow-400 mt-2">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}