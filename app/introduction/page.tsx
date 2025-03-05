"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Code, FileText, Lightbulb, Target } from "lucide-react"
import Link from "next/link"

const courseOutline = [
  { title: "Data Structures Fundamentals", href: "/data-structures" },
  { title: "Algorithm Basics and Analysis", href: "/algorithms" },
  { title: "Trees and Graph Structures", href: "/trees" },
  { title: "Searching and Sorting Techniques", href: "/searching" },
  { title: "Advanced Algorithms", href: "/graphs" },
]

const learningObjectives = [
  "Understand fundamental data structures and their applications",
  "Analyze algorithm efficiency using Big O notation",
  "Implement and optimize various algorithms",
  "Solve complex problems using appropriate data structures and algorithms",
  "Develop critical thinking and problem-solving skills",
]

export default function IntroductionPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <motion.h1
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to Data Structures and Algorithms
      </motion.h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="objectives">Learning Objectives</TabsTrigger>
          <TabsTrigger value="outline">Course Outline</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Course Overview</CardTitle>
              <CardDescription>An introduction to the world of Data Structures and Algorithms</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                This course is designed to provide you with a comprehensive understanding of data structures and
                algorithms, essential components in computer science and software development. You'll learn how to:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Efficiently organize and manipulate data</li>
                <li>Design and implement algorithms to solve complex problems</li>
                <li>Analyze the performance and efficiency of different approaches</li>
                <li>Apply these concepts to real-world scenarios</li>
              </ul>
              <p>
                Whether you're a beginner or looking to refresh your knowledge, this course will equip you with the
                skills needed to excel in technical interviews and build efficient software systems.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="objectives">
          <Card>
            <CardHeader>
              <CardTitle>Learning Objectives</CardTitle>
              <CardDescription>What you'll achieve by the end of this course</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {learningObjectives.map((objective, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Target className="mr-2 h-5 w-5 text-primary" />
                    <span>{objective}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="outline">
          <Card>
            <CardHeader>
              <CardTitle>Course Outline</CardTitle>
              <CardDescription>A roadmap of topics we'll cover</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {courseOutline.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <span className="flex items-center">
                      <BookOpen className="mr-2 h-5 w-5 text-primary" />
                      {item.title}
                    </span>
                    <Link href={item.href}>
                      <Button variant="outline" size="sm">
                        Explore <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="mr-2 h-5 w-5" /> Interactive Coding Exercises
            </CardTitle>
          </CardHeader>
          <CardContent>Practice your skills with hands-on coding challenges and receive instant feedback.</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" /> Comprehensive Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            Access a wealth of articles, videos, and additional materials to deepen your understanding.
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="mr-2 h-5 w-5" /> Why Learn Data Structures and Algorithms?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Data Structures and Algorithms form the backbone of computer science and are crucial for:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Improving problem-solving skills</li>
            <li>Optimizing software performance</li>
            <li>Excelling in technical interviews</li>
            <li>Understanding the fundamentals of computer systems</li>
            <li>Developing efficient and scalable applications</li>
          </ul>
        </CardContent>
      </Card>

      <div className="text-center mt-8">
        <Link href="/data-structures">
          <Button size="lg">
            Start Learning Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

