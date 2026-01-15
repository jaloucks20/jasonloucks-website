export default function Education() {
  return (
    <section id="education" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="flex text-4xl sm:text-5xl md:text-6xl font-medium font-vscode uppercase tracking-[0.2em] text-white antialiased justify-center mb-12">
          EDUCATION
        </h2>

        <div className="space-y-8">
            <div className="bg-gradient-to-r from-[#191277]/50 to-[#021d74]/50 rounded-lg shadow-md p-6">
                <div className="flex flex-col lg:flex-row lg:items-start">
                    
                    {/* Left column */}
                    <div>
                        <h3 className="text-2xl font-semibold text-white/90">
                            B.S. in Computer Science
                        </h3>

                        {/* Location (always left) */}
                        <p className="text-gray-300 tracking-wide">
                            Kettering University, Flint MI
                        </p>
                    </div>

                    {/* Dates (right only on large) */}
                    <p className="text-gray-400 mt-2 lg:mt-0 lg:ml-auto lg:text-right">
                    July 2022 – March 2025
                    </p>

                </div>
            </div>

            <div className="bg-gradient-to-r from-[#191277]/50 to-[#021d74]/50 rounded-lg shadow-md p-6">
                <div className="flex flex-col lg:flex-row lg:items-start">
                    
                    {/* Left column */}
                    <div>
                        <h3 className="text-2xl font-semibold text-white/90">
                            Master Recording II
                        </h3>

                        {/* Location (always left) */}
                        <p className="text-gray-300 tracking-wide">
                            Conservatory of Recording Arts and Sciences, Tempe AZ
                        </p>
                    </div>

                    {/* Dates (right only on large) */}
                    <p className="text-gray-400 mt-2 lg:mt-0 lg:ml-auto lg:text-right">
                        July 2020 - June 2021
                    </p>

                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
