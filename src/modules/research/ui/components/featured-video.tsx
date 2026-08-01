interface FeaturedVideoProps {
  src: string;
  title: string;
  description: string;
}

const FeaturedVideo = ({ src, title, description }: FeaturedVideoProps) => (
  <figure className="featured-video flex flex-col lg:flex-row gap-8 pt-12">
    <div className="w-full lg:w-1/2 shrink-0">
      <iframe
        src={src}
        title={title}
        className="w-full aspect-video rounded-2xl"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
    <figcaption className="flex flex-col justify-center gap-3">
      <p className="font-outfit text-sm font-medium text-well-red uppercase tracking-widest">
        Featured
      </p>
      <p className="font-outfit font-medium text-xl text-thunder leading-snug">
        {title}
      </p>
      <p className="text-p1 text-thunder/65 leading-relaxed">
        {description}
      </p>
    </figcaption>
  </figure>
);

export default FeaturedVideo;
