"use client"

import type React from "react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Database,
  GitBranch,
  Search,
  SortAsc,
  Network,
  GitFork,
  Workflow,
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const sidebarItems = [
  { icon: LayoutDashboard, title: "Introduction", href: "/introduction" },
  { icon: Database, title: "Data Structures", href: "/data-structures" },
  { icon: GitBranch, title: "Algorithms", href: "/algorithms" },
  { icon: GitFork, title: "Trees", href: "/trees" },
  { icon: Search, title: "Searching Techniques", href: "/searching" },
  { icon: SortAsc, title: "Sorting Algorithms", href: "/sorting" },
  { icon: Network, title: "Graphs", href: "/graphs" },
  { icon: Workflow, title: "Advanced Algorithms", href: "/advanced-algorithms" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <motion.aside
        className="bg-white dark:bg-gray-800 w-64 fixed h-full overflow-hidden transition-all duration-300 ease-in-out"
        animate={{ width: sidebarOpen ? 256 : 64 }}
      >
        <div className="flex items-center justify-between p-4">
          <h1
            className={`text-xl font-bold ${sidebarOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
          >
            DSA Learning
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <nav className="space-y-2 p-2">
            {sidebarItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button variant={pathname === item.href ? "secondary" : "ghost"} className="w-full justify-start">
                  <item.icon className="mr-2 h-4 w-4" />
                  <span className={`${sidebarOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
                    {item.title}
                  </span>
                </Button>
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </motion.aside>

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? "ml-64" : "ml-16"}`}
      >
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
          <div className="container mx-auto">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

