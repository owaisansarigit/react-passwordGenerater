import React, { useEffect, useState } from "react";

const App = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numb, setNumb] = useState(false);
  const [char, setChar] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const generate = () => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let specialChars = "!@#$%^&*?";

    if (numb) {
      str += numbers;
    }
    if (char) {
      str += specialChars;
    }

    let pass = "";
    for (let i = 1; i <= length; i++) {
      let charc = Math.floor(Math.random() * str.length);
      pass += str.charAt(charc);
    }
    setPassword(pass);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        setIsCopied(true);
      })
      .catch((err) => {
        console.error("Error copying to clipboard: ", err);
      });
  };

  useEffect(() => {
    generate();
    setIsCopied(false);
  }, [length, numb, char]);

  return (
    <>
      <div className="min-h-screen flex items-start pt-9 justify-center bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-300">
        <div className="w-1/2 p-6 bg-white rounded-lg shadow-md mt-9">
          <h1 className="text-center text-3xl font-semibold text-gray-800 mb-4">
            Password Generator
          </h1>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800">
              Password Length: {length}
            </label>
            <input
              type="range"
              name="passwordLength"
              id="passwordLength"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              min="1"
              max="20"
              className="w-full bg-gray-200 rounded-md mt-2"
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={numb}
              onChange={() => setNumb(!numb)}
              id="includeNumbers"
              className="mr-2 h-6 w-6 text-blue-300 focus:ring-blue-200 border-gray-300 rounded"
            />
            <label
              htmlFor="includeNumbers"
              className="text-sm font-medium text-gray-800"
            >
              Include Numbers
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={char}
              onChange={() => setChar(!char)}
              id="includeSpecialChars"
              className="mr-2 h-6 w-6 text-blue-300 focus:ring-blue-200 border-gray-300 rounded"
            />
            <label
              htmlFor="includeSpecialChars"
              className="text-sm font-medium text-gray-800"
            >
              Include Special Characters
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 text-center">
              Generated Password
            </label>
            <div className="bg-gray-200 bg-opacity-75 border p-2 rounded-md text-center text-gray-800">
              {password}
            </div>
          </div>
          <button
            onClick={copyToClipboard}
            className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 ${
              isCopied && "bg-green-500"
            }`}
          >
            {isCopied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
