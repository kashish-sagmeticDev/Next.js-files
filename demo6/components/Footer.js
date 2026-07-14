// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto py-6">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} MyBlog. All rights reserved.</p>
      </div>
    </footer>
  );
}