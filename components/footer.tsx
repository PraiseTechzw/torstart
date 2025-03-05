export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Data Structures & Algorithms. Created with ❤️ by Praise Masunga(PraiseTech).
        </p>
      </div>
    </footer>
  )
}

