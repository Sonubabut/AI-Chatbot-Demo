import React from "react"
import "./About.css"

const AboutCard = () => {
    return (
        <>
          <div className='aboutCard mtop flex_space'>
            <div className='row row1'>
                <h4 style={{color: "#31b675"}}>About Us</h4>
                <h1>
                    We <span>provide Solution</span> for your Brand.
                </h1>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit amet consectetur piscing elit amet consectetur adipiscing elit sed et eletum nulla eu placerat felis etiam tincidunt orci lacus id varius dolor fermum sit amet.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit amet consectetur piscing elit amet consectetur adipiscing elit sed et eletum nulla eu placerat felis etiam tincidunt orci lacus id varius dolor fermum sit amet.</p>
                <button className='secondary-btn'>
                Explore More <i className='fas fa-long-arrow-alt-right'></i>
                </button>
                </div>
                <div className='row image'>
                    <img src='https://test.digitalt3.com/wp-content/uploads/2024/04/ai.png' alt='' style={{ width: "200px", margin: "auto" }} />
                    <div className='control-btn'>
                        <button className='prev'>
                            <i className='fas fa-play'></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutCard