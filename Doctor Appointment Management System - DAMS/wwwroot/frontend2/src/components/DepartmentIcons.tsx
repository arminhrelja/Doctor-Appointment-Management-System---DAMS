import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card" 
import React from "react";

interface Department {
    name: string;
    icon: string;
}

const departments: Department[] = [
    { name: "Cardiology", icon: "/assets/cardiology.svg" },
    { name: "Neurology", icon: "/assets/neurology.svg" },
    { name: "Pulmonology", icon: "/assets/pulmonology.svg" },
    { name: "Pediatrics", icon: "/assets/pediatrics.svg" },
    { name: "Oncology", icon: "/assets/oncology.svg" },
    { name: "Infectious Diseases", icon: "/assets/infectiousdiseases.svg" },
    { name: "Dermatology", icon: "/assets/dermatology.svg" },
    { name: "Psychiatry", icon: "/assets/psychiatry.svg" },
    { name: "Gynecology", icon: "/assets/gynecology.svg" },
  ];

const DepartmentIcons: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto">
    <Carousel>
      <CarouselPrevious />
      <CarouselContent className="mb-10">
        {departments.map((dept, index) => (
          <CarouselItem key={index} className="basis-1/3">
            <Card className="flex flex-col items-center p-4 shadow-md">
              <CardContent className="flex flex-col items-center">
                <img src={dept.icon} alt={dept.name} width={90} height={90} className="mb-2 cursor-pointer" />
                <p className="text-lg font-bold">{dept.name}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
    </Carousel>
  </div>
    )
}

export default DepartmentIcons;
