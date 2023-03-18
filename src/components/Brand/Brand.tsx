import { Sono } from "@next/font/google";

const sono = Sono({ subsets: ["latin"], display: "optional", weight: "700" });

const Brand: React.FC = () => {
    return <h1 className={`text-6xl 2xl:text-8xl text-white tracking-tight ${sono.className}`}>KeyType</h1>;
};

export default Brand;
