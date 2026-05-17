import React from 'react'
import SplitText from '../SplitText/SplitText'

const Home = () => {
    return (
        <section id='Home' className='w-100 h-screen bg-black flex items-center justify-center'>
            <div>
                <SplitText
                    text="Hi, I'm Rafael Jove Wicaksono"
                    className="text-2xl font-semibold text-center"
                    delay={50}
                    duration={1.25}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                    onLetterAnimationComplete={() => console.log('Animation complete!')}
                    showCallback
                />
            </div>
        </section>
    )
}

export default Home