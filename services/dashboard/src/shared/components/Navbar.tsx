const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-xl">Glucolog</div>
                <div>
                    <a href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                    <a href="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;