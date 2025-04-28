interface ParkBoxProps {
    id: string;
    name: string;
    rules: string[];
  }
  
  const ParkBox: React.FC<ParkBoxProps> = ({ id, name, rules }) => {
    return (
      <div
        id={id}
        className="bg-black text-white p-4 rounded-3xl shadow-lg w-full sm:w-[300px] min-h-[100px] max-h-[250px]
        overflow-y-auto border border-transparent hover:border-2 hover:border-gray-500 hover:bg-gray-700 hover:shadow-xl
        hover:scale-105 transition-all ease-in-out duration-300"
      >
        {/* Park Name */}
        <h2 className="text-sm font-semibold mb-1 text-white">{name}</h2>
  
        {/* Divider Line */}
        <div className="border-t border-gray-600 my-1"></div>
  
        {/* "Allows for" Label */}
        <p className="mb-0.5 text-gray-300 text-xs">
          <strong>Allows for:</strong>
        </p>
  
        {/* Rules List */}
        <ul className="list-disc pl-4 text-gray-300 text-xs space-y-0.5">
          {rules.slice(0, 3).map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ParkBox;
  