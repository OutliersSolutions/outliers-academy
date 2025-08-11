

const DecorativeShapes = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Gradiente circular */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl animate-float"></div>

            {/* Blob shape 1 */}
            <div className="absolute top-1/4 -left-12 w-40 h-40 bg-gradient-to-r from-blue-100/40 to-teal-100/40 shape-blob blur-xl animate-float" style={{ animationDelay: '1s' }}></div>

            {/* Blob shape 2 */}
            <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-gradient-to-r from-amber-100/30 to-pink-100/30 shape-blob blur-lg animate-float" style={{ animationDelay: '2s' }}></div>

            {/* Small dots */}
            <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-blue-400/40 rounded-full"></div>
            <div className="absolute top-2/3 left-1/4 w-2 h-2 bg-purple-400/40 rounded-full"></div>
            <div className="absolute top-1/2 right-1/2 w-3 h-3 bg-teal-400/40 rounded-full"></div>
            <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-amber-400/40 rounded-full"></div>

            {/* Líneas decorativas */}
            <div className="absolute bottom-10 left-10 w-20 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent transform rotate-45"></div>
            <div className="absolute top-20 right-1/4 w-16 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent transform -rotate-45"></div>
        </div>
    );
};

export default DecorativeShapes;
