import {
  About,
  Contact,
  Footer,
  Hero,
  Navbar,
  Projects,
  Skills,
  WorkExperience,
  World,
} from '@/components'

const Home = () => {
  return (
    <div>
      <div className="relative">
        <Navbar />
        <div className="gradient-main z-0" />
        <Hero />
      </div>
      <div className="relative">
        <About />
        <div className="gradient-projects z-0" />
        <Skills />
      </div>
      <div className="relative">
        <Projects />
        {/* <div className="gradient-exp z-0" /> */}
      </div>
      <div className="relative">
        <WorkExperience />
        <div className="gradient-exp z-0" />
      </div>
      <World />
      <div className="relative">
        <Contact />
        <div className="gradient-contact z-0" />
        {/* <Testimonial /> */}
      </div>
      <Footer />
    </div>
  )
}

export default Home
