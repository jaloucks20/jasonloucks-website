import { Github } from 'lucide-react'

export default function Projects() {
    return (
    <section id="projects" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="flex text-4xl sm:text-5xl md:text-6xl font-medium font-vscode uppercase tracking-[0.2em] text-white antialiased justify-center mb-12">
          PROJECTS
        </h2>

        <div className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="bg-gradient-to-br from-[#15246b]/60 to-[#200b58]/50 rounded-lg shadow-md p-6 border border-purple-500/10">
                    <h3 className="text-2xl font-semibold text-white/90 text-center">
                    Visualization Software
                    </h3>

                    <p className="mt-2 text-gray-300 text-center">
                    Software to visualize and disassemble/reassemble car components for advertising purposes.
                    </p>

                    <p className="mt-2 text-gray-400 text-center">
                    Tools: Unreal Engine, Blueprint, Node.js, Python
                    </p>
                </div>

                <div className="bg-gradient-to-br from-[#15246b]/60 to-[#200b58]/50 rounded-lg shadow-md p-6 border border-gray-500/10">
                    <h3 className="text-2xl font-semibold text-white/90 text-center">
                    NFL Statistics Database
                    </h3>

                    <p className="mt-2 text-gray-300 text-center">
                    Database that held player, team, coach, and other information about NFL players.
                    </p>

                    <p className="mt-2 text-gray-400 text-center">
                    Tools: MySQL, Python
                    </p>
                </div>

                <div className="bg-gradient-to-br from-[#15246b]/60 to-[#200b58]/50 rounded-lg shadow-md p-6 border border-gray-500/10">
                    <h3 className="text-2xl font-semibold text-white/90 text-center">
                    ChatGPT Chess Engine
                    </h3>

                    <p className="mt-2 text-gray-300 text-center">
                    Flask app that allowed a user to play chess against OpenAI.
                    </p>

                    <p className="mt-2 text-gray-400 text-center">
                    Tools: OpenAI API, Python, Flask
                    </p>
                    <div className="flex justify-center">
                        <a href="https://github.com/Jaloucks/ChessGPT/tree/main" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-blue-400 hover:underline transform transition-all duration-200 ease-out hover:-translate-y-[2px] bg-black/70 px-4 py-2 rounded-md">
                                <Github className="inline-block w-5 h-5 mr-2" />
                            GitHub
                        </a>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-[#15246b]/60 to-[#200b58]/50 rounded-lg shadow-md p-6 border border-gray-500/10">
                    <h3 className="text-2xl font-semibold text-white/90 text-center">
                    Anonymous Social Media Platform
                    </h3>

                    <p className="mt-2 text-gray-300 text-center">
                    Website that allowed Kettering students to post, share, and upvote anonymously.
                    </p>

                    <p className="mt-2 text-gray-400 text-center">
                    Tools: Firebase, Python, HTML, CSS, OpenAI API
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}