import Link from "next/link"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "@/components/theme-provider"

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Data Structures & Algorithms
        </Link>
        <nav className="flex items-center space-x-4">
          <ThemeSwitcher />
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://github.com/your-github-username/data-structures-algorithms"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </a>
          </Button>
        </nav>
      </div>
    </header>
  )
}

