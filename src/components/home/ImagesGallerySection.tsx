import Image from "next/image";
import image1 from "../../../public/images/image-1.jpg";
import image2 from "../../../public/images/image-2.jpg";
import image3 from "../../../public/images/image-3.jpg";
import image4 from "../../../public/images/image-4.jpg";
import image5 from "../../../public/images/image-5.jpg";

export default function ImagesGallerySection() {
  return (
    <div className="  flex  flex-row justify-center gap-6 py-12">
      <div className="relative aspect-9/10 w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800 rotate-2">
        <Image
          src={image1}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="relative aspect-9/10 w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800 -rotate-2">
        <Image
          src={image2}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="relative aspect-9/10 w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800 rotate-2">
        <Image
          src={image3}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="relative aspect-9/10 w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800 rotate-2">
        <Image
          src={image4}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="relative aspect-9/10 w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800 -rotate-2">
        <Image
          src={image5}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
