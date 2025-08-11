export function Footer() {
  return (
    <footer className="mt-16 border-t border-muted bg-white">
      <div className="container py-10 text-sm text-neutral-600">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Outliers Academy. All rights reserved.
          </div>
          <nav className="flex items-center gap-4">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
} 