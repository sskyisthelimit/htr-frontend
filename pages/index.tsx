import '../src/styles/globals.css';
import { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { FiUpload } from 'react-icons/fi';
import Image from 'next/image';

const Home = () => {
  const [image, setImage] = useState<File | null>(null);
  const [progressText, setProgressText] = useState<string[][]>([[]]);
  const [chats, setChats] = useState<{ image: string; filename: string; text: string[][] }[]>([]);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Load chats from local storage on mount
  useEffect(() => {
    const storedChats = localStorage.getItem('chats');
    if (storedChats) {
      setChats(JSON.parse(storedChats));
    }
  }, []);

  const handleFileDrop = (files: FileList) => {
    if (files.length > 0) {
      setImage(files[0]);
    }
  };

  const simulateApiResponse = () => {
    return new Promise<void>((resolve) => {
      const words = ['This', 'is', 'a', 'mock', 'stream', 'of', 'words', 'for', 'testing.'];
      let wordIndex = 0;
      const intervalId = setInterval(() => {
        if (wordIndex < words.length) {
          setProgressText((prevText) => {
            const lastBlock = prevText[prevText.length - 1] || [];
            const updatedText = [...prevText.slice(0, -1), [...lastBlock, words[wordIndex]]];
            return updatedText;
          });
          wordIndex++;
        } else {
          clearInterval(intervalId);
          resolve();
        }
      }, 500);
    });
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    await simulateApiResponse();
    setIsUploading(false);
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        const newChat = { image: reader.result as string, filename: image.name, text: progressText };
        const updatedChats = [...chats, newChat];
        setChats(updatedChats);
        localStorage.setItem('chats', JSON.stringify(updatedChats));
        setImage(null);
        setProgressText([[]]);
      };
      reader.readAsDataURL(image);
    }
  };

  return (
    <div className="min-h-screen bg-pastelCream flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-black mb-8">
        Handwriting Recognition App
      </h1>

      {!image ? (
        <div
          className="border-4 border-dashed border-black p-12 rounded-lg mb-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFileDrop(e.dataTransfer.files);
          }}
        >
          <div className="flex flex-col items-center">
            <FiUpload className="text-5xl text-pastelBlue mb-4" />
            <p className="text-xl text-black">Drag and drop an image to upload</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center mb-4">
          <Image src={URL.createObjectURL(image)} alt="uploaded image" width={100} height={100} className="rounded mr-4" />
          <p className="text-black">File: {image.name}</p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="bg-pastelBlue text-white px-4 py-2 rounded shadow-lg hover:bg-black"
        disabled={!image || isUploading}
      >
        {isUploading ? 'Processing...' : 'Submit'}
      </button>

      {progressText.length > 1 && (
        <div className="mt-8 w-full max-w-lg">
          <p className="text-black font-semibold">Response:</p>
          <div className="text-black border-2 border-black p-4 rounded-md">
            {progressText.map((line, index) => (
              <p key={index}>{line.join(' ')}</p>
            ))}
          </div>
        </div>
      )}

      {/* Sidebar/Drawer for chats */}
      <Transition
        show={chats.length > 0}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 transform translate-x-full"
        enterTo="opacity-100 transform translate-x-0"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 transform translate-x-0"
        leaveTo="opacity-0 transform translate-x-full"
        className="fixed right-0 top-0 h-full w-64 bg-pastelCream shadow-lg p-4"
      >
        <div className="overflow-y-auto h-full">
          <h2 className="text-2xl font-bold mb-4 text-black">Chats</h2>
          {chats.map((chat, index) => (
            <div
              key={index}
              className="mb-4 cursor-pointer"
              onClick={() => setSelectedChat(index)}
            >
              <Image
                src={chat.image}
                alt="uploaded image"
                width={50}
                height={50}
                className="rounded"
              />
              <p className="text-black truncate">{chat.filename}</p>
            </div>
          ))}

          {selectedChat !== null && (
            <div className="mt-8">
              <Image
                src={chats[selectedChat].image}
                alt="uploaded image"
                width={100}
                height={100}
                className="rounded mb-4"
              />
              <p className="text-black">{chats[selectedChat].filename}</p>
              <div className="mt-4 border-2 border-black p-4 rounded-md">
                {chats[selectedChat].text.map((line, index) => (
                  <p key={index}>{line.join(' ')}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </Transition>
    </div>
  );
};

export default Home;
