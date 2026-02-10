import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Training from './components/Training'
import Registration from './components/Registration'
import FutureEvents from './components/FutureEvents'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-navy-900 text-white font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Training />
        <Registration />
        <FutureEvents />
      </main>
      <Footer />
    </div>
  )
}
