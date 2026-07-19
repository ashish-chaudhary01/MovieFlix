function Footer() {
  return (
    <footer className="w-full border-t border-[#404040]">
      <div className="max-w-5xl mx-auto flex flex-col gap-2 sm:flex-row sm:justify-between items-center py-6 px-4">
        {/* logo and naming */}
        <div className="flex gap-3 items-center">
          <span className="text-white font-bold text-md">
            Movie<span className="text-red-500">Flix</span>
          </span>
          <span className="text-[#404040] text-xs">•</span>
          <p className="text-[#404040] text-xs">
            Developed by{" "}
            <span className="text-gray-400 font-semibold">
              Ashish Chaudhary
            </span>
          </p>
        </div>
        {/* tmdb naming and copyright */}
        <div className="flex justify-between gap-3 text-xs">
          <span className="text-[#404040]">© 2026 MovieFlix</span>
          <span className="text-[#404040] text-xs">•</span>
          <span className="text-[#404040]">
            Data by{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6b7280] hover:text-white underline underline-offset-2 "
              href="http://themoviedb.org"
            >
              TMDB
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
