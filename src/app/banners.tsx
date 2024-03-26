import { useEffect, useState } from 'react';

const Slideshow = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  const images = [
    "https://img.freepik.com/free-photo/autumn-leaf-falling-revealing-intricate-leaf-vein-generated-by-ai_188544-9869.jpg?w=996&t=st=1710934563~exp=1710935163~hmac=e97178c84e905e2d4c432b27aab84df721b89938a278c37de6c90b6627623345",
    "https://as1.ftcdn.net/v2/jpg/04/18/75/26/1000_F_418752635_XU3uny3DyxsmppgyBrM4cGyRDjkwCJ7Z.jpg",
    "https://as1.ftcdn.net/v2/jpg/05/13/76/16/1000_F_513761687_X4knt8rQcPYwxMd6OOAMtSXhozfyiyYl.jpg",
    "https://img.freepik.com/free-photo/top-view-carrots-plate_23-2148678874.jpg?t=st=1710906748~exp=1710907348~hmac=4b5afb6e30a28956156aeb1b2f5f2f537b82384e2473437841488b9155c191f7",
  ];

  useEffect(() => {
    showSlides(slideIndex);
  }, [slideIndex]);

  function currentSlide(n: number) {
    setSlideIndex(n);
  }

  function showSlides(n: number) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    

    if (slides.length === 0 || dots.length === 0) {
      return;
    }

  
    for (let i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.display = "none";
      (dots[i] as HTMLElement).className = (dots[i] as HTMLElement).className.replace(" active", "");
    }

 
    (slides[n - 1] as HTMLElement).style.display = "block";
    (dots[n - 1] as HTMLElement).className += " active";
  }

  return (

    <>
    <div className='w-3/4 m-auto mt-8 mb-8'>
  <h1 className='text-teal-500 text-base font-medium tracking-wide text-center'>KEA.CARE helps your families find caregivers Easily, Efficiently, Conveniently, Reliably, and Affordably</h1>
</div>
    <div className="slideshow-container w-11/12 mx-auto relative">
      {images.map((imageUrl, index) => (
        <div className="mySlides fade relative" key={index}>
          <img src={imageUrl} className="w-full h-96" />
        
          <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center mb-4">
            {images.map((_, dotIndex) => (
              <button
              className={`dot ${slideIndex === dotIndex + 1 ? 'active' : ''} mx-1 w-4 h-4 border-orange-700 border-2 rounded-full focus:outline-none ${slideIndex === dotIndex + 1 ? 'bg-teal-400' : 'bg-gray-300'}`}
              onClick={() => currentSlide(dotIndex + 1)}
              key={dotIndex}
              ></button>
              ))}
          </div>
        </div>
      ))}
    </div>
      </>
  );

  




};

export default Slideshow;
