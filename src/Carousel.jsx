import { useEffect, useState } from "react";
import { shortList } from "./data";
import List from "./data";
import { FaQuoteRight } from "react-icons/fa";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";



let Carousel = () => {

    let [people, setPeople] = useState(List);

    let [currentPerson, setCurrentPerson] = useState(0);


    let prevBtn = () => {
        setCurrentPerson((oldPerson) => {
            let result = (oldPerson - 1 + people.length) % people.length
            return result;
        })
    }
    let nextBtn = () => {
        setCurrentPerson((oldPerson) => {
            let result = (oldPerson + 1) % people.length
            return result;
        })
    }

    useEffect(() => {
        let id = setInterval(() => {
            nextBtn()
        }, 2000)
        return () => { clearInterval(id) }
    }, [currentPerson])

    return (
        <div className="carousel-container">
            {people.map((person, index) => {
                let { id, image, name, title, quote } = person;
                return (
                    <article className="slide" style={{ transform: `translateX(${100 * (index - currentPerson)}%)`, opacity: index === currentPerson ? 1 : 0, visibility: index === currentPerson ? 'visible' : 'hidden' }} key={id}>
                        <img src={image} alt="" className="slide-img" />
                        <h4 className="name">{name}</h4>
                        <p className="title">{title}</p>
                        <p className="text">{quote}</p>
                        <FaQuoteRight className="quote-icon" />
                    </article>
                )
            })}
            <button type="button" onClick={prevBtn}><AiOutlineLeft className="left-btn btn" /></button>
            <button type="button" onClick={nextBtn}><AiOutlineRight className="right-btn btn" /></button>
        </div>
    )
}


export default Carousel;