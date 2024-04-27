"use client";

import * as React from "react";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import ReactWrapBalancer from "react-wrap-balancer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Hero: React.FC = () => {
  return (
    <section>
      <div className="relative h-fit mx-auto flex">
        <div className="w-1/2 pt-20 pb-16 md:pt-40 md:pb-32">
          {/* Hero content */}
          <div className="mb-6" data-aos="fade-down">
            <div className="relative inline-flex before:absolute before:inset-0 ">
              <Link
                className="px-3 py-1 text-sm font-medium inline-flex items-center justify-center border border-transparent rounded-full  text-background/80 hover:text-background transition duration-150 ease-in-out w-full group  relative before:absolute before:inset-0 before:bg-foreground/30 before:rounded-full before:pointer-events-none"
                href="https://github.com/chronark/highstorm"
                target="_blank"
              >
                <span className="relative inline-flex items-center">
                  Embark on Unforgettable Journeys with Us
                  <span className="tracking-normal text-primary-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                    -&gt;
                  </span>
                </span>
              </Link>
            </div>
          </div>
          <div>
            <h1
              className="pb-4 font-extrabold tracking-tight text-transparent text-7xl lg:text-8xl  bg-clip-text bg-gradient-to-r from-foreground/60 via-foreground/40 to-foreground/60"
              data-aos="fade-down"
            >
              <ReactWrapBalancer>
                Wanderlust Adventures: Explore with Us
              </ReactWrapBalancer>
            </h1>
            <p
              className="mb-8 text-lg text-foreground"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              Discover the world with Wanderlust Adventures. Tailored journeys,
              unforgettable memories. Let&apso;s explore together!
            </p>
            <div
              className="flex flex-col items-center max-w-xs mx-auto gap-4 sm:max-w-none  sm:justify-center sm:flex-row sm:inline-flex"
              data-aos="fade-down"
              data-aos-delay="400"
            >
              <Link
                className="w-full justify-center flex items-center whitespace-nowrap transition duration-150 ease-in-out font-medium rounded px-4 py-1.5  text-background bg-gradient-to-r from-foreground/80 via-foreground to-foreground/80 hover:bg-background group"
                href="/packages"
              >
                Get Started{" "}
                <ArrowRight className="w-3 h-3 tracking-normal text-primary-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1" />
              </Link>
            </div>
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-center">
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              <CarouselItem>
                <div className="w-[600px]">
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    <Image
                      src="/images/image1.avif"
                      alt="Photo by Drew Beamer"
                      fill
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="w-[600px]">
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    <Image
                      src="/images/image2.jpg"
                      alt="Photo by Drew Beamer"
                      fill
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </div>
              </CarouselItem>
              <CarouselItem className="w-fit">
                <div className="w-[600px]">
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    <Image
                      src="/images/image3.avif"
                      alt="Photo by Drew Beamer"
                      fill
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};
