export default function Footer() {
  return (
    <footer className="py-8 bg-zinc-100 dark:bg-zinc-800/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 dark:text-zinc-400">
            © {new Date().getFullYear()} Sakibur Rahaman Chowdhury. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-zinc-600 dark:text-zinc-400">
              Made with ❤️ using Next.js & TailwindCSS
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
} 