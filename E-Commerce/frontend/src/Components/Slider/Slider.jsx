import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./Slider-data";
import { useEffect, useState } from "react";
import "./Slider.scss"



const Slider = () => {

    const [currentSlide,setCurrentSlide] = useState(0)

    const SliderLength = sliderData.length

    const AutoScroll = true

    let SlideInterval

    let IntervalTime = 6000

    const NextSlide = () => {
        setCurrentSlide(currentSlide === SliderLength - 1 ? 0 : currentSlide + 1)
    }

    const PreviousSlide = () => {
        setCurrentSlide(currentSlide === 0 ? SliderLength -1 : currentSlide -1)
    }

    useEffect(()=>{
        setCurrentSlide(0)
    },[])

    // const auto = () => {
    //     SlideInterval = setInterval(NextSlide,IntervalTime)
    // }

    useEffect(()=>{
        if(AutoScroll){
            const auto = () => {
                SlideInterval = setInterval(NextSlide,IntervalTime)
            }
            auto()
        }
        return () => clearInterval(SlideInterval)
    },[currentSlide,SlideInterval,AutoScroll])

  return (
    <div className="slider">
      
        <AiOutlineArrowLeft className="arrow prev" onClick={PreviousSlide}/>
        <AiOutlineArrowRight className="arrow next" onClick={NextSlide}/>

        {sliderData.map((slide,index)=>{

            const {image,heading,desc} = slide

            return(
                <div className={index === currentSlide ? "slide current" : "slide"} key={index}>
                    {index === currentSlide && (
                        <>
                            <img src={image}/>
                            <div className="content">
                                <h2>{heading}</h2>
                                <p className="text-amber-400 font-bold text-3xl">{desc}</p>
                                <hr/>
                                <a href="#product" className="--btn --btn-primary cursor-pointer">SHOP</a>
                            </div>
                        </>
                    )}
                </div>
            )
        })}

    </div>
  )
}

export default Slider