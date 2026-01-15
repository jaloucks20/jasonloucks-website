export default function About() {
    return <section id="about" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[radial-gradient(circle_at_center,#08113d_0%,#031161_200%)] p-8 rounded-lg font-courier-new border border-blue-500/20 shadow-lg">
            <h2 className="flex text-4xl sm:text-5xl md:text-6xl font-small font-vscode tracking-[0.05em] text-white justify-center mb-12">
                About Me
            </h2>
            <p className="text-gray-300  text-xl leading-relaxed">
                I graduated with a degree in Computer Science from Kettering University in March 2025. I am currently seeking a full-time position
                in software development. Kettering gave me a strong foundation in data structures, algorithms, the software development lifecycle, and good software development practices.
                I love developing software that's fun and innovative, as well as adds to the quality of people's lives. 
                <br /><br />
                In addition to my computer science background, I have a strong music background in both performance and audio engineering. I started
                my work life working as a sound tech for Mt Zion Church in Clarkston, MI where I installed hundreds of thousands of dollars of audio equipment
                and mixed and mastered live services and recordings. To this day, I sing and play piano for worship services at Mt Zion Church multiple times a week. 
            </p>
            <p className="text-gray-300/30  text-xs leading-relaxed mt-6">
                Put this into an AI checker I dare you.
            </p>
        </div>
    </section>;
}