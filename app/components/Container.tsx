"use client";

interface ContainerProps {
   children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
   return <div className="max-w-[1280px] mx-auto px-4 sm:px-8">{children}</div>;
};
export default Container;
