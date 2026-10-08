import Link from 'next/link';

export default function PostDetail({ post, author }) {
  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col justify-between">
      <div className="p-8 max-w-3xl mx-auto w-full">
        {/* Tombol Kembali */}
        <Link 
          href="/" 
          className="text-teal-700 font-medium hover:underline text-sm mb-6 inline-block"
        >
          &larr; Kembali ke Katalog
        </Link>

        {/* Card Detail Artikel */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100">
          <div className="border-b border-gray-100 pb-4 mb-6">
            <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-3 py-1 rounded-full">
              ID Artikel: {post.id}
            </span>
            <h1 className="text-3xl font-bold mt-3 text-gray-900 capitalize">
              {post.title}
            </h1>
          </div>

          {/* Isi Body Artikel */}
          <p className="text-gray-700 leading-relaxed text-lg mb-8">
            {post.body}
          </p>

          {/* Fitur Pengembangan: Author Info Box */}
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-5 mt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-800 mb-2">
              Informasi Penulis
            </h3>
            <div className="space-y-1 text-sm text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Nama:</span> {author.name}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Email:</span> {author.email}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Perusahaan:</span> {author.company?.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Komponen */}
      <footer className="bg-emerald-900 text-emerald-100 py-4 text-center text-sm border-t border-emerald-800 mt-12">
        <p>© 2026 Kelompok 3 - Praktikum Development & Deployment (SSG Next.js)</p>
      </footer>
    </div>
  );
}

// 1. Menentukan 12 ID artikel yang digenerate statis saat build
export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=12');
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

// 2. Fetching data Artikel + Data Penulis (Author)
export async function getStaticProps({ params }) {
  // Fetch data artikel spesifik
  const resPost = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  const post = await resPost.json();

  // Fetch data author berdasarkan post.userId
  const resUser = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
  const author = await resUser.json();

  return {
    props: {
      post,
      author, // Dikirim sebagai props ke komponen PostDetail
    },
  };
}