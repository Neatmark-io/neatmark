import React from "react";
import { Folder } from "../types";

interface FolderCardProps {
  folder: Folder;
  onClick: () => void;
}

const FolderCard: React.FC<FolderCardProps> = ({ folder, onClick }) => {
  return (
    <div className="folder-card" onClick={onClick}>
      <span className="icon" />
      <h3 className="title">{folder.title}</h3>
    </div>
  );
};

export default FolderCard;
