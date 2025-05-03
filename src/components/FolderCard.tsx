import React from "react";
import { Folder } from "../types";

interface FolderCardProps {
  folder: Folder;
  onClick: () => void;
}

const FolderCard: React.FC<FolderCardProps> = ({ folder, onClick }) => {
  return (
    <div
      className="bg-white dark:bg-gray-700 p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center">
        <span className="text-2xl mr-2">{folder.icon}</span>
        <h3 className="text-lg font-bold">{folder.title}</h3>
      </div>
    </div>
  );
};

export default FolderCard;
