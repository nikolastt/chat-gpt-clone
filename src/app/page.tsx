import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

export default function HomePage() {
  return (
    <div className="text-white h-screen flex items-center justify-center flex-col">
      <h1 className="text-5xl font-bold mb-20">ChatGPT</h1>

      <div className="flex space-x-2 text-center">
        <div>
          <div className="flex flex-col items-center justify-center mb-5 ">
            <SunIcon className="h-6 w-6" />
            <h2>Example</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">Explain Something to me</p>

            <p className="infoText">What is the between a dog and a cat?</p>
            <p className="infoText">What is the color of the sun</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5 ">
            <BoltIcon className="h-6 w-6" />
            <h2>Example</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">Explain Something to me</p>

            <p className="infoText">What is the between a dog and a cat?</p>
            <p className="infoText">What is the color of the sun</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5 ">
            <ExclamationTriangleIcon className="h-6 w-6" />
            <h2>Example</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">Change the ChatGPT Model to use</p>

            <p className="infoText">What is the between a dog and a cat?</p>
            <p className="infoText">What is the color of the sun</p>
          </div>
        </div>
      </div>
    </div>
  );
}
