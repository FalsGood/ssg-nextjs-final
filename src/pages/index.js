import Link from 'next/link';

export default function Home({ posts }) {
  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col justify-between">
      {/* Container Utama */}
      <div className="p-8 max-w-5xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-2 text-emerald-900">
          Katalog Artikel (SSG) - Kelompok 3
        </h1>
        <p className="text-emerald-700 mb-6">
          Halaman ini dibuat menggunakan Static Site Generation (getStaticProps).
        </p>

        {/* Grid Artikel */}
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="bg-white p-5 rounded-xl shadow-sm border border-emerald-100 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">
                  Artikel #{post.id}
                </span>
                <h2 className="text-lg font-bold mt-1 mb-2 capitalize text-gray-800 line-clamp-1">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {post.body}
                </p>
              </div>
              <Link 
                href={`/posts/${post.id}`} 
                className="inline-block text-center bg-teal-600 text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition"
              >
                Baca Selengkapnya &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Komponen */}
      <footer className="bg-emerald-900 text-emerald-100 py-4 text-center text-sm border-t border-emerald-800 mt-12">
        <p>© 2026 Kelompok 3 - Praktikum Development & Deployment (SSG Next.js)</p>
      </footer>
    </div>
  );
}

// Fetching data pada saat BUILD TIME
export async function getStaticProps() {
  // Ubah limit dari 10 menjadi 12 artikel
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=12');
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}