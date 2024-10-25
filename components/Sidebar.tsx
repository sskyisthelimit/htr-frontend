import Image from 'next/image';
import { Transition } from '@headlessui/react';

interface SidebarProps {
  chats: { image: string; filename: string; text: string[][] }[];
  onSelectChat: (index: number) => void;
  selectedChat: number | null;
}

const Sidebar: React.FC<SidebarProps> = ({ chats, onSelectChat, selectedChat }) => (
  <Transition
    show={chats.length > 0}
    enter="transition ease-out duration-300"
    enterFrom="opacity-0 transform translate-x-full"
    enterTo="opacity-100 transform translate-x-0"
    leave="transition ease-in duration-200"
    leaveFrom="opacity-100 transform translate-x-0"
    leaveTo="opacity-0 transform translate-x-full"
    as="div"
    className="fixed right-0 top-0 h-full w-1/4 bg-pastelCream shadow-lg p-4 overflow-y-auto"
  >
    <h2 className="text-2xl font-bold mb-4 text-black">Saved Chats</h2>
    {chats.map((chat, index) => (
      <div
        key={index}
        className={`mb-4 cursor-pointer ${selectedChat === index ? 'bg-gray-200' : ''}`}
        onClick={() => onSelectChat(index)}
      >
        <Image src={chat.image} alt="uploaded image" width={50} height={50} className="rounded mb-2" />
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
  </Transition>
);

export default Sidebar;
