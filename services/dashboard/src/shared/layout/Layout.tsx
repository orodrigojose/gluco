import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow p-4">{children}</main>
            <Footer />
        </div>
    )
}

export default Layout