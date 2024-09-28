export interface Slide {
    fullBackground: string;
    slideBackground: string;
    project: string;
    content: string;
    liveLink: string;
    githubLink: string;
  }
  
  export interface LazySlideProps {
    background: string;
    size: string;
    radius: number;
    angle: number;
    scale: number;
    className: string;
    label: string;
    hidden: boolean;
  }
  
  export interface CarouselProps {
    slides: Slide[];
    size?: number;
  }