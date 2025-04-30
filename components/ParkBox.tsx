import Link from 'next/link';

interface ParkBoxProps {
  id: string;
  name: string;
  rules: string[];
}

const ParkBox: React.FC<ParkBoxProps> = ({ id, name, rules }) => {
  return (
    <Link href="/park_description">
      <div
        id={id}
        className="cursor-pointer bg-black text-white p-4 rounded-3xl shadow-lg w-[250px] sm:w-[300px] lg:w-[350px] min-h-[100px] max-h-[250px]
          overflow-y-auto border border-transparent hover:border-2 hover:border-gray-500 hover:bg-gray-700 hover:shadow-xl
          hover:scale-105 transition-all ease-in-out duration-300 mx-auto"
      >
        <h2 className="text-sm font-semibold mb-1 text-white">{name}</h2>
        <div className="border-t border-gray-600 my-1"></div>
        <p className="mb-0.5 text-gray-300 text-xs">
          <strong>Allows for:</strong>
        </p>
        <ul className="list-disc pl-4 text-gray-300 text-xs space-y-0.5">
          {rules.slice(0, 3).map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
};

export default ParkBox;
