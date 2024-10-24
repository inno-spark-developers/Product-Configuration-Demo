import { useCustomization } from "../context/CustomizationContext.jsx";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/Sheet.jsx";

const Controller = () => {

    const { material, setMaterial} = useCustomization();
    console.log(material);


  return (
    <div>
      <Sheet>
        <SheetTrigger className="text-white text-lg font-semibold border-2 rounded-xl border-white-500 px-2 py-1  hover:text-blue-500 hover:bg-white transition-all">
          Customize
        </SheetTrigger>
        <SheetContent className="bg-black">
          <SheetHeader>
            <SheetTitle className="text-white">Colors</SheetTitle>
            <SheetDescription className="text-white">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className={`${material === "red" && 'border-2 border-white'} bg-red-500 h-10 rounded-lg shadow`} onClick={() => setMaterial("red")} ></div>
                <div className={`${material === "blue" && 'border-2 border-white'} bg-blue-500 h-10 rounded-lg shadow`} onClick={() => setMaterial("blue")}></div>
                <div className={`${material === "green" && 'border-2 border-white'} bg-green-500 h-10 rounded-lg shadow`} onClick={() => setMaterial("green")}></div>
                <div className={`${material === "yellow" && 'border-2 border-white'} bg-yellow-500 h-10 rounded-lg shadow`} onClick={() => setMaterial("yellow")}></div>
                <div className={`${material === "purple" && 'border-2 border-white'} bg-purple-500 h-10 rounded-lg shadow`} onClick={() => setMaterial("purple")}></div>
                <div className={`${material === "pink" && 'border-2 border-white'} bg-pink-500 h-10 rounded-lg shadow`} onClick={() => setMaterial("pink")}></div>
                <div className={`${material === "indingo" && 'border-2 border-white'} bg-indigo-500 h-10 rounded-lg shadow` } onClick={() => setMaterial("indingo")}></div>
                <div className={`${material === "teal" && 'border-2 border-white'} bg-teal-500 h-10 rounded-lg shadow`} onClick={() => setMaterial("teal")}></div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Controller;
