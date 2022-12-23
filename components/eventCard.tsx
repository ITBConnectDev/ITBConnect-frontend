import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import sample from "../assets/sample.svg"
import viewsImage from "../assets/views.svg"
import { useWindowSize } from '../utils/windowsize'

interface EventCardProps {
    image: any,
    date: string,
    views: string,
    title: string,
    link: string
};

const EventCard: React.FC<EventCardProps> = ({image, date, views, title, link}) => {
    const changePage = () => {
        window.location.href = link;
    }

    const [windowSize, setWindowSize] = useState(0);
    const size = useWindowSize()
  
    useEffect(() => {
      setWindowSize(size.width);
  }, [size.width]);

    return (
        <div className="max-w-sm bg-white border-2 border-gray-200 rounded-lg" onClick={changePage}>
            <Image
                src={sample}
                alt="Picture of the author"
                className={`bg-no-repeat bg-contain rounded-t-lg`}
            />
            <div className="p-6">
                <div className={`flex ${windowSize > 1200 ? "justify-between" : "flex-col"} mb-2.5`}>
                    <p className='text-green-primary'>{date}</p>
                    <div className={`flex flex-row`}>
                        <Image
                            src={viewsImage}
                            alt="Picture of the author"
                            className={`rounded-t-lg`}
                        />
                        <p className='text-blue-primary ml-2.5'>{views}</p>
                    </div>
                </div>
                <div className='font-bold text-2xl'>
                    <h1>{title}</h1>
                </div>
            </div>
        </div>
    );
  }

export default EventCard;
