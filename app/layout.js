export const metadata = {
  title: "Arya Samaj Seawoods",
  description: "Official website of Arya Samaj Seawoods – Promoting Vaidik wisdom, social reform, education, and spiritual awakening.",
  alternates: {
    canonical: "https://www.aryasamajseawoods.co.in",
    languages: {
      "en": "https://www.aryasamajseawoods.co.in/en",
      "hi": "https://www.aryasamajseawoods.co.in/hi",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* You can add more tags here if needed */}
        <meta name="language" content="en" />
        <meta httpEquiv="Content-Language" content="en" />
      </head>
      <body className="bg-orange-50 font-sans text-gray-900">{children}</body>
    </html>
  );
}
